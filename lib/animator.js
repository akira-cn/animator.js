'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nowtime() {
  /* eslint-disable no-undef */
  if (typeof performance !== 'undefined' && performance.now) {
    return performance.now();
  }
  /* eslint-enable no-undef */
  return Date.now ? Date.now() : new Date().getTime();
}

if (typeof global.requestAnimationFrame === 'undefined') {
  global.requestAnimationFrame = function (callback) {
    return setTimeout(function () {
      // polyfill
      callback.call(this, nowtime());
    }, 1000 / 60);
  };
  global.cancelAnimationFrame = function (qId) {
    return clearTimeout(qId);
  };
}

var _require = require('fast-animation-frame'),
    requestAnimationFrame = _require.requestAnimationFrame,
    cancelAnimationFrame = _require.cancelAnimationFrame;

var Animator = function () {
  function Animator(duration, update, easing) {
    (0, _classCallCheck3.default)(this, Animator);

    this.duration = duration;
    this.update = update;
    this.easing = easing;
  }

  (0, _createClass3.default)(Animator, [{
    key: 'animate',
    value: function animate(startTime) {
      startTime = startTime || 0;

      var duration = this.duration,
          update = this.update,
          easing = this.easing,
          self = this;

      return new _promise2.default(function (resolve, reject) {
        var qId = 0;
        function step(timestamp) {
          startTime = startTime || timestamp;
          var p = Math.min(1.0, (timestamp - startTime) / duration);

          update.call(self, easing ? easing(p) : p, p);

          if (p < 1.0) {
            qId = requestAnimationFrame(step);
          } else {
            resolve(startTime + duration);
          }
        }

        self.cancel = function () {
          cancelAnimationFrame(qId);
          update.call(self, 0, 0);
          resolve(startTime + duration);
        };
        qId = requestAnimationFrame(step);
      });
    }
  }, {
    key: 'ease',
    value: function ease(easing) {
      return new Animator(this.duration, this.update, easing);
    }
  }]);
  return Animator;
}();

module.exports = Animator;