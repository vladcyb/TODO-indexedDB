import { Dispatch, SetStateAction, useState } from 'react';

export type GettersType = {
  isLoading: boolean
}

export type SettersType = {
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

type HookType = [GettersType, SettersType]

export const useSetters = (): HookType => {
  const [isLoading, setIsLoading] = useState(false);

  const getters: GettersType = {
    isLoading,
  };

  const setters: SettersType = {
    setIsLoading,
  };

  return [getters, setters];
};
