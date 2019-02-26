import { Module } from '~/Module';
import { Config } from '~/Config/Config';
import { Renderer, RendererElement } from '~/Renderer/Renderer';
import { EventHandler } from '~/EventHandler/EventHandler';

import './Slider.css';
import { ratioToPercent } from '~/helpers/styles';
import { TValueRatio } from '~/types';
import { EValueChange } from '~/events/EValueChange';

export class Slider implements Module {
  /** Holds all sliders (one per value) */
  private fSliders: RendererElement[] = [];

  public init (config: Config, renderer: Renderer, events: EventHandler) {
    const sliders: RendererElement[] = config.values.map(() => this.createSlider(renderer));

    sliders.forEach((s) => renderer.root.addChild(s));

    this.fSliders = sliders;

    this.initEvents(events);
  }

  /**
   * Sets slider position on scale
   *
   * @param slider element to be set
   * @param ratio ratio value to be set
   */
  private setSliderPosition (slider: RendererElement, ratio: TValueRatio): void {
    slider.patchStyles({
      left: ratioToPercent(ratio),
    });
  }

  /**
   * Create single slider object.
   */
  private createSlider (renderer: Renderer): RendererElement {
    return renderer.createElement('div', {
      class: 'jsr_slider',
    });
  }

  private initEvents (events: EventHandler): void {
    // On value change set values to sliders
    events.subscribe(this, EValueChange, (e) => {
      e.ratioValues.forEach((value, index) => this.setSliderPosition(
        this.fSliders[index], value),
      );
    });
  }
}
