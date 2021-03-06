'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Generator = require('yeoman-generator');

module.exports = function (_Generator) {
  _inherits(_class, _Generator);

  function _class(args, opts) {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, opts));
  }

  _createClass(_class, [{
    key: 'install',
    value: function install() {
      this.spawnCommandSync('meteor', ['add', 'useraccounts:unstyled', 'useraccounts:flow-routing', 'accounts-password']);
      this.spawnCommandSync('meteor', ['npm', 'install', '--save', 'bcrypt']);
    }
  }, {
    key: 'writing',
    value: function writing() {
      this._copy('templates/users/config.js');
      this._copy('templates/users/index.js');
      this._copy('templates/users/routes/new.js');
      this._copy('templates/users/pages/new.html');
      this._copy('templates/users/pages/new.js');

      this._copy('templates/sessions/routes/new.js');
      this._copy('templates/sessions/pages/new.html');
      this._copy('templates/sessions/pages/new.js');

      this._copy('templates/sessions/index.js');

      this.fs.append('client/main.js', require('os').EOL);
      this.fs.append('client/main.js', "import '/imports/users/'" + require('os').EOL);
      this.fs.append('client/main.js', "import '/imports/sessions/'" + require('os').EOL);
    }
  }, {
    key: '_copy',
    value: function _copy(filePath) {
      var path = filePath.slice(/\//.exec(filePath).index + 1);
      this.fs.copy(this.templatePath(path), this.destinationPath('imports/' + path));
    }
  }]);

  return _class;
}(Generator);