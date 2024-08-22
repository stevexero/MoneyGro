import { useEffect, useMemo, useState } from 'react';
import { supaClient } from '../../supabaseClient';
import {
  validateDecimal,
  validatePercentage,
  validateUsername,
} from '../../utils/validation';
import useModalStore from '../../stores/modalStore';
import useAuthStore from '../../stores/authStore';
import useJarStore from '../../stores/jarStore';
import useDeductionStore from '../../stores/deductionStore';

const UsernameModal = () => {
  const session = useAuthStore((state) => state.session);
  const closeModal = useModalStore((state) => state.closeModal);
  const getUserProfile = useAuthStore((state) => state.getUserProfile);
  const jarInputs = useJarStore((state) => state.jarInputs);
  const setJarInputs = useJarStore((state) => state.setJarInputs);
  const customJars = useJarStore((state) => state.customJars);
  const updateCustomJar = useJarStore((state) => state.updateCustomJar);
  const deductions = useDeductionStore((state) => state.deductions);
  const updateDeduction = useDeductionStore((state) => state.updateDeduction);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (validatePercentage(value)) {
      setJarInputs(name, value);
    }
  };

  const handleCustomJarChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;

    if (validatePercentage(value)) {
      updateCustomJar(index, name, value);
    }
  };

  const handleDeductionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;

    if (validateDecimal(value)) {
      if (deductions[index].type === 'percentage' && parseFloat(value) > 100) {
        updateDeduction(index, name, 100);
      } else {
        updateDeduction(index, name, value);
      }
    }
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
        <h3 className='font-bold text-lg'>Welcome to MoneyGro!</h3>
        <p className='mt-4'>Let's get started by creating a username:</p>
        <form className='welcome-name-form mt-4' onSubmit={handleSubmit}>
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
            className='input input-lg input-bordered border-4 input-primary w-full max-w-lg rounded-full shadow-2xl focus:shadow-2xl'
          ></input>
          {formIsDirty && (invalidString || serverError) && (
            <p className='welcome-form-error-message validation-feedback'>
              {serverError || invalidString}
            </p>
          )}
          <p className='mt-8'>Save the following to your profile:</p>
          <p className='mt-4 font-bold'>Standard Jars:</p>
          <div className='w-full grid sm:grid-cols-2 gap-4'>
            {/* Freedom */}
            <div className='flex flex-row items-center justify-between'>
              <label className='mr-4' htmlFor='freedom'>
                Freedom:
              </label>
              <div>
                <input
                  type='number'
                  className='input input-sm input-primary rounded-lg text-right'
                  name='freedom'
                  id='freedom'
                  value={jarInputs.freedom === 0 ? '' : jarInputs.freedom}
                  onChange={handleChange}
                  min={0}
                  max={99}
                  placeholder='0'
                />{' '}
                %
              </div>
            </div>
            {/* Dreams */}
            <div className='flex flex-row items-center justify-between'>
              <label className='mr-4' htmlFor='dreams'>
                Dreams:
              </label>
              <div>
                <input
                  type='number'
                  className='input input-sm input-primary rounded-lg text-right'
                  name='dreams'
                  id='dreams'
                  value={jarInputs.dreams === 0 ? '' : jarInputs.dreams}
                  onChange={handleChange}
                  min={0}
                  max={99}
                  placeholder='0'
                />{' '}
                %
              </div>
            </div>
            {/* Giving */}
            <div className='flex flex-row items-center justify-between'>
              <label className='mr-4' htmlFor='dreams'>
                Generosity:
              </label>
              <div>
                <input
                  type='number'
                  className='input input-sm input-primary rounded-lg text-right'
                  name='generosity'
                  id='generosity'
                  value={jarInputs.generosity === 0 ? '' : jarInputs.generosity}
                  onChange={handleChange}
                  min={0}
                  max={99}
                  placeholder='0'
                />{' '}
                %
              </div>
            </div>
            {/* Knowledge */}
            <div className='flex flex-row items-center justify-between'>
              <label className='mr-4' htmlFor='dreams'>
                Knowledge:
              </label>
              <div>
                <input
                  type='number'
                  className='input input-sm input-primary rounded-lg text-right'
                  name='knowledge'
                  id='knowledge'
                  value={jarInputs.knowledge === 0 ? '' : jarInputs.knowledge}
                  onChange={handleChange}
                  min={0}
                  max={99}
                  placeholder='0'
                />{' '}
                %
              </div>
            </div>
            {/* Joy */}
            <div className='flex flex-row items-center justify-between'>
              <label className='mr-4' htmlFor='dreams'>
                Joy:
              </label>
              <div>
                <input
                  type='number'
                  className='input input-sm input-primary rounded-lg text-right'
                  name='joy'
                  id='joy'
                  value={jarInputs.joy === 0 ? '' : jarInputs.joy}
                  onChange={handleChange}
                  min={0}
                  max={99}
                  placeholder='0'
                />{' '}
                %
              </div>
            </div>
          </div>
          {/* Custom Jars */}
          <p className='mt-4 font-bold'>Custom Jars:</p>
          <div className='w-full grid sm:grid-cols-2 gap-4'>
            {customJars.map((jar, index) => (
              <div
                key={index}
                className='flex flex-row items-center justify-between'
              >
                <label className='mr-4' htmlFor='dreams'>
                  {jar.name}
                </label>
                <div>
                  <input
                    type='number'
                    className='input input-sm input-primary rounded-lg text-right'
                    name='value'
                    // id={jar.name}
                    value={jar.value === 0 ? '' : jar.value}
                    onChange={(event) => handleCustomJarChange(event, index)}
                    min={0}
                    max={99}
                    placeholder='0'
                  />{' '}
                  %
                </div>
              </div>
            ))}
          </div>
          {/* Deductions */}
          <p className='mt-4 font-bold'>Deductions:</p>
          <div className='w-full grid sm:grid-cols-2 gap-4'>
            {deductions.map((deduction, index) => (
              <div
                key={index}
                className='flex flex-row items-center justify-between'
              >
                <label className='mr-4' htmlFor='dreams'>
                  {deduction.name}
                </label>
                <div>
                  <input
                    type='number'
                    className='input input-sm input-primary rounded-lg text-right'
                    name='value'
                    // id={deduction.name}
                    value={deduction.value === 0 ? '' : deduction.value}
                    onChange={(event) => handleDeductionChange(event, index)}
                    min={0}
                    max={99}
                    placeholder='0'
                  />{' '}
                  {deduction.type === 'fixed' ? '$' : '%'}
                </div>
              </div>
            ))}
          </div>
          <div className='modal-action'>
            <button
              type='submit'
              className='btn btn-primary btn-outline text-white rounded-xl'
              disabled={invalidString != null}
            >
              Save My Profile
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UsernameModal;
