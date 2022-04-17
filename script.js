{
    const {WebApp} = window.Telegram
    const {MainButton} = WebApp
    const isInTelegram = !WebApp.initData

    class MySketchpad {
        constructor() {
            this.initLibrary();
            this.initButton();
            WebApp.ready()
        }

        initLibrary() {
            const element = document.getElementById('sketchpad');

            this.sketchpad = new Sketchpad(element, {
                line: {
                    color: 'black',
                    size: 5
                }
            });

            this.sketchpad.canvas.addEventListener('touchend', this.drawEndHandler.bind(this))
            this.sketchpad.canvas.addEventListener('mouseup', this.drawEndHandler.bind(this))
        }

        initButton() {
            MainButton.onClick(this.submitHandler.bind(this));
            document.getElementById('submit').addEventListener('click', this.submitHandler.bind(this));

            MainButton.setText('Готово');
        }

        drawEndHandler() {
            Telegram.WebApp.MainButton.show();
        }

        submitHandler() {
            MainButton.showProgress()

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