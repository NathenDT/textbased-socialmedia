import React, { useState, useRef } from 'react'

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string
}

export default function TextArea({ className, ...rest }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [height, setHeight] = useState<number | null>(null)

  const handleInput = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      setHeight(textarea.scrollHeight)
    }
  }

  return (
    <textarea
      ref={textareaRef}
      className={`resize-none border rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      style={{ height: height ? `${height}px` : 'auto' }}
      {...rest}
      onInput={handleInput}
    />
  )
}
