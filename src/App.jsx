import { useEffect, useState } from 'react';
import { GrMoney, GrClose, GrAdd } from 'react-icons/gr';
import { FaPercent } from 'react-icons/fa6';
import { TbLockDollar } from 'react-icons/tb';
import { CgRename } from 'react-icons/cg';
import { FaTimes } from 'react-icons/fa';

function App() {
  const [inputs, setInputs] = useState({
    initialAmount: '',
    longTermSavingsForSpending: 10,
    financialFreedom: 10,
    education: 10,
    giving: 5,
    play: 10,
  });
  const [necessities, setNecessities] = useState(100);
  const [deductions, setDeductions] = useState([]);
  const [totalDeductions, setTotalDeductions] = useState(0);
  const [distributableAmount, setDistributableAmount] = useState(0);
  const [customJars, setCustomJars] = useState([]);

  const validateDecimal = (value) => {
    const pattern = /^\d*(\.\d{0,2})?$/;
    return pattern.test(value);
  };

  const validatePercentage = (value) => {
    const pattern = /^\d{0,2}$/;
    return pattern.test(value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // if (validateDecimal(value)) {
    //   setInputs({
    //     ...inputs,
    //     [name]: parseFloat(value) || value,
    //   });
    // }

    if (name === 'initialAmount') {
      if (validateDecimal(value)) {
        setInputs({
          ...inputs,
          [name]: parseFloat(value) || value,
        });
      }
    } else {
      if (validatePercentage(value)) {
        setInputs({
          ...inputs,
          [name]: parseFloat(value) || value,
        });
      }
    }
  };

  // const handleDeductionChange = (index, event) => {
  //   const { name, value } = event.target;

  //   if (validateDecimal(value)) {
  //     setDeductions((prevDeductions) =>
  //       prevDeductions.map((deduction, i) =>
  //         i === index
  //           ? {
  //               ...deduction,
  //               [name]: parseFloat(value) || value,
  //             }
  //           : deduction
  //       )
  //     );
  //   }
  // };

  const handleDeductionChange = (index, event) => {
    const { name, value } = event.target;

    if (validateDecimal(value)) {
      setDeductions((prevDeductions) =>
        prevDeductions.map((deduction, i) =>
          i === index
            ? {
                ...deduction,
                [name]: parseFloat(value),
              }
            : deduction
        )
      );
    }
  };

  const handleDeductionTypeToggle = (index) => {
    setDeductions((prevDeductions) =>
      prevDeductions.map((deduction, i) =>
        i === index
          ? {
              ...deduction,
              type: deduction.type === 'fixed' ? 'percentage' : 'fixed',
            }
          : deduction
      )
    );
  };

  const addDeductionField = () => {
    setDeductions((prevDeductions) => [
      ...prevDeductions,
      {
        value: '',
        type: 'fixed',
        name: `Deduction`,
      },
    ]);
  };

  const removeDeductionField = (index) => {
    setDeductions((prevDeductions) =>
      prevDeductions.filter((_, i) => i !== index)
    );
  };

  const renameDeduction = (index) => {
    const newName = window.prompt(
      'Enter new name for the deduction:',
      deductions[index].name
    );
    if (newName) {
      setDeductions((prevDeductions) =>
        prevDeductions.map((deduction, i) =>
          i === index ? { ...deduction, name: newName } : deduction
        )
      );
    }
  };

  const handleCustomJarChange = (index, event) => {
    const { name, value } = event.target;
    setCustomJars((prevCustomJars) =>
      prevCustomJars.map((jar, i) =>
        i === index
          ? {
              ...jar,
              [name]: parseFloat(value) || value,
            }
          : jar
      )
    );
  };

  const addCustomJarField = () => {
    setCustomJars((prevCustomJars) => [
      ...prevCustomJars,
      {
        value: '',
        name: 'Custom Jar',
      },
    ]);
  };

  const removeCustomJarField = (index) => {
    setCustomJars((prevCustomJars) =>
      prevCustomJars.filter((_, i) => i !== index)
    );
  };

  const renameCustomJar = (index) => {
    const newName = window.prompt(
      'Enter new name for the jar:',
      customJars[index].name
    );
    if (newName) {
      setCustomJars((prevCustomJars) =>
        prevCustomJars.map((jar, i) =>
          i === index ? { ...jar, name: newName } : jar
        )
      );
    }
  };

  const handleResetClick = () => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      initialAmount: '',
    }));
  };

  useEffect(() => {
    setTotalDeductions(
      deductions.reduce((acc, curr) => {
        const deductionValue = parseFloat(curr.value || 0);
        return (
          acc +
          (curr.type === 'percentage'
            ? (inputs.initialAmount * deductionValue) / 100
            : deductionValue)
        );
      }, 0)
    );
  }, [deductions, inputs.initialAmount]);

  useEffect(() => {
    setNecessities(
      100 -
        (inputs.play +
          inputs.giving +
          inputs.education +
          inputs.financialFreedom +
          inputs.longTermSavingsForSpending +
          customJars.reduce(
            (acc, jar) => acc + (parseFloat(jar.value) || 0),
            0
          ))
    );
  }, [
    inputs.longTermSavingsForSpending,
    inputs.financialFreedom,
    inputs.education,
    inputs.giving,
    inputs.play,
    customJars,
  ]);

  useEffect(() => {
    const initialAmount = parseFloat(inputs.initialAmount || 0);
    const amountLeftAfterDeductions = initialAmount - totalDeductions;
    setDistributableAmount(amountLeftAfterDeductions);
  }, [totalDeductions, inputs.initialAmount]);

  return (
    <div className='container mx-auto px-4 md:px-0 overflow-x-hidden'>
      {/* NAV */}
      <nav className='navbar rounded-full'>
        <div className='flex-none'>
          <GrMoney />
        </div>
        <div className='flex-1'>
          <h1 className='text-xl'>&nbsp;MoneyGro.</h1>
        </div>
        <div className='flex-none'>
          <label className='swap swap-rotate'>
            {/* this hidden checkbox controls the state */}
            <input
              type='checkbox'
              className='theme-controller'
              value='synthwave'
            />
            {/* sun icon */}
            <svg
              className='swap-off h-6 w-6 fill-current'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
            >
              <path d='M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z' />
            </svg>
            {/* moon icon */}
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

      <div className='container flex flex-col items-center mt-12'>
        <label className='relative block w-full max-w-lg'>
          <input
            type='number'
            name='initialAmount'
            id='initialAmount'
            value={inputs.initialAmount}
            placeholder='How much was your paycheck?'
            onChange={handleChange}
            className='input input-lg input-bordered border-4 input-primary w-full max-w-lg rounded-full shadow-2xl focus:shadow-2xl'
          />
          <span
            className='absolute inset-y-0 right-0 flex items-center mr-8 tooltip tooltip-right'
            data-tip='Clear Salary'
          >
            <GrClose
              className='w-5 h-5 text-gray-400 hover:cursor-pointer hover:text-secondary'
              onClick={handleResetClick}
            />
          </span>
        </label>

        {/* USER DEDUCTIONS */}
        <div className='mt-16 w-full flex flex-col items-center'>
          {deductions.map((deduction, index) => (
            // <div
            //   key={index}
            //   className='deductions mb-4 border p-4 rounded-lg border-slate-500 max-w-[390px]'
            // >
            <div
              key={index}
              className='collapse collapse-arrow border rounded-3xl mb-2 p-0 max-w-sm'
            >
              <input type='checkbox' className='peer' defaultChecked />
              <div className='collapse-title bg-transparent peer-checked:border-b-0'>
                {deduction.name}
              </div>
              <div className='collapse-content bg-transparent'>
                {/* <label>
                {deduction.name}:
                <input
                  type='number'
                  name='value'
                  value={deduction.value}
                  onChange={(event) => handleDeductionChange(index, event)}
                />
              </label> */}
                <div className='flex flex-row items-center'>
                  <div
                    className={`${inputs.initialAmount <= 0 && 'hover:cursor-not-allowed opacity-50'} mt-[0.27rem]`}
                  >
                    <button
                      className='btn btn-circle btn-sm btn-outline btn-secondary tooltip tooltip-right'
                      data-tip='Rename Deduction'
                      onClick={() => renameDeduction(index)}
                      disabled={inputs.initialAmount <= 0}
                    >
                      <CgRename
                        className='ml-[0.35rem] mt-[0.075rem]'
                        size='1.2rem'
                      />
                    </button>
                  </div>
                  <label className='input input-bordered input-sm input-secondary rounded-full w-full flex items-center gap-2 px-4 ml-4'>
                    {deduction.name}:
                    <input
                      type='number'
                      name='value'
                      value={deduction.value}
                      className='grow w-full'
                      placeholder='0'
                      onChange={(event) => handleDeductionChange(index, event)}
                      disabled={inputs.initialAmount <= 0}
                    />
                    <span>
                      {deduction.type === 'fixed' ? (
                        <TbLockDollar />
                      ) : (
                        <FaPercent />
                      )}
                    </span>
                  </label>
                </div>

                {/* FIXED-PERCENTAGE TOGGLE */}
                <div className='flex flex-row items-center justify-between'>
                  <div className='flex flex-row items-center mt-4 mb-2'>
                    <span
                      className='tooltip tooltip-right'
                      data-tip={
                        inputs.initialAmount <= 0
                          ? null
                          : 'Fixed Amount Deduction'
                      }
                    >
                      <TbLockDollar
                        className={`${
                          deduction.type === 'fixed'
                            ? `${
                                inputs.initialAmount <= 0
                                  ? 'text-secondary opacity-50 hover:cursor-not-allowed'
                                  : 'text-primary'
                              }`
                            : inputs.initialAmount <= 0
                              ? 'text-secondary dark:opacity-50 hover:cursor-not-allowed'
                              : 'text-secondary dark:opacity-50 hover:cursor-pointer'
                        } duration-200`}
                        onClick={
                          deduction.type === 'fixed'
                            ? null
                            : inputs.initialAmount <= 0
                              ? null
                              : () => handleDeductionTypeToggle(index)
                        }
                        size='1.2rem'
                      />
                    </span>
                    <input
                      type='checkbox'
                      className='toggle toggle-secondary ml-4 rounded-full custom-toggle-duration'
                      checked={deduction.type === 'percentage'}
                      onChange={() => handleDeductionTypeToggle(index)}
                      disabled={inputs.initialAmount <= 0}
                    />
                    <span
                      className='tooltip tooltip-right ml-4'
                      data-tip={
                        inputs.initialAmount <= 0
                          ? null
                          : 'Percentage Deduction'
                      }
                    >
                      <FaPercent
                        className={`${
                          deduction.type === 'fixed'
                            ? `${
                                inputs.initialAmount <= 0
                                  ? 'text-secondary dark:opacity-50 hover:cursor-not-allowed'
                                  : 'text-secondary dark:opacity-50 hover:cursor-pointer'
                              }`
                            : inputs.initialAmount <= 0
                              ? 'text-secondary opacity-50 hover:cursor-not-allowed'
                              : 'text-primary'
                        } duration-200`}
                        onClick={
                          deduction.type === 'fixed'
                            ? inputs.initialAmount <= 0
                              ? null
                              : () => handleDeductionTypeToggle(index)
                            : null
                        }
                      />
                    </span>
                  </div>
                  <button
                    type='button'
                    className='btn btn-circle btn-xs btn-outline btn-error mt-2 tooltip tooltip-left'
                    data-tip='Remove Deduction'
                    onClick={() => removeDeductionField(index)}
                  >
                    <FaTimes className='ml-[0.3rem]' />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* ADD DEDUCTION BUTTON */}
          <div className='w-full flex items-center justify-center'>
            <div className='w-full max-w-sm'>
              <button
                className='input border-none rounded-full flex items-center gap-2 opacity-85 hover:cursor-pointer hover:opacity-100 hover:outline-none active:outline-none focus:outline-none active:opacity-100 focus:opacity-100'
                onClick={addDeductionField}
              >
                <span className='btn btn-primary btn-circle btn-active btn-xs text-white light:text-slate-800'>
                  <GrAdd />
                </span>
                <span className='grow'>Add a Deduction</span>
              </button>
            </div>
          </div>

          {/* ITEMIZED DEDUCTIONS */}
          {deductions && deductions.length > 0 && (
            <div className='border rounded-3xl mb-2 p-6 mt-4 w-full max-w-sm'>
              {deductions.length > 0 && (
                <div>
                  <h3 className='font-bold text-lg'>Itemized Deductions:</h3>
                  <ul>
                    {deductions.map((deduction, index) => {
                      const deductionAmount =
                        deduction.type === 'percentage'
                          ? (inputs.initialAmount * deduction.value) / 100
                          : deduction.value || 0;
                      return (
                        <li
                          key={index}
                          className='list-disc list-inside text-sm font-semibold ml-6 mt-2 first:mt-4'
                        >
                          {deduction.name}:{' '}
                          <span className='font-light'>$</span>
                          <span className='font-normal text-secondary'>
                            {deductionAmount.toFixed(2)}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className='mt-4 font-semibold'>
                    Total Deductions: <span className='font-light'>$</span>
                    <span className='font-normal text-secondary'>
                      {totalDeductions.toFixed(2)}
                    </span>
                  </p>
                  <p className='mt-4 font-semibold'>
                    Distributable Amount: <span className='font-light'>$</span>
                    <span className='font-normal text-secondary'>
                      {distributableAmount.toFixed(2)}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* SIX JARS */}
          <div className='container w-full max-w-lg grid grid-cols-2 gap-4 mt-8 lg:max-w-2xl lg:grid-cols-3'>
            <div className='card card-compact bg-neutral text-neutral-content rounded-xl'>
              <div className='card-body'>
                <h2 className='card-title'>Financial Freedom</h2>
                <div className='w-full flex justify-center items-center'>
                  <input
                    type='number'
                    className='input bg-transparent font-bold text-4xl max-w-[4.5rem] text-center focus:outline-none active:outline-none focus:border-none active:border-none'
                    name='financialFreedom'
                    id='financialFreedom'
                    value={inputs.financialFreedom}
                    onChange={handleChange}
                    min={0}
                    max={99}
                  />
                  <FaPercent size='2rem' />
                </div>
                <div className='card-actions justify-end'>
                  <div>
                    $&nbsp;
                    {(
                      (inputs.initialAmount - totalDeductions) *
                      (inputs.financialFreedom * 0.01)
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div className='card card-compact bg-neutral text-neutral-content rounded-xl'>
              <div className='card-body'>
                <h2 className='card-title'>Long Term Savings</h2>
                <div className='w-full flex justify-center items-center'>
                  <input
                    type='number'
                    className='input bg-transparent font-bold text-4xl max-w-[4.5rem] text-center focus:outline-none active:outline-none focus:border-none active:border-none'
                    name='longTermSavingsForSpending'
                    id='longTermSavingsForSpending'
                    value={inputs.longTermSavingsForSpending}
                    onChange={handleChange}
                    min={0}
                    max={99}
                  />
                  <FaPercent size='2rem' />
                </div>
                <div className='card-actions justify-end'>
                  <div>
                    $&nbsp;
                    {(
                      (inputs.initialAmount - totalDeductions) *
                      (inputs.longTermSavingsForSpending * 0.01)
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div className='card card-compact bg-neutral text-neutral-content rounded-xl'>
              <div className='card-body'>
                <h2 className='card-title'>Giving</h2>
                <div className='w-full flex justify-center items-center'>
                  <input
                    type='number'
                    className='input bg-transparent font-bold text-4xl max-w-[4.5rem] text-center focus:outline-none active:outline-none focus:border-none active:border-none'
                    name='giving'
                    id='giving'
                    value={inputs.giving}
                    onChange={handleChange}
                    min={0}
                    max={99}
                  />
                  <FaPercent size='2rem' />
                </div>
                <div className='card-actions justify-end'>
                  <div>
                    $&nbsp;
                    {(
                      (inputs.initialAmount - totalDeductions) *
                      (inputs.giving * 0.01)
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div className='card card-compact bg-neutral text-neutral-content rounded-xl'>
              <div className='card-body'>
                <h2 className='card-title'>Education</h2>
                <div className='w-full flex justify-center items-center'>
                  <input
                    type='number'
                    className='input bg-transparent font-bold text-4xl max-w-[4.5rem] text-center focus:outline-none active:outline-none focus:border-none active:border-none'
                    name='education'
                    id='education'
                    value={inputs.education}
                    onChange={handleChange}
                    min={0}
                    max={99}
                  />
                  <FaPercent size='2rem' />
                </div>
                <div className='card-actions justify-end'>
                  <div>
                    $&nbsp;
                    {(
                      (inputs.initialAmount - totalDeductions) *
                      (inputs.education * 0.01)
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div className='card card-compact bg-neutral text-neutral-content rounded-xl'>
              <div className='card-body'>
                <h2 className='card-title'>Play</h2>
                <div className='w-full flex justify-center items-center'>
                  <input
                    type='number'
                    className='input bg-transparent font-bold text-4xl max-w-[4.5rem] text-center focus:outline-none active:outline-none focus:border-none active:border-none'
                    name='play'
                    id='play'
                    value={inputs.play}
                    onChange={handleChange}
                    min={0}
                    max={99}
                  />
                  <FaPercent size='2rem' />
                </div>
                <div className='card-actions justify-end'>
                  <div>
                    $&nbsp;
                    {(
                      (inputs.initialAmount - totalDeductions) *
                      (inputs.play * 0.01)
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {customJars.map((jar, index) => (
              <div
                key={index}
                className='inputs card card-compact bg-neutral text-neutral-content rounded-xl'
              >
                <div className='card-body'>
                  <h2 className='card-title'>{jar.name}</h2>
                  <div className='w-full flex justify-center items-center'>
                    <input
                      type='number'
                      name='value'
                      className='input bg-transparent font-bold text-4xl max-w-[4.5rem] text-center focus:outline-none active:outline-none focus:border-none active:border-none'
                      value={jar.value}
                      onChange={(event) => handleCustomJarChange(index, event)}
                      min={0}
                    />
                    <FaPercent size='2rem' />
                  </div>
                  <div className='card-actions w-full flex flex-row justify-between items-center'>
                    <div>
                      <button
                        className='btn btn-circle btn-xs btn-outline btn-primary tooltip tooltip-right'
                        data-tip='Rename Custom Jar'
                        onClick={() => renameCustomJar(index)}
                      >
                        <CgRename
                          className='ml-[0.1rem] mt-[0.075rem]'
                          size='1.1rem'
                        />
                      </button>
                      <button
                        className='btn btn-circle btn-xs btn-outline btn-error tooltip tooltip-top ml-2'
                        data-tip='Remove Custom Jar'
                        onClick={() => removeCustomJarField(index)}
                      >
                        <GrClose className='ml-[0.3rem]' />
                      </button>
                    </div>
                    <div>
                      $&nbsp;
                      {(
                        (inputs.initialAmount - totalDeductions) *
                        (jar.value * 0.01)
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className='card card-compact bg-transparent card-bordered border-neutral text-neutral-content rounded-xl flex items-center justify-center min-h-[156px]'>
              <button
                className='btn btn-circle btn-lg btn-primary tooltip'
                data-tip='Add a Custom Jar'
                onClick={addCustomJarField}
              >
                <GrAdd size='2rem' className='ml-[0.95rem]' />
              </button>
            </div>
          </div>

          {/* TO BE DELETED */}

          {/* <div className='mt-8'>
            <input
              className='input input-bordered input-secondary w-full max-w-16'
              type='number'
              name='longTermSavingsForSpending'
              id='longTermSavingsForSpending'
              value={inputs.longTermSavingsForSpending}
              onChange={handleChange}
              min={0}
              max={100}
            />
            <span>%&nbsp;-&nbsp;</span>
            <span>
              Long Terms Savings for Spending: $
              {(
                (inputs.initialAmount - totalDeductions) *
                (inputs.longTermSavingsForSpending * 0.01)
              ).toFixed(2)}
            </span>
          </div>

          <div className='inputs'>
            <input
              type='number'
              name='financialFreedom'
              id='financialFreedom'
              value={inputs.financialFreedom}
              onChange={handleChange}
            />
            <span>%&nbsp;-&nbsp;</span>
            <span>
              Financial Freedom: $
              {(
                (inputs.initialAmount - totalDeductions) *
                (inputs.financialFreedom * 0.01)
              ).toFixed(2)}
            </span>
          </div>

          <div className='inputs'>
            <input
              type='number'
              name='education'
              id='education'
              value={inputs.education}
              onChange={handleChange}
            />
            <span>%&nbsp;-&nbsp;</span>
            <span>
              Education: $
              {(
                (inputs.initialAmount - totalDeductions) *
                (inputs.education * 0.01)
              ).toFixed(2)}
            </span>
          </div>

          <div className='inputs'>
            <input
              type='number'
              name='giving'
              id='giving'
              value={inputs.giving}
              onChange={handleChange}
            />
            <span>%&nbsp;-&nbsp;</span>
            <span>
              Giving: $
              {(
                (inputs.initialAmount - totalDeductions) *
                (inputs.giving * 0.01)
              ).toFixed(2)}
            </span>
          </div>

          <div className='inputs'>
            <input
              type='number'
              name='play'
              id='play'
              value={inputs.play}
              onChange={handleChange}
            />
            <span>%&nbsp;-&nbsp;</span>
            <span>
              Play: $
              {(
                (inputs.initialAmount - totalDeductions) *
                (inputs.play * 0.01)
              ).toFixed(2)}
            </span>
          </div> */}

          {/* CUSTOM JARS */}
          {/* {customJars.map((jar, index) => (
            <div key={index} className='inputs'>
              <input
                type='number'
                name='value'
                value={jar.value}
                onChange={(event) => handleCustomJarChange(index, event)}
                min={0}
              />
              <span>%&nbsp;-&nbsp;</span>
              {jar.name}
              <span>
                : $
                {(
                  (inputs.initialAmount - totalDeductions) *
                  (jar.value * 0.01)
                ).toFixed(2)}
              </span>
              &nbsp;&nbsp;
              <button type='button' onClick={() => renameCustomJar(index)}>
                Rename
              </button>
              <button type='button' onClick={() => removeCustomJarField(index)}>
                Remove
              </button>
            </div>
          ))} */}
          {/* <button type='button' onClick={addCustomJarField}>
            + Add Custom Jar
          </button> */}

          {/* <button
            className='input border-none rounded-full flex items-center gap-2 opacity-85 hover:cursor-pointer hover:opacity-100 hover:outline-none active:outline-none focus:outline-none active:opacity-100 focus:opacity-100'
            onClick={addCustomJarField}
          >
            <span className='btn btn-primary btn-circle btn-active btn-xs text-white light:text-slate-800'>
              <GrAdd />
            </span>
            <span className='grow'>Add Custom Jar</span>
          </button> */}

          {/* NECESSITIES */}
          <div className='card bg-neutral text-neutral-content rounded-xl mt-6 mb-16 w-full max-w-lg p-4 lg:max-w-2xl'>
            <div className='card-body w-full flex justify-center items-center '>
              <h2 className='card-title'>
                {necessities}% - Leftover for Necessities
              </h2>
              <div className='font-bold text-4xl mt-4'>
                $&nbsp;
                {(
                  necessities *
                  (inputs.initialAmount - totalDeductions) *
                  0.01
                ).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
