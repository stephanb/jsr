import { Module } from '~/Module';
import { Config } from '~/Config/Config';
import { Renderer, RendererElement } from '~/Renderer/Renderer';
import { EventHandler } from '~/EventHandler/EventHandler';
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
  }

  /**
   * Creates single label element
   */
  private createLabel (): RendererElement {
    return this.fRenderer.createElement('div', {
      class: 'jsr_label',
    });
  }
}
