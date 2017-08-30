module.exports = class Materialize {
  constructor (generator) {
    this.generator = generator
  }

  install () {
    this.generator.spawnCommandSync('meteor', [
      'remove',
      'fourseven:scss',
      'useraccounts:unstyled',
      'aldeed:autoform'
    ])
    this.generator.spawnCommandSync('meteor', [
      'add',
      'aldeed:autoform',
      'fourseven:scss',
      'materialize:materialize@=0.99.0',
      'mozfet:autoform-materialize',
      'nicolaslopezj:tabular-materialize',
      'useraccounts:materialize',
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
