module.exports = class Materialize {
  constructor (generator) {
    this.generator = generator
  }

  install () {
    this.generator.spawnCommand('meteor', [
      'remove',
      'fourseven:scss',
      'useraccounts:unstyled',
      'aldeed:autoform'
    ])
    this.generator.spawnCommand('meteor', [
      'add',
      'materialize:materialize@=0.98.2',
      'useraccounts:materialize',
      'nicolaslopezj:tabular-materialize',
      'fourseven:scss',
      'aldeed:autoform',
      'mozfet:autoform-materialize'
    ])
  }

  writing () {
    this.generator._copy('templates/materialize/variables/_colors.scss')
    this.generator._copy('templates/materialize/variables/_spacing.scss')
    this.generator._copy('templates/materialize/variables/_typography.scss')
    this.generator._copy('templates/materialize/variables.scss')

    this.generator._copy('templates/materialize/base.scss')
  }
}
