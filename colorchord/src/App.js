import React, { useState } from 'react';
import DrawingCanvas from '../src/components/DrawingCanvas';
import Toolbar from '../src/components/Toolbar';

const App = () => {
  const [selectedColor, setSelectedColor] = useState('black'); // Default color
  const [selectedBrushSize, setSelectedBrushSize] = useState(5); // Default brush size

  // Define the handleStrokeEnd function
  const handleStrokeEnd = () => {
    console.log('Stroke ended!');
    // You can add any additional logic when the drawing stroke ends
  };

  return (
    <div>
      <Toolbar
        setSelectedColor={setSelectedColor}
        selectedColor={selectedColor}
        setSelectedBrushSize={setSelectedBrushSize}
        selectedBrushSize={selectedBrushSize}
      />
      <DrawingCanvas
        selectedColor={selectedColor}
        selectedBrushSize={selectedBrushSize}
        onStrokeEnd={handleStrokeEnd} // Use the newly defined function
      />
    </div>
  );
};

export default App;
