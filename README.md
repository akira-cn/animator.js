# Animator

A small (1.6kb compressed and 1.1kb gziped!) high-performance animation library. 

Provide promise-based API.

## Installation

In a browser:

```html
<script src="https://s1.ssl.qhres.com/!bd39e7fb/animator-0.2.0.min.js"></script>
```

## API

### class Animator(duration, progress, easing)

Create an animation with `duration` millisecond.

```js
var a1 = new Animator(1000,  function(p){
  var tx = 100 * p;
  block.style.transform = 'translateX(' 
    + tx + 'px)';     
});

var a2 = new Animator(1000,  function(p){
  var ty = 100 * p;
  block.style.transform = 'translate(100px,' 
    + ty + 'px)';     
});

var a3 = new Animator(1000,  function(p){
  var tx = 100 * (1-p);
  block.style.transform = 'translate(' 
    + tx + 'px, 100px)';     
});

var a4 = new Animator(1000,  function(p){
  var ty = 100 * (1-p);
  block.style.transform = 'translateY('  
    + ty + 'px)';     
});


block.addEventListener('click', async function(){
  while(1){
    await a1.animate();
    await a2.animate();
    await a3.animate();
    await a4.animate();
  }
});
```

### animate()

Start the animation and return a promise.

### ease(easing)

Return a new animation with a new easing.

```js
var easeInOutBack = BezierEasing(0.68, -0.55, 0.265, 1.55);
//easeInOutBack

var a1 = new Animator(2000, function(ep,p){
  var x = 200 * ep;

  block.style.transform = 'translateX(' + x + 'px)';
}, easeInOutBack);

var a2 = a1.ease(p => easeInOutBack(1 - p)); //reverse a1

block.addEventListener('click', async function(){
  await a1.animate();
  await a2.animate();
});

```

### cancel()

Cancel the animation and reject the promise.

## Develop & Build

Download the codebase and run:

```bash
npm install
```

You can start a sever through:

```bash
npm start
```

Build and deploy the JS file:

```bash
npm run build
```

## License

MIT
