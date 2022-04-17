(async () => {
    const response = await fetch('https://dev2.woobla.su/')
    const output = document.getElementById('output')

    output.innerText = JSON.stringify({response, text: await response.text()})
})()
