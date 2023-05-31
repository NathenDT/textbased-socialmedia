export default function isValidForm(
  textInputs: TextInputType[],
  required: boolean = true
) {
  for (const textInput of textInputs) {
    if (required && !textInput.value) return false

    if (textInput.error) return false
  }

  return true
}
