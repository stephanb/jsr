import { JSR } from '~/JSR';
import { Greeter } from '~/Greeter';

JSR.use(Greeter);

const jsr: JSR = new JSR({
  modules: [
    JSR.modules.Greeter,
  ],
});
