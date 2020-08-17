export type Participant = {
  id?: number,
  name: string,
  email: string,
  co2Offset: number,
  defaultMunicipality?: number
} | null
