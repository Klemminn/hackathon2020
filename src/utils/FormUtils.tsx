class FormUtils {
  static async submitForm (formName: string) {
    document?.getElementById(`${formName}SubmitButton`)?.click()
  }

  static async resetForm (formName: any) {
    document.forms[formName].reset()
  }
}

export default FormUtils
