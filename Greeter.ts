import { Module } from '~/Module';

export class Greeter extends Module {
  constructor () {
    super();
    console.log('Greetings, this is JSR!');
  }
}
