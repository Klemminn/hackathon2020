import React, { useState, useEffect } from 'react'
import { Label, Progress } from 'reactstrap'
import { useStateLink } from '@hookstate/core'

import { Modal, Form, Row, Col, FormInput, FormSearchableSelect, FormTextarea, OffsetAgentSelector, FormSwitch, Button } from 'components'
import { OffsetAgent, Participant, Municipality } from 'types'
import { FormatUtils, FormUtils, ToastUtils } from 'utils'
import { ParticipantState, updateCo2 } from 'states'
import { PurchaseService } from 'services'

import * as yup from 'yup'

import './PurchaseModal.scss'

type PurchaseModalProps = {
  offsetAgents: OffsetAgent[],
  emissionPerPerson: number,
  municipalities: Municipality[],
  onSubmit(): void,
  [rest:string]: any
}

const formName = 'purchaseForm'
const schema = yup.object().shape({
  participantName: yup.string()
    .required('Þú verður að skrá nafn kaupanda'),
  participantEmail: yup.string().email('Netfang ekki á réttu formi')
    .required('Þú verður að skrá netfang kaupanda'),
  quantity: yup.number().required('Þú verður að skrá magn').min(1, 'Ekki er hægt að kaupa minna en 1stk'),
  receiverEmail: yup.string().email('Netfang ekki á réttu formi').when('gift', (gift: boolean, schema: any) => {
    return gift ? schema.required('Þú verður að skrá e-mail viðtakanda') : schema
  }),
  receiverName: yup.string().when('gift', (gift: boolean, schema: any) => {
    return gift ? schema.required('Þú verður að skrá nafn viðtakanda') : schema
  })
})

let previuosProgress = 0
const PurchaseModal = ({ offsetAgents, emissionPerPerson, municipalities, onSubmit, ...rest }: PurchaseModalProps) => {
  const [selectedOffsetAgent, setSelectedOffsetAgent]: [OffsetAgent, any] = useState(offsetAgents[0])
  const [quantity, setQuantity]: [number, any] = useState(1)
  const participant: Participant = useStateLink(ParticipantState).get()
  const [gift, setGift] = useState(false)
  const [loading, setLoading] = useState(false)

  if (participant.co2Offset) {
    previuosProgress = 100 * participant.co2Offset / emissionPerPerson
  }
  const currentProgress = 100 * quantity * selectedOffsetAgent?.co2PerItem / emissionPerPerson
  let remaining = 100 - previuosProgress - currentProgress
  if (remaining < 0) {
    remaining = 0
  }

  useEffect(() => {
    setSelectedOffsetAgent(offsetAgents[0])
  }, [offsetAgents])

  const submit = async (data: any) => {
    setLoading(true)
    try {
      const body = {
        ...data,
        costPerItem: selectedOffsetAgent.costPerItem,
        totalCo2: selectedOffsetAgent.co2PerItem * quantity,
        offsetAgent: selectedOffsetAgent.id
      }
      PurchaseService.createPurchase(body)
      setTimeout(() => {
        onSubmit()
        ToastUtils.success('😃 Snilld! Takk fyrir að kolefnisjafna')
        setLoading(false)
        participant && updateCo2()
        rest.toggle()
      }, 1000)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  const setAgent = (agent: OffsetAgent) => {
    setSelectedOffsetAgent(agent)
    setQuantity(1)
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
        onSelect={(agent: OffsetAgent) => setAgent(agent)}
      />
      <Form
        name={formName}
        onSubmit={submit}
        validationSchema={schema}
      >
        <div className='quantity'>
          <Row>
            <Col md={3}>
              <Label>Verkefni</Label>
              <div>
                {selectedOffsetAgent?.itemLabel}
              </div>
            </Col>
            <Col md={3}>
              <FormInput
                name='quantity'
                label='Magn'
                type='number'
                value={quantity}
                onChange={(value) => setQuantity(value)}
                min={1}
              />
              <div className='mt-2'>
                <Label className='mr-2'>Kolefnisjöfnun:</Label>
                {FormatUtils.round(selectedOffsetAgent?.co2PerItem * quantity, 1)} tonn af CO2
              </div>
            </Col>
            <Col md={3} className='text-right'>
              <Label>
                Verð/eining
              </Label>
              <div>
                {selectedOffsetAgent && (FormatUtils.currency(selectedOffsetAgent?.costPerItem))}
              </div>
            </Col>
            <Col md={3} className='text-right'>
              <Label>
                Samtals
              </Label>
              <div>
                {selectedOffsetAgent && (FormatUtils.currency(selectedOffsetAgent?.costPerItem * quantity))}
              </div>
            </Col>
          </Row>
          <div className='offset-progress'>
            <Label>Kolefnisjöfnun þín fyrir árið 2020</Label>
            <Progress multi>
              <Progress className='previuos' bar value={previuosProgress}>{FormatUtils.round(previuosProgress, 1)}%</Progress>
              <Progress className='current' bar value={currentProgress}>{FormatUtils.round(currentProgress, 1)}%</Progress>
              <Progress className='remaining' bar value={remaining} />
            </Progress>
          </div>
        </div>
        <Row>
          <Col md={6}>
            <FormInput
              name='participantName'
              label='Nafn kaupanda'
              placeholder='Nafnið þitt'
              defaultValue={participant?.name}
            />
          </Col>
          <Col md={6}>
            <FormInput
              name='participantEmail'
              type='email'
              label='Netfang kaupanda'
              placeholder='Netfangið þitt'
              defaultValue={participant?.email}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormSearchableSelect
              name='municipality'
              label='Sveitarfélag'
              placeholder='Valkvæmt: Veldu sveitarfélag'
              options={municipalities.map((m) => ({
                label: m.name,
                value: m.id
              }))}
            />
          </Col>
          <Col md={6}>
            <FormSwitch
              name='gift'
              label='Gefa sem gjöf'
              onChange={(value) => setGift(value)}
            />
          </Col>
        </Row>
        <div className={`${gift ? '' : 'd-none'}`}>
          <Row>
            <Col md={6}>
              <FormInput
                name='receiverName'
                label='Nafn viðtakanda'
                placeholder='Nafn þess sem þú vilt kolefnisjafna'
              />
            </Col>
            <Col md={6}>
              <FormInput
                name='receiverEmail'
                type='email'
                label='Netfang viðtakanda'
                placeholder='Netfang þess sem þú vilt kolefnisjafna'
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormTextarea
                name='receiverComment'
                label='Skilaboð til viðtakanda'
                placeholder='Hæhæ, mig langaði bara rosalega til að kolefnisjafna þig!'
                rows={3}
              />
            </Col>
          </Row>
        </div>
      </Form>
      <div className='confirm'>
        <Button
          onClick={() => FormUtils.submitForm(formName)}
          loading={loading}
        >
          Staðfesta
        </Button>
      </div>
    </Modal>
  )
}

export default PurchaseModal
