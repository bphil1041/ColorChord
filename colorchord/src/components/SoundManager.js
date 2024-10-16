import * as Tone from 'tone';

let synth; // Declare synth globally to ensure it's accessible across functions
let currentOctave = 4; // Set the default octave to 4 (middle octave)

// Add event listeners to detect when specific keys are pressed (Shift and Space)
// Shift key increases the octave by 1, Space bar decreases it by 1
window.addEventListener('keydown', (event) => {
    if (event.key === 'Shift') {
        changeOctave(1); // Increase octave when Shift key is pressed
    } else if (event.key === ' ') { // Detect space bar
        changeOctave(-1); // Decrease octave when space bar is pressed
    }
});

const changeOctave = (increment) => {
    // Modify the current octave by the specified increment
    // Ensure the octave stays within a valid range (1 to 6 in this case)
    currentOctave = Math.max(1, Math.min(currentOctave + increment, 6));
    console.log(`Octave changed to: ${currentOctave}`); // Output the current octave to the console
};

const startSoundForColor = (color) => {
    // Initialize the synth object if it doesn't exist yet
    if (!synth) {
        synth = new Tone.Synth().toDestination(); // Create a new synth and route its output to the speakers
    }

    // Map color names to specific musical notes (without octave information)
    const colorToNote = {
        red: 'C',        // C natural
        orangered: 'C#', // C sharp
        orange: 'D',     // D natural
        darkorange: 'D#',// D sharp
        yellow: 'E',     // E natural
        yellowgreen: 'F',// F natural
        green: 'F#',     // F sharp
        cyan: 'G',       // G natural
        blue: 'G#',      // G sharp
        indigo: 'A',     // A natural
        purple: 'A#',    // A sharp
        magenta: 'B'     // B natural
    };

    const baseNote = colorToNote[color] || 'C'; // Default to 'C' if the color isn't mapped
    const noteWithOctave = `${baseNote}${currentOctave}`; // Combine the note and current octave
    synth.triggerAttack(noteWithOctave); // Start playing the note
};

const stopSound = () => {
    // Release (stop) the sound if the synth exists
    if (synth) {
        synth.triggerRelease(); // Stop playing the note
    }
};

export { startSoundForColor, stopSound };
