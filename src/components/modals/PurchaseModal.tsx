import React, { useState } from 'react'

import { Modal, Form, Row, Col, FormInput, FormSearchableSelect, FormTextarea, OffsetAgentSelector } from 'components'
import { OffsetAgent } from 'types'
import * as yup from 'yup'

import './PurchaseModal.scss'

type PurchaseModalProps = {
  offsetAgents: OffsetAgent[],
  [rest:string]: any
}

const formName = 'purchaseForm'
const schema = yup.object().shape({
  name: yup.string()
    .required('drasl'),
  relation: yup.number().required('drasl')
})

const PurchaseModal = ({ offsetAgents, ...rest }: PurchaseModalProps) => {
  const [selectedOffsetAgent, setSelectedOffsetAgent] = useState(1)

  const submit = (data: any) => {
    console.log(data)
  }

  return (
    <Modal
      className='purchase-modal-component'
      header='Jafnaðu þig'
      size='xl'
      {...rest}
    >
      <OffsetAgentSelector
        offsetAgents={offsetAgents}
        selected={selectedOffsetAgent}
        onSelect={(id) => setSelectedOffsetAgent(id)}
      />
      <Form
        name={formName}
        onSubmit={submit}
        validationSchema={schema}
      >
        <Row>
          <Col md={6}>
            <FormSearchableSelect
              name='municipality'
              label='Sveitarfélag'
              options={[]}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormInput
              name='receiverName'
              label='Nafn'
              placeholder='Nafn þess sem þú vilt kolefnisjafna'
            />
          </Col>
          <Col md={6}>
            <FormInput
              name='receiverEmail'
              type='email'
              label='Netfang'
              placeholder='Netfang þess sem þú vilt kolefnisjafna'
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormTextarea
              name='receiverComment'
              label='Skilaboð'
              placeholder='Hæhæ, mig langaði bara rosalega til að kolefnisjafna þig!'
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default PurchaseModal
