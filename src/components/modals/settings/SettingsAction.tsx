import { useMemo } from 'react';
import useSettingsStore from '../../../stores/settingsStore';
import {
  validateSettingsName,
  validateUsername,
} from '../../../utils/validation';
import useAuthStore from '../../../stores/authStore';
import useModalStore from '../../../stores/modalStore';

interface SettingsActionProps {
  isNewUser: boolean;
}

const SettingsAction: React.FC<SettingsActionProps> = ({ isNewUser }) => {
  const signOut = useAuthStore((state) => state.signOut);
  const closeModal = useModalStore((state) => state.closeModal);
  const settingsName = useSettingsStore((state) => state.settingsName);
  const usernameText = useSettingsStore((state) => state.usernameText);

  const invalidString = useMemo(
    () => validateUsername(usernameText),
    [usernameText]
  );

  const invalidSettingsString = useMemo(
    () => validateSettingsName(settingsName),
    [settingsName]
  );

  const logout = () => {
    signOut();
    closeModal();
  };

  return (
    <>
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
    </>
  );
};

export default SettingsAction;
