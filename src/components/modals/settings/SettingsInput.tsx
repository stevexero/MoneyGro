import { useMemo, useState } from 'react';
import useSettingsStore from '../../../stores/settingsStore';
import useSelectStore from '../../../stores/selectStore';
import { validateSettingsName } from '../../../utils/validation';
import useFormErrorStore from '../../../stores/formErrorStore';

interface SettingsInputProps {
  isNewUser: boolean;
}

const SettingsInput: React.FC<SettingsInputProps> = ({ isNewUser }) => {
  const settingsName = useSettingsStore((state) => state.settingsName);
  const setSettingsName = useSettingsStore((state) => state.setSettingsName);
  const selectName = useSelectStore((state) => state.selectName);
  const formError = useFormErrorStore((state) => state.formError);
  const setFormError = useFormErrorStore((state) => state.setFormError);

  const [settingsFormIsDirty, setSettingsFormIsDirty] = useState(false);

  const invalidSettingsString = useMemo(
    () => validateSettingsName(settingsName),
    [settingsName]
  );

  return (
    <>
      <p className='mt-8 font-bold'>
        Set a name for your settings:<span className='text-error'>*</span>
      </p>
      <input
        name='userSettings'
        placeholder='Settings Name'
        onChange={({ target }) => {
          setSettingsName(target.value);
          if (!settingsFormIsDirty) {
            setSettingsFormIsDirty(true);
          }
          if (formError) {
            setFormError('');
          }
        }}
        className='input input-md input-bordered border-2 input-primary w-full max-w-lg rounded-full mt-4'
        disabled={!isNewUser && selectName !== 'add-a-new-distribution-profile'}
      ></input>
      {settingsFormIsDirty && (invalidSettingsString || formError) && (
        <p className='text-error text-sm text-center mt-2'>
          *{formError || invalidSettingsString}
        </p>
      )}
    </>
  );
};

export default SettingsInput;
