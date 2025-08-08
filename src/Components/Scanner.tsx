import { useEffect, useRef, useState } from "react";
import { createWorker } from "tesseract.js";

export const Scanner = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ocrText, setOcrText] = useState<string>("");

  // Start webcam
  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    };
    initCamera();
  }, []);

  // Handle OCR
  const handleScan = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    // Draw current video frame to canvas
    const ctx = canvasRef.current.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, 640, 480);
    }

    // Convert canvas to image and run OCR
    const worker = await createWorker("eng");
    const {
      data: { text },
    } = await worker.recognize(canvasRef.current);
    await worker.terminate();
    setOcrText(text);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 space-y-4">
      <h1 className="text-2xl font-bold">📷 Receipt Scanner (Tesseract.js)</h1>

      {/* Video feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="320"
        height="240"
        className="rounded shadow"
      />

      {/* Hidden canvas */}
      <canvas ref={canvasRef} width="640" height="480" className="hidden" />

      {/* Scan Button */}
      <button
        onClick={handleScan}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Scan Receipt
      </button>

      {/* OCR Result */}
      <div className="w-full max-w-lg bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">🧠 OCR Result:</h2>
        <pre className="whitespace-pre-wrap text-sm">{ocrText || "No text yet..."}</pre>
      </div>
    </div>
  );
};
