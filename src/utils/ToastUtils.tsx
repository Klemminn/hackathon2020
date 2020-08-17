import { toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class ToastUtils {
  constructor () {
    toast.configure({
      autoClose: 2000,
      draggable: false,
      position: toast.POSITION.BOTTOM_RIGHT,
      transition: Slide
    })
  }

  success (text: string) {
    toast.success(text)
  }

  info (text: string) {
    toast.info(text)
  }

  warning (text: string) {
    toast.warning(text)
  }

  error (text: string) {
    toast.error(text)
  }
}

const ToastUtilsInstance = new ToastUtils()

export default ToastUtilsInstance
