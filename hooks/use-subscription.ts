import { startTransition, useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { z } from "zod"

import {
  CreateBlogUserResponseType,
  NewsletterSubValidator,
} from "@/types/validators"

import { toast } from "./use-toast"

interface SubscriptionProps {}

const useSubscription = () => {
  const router = useRouter()

  const { data: user } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`/api/user/get`)
      return data as CreateBlogUserResponseType
    },
    queryKey: ["subscription-status", router],
    enabled: true,
  })

  const { mutate: subscribe, isPending: isSubscribing } = useMutation({
    mutationFn: async (payload: z.infer<typeof NewsletterSubValidator>) => {
      const { data } = await axios.patch(`/api/user/subscribe`, payload)
      return data
    },
    onError: (err) => {
      console.log(err)
      if (err instanceof z.ZodError) {
        return toast({
          description: err.issues[0].message,
          variant: "destructive",
        })
      }
      return toast({
        title: "Something went wrong.",
        description:
          "There was an error subscribing to the newsletter. Hit me up sandraokpara8@gmail.com and I'll add you the old fashioned way.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      toast({
        description: "Thanks for subscribing!",
      })
      startTransition(() => {
        router.push(`/blog`)
        router.refresh()
      })
    },
  })

  return {
    subscribe,
    isSubscribing,
    isUserSubscribed: user?.isSubscribed,
  }
}

export default useSubscription
