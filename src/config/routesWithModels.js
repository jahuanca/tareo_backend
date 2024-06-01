const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)

const routesOfModels = new Map()

fs
  .readdirSync(path.join(__dirname, '..', 'routes'))
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const f = file.replace('.js', '')
    const name = f.replace(/_/g, '-')
    const dir = path.join(
      __dirname,
      '..',
      '..',
      'public',
      'uploads', `${name}s`)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    // app.use(`/avicola/${f}`, require(`./routes/${f}`));
    routesOfModels.set(`/${f}`, require(`../routes/${f}`))

    // app.use(`/canastas/${f}`, require(`./routes/${f}`));
  })

// configuracion lectura models
const models = path.join(__dirname, '..', './models')
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(path.join(models, file)))

module.exports = routesOfModels
