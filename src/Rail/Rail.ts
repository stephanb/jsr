import { Module } from '~/Module';
import { Config } from '~/Config/Config';
import { Renderer, RendererElement } from '~/Renderer/Renderer';
import { EventHandler } from '~/EventHandler/EventHandler';

import './Rail.css';
import { TValueRatio } from '~/types';

export class Rail implements Module {
  public init (config: Config, renderer: Renderer, events: EventHandler) {
    const rail: RendererElement = this.createRail(renderer);
    this.listenOnClick(rail, events);

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

  /**
   * Listen on click on rail
   *
   * @param rail rail to listen on
   */
  private listenOnClick (rail: RendererElement, events: EventHandler): void {
    rail.element.addEventListener('click', (e) => {
      const clickX: number = e.clientX;
      const rect: ClientRect = rail.element.getBoundingClientRect();
      const clickRelative: number = clickX - rect.left;
      const ratio: TValueRatio = clickRelative / rect.width as TValueRatio;

      events.trigger(this, events.event.EValueChange, {
        // ratioValues: ,
      });
    });
  }
}
