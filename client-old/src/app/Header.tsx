import Link from 'next/link'

import Button from '@/components/Button'

export default function Header() {
  return (
    <div className="full-width flex static top-0 bg-white">
      <p className="text-3xl m-2 font-semibold">
        <Link href={'/'}>Text Based</Link>
      </p>

      <div className="grow"></div>

      <Button className="m-2">
        <Link href={'/login'}>Log In</Link>
      </Button>
    </div>
  )
}
