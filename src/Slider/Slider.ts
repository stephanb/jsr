import { Module } from '~/Module';
import { Config } from '~/Config/Config';
import { Renderer, RendererElement } from '~/Renderer/Renderer';
import { EventHandler } from '~/EventHandler/EventHandler';
import { ratioToPercent } from '~/helpers/styles';
import { TValueRatio } from '~/types';
import './Slider.css';

export class Slider implements Module {

  /** Holds all sliders (one per value) */
  private fSliders: RendererElement[] = [];

  public init (config: Config, renderer: Renderer, events: EventHandler): void {
    const sliders: RendererElement[] = config.values.map(() => this.createSlider(renderer));

    sliders.forEach((s) => renderer.root.addChild(s));

    this.fSliders = sliders;

    this.initEvents(events);
  }

  /**
   * Sets position on all sliders, according to given ratio values.
   *
   * @param values set of ratio values to use
   */
  private setAllSliderPositions (values: TValueRatio[]): void {
    values.forEach((value, index) => this.setSliderPosition(this.fSliders[index], value));
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

  /**
   * Inits listening for certain events
   *
   * @param events events handler
   */
  private initEvents (events: EventHandler): void {
    // On value change set values to sliders
    events.subscribe(this, events.event.EValueChange, (e) => this.setAllSliderPositions(e.ratioValues));
  }
}
