import { Module } from '~/Module';
import { Config } from '~/Config/Config';
import { Renderer } from '~/Renderer/Renderer';
import { EventHandler } from '~/EventHandler/EventHandler';
import { TValueReal } from '~/types';

interface IConfig {
  inputs: HTMLInputElement[];
}

/**
 * Input module is responsible for updating given inputs values.
 */
export class Input implements Module {

  /** Holds defined inputs */
  private fInputs: HTMLInputElement[];

  private fConfig: Config;
  private fRenderer: Renderer;
  private fEvents: EventHandler;

  constructor (config: IConfig) {
    this.fInputs = config.inputs;
  }

  public init (config: Config, renderer: Renderer, events: EventHandler): void {
    this.fConfig = config;
    this.fRenderer = renderer;
    this.fEvents = events;

    this.initEvents();
  }

  /**
   * Initializes events for that module
   */
  private initEvents (): void {
    this.fEvents.subscribe(this, this.fEvents.event.EValueChange, (e) => {
      // Save each value into input
      e.realValues.forEach((value, index) => {
        const input: HTMLInputElement | undefined = this.fInputs[index];

        // If input is provided, set value
        if (input) {
          this.setInputValue(input, value);
        }
      });
    });
  }

  /**
   * Sets value on given input (async)
   *
   * @param input - input to set value on
   * @param value - value to be set
   */
  private setInputValue (input: HTMLInputElement, value: TValueReal): void {
    window.requestAnimationFrame(() => {
      input.value = value.toString();
    });
  }
}
