export interface IAsistentes{
    id: string,
    avatar: string | null,
    username: string,
    rut:string,
    nombre: string,
    apellido_paterno: string,
    apellido_materno: string,
    email: string,
    password: string,
    isactive: boolean
}

export interface nuevoAsistente{
    rut:string,
    avatar: string | null,
    username: string,
    nombre: string,
    apellido_paterno: string,
    apellido_materno: string,
    email: string,
    password: string,
    isactive: boolean
}