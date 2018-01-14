const config = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js'],
    coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
    setupTestFrameworkScriptFile: './enzyme.config.js',
};

module.exports = config;
