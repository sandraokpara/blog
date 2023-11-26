import { Abyssinica_SIL } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

const abyssinica = Abyssinica_SIL({
  subsets: ["latin"],
  weight: "400",
})

export { GeistMono, GeistSans, abyssinica }
