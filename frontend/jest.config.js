module.exports = {
  // This setupFilesAfterEnv is typically handled by create-react-app's react-scripts
  // setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
  // This transformIgnorePatterns was previously in package.json
  // other config...
  moduleNameMapper: {
  '^src/(.*)$': '<rootDir>/src/$1', // <== resolve absolute paths
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  
  
  // Add any additional Jest configurations here
  // For example:
  // moduleNameMapper: {
  //   '^@components/(.*)$': '<rootDir>/src/components/$1',
  // },
  // collectCoverageFrom: [
  //   'src/**/*.{js,jsx,ts,tsx}',
  //   '!src/**/*.d.ts',
  // ],
};
