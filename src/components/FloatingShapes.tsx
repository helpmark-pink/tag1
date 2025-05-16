import React, { useEffect, useRef } from 'react';
import { createShapes, animateShapes } from '../utils/shapeUtils';

interface FloatingShapesProps {
  shapesCount?: number;
  colors?: string[];
}

const FloatingShapes: React.FC<FloatingShapesProps> = ({
  shapesCount = 20,
  colors = ['#FF6B6B', '#4ECDC4', '#F9D423', '#7D5BA6']
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const shapes = createShapes(shapesCount, colors, container);
    
    shapes.forEach(shape => {
      container.appendChild(shape);
    });

    const cleanup = animateShapes(shapes, container);
    
    return () => {
      cleanup();
      shapes.forEach(shape => {
        if (shape.parentNode === container) {
          container.removeChild(shape);
        }
      });
    };
  }, [shapesCount, colors]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default FloatingShapes;