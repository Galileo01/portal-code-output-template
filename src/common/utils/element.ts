// RC组件相关工具
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

export default updateStyleNodeInnerHTML
