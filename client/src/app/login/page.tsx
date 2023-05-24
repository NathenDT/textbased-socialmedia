'use client'

import React, { useState } from 'react'
import { useTheme } from 'next-themes'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

import TextInput, {
  DEFAULT_TEXT_INPUT,
  handleTextChange,
} from '@/components/TextInput'
import PasswordInput from '@/components/PasswordInput'
import Button from '@/components/Button'
import Link from 'next/link'

import isValidForm from '@/utils/isValidForm'
import { useRouter } from 'next/navigation'
import IconButton from '@/components/IconButton'

export default function LogIn() {
  const router = useRouter()

  const { theme, setTheme } = useTheme()

  const [username, setUsername] = useState<TextInputType>(DEFAULT_TEXT_INPUT)
  const [password, setPassword] = useState<TextInputType>(DEFAULT_TEXT_INPUT)

  const [error, setError] = useState('')

  const handleClick = () => {
    setError('')
  }

  return (
    <div className="flex flex-col w-full">
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
        className="m-2"
        onClick={handleClick}
        disabled={!isValidForm([username, password])}
      >
        Log In
      </Button>

      {error && <p className="m-2 text-sm text-red-500">{error}</p>}

      {/* <p className="grow text-right m-2">
        Don't have an account?{' '}
        <Button onClick={() => router.push('/signup')}>Sign Up</Button>
      </p> */}

      {/* <button
        onClick={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}
        className="bg-gray-800 dark:bg-gray-50 hover:bg-gray-600 dark:hover:bg-gray-300 transition-all duration-100 text-white dark:text-gray-800 px-8 py-2 text-2xl md:text-4xl rounded-lg"
      >
        Toggle Mode
      </button> */}

      {/* <IconButton /> */}
    </div>
  )
}
