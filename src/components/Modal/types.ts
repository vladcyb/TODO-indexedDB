import { Dispatch, SetStateAction } from 'react';

export type ModalContextType = {
  deletingId: string
  setDeletingId: Dispatch<SetStateAction<string>>
  isCreating: boolean
  setIsCreating: Dispatch<SetStateAction<boolean>>
  editingId: string
  setEditingId: Dispatch<SetStateAction<string>>
}
