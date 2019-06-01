import { axiosRequest } from '../helpers/axiosHelper';
import {validator} from '../validator';

async function getRandomWord(req, res) {
    const data = await axiosRequest({
        method: 'get',
        endPoint: 'randomWord'
    });

    res.send(data);
}

async function definitions(req, res) {
    const validParams = await validator({val: req.params.word});

    const data = await axiosRequest({
        endPoint: 'definitions',
        word: validParams.val
    });

    res.send(data);
}

async function examples(req, res) {
    const validParams = await validator({val: req.params.word});

    const data = await axiosRequest({
        endPoint: 'examples',
        word: validParams.val
    });

    res.send(data);
}

async function relatedWords(req, res) {
    const validParams = await validator({val: req.params.word});

    const data = await axiosRequest({
        endPoint: 'relatedWords',
        word: validParams.val
    });

    res.send(data);
}

export default {
    getRandomWord,
    definitions,
    examples,
    relatedWords,
}