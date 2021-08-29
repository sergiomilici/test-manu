export interface IFetchModel<T> {
  isLoading: boolean;
  data: T[];
  error: any;
  removeElement: (element: T) => void
  replaceElement: (element: T) => void
}
