#!/usr/bin/env node
import program from 'commander';
import controller from '../controllers/dictController';
import dotenv from 'dotenv';
dotenv.config();

program.version('1.0.0')

program.command('dict').action(controller.getRandomWord);
program.parse(process.argv);
