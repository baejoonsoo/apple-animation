import { useEffect, useRef } from "react";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let canvas: CanvasRenderingContext2D | null;
  const img = new Image();

  const currentFrame = (index: Number): string =>
    `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
      .toString()
      .padStart(4, "0")}.jpg`;

  useEffect(() => {
    img.src = currentFrame(1);
    if (canvasRef && canvasRef.current) {
      canvas = canvasRef.current.getContext("2d");
      canvasRef.current.width = 1158;
      canvasRef.current.height = 770;
    }
    if (canvas) {
      canvas.drawImage(img, 0, 0);
    }
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default App;
