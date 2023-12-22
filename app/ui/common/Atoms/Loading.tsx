'use client';
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import './LoadingAnimation.css';

const LoadingAnimation = () => {
  const animationContainer = useRef(null);

  useEffect(() => {
    if (animationContainer.current) {
      const anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/loading.json',
      });
      return () => anim.destroy();
    }
    return () => {};
  }, []);

  return <div className="animate-fade-in" ref={animationContainer} />;
};

export default LoadingAnimation;
