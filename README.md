# @use-midi

@use-midi is a library that let you bind midi events to any component.

[![ version ](
    https://img.shields.io/npm/v/use-midi)](
    https://npmjs.com/package/use-midi)
[![ codecov ](
    https://codecov.io/gh/tseijp/use-midi/coverage.svg)](
    https://codecov.io/gh/tseijp/use-midi)
[![ Downloads ](
    https://img.shields.io/npm/dm/use-midi.svg)](
    https://npmjs.com/package/use-midi)
[![ jsDelivr ](
    https://badgen.net/jsdelivr/hits/npm/use-midi)](
    https://www.jsdelivr.com/package/npm/use-midi)
[![ minified size ](
    https://badgen.net/bundlephobia/minzip/use-midi)](
    https://bundlephobia.com/result?p=use-midi@latest)
[![ types includes ](
    https://badgen.net/npm/types/use-midi)](
    https://www.npmjs.com/package/use-midi)
[![ license ](
    https://badgen.net/npm/license/use-midi)](
    https://www.npmjs.com/package/use-midi)

### Installation
To install the entire `use-midi` lib:

```shell
#Yarn
yarn add use-midi

#NPM
npm i use-midi
```

### Getting started

```shell
git clone https://github.com/tseijp/use-midi
```

Run the development server:

```shell
cd use-midi
yarn init
yarn start
```

- open browser and visit [localhost:3000][host]
- Now you can go to our [demo][demo], and try its usage.


### Documentation and Examples

More info about the project can be found [here][docs].

Examples and tutorials can be found [here][exam]

[host]: http://localhost:3000
[demo]: https://tseijp.github.io/use-midi
[docs]: https://tseijp.github.io/use-midi/documents/intro.md
[exam]: https://tseijp.github.io/use-midi/documents/intro.md

<br/>
<hr/>
<br/>


### What does it look like?

<details>
  <summary>React javascript</summary>

```js
import { useNote } from 'use-midi'

function Example() {
   // Set the note hook
  const bind = useNote((state) => {/*~~*/})

  // Bind it to a component
  return <div {...bind()} />
}
```

</details>

<details>
<summary>Vanilla javascript</summary>

```js
// script.js
const target = document.getElementById('drag')
const noteMidi = new NoteMidi(target, (state) => {/*~~*/})

// when you want to remove the listener
noteMidi.destroy()
```

</details>

### Available hooks

use-midi exports several hooks that can handle different midi:

| Hook         | Description                                |
| ------------ | ------------------------------------------ |
| `useFade`    | Handles the fade midi                      |
| `useNote`    | Handles the note midi                      |
| `useTurn`    | Handles the turn midi                      |
| `useMidi`    | Handles multiple midi in the one hooks     |

#### [More on the full documentation website...](https://tseijp.github.io/use-midi/)
