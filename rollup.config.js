import NodeResolve from 'rollup-plugin-node-resolve';
import Typescript from 'rollup-plugin-typescript2';
import { terser as Terser } from 'rollup-plugin-terser';

/** List of all modules to be built. Must be contained inside primary `src` directory */
const jsrModules = [
  'JSR',
  'Greeter'
];

export default (options) => {
  validateOptions(options);

  const rollupPlugins = [
    NodeResolve(),
    Typescript({
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          target: options.target
        }
      }
    }),
    options.production ? Terser() : null
  ].filter(p => p);

  // Not modular build
  if (!options.modular) {
    return {
      input: 'src/index.ts',
      output: {
        file: 'dist/index.js',
        format: 'umd',
        name: 'JSR',
        exports: 'named'
      },
      plugins: rollupPlugins
    }
  }

  // Modular
  if (options.modular) {
    const inputs = jsrModules.map(filename => ({
      input: `src/${filename}.ts`,
      output: {
        file: `dist/${filename}.mjs`,
        format: 'esm',
      },
      plugins: rollupPlugins
    }));

    return inputs
  }

  throw new Error(`Rollup build: don't know what to do with given options!`)
}

/**
 * Allows to validate given options to Rollup
 * @param {Object} options object of CLI options (e.g. `--production` => `options.production = true`)
 */
const validateOptions = (options) => {
  if (options.target === 'es5' && options.modular) {
    throw new Error('Rollup build: options.es5 cannot be used with options.modular!');
  }

  if (!options.target) {
    throw new Error('Rollup build: missing options.target (es5, es6, es2017 or similar)!');
  }
}
