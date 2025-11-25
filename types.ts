export interface ThemeTextData {
  title: string;
  description: string;
  colorPalette: string[];
  musicPlaylist: string[];
  eventIdeas: string[];
  decorationTips: string[];
}

export enum AssetType {
  INVITATION = 'Convite',
  SHIRT = 'Camisa',
  FLAG = 'Bandeira',
  DECORATION = 'Decoração',
}

export interface GeneratedAsset {
  type: AssetType;
  imageUrl: string | null;
  isLoading: boolean;
}