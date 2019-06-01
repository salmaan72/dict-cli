import express from 'express';
import controller from './controllers/dictController';
const router = express.Router();

router.route('/word/randomWord').get(controller.getRandomWord);

router.route('/word/:word/definitions').get(controller.definitions);

router.route('/word/:word/examples').get(controller.examples);

router.route('/word/:word/relatedWords').get(controller.relatedWords);

export { router }