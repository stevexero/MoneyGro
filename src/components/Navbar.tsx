import { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
// import { ThemeSupa } from '@supabase/auth-ui-shared';
import useInputsStore from '../store';
import { supaClient } from '../supabaseClient';
import { GrMoney } from 'react-icons/gr';
import { RiSaveFill } from 'react-icons/ri';
// import { FaUser, FaRegUserCircle } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const session = useInputsStore((state) => state.session);
  const signOut = useInputsStore((state) => state.signOut);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const viewProfile = () => {
    openModal();
  };

  const logout = () => {
    closeModal();
    signOut();
  };

  const saveDistributions = () => {
    console.log('saving');
  };

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <>
      <nav className='navbar rounded-full'>
        <div className='flex-none text-primary'>
          <GrMoney size='1.5rem' />
        </div>
        <div className='flex-1'>
          <h1 className='text-xl'>
            &nbsp;Money<span className='text-secondary'>Gro</span>.
          </h1>
        </div>
        <div className='flex-none'>
          {session ? (
            <>
              <button
                className='btn btn-sm btn-primary text-white rounded-2xl'
                onClick={saveDistributions}
              >
                <RiSaveFill />
                Save
              </button>
              <button
                className='btn btn-sm btn-primary btn-circle text-white ml-4'
                onClick={viewProfile}
              >
                <FaUser />
              </button>
            </>
          ) : (
            <>
              <button
                className='btn btn-sm btn-primary text-white rounded-2xl'
                onClick={openModal}
              >
                <RiSaveFill />
                Save
              </button>
            </>
          )}
          <label className='swap swap-rotate ml-6'>
            <input
              type='checkbox'
              className='theme-controller'
              value='synthwave'
            />
            <svg
              className='swap-off h-6 w-6 fill-current'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
            >
              <path d='M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z' />
            </svg>
            <svg
              className='swap-on h-6 w-6 fill-current'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
            >
              <path d='M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z' />
            </svg>
          </label>
        </div>
      </nav>

      {/* Auth Modal */}
      {isModalOpen && !session ? (
        <dialog id='auth_modal' className='modal bg-primary bg-opacity-30' open>
          <div className='modal-box rounded-xl'>
            <h3 className='font-bold text-lg'>Sign in to save</h3>
            <Auth supabaseClient={supaClient} providers={['google']} />
            <div className='modal-action'>
              <button
                className='btn btn-primary rounded-xl text-white'
                onClick={logout}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      ) : (
        isModalOpen &&
        session && (
          <>
            <dialog
              id='auth_modal'
              className='modal bg-primary bg-opacity-30'
              open
            >
              <div className='modal-box rounded-xl'>
                <h3 className='font-bold text-lg'>
                  {session.user.email}'s profile
                </h3>
                <label
                  htmlFor='distributions'
                  className='label label-text-alt mt-4'
                >
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
                  <label
                    htmlFor='prefered-theme'
                    className='label label-text-alt mt-4'
                  >
                    Preferred Theme
                  </label>
                  <div
                    id='preferred-theme'
                    className=' flex flex-row items-center'
                  >
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
          </>
        )
      )}
    </>
  );
};

export default Navbar;
