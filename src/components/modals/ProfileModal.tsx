import { useEffect } from 'react';
import useAuthStore from '../../stores/authStore';
import useSettingsStore from '../../stores/settingsStore';
import Settings from './settings/Settings';
import useSelectStore from '../../stores/selectStore';
import useJarStore from '../../stores/jarStore';
import useDeductionStore from '../../stores/deductionStore';
import useThemeStore from '../../stores/themeStore';

const ProfileModal = () => {
  const { profile, getUserProfile } = useAuthStore();
  const { allocations, getAllocations, clearAllocations } = useSettingsStore();
  const { setJarInputs, setCustomJars } = useJarStore();
  const { deductions, setDeductions } = useDeductionStore();
  const setTheme = useThemeStore((state) => state.setTheme);
  const { selectName, setSelectName } = useSelectStore();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value.split(' ').join('-').toLowerCase();
    setSelectName(selected);

    const allocs = allocations.find((alloc) => alloc.alloc_id === selected);

    if (allocs) {
      setJarInputs('freedom', allocs.alloc_freedom);
      setJarInputs('dreams', allocs.alloc_dreams);
      setJarInputs('generosity', allocs.alloc_generosity);
      setJarInputs('knowledge', allocs.alloc_knowledge);
      setJarInputs('joy', allocs.alloc_joy);
      const mappedCustomJars = allocs.custom_allocations.map((customAlloc) => ({
        name: customAlloc.name,
        value: customAlloc.alloc_custom,
      }));
      setCustomJars(mappedCustomJars);

      if (deductions.length === 0 || allocs.alloc_id !== selectName) {
        const mappedDeductions = allocs.alloc_deductions.map((deduction) => ({
          name: deduction.name,
          type: deduction.type,
          value: deduction.value,
        }));
        setDeductions(mappedDeductions);
      }
      setTheme(allocs.alloc_theme);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  useEffect(() => {
    if (profile) {
      clearAllocations();
      getAllocations();
    }
  }, [profile, getAllocations, clearAllocations]);

  useEffect(() => {
    localStorage.setItem('moneygro-return-user', 'Thanku<3');
  });

  return (
    <dialog id='auth_modal' className='modal bg-primary bg-opacity-30' open>
      <div className='modal-box rounded-xl'>
        <Settings
          modalTitle={`${profile?.username}'s profile`}
          subHeading={
            <>
              <p className='font-bold mt-4'>Saved Distributions</p>
              <select
                className='select select-md select-primary w-full rounded-full mt-4'
                onChange={handleSelect}
                value={selectName || 'select-a-saved-distribution'}
              >
                <option value='select-a-saved-distribution' disabled>
                  Select a Saved Distribution
                </option>
                {allocations.map((allocation, index) => (
                  <option key={index} value={allocation.alloc_id}>
                    {allocation.name}
                  </option>
                ))}
                <option value='add-a-new-distribution-profile'>
                  Add a New Distribution Profile
                </option>
              </select>
            </>
          }
          isNewUser={false}
        />
      </div>
    </dialog>
  );
};

export default ProfileModal;
