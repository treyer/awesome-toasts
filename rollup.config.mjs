import { babel } from '@rollup/plugin-babel'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import image from '@rollup/plugin-image'
import commonjs from '@rollup/plugin-commonjs'

export default [
  {
    input: './src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
        exports: 'named',
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        presets: [
          '@babel/preset-react',
          '@babel/preset-env',
        ],
        plugins: ['babel-plugin-styled-components'],
        babelHelpers: 'bundled',
      }),
      external(),
      terser(),
      image(),
    ],
  },
]
