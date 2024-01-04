module.exports = {
  devServer: {
    contentBase: ['example/public']
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === "test") {
      config.merge({
        target: "node",
        devtool: "eval"
      });
    } else if (process.env.NODE_ENV === "production") {
      config.externals({
        ...config.get("externals"),
        crypto: "crypto"
      });
    } else {
      config.merge({
        entry: {
          app: "./example/main.js"
        }
      });
      config.plugin("html").tap(args => {
        args[0].template = "./example/index.html";
        return args;
      });
    }
  }
};
