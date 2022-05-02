import { MainButtonType } from '../Telegram/types'

export class MainButton implements MainButtonType {
  readonly element = document.createElement('button')

  constructor() {
    this.element.style.display = 'none'
  }

  showProgress() {
    this.element.disabled = true
    this.element.textContent = 'Отправка...'
  }

  setText(text: string) {
    this.element.textContent = text
  }

  show() {
    this.element.style.display = 'inline-block'
  }

  onClick(callback: () => void) {
    this.element.addEventListener('click', callback)
  }
}
