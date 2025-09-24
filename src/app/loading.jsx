export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="absolute w-2 h-2 bg-teal-400 rounded-full opacity-70 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

    
      <div className="relative z-10 text-center">
        <div className="w-16 h-16 border-4 border-t-transparent border-teal-400 rounded-full animate-spin mx-auto"></div>
        <h2 className="mt-6 text-teal-400 text-xl font-semibold animate-pulse">
          در حال بارگذاری...
        </h2>
      </div>
    </div>
  );
}
