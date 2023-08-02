/* eslint-disable prettier/prettier */

import { useRef, useState } from "react"
import Eye from "../../../assets/icons/Eye.svg"
import EyeClosed from "../../../assets/icons/Hide.svg"

interface LabelInputProps {
  label: string
  type: string
  htmlFor: string
  value: any
}

const LabeledInput: React.FC<LabelInputProps> = ({
  htmlFor,
  label,
  type,
  value,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [hasValue, setHasValue] = useState<boolean>(false)
  const [inputType, setInputType] = useState<string>(type)
  const [isRevealPassword, setIsRevealPassword] = useState<boolean>(false)

  const inputRef = useRef(null) as any

  const handleFocus = () => {
    inputRef.current.focus()
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(hasValue ? true : false)
  }

  const handleChange = (e: string) => {
    if (e.length === 0) {
      setHasValue(false)
    } else {
      setHasValue(true)
    }
  }

  const togglePassword = (isReveal: boolean) => {
    if (isReveal) {
      setInputType(
        type?.toLowerCase() === "password" &&
          label?.toLowerCase().includes("password")
          ? "password"
          : "text",
      )
      setIsRevealPassword(false)
    } else {
      setInputType(
        type?.toLowerCase() === "password" &&
          label?.toLowerCase().includes("password")
          ? "text"
          : "password",
      )
      setIsRevealPassword(true)
    }
  }

  return (
    <div
      onClick={handleFocus}
      className={`outline-[#DEDFEC] outline outline-1 rounded-lg px-5 ${
        isFocused ? "p-3" : "p-4"
      }`}
    >
      <label
        htmlFor={htmlFor}
        className={`text-[#717E95] relative ${
          isFocused ? "text-[0.7rem] font-medium" : "text-base top-3"
        }`}
      >
        {label}
      </label>
      <div className="flex items-center justify-between relative">
        <input
          type={inputType}
          ref={inputRef}
          onChange={(e) => handleChange(e.target.value)}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="outline-none border-none bg-transparent text-base text-[#272848] font-medium"
        />
        {type?.toLowerCase() === "password" && isFocused && (
          <img
            src={isRevealPassword ? Eye : EyeClosed}
            onClick={() => togglePassword(isRevealPassword)}
            alt=""
            className={`absolute right-2 cursor-pointer hover:scale-125 hover:transition-all`}
          />
        )}
      </div>
    </div>
  )
}

export default LabeledInput
