class InputUpdater {
  constructor () {
    this.input = null;
  }

  _bindEvents () {
    this.modules.eventizer.register('core/value:update', (id, value, ratio) => {
      this.inputs[id].value = value;
      this.modules.eventizer.trigger('input/value:update', this.inputs[id], value, ratio);
      this.logger.debug(`JSR: Input ${id} updated with value ${value}`);
    });
  }

  /* API */
  build ({ config, modules, logger }, specificConfig) {
    this.inputs = specificConfig.inputs;
    this.logger = logger;
    this.config = config;
    this.modules = modules;

    this._bindEvents();
  }
}

export default {
  name: 'inputUpdater',
  Klass: InputUpdater
};
