import { UserProfile, useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/router'

import TextInput from '../components/TextInput'
import { useState } from 'react'
import Button from '../components/Button'

import { trpc } from '../utils/trpc'

export default function SignUpCont() {
  const router = useRouter()
  const { user, isLoading } = useUser()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return router.back()
  }

  return (
    <div className="flex flex-col">
      <p className="m-2 text-4xl">Sign Up Continue</p>

      {user && <Form auth0User={user} />}
    </div>
  )
}

type FormProps = {
  auth0User: UserProfile
}

function Form({ auth0User }: FormProps) {
  const router = useRouter()

  const { mutate: newUser } = trpc.user.new.useMutation()
  const { data, isLoading } = trpc.user.getByAuth0Id.useQuery({
    auth0Id: auth0User.sub!.split('|')[1],
  })

  const [username, setUsername] = useState('')

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (data?.user) {
    router.push('/')
  }

  const handleSubmit = () => {
    const auth0Id = auth0User.sub!.split('|')[1]

    newUser({ auth0Id, username })

    router.push('/')
  }

  return (
    <>
      <TextInput
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="m-2"
      />

      <Button onClick={handleSubmit} disabled={!username} className="m-2">
        Sign Up
      </Button>
    </>
  )
}
