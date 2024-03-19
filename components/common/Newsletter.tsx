"use client"

import { usePathname } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "./Button"
import { Form, FormControl, FormField, FormItem } from "./Form"
import { Input } from "./Input"
import useSubscription from "@/hooks/use-subscription";

const Newsletter = () => {
  const pathname = usePathname()
  const isNewsletterPage = pathname.startsWith("/newsletter")
  const {subscribe, isSubscribing} = useSubscription()

  const NewsletterSubValidator = z.object({
    email: z.string().email(),
  })

  const form = useForm<z.infer<typeof NewsletterSubValidator>>({
    resolver: zodResolver(NewsletterSubValidator),
    defaultValues: {
      email: "",
    },
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
            {isNewsletterPage
              ? "This newsletter is a record of my journey as a writer, creator, photographer, youtuber, and a proud Nigerian Igbo woman. Subscribe to stay updated on new blogposts and events, I don't spam!"
              : "Subscribe to my newsletter to stay updated on new blogposts and events, I don't spam!"}
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
            isLoading={isSubscribing}
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
