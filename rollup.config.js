import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import ts from '@wessberg/rollup-plugin-ts';
import { terser } from 'rollup-plugin-terser';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const output = {
  compact: IS_PRODUCTION,
  exports: 'named',
  sourcemap: true,
};

export default [{
  input: 'src/index.ts',
  output: [
    {
      ...output,
      file: 'dist/index.cjs.js',
      format: 'cjs',
      name: 'downsample',
    },
    {
      ...output,
      file: 'dist/index.es.js',
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    ts({ transpiler: 'babel' }),
    resolve({ browser: true }),
    commonJS({ ignoreGlobal: true }),
    IS_PRODUCTION ? terser({ compress: true, sourcemap: true }) : undefined,
  ],
}];
