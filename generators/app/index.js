'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yeomanGenerator = require('yeoman-generator');

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

var _os = require('os');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (_Generator) {
  _inherits(_class, _Generator);

  function _class(args, opts) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, opts));

    _this.option('skip-install');
    return _this;
  }

  _createClass(_class, [{
    key: 'install',
    value: function install() {
      if (this.options.skipInstall) {
        return;
      }

      console.log('Installing dependencies...');
      console.log();

      this.npmInstall(['simpl-schema', 'moment'], { save: true });
      this.spawnCommandSync('meteor', ['add', 'aldeed:autoform', 'aldeed:collection2-core', 'aldeed:template-extension', 'arillo:flow-router-helpers', 'fourseven:scss', 'kadira:blaze-layout', 'kadira:flow-router', 'mdg:validated-method', 'reywood:publish-composite', 'mixmax:smart-disconnect', 'london:body-class', 'blaze-html-templates']);
      this.spawnCommandSync('meteor', ['remove', 'autopublish', 'insecure', 'static-html']);
      this.spawnCommandSync('meteor', ['npm', 'install']);
    }
  }, {
    key: 'writing',
    value: function writing() {
      this._copy('templates/client/main.html');
      this._copy('templates/settings.json');
      this._copy('templates/imports/lib/layouts/app-footer.html');
      this._copy('templates/imports/lib/layouts/app-footer.js');
      this._copy('templates/imports/lib/layouts/app-header.html');
      this._copy('templates/imports/lib/layouts/app-header.js');
      this._copy('templates/imports/lib/layouts/app-layout.html');
      this._copy('templates/imports/lib/layouts/app-layout.js');
      this._copy('templates/imports/lib/layouts/preloader.html');
      this._copy('templates/imports/views/body-class.js');

      this._copy('templates/imports/lib/services/layout-manager.js');

      this._copy('templates/imports/home/pages/show.html');
      this._copy('templates/imports/home/pages/show.js');
      this._copy('templates/imports/home/routes/show.js');
      this._copy('templates/imports/home/index.js');

      this.fs.write('client/main.js', '');
      this.fs.append('client/main.js', 'import \'/imports/views/body-class.js\'' + _os.EOL);
      this.fs.append('client/main.js', 'import \'/imports/home/\'' + _os.EOL);
    }
  }, {
    key: '_copy',
    value: function _copy(filePath) {
      var path = filePath.slice(/\//.exec(filePath).index + 1);
      this.fs.copy(this.templatePath(path), this.destinationPath(path));
    }
  }]);

  return _class;
}(_yeomanGenerator2.default);