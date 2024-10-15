import React from 'react';

const Toolbar = ({ setSelectedColor }) => {
    return (
        <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1000 }}>

            <button onClick={() => setSelectedColor('red')}>Red</button>
            <button onClick={() => setSelectedColor('blue')}>Blue</button>
            <button onClick={() => setSelectedColor('green')}>Green</button>
            <button onClick={() => setSelectedColor('yellow')}>Yellow</button>
            <button onClick={() => setSelectedColor('purple')}>Purple</button>
        </div>
    );
};

export default Toolbar;
