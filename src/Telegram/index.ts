import { TelegramType } from './types'
import { OriginalTelegram } from './original'
import { isBrowser } from '../env'
import { debugPanel } from '../DebugPanel'

const TelegramMock: TelegramType = {
  WebApp: {
    initData: '',
    initDataUnsafe: {},
    get MainButton() {
      return debugPanel.mainButton
    },
    close() {
      window.location.reload()
    },
    ready() {},
    get viewportHeight() {
      return OriginalTelegram.WebApp.viewportHeight
    },
    onEvent(eventType, eventHandler) {
      if (eventType === 'viewportChanged') {
        window.addEventListener('resize', eventHandler)
      }
    },
  },
}

const Telegram = isBrowser ? TelegramMock : OriginalTelegram

export { isBrowser, Telegram }
