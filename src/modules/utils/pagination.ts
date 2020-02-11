export interface PaginationUtils {
  hasMore: (total: number, skip: number, take: number) => boolean;
  page: (skip: number, take: number) => number;
}

const pagination: PaginationUtils = {
  hasMore: (total: number, skip: number, take: number): boolean => (total - (skip + take)) > 0,
  page: (skip: number, take: number): number => (skip / take) + 1,
};

export default pagination;
