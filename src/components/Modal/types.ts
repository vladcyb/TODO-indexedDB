import { Dispatch, SetStateAction } from 'react';

export type ModalContextType = {
  deletingId: number
  setDeletingId: Dispatch<SetStateAction<number>>
  isCreating: boolean
  setIsCreating: Dispatch<SetStateAction<boolean>>
  editingId: number
  setEditingId: Dispatch<SetStateAction<number>>
}
