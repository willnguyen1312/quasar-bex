export interface BookmarkTreeNode {
  id: string;
  title: string;
  parentId?: string;
  index?: number;
  dateAdded?: number;
  dateGroupModified?: number;
  url?: string;
  children?: BookmarkTreeNode[];
}

interface EventResponse {
  eventResponseKey: string;
}

export type InitEventResponse = {
  data: BookmarkTreeNode[];
} & EventResponse;

export interface QTreeNode {
  label?: string;
  icon?: string;
  iconColor?: string;
  img?: string;
  avatar?: string;
  children?: QTreeNode[];
  disabled?: boolean;
  expandable?: boolean;
  selectable?: boolean;
  handler?: (node: QTreeNode) => void;
  tickable?: boolean;
  noTick?: boolean;
  tickStrategy?: boolean;
  lazy?: boolean;
  header?: string;
  body?: string;
}
