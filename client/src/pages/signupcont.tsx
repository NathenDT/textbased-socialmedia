import { UserProfile, useUser } from '@auth0/nextjs-auth0/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import Button from '../components/Button'
import LoadingCircle from '../components/LoadingCircle'
import TextInput, {
  handleTextChange,
  DEFAULT_TEXT_INPUT,
} from '../components/TextInput'

import formatAuth0Sub from '../utils/formatAuth0Sub'
import { trpc } from '../utils/trpc'

const SignUpContPage: NextPage = () => {
  const { user, isLoading } = useUser()

  return (
    <div className="flex flex-col">
      {user && <Form auth0User={user} loading={isLoading} />}

      <Button href="/api/auth/logout" className="m-2">
        Cancel
      </Button>
    </div>
  )
}

type FormProps = {
  auth0User: UserProfile
  loading: boolean
}

function Form({ auth0User, loading }: FormProps) {
  const router = useRouter()

  const trpcUtils = trpc.useContext()
  const { mutate: newUser } = trpc.user.new.useMutation({
    onSuccess: (newUser) => {
      trpcUtils.user.getByAuth0Id.setData(
        { auth0Id: formatAuth0Sub(auth0User)[1] },
        (oldData) => {
          if (oldData == null) return

          return {
            ...oldData,
            user: newUser.user,
          }
        }
      )

      router.push('/')
    },
    onError: (error) => {
      setError(error.message)
    },
  })

  const { data, isLoading } = trpc.user.getByAuth0Id.useQuery({
    auth0Id: formatAuth0Sub(auth0User)[1],
  })

  const [username, setUsername] = useState<TextInputType>(DEFAULT_TEXT_INPUT)
  const [error, setError] = useState<string>('')

  if (isLoading) {
    return (
      <div className="w-full flex justify-center m-2">
        <LoadingCircle />
      </div>
    )
  }

  if (auth0User) {
    router.push('/')
  }

  if (data?.user) {
    router.push('/')
  }

  const handleSubmit = () => {
    setError('')

    newUser({ auth0Id: formatAuth0Sub(auth0User)[1], username: username.value })
  }

  return (
    <>
      <p className="m-2 text-4xl">Sign Up Continue</p>

      <TextInput
        label="Username"
        value={username.value}
        onChange={handleTextChange(setUsername)}
        error={Boolean(username.error)}
        helperText={username.error}
        className="m-2"
      />

      <Button
        onClick={handleSubmit}
        disabled={Boolean(username.error)}
        className="m-2"
      >
        Sign Up
      </Button>

      {error && <p className="m-2 text-red-500">{error}</p>}
    </>
  )
}

export default SignUpContPage
