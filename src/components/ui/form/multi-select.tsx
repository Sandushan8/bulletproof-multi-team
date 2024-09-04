import { Controller, ControllerProps, Control } from 'react-hook-form';
import Select from 'react-select';

import { cn } from '@/utils/cn';

type Option = {
  label: string;
  value: string;
};
export type MultiSelectFieldProps = Pick<
  ControllerProps,
  'name' | 'defaultValue'
> & {
  control: Control<any>;
  options: Option[];
  label: string;
  className?: string;
  error?: string;
};

export const MultiSelect = (props: MultiSelectFieldProps) => {
  const { name, control, defaultValue, label, className, options, error } =
    props;
  return (
    <div>
      <label>{label}</label>
      <Controller
        name={name as any}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
          const selectedOptions = options.filter((option) =>
            (field?.value || []).includes(option.value),
          );
          return (
            <Select
              {...field}
              options={options}
              value={selectedOptions}
              isMulti
              className={cn(
                'block w-full rounded-md border-gray-600 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm',
                className,
              )}
              onChange={(selectedOption) => {
                const values = (selectedOption as Option[]).map(
                  (option) => option.value,
                );
                field.onChange(values);
              }}
            />
          );
        }}
      />
      {error && (
        <span className="text-sm font-semibold text-red-500">
          {error || 'Please select at least one team.'}
        </span>
      )}
    </div>
  );
};
