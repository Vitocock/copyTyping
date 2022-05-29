const keyTemplate = (key) => {
    const div = document.createElement('div')
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
const getPokemon = async (id) => {
    let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    pokemon = await pokemon.text()
    pokemon = JSON.parse(pokemon)
    return pokemon
}
const getImg = (pokemon) => {
    return pokemon.sprites.other['official-artwork']['front_default']
}
const displayPokemon = (pokemon) => {
    const img = getImg(pokemon)
    const imgElement = document.getElementById('pokemon-img')
    imgElement.setAttribute('src', img)
}

window.onload = async () => {
    const keyboard = document.getElementById('keyboard');
    const input = document.getElementById('input');
    const word = document.getElementById('word')

    let count = 1;
    let pokemon = await getPokemon(count)
    displayPokemon(pokemon)
    word.innerText = pokemon.name

    input.addEventListener('keypress', (event) => {
        const keyPressed = document.getElementById(event.key)
        keyPressed.classList.add('pressed')
        setTimeout(() => {keyPressed.classList.remove('pressed')}, 100)
    })

    input.addEventListener('keyup', async () => {
        if (word.innerText == input.value) {
            word.classList.add('win');
            
            count += 1
            pokemon = await getPokemon(count)
            word.innerText = pokemon.name
            displayPokemon(pokemon)
            input.value = ''
            
            setTimeout(() => {word.classList.remove('win')}, 1000)     
        }
    })

    genKeyboard()
}