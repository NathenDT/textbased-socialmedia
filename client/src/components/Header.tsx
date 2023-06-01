import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'

import { Menu, Transition } from '@headlessui/react'

import Button from './Button'

import { trpc } from '../utils/trpc'
import Avatar from './Avatar'
import { Fragment } from 'react'

export default function Header() {
  return (
    <div className="full-width flex top-0 bg-white items-center">
      <div className="text-3xl m-2 font-semibold">
        <Link href="/">Text Based</Link>
      </div>

      <div className="grow" />

      <Auth />
    </div>
  )
}

function Auth() {
  const { user, isLoading } = useUser()

  if (isLoading) return null

  if (!user)
    return (
      <Button href="/api/auth/login?returnTo=/signupcont" className="m-2">
        Log In
      </Button>
    )

  return <Profile auth0Id={user.sub!.split('|')[1]} />
}

type ProfileProps = {
  auth0Id: string
}

function Profile({ auth0Id }: ProfileProps) {
  const { data, isLoading } = trpc.user.getByAuth0Id.useQuery({ auth0Id })

  if (isLoading || !data?.user?.username)
    return <Avatar loading className="m-2" />

  return (
    <Menu as="div">
      <Menu.Button>
        <Avatar
          username={data.user.username}
          onClick={() => {}}
          notLink
          className="m-2"
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-30 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href={'/user/' + data.user!.username}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Profile
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/settings"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/api/auth/logout"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Log Out
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
