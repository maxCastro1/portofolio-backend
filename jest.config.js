/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  clearMocks:true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}", // Include all JavaScript/JSX files in the src directory
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/", // Exclude the node_modules directory
    "/__tests__/",     // Exclude the tests directory
  ],
};