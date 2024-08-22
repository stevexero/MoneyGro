import { Auth } from '@supabase/auth-ui-react';
import { supaClient } from '../../supabaseClient';
import useModalStore from '../../stores/modalStore';

const SignInModal = () => {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <dialog id='auth_modal' className='modal bg-primary bg-opacity-30' open>
      <div className='modal-box rounded-xl'>
        <h3 className='font-bold text-lg'>Sign in to save</h3>
        <Auth supabaseClient={supaClient} providers={['google']} />
        <div className='modal-action'>
          <button
            className='btn btn-primary rounded-xl text-white'
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default SignInModal;
