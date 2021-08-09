---
sidebar_position: 2
sidebar_label: Midi options
---

React `UseMIDI` offers different options to configure the MIDI.

## Structure of the config object

Depending on whether you use midi hooks or if you use the `useMIDI` hook,
you will need to structure the config option object differently.

```js
useXXX(state => {}, {...genericOptions, ...xxxOptions})

useMIDI(state => {}, {...genericOptions, xxx: xxxOptions})
```

## Generic options

Options | Description
:- | :-
target |
window |

## MIDI options

Options | Description
:- | :-
enables |
from |
