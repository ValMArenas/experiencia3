export interface qrAll{
    id: number,
    rut_usuario:string,
    email:string,
    nombre_evento:string,
    fecha:string,
    lugar: string
    imagen:string
}

export interface agregaMisEventos{
    imagen: string,
    nombre: string,
    fecha: string,
    rut: string,
    email:string
}

export interface verMisEventos{
    id:string,
    imagen: string,
    nombre: string,
    fecha: string,
    rut: string,
    email:string
}
