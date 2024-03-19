type ServiceResponse<T> = {
  success: boolean;
  message: string;
  responseData: T;
  statusCode: number;
};

interface MetaData {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export type { ServiceResponse, MetaData };
