import { Module } from '~/Module';
import Config from '~/Config';
import { Renderer, RendererElement } from '~/Renderer';

export class Greeter implements Module {
  /** Holds Greeter element */
  private fElement: RendererElement ;

  public init (config: Config, renderer: Renderer) {
    this.fElement = renderer.createElement('div', {
      'class': 'jsr_greeter',
    }, ['Welcome to JSR! :)']);

    renderer.root.addChild(this.fElement);
  }
}
