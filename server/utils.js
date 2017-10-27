// utils.js

const hexValues = 'abcdef0123456789'


exports.codeGenerator = (n) => {
  let b = ''
  let i = 0
  while(i++ !== n) {
    b += hexValues[Math.floor(Math.random() * hexValues.length)]
  }
  return b
}
