---
sidebar_position: 2
sidebar_label: MIDI config
---

# MIDI Config

React `UseMidi` offers different config to configure the MIDI.

## Shared Shared config

| Config       | Description                                |
| ------------ | ------------------------------------------ |
| `enabled`    | True when the Midi is active               |
| `sysex`      | True when use the sysex option requesting MIDI access |
| `debug`      | True when use debug mode                   |
| `target`     | Raw Midi Event Object                      |
| `device`     | Select MIDI Device Key                     |

## MIDI config

| Config       | Description                                |
| ------------ | ------------------------------------------ |
| `enable`     | True when the Midi is active               |

## Structure of the config object

Depending on whether you suse midi hooks or if you use the `useMidi` hook,
you will need to structure the config object differently.

```js
useFade(state => {}, {...sharedConfig, ...fadeConfig})

useMidi({fade: state => {}}, {...sharedConfig, fade: fadeConfig})
```

[config]: https://github.com/tseijp/use-midi/blob/master/packages/core/src/types/config.ts
