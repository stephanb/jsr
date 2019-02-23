import { Module } from '~/Module';
import { Config } from '~/Config/Config';
import { Renderer, RendererElement } from '~/Renderer/Renderer';
import { EventHandler } from '~/EventHandler/EventHandler';

import './Rail.css';

export class Rail implements Module {
  public init (config: Config, renderer: Renderer, events: EventHandler) {
    const rail: RendererElement = this.createRail(renderer);

    renderer.root.addChild(rail);
  }

  /**
   * Create rail object.
   */
  private createRail (renderer: Renderer): RendererElement {
    return renderer.createElement('div', {
      class: 'jsr_rail',
    });
  }
}
