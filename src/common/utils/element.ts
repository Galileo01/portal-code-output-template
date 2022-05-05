import { ComponentDataList } from '@/typings/common/editer'

import {
  RESOURCE_COMPONENT_COMMON_CLASS,
  PREVIEWER_CLASS,
} from '@/common/constant'
import { devLogger, devTimer } from '@/common/utils'

// RC组件相关工具

// 判断  元素 是否是 和 源组件直接渲染的 (最外层 容器 的 class)
export const isRCRenderedElement = (element: HTMLElement) =>
  element.classList.contains(RESOURCE_COMPONENT_COMMON_CLASS)

export const isPreviewerElement = (element: HTMLElement) =>
  element.classList.contains(PREVIEWER_CLASS)

// 获取 元素 最近的 符合 RCRendered 的 父元素 /或者 它本身 就符合
export const getClosedRCRenderedElement = (element: HTMLElement) => {
  let ele = element
  let isRCRendered = isRCRenderedElement(ele)

  if (isRCRendered) {
    devLogger('getClosedRCRenderedElement', 'return directly')
    return ele
  }

  let isPreviewer = isPreviewerElement(ele)
  // 开发环境下  计时
  devTimer.time('getClosedRCRenderedElement')

  // 一直 向上查找 直到  找到  RCRendered  或者  遇到  previewer 容器
  while (!isRCRendered && !isPreviewer && ele.parentElement) {
    ele = ele.parentElement
    isRCRendered = isRCRenderedElement(ele)
    isPreviewer = isPreviewerElement(ele)
  }

  devTimer.timeEnd('getClosedRCRenderedElement')
  return isRCRendered ? ele : undefined
}

// 获取 RCRendered id
export const getIdFromElementOrParent = (element: HTMLElement) => {
  const ele = getClosedRCRenderedElement(element)
  return ele?.id
}

// 获取 previewer 子元素 父元素 对应 RCR 的 下标
export const getComponentDataIndexFromID: (
  componentDataList: ComponentDataList,
  id: string
) => number = (componentDataList, id) =>
  componentDataList.findIndex((component) => component.id === id)

// 获取 previewer 子元素 父元素 对应 RCR 的 下标
export const getComponentDataIndexFromElement: (
  componentDataList: ComponentDataList,
  element: HTMLElement
) => number = (componentDataList, element) => {
  const id = getIdFromElementOrParent(element)

  const index = id ? getComponentDataIndexFromID(componentDataList, id) : -1
  return index
}

const getIndexInParent = (element: HTMLElement) => {
  const tagName = element.tagName.toLowerCase()
  let index = 1
  let ele = element
  while (ele.previousElementSibling) {
    ele = ele.previousElementSibling as HTMLElement
    if (ele.tagName.toLowerCase() === tagName) {
      index += 1
    }
  }
  return index
}

// 获取 传入 元素 回溯到 RCRendered  的唯一 css 选择器
export const generateSelector = (element: HTMLElement) => {
  const index = getIndexInParent(element)
  let selector = ''
  let ele = element
  // 本身 是 previewer
  if (isPreviewerElement(element)) {
    return `.${PREVIEWER_CLASS}`
  }

  // 本身就是 RCRendered
  if (isRCRenderedElement(element)) {
    return `#${ele.id}`
  }

  // 顺着 DOM树 回溯 到RCRendered
  while (!isRCRenderedElement(ele) && ele.parentElement) {
    const { classList, id, localName } = ele
    // 拼接类名
    const className = [...classList].reduce(
      (preValue, curClass) => `${preValue}.${curClass}`,
      ''
    )
    selector =
      localName +
      (className ? `${className}` : '') +
      (id ? `#{${id}}` : '') +
      (selector ? `>${selector}` : '')
    ele = ele.parentElement
  }

  // 回溯到  RCRendered
  if (isRCRenderedElement(ele)) {
    selector = `#${ele.id}${selector ? `>${selector}` : ''}`
  }

  // 添加 :nth-of-type 保证唯一性
  selector += `:nth-of-type(${index})`
  return selector
}

// 根据 选择器 生成 唯一id，用户 style 节点的 id
export const generateUniqueNodeFromSelector = (selector: string) => {
  //  提取 选择器 中的单词(0-9 A-Z a-z _) 拼接为id
  const replaceReg = /[>:]/g
  const filterReg = /\w/

  const chars = selector.replace(replaceReg, '_').split('')
  const reg = filterReg
  return chars.filter((char) => reg.test(char)).join('')
}

export const updateStyleNodeInnerHTML = (
  styleNodeId: string,
  innerHTML: string
) => {
  let targetNode = document.querySelector(`style#${styleNodeId}`)
  const nodeTargetExisted = Boolean(targetNode)
  if (!nodeTargetExisted) {
    targetNode = document.createElement('style')
    targetNode.id = styleNodeId
    targetNode.setAttribute('type', 'text/css')
  }

  targetNode!.innerHTML = innerHTML

  if (!nodeTargetExisted) {
    document.head.appendChild(targetNode!)
  }
}

export const removeStyleNode = (styleNodeId: string) => {
  const styleNode = document.querySelector(`style#${styleNodeId}`)
  if (styleNode) {
    document.head.removeChild(styleNode)
  }
}

let previewerElement: HTMLElement | null = null

export const getPreviewerElement = () => {
  if (!previewerElement) {
    previewerElement = document.querySelector(`.${PREVIEWER_CLASS}`)
  }
  return previewerElement
}
