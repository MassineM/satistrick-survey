// * Helpers
export type Distribute<T> = {
  [P in T as `my${Capitalize<P & string>}`]: never;
};
export type Rename<T, K extends keyof T, N extends string> = Pick<
  T,
  Exclude<keyof T, K>
> & { [P in N]: T[K] };

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type OmitBy<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PartialBy<T, K extends keyof T> = OmitBy<T, K> &
  Partial<Pick<T, K>>;
export type Country = { name: string; iso: string };
export type FormEvent = React.FormEvent<HTMLFormElement>;
export type ChangeEvent<T = HTMLInputElement | HTMLTextAreaElement> =
  React.ChangeEvent<T>;
export type Error = {
  shown?: boolean;
  message: Record<"fr" | "en", string>;
};

export type GenderTypeKey = "male" | "female" | "other";
export type Locale = "fr" | "us";

export type Pagination<T> = {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type SelectedOption = {
  value: string;
  label: string;
};

export type CheckedLanguage = {
  checked?: boolean;
  color?: string;
  codes?: string[];
};

export interface Session {
  status: "success";
  token: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  surname: string;
  phone: any;
  description: any;
  mail_notifications: number;
  gender: any;
  birthday: any;
  avatar_path: any;
}

// * API Utils
export type ResponseError = {
  code: number;
  status: "error";
  error: string;
};

export type ResponseApi<T = any, K extends string = "", M = any> =
  | {
      status: "success";
      data: T;
      [key: string]: M;
    }
  | ResponseError;

// * Business Categories
export interface BusinessCategoriesResponse {
  status: string;
  current_page: number;
  data: Category[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface Category {
  id: number;
  name: string;
  iconUrl: string;
  types: CategoryType[];
}

export interface CategoryType {
  id: number;
  name: string;
  imageUrl: string;
}

// * Customers
export interface CustomersResponse {
  status: string;
  current_page: number;
  data: Customer[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface Customer {
  id: number;
  name: string;
  nickname: string;
  phone: string;
  email: string;
  ageAlias: string;
  genderAlias: string;
  businessName: string;
  satisfaction: string;
}

// * Businesses
export interface BusinessesResponse {
  status: string;
  current_page: number;
  data: Business[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface Business {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  google_link: string;
  facebook_link: string;
  instagram_link: string;
  coverUrl: string;
  campaigns: Campaign[];
}

// * Services Areas
export type ServiceAreasResponse = Pagination<ServiceArea>;

export interface ServiceArea {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
    is_active: number;
    is_pinned: number;
    sort_order: number;
    created_at: string;
    updated_at: string;
  };
}

// * Languages
export type LanguagesResponse = Pagination<Language>;

export interface Language {
  id: number;
  name: string;
  isoCodes: string[];
  iso_code: string;
  is_active: number;
  color: string;
  is_pinned: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// * Campaigns
export type CampaignsResponse = Pagination<Campaign>;
export interface Campaign {
  business_id: number;
  created_at: string;
  id: number;
  is_active: number;
  is_pinned: number;
  name: string;
  shorter_link: any;
  sort_order: number;
  template_type: any;
  rating_type: any;
  updated_at: string;
  image_path?: string;
  languages: Language[];
  service_areas: ServiceArea[];
}

// * Loyalty Programs ( Coupons code )
export interface LoyaltyProgramResponse {
  status: string;
  loyaltyPrograms: LoyaltyProgram[];
}

export type CreateLoyaltyProgramResponse = Rename<
  ResponseApi<LoyaltyProgram>,
  "data",
  "loyaltyProgram"
>;

export interface LoyaltyProgram {
  id: number;
  name: any;
  description: any;
  age: any;
  gender: any;
  suffix: any;
  validity: any;
  quantity: any;
  win_round: any;
  imageUrl: string;
  type: number;
  campaign: Campaign;
  reduction: any;
  is_active: 0 | 1;
}
