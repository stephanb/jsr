import { Module } from '~/Module';
import { Config } from '~/Config';
import { Renderer, RendererElement } from '~/Renderer';

/**
 * Test Module whose primary responsibility is greeting users in various way.
 */
export class Greeter implements Module {

  public init (config: Config, renderer: Renderer) {
    const button: RendererElement = this.createButton(renderer);
    const root: RendererElement = this.createRoot(renderer);

    root.addChild(button);

    renderer.root.addChild(root);
  }

  /**
   * Creates greeting button.
   */
  private createButton (renderer: Renderer): RendererElement {
    const button: RendererElement = renderer.createElement('button', {
      'class': 'jsr_button',
    }, ['Click me!']);

    button.element.addEventListener('click', () => alert('Hello in alert!'));

    return button;
  }

  /**
   * Creates root element.
   */
  private createRoot (renderer: Renderer): RendererElement {
    return renderer.createElement('div', {
      'class': 'jsr_greeter',
    }, ['Welcome to JSR! :)']);
  }
}
