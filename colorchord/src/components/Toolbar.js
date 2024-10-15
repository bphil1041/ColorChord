import React, { useEffect } from 'react';

const Toolbar = ({ setSelectedColor, selectedColor }) => {
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
            const color = keyToColor[e.key.toLowerCase()];
            if (color) {
                setSelectedColor(color);
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [setSelectedColor]);

    const buttonStyle = (color) => ({
        backgroundColor: selectedColor === color ? 'lightgray' : 'white',
        padding: '10px',
        margin: '5px',
        cursor: 'pointer'
    });

    return (
        <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1000 }}>
            <button style={buttonStyle('red')} onClick={() => setSelectedColor('red')}>Red (a)</button>
            <button style={buttonStyle('orangered')} onClick={() => setSelectedColor('orangered')}>Red-Orange (w)</button>
            <button style={buttonStyle('orange')} onClick={() => setSelectedColor('orange')}>Orange (s)</button>
            <button style={buttonStyle('darkorange')} onClick={() => setSelectedColor('darkorange')}>Yellow-Orange (e)</button>
            <button style={buttonStyle('yellow')} onClick={() => setSelectedColor('yellow')}>Yellow (d)</button>
            <button style={buttonStyle('yellowgreen')} onClick={() => setSelectedColor('yellowgreen')}>Yellow-Green (r)</button>
            <button style={buttonStyle('green')} onClick={() => setSelectedColor('green')}>Green (f)</button>
            <button style={buttonStyle('cyan')} onClick={() => setSelectedColor('cyan')}>Blue-Green (t)</button>
            <button style={buttonStyle('blue')} onClick={() => setSelectedColor('blue')}>Blue (g)</button>
            <button style={buttonStyle('indigo')} onClick={() => setSelectedColor('indigo')}>Blue-Violet (y)</button>
            <button style={buttonStyle('purple')} onClick={() => setSelectedColor('purple')}>Violet (h)</button>
            <button style={buttonStyle('magenta')} onClick={() => setSelectedColor('magenta')}>Red-Violet (u)</button>
        </div>
    );
};

export default Toolbar;
