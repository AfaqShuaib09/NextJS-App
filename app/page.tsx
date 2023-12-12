import { getAlgoliaCourseSlugs } from '@/lib/algolia';
import Link from 'next/link';
import React from 'react';

export default async function Page() {
  const algoliaSlugs = await getAlgoliaCourseSlugs();

  return (
    <main>
      <h1>Next.js tests</h1>
      <ol>
        {algoliaSlugs.map((slug) => (
          <li key={slug}>
            {slug}
            <ul>
              <li>
                <Link href={`/router/${slug}`}>router</Link>
              </li>
              <li>
                <Link href={`/isr/${slug}`}>isr</Link>
              </li>
              <li>
                <Link href={`/ssg/${slug}`}>ssg</Link>
              </li>
              <li>
                <Link href={`/ssr/${slug}`}>ssr</Link>
              </li>
            </ul>
          </li>
        ))}
      </ol>
    </main>
  );
}
