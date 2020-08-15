import React from 'react'
import { Modal as BootstrapModal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

type ModalProps = {
  children?: any,
  header?: string,
  footer?: any,
  [rest:string]: any
}

const Modal = ({ header, footer, children, ...rest }: ModalProps) => (
  <BootstrapModal {...rest}>
    {header && (<ModalHeader>{header}</ModalHeader>)}
    {children && (<ModalBody>{children}</ModalBody>)}
    {footer && (<ModalFooter>{footer}</ModalFooter>)}
  </BootstrapModal>
)

export default Modal
