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
