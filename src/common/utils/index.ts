/* eslint-disable no-console */
export const calculateIsDevFromQuery = () => {
  const searchParams = new URLSearchParams(window.location.search)
  return (
    Boolean(searchParams.get('is_dev')) ||
    Boolean(searchParams.get('is_preview'))
  )
}

export const IS_DEV =
  process.env.NODE_ENV === 'development' || calculateIsDevFromQuery()

export const IS_ROUTE_EDITER = false

export const devLogger = (...args: unknown[]) => {
  if (IS_DEV) {
    console.log('[devLogger]', ...args)
  }
}

export const compose =
  <T = any>(...funs: Function[]) =>
  (...args: any[]) =>
    funs.reduceRight(
      (preValue, curFun) =>
        // preVal 遍历过程中 可能为单个值 或 值的数组；而concat 同时 接收数组 和 参数列表(逗号分隔)
        // eslint-disable-next-line prefer-spread
        curFun.apply(null, [].concat(preValue as any | any[])),
      args
    ) as unknown as T
