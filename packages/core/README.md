# use midi

[![ version ](
    https://img.shields.io/npm/v/use-midi)](
    https://npmjs.com/package/use-midi)
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

```shell
npm install use-midi
```

### Quick started

```shell
git clone https://github.com/tseijp/use-midi
cd use-midi
cd examples
yarn i
yarn start
```

- open browser and visit [localhost:3000](http://localhost:3000)
- Now you can go to our [demo](http://tsei.jp/rmix), and try its usage.


### Documentation and Examples

More info about the project can be found [here](https://tsei.jp/rmix/docs/intro.md).

Examples and tutorials can be found [here](https://tsei.jp/rmix/examples/intro.md).

<br/>
<hr/>
</br/>


### What does it look like?

```js
import React from 'react'
import { useMidi } from 'use-midi'

export function App () {
  const ref = React.useRef()

  const bind = useMidi(() => {/*~~~*/})

  return (
    <button {...bind()}/>
  )
}
```
