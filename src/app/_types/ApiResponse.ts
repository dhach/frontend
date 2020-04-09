import { ApiResponseError } from './ApiResponseError';


export interface ApiResponse {

  status: number;

  data?: any;

  error?: ApiResponseError;
}
