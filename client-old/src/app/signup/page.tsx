'use client'

import React, { useState } from 'react'
import Link from 'next/link'

import Button from '@/components/Button'
import PasswordInput, { handlePasswordChange } from '@/components/PasswordInput'
import TextInput, {
  DEFAULT_TEXT_INPUT,
  handleTextChange,
} from '@/components/TextInput'

import isValidForm from '@/utils/isValidForm'

export default function SignUp() {
  const [email, setEmail] = useState<TextInputType>(DEFAULT_TEXT_INPUT)
  const [username, setUsername] = useState<TextInputType>(DEFAULT_TEXT_INPUT)
  const [password, setPassword] = useState<TextInputType>(DEFAULT_TEXT_INPUT)
  const [confirmPassword, setConfirmPassword] =
    useState<TextInputType>(DEFAULT_TEXT_INPUT)

  const [error, setError] = useState('')

  const handleClick = () => {
    setError('')
  }

  return (
    <div className="flex flex-col w-full">
      <p className="text-6xl m-2">Sign Up</p>

      <TextInput
        type="email"
        label="Email"
        value={email.value}
        onChange={handleTextChange(setEmail, [
          {
            condition: (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Please enter a valid email address.',
          },
        ])}
        helperText={email.error}
        error={Boolean(email.error)}
        className="m-2"
      />

      <TextInput
        type="username"
        label="Username"
        value={username.value}
        onChange={handleTextChange(setUsername, [
          {
            condition: (value) => !/^\w+$/.test(value),
            message:
              'Username must only contain letters, numbers, and underscores.',
          },
        ])}
        helperText={username.error}
        error={Boolean(username.error)}
        className="m-2"
      />

      <PasswordInput
        label="Password"
        value={password.value}
        onChange={handlePasswordChange(
          setPassword,
          confirmPassword.value,
          setConfirmPassword
        )}
        helperText={password.error}
        error={Boolean(password.error)}
        className="m-2"
      />

      <PasswordInput
        label="Confirm Password"
        value={confirmPassword.value}
        onChange={handlePasswordChange(
          setConfirmPassword,
          password.value,
          setPassword
        )}
        helperText={confirmPassword.error}
        error={Boolean(confirmPassword.error)}
        className="m-2"
      />

      <Button
        type="submit"
        onClick={handleClick}
        disabled={!isValidForm([email, username, password, confirmPassword])}
        className="m-2"
      >
        Sign Up
      </Button>

      {error && <p className="m-2 text-sm text-red-500">{error}</p>}

      <p className="self-end m-2">
        Already have an account? <Button href="/login">Log In</Button>
      </p>
    </div>
  )
}
