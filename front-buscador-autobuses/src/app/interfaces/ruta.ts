import { Estacion } from "./estacion"

export interface Ruta {
    id: number
    origenId: number
    destinoId: number
    isValid: boolean
    estacionOrigen: Estacion
    estacionDestino: Estacion
    data: string | null
}
