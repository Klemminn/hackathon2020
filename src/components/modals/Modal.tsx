import React from 'react'
import { Modal as BootstrapModal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import './Modal.scss'

type ModalProps = {
  className?: string,
  children?: any,
  header?: string,
  footer?: any,
  [rest:string]: any
}

const Modal = ({ className, header, footer, children, ...rest }: ModalProps) => {
  const classes = ['modal-component']
  if (className) {
    classes.push(className)
  }
  return (
    <BootstrapModal
      className={classes.join(' ')}
      {...rest}
    >
      {header && (<ModalHeader>{header}</ModalHeader>)}
      {children && (<ModalBody>{children}</ModalBody>)}
      {footer && (<ModalFooter>{footer}</ModalFooter>)}
    </BootstrapModal>
  )
}

export default Modal
