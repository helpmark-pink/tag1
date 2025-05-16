import React, { useEffect, useRef } from 'react';
import { createImages, animateImages } from '../utils/imageUtils';

interface FloatingImagesProps {
  imagesCount?: number;
}

const FloatingImages: React.FC<FloatingImagesProps> = ({
  imagesCount = 15
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const images = createImages(imagesCount, container);
    
    images.forEach(image => {
      container.appendChild(image);
    });

    const cleanup = animateImages(images, container);
    
    return () => {
      cleanup();
      images.forEach(image => {
        if (image.parentNode === container) {
          container.removeChild(image);
        }
      });
    };
  }, [imagesCount]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default FloatingImages;