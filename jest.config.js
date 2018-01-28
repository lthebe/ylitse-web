const config = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js'],
    coverageReporters: ['text-summary', 'html'],
    setupFiles: ['./enzyme.config.js'],
};

module.exports = config;
