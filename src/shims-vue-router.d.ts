declare module 'vue-router' {
  import Vue from 'vue'
  
  export class VueRouter {
    constructor(options?: RouterOptions)
    push(location: RawLocation): Promise<Route>
    replace(location: RawLocation): Promise<Route>
    go(n: number): void
    back(): void
    forward(): void
  }

  export interface RouterOptions {
    routes?: RouteConfig[]
    mode?: string
    base?: string
  }

  export interface RouteConfig {
    path: string
    name?: string
    component?: any
    components?: Record<string, any>
    redirect?: string | Location | Function
    children?: RouteConfig[]
  }

  export interface Route {
    path: string
    name?: string
    params: Record<string, string>
    query: Record<string, string>
  }

  export type RawLocation = string | Location

  export interface Location {
    name?: string
    path?: string
    params?: Record<string, string>
    query?: Record<string, string>
  }

  export function install(Vue: any): void
}

declare module 'vue/types/vue' {
  import VueRouter from 'vue-router'
  import { Route } from 'vue-router'
  
  interface Vue {
    $router: VueRouter
    $route: Route
  }
}

declare module 'vue/types/options' {
  import VueRouter from 'vue-router'
  
  interface ComponentOptions<V extends Vue> {
    router?: VueRouter
  }
}