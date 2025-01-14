module.exports = {
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true, // Habilita a coleta de cobertura
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx,cjs}", // Arquivos a incluir na cobertura
    "!src/main.jsx", // Exclui arquivos específicos
  ],
  coverageDirectory: "coverage", // Diretório de saída para o relatório
  coverageThreshold: {
    // Define limites mínimos de cobertura
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
};
