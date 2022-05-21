import {
  COLOR_VARIABLES,
  KEY_OF_COLOR_VARIABLES,
} from '@/common/constant/color-variable'
import { ColorVarValue } from '@/typings/common/editer-config-data'

export const setColorVariableValue = (varValue: ColorVarValue) => {
  const targetElement = document.body
  KEY_OF_COLOR_VARIABLES.forEach((key) => {
    const { varKey } = COLOR_VARIABLES[key]
    const value = varValue[key]
    targetElement.style.setProperty(varKey, value)
  })
}

export default setColorVariableValue
