import * as React from 'react'

import { PageConfig, ComponentDataList } from '@/typings/common/editer'
import { generateStyleNodeFromConfig } from '@/common/utils/style-config'
import { setColorVariableValue } from '@/common/utils/color-variable'
import { updateFontConfigToDOM } from '@/common/utils/font'

import RCListRenderer from './components/rclist-renderer'

import './App.css'

import configDataJson from './config-data.json' // 将配置文件 作为字符串引入。

const App = () => {
  const [componentDataList, setList] = React.useState<ComponentDataList>([])

  React.useEffect(() => {
    // @ts-ignore
    const pageConfig = configDataJson as PageConfig

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
    if (pageConfig?.globalConfig?.fontConfig) {
      const { fontConfig } = pageConfig?.globalConfig || {}
      // TODO: 配合 font 存储进行 优化
      updateFontConfigToDOM(fontConfig?.globalFont, fontConfig?.usedFont || [])
    }
    // 设置网页 title
    if (pageConfig.title) {
      document.title = pageConfig.title
    }
  }, [])

  return (
    <div>
      <RCListRenderer componentDataList={componentDataList} />
    </div>
  )
}

export default App
