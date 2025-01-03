import React, { useEffect, useState } from "react";
import "./Toolbar.css";

const Toolbar = ({
  setSelectedColor,
  selectedColor,
  selectedBrushSize,
  setSelectedBrushSize,
}) => {
  // State to control the visibility of the toolbar
  const [isVisible, setIsVisible] = useState(true);
  // State to control the fading animation states
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);
  // Mapping between keys and colors
  const keyToColor = {
    a: "red",
    w: "orangered",
    s: "orange",
    e: "darkorange",
    d: "yellow",
    r: "yellowgreen",
    f: "green",
    t: "cyan",
    g: "blue",
    y: "indigo",
    h: "purple",
    u: "magenta",
  };

  // Mapping between colors and musical pitches
  const colorToPitch = {
    red: "C",
    orangered: "C#",
    orange: "D",
    darkorange: "D#",
    yellow: "E",
    yellowgreen: "F",
    green: "F#",
    cyan: "G",
    blue: "G#",
    indigo: "A",
    purple: "A#",
    magenta: "B",
  };

  // Handle keydown events to control toolbar visibility and color selection
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();

        // Toggle toolbar visibility
        if (isVisible) {
          setIsFadingOut(true);
          setTimeout(() => {
            setIsVisible(false);
            setIsFadingOut(false);
          }, 300);
        } else {
          setIsVisible(true);
          setIsFadingIn(true);
          setTimeout(() => {
            setIsFadingIn(false);
          }, 300);
        }
      }

      // Set the selected color based on the pressed key
      const color = keyToColor[e.key.toLowerCase()];
      if (color) {
        setSelectedColor(color);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Cleanup function to remove event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setSelectedColor, isVisible]);
  // Handle brush size change from the input element
  const handleBrushSizeChange = (e) => {
    setSelectedBrushSize(Number(e.target.value));
  };

  return (
    <div
      className={`toolbar-container ${isFadingOut ? "fade-out" : ""} ${
        isFadingIn ? "fade-in" : ""
      }`}
      style={{ display: isVisible ? "flex" : "none" }}
    >
      <div className="color-buttons">
        {Object.entries(keyToColor).map(([key, color]) => (
          <button
            key={color}
            className={`color-button ${
              selectedColor === color ? "selected" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)} ({key}) -{" "}
            {colorToPitch[color]}
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
        <p className="keyboard-shortcuts">
          <strong>Shift:</strong> Octave Up | <strong>Space Bar:</strong> Octave
          Down | <strong>Tab:</strong> Hide / Show Toolbar
        </p>
      </div>
    </div>
  );
};

export default Toolbar;
