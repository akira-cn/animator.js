# Animator

A small (1.6kb compressed and 1.1kb gziped!) high-performance animation library. 

Provide promise-based API.

## Installation

In a browser:

```html
<script src="https://s4.ssl.qhres.com/!2fb39e02/animator-0.1.0.min.js"></script>

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
