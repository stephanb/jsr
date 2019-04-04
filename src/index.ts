import { JSR } from '~/modules/JSR/JSR';
import { Greeter } from '~/modules/Greeter/Greeter';
import { Rail } from '~/modules/Rail/Rail';
import { Slider } from '~/modules/Slider/Slider';
import { Input } from '~/modules/Input/Input';

JSR.use(Greeter);
JSR.use(Rail);
JSR.use(Slider);
JSR.use(Input);

export default JSR;
export { JSR, Greeter, Rail, Slider, Input };
