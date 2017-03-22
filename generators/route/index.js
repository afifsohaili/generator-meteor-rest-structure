var Generator = require('yeoman-generator')
var pascalCase = require('pascal-case')
var os = require('os')
var split = require('split-keywords')
var _ = require('underscore')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.argument('resource', { type: String, required: true })
    this.option('only', { type: String })
  }

  writing () {
    var resource = this.options.resource
    var only = split(this.options.only)
    var routes = (function () {
      var fullRoutes = ['index', 'show', 'new', 'edit']
      return _.intersection(fullRoutes, only)
    }())

    this.log(`Generating resource "${resource}"...`)

    if (!this.fs.exists(`imports/${resource}/index.js`)) {
      this.fs.write(`imports/${resource}/index.js`, '')
    }
    if (!this.fs.exists(`server/operations/${resource}.js`)) {
      this.fs.write(`server/operations/${resource}.js`, '')
    }
    if (!this.fs.exists(`server/subscriptions/${resource}.js`)) {
      this.fs.write(`server/subscriptions/${resource}.js`, '')
    }

    if (this._toGenerateRoute('index', routes)) {
      this._processRoute('index')
      this._copy('templates/subscriptions/index.js')
      this.fs.append(`server/subscriptions/${resource}.js`, `import '/imports/${resource}/subscriptions/index.js'${os.EOL}`)
    }

    if (this._toGenerateRoute('new', routes)) {
      this._processRoute('new')
      this._copy('templates/operations/create.js')
      this.fs.append(`server/operations/${resource}.js`, `import '/imports/${resource}/operations/create.js'${os.EOL}`)
    }

    if (this._toGenerateRoute('edit', routes)) {
      this._processRoute('edit')
      this._copy('templates/operations/update.js')
      this.fs.append(`server/operations/${resource}.js`, `import '/imports/${resource}/operations/update.js'${os.EOL}`)
    }

    if (this._toGenerateRoute('show', routes)) {
      this._processRoute('show')
      this._copy('templates/subscriptions/show.js')
      this.fs.append(`server/subscriptions/${resource}.js`, `import '/imports/${resource}/subscriptions/show.js'${os.EOL}`)
    }

    if (this._toGenerateRoute('new', routes) || this._toGenerateRoute('edit', routes)) {
      this._copy('templates/pages/_form.html')
      this._copy('templates/pages/_form.js')
    }

    this.fs.copyTpl(
      this.templatePath('collection.js'),
      this.destinationPath(`imports/${resource}/${resource}-collection.js`),
      this._resource()
    )
    this.fs.copyTpl(
      this.templatePath('schema.js'),
      this.destinationPath(`imports/${resource}/${resource}-schema.js`),
      this._resource()
    )

    if (!this._writtenInMain()) {
      this.fs.append(
        'client/main.js',
        `import '/imports/${resource}'${os.EOL}`
      )
    }
  }

  _toGenerateRoute (route, routes) {
    return _.indexOf(routes, route) > -1
  }

  _processRoute (route) {
    var resource = this.options.resource

    this._copy(`templates/pages/${route}.html`)
    this._copy(`templates/pages/${route}.js`)
    this._copy(`templates/routes/${route}.js`)

    this.fs.append(
      `imports/${resource}/index.js`,
      `import './routes/${route}.js'${os.EOL}`
    )
  }

  _copy (filePath) {
    var path = filePath.slice(/\//.exec(filePath).index + 1)

    this.fs.copyTpl(
      this.templatePath(path),
      this.destinationPath(`imports/${this.options.resource}/${path}`),
      this._resource()
    )
  }

  _resource () {
    return {
      resource: this.options.resource,
      Resource: pascalCase(this.options.resource),
      resourceSingular: this.options.resource.slice(0, -1)
    }
  }

  _writtenInMain () {
    var content = this.fs.read('client/main.js')
    var regex = new RegExp(`import.+imports/${this.options.resource}`)
    return content.match(regex)
  }
}
