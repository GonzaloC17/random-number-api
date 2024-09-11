import React, { useState } from 'react';

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomNumber = async () => {
    setLoading(true);
    setError(null);
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
      {randomNumber !== null && <p>Your random number is: {randomNumber}</p>}
    </div>
  );
}

export default App;
