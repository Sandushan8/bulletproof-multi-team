import { useForm } from 'react-hook-form';

// eslint-disable-next-line import/no-cycle
import { SwtichTeamDialog } from '@/components/ui/dialog/switch-team-dialog/switch-team-dialog';

type SwitchTeamProps = {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentTeam: string;
};

type SwitchTeamDialogFormProps = {
  teamId: string;
};

type StoredTeamsProps = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
};

export const SwitchTeam = ({
  isOpenModal,
  setIsOpenModal,
  currentTeam,
}: SwitchTeamProps) => {
  const { register, watch } = useForm<SwitchTeamDialogFormProps>();
  const getTeams = sessionStorage.getItem('selectedTeamIds');
  const storedTeams = getTeams && JSON.parse(getTeams);
  console.log(storedTeams);
  return (
    <SwtichTeamDialog
      title={'Switch Team'}
      confirmButtonText={'Switch'}
      isOpenModal={isOpenModal}
      options={(storedTeams || [])?.map((item: StoredTeamsProps) => {
        return { label: item.name, value: item.id };
      })}
      onClose={() => setIsOpenModal(false)}
      register={register}
      watch={watch}
      currentTeam={currentTeam}
    />
  );
};
