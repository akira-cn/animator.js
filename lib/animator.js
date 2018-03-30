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

const FrameManager = {
  steps: new Set(),
  add(step) {
    const steps = this.steps,
          timerId = this.timerId;
    if (steps.has(step)) {
      return false;
    }
    steps.add(step);
    const that = this;
    if (timerId == null) {
      this.timerId = requestAnimationFrame(function step(t) {
        [...steps].forEach(step => {
          if (step(t)) {
            steps.delete(step);
          }
        });
        if (steps.size) {
          requestAnimationFrame(step);
        } else {
          that.timerId = null;
        }
      });
    }
  },
  remove(step) {
    const steps = this.steps;
    if (steps.has(step)) {
      steps.delete(step);
    }
  },
  timerId: null
};

class Animator {
  constructor(duration, update, easing) {
    this.duration = duration;
    this.update = update;
    this.easing = easing;
  }
  animate(startTime) {
    startTime = startTime || 0;

    const duration = this.duration,
          update = this.update,
          easing = this.easing,
          self = this;

    return new Promise((resolve, reject) => {
      function step(timestamp) {
        startTime = startTime || timestamp;
        const p = Math.min(1.0, (timestamp - startTime) / duration);

        update.call(self, easing ? easing(p) : p, p);

        if (p < 1.0) {
          return false;
        }

        resolve(startTime + duration);
        return true;
      }

      FrameManager.add(step);

      self.cancel = function () {
        FrameManager.remove(step);
        update.call(self, 0, 0);
        resolve(startTime + duration);
      };
    });
  }
  ease(easing) {
    return new Animator(this.duration, this.update, easing);
  }
}

module.exports = Animator;