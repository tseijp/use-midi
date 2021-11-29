---
sidebar_position: 2
sidebar_label: MIDI config
---

# MIDI Config

React `UseMidi` offers different config to configure the MIDI.

## Shared Shared config

| Config       | Default     | Description                                |
| ------------ | ----------- | ------------------------------------------ |
| `enabled`    | `true`      | True when the Midi is active               |
| `sysex`      | `false`     | True when use the sysex option requesting MIDI access |
| `debug`      | `false`     | True when use debug mode                   |
| `target`     | `null`      | Raw Midi Event Object                      |
| `device`     | `'pointer'` | Select MIDI Device Key                     |
| `port`       | `'default'` | Select input and output port key           |
| `input`      | `'default'` | Select input port key                      |
| `output`     | `'default'` | Select output port key                     |
| `data`       | `null`      | Default number of delay time stamp when send.|
| `delay`      | `null`      | Default number of delay time stamp when send.|
| `command`    | `null`      | Default number of recieved Midi command code.|
| `channel`    | `null`      | Default number of recieved Midi channel number.|
| `note`       | `null`      | Default number of Midi note number if recieved.|
| `args`       | `null`      | Default arguments when you bind.             |

## MIDI config

| Config       | Default     | Description                                |
| ------------ | ----------- | ------------------------------------------ |
| `enable`     | `true`      | True when the Midi is active               |

## Structure of the config object

Depending on whether you suse midi hooks or if you use the `useMidi` hook,
you will need to structure the config object differently.

```js
useFade(state => {}, {...sharedConfig, ...fadeConfig})

useMidi({fade: state => {}}, {...sharedConfig, fade: fadeConfig})
```

[config]: https://github.com/tseijp/use-midi/blob/master/packages/core/src/types/config.ts

## Binding special config

You can override config using first argument of bind.

```js
const bind = useNote(() => {}, {channel: 0, note: 0})

return (
  <>
    It is written using shorthands.
    <button {...bind(() => 1)} />
    <button {...bind(() => [1])} />
    <button {...bind(() => [1, 1])} />
    It means the same.
    <button {...bind(() => ({note: 1}))} />
    <button {...bind(() => ({channel: 1}))} />
    <button {...bind(() => ({channel: 1, note: 1}))} />
  </>
)
```
