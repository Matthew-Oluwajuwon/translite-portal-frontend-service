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
