import { Module } from '~/Module';
import { Config } from '~/Config/Config';
import { Renderer, RendererElement } from '~/Renderer/Renderer';
import { EventHandler } from '~/EventHandler/EventHandler';

import './Slider.css';

export class Slider implements Module {
  /** Holds all sliders (one per value) */
  private fSliders: RendererElement[] = [];

  public init (config: Config, renderer: Renderer, events: EventHandler) {
    const sliders: RendererElement[] = config.values.map(() => this.createSlider(renderer));
    sliders.forEach(s => renderer.root.addChild(s));

    this.fSliders = sliders;
  }

  /**
   * Create single slider object.
   */
  private createSlider (renderer: Renderer): RendererElement {
    return renderer.createElement('div', {
      class: 'jsr_slider',
    });
  }
}
