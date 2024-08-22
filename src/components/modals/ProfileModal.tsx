import { useEffect } from 'react';
import useAuthStore from '../../stores/authStore';
import useModalStore from '../../stores/modalStore';

const ProfileModal = () => {
  const profile = useAuthStore((state) => state.profile);
  const signOut = useAuthStore((state) => state.signOut);
  const getUserProfile = useAuthStore((state) => state.getUserProfile);
  const closeModal = useModalStore((state) => state.closeModal);

  const logout = () => {
    signOut();
    closeModal();
  };

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  useEffect(() => {
    localStorage.setItem('moneygro-return-user', 'Thanku<3');
  });

  return (
    <dialog id='auth_modal' className='modal bg-primary bg-opacity-30' open>
      <div className='modal-box rounded-xl'>
        <h3 className='font-bold text-lg'>{profile?.username}'s profile</h3>
        <label htmlFor='distributions' className='label label-text-alt mt-4'>
          Saved Distributions
        </label>
        <select
          id='distributions'
          className='select select-xs select-primary w-full rounded-xl'
        >
          <option defaultChecked disabled>
            Select a Saved Distribution
          </option>
          <option>Figure</option>
          <option>Out</option>
          <option>What</option>
          <option>To</option>
          <option>Put</option>
          <option>Add Distribution</option>
        </select>
        <div className='form-control flex flex-col'>
          <label htmlFor='prefered-theme' className='label label-text-alt mt-4'>
            Preferred Theme
          </label>
          <div id='preferred-theme' className=' flex flex-row items-center'>
            <input
              type='radio'
              name='preferred-theme'
              className='radio radio-primary'
              defaultChecked
            />
            <span className='label-text ml-4'>Light</span>
            <input
              type='radio'
              name='preferred-theme'
              className='radio radio-primary ml-6'
            />
            <span className='label-text ml-4'>Dark</span>
          </div>
        </div>
        <div className='modal-action'>
          <button
            className='btn btn-primary btn-outline text-white rounded-xl'
            onClick={logout}
          >
            Logout
          </button>
          <button
            className='btn btn-primary text-white rounded-xl'
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ProfileModal;
