export class PaginatedResponse<T> {
    data: T[];
    pagination: {
        total: number;
        currentPageTotal: number;
        limit: number;
        totalPages: number;
        page: number;
    };
}