import { OriginalTelegram } from './Telegram/original'

const { WebApp } = OriginalTelegram
const developers = ['zhenkuzne', 'psfdek']
const username = WebApp.initDataUnsafe.user?.username ?? ''

export const isBrowser = !WebApp.initData
export const isDebug = isBrowser || developers.includes(username)
