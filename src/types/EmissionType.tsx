import { EmissionSubtype } from 'types'

export type EmissionType = {
    name: string,
    co2: number,
    subtypes: EmissionSubtype[]
}
