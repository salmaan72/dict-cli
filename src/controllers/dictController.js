import { axiosRequest } from '../helpers/axiosHelper';
import {validator} from '../validator';

async function getRandomWord() {
    const data = await axiosRequest({
        method: 'get',
        endPoint: 'randomWord'
    });
    
    // res.send(data);
    return data;
}

async function definitions(word) {
    // const validParams = await validator({val: req.params.word});

    const data = await axiosRequest({
        endPoint: 'definitions',
        word,
    });

    // res.send(data);
    return data;
}

async function examples(word) {
    // const validParams = await validator({val: req.params.word});

    const data = await axiosRequest({
        endPoint: 'examples',
        word,
    });

    // res.send(data);
    return data;
}

async function relatedWords(word) {
    // const validParams = await validator({val: req.params.word});

    const data = await axiosRequest({
        endPoint: 'relatedWords',
        word,
    });

    // res.send(data);
    return data;
}

export default {
    getRandomWord,
    definitions,
    examples,
    relatedWords,
}