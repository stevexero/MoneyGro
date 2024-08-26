import { useEffect } from 'react';
import useAuthStore from '../../stores/authStore';
import Settings from './settings/Settings';

const UsernameModal = () => {
  const getUserProfile = useAuthStore((state) => state.getUserProfile);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  useEffect(() => {
    localStorage.setItem('moneygro-return-user', 'Thanku<3');
  });

  return (
    <dialog id='auth_modal' className='modal bg-primary bg-opacity-30' open>
      <div className='modal-box rounded-xl'>
        <Settings
          modalTitle={'Welcome to MoneyGro!'}
          subHeading={
            <p className='mt-4 font-bold'>
              Let's get started by creating a username:
              <span className='text-error'>*</span>
            </p>
          }
          isNewUser={true}
        />
      </div>
    </dialog>
  );
};

export default UsernameModal;
