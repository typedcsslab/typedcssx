module.exports = {
  transform: {
    '^.+\\.ts?$': '@swc/jest',
  },
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/test'],
  coverageReporters: ['text', 'html'],
  reporters: [['github-actions', { silent: false }], 'summary'],
};
