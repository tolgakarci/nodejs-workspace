const enteredNumber = Number(process.argv.slice(2))
const circleArea = enteredNumber * enteredNumber * Math.PI

console.log(`Yarıçapı ${enteredNumber} olan dairenin alanı: ${circleArea}`)
