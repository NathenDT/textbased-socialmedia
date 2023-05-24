type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode
  disabled?: boolean
  className?: string
}

export default function Button({
  children,
  disabled = false,
  className,
  ...rest
}: Props) {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-md focus:outline-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
      } ${className}`}
      // className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-md focus:outline-none hover:bg-blue-600 ${
      //   disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
      // } ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
