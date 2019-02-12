import NodeResolve from 'rollup-plugin-node-resolve';
import Typescript from 'rollup-plugin-typescript2';
import { terser as Terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'JSR'
  },
  plugins: [
    Typescript({
      clean: true
    }),
    NodeResolve(),
    Terser(),
  ]
}
