"use client";
import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const blobs = containerRef.current.querySelectorAll(".blob");

    blobs.forEach((blob) => {
      const animate = () => {
        const br1 = 30 + Math.random() * 40;
        const br2 = 100 - br1;
        const br3 = 20 + Math.random() * 50;
        const br4 = 100 - br3;

        blob.animate(
          {
            borderRadius: `${br1}% ${br2}% ${br3}% ${br4}% / ${br4}% ${br3}% ${br2}% ${br1}%`,
            transform: `translate(${Math.random() * 60 - 30}px, ${
              Math.random() * 60 - 30
            }px) scale(${0.8 + Math.random() * 0.5})`,
          },
          {
            duration: 7000 + Math.random() * 3000,
            direction: "alternate",
            iterations: Infinity,
            easing: "ease-in-out",
          }
        );
      };
      animate();
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden z-0"
    >
    
      <div
        className="blob absolute backdrop-blur-3xl opacity-70
                   w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 
                   top-10 left-10"
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.6), rgba(147,197,253,0.4))",
          borderRadius: "40% 60% 70% 30% / 30% 70% 40% 60%",
        }}
      />

      
      <div
        className="blob absolute backdrop-blur-3xl opacity-70
                   w-36 h-36 sm:w-52 sm:h-52 lg:w-72 lg:h-72 
                   bottom-20 right-16"
        style={{
          background: "linear-gradient(135deg, rgba(244,114,182,0.6), rgba(251,191,36,0.4))",
          borderRadius: "60% 40% 30% 70% / 50% 30% 70% 50%",
        }}
      />

    
      <div
        className="blob absolute backdrop-blur-3xl opacity-70
                   w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 
                   top-1/2 left-1/3"
        style={{
          background: "linear-gradient(135deg, rgba(16,185,129,0.6), rgba(167,243,208,0.4))",
          borderRadius: "55% 45% 65% 35% / 40% 60% 30% 70%",
        }}
      />
    </div>
  );
}
