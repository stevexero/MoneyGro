import { useEffect, useState } from 'react';
import { GrMoney, GrClose } from 'react-icons/gr';

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
    const regex = /^\d+(\.\d{0,2})?$/;
    return regex.test(value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (validateDecimal(value)) {
      setInputs({
        ...inputs,
        [name]: parseFloat(value) || value,
      });
    }
  };

  const handleDeductionChange = (index, event) => {
    const { name, value, type } = event.target;
    setDeductions((prevDeductions) =>
      prevDeductions.map((deduction, i) =>
        i === index
          ? {
              ...deduction,
              [name]: type === 'radio' ? value : parseFloat(value) || value,
            }
          : deduction
      )
    );
  };

  const handleDeductionTypeChange = (index, event) => {
    const { value } = event.target;
    setDeductions((prevDeductions) =>
      prevDeductions.map((deduction, i) =>
        i === index ? { ...deduction, type: value } : deduction
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
    <div className='container mx-auto'>
      {/* NAV */}
      <nav className='navbar rounded-full'>
        <div className='flex-none'>
          <GrMoney />
        </div>
        <div className='flex-1'>
          <h1 className='text-xl'>&nbsp;Six Jars Money</h1>
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
        {/* <input
          type='number'
          name='initialAmount'
          id='initialAmount'
          value={inputs.initialAmount}
          placeholder='How much was your paycheck?'
          onChange={handleChange}
          className='input input-lg input-bordered border-4 input-primary w-full max-w-lg rounded-full shadow-2xl focus:shadow-2xl'
        /> */}

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
          <span className='absolute inset-y-0 right-0 flex items-center mr-8'>
            <GrClose
              className='w-5 h-5 text-gray-400 hover:cursor-pointer hover:text-secondary'
              onClick={handleResetClick}
            />
          </span>
        </label>

        {/* <label className='relative block w-full max-w-lg'>
          <input
            type='text'
            name='search'
            id='search'
            className='block w-full px-4 py-2 pr-10 text-gray-700 bg-white border border-gray-300 rounded-full shadow-2xl focus:outline-none focus:border-blue-500 focus:shadow-outline-blue focus:ring-1 focus:ring-blue-500'
            placeholder='How much was your paycheck?'
          />
          <span className='absolute inset-y-0 right-0 flex items-center pr-3'>
            <GrClose className='w-5 h-5 text-gray-400' />
          </span>
        </label> */}

        {/* USER DEDUCTIONS */}
        <div className='mt-12'>
          {deductions.map((deduction, index) => (
            <div key={index}>
              <label>
                {deduction.name}:
                <input
                  type='number'
                  name='value'
                  value={deduction.value}
                  onChange={(event) => handleDeductionChange(index, event)}
                />
              </label>
              <div>
                {/* RADIO BUTTONS */}
                <label>
                  <input
                    type='radio'
                    name={`type-${index}`}
                    value='fixed'
                    checked={deduction.type === 'fixed'}
                    onChange={(event) =>
                      handleDeductionTypeChange(index, event)
                    }
                    // defaultChecked
                  />
                  Fixed Amount
                </label>
                <label>
                  <input
                    type='radio'
                    name={`type-${index}`}
                    value='percentage'
                    checked={deduction.type === 'percentage'}
                    onChange={(event) =>
                      handleDeductionTypeChange(index, event)
                    }
                  />
                  Percentage
                </label>
              </div>
              <button type='button' onClick={() => renameDeduction(index)}>
                Rename
              </button>
              <button type='button' onClick={() => removeDeductionField(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type='button' onClick={addDeductionField}>
            + Add Deduction
          </button>

          {/* ITEMIZED DEDUCTIONS */}
          {deductions.length > 0 && (
            <div>
              <p>Itemized Deductions:</p>
              <ul>
                {deductions.map((deduction, index) => {
                  const deductionAmount =
                    deduction.type === 'percentage'
                      ? (inputs.initialAmount * deduction.value) / 100
                      : deduction.value || 0;
                  return (
                    <li key={index}>
                      {deduction.name}: ${deductionAmount.toFixed(2)}
                    </li>
                  );
                })}
              </ul>
              <p>Total Deductions: ${totalDeductions.toFixed(2)}</p>
              <p>Distributable Amount: ${distributableAmount.toFixed(2)}</p>
            </div>
          )}

          {/* SIX JARS */}
          <div className='inputs'>
            <input
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
          </div>

          {/* CUSTOM JARS */}
          {customJars.map((jar, index) => (
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
          ))}
          <button type='button' onClick={addCustomJarField}>
            + Add Custom Jar
          </button>

          {/* NECESSITIES */}
          <div>
            {necessities}
            %&nbsp;-&nbsp;Necessities:&nbsp;
            {(
              necessities *
              (inputs.initialAmount - totalDeductions) *
              0.01
            ).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
