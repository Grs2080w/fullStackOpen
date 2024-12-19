const path = require('path');

module.exports = {
  mode: 'development', // Change to 'production' for optimized builds
    entry: './src/index.js',
    output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
    },
    module: {
    rules: [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
        }
        }
    },
    // Other loaders for CSS, images, etc.
    ]
    },

  // Resolução de módulos
  resolve: {
    // Configurações para resolver aliases, extensões, etc.
    extensions: ['.js', '.jsx'],
    // Configuração para resolver o módulo 'os'
    fallback: {
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify")
    }
  }
};