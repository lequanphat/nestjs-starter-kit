module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'chore']],
    'scope-empty': [0],
    'type-case': [0],
    'subject-empty': [2, 'never'],
    'subject-case': [0],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(feat|fix|chore)\/(.+)$/,
      headerCorrespondence: ['type', 'summary'],
    },
  },
};
