var Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)
  }

  install () {
    this.spawnCommandSync('meteor', [
      'add',
      'useraccounts:unstyled',
      'useraccounts:flow-routing',
      'accounts-password'
    ])
    this.spawnCommandSync('meteor', [
      'npm',
      'install',
      '--save',
      'bcrypt'
    ])
  }

  writing () {
    this._copy('templates/users/config.js')
    this._copy('templates/users/index.js')
    this._copy('templates/users/routes/new.js')
    this._copy('templates/users/pages/new.html')
    this._copy('templates/users/pages/new.js')

    this._copy('templates/sessions/routes/new.js')
    this._copy('templates/sessions/pages/new.html')
    this._copy('templates/sessions/pages/new.js')

    this._copy('templates/sessions/index.js')

    this.fs.append('client/main.js', require('os').EOL)
    this.fs.append('client/main.js', "import '/imports/users/'" + require('os').EOL)
    this.fs.append('client/main.js', "import '/imports/sessions/'" + require('os').EOL)
  }

  _copy (filePath) {
    const path = filePath.slice(/\//.exec(filePath).index + 1)
    this.fs.copy(
      this.templatePath(path),
      this.destinationPath('imports/' + path)
    )
  }
}
