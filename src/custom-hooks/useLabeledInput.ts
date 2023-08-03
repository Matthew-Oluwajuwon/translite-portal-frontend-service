/* eslint-disable prettier/prettier */
import { State } from "../model/application/state"
import { AppDispatch, setStateKey } from "../store"

const useLabeledInput = (
  state: State.Authentication,
  dispatch: AppDispatch,
  inputRef: any,
  type: string,
  label: string,
) => {
  const handleFocus = () => {
    inputRef.current.focus()
    dispatch(setStateKey({ key: "isFocused", value: true }))
  }

  const handleBlur = () => {
    dispatch(
      setStateKey({ key: "isFocused", value: state.hasValue ? true : false }),
    )
  }

  const handleChange = (e: string) => {
    if (e.length === 0) {
      dispatch(setStateKey({ key: "hasValue", value: false }))
    } else {
      dispatch(setStateKey({ key: "hasValue", value: true }))
    }
  }

  const togglePassword = (isReveal: boolean) => {
    if (isReveal) {
      dispatch(
        setStateKey({
          key: "inputType",
          value:
            type?.toLowerCase() === "password" &&
            label?.toLowerCase().includes("password")
              ? "password"
              : "text",
        }),
      )
      dispatch(setStateKey({ key: "isRevealPassword", value: false }))
    } else {
      dispatch(
        setStateKey({
          key: "inputType",
          value:
            type?.toLowerCase() === "password" &&
            label?.toLowerCase().includes("password")
              ? "text"
              : "password",
        }),
      )
      dispatch(setStateKey({ key: "isRevealPassword", value: true }))
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
