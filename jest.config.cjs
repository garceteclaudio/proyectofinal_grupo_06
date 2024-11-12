const config = {
  verbose: true,
};

module.exports = {
  testEnvironment: "jest-environment-jsdom",
  config,
  // Add this line to handle CSS imports
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },
};
