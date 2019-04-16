module.exports = {
  '*.js': [
    'eslint --fix',
    'prettier --write',
    'git add',
    'yarn unit --bail --findRelatedTests',
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
    'yarn unit --passWithNoTests --bail --colors --findRelatedTests',
  ],
  '*.scss': ['stylelint **/*.scss --fix', 'prettier --write', 'git add'],
  '*.md': ['markdownlint', 'prettier --write', 'git add'],
  // '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged', 'git add'],
}
