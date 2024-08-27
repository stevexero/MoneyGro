import { ReactNode, useMemo } from 'react';
import { supaClient } from '../../../supabaseClient';
import {
  validateSettingsName,
  validateUsername,
} from '../../../utils/validation';
import useAuthStore from '../../../stores/authStore';
import useSettingsStore from '../../../stores/settingsStore';
import useModalStore from '../../../stores/modalStore';
import useJarStore from '../../../stores/jarStore';
import useDeductionStore from '../../../stores/deductionStore';
import useThemeStore from '../../../stores/themeStore';
import Jars from './jars/Jars';
import CustomJars from './jars/CustomJars';
import Deductions from './Deductions';
import Themes from './Themes';
import SettingsInput from './SettingsInput';
import useFormErrorStore from '../../../stores/formErrorStore';
import SettingsAction from './SettingsAction';
import SettingsSubheading from './SettingsSubheading';

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
  const { addAllocation, settingsName, usernameText } = useSettingsStore();
  const closeModal = useModalStore((state) => state.closeModal);
  const { jarInputs, customJars } = useJarStore();
  const deductions = useDeductionStore((state) => state.deductions);
  const theme = useThemeStore((state) => state.theme);
  const setFormError = useFormErrorStore((state) => state.setFormError);

  const invalidString = useMemo(
    () => validateUsername(usernameText),
    [usernameText]
  );

  const invalidSettingsString = useMemo(
    () => validateSettingsName(settingsName),
    [settingsName]
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isNewUser) {
      if (invalidString) {
        setFormError(invalidString);
        return;
      }
    }

    if (invalidSettingsString) {
      setFormError(invalidSettingsString);
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
        setFormError(`Username "${usernameText}" is already taken`);
      } else {
        await addAnAllocation(settingsName);
        closeModal();
      }
    } else {
      await addAnAllocation(settingsName);
      closeModal();
    }
  };

  const updateUserProfile = async () => {
    const customAllocations = customJars.map((jar) => ({
      name: jar.name,
      alloc_custom: jar.value,
    }));

    const deducts = deductions.map((deduction) => ({
      name: deduction.name,
      type: deduction.type,
      value: deduction.value,
    }));

    addAllocation(
      settingsName,
      settingsName.split(' ').join('-').toLowerCase(),
      jarInputs.freedom,
      jarInputs.dreams,
      jarInputs.generosity,
      jarInputs.knowledge,
      jarInputs.joy,
      customAllocations,
      deducts,
      theme
    );
    closeModal();
  };

  const addAnAllocation = async (allocationName: string) => {
    const { error: insertError } = await supaClient
      .from('user_settings')
      .insert({
        user_id: session?.user.id || '',
        allocation_settings: [],
      });

    const customAllocations = customJars.map((jar) => ({
      name: jar.name,
      alloc_custom: jar.value,
    }));

    const deducts = deductions.map((deduction) => ({
      name: deduction.name,
      type: deduction.type,
      value: deduction.value,
    }));

    addAllocation(
      allocationName,
      allocationName.split(' ').join('-').toLowerCase(),
      jarInputs.freedom,
      jarInputs.dreams,
      jarInputs.generosity,
      jarInputs.knowledge,
      jarInputs.joy,
      customAllocations,
      deducts,
      theme
    );

    if (insertError) {
      setFormError(`Allocation "${allocationName}" could not be added.`);
    }
  };

  return (
    <>
      <h3 className='font-bold text-lg'>{modalTitle}</h3>
      <>{subHeading}</>
      <form className='welcome-name-form mt-4' onSubmit={handleSubmit}>
        <SettingsSubheading isNewUser={isNewUser} />
        <p className='mt-8'>Save the following to your profile:</p>
        <Jars />
        <CustomJars />
        <Deductions />
        <Themes />
        <SettingsInput isNewUser={isNewUser} />
        <SettingsAction isNewUser={isNewUser} />
      </form>
    </>
  );
};

export default Settings;
