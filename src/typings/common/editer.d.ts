import { ResourceComponent } from './resosurce-component'
import { GlobalConfig, StyleConfig } from './editer-config-data'

export type ComponentDataItem = {
  id: string // 组件唯一id  拖拽时 动态生成
  resourceComponent: ResourceComponent
}

export type ComponentDataList = ComponentDataItem[]

export type PageConfig = {
  // 页面(资源)标题
  title: string
  // 全局配置
  globalConfig?: GlobalConfig
  // 组件列表
  componentDataList: ComponentDataList
  // 样式配置
  styleConfig: StyleConfig
}

export type EditerData = {
  // 快照列表 最大程度为 5
  snapshotList: ComponentDataList[]
  // 当前快照 所在的位置
  currentSnapshotIndex: number
  // 当前组件列表
  componentDataList: ComponentDataList
  // 当前 previewer 内点击的元素
  currentClickElement?: HTMLElement
  // 全局配置
  globalConfig?: GlobalConfig
  // 样式配置
  styleConfig: StyleConfig
}
