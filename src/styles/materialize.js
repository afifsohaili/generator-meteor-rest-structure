var os = require('os');

module.exports = class Materialize {
  constructor (generator) {
    this.generator = generator
  }

  install () {
    this.generator.spawnCommandSync('meteor', [
      'remove',
      'useraccounts:unstyled',
    ])
    this.generator.spawnCommandSync('meteor', [
      'add',
      'aldeed:autoform',
      'mozfet:autoform-materialize',
      'nicolaslopezj:tabular-materialize',
      'useraccounts:materialize',
    ])
    this.generator.npmInstall([
      'materialize-css',
    ], { save: true })

    this.generator.spawnCommandSync('meteor', ['npm', 'install'])
  }

  writing () {
    this.generator._copy('templates/materialize/client/materialize.js')
    this.generator._copy('templates/materialize/client/materialize.scss')

    this.generator._copy('templates/materialize/imports/views/stylesheets/variables/_colors.scss')
    this.generator._copy('templates/materialize/imports/views/stylesheets/variables/_spacing.scss')
    this.generator._copy('templates/materialize/imports/views/stylesheets/variables/_typography.scss')
    this.generator._copy('templates/materialize/imports/views/stylesheets/variables.scss')

    this.generator._copy('templates/materialize/imports/views/stylesheets/base.scss')

    this.generator._copy('templates/materialize/imports/views/autoform.js');

    if (!this._writtenInMain()) {
      this.fs.append(
        'client/main.js',
        `import '/imports/views/autoform.js'${os.EOL}`
      )
    }
  }

  _writtenInMain () {
    var content = this.fs.read('client/main.js')
    var regex = new RegExp(`import.+imports/${this.options.resource}`)
    return content.match(regex)
  }
}
