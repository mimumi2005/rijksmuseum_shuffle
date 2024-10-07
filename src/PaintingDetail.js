import React from 'react';
import { useParams } from 'react-router-dom';

function PaintingDetail({ paintings }) {
  const { id } = useParams(); // Get the painting ID from the URL
  const painting = paintings.find((p) => p.objectNumber === id); // Find the painting by objectNumber

  if (!painting) return <p>Painting not found</p>;

  return (
    <div>
      <h2>{painting.title}</h2>
      <p>{painting.principalOrFirstMaker}</p>
      <img src={painting.webImage.url} alt={painting.title} style={{ width: '500px'}} />
      <p>Description: {painting.longTitle}</p>
    </div>
  );
}

export default PaintingDetail;
