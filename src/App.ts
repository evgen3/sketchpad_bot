import { mySketchpad } from './MySketchpad'
import { Telegram } from './Telegram'

const { WebApp } = Telegram
const { MainButton } = WebApp

class App {
  constructor() {
    WebApp.ready()
    this.setupButton()
  }

  private setupButton() {
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        MainButton.setText('Готово')
        MainButton.onClick(this.submitHandler)
        MainButton.show()
        resolve()
      }, 3000)
    )
  }

  private readonly submitHandler = async () => {
    MainButton.showProgress()

    const blob = await mySketchpad.toBlob()
    const formData = new FormData()

    if (!blob) {
      return
    }

    formData.append('initData', WebApp.initData)
    formData.append('photo_url', blob)

    await fetch('https://dev2.woobla.su/', {
      method: 'POST',
      body: formData,
    })

    WebApp.close()
  }
}

new App()
