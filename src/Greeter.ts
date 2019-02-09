import { Module } from '~/Module';
import Config from '~/Config';

export class Greeter implements Module {
  public init (config: Config) {
    console.log('Greetings, this is JSR!');
  }
}
