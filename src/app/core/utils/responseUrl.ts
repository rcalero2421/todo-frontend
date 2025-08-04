export interface ResponseI<T> {
  status: number;
  message: string;
  accessToken?: string;
  data: T;
}

export interface ResponseArrayI<T> {
  status: number;
  message: string;
  accessToken?: string;
  data: T[];
}