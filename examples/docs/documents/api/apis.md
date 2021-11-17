---
sidebar_position: 1
sidebar_label: MIDI
---

# Available midi apis

## React

use-midi exports several hooks and components that can handle different midi:

| Hook         | Description                                |
| ------------ | ------------------------------------------ |
| `useFade`    | Handles the fade midi                      |
| `useNote`    | Handles the note midi                      |
| `useTurn`    | Handles the turn midi                      |
| `useMidi`    | Handles multiple midi in the one hooks     |

### Usage

With the exception of `useMidi` whitch is a special hook, all other hook share the same API:

```js
const bind = useNote(state => {/*~~~*/}, config)
return <div {...bind()}>
```

- `state` is an object containing all attributes of the midi.
- `config` is an object containing options for the midi
- `bind` is an function for creating event handling objects.

Components is a shorthand for passing hooks directly to children.

```js
return (
  <UseNote note={() => {}}>
    {bind => <div {...bind()}/>}
  </UseNote>
)
// or
return (
  <UseNote as="div" note={() => {}}/>
)
```

## Vanilla javascript

use-midi exports several classes tha can handle different midi:

| Hook         | Description                                |
| ------------ | ------------------------------------------ |
| `Fade`       | Handles the fade midi                      |
| `Note`       | Handles the note midi                      |
| `Turn`       | Handles the turn midi                      |
| `Midi`       | Handles multiple midi in the one hooks     |

### Usage

With the exception of midi which is a special hook, all other hooks share the same API:

```js
import {rma, Note} from 'use-midi'
const target = rma.inputs.values()[0]
const noteMidi = new Note(target, (state) => {/**/})
```

- `state` is an object containing all attributes of the midi.
- `config` is an object containing options for the midi

## Some notes

### About Selecting MIDI Device

From multiple connected midi devices, you need to specify the device.

```jsx
useNote(state => {}, {input: midiInput})
useNote(state => {}, {input: inputs => inputs[0]})
```

### Handling multiple midis at once


`use-midi` also allows you to manage different midi at the same time:

```jsx
const bind = useMidi({
    fade: state => {/*~~~*/},
    note: state => {/*~~~*/},
    turn: state => {/*~~~*/}
}, config)

return <div {...bind()}/>
```
