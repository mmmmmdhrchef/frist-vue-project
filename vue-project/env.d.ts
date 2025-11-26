/// <reference types="vite/client" />
// 1.添加Vue模块类型声明
// 适合 Vue 3 的声明 [6](@ref)
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.js' {
  const content: any;
  export default content;
}