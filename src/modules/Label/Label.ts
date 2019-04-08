import { Module } from '~/Module';
import { Config } from '~/Config/Config';
import { Renderer, RendererElement } from '~/Renderer/Renderer';
import { EventHandler } from '~/EventHandler/EventHandler';
import { TValueReal, TValueRatio } from '~/types';
import './Label.css';
import { handleMove } from '~/helpers/draggable';

export type TLabelFormatter = (value: TValueReal) => string;
export interface ILabelSettings {
  formatter?: TLabelFormatter;
}

export class Label implements Module {

  /** Holds all defined labels (one per value) */
  private fLabels: RendererElement[] = [];

  private fSettings: ILabelSettings;
  private fConfig: Config;
  private fRenderer: Renderer;
  private fEvents: EventHandler;

  public constructor (settings: ILabelSettings) {
    this.fSettings = settings;
  }

  public init (config: Config, renderer: Renderer, events: EventHandler): void {
    this.fConfig = config;
    this.fRenderer = renderer;
    this.fEvents = events;

    this.fLabels = this.fConfig.values.map(() => this.createLabel());
    this.fLabels.forEach((label) => this.fRenderer.root.addChild(label));
    this.initEvents();
  }

  /**
   * Creates single label element.
   */
  private createLabel (): RendererElement {
    return this.fRenderer.createElement('div', {
      class: 'jsr_label',
    });
  }

  /**
   * Inits listening for certain events.
   */
  private initEvents (): void {
    // On value change set values to sliders
    this.fEvents.subscribe(this, this.fEvents.event.EValueChange, (e) => {
      this.setLabelPositions(e.ratioValues);
      this.setLabelValues(e.realValues);
    });

    // For each label add support for mousedown event
    this.fLabels.forEach((label, index) => {
      label.element.addEventListener('mousedown', (mouseDownEvent) => {
        this.handleLabelDown(mouseDownEvent, index);
      });
    });
  }

  /**
   * Sets label texts.
   *
   * @param values set of real values to display
   */
  private setLabelValues (values: TValueReal[]): void {
    const formatter: TLabelFormatter = this.fSettings.formatter || ((value) => String(value));
    values.forEach((value, index) => this.fLabels[index].html = formatter(value));
  }

  /**
   * Sets label positions.
   *
   * @param values set of ratio values to be used as positions
   */
  private setLabelPositions (values: TValueRatio[]): void {
    values.forEach((value, index) => this.fLabels[index].patchStyles({
      left: `${value * 100}%`,
    }));
  }

  /**
   * Handles mousedown on label.
   */
  private handleLabelDown (mouseDownEvent: MouseEvent, index: number): void {
    const eventTarget = mouseDownEvent.target;

    if (
      !eventTarget ||
      !(eventTarget instanceof Element) ||
      !eventTarget.classList.contains('jsr_label')
    ) {
      return;
    }

    mouseDownEvent.stopPropagation();
    handleMove(index, this.fConfig.values.length, this.fEvents, this.fRenderer);
  }
}
