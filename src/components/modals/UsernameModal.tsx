import { useEffect, useMemo, useState } from 'react';
import { supaClient } from '../../supabaseClient';
import { validateUsername } from '../../utils/validation';
import useModalStore from '../../stores/modalStore';
import useAuthStore from '../../stores/authStore';

const UsernameModal = () => {
  const session = useAuthStore((state) => state.session);
  const closeModal = useModalStore((state) => state.closeModal);
  const getUserProfile = useAuthStore((state) => state.getUserProfile);

  const [usernameText, setUsernameText] = useState('');
  const [serverError, setServerError] = useState('');
  const [formIsDirty, setFormIsDirty] = useState(false);
  const invalidString = useMemo(
    () => validateUsername(usernameText),
    [usernameText]
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { error } = await supaClient.from('user_profiles').insert([
      {
        user_id: session?.user.id || '',
        username: usernameText,
      },
    ]);

    if (error) {
      setServerError(`Username "${usernameText}" is already taken`);
    } else {
      closeModal();
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <dialog id='auth_modal' className='modal bg-primary bg-opacity-30' open>
      <div className='modal-box rounded-xl'>
        <h3 className='font-bold text-lg'>Welcome to MoneyGro!</h3>
        <p>Let's get started by creating a username:</p>
        <form className='welcome-name-form' onSubmit={handleSubmit}>
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
            className='welcome-name-input'
          ></input>
          {formIsDirty && (invalidString || serverError) && (
            <p className='welcome-form-error-message validation-feedback'>
              {serverError || invalidString}
            </p>
          )}
          <div className='modal-action'>
            <button
              type='submit'
              className='btn btn-primary btn-outline text-white rounded-xl'
              disabled={invalidString != null}
            >
              Save My Username
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UsernameModal;
