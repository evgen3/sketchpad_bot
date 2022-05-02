import { OriginalTelegram } from '../Telegram/original'

export class InfoButton {
  readonly element = document.createElement('button')
  private readonly errorMessages: string[] = []

  constructor() {
    this.element.textContent = 'Инфо'
    this.element.addEventListener('click', this.clickHandler)

    window.addEventListener('error', this.errorHandler)
    window.addEventListener('unhandledrejection', this.errorHandler)
  }

  private readonly errorHandler = (
    event: ErrorEvent | PromiseRejectionEvent
  ) => {
    const message = 'reason' in event ? event.reason : event.error?.stack

    if (message) {
      this.errorMessages.unshift(message)
    }
  }

  private createDialog() {
    const dialogElement = document.createElement('div')
    const initDataElement = this.createInitData()
    const errorsElement = this.createErrors()
    const closeElement = this.createClose(dialogElement)

    dialogElement.classList.add('debug-dialog')
    dialogElement.append(closeElement)
    dialogElement.append(initDataElement)
    dialogElement.append(errorsElement)

    return dialogElement
  }

  private createClose(dialogElement: Element) {
    const element = document.createElement('button')

    element.textContent = 'Закрыть'
    element.addEventListener('click', () => dialogElement.remove())

    return element
  }

  private createInitData() {
    const element = document.createElement('pre')

    element.textContent = JSON.stringify(
      OriginalTelegram.WebApp.initDataUnsafe,
      undefined,
      2
    )

    return element
  }

  private createErrors() {
    const element = document.createElement('pre')

    element.textContent = this.errorMessages.join('\n\n')

    return element
  }

  private readonly clickHandler = () => {
    document.body.append(this.createDialog())
  }
}
