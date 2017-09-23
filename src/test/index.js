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

    this.npmInstall([
      'chai',
      'chai-change',
      'chai-datetime',
      'faker',
      'sinon',
    ], { 'save-dev': true })

    this.spawnCommandSync('meteor', [
      'npm',
      'install'
    ])
  }
}
