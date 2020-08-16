class FormatUtils {
  static getFirstName (name: string) {
    return name.split(' ')[0]
  }

  static thousandSeparator (num: number) {
    return num.toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
}

export default FormatUtils
