import { Antic_Didone, Inter } from "next/font/google"

const variable = (variable: string) => {
  return `https://api.fontshare.com/v2/css?f[]=${variable}@400&display=swap`
}

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const anticDidone = Antic_Didone({ subsets: ["latin"], weight: "400" })

export const melodrama = {
  subsets: ["latin"],
  variable: variable(`melodrama`),
}
