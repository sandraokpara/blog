import { nanoid } from "nanoid"
import { NextAuthOptions, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import {
  createNewBlogUser,
  getBlogUserByEmail,
  publishBlogUser,
} from "./requests"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.username = token.username
        session.user.image = token?.picture

        const dbUser = await getBlogUserByEmail(token?.email)
        if (!dbUser) {
          const variables = {
            name: token.name ?? "",
            email: token.email ?? "",
            username: nanoid(10),
            image: token.picture ?? "",
            isSubscribed: false,
          }
          const newDbUser = await createNewBlogUser(variables)
          await publishBlogUser({ email: newDbUser?.email })
        }
      }

      return session
    },
    redirect() {
      return "/blog"
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)
