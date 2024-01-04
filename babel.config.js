const plugins = []
if (process.env.NODE_ENV === 'test') {
  plugins.push(["istanbul"])
}

module.exports = {
  "exclude": "node_modules/**",
  
  "presets": [["@vue/app", { "useBuiltIns": "entry" }]],
  
  plugins
}
