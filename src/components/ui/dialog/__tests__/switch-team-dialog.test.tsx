import { fireEvent, rtlRender, screen, waitFor } from '@/testing/test-utils';
import {
  SwtichTeamDialog,
  SwitchTeamDialogProps,
} from '../switch-team-dialog/switch-team-dialog';
import { useForm } from 'react-hook-form';
const mockStorage = vi.fn(() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();
beforeAll(() => {
  global.sessionStorage = mockStorage as unknown as Storage;
});
afterAll(() => {
  global.sessionStorage = window.sessionStorage;
});
const options = [
  { label: 'Team 1', value: 'team1' },
  { label: 'Team 2', value: 'team2' },
];
const TestComponent = (props: Partial<SwitchTeamDialogProps>) => {
  const { register, watch } = useForm<{
    teamId: string;
  }>();
  const defaultProps: SwitchTeamDialogProps = {
    confirmButtonText: 'Confirm',
    title: 'Switch Team',
    isOpenModal: true,
    onClose: vi.fn(),
    cancelButtonText: 'Cancel',
    register,
    watch,
    options,
    currentTeam: 'team1',
    ...props,
  };
  return <SwtichTeamDialog {...defaultProps} />;
};
test('should render dialog with teams and switch the team', async () => {
  const onClose = vi.fn();
  rtlRender(<TestComponent onClose={onClose} />);
  expect(screen.getByText('Switch Team')).toBeInTheDocument();
  expect(screen.getByDisplayValue('Team 1')).toBeInTheDocument();
  fireEvent.change(screen.getByRole('combobox'), {
    target: { value: 'team2' },
  });
  expect(screen.getByDisplayValue('Team 2')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Confirm'));
  await waitFor(() => {
    expect(mockStorage.setItem).toHaveBeenCalledWith('currentTeamId', 'team2');
  });
  expect(onClose).toHaveBeenCalled();
});
test('should show "No teams found" when there are no teams', () => {
  rtlRender(<TestComponent options={[]} />);
  expect(screen.getByText('No teams found')).toBeInTheDocument();
  const confirmButton = screen.getByRole('button', { name: /Confirm/i });
  expect(confirmButton).toBeInTheDocument();
  expect(confirmButton).toBeDisabled();
});
