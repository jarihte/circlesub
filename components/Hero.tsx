/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef } from 'react';

import videojs from 'video.js';
import 'video.js/dist/video-js.css';

function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videojs(videoRef.current, {
        sources: [
          {
            src: 'https://video.circlesub.com/circlesub-twitch.mp4',
          },
        ],
        fluid: true,
        controls: true,
      });
    }
  });

  return (
    <div className="hero my-5 text-center" data-testid="hero" style={{ fontSize: '16px' }}>
      <img src="/circlesub.svg" alt="Logo" />
      <p className="lead" data-testid="hero-lead">
        Tip your favorite
        {' '}
        Twitch
        {' '}
        <img src="/glitch.svg" height="40px" alt="Twitch" style={{ marginLeft: '5px' }} />
        {' '}
        influencers
      </p>
      <div style={{ marginTop: '50px' }}>
        <video controls ref={videoRef} className="video-js" />
      </div>
    </div>
  );
}

export default Hero;
