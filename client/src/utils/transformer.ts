export default (value: string): boolean | null => {
  switch (value) {
    case 'true':
      return true

    case 'false':
      return false

    case 'null':
      return null
    default:
      return null
  }
}
