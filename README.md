# react-flip-reveal

> A progressively revealing text display for animating in dynamic text

[![NPM](https://img.shields.io/npm/v/react-flip-reveal.svg)](https://www.npmjs.com/package/react-flip-reveal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![](FlipReveal.gif)

## Install

```bash
npm install --save react-flip-reveal
```

## Demo

```bash
git clone git@github.com:BirdTho/react-flip-reveal.git
cd react-flip-reveal
npm install
npm run storybook
```

## Usage

```tsx
import React from 'react'

import FlipReveal from 'react-flip-reveal'

class Example extends Component {
  render() {
    return <FlipReveal value={'I\'ve got a lovely bunch of coconuts'} delimiter=' ' className='custom-flip-reveal' delay={500}/>
  }
}
```

### Custom styling

`FlipReveal` accepts 5 main arguments:

```Typescript
interface FlipRevealProps {
  value: string // The string to be rendered
  delimiter?: string // Optional, defaults to '' (empty string), the character used to break apart the string
  delay?: number // Optional, defaults to 500 (milliseconds), the delay between revealing words
  resetOnChange?: boolean // Optional, defaults to true, if appending to the value property will continue revealing from where it was left off, or reset the whole display "Append mode"
  className?: string // Optional, custom classname for styling the FlipReveal element
}
```


You can pass in custom class name to the FlipReveal using the optional `className` parameter. You'll most likely adjust the font, I'd guess.

```css
.custom-flip-reveal.flip-container {
  font-size: 40px;
}

.custom-flip-reveal.flip-container > div {
  display: inline-block;
}

.custom-flip-reveal .flip-word {
  transform-style: preserve-3d;
  transform-origin: 0 50%;
  transform: perspective(300px);
}

.custom-flip-reveal .flip-word.hidden {
  transform: perspective(300px) rotateY(90deg);
}

.custom-flip-reveal .flip-word.reveal {
  transform: perspective(300px) rotateY(0deg);
}

```

## License

MIT © [BirdTho](https://github.com/BirdTho)
