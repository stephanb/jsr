import { JSR } from '~/JSR';
import { Greeter } from '~/Greeter';
import { Rail } from '~/Rail';

JSR.use(Greeter);
JSR.use(Rail);

export default JSR;
export { Greeter };
