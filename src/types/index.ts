// Types imported from Groove App

export type PublicSong = {
	id: string
	title: string
	artist: string
}

export type PublicPlaylist = {
	id: string
	name: string
	slug: string
}

export type ListMeta = {
	total: number
	count?: number
}

export type PaginatedResponse<T> = {
	tenant: string
	meta: ListMeta
	items: T[]
}

export type PublicSongList = PaginatedResponse<PublicSong>
export type PublicPlaylistList = PaginatedResponse<PublicPlaylist>

/////

export type APIError = {
	error: {
		code: 'NO_TENANT' | 'TENANT_NOT_FOUND' | 'PLAYLIST_NOT_FOUND' | 'INTERNAL'
		message: string
	}
}
