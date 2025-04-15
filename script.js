document.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded at", new Date().toISOString());
    logEvent("view", document.body);
});

document.addEventListener("click", event => {
    logEvent("click", event.target);
});

function logEvent(type, target) {
    const timestamp = new Date().toISOString();
    let objectType = "other";

    if (target.tagName === "IMG") objectType = "image";
    else if (target.tagName === "P" || target.tagName === "SPAN" || target.tagName.startsWith("H")) objectType = "text";
    else if (target.tagName === "A") objectType = "hyperlink";
    else if (target.tagName === "TEXTAREA") objectType = "text-area";
    else if (target.tagName === "BUTTON") objectType = "button";
    else if (target.tagName === "UL" || target.tagName === "LI") objectType = "list";

    console.log(`${timestamp}, ${type}, ${objectType}`);
}

function analyzeText() {
    const text = document.getElementById("text-input").value;
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const words = (text.match(/\b\w+\b/g) || []).length;
    const spaces = (text.match(/ /g) || []).length;
    const newlines = (text.match(/\n/g) || []).length;
    const specials = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

    const pronouns = ["i", "we", "you", "he", "she", "they", "it", "me", "him", "her", "us", "them"];
    const prepositions = ["in", "on", "at", "by", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "for", "over", "under"];
    const articles = ["a", "an"];

    const tokens = text.toLowerCase().match(/\b\w+\b/g) || [];
    const pronounCounts = {};
    const prepCounts = {};
    const articleCounts = {};

    for (const word of tokens) {
        if (pronouns.includes(word)) pronounCounts[word] = (pronounCounts[word] || 0) + 1;
        if (prepositions.includes(word)) prepCounts[word] = (prepCounts[word] || 0) + 1;
        if (articles.includes(word)) articleCounts[word] = (articleCounts[word] || 0) + 1;
    }

    document.getElementById("text-output").textContent =
        `Letters: ${letters}\nWords: ${words}\nSpaces: ${spaces}\nNewlines: ${newlines}\nSpecial Characters: ${specials}\n\nPronouns:\n${JSON.stringify(pronounCounts, null, 2)}\n\nPrepositions:\n${JSON.stringify(prepCounts, null, 2)}\n\nArticles:\n${JSON.stringify(articleCounts, null, 2)}`;
}
