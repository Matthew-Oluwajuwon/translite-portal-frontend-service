/* eslint-disable prettier/prettier */
import { State } from "../model/application/state"
import { AppDispatch, setAuthKey } from "../store"

const useLabeledInput = (
  state: State.Authentication,
  dispatch: AppDispatch,
  inputRef: any,
  type: string,
  label: string,
) => {
  const handleFocus = () => {
    inputRef.current.focus()
    dispatch(setAuthKey({ key: "isFocused", value: true }))
  }

  const handleBlur = () => {
    dispatch(
      setAuthKey({ key: "isFocused", value: state.hasValue ? true : false }),
    )
  }

  const handleChange = (e: string) => {
    if (e.length === 0) {
      dispatch(setAuthKey({ key: "hasValue", value: false }))
    } else {
      dispatch(setAuthKey({ key: "hasValue", value: true }))
    }
  }

  const togglePassword = (isReveal: boolean) => {
    if (isReveal) {
      dispatch(
        setAuthKey({
          key: "inputType",
          value:
           ( type?.toLowerCase() === "password" &&
            label?.toLowerCase().includes("password"))
              ? "password"
              : "text",
        }),
      )
      dispatch(setAuthKey({ key: "isRevealPassword", value: false }))
    } else {
      dispatch(
        setAuthKey({
          key: "inputType",
          value:
            (type?.toLowerCase() === "password" &&
            label?.toLowerCase().includes("password"))
              ? "text"
              : "password",
        }),
      )
      dispatch(setAuthKey({ key: "isRevealPassword", value: true }))
    }
  }

  return {
    handleBlur,
    handleChange,
    handleFocus,
    togglePassword,
  }
}

export default useLabeledInput
