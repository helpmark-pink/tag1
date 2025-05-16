const FloatingShapesRaw = `<style>
  .floating-shape {
    position: absolute;
    pointer-events: none;
    opacity: 0.7;
    will-change: transform, top, left;
  }
  .floating-shape.heart {
    background-repeat: no-repeat;
    background-size: contain;
  }
  .floating-shape.circle {
    border-radius: 50%;
  }
  .floating-shape.triangle {
    width: 0 !important;
    height: 0 !important;
    background-color: transparent !important;
  }
</style>

<script>
  (function() {
    // Configuration
    const config = {
      shapesCount: 25,
      colors: ['#FF6B6B', '#4ECDC4', '#F9D423', '#7D5BA6', '#4A90E2'],
      types: ['heart', 'circle', 'square', 'triangle'],
      minSize: 15,
      maxSize: 45,
      minSpeed: 0.5,
      maxSpeed: 2
    };

    // Create container for shapes
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

    // Create shapes
    const shapes = [];
    const shapeElements = [];
    
    function createShape() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const type = config.types[Math.floor(Math.random() * config.types.length)];
      const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
      const color = config.colors[Math.floor(Math.random() * config.colors.length)];
      
      const shape = {
        type,
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        color,
        vx: (Math.random() - 0.5) * (config.maxSpeed - config.minSpeed) + config.minSpeed,
        vy: (Math.random() - 0.5) * (config.maxSpeed - config.minSpeed) + config.minSpeed,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2
      };
      
      const element = document.createElement('div');
      element.className = \`floating-shape \${type}\`;
      element.style.width = \`\${size}px\`;
      element.style.height = \`\${size}px\`;
      element.style.left = \`\${shape.x}px\`;
      element.style.top = \`\${shape.y}px\`;
      element.style.transform = \`rotate(\${shape.rotation}deg)\`;
      
      switch (type) {
        case 'heart':
          // SVG heart path encoded for use in CSS
          const encodedColor = encodeURIComponent(color);
          element.style.backgroundImage = \`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='\${encodedColor}' stroke='none'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E")\`;
          break;
        case 'circle':
        case 'square':
          element.style.backgroundColor = color;
          break;
        case 'triangle':
          element.style.borderLeft = \`\${size / 2}px solid transparent\`;
          element.style.borderRight = \`\${size / 2}px solid transparent\`;
          element.style.borderBottom = \`\${size}px solid \${color}\`;
          break;
      }
      
      container.appendChild(element);
      shapes.push(shape);
      shapeElements.push(element);
      
      return { shape, element };
    }
    
    // Initialize
    function init() {
      document.body.appendChild(container);
      
      for (let i = 0; i < config.shapesCount; i++) {
        createShape();
      }
      
      animate();
      
      // Handle window resize
      window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        shapes.forEach(shape => {
          // Keep shapes within bounds after resize
          shape.x = Math.min(shape.x, width - shape.size);
          shape.y = Math.min(shape.y, height - shape.size);
        });
      });
    }
    
    // Animation loop
    function animate() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      shapes.forEach((shape, index) => {
        const element = shapeElements[index];
        
        // Update position
        shape.x += shape.vx;
        shape.y += shape.vy;
        
        // Bounce off walls with some randomness
        if (shape.x <= 0 || shape.x >= width - shape.size) {
          shape.vx *= -1;
          shape.vy += (Math.random() - 0.5) * 0.5;
        }
        
        if (shape.y <= 0 || shape.y >= height - shape.size) {
          shape.vy *= -1;
          shape.vx += (Math.random() - 0.5) * 0.5;
        }
        
        // Apply rotation
        shape.rotation += shape.rotationSpeed;
        
        // Update element
        element.style.left = \`\${shape.x}px\`;
        element.style.top = \`\${shape.y}px\`;
        element.style.transform = \`rotate(\${shape.rotation}deg)\`;
      });
      
      requestAnimationFrame(animate);
    }
    
    // Start when DOM is loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
</script>`;

export default FloatingShapesRaw;