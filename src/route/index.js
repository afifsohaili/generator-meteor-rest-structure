var Generator = require('yeoman-generator')
var pascalCase = require('pascal-case')
var os = require('os')
var split = require('split-keywords')
var _ = require('underscore')
var decamelize = require('decamelize')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.argument('resource', { type: String, required: true })
    this.option('only', { type: String })
  }

  writing () {
    var resource = this.options.resource
    const resourcePath = decamelize(resource, '-')
    var fullRoutes = ['index', 'show', 'new', 'edit']

    if (this.options.only) {
      var only = split(this.options.only)
      var routes = (function () {
        return _.intersection(fullRoutes, only)
      }())
    } else {
      var routes = fullRoutes
    }

    this.log(`Generating resource "${resource}"...`)

    if (!this.fs.exists(`imports/${resourcePath}/index.js`)) {
      this.fs.write(`imports/${resourcePath}/index.js`, '')
    }
    if (!this.fs.exists(`server/operations/${resourcePath}.js`)) {
      this.fs.write(`server/operations/${resourcePath}.js`, '')
    }
    if (!this.fs.exists(`server/subscriptions/${resourcePath}.js`)) {
      this.fs.write(`server/subscriptions/${resourcePath}.js`, '')
    }

    if (this._toGenerateRoute('index', routes)) {
      this._processRoute('index')
      this._copy('templates/subscriptions/index.js')
      this.fs.append(`server/subscriptions/${resourcePath}.js`, `import '/imports/${resourcePath}/subscriptions/index.js'${os.EOL}`)
    }

    if (this._toGenerateRoute('new', routes)) {
      this._processRoute('new')
      this._copy('templates/operations/create.js')
      this.fs.append(`server/operations/${resourcePath}.js`, `import '/imports/${resourcePath}/operations/create.js'${os.EOL}`)
    }

    if (this._toGenerateRoute('edit', routes)) {
      this._processRoute('edit')
      this._copy('templates/operations/update.js')
      this.fs.append(`server/operations/${resourcePath}.js`, `import '/imports/${resourcePath}/operations/update.js'${os.EOL}`)
    }

    if (this._toGenerateRoute('show', routes)) {
      this._processRoute('show')
      this._copy('templates/subscriptions/show.js')
      this.fs.append(`server/subscriptions/${resourcePath}.js`, `import '/imports/${resourcePath}/subscriptions/show.js'${os.EOL}`)
    }

    if (this._toGenerateRoute('new', routes) || this._toGenerateRoute('edit', routes)) {
      this._copy('templates/pages/_form.html')
      this._copy('templates/pages/_form.js')
    }

    this.fs.copyTpl(
      this.templatePath('collection.js'),
      this.destinationPath(`imports/${resourcePath}/${resourcePath}-collection.js`),
      this._resource()
    )
    this.fs.copyTpl(
      this.templatePath('schema.js'),
      this.destinationPath(`imports/${resourcePath}/${resourcePath}-schema.js`),
      this._resource()
    )

    if (!this._writtenInMain()) {
      this.fs.append(
        'client/main.js',
        `import '/imports/${resourcePath}'${os.EOL}`
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
      `imports/${decamelize(resource, '-')}/index.js`,
      `import './routes/${route}.js'${os.EOL}`
    )
  }

  _copy (filePath) {
    var path = filePath.slice(/\//.exec(filePath).index + 1)
    const resourcePath = decamelize(this.options.resource, '-')

    this.fs.copyTpl(
      this.templatePath(path),
      this.destinationPath(`imports/${resourcePath}/${path}`),
      this._resource()
    )
  }

  _resource () {
    const resource = this.options.resource

    return {
      resource: resource,
      Resource: pascalCase(resource),
      resourceSingular: resource.slice(0, -1),
      resourcePath: decamelize(resource, '-')
    }
  }

  _writtenInMain () {
    var content = this.fs.read('client/main.js')
    var regex = new RegExp(`import.+imports/${this.options.resource}`)
    return content.match(regex)
  }
}
