export type DiscoveryCourseType = {
  key: string;
  uuid: string;
  title: string;
  course_runs: CourseRun[];
  entitlements: Entitlement[];
  owners: Owner[];
  image: Image;
  short_description: string;
  type: string;
  url_slug: string;
  course_type: string;
  enterprise_subscription_inclusion: boolean;
  excluded_from_seo: boolean;
  excluded_from_search: boolean;
  full_description: string;
  level_type: string;
  subjects: Subject[];
  prerequisites: any[]; // Replace 'any' with a more specific type if known
  prerequisites_raw: string;
  expected_learning_items: any[]; // Replace 'any' with a more specific type if known
  video: Video;
  sponsors: any[]; // Replace 'any' with a more specific type if known
  modified: string;
  marketing_url: string;
  syllabus_raw: string;
  outcome: string;
  original_image: Image;
  card_image_url: string | null;
  canonical_course_run_key: string;
  extra_description: string | null;
  additional_information: string;
  additional_metadata: any | null; // Replace 'any' with a more specific type if known
  faq: string;
  learner_testimonials: string;
  enrollment_count: number;
  recent_enrollment_count: number;
  topics: any[]; // Replace 'any' with a more specific type if known
  key_for_reruns: string;
  url_slug_history: string[];
  url_redirects: string[];
  course_run_statuses: string[];
  editors: any[]; // Replace 'any' with a more specific type if known
  collaborators: any[]; // Replace 'any' with a more specific type if known
  skill_names: string[];
  skills: Skill[];
  organization_short_code_override: string;
  organization_logo_override_url: string | null;
  geolocation: Geolocation;
  location_restriction: any | null; // Replace 'any' with a more specific type if known
  in_year_value: InYearValue;
  product_source: ProductSource;
  data_modified_timestamp: string;
  watchers: any[]; // Replace 'any' with a more specific type if known
  programs: any[]; // Replace 'any' with a more specific type if known
  course_run_keys: string[];
  editable: boolean;
  advertised_course_run_uuid: string;
};

type CourseRun = {
  key: string;
  uuid: string;
  title: string;
  external_key: string | null;
  image: Image;
  short_description: string;
  marketing_url: string;
  seats: Seat[];
  start: string;
  end: string;
  go_live_date: string | null;
  enrollment_start: string | null;
  enrollment_end: string | null;
  weeks_to_complete: number;
  pacing_type: string;
  type: string;
  run_type: string;
  status: string;
  is_enrollable: boolean;
  is_marketable: boolean;
  availability: string;
  variant_id: string | null;
  course: string;
  full_description: string;
  announcement: string;
  video: Video;
  content_language: string;
  license: string;
  outcome: string;
  transcript_languages: string[];
  instructors: any[]; // Replace 'any' with a more specific type if known
  staff: StaffMember[];
  min_effort: number;
  max_effort: number;
  modified: string;
  level_type: string;
  mobile_available: boolean;
  hidden: boolean;
  reporting_type: string;
  eligible_for_financial_aid: boolean;
  first_enrollable_paid_seat_price: number;
  has_ofac_restrictions: boolean;
  ofac_comment: string;
  enrollment_count: number;
  recent_enrollment_count: number;
  expected_program_type: string | null;
  expected_program_name: string;
  course_uuid: string;
  estimated_hours: number;
  content_language_search_facet_name: string;
  enterprise_subscription_inclusion: boolean;
};

type Entitlement = {
  mode: string;
  price: string;
  currency: string;
  sku: string;
  expires: string | null;
};

type Owner = {
  uuid: string;
  key: string;
  name: string;
  auto_generate_course_run_keys: boolean;
  certificate_logo_image_url: string;
  logo_image_url: string;
  organization_hex_color: string | null;
  data_modified_timestamp: string | null;
  description: string;
  description_es: string;
  homepage_url: string | null;
  tags: string[];
  marketing_url: string;
  slug: string;
  banner_image_url: string;
  enterprise_subscription_inclusion: boolean;
};

type Image = {
  src: string;
  description: string | null;
  height: number | null;
  width: number | null;
};

