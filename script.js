document.addEventListener('DOMContentLoaded', () => {
    console.log(`${new Date().toISOString()}, view, page`);

    document.addEventListener('click', (event) => {
        const target = event.target;
        let objectType = 'unknown';

        if (target.tagName === 'IMG') {
            objectType = 'image';
        } else if (target.tagName === 'A') {
            objectType = 'link';
        } else if (target.tagName === 'BUTTON') {
            objectType = 'button';
        } else if (target.tagName === 'P' || target.tagName.match(/^H[1-6]$/)) {
            objectType = 'text';
        } else if (target.tagName === 'LI') {
            objectType = 'list-item';
        }

        console.log(`${new Date().toISOString()}, click, ${objectType}`);
    });
});

function analyzeText() {
    const text = document.getElementById('textInput').value;
    const outputDiv = document.getElementById('analysisOutput');
    let output = '';

    const letters = text.match(/[a-zA-Z]/g)?.length || 0;
    const words = text.split(/\s+/).filter(word => word).length;
    const spaces = text.match(/\s/g)?.length || 0;
    const newlines = text.match(/\n/g)?.length || 0;
    const specialSymbols = text.match(/[^a-zA-Z0-9\s]/g)?.length || 0;

    output += `
        <h3>Text Statistics</h3>
        <p>Letters: ${letters}</p>
        <p>Words: ${words}</p>
        <p>Spaces: ${spaces}</p>
        <p>Newlines: ${newlines}</p>
        <p>Special Symbols: ${specialSymbols}</p>
    `;

    const pronouns = ['i', 'me', 'you', 'he', 'him', 'she', 'her', 'it', 'we', 'us', 'they', 'them'];
    const pronounCounts = {};
    pronouns.forEach(pronoun => pronounCounts[pronoun] = 0);

    text.toLowerCase().split(/\s+/).forEach(word => {
        if (pronouns.includes(word)) {
            pronounCounts[word]++;
        }
    });

    output += '<h3>Pronouns Count</h3><ul>';
    for (const [pronoun, count] of Object.entries(pronounCounts)) {
        if (count > 0) {
            output += `<li>${pronoun}: ${count}</li>`;
        }
    }
    output += '</ul>';

    const prepositions = ['in', 'on', 'at', 'by', 'for', 'with', 'to', 'from', 'of'];
    const prepositionCounts = {};
    prepositions.forEach(prep => prepositionCounts[prep] = 0);

    text.toLowerCase().split(/\s+/).forEach(word => {
        if (prepositions.includes(word)) {
            prepositionCounts[word]++;
        }
    });

    output += '<h3>Prepositions Count</h3><ul>';
    for (const [prep, count] of Object.entries(prepositionCounts)) {
        if (count > 0) {
            output += `<li>${prep}: ${count}</li>`;
        }
    }
    output += '</ul>';

    const articles = ['a', 'an'];
    const articleCounts = {};
    articles.forEach(article => articleCounts[article] = 0);

    text.toLowerCase().split(/\s+/).forEach(word => {
        if (articles.includes(word)) {
            articleCounts[word]++;
        }
    });

    output += '<h3>Indefinite Articles Count</h3><ul>';
    for (const [article, count] of Object.entries(articleCounts)) {
        if (count > 0) {
            output += `<li>${article}: ${count}</li>`;
        }
    }
    output += '</ul>';

    outputDiv.innerHTML = output;
}