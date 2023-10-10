import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

const AuthBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const starCount = 50; // Número de estrellas que deseas mostrar
      const starSizeRange = [5, 15]; // Rango de tamaños de estrellas
      const screenWidth = window.innerWidth; // Ancho de la pantalla
      const screenHeight = window.innerHeight; // Alto de la pantalla

      const newStars = [];

      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * screenWidth; // Posición X aleatoria dentro del ancho de la pantalla
        const y = Math.random() * screenHeight; // Posición Y aleatoria dentro del alto de la pantalla
        const size = Math.random() * (starSizeRange[1] - starSizeRange[0]) + starSizeRange[0]; // Tamaño aleatorio

        newStars.push(
          <polygon
            key={i}
            points="50,10 61.8,35.4 88.7,35.4 68.2,57.3 79.9,82.7 50,67.3 20.1,82.7 31.8,57.3 11.3,35.4 38.2,35.4"
            fill="#FFD700"
            transform={`translate(${x},${y}) scale(${size / 100})`}
          />
        );
      }

      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <Box sx={{ position: 'absolute', zIndex: -1, top: 0, left: 0, width: '100%', height: '100%' }}>
      <svg width="100%" height="100%" xmlns="">
        {stars}
      </svg>
    </Box>
  );
};

export default AuthBackground;