type Seat = {
  type: string;
  price: string;
  currency: string;
  upgrade_deadline: string | null;
  upgrade_deadline_override: string | null;
  credit_provider: string | null;
  credit_hours: number | null;
  sku: string;
  bulk_sku: string | null;
};

type Video = {
  src: string;
  description: string | null;
  image: string | null;
};

type Subject = {
  name: string;
  subtitle: string;
  description: string;
  banner_image_url: string;
  card_image_url: string;
  slug: string;
  uuid: string;
};

type Skill = {
  name: string;
  description: string;
  category: {
    name: string;
  };
  subcategory: {
    name: string;
    category: {
      name: string;
    };
  };
};

type Geolocation = {
  lat: string;
  lng: string;
  location_name: string;
};

type InYearValue = {
  per_click_international: number;
  per_click_usa: number;
  per_lead_international: number;
  per_lead_usa: number;
};

type ProductSource = {
  name: string;
  slug: string;
  description: string;
};

type StaffMember = {
  uuid: string;
  salutation: string | null;
  given_name: string;
  family_name: string;
  bio: string;
  slug: string;
  position: {
    title: string;
    organization_name: string;
    organization_id: number | null;
    organization_override: string | null;
    organization_marketing_url: string | null;
    organization_uuid: string | null;
    organization_logo_image_url: string | null;
  };
  areas_of_expertise: any[]; // Replace 'any' with a more specific type if known
  profile_image: {
    medium: {
      url: string;
      width: number;
      height: number;
    };
  };
  works: any[]; // Replace 'any' with a more specific type if known
  urls: {
    facebook: string | null;
    twitter: string | null;
    blog: string | null;
  };
  urls_detailed: any[]; // Replace 'any' with a more specific type if known
  email: string | null;
  profile_image_url: string;
  major_works: string;
  published: boolean;
};


export const auth = async (clientId?: string, clientSecret?: string): Promise<string> => {
  if (!clientId || !clientSecret) {
    throw new Error('No edx client id or secret provided');
  }

  const url = 'https://courses.edx.org/oauth2/access_token';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    token_type: 'jwt',
  });

  const response = await fetch(url, {
    next: { revalidate: 3600 },
    method: 'POST',
    headers: headers,
    body: body,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
};

const addUrlParams = (url: string): URL => {
  const urlObj = new URL(url);
  const searchParams = urlObj.searchParams;
  searchParams.set('exclude_utm', '1');
  searchParams.set('format', 'json');
  searchParams.set('include_hidden_course_runs', '1');

  searchParams.set('omit', 'announcement');
  searchParams.append('omit', 'bannerImageUrl');
  searchParams.append('omit', 'canonical_course_run_key');
  searchParams.append('omit', 'description');
  searchParams.append('omit', 'eligible_for_financial_aid');
  searchParams.append('omit', 'external_key');
  searchParams.append('omit', 'extra_description');
  searchParams.append('omit', 'first_enrollable_paid_seat_price');
  searchParams.append('omit', 'go_live_date');
  searchParams.append('omit', 'instructors');
  searchParams.append('omit', 'license');
  searchParams.append('omit', 'marketing_slug');
  searchParams.append('omit', 'mobile_available');
  searchParams.append('omit', 'modified');
  searchParams.append('omit', 'name');
  searchParams.append('omit', 'original_image');
  searchParams.append('omit', 'reporting_type');
  return urlObj;
}

export const getDiscoveryCourseByUUID = async (uuid?: string): Promise<DiscoveryCourseType | null> => {
  if (!uuid) {
    return null;
  }
  console.log(`Getting course with uuid: ${uuid}`)
  const url = `https://discovery.edx.org/api/v1/courses/${uuid}`;
  const urlObj = addUrlParams(url);
  const accessToken = await auth(process.env.EDX_CLIENT_ID, process.env.EDX_CLIENT_SECRET);
  const response = await fetch(urlObj.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `JWT ${accessToken}`,
    },
  });

  const json = await response.json();
  if (response.ok) {
    return json;
  } else if (response.status === 404) {
    return null;
  } else {
    throw new Error(`HTTP error ${response.status}. ${json?.detail}`);
  }
};
