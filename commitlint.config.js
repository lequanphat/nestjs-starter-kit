module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'chore']],

    'subject-pattern': [2, 'always', /^\/?\w+\/[\w\s]+$/],

    'scope-empty': [0],

    'type-case': [0],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+)\/(.*)$/,
      headerCorrespondence: ['type', 'summary'],
    },
  },
};
