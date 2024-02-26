// BulbPage.js
import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import bulb_on from './animations/bulb_on.png';
import bulb_off from './animations/bulb_off.png';
import { Link } from 'react-router-dom';

const BulbPage = ({ onClose }) => {
  const [isBulbOn, setIsBulbOn] = useState(false);

  const handleToggle = () => {
    setIsBulbOn((prev) => !prev);

    const apiUrl = 'http://192.168.1.117:5000/led'; // Replace with your Flask API endpoint
    const payload = { status: isBulbOn ? '0' : '1' }; // Assuming '0' means Turn Off, and '1' means Turn On

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => console.log('API response:', data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <Container style={{ marginTop: '20px', display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center', marginBottom:'20px' }}>
      <h1>Blink An LED</h1>
      <img
        src={isBulbOn ? bulb_on : bulb_off}
        alt={isBulbOn ? 'Bulb On' : 'Bulb Off'}
        style={{ width: '150px', height: '150px' }}
      />
      <div>
        <Button variant="primary" onClick={handleToggle}>
          {isBulbOn ? 'Turn Off' : 'Turn On'}
        </Button>
        <Button variant="primary" style={{ marginLeft: '10px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }} onClick={onClose}>
            Go to Home
          </Link>
        </Button>
      </div>
    </Container>
  );
};

export default BulbPage;
