import * as Tone from 'tone';

let synth; // Declare synth globally to ensure it's accessible across functions
let currentOctave = 4; // Set the default octave to 4 (middle octave)

// Function to start the sound for the given color
const startSoundForColor = (color) => {
    if (!synth) {
        synth = new Tone.Synth().toDestination(); // Create a new synth and route its output to the speakers
    }

    const colorToNote = {
        red: 'C',
        orangered: 'C#',
        orange: 'D',
        darkorange: 'D#',
        yellow: 'E',
        yellowgreen: 'F',
        green: 'F#',
        cyan: 'G',
        blue: 'G#',
        indigo: 'A',
        purple: 'A#',
        magenta: 'B'
    };

    const baseNote = colorToNote[color] || 'C'; // Default to 'C' if no match
    const noteWithOctave = `${baseNote}${currentOctave}`; // Combine the note and octave
    synth.triggerAttack(noteWithOctave); // Start playing the note
};

// Function to stop the sound
const stopSound = () => {
    if (synth) {
        synth.triggerRelease(); // Stop playing the note
    }
};

// Function to modulate pitch based on the y-axis distance from the clicked point
const modulatePitch = (yDistance) => {
    if (synth) {
        const pitchBendAmount = yDistance / -750; // Scale factor for modulation
        synth.detune.value = pitchBendAmount * 100; // Modulate pitch using detune
    }
};

// Function to handle octave change
const changeOctave = (increment) => {
    currentOctave = Math.max(1, Math.min(currentOctave + increment, 6));
    console.log(`Octave changed to: ${currentOctave}`);
};

window.addEventListener('keydown', (event) => {
    if (event.key === 'Shift') {
        changeOctave(1); // Increase octave
    } else if (event.key === ' ') {
        changeOctave(-1); // Decrease octave
    }
});

export { startSoundForColor, stopSound, modulatePitch };
