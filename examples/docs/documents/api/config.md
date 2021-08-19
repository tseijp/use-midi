---
sidebar_position: 2
sidebar_label: MIDI config
---

# MIDI config

React `UseMidi` offers different config to configure the MIDI.

## Structure of the config object

Depending on whether you use midi hooks or if you use the `useMidi` hook,
you will need to structure the config config object differently.

```js
useXXX(state => {}, {...genericConfig, ...faderConfig})

useMidi(state => {}, {...genericConfig, fader: faderConfig})
```

## Generic config

Config | Description
:- | :-
target |
window |

## MIDI config

Config | Description
:- | :-
enable |
from


## onChange Config

## onClick Config|
