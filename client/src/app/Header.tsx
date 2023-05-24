import Link from 'next/link'

import Button from '@/components/Button'

export default function Header() {
  return (
    <div className="full-width flex dark:bg-[#3B3B3B] bg-white p-1">
      <p className="text-3xl m-1 font-bold">
        <Link href={'/'}>Text Based</Link>
      </p>

      <div className="grow"></div>

      <Button className="m-1">
        <Link href={'/login'}>Log In</Link>
      </Button>
    </div>
  )
}
