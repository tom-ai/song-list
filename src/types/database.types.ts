// export type Json =
//   | string
//   | number
//   | boolean
//   | null
//   | { [key: string]: Json | undefined }
//   | Json[]

// export type Database = {
//   public: {
//     Tables: {
//       Genre: {
//         Row: {
//           created_at: string
//           id: number
//           name: string
//         }
//         Insert: {
//           created_at?: string
//           id?: number
//           name?: string
//         }
//         Update: {
//           created_at?: string
//           id?: number
//           name?: string
//         }
//         Relationships: []
//       }
//       GenreSong: {
//         Row: {
//           genre_id: number
//           song_id: number
//         }
//         Insert: {
//           genre_id: number
//           song_id?: number
//         }
//         Update: {
//           genre_id?: number
//           song_id?: number
//         }
//         Relationships: [
//           {
//             foreignKeyName: "GenreSong_genre_id_fkey"
//             columns: ["genre_id"]
//             isOneToOne: false
//             referencedRelation: "Genre"
//             referencedColumns: ["id"]
//           },
//           {
//             foreignKeyName: "GenreSong_song_id_fkey"
//             columns: ["song_id"]
//             isOneToOne: false
//             referencedRelation: "Song"
//             referencedColumns: ["song_id"]
//           },
//         ]
//       }
//       Playlist: {
//         Row: {
//           created_at: string
//           playlist_id: string
//           updated_at: string | null
//         }
//         Insert: {
//           created_at?: string
//           playlist_id?: string
//           updated_at?: string | null
//         }
//         Update: {
//           created_at?: string
//           playlist_id?: string
//           updated_at?: string | null
//         }
//         Relationships: []
//       }
//       PlaylistSong: {
//         Row: {
//           added_at: string | null
//           playlist_id: string
//           song_id: number
//         }
//         Insert: {
//           added_at?: string | null
//           playlist_id: string
//           song_id: number
//         }
//         Update: {
//           added_at?: string | null
//           playlist_id?: string
//           song_id?: number
//         }
//         Relationships: []
//       }
//       Song: {
//         Row: {
//           artist: string
//           created_at: string
//           song_id: number
//           title: string
//         }
//         Insert: {
//           artist: string
//           created_at?: string
//           song_id?: number
//           title: string
//         }
//         Update: {
//           artist?: string
//           created_at?: string
//           song_id?: number
//           title?: string
//         }
//         Relationships: []
//       }
//     }
//     Views: {
//       [_ in never]: never
//     }
//     Functions: {
//       [_ in never]: never
//     }
//     Enums: {
//       [_ in never]: never
//     }
//     CompositeTypes: {
//       [_ in never]: never
//     }
//   }
// }

// type PublicSchema = Database[Extract<keyof Database, "public">]

// export type Tables<
//   PublicTableNameOrOptions extends
//     | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
//     | { schema: keyof Database },
//   TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
//     ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
//         Database[PublicTableNameOrOptions["schema"]]["Views"])
//     : never = never,
// > = PublicTableNameOrOptions extends { schema: keyof Database }
//   ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
//       Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
//       Row: infer R
//     }
//     ? R
//     : never
//   : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
//         PublicSchema["Views"])
//     ? (PublicSchema["Tables"] &
//         PublicSchema["Views"])[PublicTableNameOrOptions] extends {
//         Row: infer R
//       }
//       ? R
//       : never
//     : never

// export type TablesInsert<
//   PublicTableNameOrOptions extends
//     | keyof PublicSchema["Tables"]
//     | { schema: keyof Database },
//   TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
//     ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
//     : never = never,
// > = PublicTableNameOrOptions extends { schema: keyof Database }
//   ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
//       Insert: infer I
//     }
//     ? I
//     : never
//   : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
//     ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
//         Insert: infer I
//       }
//       ? I
//       : never
//     : never

// export type TablesUpdate<
//   PublicTableNameOrOptions extends
//     | keyof PublicSchema["Tables"]
//     | { schema: keyof Database },
//   TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
//     ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
//     : never = never,
// > = PublicTableNameOrOptions extends { schema: keyof Database }
//   ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
//       Update: infer U
//     }
//     ? U
//     : never
//   : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
//     ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
//         Update: infer U
//       }
//       ? U
//       : never
//     : never

// export type Enums<
//   PublicEnumNameOrOptions extends
//     | keyof PublicSchema["Enums"]
//     | { schema: keyof Database },
//   EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
//     ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
//     : never = never,
// > = PublicEnumNameOrOptions extends { schema: keyof Database }
//   ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
//   : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
//     ? PublicSchema["Enums"][PublicEnumNameOrOptions]
//     : never

// export type CompositeTypes<
//   PublicCompositeTypeNameOrOptions extends
//     | keyof PublicSchema["CompositeTypes"]
//     | { schema: keyof Database },
//   CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
//     schema: keyof Database
//   }
//     ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
//     : never = never,
// > = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
//   ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
//   : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
//     ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
//     : never
