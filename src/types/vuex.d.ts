import Vue from 'vue'
import { Store } from 'vuex'

// 声明vuex模块的类型
declare module 'vuex' {
  export * from 'vuex'
}

// 声明Vue实例的类型扩展，包括router和store属性
declare module 'vue/types/vue' {
  interface Vue {
    $store: Store<any>
    $router: any
  }
}

// 声明Vue构造函数的类型扩展，允许在new Vue()时使用router和store选项
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    router?: any
    store?: Store<any>
  }
}