import React, { useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { startSoundForColor, stopSound } from './SoundManager'; // Import new functions

const DrawingCanvas = ({ selectedColor, onStrokeEnd }) => {
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);

    const handleMouseDown = () => {
        isDrawing.current = true;
        // Start a new line with the selected color
        setLines([...lines, { points: [], color: selectedColor }]);
        // Start sound for the currently selected color immediately when mouse is clicked
        startSoundForColor(selectedColor);
    };

    const handleMouseMove = (e) => {
        // Skip if not currently drawing
        if (!isDrawing.current) return;

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        // Add point to the last line
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // Update the lines array
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
                        strokeWidth={5}
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
