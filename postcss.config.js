module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
