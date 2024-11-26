// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl: 'http://localhost:3000',
  production: false
};

export interface IEventos{
  id:string,
  imagen: string | null,
  nombre: string,
  fecha: string,
  lugar: string,
  descripcion: string
  }

export interface IEvento{
  imagen: string | null,
  nombre: string,
  fecha: string,
  lugar: string,
  descripcion: string
}

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

export interface IMisEventos{
  id:string,
  imagen: string,
  nombre: string,
  fecha: string,
  rut: string,
  email:string
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
