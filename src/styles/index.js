var Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.argument('style', { type: String, required: true })
  }

  install () {
    this.log(`Your style option is ${this.options.style}`)

    if (this.options.style === 'materialize') {
      const Materialize = require('./materialize.js')
      new Materialize(this).install()
    }
  }

  writing () {
    if (this.options.style === 'materialize') {
      const Materialize = require('./materialize.js')
      new Materialize(this).writing()
    }
  }

  _copy (filePath) {
    const path = filePath.slice(/\//.exec(filePath).index + 1)
    const exportPath = filePath.slice(
      new RegExp(`/${this.options.style}`).exec(filePath).index + `/${this.options.style}`.length + 1
    )
    this.log(path, exportPath)
    this.fs.copy(
      this.templatePath(path),
      this.destinationPath(exportPath)
    )
  }
}
