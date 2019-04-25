module.exports = {
  '*.js': [
    'eslint --fix',
    'prettier --write',
    'git add',
  ],
  '{!(package)*.json,*.code-snippets,!.(npmrc)*rc}': [
    'prettier --parser json',
    'git add',
  ],
  'package.json': ['prettier', 'git add'],
  '*.vue': [
    'eslint --fix',
    'stylelint **/*.vue --fix',
    'prettier --write',
    'git add',
  ],
  '*.scss': ['stylelint **/*.scss --fix', 'prettier --write', 'git add'],
  '*.md': ['markdownlint', 'prettier --write', 'git add'],
  '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged', 'git add'],
}
