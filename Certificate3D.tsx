
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const Certificate3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xd4af37, 2, 10);
    pointLight.position.set(2, 2, 4);
    scene.add(pointLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(-5, 5, 10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // Certificate Texture creation via Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Background
      ctx.fillStyle = '#fdfbfb';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ornate Border
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 20;
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
      
      ctx.lineWidth = 5;
      ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

      // Gold Corners
      const drawCorner = (x: number, y: number, rotation: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.fillStyle = '#d4af37';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(60, 0);
        ctx.lineTo(0, 60);
        ctx.fill();
        ctx.restore();
      };
      drawCorner(40, 40, 0);
      drawCorner(canvas.width - 40, 40, Math.PI / 2);
      drawCorner(canvas.width - 40, canvas.height - 40, Math.PI);
      drawCorner(40, canvas.height - 40, -Math.PI / 2);

      // Text Content
      ctx.textAlign = 'center';
      ctx.fillStyle = '#0b0f1a';

      // Header
      ctx.font = 'normal 24px Cinzel';
      ctx.fillText('ST. MICHAELS CONVENT SCHOOL', canvas.width / 2, 150);
      
      ctx.font = 'bold 60px Cinzel';
      ctx.fillStyle = '#d4af37';
      ctx.fillText('CERTIFICATE OF EXCELLENCE', canvas.width / 2, 230);

      ctx.font = 'italic 28px "Playfair Display"';
      ctx.fillStyle = '#666';
      ctx.fillText('This Certificate is Proudly Presented To', canvas.width / 2, 300);

      // Name
      ctx.font = 'bold 80px Cinzel';
      ctx.fillStyle = '#0b0f1a';
      ctx.fillText('ASFA', canvas.width / 2, 400);

      // Description
      ctx.font = 'italic 22px "Playfair Display"';
      ctx.fillStyle = '#444';
      const lines = [
        'For Outstanding Excellence in Teaching English,',
        'For Inspiring Minds, Encouraging Creativity,',
        'And Making Literature Come Alive.'
      ];
      lines.forEach((line, i) => {
        ctx.fillText(line, canvas.width / 2, 470 + (i * 35));
      });

      // Signature Placeholder - Drawing it for now as a luxury script
      ctx.font = '40px "Great Vibes"';
      ctx.fillStyle = '#0b0f1a';
      ctx.fillText('A. Rafay', canvas.width / 2 + 200, 650);

      // Signature Line
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 + 50, 660);
      ctx.lineTo(canvas.width / 2 + 350, 660);
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = 'normal 14px Cinzel';
      ctx.fillStyle = '#888';
      ctx.fillText('CLASS OF AWARDER FOUNDER', canvas.width / 2 + 200, 685);

      // Embossed Seal
      ctx.beginPath();
      ctx.arc(180, 650, 60, 0, Math.PI * 2);
      ctx.fillStyle = '#d4af37';
      ctx.fill();
      ctx.strokeStyle = '#b38728';
      ctx.lineWidth = 4;
      ctx.stroke();
      
      ctx.fillStyle = '#fdfbfb';
      ctx.font = 'bold 12px Cinzel';
      ctx.fillText('OFFICIAL', 180, 645);
      ctx.fillText('SEAL', 180, 665);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Geometry
    const geometry = new THREE.BoxGeometry(4 * 1.3, 3 * 1.3, 0.05);
    const materials = [
      new THREE.MeshStandardMaterial({ color: 0xd4af37 }), // right
      new THREE.MeshStandardMaterial({ color: 0xd4af37 }), // left
      new THREE.MeshStandardMaterial({ color: 0xd4af37 }), // top
      new THREE.MeshStandardMaterial({ color: 0xd4af37 }), // bottom
      new THREE.MeshStandardMaterial({ map: texture, roughness: 0.3, metalness: 0.2 }), // front
      new THREE.MeshStandardMaterial({ color: 0xffffff }), // back
    ];

    const certificateMesh = new THREE.Mesh(geometry, materials);
    certificateMesh.rotation.x = 0.2;
    certificateMesh.rotation.y = -0.2;
    scene.add(certificateMesh);

    // Shimmer sweep effect (using a plane with additive blending or just moving light)
    const shimmerLight = new THREE.DirectionalLight(0xffffff, 1);
    shimmerLight.position.set(-10, 0, 5);
    scene.add(shimmerLight);

    // Scroll trigger for rotation
    gsap.to(certificateMesh.rotation, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
      y: Math.PI * 2,
      x: 0.1,
    });

    // Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth) - 0.5;
      const mouseY = (e.clientY / window.innerHeight) - 0.5;
      
      gsap.to(certificateMesh.rotation, {
        y: (certificateMesh.rotation.y + mouseX * 0.2),
        x: (certificateMesh.rotation.x - mouseY * 0.2),
        duration: 1,
        ease: 'power2.out'
      });

      gsap.to(shimmerLight.position, {
        x: mouseX * 10,
        y: -mouseY * 10,
        duration: 2,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto"
    />
  );
};

export default Certificate3D;
