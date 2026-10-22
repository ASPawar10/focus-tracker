"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function FocusTracker() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [predictions, setPredictions] = useState<string>("Loading model & camera...");
  const [isModelReady, setIsModelReady] = useState(false);

  useEffect(() => {
    if (!isModelReady) return;

    const startInference = async () => {
      // @ts-ignore - Bypass TS checking for the globally loaded EdgeImpulseClassifier
      const classifier = new window.EdgeImpulseClassifier();
      await classifier.init();

      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) videoRef.current.srcObject = stream;

      setInterval(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || video.paused) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        ctx.drawImage(video, 0, 0, 96, 96);
        const imgData = ctx.getImageData(0, 0, 96, 96).data;
        
        const features = [];
        for (let i = 0; i < imgData.length; i += 4) {
            features.push((imgData[i] << 16) | (imgData[i + 1] << 8) | imgData[i + 2]);
        }

        try {
            const res = classifier.classify(features);
            const output = res.results
              .map((r: any) => `${r.label}: ${(r.value * 100).toFixed(1)}%`)
              .join('\n');
            setPredictions(output);
        } catch (ex) {
            console.error('Classification failed:', ex);
        }
      }, 250);
    };

    startInference();
  }, [isModelReady]);

  return (
    <div className="flex flex-col items-center pt-10 font-sans min-h-screen bg-white text-black">
      <Script src="/edge-impulse-standalone.js" />
      <Script 
        src="/run-impulse.js" 
        onLoad={() => setIsModelReady(true)} 
      />
      
      <video 
        ref={videoRef} 
        autoPlay 
        muted 
        playsInline 
        className="w-72 h-72 object-cover border-2 border-gray-800 rounded-lg" 
      />
      <canvas ref={canvasRef} width={96} height={96} className="hidden" />
      
      <pre className="mt-6 text-lg font-bold whitespace-pre-wrap text-center">
        {predictions}
      </pre>
    </div>
  );
}