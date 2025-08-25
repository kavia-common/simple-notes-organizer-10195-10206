export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number; // epoch ms
  updatedAt: number; // epoch ms
  color?: string; // optional note color highlight
}
