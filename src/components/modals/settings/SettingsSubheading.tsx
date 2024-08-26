import { useMemo } from 'react';
import useFormErrorStore from '../../../stores/formErrorStore';
import useSettingsStore from '../../../stores/settingsStore';
import { validateUsername } from '../../../utils/validation';

interface SettingsSubheadingProps {
  isNewUser: boolean;
}

const SettingsSubheading: React.FC<SettingsSubheadingProps> = ({
  isNewUser,
}) => {
  const setUsernameText = useSettingsStore((state) => state.setUsernameText);
  const formError = useFormErrorStore((state) => state.formError);
  const setFormError = useFormErrorStore((state) => state.setFormError);
  const formIsDirty = useFormErrorStore((state) => state.formIsDirty);
  const setFormIsDirty = useFormErrorStore((state) => state.setFormIsDirty);
  const usernameText = useSettingsStore((state) => state.usernameText);

  const invalidString = useMemo(
    () => validateUsername(usernameText),
    [usernameText]
  );

  return (
    <>
      {isNewUser ? (
        <>
          <input
            name='username'
            placeholder='Username'
            onChange={({ target }) => {
              setUsernameText(target.value);
              if (!formIsDirty) {
                setFormIsDirty(true);
              }
              if (formError) {
                setFormError('');
              }
            }}
            className='input input-lg input-bordered border-4 input-primary w-full max-w-lg rounded-full'
          ></input>
          {formIsDirty && (invalidString || formError) && (
            <p className='text-error text-sm text-center mt-2'>
              *{formError || invalidString}
            </p>
          )}
        </>
      ) : null}
    </>
  );
};

export default SettingsSubheading;
