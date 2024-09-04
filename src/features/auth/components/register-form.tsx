import * as React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Form, Input, Label, Switch } from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/form/multi-select';
import { useRegister, registerInputSchema } from '@/lib/auth';
import { Team } from '@/types/api';

type RegisterFormProps = {
  onSuccess: () => void;
  chooseTeam: boolean;
  setChooseTeam: () => void;
  teams?: Team[];
};

export const RegisterForm = ({
  onSuccess,
  chooseTeam,
  setChooseTeam,
  teams,
}: RegisterFormProps) => {
  const registering = useRegister({ onSuccess });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <div>
      <Form
        onSubmit={(values) => {
          const selectedTeams = teams?.filter(
            (team) => values.teamId && values.teamId.includes(team.id),
          );
          sessionStorage.setItem(
            'selectedTeamIds',
            JSON.stringify(selectedTeams),
          );
          registering.mutate(values);
        }}
        schema={registerInputSchema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState, control }) => (
          <>
            <Input
              type="text"
              label="First Name"
              error={formState.errors['firstName']}
              registration={register('firstName')}
            />
            <Input
              type="text"
              label="Last Name"
              error={formState.errors['lastName']}
              registration={register('lastName')}
            />
            <Input
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <Input
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />

            <div className="flex items-center space-x-2">
              <Switch
                checked={chooseTeam}
                onCheckedChange={setChooseTeam}
                className={`${
                  chooseTeam ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2`}
                id="choose-team"
              />
              <Label htmlFor="airplane-mode">Join Existing Team</Label>
            </div>
            {chooseTeam && teams ? (
              <>
                {/* Created a new component to handle multiple select */}
                <MultiSelect
                  label="Team"
                  name="teamId"
                  control={control}
                  error={formState.errors['teamId']?.message}
                  options={teams?.map((team) => ({
                    label: team.name,
                    value: team.id,
                  }))}
                />
              </>
            ) : (
              <Input
                type="text"
                label="Team Name"
                error={formState.errors['teamName']}
                registration={register('teamName')}
              />
            )}
            <div>
              <Button
                isLoading={registering.isPending}
                type="submit"
                className="w-full"
              >
                Register
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            to={`/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
