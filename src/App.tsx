import * as React from 'react'

import { Resource } from '@/typings/database/resource'
import { PageConfig } from '@/typings/common/editer'

import RCListRenderer from './components/rclist-renderer'

import './App.css'

import configStr from './resource-data.txt?raw' // 将配置文件 作为字符串引入。

const App = () => {
  React.useEffect(() => {
    const resourceData = JSON.parse(configStr) as Resource
    const pageConfig = JSON.parse(resourceData.config) as PageConfig

    console.log('configStr', configStr, 'config', resourceData, pageConfig)
  }, [])

  return <div>App</div>
}

export default App
