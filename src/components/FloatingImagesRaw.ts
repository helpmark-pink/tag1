const FloatingImagesRaw = `<style>
  .floating-image {
    position: absolute;
    pointer-events: none;
    opacity: 0.7;
    will-change: transform, top, left;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>

<script>
  (function() {
    const config = {
      imagesCount: 15,
      images: [
        '/images/1.png',
        '/images/2.png',
        '/images/3.png',
        '/images/4.png',
        '/images/5.png'
      ],
      minSize: 40,
      maxSize: 80,
      minSpeed: 0.5,
      maxSpeed: 2
    };

    const validateImage = (path) => {
      return config.images.includes(path);
    };

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.overflow = 'hidden';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '0';
    container.setAttribute('aria-hidden', 'true');

    const images = [];
    const imageElements = [];
    
    function createImage() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const imagePath = config.images[Math.floor(Math.random() * config.images.length)];
      
      if (!validateImage(imagePath)) {
        console.error('Invalid image path:', imagePath);
        return null;
      }

      const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
      
      const imageConfig = {
        path: imagePath,
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        vx: (Math.random() - 0.5) * (config.maxSpeed - config.minSpeed) + config.minSpeed,
        vy: (Math.random() - 0.5) * (config.maxSpeed - config.minSpeed) + config.minSpeed,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2
      };
      
      const element = document.createElement('div');
      element.className = 'floating-image';
      element.style.width = \`\${size}px\`;
      element.style.height = \`\${size}px\`;
      element.style.left = \`\${imageConfig.x}px\`;
      element.style.top = \`\${imageConfig.y}px\`;
      element.style.transform = \`rotate(\${imageConfig.rotation}deg)\`;
      element.style.backgroundImage = \`url(\${imagePath})\`;
      
      container.appendChild(element);
      images.push(imageConfig);
      imageElements.push(element);
      
      return { config: imageConfig, element };
    }
    
    function init() {
      document.body.appendChild(container);
      
      for (let i = 0; i < config.imagesCount; i++) {
        createImage();
      }
      
      animate();
      
      window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        images.forEach(image => {
          image.x = Math.min(image.x, width - image.size);
          image.y = Math.min(image.y, height - image.size);
        });
      });
    }
    
    function animate() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      images.forEach((image, index) => {
        const element = imageElements[index];
        
        image.x += image.vx;
        image.y += image.vy;
        
        if (image.x <= 0 || image.x >= width - image.size) {
          image.vx *= -1;
          image.vy += (Math.random() - 0.5) * 0.5;
        }
        
        if (image.y <= 0 || image.y >= height - image.size) {
          image.vy *= -1;
          image.vx += (Math.random() - 0.5) * 0.5;
        }
        
        image.rotation += image.rotationSpeed;
        
        element.style.left = \`\${image.x}px\`;
        element.style.top = \`\${image.y}px\`;
        element.style.transform = \`rotate(\${image.rotation}deg)\`;
      });
      
      requestAnimationFrame(animate);
    }
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
</script>`;

export default FloatingImagesRaw;