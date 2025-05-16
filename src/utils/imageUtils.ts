interface ImageConfig {
    path: string;
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;
  }
  
  const ALLOWED_IMAGES = [
    '/images/1.png',
    '/images/2.png',
    '/images/3.png',
    '/images/4.png',
    '/images/5.png'
  ] as const;
  
  type AllowedImagePath = typeof ALLOWED_IMAGES[number];
  
  const createImageElement = (config: ImageConfig & { path: AllowedImagePath }): HTMLDivElement => {
    const image = document.createElement('div');
    image.style.position = 'absolute';
    image.style.left = `${config.x}px`;
    image.style.top = `${config.y}px`;
    image.style.width = `${config.size}px`;
    image.style.height = `${config.size}px`;
    image.style.transform = `rotate(${config.rotation}deg)`;
    image.style.opacity = '0.7';
    image.style.willChange = 'transform, top, left';
    image.style.transition = 'opacity 0.3s ease';
    image.style.backgroundImage = `url(${config.path})`;
    image.style.backgroundSize = 'contain';
    image.style.backgroundRepeat = 'no-repeat';
    image.style.backgroundPosition = 'center';
    
    (image as any).imageConfig = config;
    
    return image;
  };
  
  export const createImages = (count: number, container: HTMLElement): HTMLDivElement[] => {
    const images: HTMLDivElement[] = [];
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 40 + 40; // 40-80px
      const config = {
        path: ALLOWED_IMAGES[Math.floor(Math.random() * ALLOWED_IMAGES.length)],
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2
      };
      
      const image = createImageElement(config);
      images.push(image);
    }
    
    return images;
  };
  
  export const animateImages = (images: HTMLDivElement[], container: HTMLElement): () => void => {
    let animationFrameId: number;
    
    const animate = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      images.forEach(image => {
        const config = (image as any).imageConfig as ImageConfig;
        
        config.x += config.vx;
        config.y += config.vy;
        
        if (config.x <= 0 || config.x >= width - config.size) {
          config.vx *= -1;
          config.vy += (Math.random() - 0.5) * 0.5;
        }
        
        if (config.y <= 0 || config.y >= height - config.size) {
          config.vy *= -1;
          config.vx += (Math.random() - 0.5) * 0.5;
        }
        
        config.rotation += config.rotationSpeed;
        
        image.style.left = `${config.x}px`;
        image.style.top = `${config.y}px`;
        image.style.transform = `rotate(${config.rotation}deg)`;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  };