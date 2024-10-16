import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { startSoundForColor, stopSound, modulatePitch } from './SoundManager'; // Import updated functions

const DrawingCanvas = ({ selectedColor, selectedBrushSize, onStrokeEnd }) => {
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);
    const startPoint = useRef({ x: 0, y: 0 }); // To track the starting point of the drawing
    const currentColor = useRef(selectedColor); // Track the current color for pitch modulation

    // This hook listens for changes in the selected color
    useEffect(() => {
        currentColor.current = selectedColor; // Update the reference to the new color
    }, [selectedColor]); // Triggered whenever selectedColor changes

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        startPoint.current = point; // Store the starting point

        // Start a new line with the selected color and brush size
        const newLine = { points: [], color: selectedColor, strokeWidth: selectedBrushSize };
        setLines((prevLines) => [...prevLines, newLine]);
        startSoundForColor(selectedColor); // Start sound when mouse is pressed
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current) return;

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];

        // Update the current color if it has changed
        if (currentColor.current !== lastLine.color) {
            lastLine.color = currentColor.current; // Update the color of the current line
            startSoundForColor(currentColor.current); // Update sound to the new color
        }

        // Add new points to the current line
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // Calculate the y-axis distance moved from the starting point
        const yDistance = point.y - startPoint.current.y; // Only use the y-axis distance
        modulatePitch(yDistance); // Modulate pitch based on the y-axis distance

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
