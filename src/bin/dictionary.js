#!/usr/bin/env babel-node
import program from 'commander';
import controller from '../controllers/dictController';
import { prompt } from 'inquirer';
import dotenv from 'dotenv';
import { formatDefinitions, formatRelatedWords, formatExamples } from '../helpers/format';
import { exists } from 'fs';
dotenv.config();

program.version('1.0.0')

const questions = [
    {
        type: 'input',
        name: 'word',
        message: 'search for a word: '
    }
]

const options = [
    {
        type: 'list',
        name: 'choice',
        message: 'Choose any one: ',
        choices: ['Definitions', 'Synonyms', 'Examples', 'Word Full Dict', 'Word Game', 'Exit'],
        filter: function (val) {
            return val.toLowerCase();
        }
    }
]

program.command('random').action(async () => {
    const data = await controller.getRandomWord();
    return data;

});
let repeat;
program.command('options').action(async () => {
    repeat = async () => {
        const answer = await prompt(options);
        switch (answer.choice) {
            case 'definitions':
                definitions();
                break;
            case 'synonyms':
                synonyms();
                break;
            case 'examples':
                examples();
                break;
            case 'word full dict':
                wordFullDict();
                break;
            case 'word game':
                wordGame();
                break;
            case 'exit':
                return;
        }

    }

    repeat();
})


const wordFullDict = async (wordPresent) => {
    let answers;
    if(wordPresent) {
        answers = { word: wordPresent }
    } else {
        answers = await prompt(questions);
    }
    
    if (answers.word === ':q') {
        return;
    }
    const definitions = controller.definitions(answers.word);
    const relatedWords = controller.relatedWords(answers.word);
    const examples = controller.examples(answers.word);

    const result = await Promise.all([definitions, relatedWords, examples]);

    const finalStrings = await Promise.all([formatDefinitions(result[0]), formatRelatedWords(result[1]), formatExamples(result[2])]);

    console.log(finalStrings[0]);
    console.log(finalStrings[1]);
    console.log(finalStrings[2]);

    // repeat();
}


const definitions = async () => {
    const answers = await prompt(questions);
    if (answers.word === ':q') {
        return;
    }
    const definitions = await controller.definitions(answers.word);
    console.log(await formatDefinitions(definitions));
    // repeat();
}

const synonyms = async () => {
    const answers = await prompt(questions);
    if (answers.word === ':q') {
        return;
    }
    const relatedWords = await controller.relatedWords(answers.word);
    console.log(await formatRelatedWords(relatedWords));

    // repeat();
}

const examples = async () => {
    const answers = await prompt(questions);
    if (answers.word === ':q') {
        return;
    }
    const examples = await controller.examples(answers.word);
    console.log(await formatExamples(examples));

    // repeat();
}

const wordGame = async () => {
    let randomSynonym;
    const randomWord = await controller.getRandomWord();
    const synonyms = await controller.relatedWords(randomWord.word);
    synonyms.forEach(item => {
        if(item.relationshipType === 'synonym') {
            randomSynonym = item.words[Math.floor(Math.random()*item.words.length)];
        }
    });
    console.log(`\nType the right word for the synonym: ${randomSynonym}\n`);
    wordGameInput(randomSynonym, randomWord.word);
}

const wordGameInput = async (randomSynonym, randomWord) => {
    const input = [
        {
            type: 'input',
            name: 'word',
            message: 'Type the word: '
        }
    ]

    const ans = await prompt(input);
    const relWords = await controller.relatedWords(ans.word);
    relWords.forEach(async item => {
        if(item.relationshipType === 'synonym') {
            if(item.words.includes(randomSynonym)) {
                console.log('\nVoila!! Entered the right word.\n');
                return;
            } else {
                console.log('\noops! wrong word.\n');
                const wrongAns = await prompt([{
                    type: 'list',
                    name: 'choice',
                    message: 'Choose any one: ',
                    choices: ['Try Again', 'Hint', 'Quit'],
                    filter: function(val) {
                        return val.toLowerCase();
                    }
                }]);
                switch(wrongAns.choice) {
                    case 'try again':
                        wordGameInput(randomSynonym);
                        break;
                    case 'hint':
                        break;
                    case 'quit':
                        console.log(`\nThe word is ${randomWord}\n`);
                        wordFullDict(randomWord);
                        break;
                }
            }
        }
    });
}

program.parse(process.argv);
