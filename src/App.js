// React neccesities
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Local components
import Header from './header';
import RandomPainting from './RandomPainting.js';
import PaintingDetail from './PaintingDetail'; 
import BackButton from "./BackButton";

// CSS, only one for this small website, usually would divide between CSS's files for different components
import './App.css';

function App() {
  const [paintings, setPaintings] = useState([]); // Store all paintings

  const fetchPaintings = async () => {
    try {
      const apiKey = '1aWfcdLV';
      const urls = [1, 2, 3].map(() =>
        `https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}&format=json&type=painting&ps=1&p=${Math.floor(Math.random() * 1000)}`
      );

      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const data = await Promise.all(responses.map((res) => res.json()));

      // Filter out duplicates based on `objectNumber`
      const newPaintings = data.map((d) => d.artObjects[0]).filter((painting, index, self) =>
        index === self.findIndex((p) => p.objectNumber === painting.objectNumber)
      );

      setPaintings(newPaintings);
    } catch (err) {
      console.error('Failed to fetch paintings', err);
    }
  };

  useEffect(() => {
    fetchPaintings(); // Fetch paintings when component mounts
  }, []);

  const randomizePaintings = () => {
    fetchPaintings(); // Re-fetch random paintings
  };

  // HTML and route logic for the application
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route
            path="/painting/:id"
            element={
              <>
                <div className="single-painting-container">
                  <PaintingDetail paintings={paintings} />
                </div>
                <BackButton />
              </>
            }
          />
          <Route
            path="/"
            element={
              <div>
                <div className="painting-container">
                  {paintings.map((painting) => (
                    <RandomPainting key={painting.objectNumber} painting={painting} />
                  ))}
                </div>
                <button className="custom-button" onClick={randomizePaintings}>Randomize Paintings</button>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
