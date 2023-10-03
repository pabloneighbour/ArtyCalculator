const getOffset = (gun, wind) => {
  const gunTypes = ['120mm', '150mm', 'rkt']
  return (gunTypes.includes(gun) ? 25 * wind : gun === '120mm-gb' ? 10 * wind : gun === '300mm' ? 50 * wind : 0)
}

const getVector = (dist, azm) => {
  return [(dist * Math.cos(azm * Math.PI / 180)), (dist * Math.sin(azm * Math.PI / 180))]
}

const getPolar = (v) => {
  const dist = Math.hypot(v[0], v[1])
  const azm = Math.atan2(v[1], v[0]) * 180 / Math.PI
  return [dist, (azm < 0 ? azm + 360 : azm)]
}

const getWindVector = (wind, azm, gun) => {
  const sth = getOffset(gun, wind)
  const vWind = getVector(sth, azm)
  return vWind
}

const getFireVector = (gunPos, objPos, wind) => {
  return [objPos[0] - gunPos[0] - wind[0], objPos[1] - gunPos[1] - wind[1]]
}

const calCords = (gunType, gunPos, objPos, wind) => {
  const gunCords = getVector(gunPos[0], gunPos[1])
  const objCords = getVector(objPos[0], objPos[1])
  const windCords = getWindVector(wind[0], wind[1], gunType)
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

  const fireCords = calCords(gunType, gunPos, objPos, wind)

  document.getElementById('distFire').textContent = fireCords[0].toFixed(1)
  document.getElementById('azmFire').textContent = fireCords[1].toFixed(1)

  inRange()
}

const inputNumberElements = document.querySelectorAll('.inputElement, .windSth')
inputNumberElements.forEach((inputNumber) => {
  inputNumber.addEventListener('input', () => getCords())
})

const gunTypeElements = document.querySelectorAll('.artyType')
gunTypeElements.forEach((gunTypeElement) => {
  gunTypeElement.addEventListener('click', () => getCords())
})
