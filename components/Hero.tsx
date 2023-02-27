/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

function Hero() {
  return (
    <div className="hero my-5 text-center" data-testid="hero">
      <img src="/circlesub.svg" alt="Logo" />
      <h1 className="lead" data-testid="hero-lead" style={{ fontSize: '24px' }}>
        Tip your favorite
        {' '}
        Twitch
        {' '}
        <img src="/glitch.svg" height="40px" alt="Twitch" style={{ marginLeft: '5px' }} />
        {' '}
        influencers
      </h1>
    </div>
  );
}

export default Hero;
