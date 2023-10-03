// Arty Type handler
const artyTypeButtons = document.querySelectorAll('.artyType')
artyTypeButtons.forEach((artyType) => {
  artyType.addEventListener('click', () => {
    artyTypeButtons.forEach((artyTypeOff) => {
      artyTypeOff.classList.remove('on')
    })
    artyType.classList.add('on')
  })
})

// Range handler
const windSth = document.getElementById('windSth')
const windSthImg = document.querySelector('.windGif')
windSth.addEventListener('input', (event) => {
  const valor = event.target.value
  windSthImg.src = `./source/w${valor}.gif`
})

// Copy Button
const copyButton = document.querySelector('.copyImg')
copyButton.addEventListener('click', () => {
  const dist = document.getElementById('distFire').textContent
  const azm = document.getElementById('azmFire').textContent
  navigator.clipboard.writeText(dist + 'm ' + azm + '°')
})
