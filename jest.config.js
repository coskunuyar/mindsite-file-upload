export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testMatch: ["**/__tests__/**/*.test.(ts|tsx|js|jsx)"],
};
