module.exports = {
  transform: {
    '^.+\\.ts?$': '@swc/jest',
  },
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/test'],
  reporters: [['github-actions', { silent: false }], 'summary'],
};
