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
  const { formError, setFormError, formIsDirty, setFormIsDirty } =
    useFormErrorStore();
  const { usernameText, setUsernameText } = useSettingsStore();

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
