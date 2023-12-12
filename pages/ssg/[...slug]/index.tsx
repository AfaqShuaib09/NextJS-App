import { getAlgoliaCourseBySlug, getAlgoliaCourseSlugs, getAlgoliaCourseData } from '@/lib/algolia';
import { getDiscoveryCourseByUUID } from '@/lib/discovery';
import { GetStaticProps } from 'next/types';

export const getStaticPaths = async () => {
  const slugs = await getAlgoliaCourseSlugs();
  console.log(slugs);
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug.split('/') } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = Array.isArray(params?.slug) ? params?.slug?.join('/') : params?.slug ?? 'noslug';
  const data = await getAlgoliaCourseData();
//   const algoliaCourse = await getAlgoliaCourseBySlug(slug);
  const discoveryCourse = await getDiscoveryCourseByUUID(data[slug]);
  return {
    props: {
    //   algoliaCourse,
      discoveryCourse,
    },
  };
};

export default function Page(props: any) {
  return (
    <div>
      <h1>Next.js SSG Page</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}
