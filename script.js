async function getDefinition() {
    const word = document.getElementById('wordInput').value.trim();
    const definitionElement = document.getElementById('definition');
    definitionElement.innerHTML = '';  // Clear previous result

    if (word === '') {
        alert('Please enter a word.');
        return;
    }

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) {
            throw new Error('Word not found');
        }

        const data = await response.json();
        const definition = data[0].meanings[0].definitions[0].definition;
        const partOfSpeech = data[0].meanings[0].partOfSpeech;
        
        definitionElement.innerHTML = `
            <h3>${word}</h3>
            <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
            <p><strong>Definition:</strong> ${definition}</p>
        `;
    } catch (error) {
        definitionElement.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}
