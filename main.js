const keyTemplate = (key) => {
    const div = document.createElement('button')
    div.classList.add('key') 
    div.setAttribute('id', key)
    div.innerText = key
    return div
}
const createKeyboardRow = () => {
    return document.createElement('div')
}
const createSpaceBar = () => {
    const div = document.createElement('button')
    div.classList.add('key')
    div.classList.add('spacebar') 
    div.setAttribute('id', ' ')
    div.innerText = ''
    return div
}
const genKeyboard = () => {
    keys = 'qwertyuiopasdfghjklzxcvbnm'.split('')
    const fragment = document.createDocumentFragment()
    let keyboardRow = createKeyboardRow()

    for (let key of keys) {
        const keyElement = keyTemplate(key)
        keyboardRow.appendChild(keyElement)

        if (['p', 'l', 'm'].includes(key)) { 
            fragment.appendChild(keyboardRow)
            keyboardRow = createKeyboardRow()
        }
    }
    fragment.appendChild(createSpaceBar(    ))
    keyboard.appendChild(fragment)
}
const displayRetry = () => {
    const a = document.createElement('a')
    a.innerText = 'Volver a Jugar'
    a.classList.add('word')
    a.classList.add('retry')
    a.setAttribute('href', '')

    const body = document.getElementsByTagName('body')[0]
    body.appendChild(a)
}

window.onload = () => {
    const keyboard = document.getElementById('keyboard');
    const input = document.getElementById('input');
    const word = document.getElementById('word')

    let count = 0;
    const wordList = ['hola', 'palabra', 'paralelepipedo', 'archipielago', ]

    word.innerText = wordList[count]

    input.addEventListener('keypress', (event) => {
        const keyPressed = document.getElementById(event.key)
        keyPressed.classList.add('pressed')
        setTimeout(() => {keyPressed.classList.remove('pressed')}, 100)
    })

    input.addEventListener('keyup', (event) => {
        if (wordList[count] == input.value) {
            count += 1
            if (wordList[count]) {
                word.classList.add('win');
                setTimeout(() => {word.classList.remove('win')}, 1000)
                word.innerText = wordList[count]
            
            } else {
                word.innerText = "Ganaste!!!"
                word.classList.add('win')
                displayRetry()
            }
            input.value = ''
        }
    })

    genKeyboard()
}