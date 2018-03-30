function nowtime() {
  /* eslint-disable no-undef */
  if(typeof performance !== 'undefined' && performance.now) {
    return performance.now()
  }
  /* eslint-enable no-undef */
  return Date.now ? Date.now() : (new Date()).getTime()
}

if(typeof global.requestAnimationFrame === 'undefined') {
  global.requestAnimationFrame = function (callback) {
    return setTimeout(function () { // polyfill
      callback.call(this, nowtime())
    }, 1000 / 60)
  }
  global.cancelAnimationFrame = function (qId) {
    return clearTimeout(qId)
  }
}

const {requestAnimationFrame, cancelAnimationFrame} = require('fast-animation-frame')

class Animator {
  constructor(duration, update, easing) {
    this.duration = duration
    this.update = update
    this.easing = easing
  }
  animate(startTime) {
    startTime = startTime || 0

    const duration = this.duration,
      update = this.update,
      easing = this.easing,
      self = this

    return new Promise(((resolve, reject) => {
      let qId = 0
      function step(timestamp) {
        startTime = startTime || timestamp
        const p = Math.min(1.0, (timestamp - startTime) / duration)

        update.call(self, easing ? easing(p) : p, p)

        if(p < 1.0) {
          qId = requestAnimationFrame(step)
        } else {
          resolve(startTime + duration)
        }
      }

      self.cancel = function () {
        cancelAnimationFrame(qId)
        update.call(self, 0, 0)
        resolve(startTime + duration)
      }
      qId = requestAnimationFrame(step)
    }))
  }
  ease(easing) {
    return new Animator(this.duration, this.update, easing)
  }
}

module.exports = Animator
