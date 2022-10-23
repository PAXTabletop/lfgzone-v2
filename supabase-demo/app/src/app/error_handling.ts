import { pipe, OperatorFunction, map, Observable } from 'rxjs';
import { PostgrestResponse } from '@supabase/supabase-js';

export const handleResponseBase = <T, R extends T | T[] | undefined>(
  handleData?: (data: T[] | null) => R,
  defaultVal?: R
): OperatorFunction<PostgrestResponse<T>, R> => {
  return pipe<Observable<PostgrestResponse<T>>, Observable<R>>(
    map((resp) => {
      if (resp.error) {
        alert(resp.error.message);
      }
      if (handleData) {
        return handleData(resp.data);
      }
      if (!defaultVal) {
        return resp.data as R;
      }
      return (resp.data as R) || defaultVal;
    })
  );
};

export const handleListResponse = <T>(): OperatorFunction<
  PostgrestResponse<T>,
  T[]
> => {
  return pipe(handleResponseBase<T, T[]>((data) => data || []));
};

export const handleSingleResponse = <T>(): OperatorFunction<
  PostgrestResponse<T>,
  T | undefined
> => {
  return pipe(handleResponseBase<T, T | undefined>((data) => data?.[0]));
};
