import { useEffect } from 'react';
import useAuthStore from '../../stores/authStore';
import useSettingsStore from '../../stores/settingsStore';
import Settings from './settings/Settings';
import useSelectStore from '../../stores/selectStore';
import useJarStore from '../../stores/jarStore';

const ProfileModal = () => {
  const profile = useAuthStore((state) => state.profile);
  const getUserProfile = useAuthStore((state) => state.getUserProfile);
  const allocations = useSettingsStore((state) => state.allocations);
  const getAllocations = useSettingsStore((state) => state.getAllocations);
  const clearAllocations = useSettingsStore((state) => state.clearAllocations);
  const setSelectName = useSelectStore((state) => state.setSelectName);
  const setJarInputs = useJarStore((state) => state.setJarInputs);

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
              >
                <option>Select a Saved Distribution</option>
                {allocations.map((allocation, index) => (
                  <option key={index}>{allocation.name}</option>
                ))}
                <option>Add a New Distribution Profile</option>
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
