import { useCallback, useEffect, useState } from 'react';
import { IFetchModel } from '../../FetchModel';


export function useFetchData<T>(load: () => Promise<T[]>): IFetchModel<T> {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | undefined>();
  const [data, setData] = useState<T[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(undefined);
        const response = await load();
        setData(response)
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [])

  const removeElement = useCallback((element: T) => {
    // @ts-ignore
    const updatedElement = data.filter(r => r.id !== element.id);
    setData(updatedElement)
  }, [data, setData])

  const replaceElement = useCallback((element: T) => {
    // @ts-ignore
    const updatedElement = data.filter(r => r.id !== element.id);
    updatedElement.push(element);
    setData(updatedElement)
  }, [data, setData])

  return {
    isLoading,
    data: data,
    error,
    removeElement,
    replaceElement,
  }
}
