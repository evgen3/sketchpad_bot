import Sketchpad from 'responsive-sketchpad'
import { Telegram } from './Telegram'

const { WebApp } = Telegram

class MySketchpad {
  private readonly sketchpad: Sketchpad

  constructor() {
    const element = document.getElementById('sketchpad')!

    this.sketchpad = new Sketchpad(element, {
      line: {
        color: 'black',
        size: 5,
      },
      backgroundColor: 'aliceblue',
    })

    this.updateSize()
    WebApp.onEvent('viewportChanged', this.updateSize)
  }

  private readonly updateSize = () => {
    this.sketchpad.setCanvasSize(
      document.body.clientWidth,
      WebApp.viewportHeight
    )

    this.sketchpad['redraw']()
  }

  toBlob() {
    return new Promise<Blob | null>((resolve) => {
      this.sketchpad.canvas.toBlob(resolve, 'image/jpg')
    })
  }
}

export const mySketchpad = new MySketchpad()
