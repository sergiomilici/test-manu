export interface IFetchModel<T> {
  isLoading: boolean;
  data: T[];
  error: any;
  removeData: (element: T) => void
}
