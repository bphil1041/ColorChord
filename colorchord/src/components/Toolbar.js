import React from 'react';

const Toolbar = ({ setSelectedColor }) => {
    return (
        <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1000 }}>

            <button onClick={() => setSelectedColor('red')}>Red</button>
            <button onClick={() => setSelectedColor('orangered')}>Red-Orange</button>
            <button onClick={() => setSelectedColor('orange')}>Orange</button>
            <button onClick={() => setSelectedColor('darkorange')}>Yellow-Orange</button>
            <button onClick={() => setSelectedColor('yellow')}>Yellow</button>
            <button onClick={() => setSelectedColor('yellowgreen')}>Yellow-Green</button>
            <button onClick={() => setSelectedColor('green')}>Green</button>
            <button onClick={() => setSelectedColor('cyan')}>Blue-Green (Cyan)</button>
            <button onClick={() => setSelectedColor('blue')}>Blue</button>
            <button onClick={() => setSelectedColor('indigo')}>Blue-Violet (Indigo)</button>
            <button onClick={() => setSelectedColor('purple')}>Violet (Purple)</button>
            <button onClick={() => setSelectedColor('magenta')}>Red-Violet (Magenta)</button>

        </div>
    );
};

export default Toolbar;
