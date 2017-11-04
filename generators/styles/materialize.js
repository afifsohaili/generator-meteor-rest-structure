'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
var os = require('os');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function Materialize(generator) {
    _classCallCheck(this, Materialize);

    this.generator = generator;
  }

  _createClass(Materialize, [{
    key: 'install',
    value: function install() {
      this.generator.spawnCommandSync('meteor', ['remove', 'useraccounts:unstyled']);
      this.generator.spawnCommandSync('meteor', ['add', 'aldeed:autoform', 'mozfet:autoform-materialize', 'nicolaslopezj:tabular-materialize', 'useraccounts:materialize']);
      this.generator.npmInstall(['materialize-css'], { save: true });

      this.generator.spawnCommandSync('meteor', ['npm', 'install']);
    }
  }, {
    key: 'writing',
    value: function writing() {
      this.generator._copy('templates/materialize/client/materialize.js');
      this.generator._copy('templates/materialize/client/materialize.scss');

      this.generator._copy('templates/materialize/imports/views/stylesheets/variables/_colors.scss');
      this.generator._copy('templates/materialize/imports/views/stylesheets/variables/_spacing.scss');
      this.generator._copy('templates/materialize/imports/views/stylesheets/variables/_typography.scss');
      this.generator._copy('templates/materialize/imports/views/stylesheets/variables.scss');

      this.generator._copy('templates/materialize/imports/views/autoform.js');

      this.generator._copy('templates/materialize/imports/views/stylesheets/base.scss');

      if (!this._writtenInMain()) {
        this.generator.fs.append('client/main.js', 'import \'/imports/views/autoform.js\'' + os.EOL);
      }
    }
  }, {
    key: '_writtenInMain',
    value: function _writtenInMain() {
      var content = this.generator.fs.read('client/main.js');
      var regex = new RegExp('import.+views.autoform.js');
      return content.match(regex);
    }
  }]);

  return Materialize;
}();
