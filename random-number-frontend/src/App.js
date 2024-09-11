import React, { useState } from 'react';
import Roulette from './Roulette';

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const fetchRandomNumber = async () => {
    setLoading(true);
    setError(null);
    setSpinning(true);
    try {
      const response = await fetch('http://localhost:3001/random', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Error fetching the random number');
      }
      const data = await response.json();
      setRandomNumber(data.value);
    } catch (err) {
      setError(err.message);
    } finally {
      setTimeout(() => setSpinning(false), 3000);
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Random Number Generator</h1>
      <button onClick={fetchRandomNumber} disabled={loading}>
        {loading ? 'Loading...' : 'Get Random Number'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {randomNumber !== null && (
        <div>
          <p>Your random number is: {randomNumber}</p>
          <Roulette key={randomNumber} targetNumber={randomNumber - 1} spinning={spinning} />
        </div>
      )}
    </div>
  );
}

export default App;
