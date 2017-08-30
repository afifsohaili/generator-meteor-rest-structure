'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function Materialize(generator) {
    _classCallCheck(this, Materialize);

    this.generator = generator;
  }

  _createClass(Materialize, [{
    key: 'install',
    value: function install() {
      this.generator.spawnCommandSync('meteor', ['remove', 'fourseven:scss', 'useraccounts:unstyled', 'aldeed:autoform']);
      this.generator.spawnCommandSync('meteor', ['add', 'aldeed:autoform', 'fourseven:scss', 'materialize:materialize@=0.99.0', 'mozfet:autoform-materialize', 'nicolaslopezj:tabular-materialize', 'useraccounts:materialize']);
    }
  }, {
    key: 'writing',
    value: function writing() {
      this.generator._copy('templates/materialize/variables/_colors.scss');
      this.generator._copy('templates/materialize/variables/_spacing.scss');
      this.generator._copy('templates/materialize/variables/_typography.scss');
      this.generator._copy('templates/materialize/variables.scss');

      this.generator._copy('templates/materialize/base.scss');
    }
  }]);

  return Materialize;
}();