import { ReactNode, useMemo, useEffect } from 'react';
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
import useSelectStore from '../../../stores/selectStore';
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
  const addAllocation = useSettingsStore((state) => state.addAllocation);
  const closeModal = useModalStore((state) => state.closeModal);
  const jarInputs = useJarStore((state) => state.jarInputs);
  const setJarInputs = useJarStore((state) => state.setJarInputs);
  const customJars = useJarStore((state) => state.customJars);
  const setCustomJars = useJarStore((state) => state.setCustomJars);
  const deductions = useDeductionStore((state) => state.deductions);
  const setDeductions = useDeductionStore((state) => state.setDeductions);
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const selectName = useSelectStore((state) => state.selectName);
  const allocations = useSettingsStore((state) => state.allocations);
  const settingsName = useSettingsStore((state) => state.settingsName);
  const usernameText = useSettingsStore((state) => state.usernameText);
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

  useEffect(() => {
    if (selectName) {
      const selectedAllocation = allocations.find(
        (alloc) => alloc.alloc_id === selectName
      );
      if (selectedAllocation) {
        setJarInputs('freedom', selectedAllocation.alloc_freedom);
        setJarInputs('dreams', selectedAllocation.alloc_dreams);
        setJarInputs('generosity', selectedAllocation.alloc_generosity);
        setJarInputs('knowledge', selectedAllocation.alloc_knowledge);
        setJarInputs('joy', selectedAllocation.alloc_joy);
        const mappedCustomJars = selectedAllocation.custom_allocations.map(
          (customAlloc) => ({
            name: customAlloc.name,
            value: customAlloc.alloc_custom,
          })
        );
        setCustomJars(mappedCustomJars);

        if (
          deductions.length === 0 ||
          selectedAllocation.alloc_id !== selectName
        ) {
          const mappedDeductions = selectedAllocation.alloc_deductions.map(
            (deduction) => ({
              name: deduction.name,
              type: deduction.type,
              value: deduction.value,
            })
          );
          setDeductions(mappedDeductions);
        }
        setTheme(selectedAllocation.alloc_theme);
      }
    }
  }, [
    selectName,
    allocations,
    setJarInputs,
    setCustomJars,
    setDeductions,
    deductions.length,
    setTheme,
  ]);

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
