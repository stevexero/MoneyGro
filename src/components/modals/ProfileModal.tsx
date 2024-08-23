import { useEffect } from 'react';
import useAuthStore from '../../stores/authStore';
import useSettingsStore from '../../stores/settingsStore';
import Settings from './Settings';

const ProfileModal = () => {
  const profile = useAuthStore((state) => state.profile);
  const getUserProfile = useAuthStore((state) => state.getUserProfile);
  const allocations = useSettingsStore((state) => state.allocations);
  const getAllocations = useSettingsStore((state) => state.getAllocations);
  const clearAllocations = useSettingsStore((state) => state.clearAllocations);

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
              <select className='select select-md select-primary w-full rounded-full mt-4'>
                <option defaultChecked>Select a Saved Distribution</option>
                {allocations.map((allocation, index) => (
                  <option key={index}>{allocation.name}</option>
                ))}
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
