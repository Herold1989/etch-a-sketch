import globals from './globals'

export default function pickColor(e) {
  console.log(e.target.value)
  globals.pickedColor = e.target.value
}