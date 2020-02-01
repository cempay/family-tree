module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|my-project|react-native-button)/)"
  ]
};
