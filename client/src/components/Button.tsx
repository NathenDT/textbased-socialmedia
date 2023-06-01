import Link from 'next/link'

import LoadingCircle from './LoadingCircle'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode
  href?: string
  disabled?: boolean
  active?: boolean
  loading?: boolean
  className?: string
}

export default function Button({
  children,
  href,
  disabled = false,
  active = false,
  loading = false,
  type = 'button',
  className,
  ...rest
}: Props) {
  const disabledClassName = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'hover:bg-blue-600'
  const activeClassName = active ? 'bg-blue-700' : ''
  const loadingClassName = loading ? 'flex cursor-wait justify-center' : ''

  const _className = `px-4 py-2 bg-blue-500 text-white font-semibold rounded-md focus:outline-none ${disabledClassName} ${activeClassName} ${loadingClassName} ${className}`

  if (href) {
    return (
      <button className={_className} disabled={disabled} {...rest}>
        <Link href={href}>{children}</Link>
      </button>
    )
  }

  return (
    <button
      type={type}
      className={_className}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <LoadingCircle /> : children}
    </button>
  )
}
