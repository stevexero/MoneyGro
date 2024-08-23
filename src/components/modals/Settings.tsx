import { ReactNode, useState, useMemo } from 'react';
import { supaClient } from '../../supabaseClient';
import {
  validateDecimal,
  validatePercentage,
  validateSettingsName,
  validateUsername,
} from '../../utils/validation';
import useAuthStore from '../../stores/authStore';
import useSettingsStore from '../../stores/settingsStore';
import useModalStore from '../../stores/modalStore';
import useJarStore from '../../stores/jarStore';
import useDeductionStore from '../../stores/deductionStore';
import useThemeStore from '../../stores/themeStore';

interface SettingsProps {
  modalTitle: string;
  subHeading: ReactNode;
  isNewUser: boolean;
}

const Settings: React.FC<SettingsProps> = ({
  modalTitle,
  subHeading,
  isNewUser,
}) => {
  const session = useAuthStore((state) => state.session);
  const signOut = useAuthStore((state) => state.signOut);
  const addAllocation = useSettingsStore((state) => state.addAllocation);
  const closeModal = useModalStore((state) => state.closeModal);
  const jarInputs = useJarStore((state) => state.jarInputs);
  const setJarInputs = useJarStore((state) => state.setJarInputs);
  const customJars = useJarStore((state) => state.customJars);
  const updateCustomJar = useJarStore((state) => state.updateCustomJar);
  const deductions = useDeductionStore((state) => state.deductions);
  const updateDeduction = useDeductionStore((state) => state.updateDeduction);
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const [usernameText, setUsernameText] = useState('');
  const [settingsText, setSettingsText] = useState('');
  const [serverError, setServerError] = useState('');
  const [settingsServerError, setSettingsServerError] = useState('');
  const [formIsDirty, setFormIsDirty] = useState(false);
  const [settingsFormIsDirty, setSettingsFormIsDirty] = useState(false);

  const invalidString = useMemo(
    () => validateUsername(usernameText),
    [usernameText]
  );

  const invalidSettingsString = useMemo(
    () => validateSettingsName(settingsText),
    [settingsText]
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isNewUser) {
      if (invalidString) {
        setServerError(invalidString);
        return;
      }
    }

    if (invalidSettingsString) {
      setSettingsServerError(invalidSettingsString);
      return;
    }

    try {
      if (isNewUser) {
        await createUserProfile();
      } else {
        await updateUserProfile();
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };

  const createUserProfile = async () => {
    if (isNewUser) {
      const { error: userProfileError } = await supaClient
        .from('user_profiles')
        .insert({
          user_id: session?.user.id || '',
          username: usernameText,
        });

      if (userProfileError) {
        setServerError(`Username "${usernameText}" is already taken`);
      } else {
        await addAnAllocation(settingsText);
        closeModal();
      }
    } else {
      await addAnAllocation(settingsText);
      closeModal();
    }
  };

  const updateUserProfile = async () => {
    addAllocation(settingsText);
    closeModal();
  };

  const addAnAllocation = async (allocationName: string) => {
    const { error: insertError } = await supaClient
      .from('user_settings')
      .insert({
        user_id: session?.user.id || '',
        allocation_settings: [],
      });

    addAllocation(allocationName);

    if (insertError) {
      setSettingsServerError(
        `Allocation "${allocationName}" could not be added.`
      );
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (validatePercentage(value)) {
      setJarInputs(name, value);
    }
  };

  const handleCustomJarChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;

    if (validatePercentage(value)) {
      updateCustomJar(index, name, value);
    }
  };

  const handleDeductionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;

    if (validateDecimal(value)) {
      if (deductions[index].type === 'percentage' && parseFloat(value) > 100) {
        updateDeduction(index, name, 100);
      } else {
        updateDeduction(index, name, value);
      }
    }
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.value);
  };

  const logout = () => {
    signOut();
    closeModal();
  };

  return (
    <>
      <h3 className='font-bold text-lg'>{modalTitle}</h3>
      <>{subHeading}</>
      <form className='welcome-name-form mt-4' onSubmit={handleSubmit}>
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
                if (serverError) {
                  setServerError('');
                }
              }}
              className='input input-lg input-bordered border-4 input-primary w-full max-w-lg rounded-full'
            ></input>
            {formIsDirty && (invalidString || serverError) && (
              <p className='text-error text-sm text-center mt-2'>
                *{serverError || invalidString}
              </p>
            )}
          </>
        ) : null}
        <p className='mt-8'>Save the following to your profile:</p>
        {/* Jars */}
        <p className='mt-4 font-bold'>Standard Jars:</p>
        <div className='w-full grid sm:grid-cols-2 gap-4 mt-4'>
          {/* Freedom */}
          <div className='flex flex-row items-center justify-between'>
            <label className='mr-4' htmlFor='freedom'>
              Freedom:
            </label>
            <div>
              <input
                type='number'
                className='input input-sm input-primary rounded-lg text-right'
                name='freedom'
                id='freedom'
                value={jarInputs.freedom === 0 ? '' : jarInputs.freedom}
                onChange={handleChange}
                min={0}
                max={99}
                placeholder='0'
              />{' '}
              %
            </div>
          </div>
          {/* Dreams */}
          <div className='flex flex-row items-center justify-between'>
            <label className='mr-4' htmlFor='dreams'>
              Dreams:
            </label>
            <div>
              <input
                type='number'
                className='input input-sm input-primary rounded-lg text-right'
                name='dreams'
                id='dreams'
                value={jarInputs.dreams === 0 ? '' : jarInputs.dreams}
                onChange={handleChange}
                min={0}
                max={99}
                placeholder='0'
              />{' '}
              %
            </div>
          </div>
          {/* Giving */}
          <div className='flex flex-row items-center justify-between'>
            <label className='mr-4' htmlFor='dreams'>
              Generosity:
            </label>
            <div>
              <input
                type='number'
                className='input input-sm input-primary rounded-lg text-right'
                name='generosity'
                id='generosity'
                value={jarInputs.generosity === 0 ? '' : jarInputs.generosity}
                onChange={handleChange}
                min={0}
                max={99}
                placeholder='0'
              />{' '}
              %
            </div>
          </div>
          {/* Knowledge */}
          <div className='flex flex-row items-center justify-between'>
            <label className='mr-4' htmlFor='dreams'>
              Knowledge:
            </label>
            <div>
              <input
                type='number'
                className='input input-sm input-primary rounded-lg text-right'
                name='knowledge'
                id='knowledge'
                value={jarInputs.knowledge === 0 ? '' : jarInputs.knowledge}
                onChange={handleChange}
                min={0}
                max={99}
                placeholder='0'
              />{' '}
              %
            </div>
          </div>
          {/* Joy */}
          <div className='flex flex-row items-center justify-between'>
            <label className='mr-4' htmlFor='dreams'>
              Joy:
            </label>
            <div>
              <input
                type='number'
                className='input input-sm input-primary rounded-lg text-right'
                name='joy'
                id='joy'
                value={jarInputs.joy === 0 ? '' : jarInputs.joy}
                onChange={handleChange}
                min={0}
                max={99}
                placeholder='0'
              />{' '}
              %
            </div>
          </div>
        </div>
        {/* Custom Jars */}
        <p className='mt-8 font-bold'>
          Custom Jars:{' '}
          {customJars.length <= 0 && (
            <span className='font-normal'>No Custom Jars Set</span>
          )}
        </p>
        <div
          className={`w-full grid sm:grid-cols-2 gap-4 ${customJars.length > 0 && 'mt-4'}`}
        >
          {customJars.map((jar, index) => (
            <div
              key={index}
              className='flex flex-row items-center justify-between'
            >
              <label className='mr-4' htmlFor='dreams'>
                {jar.name}
              </label>
              <div>
                <input
                  type='number'
                  className='input input-sm input-primary rounded-lg text-right'
                  name='value'
                  value={jar.value === 0 ? '' : jar.value}
                  onChange={(event) => handleCustomJarChange(event, index)}
                  min={0}
                  max={99}
                  placeholder='0'
                />{' '}
                %
              </div>
            </div>
          ))}
        </div>
        {/* Deductions */}
        <p className='mt-8 font-bold'>
          Deductions:{' '}
          {deductions.length <= 0 && (
            <span className='font-normal'>No Deductions Set</span>
          )}
        </p>
        <div
          className={`w-full grid sm:grid-cols-2 gap-4 ${deductions.length > 0 && 'mt-4'}`}
        >
          {deductions.map((deduction, index) => (
            <div
              key={index}
              className='flex flex-row items-center justify-between'
            >
              <label className='mr-4' htmlFor='dreams'>
                {deduction.name}
              </label>
              <div>
                <input
                  type='number'
                  className='input input-sm input-primary rounded-lg text-right'
                  name='value'
                  value={deduction.value === 0 ? '' : deduction.value}
                  onChange={(event) => handleDeductionChange(event, index)}
                  min={0}
                  max={99}
                  placeholder='0'
                />{' '}
                {deduction.type === 'fixed' ? '$' : '%'}
              </div>
            </div>
          ))}
        </div>
        {/* Preferred Theme */}
        <p className='mt-8 font-bold'>Preferred Theme:</p>
        <div className=' flex flex-row items-center mt-4'>
          <input
            type='radio'
            name='preferred-theme'
            className='radio radio-primary theme-controller'
            value='light'
            checked={theme === 'light'}
            onChange={handleThemeChange}
          />
          <span className='label-text ml-4'>Light</span>
          <input
            type='radio'
            name='preferred-theme'
            className='radio radio-primary theme-controller ml-6'
            value='synthwave'
            checked={theme === 'synthwave'}
            onChange={handleThemeChange}
          />
          <span className='label-text ml-4'>Dark</span>
        </div>
        {/* Name Settings */}
        <p className='mt-8 font-bold'>
          Set a name for your settings:<span className='text-error'>*</span>
        </p>
        <input
          name='userSettings'
          placeholder='Settings Name'
          onChange={({ target }) => {
            setSettingsText(target.value);
            if (!settingsFormIsDirty) {
              setSettingsFormIsDirty(true);
            }
            if (settingsServerError) {
              setSettingsServerError('');
            }
          }}
          className='input input-md input-bordered border-2 input-primary w-full max-w-lg rounded-full mt-4'
        ></input>
        {settingsFormIsDirty &&
          (invalidSettingsString || settingsServerError) && (
            <p className='text-error text-sm text-center mt-2'>
              *{settingsServerError || invalidSettingsString}
            </p>
          )}
        {isNewUser ? (
          <div className='modal-action'>
            <button
              type='submit'
              className='btn btn-primary btn-outline text-white rounded-xl'
              disabled={invalidString != null && invalidSettingsString != null}
            >
              Save My Profile
            </button>
          </div>
        ) : (
          <div className='modal-action'>
            <button
              className='btn btn-primary btn-outline text-white rounded-xl'
              onClick={logout}
            >
              Logout
            </button>
            <button
              type='submit'
              className='btn btn-primary text-white rounded-xl'
              disabled={invalidString != null && invalidSettingsString != null}
            >
              Save My Profile
            </button>
            <button
              className='btn btn-primary text-white rounded-xl'
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default Settings;
