import { useEffect, useRef, useState } from 'react';

// Total frames 240 (all frames in the frames folder)
const TOTAL_FRAMES = 240;

const getFrameUrl = (index) => {
  const filename = `frame_${String(index).padStart(3, '0')}_delay-0.042s.webp`;
  return `/frames/${filename}`;
};

export default function useMobileCanvasScrubber(canvasRef, scrollProgress) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const imagesRef = useRef([]);
  const lastDrawnIndexRef = useRef(-1);
  const scrollProgressRef = useRef(scrollProgress);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const drawScheduledRef = useRef(null);

  // Sync scroll progress ref to access inside image onload callbacks
  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  // Keep track of the canvas dimensions to avoid layout thrashing during scroll via getBoundingClientRect()
  const measureCanvasSize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvasSizeRef.current = {
      width: rect.width || window.innerWidth,
      height: rect.height || window.innerHeight,
    };
  };

  useEffect(() => {
    measureCanvasSize();
    window.addEventListener('resize', measureCanvasSize);
    return () => window.removeEventListener('resize', measureCanvasSize);
  }, []);

  // Function to draw a specific frame index on the canvas
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return; // Skip if not loaded yet

    const pixelRatio = Math.min(window.devicePixelRatio, 1.5); // Capped at 1.5 for GPU memory

    const { width, height } = canvasSizeRef.current;
    const w = width || window.innerWidth;
    const h = height || window.innerHeight;

    const canvasWidth = w * pixelRatio;
    const canvasHeight = h * pixelRatio;

    if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Mobile Aspect Cover calculation
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    lastDrawnIndexRef.current = index;
  };

  // Throttle draws to requestAnimationFrame to prevent double-draws in single-tick rendering
  const scheduleDrawFrame = (index) => {
    if (drawScheduledRef.current !== null) {
      cancelAnimationFrame(drawScheduledRef.current);
    }
    drawScheduledRef.current = requestAnimationFrame(() => {
      drawFrame(index);
      drawScheduledRef.current = null;
    });
  };

  // Clean up any pending animation frames on unmount
  useEffect(() => {
    return () => {
      if (drawScheduledRef.current !== null) {
        cancelAnimationFrame(drawScheduledRef.current);
      }
    };
  }, []);

  // Trigger redraw once loading is complete and the UI layout transitions
  useEffect(() => {
    if (isPreloaded) {
      const timer = setTimeout(() => {
        scheduleDrawFrame(0);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isPreloaded]);

  // Initialize and load images progressively
  useEffect(() => {
    let active = true;
    const images = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    let loadedCount = 0;
    const updateProgress = () => {
      if (!active) return;
      loadedCount++;
      const pct = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
      setLoadingProgress(pct);
      
      if (loadedCount === TOTAL_FRAMES) {
        setIsPreloaded(true);
      }
    };

    // Helper to load a range of frames
    function loadRange(start, end, callback) {
      let loadedInRange = 0;
      const rangeSize = end - start + 1;

      for (let i = start; i <= end; i++) {
        if (!active) return;
        const img = new Image();
        
        img.onload = () => {
          if (!active) return;
          images[i] = img;
          updateProgress();
          
          // Trigger instant redraw if this is the current active scroll frame
          if (scrollProgressRef.current) {
            const currentProgress = scrollProgressRef.current.get();
            const currentFrameIndex = Math.min(
              TOTAL_FRAMES - 1,
              Math.max(0, Math.floor(currentProgress * TOTAL_FRAMES))
            );
            if (i === currentFrameIndex) {
              scheduleDrawFrame(currentFrameIndex);
            }
          }

          loadedInRange++;
          if (loadedInRange === rangeSize && callback) {
            callback();
          }
        };

        img.onerror = () => {
          if (!active) return;
          console.warn(`Failed to load frame ${i} at path: ${getFrameUrl(i)}`);
          images[i] = images[Math.max(0, i - 1)] || img;
          updateProgress();
          loadedInRange++;
          if (loadedInRange === rangeSize && callback) {
            callback();
          }
        };

        img.src = getFrameUrl(i);
      }
    }

    // 1. Load Frame 0 immediately and draw it
    const img0 = new Image();
    img0.onload = () => {
      if (!active) return;
      images[0] = img0;
      updateProgress();
      scheduleDrawFrame(0);
      
      // 2. Load frames 1-30 in parallel immediately
      loadRange(1, 30);

      // 3. Load remaining frames in batches of 30
      let currentChunk = 31;
      const CHUNK_SIZE = 30;

      const queueNextChunk = () => {
        if (!active || currentChunk >= TOTAL_FRAMES) return;

        const start = currentChunk;
        const end = Math.min(currentChunk + CHUNK_SIZE - 1, TOTAL_FRAMES - 1);
        currentChunk = end + 1;

        if (window.requestIdleCallback) {
          window.requestIdleCallback(() => loadRange(start, end, queueNextChunk));
        } else {
          setTimeout(() => loadRange(start, end, queueNextChunk), 20);
        }
      };

      queueNextChunk();
    };
    img0.onerror = () => {
      console.error(`Failed to load base frame 0 at path: ${getFrameUrl(0)}`);
      updateProgress();
      loadRange(1, 30);
    };
    img0.src = getFrameUrl(0);

    return () => {
      active = false;
      imagesRef.current = [];
    };
  }, []);

  // Redraw when scroll progress changes
  useEffect(() => {
    if (!scrollProgress) return;

    const unsubscribe = scrollProgress.on('change', (latest) => {
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(latest * TOTAL_FRAMES))
      );

      if (frameIndex !== lastDrawnIndexRef.current) {
        scheduleDrawFrame(frameIndex);
      }
    });

    const handleResize = () => {
      if (lastDrawnIndexRef.current !== -1) {
        scheduleDrawFrame(lastDrawnIndexRef.current);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollProgress]);

  return { loadingProgress, isPreloaded };
}
