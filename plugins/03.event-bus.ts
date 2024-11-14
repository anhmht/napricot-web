import mitt, { Emitter } from 'mitt'

type Events = {
  [key: string]: any
}
export type EventBus = Emitter<Events>;
export default defineNuxtPlugin(() => {
  const emitter = mitt<Events>()

  return {
    provide: {
      eventBus: {
        on: emitter.on,
        emit: emitter.emit,
        off: emitter.off
      } as typeof emitter
    }
  }
})
