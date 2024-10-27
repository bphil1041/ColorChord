import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { startSoundForColor, stopSound, modulatePitch } from './SoundManager';

const DrawingCanvas = ({ selectedColor, selectedBrushSize, onStrokeEnd }) => {
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);
    const startPoint = useRef({ x: 0, y: 0 });
    const isNewSegment = useRef(false);

    // Track color changes to start a new line segment with a new color
    useEffect(() => {
        if (isDrawing.current) {
            endCurrentSegment();
            startNewSegment();
        }
    }, [selectedColor]);

    const startNewSegment = () => {
        isNewSegment.current = true;
        // Create a new line segment with the selected color, without any initial points
        const newLine = { points: [], color: selectedColor, strokeWidth: selectedBrushSize };
        setLines((prevLines) => [...prevLines, newLine]);
        startSoundForColor(selectedColor); // Start sound for the new segment
    };

    const endCurrentSegment = () => {
        stopSound(); // Stop sound for the current segment
    };

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        startPoint.current = point;
        startNewSegment();
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current) return;

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();

        // Add points only when the mouse moves, avoiding the initial extra point
        const lastLineIndex = lines.length - 1;
        const lastLine = lines[lastLineIndex];
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // Modulate pitch based on y-axis movement
        const yDistance = point.y - startPoint.current.y;
        modulatePitch(yDistance);

        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
        endCurrentSegment();
        onStrokeEnd();
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
                        stroke={line.color}
                        strokeWidth={line.strokeWidth}
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
