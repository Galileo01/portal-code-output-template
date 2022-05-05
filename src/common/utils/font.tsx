import { FontList } from '@/typings/database'

import { FONT_STYLE_NODE_ID } from '@/common/constant'

import { updateStyleNodeInnerHTML } from './element'

export const createFontStyleNode = (fontList: FontList) => {
  const innerHTML = fontList.reduce((pre, cur) => {
    const { name, src } = cur
    return `${pre}
    @font-face{
      font-family:"${name}";
      font-display:swap;
      src:url("${src}");
    }`
  }, '')
  updateStyleNodeInnerHTML(FONT_STYLE_NODE_ID, innerHTML)
}

export default createFontStyleNode
