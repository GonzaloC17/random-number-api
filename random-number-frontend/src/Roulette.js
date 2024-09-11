import React, { useEffect, useState } from 'react';
import { useSpring, animated, easings } from '@react-spring/web';

const Roulette = ({ targetNumber, spinning }) => {
  const [angle, setAngle] = useState(0);
  const [resetKey, setResetKey] = useState(0); 

  useEffect(() => {
    if (spinning) {
      const targetAngle = 360 * 5 + (360 / 100) * (100 - targetNumber);

      setAngle(targetAngle);
      setResetKey(prevKey => prevKey + 1); 
    }
  }, [targetNumber, spinning]);

  const { transform } = useSpring({
    transform: `rotate(${angle}deg)`,
    config: {
      duration: 3000, 
      easing: easings.easeOutQuad, 
    },
    reset: true, 
  });

  return (
    <div style={{ position: 'relative', width: '600px', height: '600px' }}>
      {/* Contenedor para los números */}
      <animated.div
        key={resetKey}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '10px solid #333',
          backgroundColor: '#fff',
          transformOrigin: 'center',
          transform,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {[...Array(100).keys()].map((num) => (
          <div
            key={num}
            style={{
              position: 'absolute',
              transform: `rotate(${(360 / 100) * num}deg) translateY(-300px)`,
              transformOrigin: 'center',
              textAlign: 'center',
              width: '20px',
              height: '20px',
              lineHeight: '20px',
              backgroundColor: num === targetNumber ? '#ff5733' : '#eee',
              borderRadius: '50%',
              color: num === targetNumber ? '#fff' : '#000',
              fontSize: '7px',
              fontWeight: 'bold',
              border: '1px solid #ddd',
              boxShadow: num === targetNumber ? '0 0 10px rgba(0,0,0,0.5)' : 'none',
            }}
          >
            {num + 1}
          </div>
        ))}
      </animated.div>
      {}
      <div
        style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          width: '0',
          height: '0',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '20px solid black', 
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  );
};

export default Roulette;
