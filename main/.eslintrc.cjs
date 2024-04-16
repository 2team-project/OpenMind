module.exports = {
  root: true,
  env: { browser: true, es2020: true }, // 프로젝트 사용 환경 설정
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ], // 다른 eslint 설정을 확장해서 사용할 때 설정
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' }, // eslint 사용을 위해 지원하려는 javascript 언어 옵션을 설정
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react/prop-types': 'off',
    'react/no-underscore-dangle': 'allow',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  }, // 설정 파일에서 규칙 하나하나를 세세하게 제어하기 위해 사용
}
