import { getCategories } from "@/lib/requests"

import HeaderClient from "./HeaderClient"

const Header = async ({}) => {
  const categories = await getCategories()
  return <HeaderClient categories={categories} />
}

export default Header
