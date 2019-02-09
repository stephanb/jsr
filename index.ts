import { JSR } from '~/JSR';
import { Greeter } from '~/Greeter';

declare const module: any;

JSR.use(Greeter);

if (module.hot) {
  module.hot.accept();
}

export default JSR;
