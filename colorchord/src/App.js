import React, { useState } from 'react';
import DrawingCanvas from '../src/components/DrawingCanvas';
import Toolbar from '../src/components/Toolbar';

const App = () => {
  const [selectedColor, setSelectedColor] = useState('black'); // Default color

  return (
    <div>
      <Toolbar setSelectedColor={setSelectedColor} />
      <DrawingCanvas selectedColor={selectedColor} onStrokeEnd={() => { }} />
    </div>
  );
};

export default App;