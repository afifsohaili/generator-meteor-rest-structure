var Generator = require('yeoman-generator')
var pascalCase = require('pascal-case')
var os = require('os')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.argument('resource', { type: String, required: true })
  }

  writing () {
    const resource = this.options.resource

    this.log(`Generating resource "${resource}"...`)

    if (!this.fs.exists(`imports/${resource}/${resource}-collection.js`)) {
      this.fs.write(
        `imports/${resource}/${resource}-collection.js`,
        `export default new Mongo.Collection('${resource}')${os.EOL}`
      )
    }

    if (!this.fs.exists(`imports/${resource}/index.js`)) {
      this.fs.write(`imports/${resource}/index.js`, os.EOL)
    }

    this._processRoute('index')
    this._processRoute('show')
    // this._processRoute('index')

    if (!this._writtenInMain()) {
      this.fs.append(
        'client/main.js',
        `import '/imports/${resource}'${os.EOL}`
      )
    }
  }

  _processRoute (route) {
    const resource = this.options.resource

    this._copy(`templates/pages/${route}.html`)
    this._copy(`templates/pages/${route}.js`)
    this._copy(`templates/routes/${route}.js`)

    this.fs.append(
      `imports/${resource}/index.js`,
      `import './routes/${route}.js'${os.EOL}`
    )
  }

  _copy (filePath) {
    const path = filePath.slice(/\//.exec(filePath).index + 1)

    this.fs.copyTpl(
      this.templatePath(path),
      this.destinationPath(`imports/${this.options.resource}/${path}`),
      this._resource()
    )
  }

  _resource () {
    return {
      resource: this.options.resource,
      Resource: pascalCase(this.options.resource)
    }
  }

  _writtenInMain () {
    const content = this.fs.read('client/main.js')
    const regex = new RegExp(`import.+imports/${this.options.resource}`)
    return content.match(regex)
  }
}
