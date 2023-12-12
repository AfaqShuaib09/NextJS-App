import { getAlgoliaCourseBySlug, getAlgoliaCourseData } from '@/lib/algolia';
import { getDiscoveryCourseByUUID } from '@/lib/discovery';
import type { GetServerSideProps } from 'next';

type Repo = {
  name: string;
  stargazers_count: number;
};

export const getServerSideProps:GetServerSideProps = (async ({ params }) => {
  const slug = Array.isArray(params?.slug)
    ? params?.slug?.join('/')
    : params?.slug ?? 'noslug';
//   const algoliaCourse = await getAlgoliaCourseBySlug(slug);
    const data = await getAlgoliaCourseData();
  const discoveryCourse = await getDiscoveryCourseByUUID(data[slug]);
  return {
    props: {
    //   algoliaCourse,
      discoveryCourse,
    },
  };
});

export default function Page(props: any) {
  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Button
      </button>

      <h1>Next.js SSR Page</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}
