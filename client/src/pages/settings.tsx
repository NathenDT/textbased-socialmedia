import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import TextInput from '../components/TextInput'
import Button from '../components/Button'

import { trpc } from '../utils/trpc'
import formatAuth0Sub from '../utils/formatAuth0Sub'

export default function Settings() {
  const router = useRouter()

  const { user, isLoading } = useUser()

  if (isLoading) return <p>Loading...</p>

  if (!user?.sub) {
    router.push('/')
    return null
  }

  return <Form auth0Id={formatAuth0Sub(user)[1]} />
}

type FormProps = {
  auth0Id: string
}

function Form({ auth0Id }: FormProps) {
  const { data } = trpc.user.getByAuth0Id.useQuery({ auth0Id })

  const [username, setUsername] = useState('')

  const handleSave = () => {}

  const handleDelete = () => {}

  useEffect(() => {
    if (data?.user?.username) setUsername(data.user.username)
  })

  return (
    <>
      <div className="flex flex-col">
        <p className="m-2 text-4xl">Settings</p>

        <TextInput
          placeholder="Username"
          value={username}
          suffix={<Button>Reset</Button>}
          className="m-2"
        />

        <Button className="m-2">Save</Button>

        <Button className="m-2 bg-red-500 hover:bg-red-600">
          Delete Account
        </Button>
      </div>
    </>
  )
}
