import { Grid } from "@/components/ui/Grid"

interface CategoryPageProps {
  params: {
    categoryId: string
  }
}

export const dynamic = "force-dynamic"

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <section className="">
      {/* @ts-expect-error */}
      <Grid categoryId={params.categoryId} isCategory={true} />
    </section>
  )
}
