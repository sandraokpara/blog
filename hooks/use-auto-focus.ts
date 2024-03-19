import { useCallback } from "react"

const useAutoFocus = () => {
  const ref = useCallback((e: any) => {
    if (e) {
      e.focus()
    }
  }, [])

  return ref
}

export default useAutoFocus
