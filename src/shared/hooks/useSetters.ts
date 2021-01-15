import { Dispatch, SetStateAction, useState } from 'react';

export type GettersType = {
  isLoading: boolean
}

export type SettersType = {
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

type HookType = [GettersType, SettersType]

export const useSetters = (initialLoading = false): HookType => {
  const [isLoading, setIsLoading] = useState(initialLoading);

  const getters: GettersType = {
    isLoading,
  };

  const setters: SettersType = {
    setIsLoading,
  };

  return [getters, setters];
};
