declare module 'vuex' {
  import Vue from 'vue'
  
  // 声明Vuex模块
  export class Store<S> {
    constructor(options: StoreOptions<S>)
    state: S
    getters: any
    commit(type: string, payload?: any): void
    dispatch(type: string, payload?: any): Promise<any>
  }

  export interface StoreOptions<S> {
    state?: S
    getters?: Record<string, any>
    mutations?: Record<string, any>
    actions?: Record<string, any>
    modules?: Record<string, any>
  }

  // 声明Vue的扩展
  export function install(Vue: any): void
}