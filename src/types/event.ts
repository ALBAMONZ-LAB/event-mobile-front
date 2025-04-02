export type PageJsonBodyItemType = 'image' | 'button' | 'carousel' | 'floatingButton' | 'custom';

export interface IconType {
  iconName: string;
  size: number;
}

export interface StyleConfig {
  padding: string;
  margin: string;
  background: string;
  width: string;
  height: string;
  fontSize: string;
  border: string;
  borderRadius: string;
  color: string;
  display: string;

  [key: string]: string;
}

export interface PageJsonContentsItem {
  src?: string;
  text?: string;
  icon?: IconType;
  style: StyleConfig;

  [key: string]: unknown;
}

export interface PageBodyType {
  sectionType: PageJsonBodyItemType;
  sectionStyle: Partial<StyleConfig>;
  orderNo: number;
  contents: PageJsonContentsItem;
}

export interface PageJson {
  header: string;
  body?: PageBodyType[];
  footer?: Omit<PageBodyType, 'orderNo' | 'sectionType'>;
}
