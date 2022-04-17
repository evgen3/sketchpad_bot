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
