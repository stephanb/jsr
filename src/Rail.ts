import { Module } from '~/Module';
import { Config } from '~/Config';
import { Renderer, RendererElement } from '~/Renderer';
import { EventHandler } from '~/EventHandler';

export class Rail extends Module {
  public init (config: Config, renderer: Renderer, events: EventHandler) {
    const rail: RendererElement = this.createRail(renderer);

    renderer.root.addChild(rail);
  }

  private createRail (renderer: Renderer): RendererElement {
    return renderer.createElement('div', {
      class: 'jsr_rail',
    });
  }
}
