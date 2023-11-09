const verses = document.querySelectorAll('.verse');
        const transposeUpButton = document.getElementById('transposeUpButton');
        const transposeDownButton = document.getElementById('transposeDownButton');

        // Function to transpose chords by a specified number of half steps
        function transposeChords(steps) {
            verses.forEach(verse => {
                const chords = verse.querySelectorAll('.chord');
                chords.forEach(chord => {
                    const oldChord = chord.textContent;
                    chord.textContent = transposeChord(oldChord, steps);
                });
            });
        }

        // Function to transpose a single chord by a specified number of half steps
        function transposeChord(chord, steps) {
            const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
            const regex = /([A-G#b]+)(.*)/;
            const [, base, modifier] = chord.match(regex);

            const index = notes.indexOf(base);
            if (index === -1) {
                return chord; // Chord not found in the list, return it as is
            }

            // Handle negative transposition correctly
            let transposedIndex = (index + steps) % notes.length;
            if (transposedIndex < 0) {
                transposedIndex += notes.length;
            }
            const transposedBase = notes[transposedIndex];

            return transposedBase + modifier;
        }

        // Event listener for the transpose buttons
        transposeUpButton.addEventListener('click', () => {
            transposeChords(1); // Transpose up by one half step
        });

        transposeDownButton.addEventListener('click', () => {
            transposeChords(-1); // Transpose down by one half step
        });
