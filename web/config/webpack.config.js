module.exports = {
  module: {
    rules: [
      {
        // temporary react-spring bug fix
        test: /react-spring/,
        sideEffects: true,
      },
    ],
  },
}
