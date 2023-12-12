import { getAlgoliaCourseBySlug, getAlgoliaCourseSlugs } from '@/lib/algolia';
import { getDiscoveryCourseByUUID } from "@/lib/discovery"

export async function generateStaticParams() {
  const slugs = await getAlgoliaCourseSlugs();
  return slugs.map((slug) => ({ slug: slug.split('/') }));
}

export default async function Page(props: any) {
  const slug = Array.isArray(props.params?.slug)
    ? props.params?.slug?.join('/')
    : props.params?.slug ?? 'noslug';
  const algoliaCourse = await getAlgoliaCourseBySlug(slug);
  const discoveryCourse = await getDiscoveryCourseByUUID(algoliaCourse?.uuid);
  return (
    <div>
      <h1>New router</h1>
      <pre>{JSON.stringify({
        algoliaCourse,
        discoveryCourse
      }, null, 2)}</pre>
    </div>
  );
}
