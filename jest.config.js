module.exports = {
  preset: "ts-jest", // Use ts-jest to handle TypeScript files
  testEnvironment: "node", // Set the test environment to node
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transform .ts and .tsx files using ts-jest
  },
  moduleFileExtensions: ["ts", "js"], // Make sure to include .ts and .js file extensions
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json", // Use the tsconfig.json file for settings
    },
  },
};
