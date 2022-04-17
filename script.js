(async () => {
    const output = document.getElementById('output')
    const submit = document.getElementById('submit')
    const responseElement = document.getElementById('response')

    output.value = window.Telegram.WebApp.initDataUnsafe.query_id

    submit.addEventListener('click', async () => {
        const response = await fetch('https://dev2.woobla.su/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                initData: window.Telegram.WebApp.initData,
                result: {
                    type: 'photo',
                    photo_url: 'https://dev2.woobla.su/1.jpg'
                }
            })
        })

        responseElement.innerText = await response.text()
    })
})()

{
    const {WebApp} = window.Telegram
    const {MainButton} = WebApp
    const sketchpadElement = document.getElementById('sketchpad')
    const sketchpad = new Sketchpad(sketchpadElement, {
        line: {
            color: 'black',
            size: 5
        }
    });

    MainButton.onClick(() => {
        MainButton.showProgress()

        sketchpad.canvas.toBlob(async (blob) => {
            const formData = new FormData()

            formData.append('initData', WebApp.initData);
            formData.append('photo_url', blob);
    
            await fetch('https://dev2.woobla.su/', {
                method: 'POST',
                body: formData
            })
    
            WebApp.close()
        }, 'image/jpg')
    })

    MainButton.setText('Готово')
    MainButton.show()
}