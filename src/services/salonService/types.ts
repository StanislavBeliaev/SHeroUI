export type SizeType = 'SMALLEST' | 'SMALLER' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'LARGER' | 'LARGEST';

export interface Currency {
  id: number;
  code: string;
  sign: string;
  exchangeRate: number;
}

export interface OnlineReservationStatus {
  available: boolean;
  isMaster: boolean;
  availableMasterIds: number[];
}

export interface SalonItem {
  id: number;
  sizeType: SizeType;
  singleMasterId: number | null;
  currency: Currency;
  distance: number | null;
  single: boolean;
  name: string;
  surname: string | null;
  starCount: number;
  starAverage: number;
  status: string;
  description: string;
  lat: number;
  lng: number;
  smallAvatar: string;
  bigAvatar: string;
  contactAddress: string;
  dynamic_link: string | null;
  demo: boolean;
  deleted: boolean;
  contractId: number | null;
  contractUploadLock: boolean;
  contactPhone: string;
  hideSuccessModeration: boolean;
  hidden: boolean;
  isWorkTimeDefault: boolean | null;
  onlineReservation: boolean;
  slug: string;
  distanceToMetro: number | null;
  updatedAt: string | null;
  onlineReservationStatus: OnlineReservationStatus;
}

export interface SalonsLoaded {
  activeCategory: number;
  page: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  content: SalonItem[];
}

export type SortBy = 'PRICE' | 'RATING' | 'REVIEWS' | 'DISTANCE' | 'NAME' | 'UPDATED';

export type SalonType = 'SALON' | 'MASTER' | 'SELFEMPLOYED';

export type ModerationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface NumberRange {
  startNumber: number;
  endNumber: number;
}

export interface SalonFiltering {
  registrationDateRange?: DateRange;
  ratingRange?: NumberRange;
  salonType?: SalonType;
  moderationStatus?: ModerationStatus;
  onlineReservation?: boolean;
  cities?: number[];
}

export interface SalonSorting {
  registrationDate?: boolean;
  name?: boolean;
  rating?: boolean;
  reviews?: boolean;
  loyaltyPrograms?: boolean;
  promocodes?: boolean;
  mailings?: boolean;
  orders?: boolean;
  cancellations?: boolean;
  clients?: boolean;
  shares?: boolean;
  views?: boolean;
}

export interface GetSalonsParams {
  page?: number;
  size?: number;
  categoryId?: number[];
  categorySlug?: string[];
  brandId?: string[];
  metroId?: number;
  metroSlug?: string;
  metroIds?: number[];
  regionSlug?: string;
  regionIds?: number[];
  sizeType?: SizeType;
  cityId?: number;
  query?: string;
  status?: string;
  active?: boolean;
  isOpen?: boolean;
  types?: SalonType[];
  userLat?: number;
  userLng?: number;
  date?: string;
  sortBy?: SortBy;
  minUpdateDate?: string;
  salonFiltering?: SalonFiltering;
  salonSorting?: SalonSorting;
  liked?: boolean;
  withMinmaxServicePrice?: boolean;
  arrayBounds?: number[];
  salonTypeIds?: number[];
  [key: string]: any;
}
