var Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.option('skip-install')
  }

  install () {
    if (this.options.skipInstall) { return }

    console.log('Installing dependencies...')
    console.log()

    this.npmInstall([
      'simpl-schema',
      'moment'
    ], { save: true })
    this.spawnCommandSync('meteor', [
      'add',
      'aldeed:autoform',
      'aldeed:collection2-core',
      'aldeed:template-extension',
      'arillo:flow-router-helpers',
      'fourseven:scss',
      'kadira:blaze-layout',
      'kadira:flow-router',
      'mdg:validated-method',
      'reywood:publish-composite',
      'mixmax:smart-disconnect',
      'london:body-class',
      'blaze-html-templates',
    ])
    this.spawnCommandSync('meteor', [
      'remove',
      'autopublish',
      'insecure',
      'static-html'
    ])
    this.spawnCommandSync('meteor', [
      'npm',
      'install',
    ])
  }

  writing () {
    this._copy('templates/client/main.html')
    this._copy('templates/settings.json')
    this._copy('templates/imports/lib/layouts/app-footer.html')
    this._copy('templates/imports/lib/layouts/app-footer.js')
    this._copy('templates/imports/lib/layouts/app-header.html')
    this._copy('templates/imports/lib/layouts/app-header.js')
    this._copy('templates/imports/lib/layouts/app-layout.html')
    this._copy('templates/imports/lib/layouts/app-layout.js')
    this._copy('templates/imports/lib/layouts/preloader.html')
    this._copy('templates/imports/views/body-class.js')

    this._copy('templates/imports/lib/services/layout-manager.js')

    this._copy('templates/imports/home/pages/show.html')
    this._copy('templates/imports/home/pages/show.js')
    this._copy('templates/imports/home/routes/show.js')

    this.fs.write('client/main.js', require('os').EOL)
    this.fs.append('client/main.js', "import '/imports/home/routes/show.js'" + require('os').EOL)
    this.fs.append('client/main.js', "import '/imports/views/body-class.js'" + require('os').EOL);
  }

  _copy (filePath) {
    const path = filePath.slice(/\//.exec(filePath).index + 1)
    this.fs.copy(
      this.templatePath(path),
      this.destinationPath(path)
    )
  }
}
