import NodeResolve from 'rollup-plugin-node-resolve';
import Typescript from 'rollup-plugin-typescript2';
import { terser as Terser } from 'rollup-plugin-terser';

const rollupPlugins = [
  Typescript({
    clean: true
  }),
  NodeResolve(),
  // Terser(),
];

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'JSR',
    },
    plugins: rollupPlugins
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.mjs',
      format: 'esm'
    },
    plugins: rollupPlugins
  },
  {
    input: 'src/JSR.ts',
    output: {
      file: 'dist/JSR.mjs',
      format: 'esm',
    },
    plugins: rollupPlugins
  },
  {
    input: 'src/Greeter.ts',
    output: {
      file: 'dist/Greeter.mjs',
      format: 'esm',
    },
    plugins: rollupPlugins
  },
];
