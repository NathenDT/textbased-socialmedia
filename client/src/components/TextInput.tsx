import React from 'react'

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: 'text' | 'password' | 'email' | 'username'
  label?: string
  helperText?: string
  error?: boolean
  className?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

export default function TextInput({
  type = 'text',
  label,
  helperText,
  error,
  className,
  prefix,
  suffix,
  ...rest
}: TextInputProps) {
  return (
    <div className={'flex flex-col ' + className}>
      <div
        className={`flex border rounded-md p-2 ${error && 'border-red-500'}`}
      >
        {prefix && <div className="flex items-center">{prefix}</div>}

        <input
          type={type}
          placeholder={label}
          className="flex-grow outline-none border-transparent p-2"
          {...rest}
        />

        {suffix && <div className="flex items-center">{suffix}</div>}
      </div>

      <p className={`text-sm mx-2 ${error && 'text-red-500'}`}>{helperText}</p>
    </div>
  )
}

export function handleTextChange(
  setValue: React.Dispatch<React.SetStateAction<TextInputType>>,
  moreErrors?: MoreErrorType[],
  required = true
) {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    let error = ''

    if (required && !value) {
      error = 'This field is required'
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

export const DEFAULT_TEXT_INPUT: TextInputType = { value: '', error: '' }
