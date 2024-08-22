import { useState, useEffect } from 'react';
import { RiSaveFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import useModalStore from '../../stores/modalStore';

const SignInSaveButton = () => {
  const openModal = useModalStore((state) => state.openModal);

  const [buttonEl, setButtonEl] = useState(
    <>
      <RiSaveFill />
      Save
    </>
  );

  const handleOpenModal = () => {
    openModal();
  };

  useEffect(() => {
    if (localStorage.getItem('moneygro-return-user') === 'Thanku<3') {
      setButtonEl(
        <>
          <FaUser />
          Sign In
        </>
      );
    }
  }, []);

  return (
    <div>
      <button
        className='btn btn-sm btn-primary text-white rounded-2xl'
        onClick={handleOpenModal}
      >
        {buttonEl}
      </button>
    </div>
  );
};

export default SignInSaveButton;
