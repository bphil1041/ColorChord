import * as Tone from "tone";

// Global variables for synth and current octave
let synth;
let currentOctave = 4;

// Map colors to musical notes
const colorToNote = {
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

// Function to start the sound for the given color
const startSoundForColor = (color) => {
  // Create synth if it doesn't exist
  if (!synth) {
    synth = new Tone.Synth().toDestination();
  }

  // Get the note for the color, defaulting to 'C'
  const baseNote = colorToNote[color] || "C";

  // Combine note and octave to form the full note name
  const noteWithOctave = `${baseNote}${currentOctave}`;

  // Trigger the synth to play the note
  synth.triggerAttack(noteWithOctave);
};

// Function to stop the sound
const stopSound = () => {
  if (synth) {
    synth.triggerRelease();
  }
};

// Function to modulate pitch based on y-axis distance
const modulatePitch = (yDistance) => {
  if (synth) {
    const pitchBendAmount = yDistance / -750; // Adjust scaling factor as needed
    synth.detune.value = pitchBendAmount * 100;
  }
};

// Function to change the octave
const changeOctave = (increment) => {
  currentOctave = Math.max(1, Math.min(currentOctave + increment, 6));
  console.log(`Octave changed to: ${currentOctave}`);
};

// Event listener for octave change keys
window.addEventListener("keydown", (event) => {
  if (event.key === "Shift") {
    changeOctave(1); // Increase octave
  } else if (event.key === " ") {
    changeOctave(-1); // Decrease octave
  }
});

export { startSoundForColor, stopSound, modulatePitch };
