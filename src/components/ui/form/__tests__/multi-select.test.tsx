import { Control, useForm } from 'react-hook-form';
import { rtlRender, screen, fireEvent } from '@/testing/test-utils';
import { MultiSelect, MultiSelectFieldProps } from '../multi-select';

type FormValues = {
  multiSelect: string[];
};

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const TestComponent = (props: Partial<MultiSelectFieldProps>) => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      multiSelect: [],
    },
  });
  const defaultProps: MultiSelectFieldProps = {
    control,
    options,
    label: 'Select Options',
    name: 'multiSelect',
    ...props,
  };
  return <MultiSelect {...defaultProps} />;
};

test('should render and select multiple options in MultiSelect component', async () => {
  rtlRender(<TestComponent />);

  const selectInput = screen.getByRole('combobox');
  fireEvent.keyDown(selectInput, { key: 'ArrowDown' });
  const option1 = await screen.findByText('Option 1');
  fireEvent.click(option1);

  fireEvent.keyDown(selectInput, { key: 'ArrowDown' });
  const option2 = await screen.findByText('Option 2');
  fireEvent.click(option2);

  expect(screen.getByText('Option 1')).toBeInTheDocument();
  expect(screen.getByText('Option 2')).toBeInTheDocument();
});

test('should show No options found when there are no options', async () => {
  rtlRender(<TestComponent options={[]} />);

  const selectInput = screen.getByRole('combobox');

  fireEvent.keyDown(selectInput, { key: 'ArrowDown' });
  expect(screen.getByText('No options')).toBeInTheDocument();
});

test('should be able to remove selected elements', async () => {
  rtlRender(<TestComponent />);

  const selectInput = screen.getByRole('combobox');

  fireEvent.keyDown(selectInput, { key: 'ArrowDown' });
  const option1 = await screen.findByText('Option 1');
  fireEvent.click(option1);

  fireEvent.keyDown(selectInput, { key: 'ArrowDown' });
  const option2 = await screen.findByText('Option 2');
  fireEvent.click(option2);

  expect(screen.getByText('Option 1')).toBeInTheDocument();
  expect(screen.getByText('Option 2')).toBeInTheDocument();
  fireEvent.click(screen.getByLabelText('Remove Option 1'));
  expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  expect(screen.getByText('Option 2')).toBeInTheDocument();
});
