class FormatUtils {
  static getFirstName (name: string) {
    return name.split(' ')[0]
  }

  static thousandSeparator (num: number) {
    return num.toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  static currency (num: number) {
    return `Kr. ${this.thousandSeparator(num)}`
  }

  static round (num: number, decimalPoint: number = 0) {
    return (Math.round(num * 10 ** decimalPoint) / (10 ** decimalPoint)).toString().replace('.', ',')
  }
}

export default FormatUtils
