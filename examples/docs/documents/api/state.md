---
sidebar_position: 3
sidebar_label: Midi State
---

# MIDI state

Every time a handler is called, it will get passed a midi state
that includes the source event and adds multiple attributes.

## MIDI state attributes

With the exception of xy and vxvy, all attributes bellow are common to all accesses.

```js
const bind = useXXX(state => {
    const {
        xy
    } = state
})
```

### xxx state attributes

The xxx gesture state adds a few attributes whih can help you understand the user intent.
```js
const bind = useXXX(state = {
    const {

    } = state
})
```
