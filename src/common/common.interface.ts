export interface PaginationCommon<T> {
    data: T[];
    currentPage: number;
    totalPage: number;
    count: number;
}
