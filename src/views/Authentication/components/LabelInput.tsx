/* eslint-disable prettier/prettier */

import { useEffect, useRef } from "react"
import Eye from "../../../assets/icons/Eye.svg"
import EyeClosed from "../../../assets/icons/Hide.svg"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import useLabeledInput from "../../../custom-hooks/useLabeledInput"
import { setStateKey } from "../../../store"

interface LabelInputProps {
  label: string
  type: string
  htmlFor: string
  value?: any
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const LabeledInput: React.FC<LabelInputProps> = ({
  htmlFor,
  label,
  type,
  value,
  onChange,
}) => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => {
    return state.auth
  })

  const inputRef = useRef(null) as any

  const { handleBlur, handleFocus, togglePassword } = useLabeledInput(
    state,
    dispatch,
    inputRef,
    type,
    label,
  )

  useEffect(() => {
    dispatch(setStateKey({ key: "inputType", value: type }))
  }, [dispatch, type])

  return (
    <div
      onClick={handleFocus}
      className={`outline-[#DEDFEC] h-14 relative p-2 outline outline-1 rounded-lg px-5 ${
        state.isFocused ? "" : ""
      }`}
    >
      <label
        htmlFor={htmlFor}
        className={`text-[#717E95] absolute ${
          state.isFocused
            ? "text-[0.7rem] font-medium top-2"
            : "text-base top-4"
        }`}
      >
        {label}
      </label>
      <div className="flex items-center w-full absolute bottom-1">
        <input
          type={state.inputType}
          ref={inputRef}
          onChange={onChange}
          value={value && value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="outline-none border-none bg-transparent text-base text-[#272848] font-medium"
        />
        {type?.toLowerCase() === "password" && state.isFocused && (
          <img
            src={state.isRevealPassword ? Eye : EyeClosed}
            onClick={() => togglePassword(state.isRevealPassword as boolean)}
            alt=""
            className={`absolute right-10 bottom-4 cursor-pointer hover:scale-125 hover:transition-all`}
          />
        )}
      </div>
    </div>
  )
}

export default LabeledInput
