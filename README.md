# Sane
An animation generating library in typescript

# Example
```js
import { Scene, Text, Renderer2D, Rectangle } from "sane";

class ExampleScene extends Scene {
  constructor() {
    super();
    this.text1 = new Text("Hello, World!");
    this.text1.position = { x: 600, y: 600 };
    this.text1.font.size = 58;
    this.text1.color = "#f00";

    this.rec = new Rectangle();
    this.rec.size = { width: 100, height: 100 };
    this.rec.position = { x: 400, y: 400 };
    this.rec.color = "#00f";

    this.background = "#fff";
  }

  update(frame) {
    // move the text in a circle
    this.text1.position.x = 600 + Math.sin(frame * 0.1) * 100;
    this.text1.position.y = 600 + Math.cos(frame * 0.1) * 100;

    // move the rectangle in a circle
    this.rec.position.x = 400 + Math.sin(frame * 0.05) * 100;
    this.rec.position.y = 400 + Math.cos(frame * 0.05) * 100;

    // change the color of the rectangle with a sine
    this.rec.color = `hsl(${frame % 360}, 100%, 50%)`;
  }
}

const renderer = new Renderer2D({
  width: 1920,
  height: 1080,
  durationS: 10,
  fps: 60,
  name: "test",
  cleanup: false,
});
renderer.scene = new ExampleScene();
renderer.render();
renderer.save();
```
## Result
![](https://i.imgur.com/hkS4cEb.gif)

# Building & Running

## Watching
```
npm run watch
```

## Compiling
```
npm run build
```

## Using in a project
```
npm link <path/to/sane>
```
