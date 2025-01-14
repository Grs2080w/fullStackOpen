module.exports = {
  presets: [
    "@babel/preset-env", // Transpila o código JS moderno para versões compatíveis com navegadores mais antigos
    ["@babel/preset-react", { runtime: "automatic" }], // Ativa o JSX automático
  ],
};
