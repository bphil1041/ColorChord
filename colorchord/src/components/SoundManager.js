import * as Tone from 'tone';

let synth; // Declare synth outside to manage it globally

const startSoundForColor = (color) => {
    if (!synth) {
        synth = new Tone.Synth().toDestination();
    }

    // Map color to a specific note or sound frequency
    const colorToNote = {
        red: 'C4',
        orangered: 'C#4',
        orange: 'D4',
        darkorange: 'D#4',
        yellow: 'E4',
        yellowgreen: 'F4',
        green: 'F#4',
        cyan: 'G4',
        blue: 'G#4',
        indigo: 'A4',
        purple: 'A#4',
        magenta: 'B4'
    };

    const note = colorToNote[color] || 'C4'; // Default to C4 if color isn't mapped
    synth.triggerAttack(note); // Start sound without releasing
};

const stopSound = () => {
    if (synth) {
        synth.triggerRelease(); // Stop the sound
    }
};

export { startSoundForColor, stopSound };
