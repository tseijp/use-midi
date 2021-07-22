---
sidebar_position: 1
sidebar_label: Midi
---

### React

hook | Description
:- | :-
useXXX | Handles the xxx midi
useMidi | Handles multiple midi in the one hooks

### Usage

With the exception of `useMidi` whitch is a special hook, all other hook share the same API:

```js
const midi = useMidi(state => {/*~~~*/}, config)
return <div {...midi(...args)}>
```

- `state`
- `config`
- `args`
