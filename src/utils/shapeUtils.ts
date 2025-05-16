interface ShapeConfig {
    type: 'heart' | 'circle' | 'square' | 'triangle';
    x: number;
    y: number;
    size: number;
    color: string;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;
  }
  
  // Create a single shape element
  const createShapeElement = (config: ShapeConfig): HTMLDivElement => {
    const shape = document.createElement('div');
    shape.style.position = 'absolute';
    shape.style.left = `${config.x}px`;
    shape.style.top = `${config.y}px`;
    shape.style.width = `${config.size}px`;
    shape.style.height = `${config.size}px`;
    shape.style.backgroundColor = 'transparent';
    shape.style.transform = `rotate(${config.rotation}deg)`;
    shape.style.opacity = '0.7';
    shape.style.willChange = 'transform, top, left';
    shape.style.transition = 'opacity 0.3s ease';
    
    // Store the configuration on the element for animation
    (shape as any).shapeConfig = config;
    
    switch (config.type) {
      case 'heart':
        const encodedColor = encodeURIComponent(config.color);
        shape.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='${encodedColor}' stroke='none'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E")`;
        shape.style.backgroundSize = 'contain';
        shape.style.backgroundRepeat = 'no-repeat';
        break;
      case 'circle':
        shape.style.borderRadius = '50%';
        shape.style.backgroundColor = config.color;
        break;
      case 'square':
        shape.style.backgroundColor = config.color;
        break;
      case 'triangle':
        shape.style.width = '0';
        shape.style.height = '0';
        shape.style.backgroundColor = 'transparent';
        shape.style.borderLeft = `${config.size / 2}px solid transparent`;
        shape.style.borderRight = `${config.size / 2}px solid transparent`;
        shape.style.borderBottom = `${config.size}px solid ${config.color}`;
        break;
    }
    
    return shape;
  };
  
  // Create all shapes
  export const createShapes = (count: number, colors: string[], container: HTMLElement): HTMLDivElement[] => {
    const shapes: HTMLDivElement[] = [];
    const width = container.clientWidth;
    const height = container.clientHeight;
    const shapeTypes: Array<'heart' | 'circle' | 'square' | 'triangle'> = ['heart', 'circle', 'square', 'triangle'];
    
    for (let i = 0; i < count; i++) {
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const size = Math.random() * 30 + 15; // 15-45px
      const config: ShapeConfig = {
        type,
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2
      };
      
      const shape = createShapeElement(config);
      shapes.push(shape);
    }
    
    return shapes;
  };
  
  // Animate all shapes
  export const animateShapes = (shapes: HTMLDivElement[], container: HTMLElement): () => void => {
    let animationFrameId: number;
    
    const animate = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      shapes.forEach(shape => {
        const config = (shape as any).shapeConfig as ShapeConfig;
        
        // Update position
        config.x += config.vx;
        config.y += config.vy;
        
        // Bounce off walls
        if (config.x <= 0 || config.x >= width - config.size) {
          config.vx *= -1;
          // Add some randomness on bounce
          config.vy += (Math.random() - 0.5) * 0.5;
        }
        
        if (config.y <= 0 || config.y >= height - config.size) {
          config.vy *= -1;
          // Add some randomness on bounce
          config.vx += (Math.random() - 0.5) * 0.5;
        }
        
        // Apply rotation
        config.rotation += config.rotationSpeed;
        
        // Update the element
        shape.style.left = `${config.x}px`;
        shape.style.top = `${config.y}px`;
        shape.style.transform = `rotate(${config.rotation}deg)`;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Return cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  };