import React, { useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { startSoundForColor, stopSound } from './SoundManager'; // Import new functions

const DrawingCanvas = ({ selectedColor, selectedBrushSize, onStrokeEnd }) => {
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);

    const handleMouseDown = () => {
        isDrawing.current = true;
        // Start a new line with the selected color and brush size
        setLines([...lines, { points: [], color: selectedColor, strokeWidth: selectedBrushSize }]);
        startSoundForColor(selectedColor); // Start sound when mouse is pressed
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current) return;

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        // Add new points to the current line
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
        onStrokeEnd(); // Callback for when stroke ends
        stopSound(); // Stop the sound when mouse is released
    };

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <Layer>
                {lines.map((line, index) => (
                    <Line
                        key={index}
                        points={line.points}
                        stroke={line.color} // Use the color of each line
                        strokeWidth={line.strokeWidth} // Use brush size for stroke width
                        tension={0.5}
                        lineCap="round"
                        lineJoin="round"
                    />
                ))}
            </Layer>
        </Stage>
    );
};

export default DrawingCanvas;
