import NodeResolve from 'rollup-plugin-node-resolve';
import Typescript from 'rollup-plugin-typescript2';
import BundleSize from 'rollup-plugin-bundle-size';
import PostCSS from 'rollup-plugin-postcss';
import { terser as Terser } from 'rollup-plugin-terser';

/** List of all modules to be built. Must be contained inside primary `src` directory */
const jsrModules = [
  'JSR',
  'Greeter',
  'Rail',
  'Slider',
  'Label',
  'Input'
];

export default (options) => {
  validateOptions(options);

  // Build list of rollup plugins, leave truthy values
  const rollupPlugins = [
    BundleSize(),
    PostCSS({
      extract: true
    }),
    NodeResolve(),
    Typescript({
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          target: options.configTarget
        }
      }
    }),
    options.configProduction ? Terser() : null
  ].filter(p => p);

  // Determine output dir
  const outputDir = options.configProduction ? 'dist' : 'tmp';

  // Not modular build
  if (!options.configModular) {
    return {
      input: 'src/index.ts',
      output: {
        file: `${outputDir}/index.js`,
        format: 'umd',
        name: 'JSR',
        exports: 'named'
      },
      plugins: rollupPlugins
    }
  }

  // Modular
  if (options.configModular) {
    const inputs = jsrModules.map(filename => ({
      input: `src/modules/${filename}/${filename}.ts`,
      output: {
        file: `${outputDir}/${filename}.mjs`,
        format: 'esm',
      },
      plugins: rollupPlugins
    }));

    return inputs;
  }

  throw new Error(`Rollup build: don't know what to do with given options!`);
}

/**
 * Allows to validate given options to Rollup
 * @param {Object} options object of CLI options (e.g. `--production` => `options.production = true`)
 */
const validateOptions = (options) => {
  if (options.configTarget === 'es5' && options.configModular) {
    throw new Error('Rollup build: options.es5 cannot be used with options.modular!');
  }

  if (!options.configTarget) {
    throw new Error('Rollup build: missing options.target (es5, es6, es2017 or similar)!');
  }
}
