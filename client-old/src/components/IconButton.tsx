import React, { ButtonHTMLAttributes } from 'react'
import { IconType } from 'react-icons'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconType
  additionalClasses?: string
}

function IconButton({
  icon: Icon,
  additionalClasses,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={
        'inline-flex items-center justify-center rounded-md focus:outline-none p-2 ' +
        additionalClasses
      }
      {...props}
    >
      <Icon />
    </button>
  )
}

export default IconButton
