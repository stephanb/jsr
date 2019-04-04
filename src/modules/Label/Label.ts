import { Module } from '~/Module';
import { Config } from '~/Config/Config';
import { Renderer, RendererElement } from '~/Renderer/Renderer';
import { EventHandler } from '~/EventHandler/EventHandler';
import { TValueReal, TValueRatio } from '~/types';
import './Label.css';

export class Label implements Module {

  /** Holds all defined labels (one per value) */
  private fLabels: RendererElement[] = [];

  private fConfig: Config;
  private fRenderer: Renderer;
  private fEvents: EventHandler;

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
  }

  /**
   * Sets label texts.
   *
   * @param values set of real values to display
   */
  private setLabelValues (values: TValueReal[]): void {
    values.forEach((value, index) => this.fLabels[index].html = String(value));
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
}
