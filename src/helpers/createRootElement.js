export const createRootElement = rootId => {
  const rootElement = document.createElement('div')
  rootElement.id = rootId
  document.body.append(rootElement)
  return rootElement
}
