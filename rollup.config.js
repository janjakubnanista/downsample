import commonJS from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import transformer from 'ts-type-checked/transformer';
import ts from '@wessberg/rollup-plugin-ts';

const configForFile = (fileName, displayName = fileName) => {
  return {
    input: `src/${fileName}.ts`,
    output: [
      {
        exports: 'named',
        sourcemap: true,
        file: `dist/${fileName}.js`,
        format: 'cjs',
        name: displayName,
      },
    ],
    plugins: [
      ts({
        transpiler: 'babel',
        transformers: [
          ({ program }) => ({
            before: transformer(program),
          }),
        ],
      }),
      resolve(),
      commonJS({ ignoreGlobal: true }),
    ],
  };
};

export default [
  configForFile('index', 'downsample'),
  configForFile('methods/ASAP'),
  configForFile('methods/LTD'),
  configForFile('methods/LTOB'),
  configForFile('methods/LTTB'),
  configForFile('methods/SMA'),
];
