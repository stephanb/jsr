import { Module } from '~/Module';
import { Config } from '~/Config/Config';
import { Renderer } from '~/Renderer/Renderer';
import { EventHandler } from '~/EventHandler/EventHandler';
import './Label.css';

export class Label implements Module {

  private fConfig: Config;
  private fRenderer: Renderer;
  private fEvents: EventHandler;

  public init (config: Config, renderer: Renderer, events: EventHandler): void {
    this.fConfig = config;
    this.fRenderer = renderer;
    this.fEvents = events;
  }
}
