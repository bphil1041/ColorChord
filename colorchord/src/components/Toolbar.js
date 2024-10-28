import React, { useEffect, useState } from 'react';
import './Toolbar.css';

const Toolbar = ({ setSelectedColor, selectedColor, selectedBrushSize, setSelectedBrushSize }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isFadingIn, setIsFadingIn] = useState(false);
    const keyToColor = {
        a: 'red',
        w: 'orangered',
        s: 'orange',
        e: 'darkorange',
        d: 'yellow',
        r: 'yellowgreen',
        f: 'green',
        t: 'cyan',
        g: 'blue',
        y: 'indigo',
        h: 'purple',
        u: 'magenta'
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Prevent the default Tab behavior to avoid shifting focus
            if (e.key === 'Tab') {
                e.preventDefault();
                if (isVisible) {
                    setIsFadingOut(true);
                    setTimeout(() => {
                        setIsVisible(false);
                        setIsFadingOut(false);
                    }, 300); // Match this duration with the CSS transition duration
                } else {
                    setIsVisible(true);
                    setIsFadingIn(true);
                    setTimeout(() => {
                        setIsFadingIn(false);
                    }, 300); // Match this duration with the CSS transition duration
                }
            }

            const color = keyToColor[e.key.toLowerCase()];
            if (color) {
                setSelectedColor(color);
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [setSelectedColor, isVisible]);

    const handleBrushSizeChange = (e) => {
        setSelectedBrushSize(Number(e.target.value));
    };

    return (
        <div
            className={`toolbar-container ${isFadingOut ? 'fade-out' : ''} ${isFadingIn ? 'fade-in' : ''}`}
            style={{ display: isVisible ? 'flex' : 'none' }}
        >
            <div className="color-buttons">
                {Object.entries(keyToColor).map(([key, color]) => (
                    <button
                        key={color}
                        className={`color-button ${selectedColor === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                    >
                        {color.charAt(0).toUpperCase() + color.slice(1)} ({key})
                    </button>
                ))}
            </div>
            <div className="toolbar-header">
                <div className="brush-size-container">
                    <label>Brush Size: {selectedBrushSize}px</label>
                    <input
                        type="range"
                        min="1"
                        max="500"
                        value={selectedBrushSize}
                        onChange={handleBrushSizeChange}
                    />
                </div>
                <p className="keyboard-shortcuts"><strong>Shift:</strong> Octave Up | <strong>Space Bar:</strong> Octave Down | <strong>Tab:</strong> Hide / Show Toolbar</p>
            </div>
        </div>
    );
};

export default Toolbar;
