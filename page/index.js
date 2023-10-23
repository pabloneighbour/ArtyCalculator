const getOffset = (dist = 0, wind = 1) => {
  const offsetTable = {
    1: 0.07 * dist - 1,
    2: 0.13 * dist + 1,
    3: 0.2 * dist,
    4: 0.27 * dist + 1.5,
    5: 0.34 * dist + 0.5
  }
  return offsetTable[wind] || 0
}

const getVector = (dist, azm) => {
  return [(dist * Math.cos(azm * Math.PI / 180)), (dist * Math.sin(azm * Math.PI / 180))]
}

const getPolar = (v) => {
  const dist = Math.hypot(v[0], v[1])
  const azm = Math.atan2(v[1], v[0]) * 180 / Math.PI
  return [dist, (azm < 0 ? azm + 360 : azm)]
}

const getWindVector = (wind = 0, azm = 0, dist = 0) => {
  const sth = getOffset(dist, wind)
  const vWind = getVector(sth, azm)
  return vWind
}

const getFireVector = (gunPos, objPos, wind) => {
  return [objPos[0] - gunPos[0] - wind[0], objPos[1] - gunPos[1] - wind[1]]
}

const getDirectVectorMod = (gunPos, objPos) => {
  return Math.hypot(objPos[0] - gunPos[0], objPos[1] - gunPos[1])
}

const calCords = (gunPos, objPos, wind) => {
  const gunCords = getVector(gunPos[0], gunPos[1])
  const objCords = getVector(objPos[0], objPos[1])
  const windCords = getWindVector(wind[0], wind[1], getDirectVectorMod(gunCords, objCords))
  const fireVector = getPolar(getFireVector(gunCords, objCords, windCords))
  return fireVector
}

const inRange = () => {
  const distElement = document.getElementById('distFire')
  const azmElement = document.getElementById('azmFire')

  // Remove outRange class from both elements
  distElement.classList.remove('outRange')
  azmElement.classList.remove('outRange')

  // Get distance and gun type
  const dist = Number(distElement.innerText)
  const gunType = document.querySelector('.on')?.getAttribute('name') ?? ''

  // Check if distance is in range for gun type
  const range = {
    '120mm': [100, 250],
    '150mm': [200, 350],
    '300mm': [400, 1000],
    '120mm-gb': [50, 100],
    rkt: [225, 350]
  }

  if (!range[gunType] || !dist || dist < range[gunType][0] || dist > range[gunType][1]) {
    // Distance is out of range
    distElement.classList.add('outRange')
    azmElement.classList.add('outRange')
  }
}

const getCords = () => {
  const gunType = document.querySelector('.on')?.getAttribute('name') ?? ''
  if (gunType === '') return
  const gunPos = [
    Number(document.getElementById('distArty').value),
    Number(document.getElementById('azmArty').value)
  ]
  const objPos = [
    Number(document.getElementById('distObj').value),
    Number(document.getElementById('azmObj').value)
  ]
  const wind = [
    Number(document.getElementById('windSth').value),
    Number(document.getElementById('azmWind').value)
  ]

  const fireCords = calCords(gunPos, objPos, wind)

  document.getElementById('distFire').textContent = fireCords[0].toFixed(1)
  document.getElementById('azmFire').textContent = fireCords[1].toFixed(1)

  inRange()
}

// number input handler
const inputNumberElements = document.querySelectorAll('.cordsInput')
inputNumberElements.forEach((inputNumber) => {
  inputNumber.addEventListener('input', () => getCords())
})

// Arty type
const artyTypeButtons = document.querySelectorAll('.artyType')
artyTypeButtons.forEach((artyType) => {
  artyType.addEventListener('click', () => {
    artyTypeButtons.forEach((artyTypeOff) => {
      artyTypeOff.classList.remove('on')
    })
    artyType.classList.add('on')
    getCords()
  })
})

// Range handler
const windSth = document.getElementById('windSth')
const windSthImg = document.querySelector('.windGif')
windSth.addEventListener('input', (event) => {
  const valor = event.target.value
  windSthImg.src = `./source/w${valor}.gif`
  getCords()
})

// Copy Button
const copyButton = document.querySelector('.copyImg')
copyButton.addEventListener('click', () => {
  const dist = document.getElementById('distFire').textContent
  const azm = document.getElementById('azmFire').textContent
  navigator.clipboard.writeText(dist + 'm ' + azm + '°')
})
