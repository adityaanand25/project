import { useState, useRef, useEffect } from 'react';

export function VideoSection() {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Try to play the video on component mount
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.log('Autoplay failed, video needs user interaction:', error);
      });
    }
  }, []);

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setVideoEnded(false);
    }
  };

  return (
    <section className="fixed inset-0 w-screen h-screen bg-black overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        controls
        onEnded={() => setVideoEnded(true)}
      >
        <source
          src="/videos/main-video.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {videoEnded && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeAwS6nfEkcpUD5X2ZdZ11OR---imYka12c2e9L6PnoBGxmFA/viewform?usp=sharing&ouid=106217149924901094811"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base rounded-lg shadow-lg transition-all duration-200 text-center"
            >
              Submit Form
            </a>
            <button
              onClick={handleReplay}
              className="w-full px-4 py-2 sm:px-6 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold text-sm sm:text-base rounded-lg shadow-lg transition-all duration-200 text-center"
            >
              Watch Again
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
