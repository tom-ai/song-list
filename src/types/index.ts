// Types imported from Groove App

export type PublicSong = {
  id: string;
  title: string;
  artist: string;
  tags: string[];
};

export type PublicTag = {
  tag: string;
  count: number;
};

export type ListMeta = {
  total: number;
  count?: number;
};

export type PaginatedResponse<T> = {
  tenant: string;
  meta: ListMeta;
  items: T[];
};

export type PublicSongList = PaginatedResponse<PublicSong>;
export type PublicTagList = PaginatedResponse<PublicTag>;

/////

export type APIError = {
  error: {
    code: 'NO_TENANT' | 'TENANT_NOT_FOUND' | 'INTERNAL';
    message: string;
  };
};
