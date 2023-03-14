module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'path/to/your/tsconfig.json'
    }
  },
  testMatch: ['**/__tests__/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
  transform: {
    'ts-jest':  '^.+\\.(ts|tsx)$' 
    // 'ts-jest': {
    //   '^.+\\.(ts|tsx)$'
    // }
  }
};