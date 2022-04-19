{
    const {WebApp} = window.Telegram
    const {MainButton} = WebApp
    const isDebug = !WebApp.initData

    class MyMainButton {
        constructor() {
            this.element = document.createElement('button')
            this.element.style.display = 'none'
            this.setText('Готово')
        }

        onClick(callback) {
            this.element.addEventListener('click', callback);
            MainButton.onClick(callback);
        }

        setText(text) {
            this.element.innerText = text;
            MainButton.setText(text);
        }

        show() {
            this.element.style.display = 'inline-block'
            MainButton.show();
        }

        showProgress() {
            this.element.innerText += ' (загрузка)'
            this.element.disabled = true
            MainButton.showProgress()
        }
    }

    class DebugPanel {
        constructor(mainButton) {
            this.mainButton = mainButton
            this.init()

            if (isDebug) {
                this.mount()
            }
        }

        init() {
            this.element = document.createElement('div')
            this.element.classList.add('debug-panel')
            this.element.append(this.mainButton.element)
        }
        
        mount() {
            document.body.append(this.element)
        }
    }

    class MySketchpad {
        constructor() {
            this.init()
        }

        init() {
            const element = document.getElementById('sketchpad');
        
            this.original = new Sketchpad(element, {
                line: {
                    color: 'black',
                    size: 5
                }
            })
        }

        toBlob() {
            return new Promise((resolve) => {
                this.original.canvas.toBlob(resolve, 'image/jpeg')
            })
        }
    }

    class MyWebApp {
        constructor() {
            this.original = WebApp
        }

        close() {
            if (isDebug) {
                window.location.reload()
                return
            }

            WebApp.close()
        }

        onResize(callback) {
            if (isDebug) {
                window.addEventListener('resize', () => callback(document.documentElement.clientHeight))
                return
            }

            this.webApp.original.onEvent('viewportChanged', () => callback(this.original.viewportHeight))
        }
    }

    class App {
        constructor() {
            this.initButton()
            this.debugPanel = new DebugPanel(this.mainButton)
            this.sketchpad = new MySketchpad()
            this.initWebApp()

            this.webApp.original.ready();
            this.webApp.original.expand();
            setTimeout(() => this.mainButton.show(), 2000)
        }

        initButton() {
            this.mainButton = new MyMainButton()
            this.mainButton.onClick(this.submitHandler.bind(this));
        }

        initWebApp() {
            this.webApp = new MyWebApp()
            this.resizeHandler()
            this.webApp.onResize(this.resizeHandler.bind(this))
        }

        resizeHandler(height = document.documentElement.clientHeight) {
            this.sketchpad.original.setCanvasSize(document.documentElement.clientWidth, height)
            this.sketchpad.original.redraw()
        }

        async submitHandler() {
            this.mainButton.showProgress()

            const blob = await this.sketchpad.toBlob()
            const formData = new FormData()

            formData.append('initData', this.webApp.original.initData);
            formData.append('photo_url', blob);
    
            await fetch('https://dev2.woobla.su/', {
                method: 'POST',
                body: formData
            })
    
            this.webApp.close()
        }
    }

    new App()
}