import { UserProfile } from '@auth0/nextjs-auth0/client'

export default function formatAuth0Sub(user: UserProfile | undefined) {
  if (!user?.sub) return ['', '']

  const [provider, id] = user.sub.split('|')

  return [provider, id]
}
