import { Dispatch, SetStateAction } from 'react';

export type ModalContextType = {
  deletingId: number | undefined
  setDeletingId: Dispatch<SetStateAction<number | undefined>>
  isCreating: boolean
  setIsCreating: Dispatch<SetStateAction<boolean>>
  editingId: number | undefined
  setEditingId: Dispatch<SetStateAction<number | undefined>>
}
