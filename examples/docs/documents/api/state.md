---
sidebar_position: 3
sidebar_label: Midi state
---

# MIDI state

Every time a handler is called, it will get passed a midi state
that includes the source event and adds multiple attributes.


## MIDI Shared State

| State        | Description                                |
| ------------ | ------------------------------------------ |
| `target`     | True when the Midi is active               |
| `allowed`    | True when user gave permission to access MIDI devices |
| `requested`  | True when user grant permission to access MIDI devices |
| `supported`  | True when Web MIDI API is supported by the browser |

## MIDI Generic State

| State        | Description                                |
| ------------ | ------------------------------------------ |
| `event`      | Raw Midi Event Object                      |
| `target`     | Raw Event Target Object                    |
| `type`       | Raw Midi Event type                        |
| `active`     | True when the Midi is active               |
| `blocked`    | True when theM idi is blocked              |
| `enabled`    | True when the Midi is enabled              |
| `first`      | True when its the first event              |
| `last`       | True when its the last event               |
| `startTime`  | The start time of the current event        |
| `deltaTime`  | The delta between current and previous event|
| `timeStamp`  | The timestamp of the current event         |
| `elapsedTime`| Elapsed tie of the current Midi            |
| `init`       | Raw values when the Midi started           |
| `data`       | Current raw values of the Midi             |
| `prev`       | Previous raw values of the Midi            |
| `delta`      | Between current raw Midi values and previous values |
| `sign`       | Direction of the delta values              |
| `command`    | The number of recieved Midi command code   |
| `channel`    | The number of recieved Midi channel number |
| `note`       | The number of Midi note number if recieved |
| `value`      | The number of Midi velocity number if recieved |
| `args`       | The arguments when you bind                |

## MIDI state attributes

With the exception of xy and vxvy, all attributes bellow are common to all accesses.

```js
const bind = useNote(state => {
    const {
        data
    } = state
})
```

### Note state attributes

The note midi state adds a few attributes whih can help you understand the user intent.
```js
const bind = useXXX(state => {})
```
