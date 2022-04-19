{
    const {WebApp} = window.Telegram
    const {MainButton} = WebApp
    const isDebug = !WebApp.initData

    class MyMainButton {
        constructor() {
            this.element = document.createElement('button')
            this.element.style.display = 'none'
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
            this.mainButton = new MyMainButton()
            this.debugPanel = new DebugPanel(this.mainButton)

            this.initLibrary();
            WebApp.ready();
            setTimeout(this.initButton.bind(this), 2000)
        }

        initLibrary() {
            const element = document.getElementById('sketchpad');

            this.sketchpad = new Sketchpad(element, {
                line: {
                    color: 'black',
                    size: 5
                }
            });
        }

        initButton() {
            this.mainButton.onClick(this.submitHandler.bind(this));
            this.mainButton.setText('Готово');
            this.mainButton.show();
        }

        submitHandler() {
            this.mainButton.showProgress()

            this.sketchpad.canvas.toBlob(async (blob) => {
                const formData = new FormData()

                formData.append('initData', WebApp.initData);
                formData.append('photo_url', blob);
        
                await fetch('https://dev2.woobla.su/', {
                    method: 'POST',
                    body: formData
                })
        
                WebApp.close()
            }, 'image/jpg')
        }
    }

    new MySketchpad()
}