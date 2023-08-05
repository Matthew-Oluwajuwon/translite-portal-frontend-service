/* eslint-disable prettier/prettier */
import { State } from "./state"

export class Auth {
  key: keyof State.Authentication
  value?: any
  constructor(key: keyof State.Authentication, value: any) {
    this.key = key
    this.value = value
  }
}

export class Global {
  key: keyof State.Global
  value?: any
  constructor(key: keyof State.Global, value: any) {
    this.key = key
    this.value = value
  }
}