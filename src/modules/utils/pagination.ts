export default {
  hasMore: (total: number, skip: number, take: number): boolean => (total - (skip + take)) > 0,
  page: (skip: number, take: number): number => (skip / take) + 1,
};
