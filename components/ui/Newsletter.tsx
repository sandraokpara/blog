"use client"

import { startTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import * as z from "zod"

// import { NewsletterSubValidator } from "@/types/validators"
import { toast } from "@/hooks/use-toast"

import { Button } from "./Button"
import { Form, FormControl, FormField, FormItem } from "./Form"
import { Input } from "./Input"

const Newsletter = () => {
  const pathname = usePathname()
  const isNewsletterPage = pathname.startsWith("/newsletter")
  const router = useRouter()

  const NewsletterSubValidator = z.object({
    email: z.string().email(),
  })

  const form = useForm<z.infer<typeof NewsletterSubValidator>>({
    resolver: zodResolver(NewsletterSubValidator),
    defaultValues: {
      email: "",
    },
  })

  const { mutate: subscribe, isPending } = useMutation({
    mutationFn: async (payload: z.infer<typeof NewsletterSubValidator>) => {
      const { data } = await axios.patch(`/api/subscribe-user`, payload)
      return data
    },
    onError: (err) => {
      // eslint-disable-next-line no-console
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
        router.push(`/blog`);
        router.refresh()
      })
    }
  })

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((e) => subscribe(e))}
          className="space-y-4"
        >
          <h1 className="text-start text-xs font-medium uppercase">
            Newsletter
          </h1>
          <p
            className={`abyssinica ${
              isNewsletterPage ? "text-2xl lg:text-3xl" : ""
            }`}
          >
            This newsletter is a record of my journey as a writer, creator,
            photographer, youtuber, and a proud Nigerian Igbo woman. Delivered
            right to your inbox.
          </p>

          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-transparent px-0"
                      type="email"
                      placeholder="Your best email."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <hr className="border-t border-foreground dark:border-[#333333]" />
          </div>
          <Button
            isLoading={isPending}
            isMagnetic={true}
            size="thin"
            type="submit"
          >
            Subscribe
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Newsletter
