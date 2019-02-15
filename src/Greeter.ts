import { Module } from '~/Module';
import Config from '~/Config';
import { Renderer, RendererElement } from '~/Renderer';

export class Greeter implements Module {
  /** Holds Greeter element */
  private fElement: RendererElement ;

  public init (config: Config, renderer: Renderer) {
    this.fElement = renderer.requestElement('div', {
      'class': 'jsr_greeter',
    }, renderer.root);
    this.fElement.element.innerHTML = 'Welcome to JSR! :)';
  }
}
