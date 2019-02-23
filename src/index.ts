import { JSR } from '~/JSR';
import { Greeter } from '~/Greeter';
import { Rail } from '~/Rail';
import { Slider } from '~/Slider';

JSR.use(Greeter);
JSR.use(Rail);
JSR.use(Slider);

export default JSR;
export { Greeter };
