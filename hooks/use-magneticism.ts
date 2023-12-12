"use client"
import React, { ReactElement, useEffect, useRef } from "react"
import gsap from "gsap"

interface IndexProps {
  children: ReactElement
}

export default function useMagneticism({ children }: IndexProps): ReactElement {
  const magnetic = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentMagnetic = magnetic.current

    if (!currentMagnetic) {
      return 
    }

    const xTo = gsap.quickTo(currentMagnetic, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    })
    const yTo = gsap.quickTo(currentMagnetic, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    })

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const rect = currentMagnetic.getBoundingClientRect()
      if (rect) {
        const { height, width, left, top } = rect
        const x = clientX - (left + width / 2)
        const y = clientY - (top + height / 2)
        xTo(x)
        yTo(y)
      }
    }

    const mouseLeave = () => {
      gsap.to(currentMagnetic, { x: 0, duration: 1 })
      gsap.to(currentMagnetic, { y: 0, duration: 1 })
      xTo(0)
      yTo(0)
    }

    currentMagnetic.addEventListener("mousemove", mouseMove)
    currentMagnetic.addEventListener("mouseleave", mouseLeave)

    return () => {
      currentMagnetic.removeEventListener("mousemove", mouseMove)
      currentMagnetic.removeEventListener("mouseleave", mouseLeave)
    }
  }, [])

  return React.cloneElement(children, { ref: magnetic })
}
