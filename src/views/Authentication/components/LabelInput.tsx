/* eslint-disable prettier/prettier */

import { useEffect, useRef } from "react"
import Eye from "../../../assets/icons/Eye.svg"
import EyeClosed from "../../../assets/icons/Hide.svg"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import useLabeledInput from "../../../custom-hooks/useLabeledInput"
import { setAuthKey } from "../../../store"
import { Input } from "antd"

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

  const { handleBlur, handleFocus } = useLabeledInput(
    state,
    dispatch,
    inputRef,
    type,
    label,
  )

  useEffect(() => {
    dispatch(setAuthKey({ key: "inputType", value: type }))
  }, [dispatch, type])

  return (
    <div
      onClick={handleFocus}
      className={`outline-[#DEDFEC] h-14 w-full relative p-2 outline outline-1 rounded-lg px-5`}
    >
      <label
        htmlFor={htmlFor}
        className={`text-[#717E95] absolute z-40 ${
          state.isFocused
            ? "text-[0.5rem] mb-2 font-medium top-1"
            : "text-base top-2"
        }`}
      >
        {label}
      </label>
      <div
        className={`absolute ${
          state.isFocused ? "bottom-0" : "bottom-1"
        } w-full pl-2 left-0`}
      >
        {type?.toLowerCase().includes("password") ? (
          <Input.Password
            ref={inputRef}
            onChange={onChange}
            value={value && value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            bordered={false}
            iconRender={(visible) =>
              visible ? (
                <img src={Eye} alt="" />
              ) : (
                <img src={EyeClosed} alt="" />
              )
            }
          />
        ) : (
          <Input
            ref={inputRef}
            onChange={onChange}
            value={value && value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            bordered={false}
          />
        )}
      </div>
    </div>
  )
}

export default LabeledInput
