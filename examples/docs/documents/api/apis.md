---
sidebar_position: 1
sidebar_label: MIDI
---

# Available midi apis

## React

use-midi exports several hooks and components that can handle different midi:

| Hook         | Description                                |
| ------------ | ------------------------------------------ |
| `useButton`  | Handles the button midi                    |
| `useSlider`  | Handles the slider midi                    |
| `useKnob`    | Handles the knob midi                      |
| `useNote`    | Handles the note midi                      |
| `useMidi`    | Handles multiple midi in the one hooks     |

### Usage

With the exception of `useMidi` whitch is a special hook, all other hook share the same API:

```js
const bind = useNote(state => {/*~~~*/}, config)
return <div {...bind(...args)}>
```

- `state` is an object containing all attributes of the midi.
- `config` is an object containing options for the midi
- `args` is a custom arguments you can pass to the bind function.

Components is a shorthand for passing hooks directly to children.

```js
return (
  <UseMidi note={state => {/*~~~*/}}>
    {bind => <div {...bind(...args)}/>}
  </UseNote>
)
```

## Vanilla javascript

use-midi exports several classes tha can handle different midi:

| Hook         | Description                                |
| ------------ | ------------------------------------------ |
| `Button`     | Handles the button midi                    |
| `Slider`     | Handles the slider midi                     |
| `Knob`       | Handles the knob midi                      |
| `Note`       | Handles the note midi                      |
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

```js
useNote(state => {}, {target: midiInput})
useNote(state => {}, {port: 'foo' || e => e.inputs?.keys()[0]})
useNote(state => { state.port = state.event.inputs?.keys()[0] })
```

### Handling multiple midis at once

`use-midi` also allows you to manage different midi at the same time:

```js
const bind = useMidi({
    button: state => {/*~~~*/},
    slider: state => {/*~~~*/},
    knob: state => {/*~~~*/},
    note: state => {/*~~~*/},
}, config)

return <div {...bind()}/>
```
