import * as React from 'react'

import { PageConfig, ComponentDataList } from '@/typings/common/editer'
import { generateStyleNodeFromConfig } from '@/common/utils/style-config'
import { setColorVariableValue } from '@/common/utils/color-variable'
import { updateFontConfigToDOM } from '@/common/utils/font'
import { generateElementFromMetaInfo } from '@/common/utils/meta-config'

import RCListRenderer from './components/rclist-renderer'

import './App.css'

import configDataJson from './config-data.json' // 将配置文件 作为字符串引入。

const App = () => {
  const [componentDataList, setList] = React.useState<ComponentDataList>([])

  React.useEffect(() => {
    // @ts-ignore
    const pageConfig = configDataJson as PageConfig

    const {
      styleConfig,
      globalConfig,
      componentDataList: listInFetch,
    } = pageConfig

    if (listInFetch) {
      setList(listInFetch)
    }

    // 恢复 style node
    if (styleConfig) {
      generateStyleNodeFromConfig(styleConfig)
    }

    // 恢复主题配置
    if (globalConfig?.themeConfig) {
      setColorVariableValue(globalConfig?.themeConfig)
    }
    // 恢复 字体
    if (globalConfig?.fontConfig) {
      const { fontConfig } = globalConfig || {}
      updateFontConfigToDOM(fontConfig?.globalFont, fontConfig?.usedFont || [])
    }

    // 恢复元信息
    if (globalConfig?.metaConfig) {
      generateElementFromMetaInfo(globalConfig?.metaConfig)
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
