import { isDebug, isBrowser } from '../env'
import { MainButton } from './MainButton'
import { InfoButton } from './InfoButton'

class DebugPanel {
  readonly mainButton = new MainButton()
  private readonly infoButton = new InfoButton()

  constructor() {
    const element = document.getElementById('debug')!

    if (isBrowser) {
      element.append(this.mainButton.element)
    }

    if (isDebug) {
      element.append(this.infoButton.element)
    }
  }
}

export const debugPanel = new DebugPanel()
