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
    this.fs.copy(
      this.templatePath(path),
      this.destinationPath(`client/scss/` + path)
    )
  }
}
