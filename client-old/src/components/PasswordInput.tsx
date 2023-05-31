import React, { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

import TextInput, { TextInputProps } from './TextInput'
import IconButton from './IconButton'

export default function PasswordInput({ ...props }: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <TextInput
      type={showPassword ? 'text' : 'password'}
      suffix={
        <IconButton
          className="mr-2"
          icon={showPassword ? BsEye : BsEyeSlash}
          onClick={handleTogglePasswordVisibility}
        />
      }
      {...props}
    />
  )
}

export function handlePasswordChange(
  setValue: React.Dispatch<React.SetStateAction<TextInputType>>,
  compareValue: string,
  compareSetValue: React.Dispatch<React.SetStateAction<TextInputType>>,
  moreErrors?: MoreErrorType[],
  required = true
) {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    let error = ''

    if (required && !value) {
      error = 'This field is required'
    }

    if (compareValue && compareValue !== value) {
      error = 'Passwords do not match.'
      compareSetValue((prevState) => ({
        ...prevState,
        error: 'Passwords do not match.',
      }))
    } else {
      compareSetValue((prevState) => ({
        ...prevState,
        error: '',
      }))
    }

    const updatedMoreErrors = (moreErrors ?? []).map((item) => {
      const condition = item.condition(value)
      return {
        ...item,
        condition,
      }
    })

    for (const { condition, message } of updatedMoreErrors) {
      if (condition) {
        error = message
        break
      }
    }

    setValue({
      value,
      error,
    })
  }
}
