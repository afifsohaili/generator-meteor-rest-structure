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

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, opts));

    _this.argument('style', { type: String, required: true });
    return _this;
  }

  _createClass(_class, [{
    key: 'install',
    value: function install() {
      this.log('Your style option is ' + this.options.style);

      if (this.options.style === 'materialize') {
        var Materialize = require('./materialize.js');
        new Materialize(this).install();
      }
    }
  }, {
    key: 'writing',
    value: function writing() {
      if (this.options.style === 'materialize') {
        var Materialize = require('./materialize.js');
        new Materialize(this).writing();
      }
    }
  }, {
    key: '_copy',
    value: function _copy(filePath) {
      var path = filePath.slice(/\//.exec(filePath).index + 1);
      this.fs.copy(this.templatePath(path), this.destinationPath('client/scss/' + path));
    }
  }]);

  return _class;
}(Generator);