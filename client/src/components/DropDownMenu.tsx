import React, { useState, useEffect, useRef } from 'react'

type Props = {
  children: React.ReactNode
  ButtonChild: React.ReactNode
}

export default function DropdownMenu({ children, ButtonChild }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {ButtonChild}
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
