import { JSR } from '~/JSR/JSR';
import { Greeter } from '~/Greeter/Greeter';
import { Rail } from '~/Rail/Rail';
import { Slider } from '~/Slider/Slider';

JSR.use(Greeter);
JSR.use(Rail);
JSR.use(Slider);

export default JSR;
export { Greeter };
