import React, { useRef, useCallback, useLayoutEffect } from 'react'

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string
}

export default function TextArea({ className, value, ...rest }: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement>()
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea)
    textAreaRef.current = textArea
  }, [])

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current)
  }, [value])

  return (
    <textarea
      ref={inputRef}
      value={value}
      className={`resize-none border rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...rest}
    />
  )
}

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return
  textArea.style.height = 'auto'
  textArea.style.height = `${textArea.scrollHeight}px`
}
