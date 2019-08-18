module.exports = {
  collectCoverageFrom: [
    "src/**/*.{js,jsx}"
  ],
  testMatch: [
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx}"
  ],
  testURL: "http://localhost",
  moduleFileExtensions: [
    "js",
    "json",
    "jsx"
  ]
}