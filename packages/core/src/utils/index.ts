// https://github.com/pmndrs/use-gesture/blob/d6aa637ec4da7131319f90ac3c347422a2cfcf9b/packages/core/src/config/support.ts
export * from './helpers'
export function toDomEventType () {

}

const isBrowser = typeof window !== 'undefined' && window.document && window.document.createElement
