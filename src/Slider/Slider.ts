import { Module } from '~/Module';
import { Config } from '~/Config/Config';
import { Renderer, RendererElement } from '~/Renderer/Renderer';
import { EventHandler } from '~/EventHandler/EventHandler';
import { ratioToPercent } from '~/helpers/styles';
import { TValueRatio } from '~/types';
import './Slider.css';
import { throttle } from '~/helpers/timing';

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

    const sliders: RendererElement[] = config.values.map(() => this.createSlider());
    this.fSliders = sliders;

    sliders.forEach((s) => renderer.root.addChild(s));
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
   *
   * @param events events handler
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
    this.handleSliderMove(index);
  }

  /**
   * Handles slider move event.
   */
  private handleSliderMove (index: number): void {
    // Get root rect
    const rect: ClientRect = this.fRenderer.root.element.getBoundingClientRect();
    const values: TValueRatio[] = (new Array(this.fSliders.length)).fill(null);

    // Handle mouse move (count value and trigger update)
    const handleMouseMove = throttle(10, (moveEvent: MouseEvent) => {
      const moveX: number = moveEvent.clientX;
      const moveRelative: number = moveX - rect.left;
      const ratio: TValueRatio = moveRelative / rect.width as TValueRatio;
      values[index] = ratio;

      this.fEvents.trigger(null, this.fEvents.event.EValueChange, {
        ratioValues: values,
      });
    });

    // Handle mouse up (unbind any events)
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    // Add events
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }
}
