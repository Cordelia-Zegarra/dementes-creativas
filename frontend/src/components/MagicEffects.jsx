import React, { useEffect, useState } from 'react';

// Elementos temáticos de Harry Potter (sin emojis genéricos)
const HarryPotterElements = () => {
  const elements = [
    { icon: '⚡', label: 'Cicatriz de Harry', top: 5, left: 2, delay: 0 },
    { icon: '🪄', label: 'Varita de Saúco', top: 85, left: 90, delay: 1 },
    { icon: '🔮', label: 'Crástalo de Profecía', top: 15, left: 88, delay: 2 },
    { icon: '🦉', label: 'Hedwig', top: 70, left: 5, delay: 0.5 },
    { icon: '🐍', label: 'Slytherin', top: 45, left: 92, delay: 1.5 },
    { icon: '🦁', label: 'Gryffindor', top: 30, left: 3, delay: 2.5 },
    { icon: '🦅', label: 'Ravenclaw', top: 60, left: 95, delay: 3 },
    { icon: '🦡', label: 'Hufflepuff', top: 20, left: 95, delay: 0.8 },
    { icon: '🏆', label: 'Copa de las Casas', top: 50, left: 8, delay: 1.2 },
    { icon: '📜', label: 'Pergamino', top: 75, left: 85, delay: 2.2 },
    { icon: '🚂', label: 'Hogwarts Express', top: 10, left: 85, delay: 3.5 },
    { icon: '🏰', label: 'Castillo de Hogwarts', top: 88, left: 8, delay: 0.3 },
  ];
  
  return (
    <>
      {elements.map((el, idx) => (
        <div
          key={idx}
          className="fixed pointer-events-none z-0 text-4xl opacity-40"
          style={{
            top: `${el.top}%`,
            left: `${el.left}%`,
            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${el.delay}s`,
          }}
          title={el.label}
        >
          {el.icon}
        </div>
      ))}
    </>
  );
};

// Estrellas fugaces tipo "Varitas Mágicas"
const MagicWands = () => {
  const [wands, setWands] = useState([]);
  
  useEffect(() => {
    const wandArray = [];
    for (let i = 0; i < 6; i++) {
      wandArray.push({
        id: i,
        delay: i * 1.5,
        top: Math.random() * 100,
      });
    }
    setWands(wandArray);
  }, []);
  
  return (
    <>
      {wands.map((wand) => (
        <div
          key={wand.id}
          className="fixed pointer-events-none"
          style={{
            top: `${wand.top}%`,
            left: '-10%',
            animation: `shootingStar ${3}s linear infinite`,
            animationDelay: `${wand.delay}s`,
          }}
        >
          <span className="text-magic-gold text-xl">✨</span>
        </div>
      ))}
    </>
  );
};

// Sombrero Seleccionador decorativo
const SortingHat = () => (
  <div className="fixed bottom-4 right-4 pointer-events-none z-0 opacity-30">
    <div className="text-6xl animate-float-slow">🎩</div>
    <div className="text-xs text-magic-gold/50 mt-1">Sombrero Seleccionador</div>
  </div>
);

// Lechuza mensajera
const Owl = () => (
  <div className="fixed top-4 right-4 pointer-events-none z-0 opacity-40">
    <div className="text-5xl animate-float" style={{ animationDuration: '4s' }}>🦉</div>
  </div>
);

// Efecto de varita mágica (aparece al hacer login)
const WandEffect = ({ isActive }) => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    if (isActive) {
      const particleArray = [];
      for (let i = 0; i < 30; i++) {
        particleArray.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 0.5,
        });
      }
      setParticles(particleArray);
      
      const timer = setTimeout(() => setParticles([]), 1000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);
  
  if (!isActive) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-magic-gold text-xl"
          style={{
            left: `${p.left}%`,
            top: '50%',
            animation: `sparkleUp 0.8s ease-out forwards`,
            animationDelay: `${p.delay}s`,
          }}
        >
          ✨
        </div>
      ))}
      <style>{`
        @keyframes sparkleUp {
          0% {
            transform: translateY(0) scale(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export { HarryPotterElements, MagicWands, SortingHat, Owl, WandEffect };
