'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Generator = require('yeoman-generator');
var pascalCase = require('pascal-case');
var os = require('os');
var split = require('split-keywords');
var _ = require('underscore');
var decamelize = require('decamelize');

module.exports = function (_Generator) {
  _inherits(_class, _Generator);

  function _class(args, opts) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, opts));

    _this.argument('resource', { type: String, required: true });
    _this.option('only', { type: String });
    return _this;
  }

  _createClass(_class, [{
    key: 'writing',
    value: function writing() {
      var resource = this.options.resource;
      var resourcePath = decamelize(resource, '-');
      var fullRoutes = ['index', 'show', 'new', 'edit'];

      if (this.options.only) {
        var only = split(this.options.only);
        var routes = function () {
          return _.intersection(fullRoutes, only);
        }();
      } else {
        var routes = fullRoutes;
      }

      this.log('Generating resource "' + resource + '"...');

      if (!this.fs.exists('imports/' + resourcePath + '/index.js')) {
        this.fs.write('imports/' + resourcePath + '/index.js', '');
      }
      if (!this.fs.exists('server/operations/' + resourcePath + '.js')) {
        this.fs.write('server/operations/' + resourcePath + '.js', '');
      }
      if (!this.fs.exists('server/subscriptions/' + resourcePath + '.js')) {
        this.fs.write('server/subscriptions/' + resourcePath + '.js', '');
      }

      if (this._toGenerateRoute('index', routes)) {
        this._processRoute('index');
        this._copy('templates/subscriptions/index.js');
        this.fs.append('server/subscriptions/' + resourcePath + '.js', 'import \'/imports/' + resourcePath + '/subscriptions/index.js\'' + os.EOL);
      }

      if (this._toGenerateRoute('new', routes)) {
        this._processRoute('new');
        this._copy('templates/operations/create.js');
        this.fs.append('server/operations/' + resourcePath + '.js', 'import \'/imports/' + resourcePath + '/operations/create.js\'' + os.EOL);
      }

      if (this._toGenerateRoute('edit', routes)) {
        this._processRoute('edit');
        this._copy('templates/operations/update.js');
        this.fs.append('server/operations/' + resourcePath + '.js', 'import \'/imports/' + resourcePath + '/operations/update.js\'' + os.EOL);
      }

      if (this._toGenerateRoute('show', routes)) {
        this._processRoute('show');
        this._copy('templates/subscriptions/show.js');
        this.fs.append('server/subscriptions/' + resourcePath + '.js', 'import \'/imports/' + resourcePath + '/subscriptions/show.js\'' + os.EOL);
      }

      if (this._toGenerateRoute('new', routes) || this._toGenerateRoute('edit', routes)) {
        this._copy('templates/pages/_form.html');
        this._copy('templates/pages/_form.js');
      }

      this.fs.copyTpl(this.templatePath('collection.js'), this.destinationPath('imports/' + resourcePath + '/' + resourcePath + '-collection.js'), this._resource());
      this.fs.copyTpl(this.templatePath('schema.js'), this.destinationPath('imports/' + resourcePath + '/' + resourcePath + '-schema.js'), this._resource());

      if (!this._writtenInMain()) {
        this.fs.append('client/main.js', 'import \'/imports/' + resourcePath + '\'' + os.EOL);
      }
    }
  }, {
    key: '_toGenerateRoute',
    value: function _toGenerateRoute(route, routes) {
      return _.indexOf(routes, route) > -1;
    }
  }, {
    key: '_processRoute',
    value: function _processRoute(route) {
      var resource = this.options.resource;

      this._copy('templates/pages/' + route + '.html');
      this._copy('templates/pages/' + route + '.js');
      this._copy('templates/routes/' + route + '.js');

      this.fs.append('imports/' + decamelize(resource, '-') + '/index.js', 'import \'./routes/' + route + '.js\'' + os.EOL);
    }
  }, {
    key: '_copy',
    value: function _copy(filePath) {
      var path = filePath.slice(/\//.exec(filePath).index + 1);
      var resourcePath = decamelize(this.options.resource, '-');

      this.fs.copyTpl(this.templatePath(path), this.destinationPath('imports/' + resourcePath + '/' + path), this._resource());
    }
  }, {
    key: '_resource',
    value: function _resource() {
      var resource = this.options.resource;

      return {
        resource: resource,
        Resource: pascalCase(resource),
        resourceSingular: resource.slice(0, -1),
        resourcePath: decamelize(resource, '-')
      };
    }
  }, {
    key: '_writtenInMain',
    value: function _writtenInMain() {
      var content = this.fs.read('client/main.js');
      var regex = new RegExp('import.+imports/' + this.options.resource);
      return content.match(regex);
    }
  }]);

  return _class;
}(Generator);