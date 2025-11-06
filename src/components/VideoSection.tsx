import { useState, useRef } from 'react';

export function VideoSection() {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setVideoEnded(false);
    }
  };

  return (
    <section className="w-screen h-screen fixed top-0 left-0 -z-10">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
        onEnded={() => setVideoEnded(true)}
      >
        <source
          src="/videos/main-video.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {videoEnded && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeAwS6nfEkcpUD5X2ZdZ11OR---imYka12c2e9L6PnoBGxmFA/viewform?usp=sharing&ouid=106217149924901094811"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base sm:text-xl rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 text-center"
            >
              Submit Form
            </a>
            <button
              onClick={handleReplay}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-600 hover:bg-gray-700 text-white font-bold text-base sm:text-xl rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 text-center"
            >
              Watch Again
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
