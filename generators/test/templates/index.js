const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)
  }

  install () {
    this.spawnCommandSync('meteor', [
      'add',
      'mdg:validation-error',
      'xolvio:cleaner',
      'dburles:factory',
      'practicalmeteor:mocha',
    ])
  }
}
