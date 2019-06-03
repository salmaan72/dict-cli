import chalk from 'chalk';

async function formatDefinitions(definitions) {
    let str = (chalk `\n{green.bold Definitions:}\n\n`);

    definitions.forEach(item => {
        str = (chalk `${str} {blue ${item.text}}\n`);
    });
    return str;
}

async function formatRelatedWords(relatedWords) {
    let finalStr = '';
    relatedWords.forEach(obj => {
        let str = (chalk `\n{green.bold ${obj.relationshipType}:}\n\n`);
        obj.words.forEach(word => {
            str = (chalk `${str} {blue ${word}}\n`);
        });
        finalStr = `${finalStr} ${str}`;
    });

    return finalStr;
}

async function formatExamples(examples) {
    let str = (chalk `\n{green.bold Examples:}\n\n`);
    examples.examples.forEach(item => {
        str = (chalk `${str} {blue ${item.text}}\n\n`);
    });
    return str;
}


export {
    formatDefinitions,
    formatExamples,
    formatRelatedWords,
}