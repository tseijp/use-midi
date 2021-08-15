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
</br/>


### What does it look like?

```js
import React from 'react'
import { useMidi } from 'use-midi'

export function App () {
  const bind = useMidi(() => {
      click: state => {/*~*/}
  })

  return (
    <button {...bind()}/>
  )
}
```
