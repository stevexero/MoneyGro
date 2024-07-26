import { useEffect, useState } from 'react';
import './App.css';

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
    <>
      <label htmlFor='initialAmount'>Initial Amount:&nbsp;&nbsp;$&nbsp;</label>
      <input
        type='number'
        name='initialAmount'
        id='initialAmount'
        value={inputs.initialAmount}
        placeholder='0.00'
        onChange={handleChange}
      />

      {/* USER DEDUCTIONS */}
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
                onChange={(event) => handleDeductionTypeChange(index, event)}
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
                onChange={(event) => handleDeductionTypeChange(index, event)}
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
    </>
  );
}

export default App;
