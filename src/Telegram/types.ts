type WebAppUser = {
  username?: string
}

type WebAppInitData = {
  user?: WebAppUser
}

export type MainButtonType = {
  showProgress(): void
  setText(text: string): void
  show(): void
  onClick(callback: () => void): void
}

type EventType = 'viewportChanged'

type WebApp = {
  initData: string
  initDataUnsafe: WebAppInitData
  MainButton: MainButtonType
  close(): void
  ready(): void
  viewportHeight: number
  onEvent(eventType: EventType, eventHandler: () => void): void
}

export type TelegramType = {
  WebApp: WebApp
}

declare global {
  var Telegram: TelegramType
}
