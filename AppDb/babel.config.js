const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '8',
        },
        modules: isTest ? 'commonjs' : false,
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/plugin-proposal-json-strings',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-transform-runtime',
  ],
};
