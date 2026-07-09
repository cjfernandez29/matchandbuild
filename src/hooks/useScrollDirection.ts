import { useState, useEffect } from 'react'

export function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 100) {
        setIsVisible(false)
      } else if (currentScrollY < 50) {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return isVisible
}
