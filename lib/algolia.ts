import algoliasearch from "algoliasearch";
import { createFetchRequester } from '@algolia/requester-fetch';

export type AlgoliaCourseType = {
  title: string;
  partner: string[];
  partner_keys: string[];
  product_source: string;
  primary_description: string;
  secondary_description: string;
  tertiary_description: string;
  tags: string[];
  availability: string[];
  subject: string[];
  level: string[];
  language: string[];
  product: string;
  program_type: string[];
  staff: string[];
  allowed_in: string[];
  blocked_in: string[];
  subscription_eligible: null | boolean; // Assuming it can be boolean or null
  subscription_prices: any[]; // Specify the type if you know the structure
  learning_type: string[];
  availability_rank: number;
  recent_enrollment_count: number;
  value_per_click_usa: number;
  value_per_click_international: number;
  value_per_lead_usa: number;
  value_per_lead_international: number;
  marketing_url: string;
  card_image_url: string;
  uuid: string;
  weeks_to_complete: number;
  max_effort: number;
  min_effort: number;
  organization_short_code_override: string;
  organization_logo_override: null | string; // Assuming it can be string or null
  meta_title: null | string; // Assuming it can be string or null
  display_on_org_page: boolean;
  external_url: null | string; // Assuming it can be string or null
  active_run_key: string;
  active_run_start: number;
  active_run_type: string;
  owners: Owner[];
  course_titles: null | string[]; // Assuming it can be array of strings or null
  skills: Skill[];
  contentful_fields: null | any; // Specify the type if you know the structure
  product_key: string;
  product_marketing_video_url: string;
  _geoloc: {
    lat: number;
    lng: number;
  };
  objectID: string;
  _snippetResult: any; // Specify the type if you know the structure
  _highlightResult: any; // Specify the type if you know the structure
  _rankingInfo: any; // Specify the type if you know the structure
};

type Owner = {
  key: string;
  logoImageUrl: string;
  name: string;
};

type Skill = {
  skill: string;
  category: string;
  subcategory: string;
};


export const getAlgoliaCourseBySlug = async (slug: string) => {
  if (!slug) {
    return null;
  }
  console.log('slug', slug);
   console.log('process.env.ALGOLIA_APP_ID', process.env.ALGOLIA_APP_ID);
    console.log('process.env.ALGOLIA_ADMIN_KEY', process.env.ALGOLIA_ADMIN_KEY);
  const client = algoliasearch(process.env.ALGOLIA_APP_ID || '', process.env.ALGOLIA_ADMIN_KEY || '', {
    requester: createFetchRequester(),
  });
  const productIndex = client.initIndex(process.env.ALGOLIA_INDEX_NAME || '');
  const slugWithDomain = `https://www.edx.org/${slug}`;
  console.log('slugWithDomain', slugWithDomain);
  const response = await productIndex.search<AlgoliaCourseType>('', {
    filters: `marketing_url: "${slugWithDomain}"`,

  });
  return response?.hits?.at(0);
}

export const getAlgoliaCourseSlugs = async () => {
  const client = algoliasearch(process.env.ALGOLIA_APP_ID || '', process.env.ALGOLIA_ADMIN_KEY || '', {
    requester: createFetchRequester(), // to use Next.js fetch cache
  });
  const productIndex = client.initIndex(process.env.ALGOLIA_INDEX_NAME || '');
  productIndex.setSettings({
    paginationLimitedTo: 10000,
  })
  const hits = [];
  let page = 0;
  let nbPages;
  do {
    const response = await productIndex.search<{
      filters: 'product:Course',
      marketing_url: string;
    }>('', {
      attributesToRetrieve: ['marketing_url', 'uuid'],
      page,
      hitsPerPage: 10,
    });
    page = response.page + 1;
    nbPages = response.nbPages;
    hits.push(...response.hits);
  } while (page < 1);
  const uuid = hits?.map((hit) => hit.uuid);
  console.log('uuid', uuid);
  const slugs = hits?.map((hit) => hit.marketing_url.replace('https://www.edx.org/', ''));

  return slugs;
}

export const getAlgoliaCourseData = async () => {
    const client = algoliasearch(process.env.ALGOLIA_APP_ID || '', process.env.ALGOLIA_ADMIN_KEY || '', {
      requester: createFetchRequester(), // to use Next.js fetch cache
    });
    const productIndex = client.initIndex(process.env.ALGOLIA_INDEX_NAME || '');
    productIndex.setSettings({
      paginationLimitedTo: 10000,
    })
    const data = {};
    let page = 0;
    let nbPages;
    do {
      const response = await productIndex.search<{
        filters: 'product:Course',
        marketing_url: string;
        uuid: string;
      }>('', {
        attributesToRetrieve: ['marketing_url', 'uuid'],
        page,
        hitsPerPage: 10,
      });
      page = response.page + 1;
      nbPages = response.nbPages;
      response.hits.forEach((hit) => {
        data[hit.marketing_url.replace('https://www.edx.org/', '')] = hit.uuid;
      });
    } while (page < 1);
  
    console.log('data lol', data);
    return data;
  }