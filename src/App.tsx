import * as React from 'react'

import { Resource, FontList } from '@/typings/database'
import { PageConfig, ComponentDataList } from '@/typings/common/editer'
import { generateStyleNodeFromConfig } from '@/common/utils/style-config'
import { setColorVariableValue } from '@/common/utils/color-variable'
import { createFontStyleNode } from '@/common/utils/font'
import { safeJsonParse } from '@/common/utils'

import RCListRenderer from './components/rclist-renderer'

import './App.css'

import resourceDataJson from './resource-data.json' // 将配置文件 作为字符串引入。
import fontListJson from './used-font-list.json'

const App = () => {
  const [componentDataList, setList] = React.useState<ComponentDataList>([])

  React.useEffect(() => {
    const resourceData = resourceDataJson as unknown as Resource
    const pageConfig = safeJsonParse<PageConfig>(resourceData?.config || '')

    const fontList = fontListJson as FontList

    console.log('configStr', 'config', resourceData, pageConfig, fontList)

    //
    if (pageConfig?.componentDataList) {
      setList(pageConfig?.componentDataList)
    }

    // 恢复 style node
    if (pageConfig?.styleConfig) {
      generateStyleNodeFromConfig(pageConfig.styleConfig)
    }

    // 恢复主题配置
    if (pageConfig?.globalConfig?.themeConfig) {
      setColorVariableValue(pageConfig.globalConfig?.themeConfig)
    }
    // 恢复 字体
    if (fontList) {
      createFontStyleNode(fontList)
    }
    // 设置网页 title
    if (resourceData?.title) {
      document.title = resourceData.title
    }
  }, [])

  return (
    <div>
      <RCListRenderer componentDataList={componentDataList} />
    </div>
  )
}

export default App
