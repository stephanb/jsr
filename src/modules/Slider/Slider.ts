import { Module } from '~/Module';
import { Config } from '~/Config/Config';
import { Renderer, RendererElement } from '~/Renderer/Renderer';
import { EventHandler } from '~/EventHandler/EventHandler';
import { ratioToPercent } from '~/helpers/styles';
import { TValueRatio } from '~/types';
import { handleMove } from '~/helpers/draggable';
import './Slider.css';

export class Slider implements Module {

  /** Holds all sliders (one per value) */
  private fSliders: RendererElement[] = [];

  private fConfig: Config;
  private fRenderer: Renderer;
  private fEvents: EventHandler;

  public init (config: Config, renderer: Renderer, events: EventHandler): void {
    this.fConfig = config;
    this.fRenderer = renderer;
    this.fEvents = events;

    this.fSliders = config.values.map(() => this.createSlider());

    this.fSliders.forEach((s) => renderer.root.addChild(s));
    this.initEvents();
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
  private createSlider (): RendererElement {
    return this.fRenderer.createElement('div', {
      class: 'jsr_slider',
    });
  }

  /**
   * Inits listening for certain events
   */
  private initEvents (): void {
    // On value change set values to sliders
    this.fEvents.subscribe(this, this.fEvents.event.EValueChange, (e) => this.setAllSliderPositions(e.ratioValues));

    // For each slider add support for mousedown event
    this.fSliders.forEach((slider, index) => {
      slider.element.addEventListener('mousedown', (mouseDownEvent) => {
        this.handleSliderDown(mouseDownEvent, index);
      });
    });
  }

  /**
   * Handles mousedown on slider.
   */
  private handleSliderDown (mouseDownEvent: MouseEvent, index: number): void {
    const eventTarget = mouseDownEvent.target;

    if (
      !eventTarget ||
      !(eventTarget instanceof Element) ||
      !eventTarget.classList.contains('jsr_slider')
    ) {
      return;
    }

    mouseDownEvent.stopPropagation();
    handleMove(index, this.fConfig.values.length, this.fEvents, this.fRenderer);
  }
}
