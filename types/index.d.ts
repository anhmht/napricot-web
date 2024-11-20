

import Vue from 'vue'
import { ComponentCustomProperties } from 'vue'
import type { EventBus } from '~/plugins/03.event-bus';

interface PluginsInjections {
  $eventBus: EventBus

  // Composables
  formatDate: typeof import('~/composables/format').formatDate
  fromNow: typeof import('~/composables/format').fromNow

  // router
  navigateTo: (path: string) => (to: RouteLocationRaw | undefined | null, options?: NavigateToOptions) => Promise<void | NavigationFailure | false> | false | void | RouteLocationRaw;
}

declare module '#app' {
  interface NuxtApp extends PluginsInjections { }
}

declare module 'nuxt/dist/app/nuxt' {
  interface NuxtApp extends PluginsInjections { }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends PluginsInjections { }
}

declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue extends PluginsInjections { }
}


export { }
