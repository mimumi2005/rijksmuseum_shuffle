import React from 'react';
import { useNavigate } from 'react-router-dom';

function RandomPainting({ painting }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (painting) {
      navigate(`/painting/${painting.objectNumber}`); // Navigate to the detail page
    }
  };

  if (!painting) return null;

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={painting.webImage.url} alt={painting.title} style={{ width: '400px' }} />
    </div>
  );
}

export default RandomPainting;