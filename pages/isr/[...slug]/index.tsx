import { getAlgoliaCourseBySlug, getAlgoliaCourseData } from "@/lib/algolia"
import { getDiscoveryCourseByUUID } from "@/lib/discovery"
import { GetStaticProps } from "next"

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = Array.isArray(params?.slug) ? params?.slug?.join('/') : params?.slug ?? 'noslug';
  console.log(slug)
  const data = await getAlgoliaCourseData()
//   const algoliaCourse = await getAlgoliaCourseBySlug(slug)
  const discoveryCourse = await getDiscoveryCourseByUUID(data[slug])
  return {
    props: {
    //   algoliaCourse,
      discoveryCourse,
    },
    revalidate: 300,
  }
}

export default function Page(props: any) {
  return (
    <main>
      <h1>Next.js ISR Page</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </main>
  )
}
