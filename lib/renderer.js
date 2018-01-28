const edge = require('edge.js')

function renderer (data, locals) {
  edge.registerViews(data.path)

  return edge.renderString(data.text, locals)
}

module.exports = renderer
