import { useState } from "react"
import { signIn } from "next-auth/react"

import { toast } from "./use-toast"

interface AuthProps {}

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn("google")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem logging in with Google",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    loginWithGoogle,
    isLoading,
  }
}

export default useAuth
