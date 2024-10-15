import * as Tone from 'tone';

let synth; // Declare synth outside to manage it globally

const startSoundForColor = (color) => {
    if (!synth) {
        synth = new Tone.Synth().toDestination();
    }

    // Map color to a specific note or sound frequency
    const colorToNote = {
        red: 'C4',
        blue: 'D4',
        green: 'E4',
        yellow: 'F4',
        purple: 'G4',
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
