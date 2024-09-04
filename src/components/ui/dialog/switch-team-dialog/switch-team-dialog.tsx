import { Info } from 'lucide-react';
import * as React from 'react';
import { useEffect } from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { useDisclosure } from '@/hooks/use-disclosure';

import { Select } from '../../form';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../dialog';

type SwitchTeamDialogFormProps = {
  teamId: string;
};

export type SwitchTeamDialogProps = {
  confirmButtonText: string;
  title: string;
  isOpenModal: boolean;
  onClose: () => void;
  cancelButtonText?: string;
  register: UseFormRegister<SwitchTeamDialogFormProps>;
  watch: UseFormWatch<SwitchTeamDialogFormProps>;
  options: Options[];
  currentTeam: string;
};

type Options = {
  label: string;
  value: string;
};

export const SwtichTeamDialog = ({
  confirmButtonText,
  title,
  cancelButtonText = 'Cancel',
  isOpenModal,
  onClose,
  register,
  watch,
  options,
  currentTeam,
}: SwitchTeamDialogProps) => {
  const { close, open } = useDisclosure();
  const cancelButtonRef = React.useRef(null);

  useEffect(() => {
    if (isOpenModal) {
      open();
    } else {
      close();
    }
  }, [close, isOpenModal, open]);

  return (
    <Dialog
      open={isOpenModal}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex">
          <DialogTitle className="flex items-center gap-2">
            <Info className="size-6 text-blue-600" aria-hidden="true" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          {options.length !== 0 ? (
            <Select
              defaultValue={currentTeam}
              options={options}
              registration={register('teamId')}
            />
          ) : (
            'No teams found'
          )}
        </div>

        <DialogFooter>
          <Button
            ref={cancelButtonRef}
            variant="default"
            disabled={!options.length}
            onClick={() => {
              sessionStorage.setItem('currentTeamId', watch().teamId);
              onClose();
            }}
          >
            {confirmButtonText}
          </Button>
          <Button ref={cancelButtonRef} variant="outline" onClick={onClose}>
            {cancelButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
