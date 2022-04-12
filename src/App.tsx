import { useEffect, useRef } from "react";

function App() {
  const html = document.documentElement;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let canvas: CanvasRenderingContext2D | null;
  const img = new Image();
  const frameCount = 148;

  const updateImage = (index: number) => {
    img.src = currentFrame(index);
    if (canvas) {
      canvas.drawImage(img, 0, 0);
    }
  };

  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };

  const currentFrame = (index: Number): string =>
    `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
      .toString()
      .padStart(4, "0")}.jpg`;

  const addScrollEvent = () => {
    window.addEventListener("scroll", () => {
      const scrollTop = html.scrollTop;
      const maxScrollTop = html.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
      );

      requestAnimationFrame(() => updateImage(frameIndex + 1));
    });
  };

  useEffect(() => {
    img.src = currentFrame(1);
    if (canvasRef && canvasRef.current) {
      canvas = canvasRef.current.getContext("2d");
      canvasRef.current.width = 1158;
      canvasRef.current.height = 770;
    }
    img.onload = () => {
      if (canvas) {
        canvas.drawImage(img, 0, 0);
      }
    };
    addScrollEvent();
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default App;
