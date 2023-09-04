export interface PaginationType {
  next: number | null;
  limit: number | null;
  current: number | null;
  previous: number | null;
  total_pages: number | null;
  total_count: number | null;
}