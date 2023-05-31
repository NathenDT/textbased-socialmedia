'use client'

import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Button from '@/components/Button'
import PasswordInput from '@/components/PasswordInput'
import TextInput, {
  DEFAULT_TEXT_INPUT,
  handleTextChange,
} from '@/components/TextInput'

import isValidForm from '@/utils/isValidForm'
import Link from 'next/link'

export default function LogIn() {
  const router = useRouter()

  const [username, setUsername] = useState<TextInputType>(DEFAULT_TEXT_INPUT)
  const [password, setPassword] = useState<TextInputType>(DEFAULT_TEXT_INPUT)

  const [error, setError] = useState('')

  const handleClick = () => {
    setError('')

    setCookie('userData', { token: '1234', username: 'Nathen20' })
  }

  return (
    <form className="flex flex-col w-full">
      <p className="text-6xl m-2">Log In</p>

      <TextInput
        type="username"
        label="Username"
        value={username.value}
        onChange={handleTextChange(setUsername)}
        helperText={username.error}
        error={Boolean(username.error)}
        className="m-2"
      />

      <PasswordInput
        label="Password"
        value={password.value}
        onChange={handleTextChange(setPassword)}
        helperText={password.error}
        error={Boolean(password.error)}
        className="m-2"
      />

      <Button
        type="submit"
        onClick={handleClick}
        disabled={!isValidForm([username, password])}
        className="m-2"
      >
        Log In
      </Button>

      {error && <p className="m-2 text-sm text-red-500">{error}</p>}

      <p className="grow text-right m-2">
        Don't have an account? <Button href="/signup">Sign Up</Button>
      </p>
    </form>
  )
}
