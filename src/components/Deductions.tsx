import { useEffect, useState } from 'react';
import { CgRename } from 'react-icons/cg';
import { TbLockDollar } from 'react-icons/tb';
import { FaPercent } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { GrAdd } from 'react-icons/gr';
import useInputsStore from '../store';
import { validateDecimal } from '../utils/validation';

const Deductions: React.FC = () => {
  const initialAmount = useInputsStore((state) => state.initialAmount);
  const deductions = useInputsStore((state) => state.deductions);
  const addDeduction = useInputsStore((state) => state.addDeduction);
  const renameDeduction = useInputsStore((state) => state.renameDeduction);
  const updateDeduction = useInputsStore((state) => state.updateDeduction);
  const toggleDeductionType = useInputsStore(
    (state) => state.toggleDeductionType
  );
  const removeDeduction = useInputsStore((state) => state.removeDeduction);
  const totalDeductions = useInputsStore((state) => state.totalDeductions);
  const setTotalDeductions = useInputsStore(
    (state) => state.setTotalDeductions
  );
  const distributableAmount = useInputsStore(
    (state) => state.distributableAmount
  );
  const setDistributableAmount = useInputsStore(
    (state) => state.setDistributableAmount
  );

  const [isDisabled, setIsDisabled] = useState(true);

  const initialAmt =
    typeof initialAmount === 'string'
      ? parseFloat(initialAmount)
      : initialAmount;

  const handleRenameDeduction = (index: number) => {
    const newName = window.prompt(
      'Enter new name for the deduction:',
      deductions[index].name
    );
    if (newName) {
      renameDeduction(index, newName);
    }
  };

  const handleDeductionChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (validateDecimal(value)) {
      updateDeduction(index, name, value);
    }
  };

  const handleDeductionTypeToggle = (index: number) => {
    toggleDeductionType(index);
  };

  const removeDeductionField = (index: number) => {
    removeDeduction(index);
  };

  useEffect(() => {
    setTotalDeductions(initialAmt);
  }, [deductions, initialAmt, setTotalDeductions]);

  useEffect(() => {
    const initAmt = initialAmt || 0;
    const amountLeftAfterDeductions = initAmt - totalDeductions;
    setDistributableAmount(amountLeftAfterDeductions);
  }, [totalDeductions, initialAmt, setDistributableAmount]);

  useEffect(() => {
    if (initialAmt <= 0 || isNaN(initialAmt)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [initialAmt]);

  return (
    <>
      {deductions.map((deduction, index) => (
        <div
          className='collapse collapse-arrow border rounded-3xl mb-2 p-0 max-w-sm'
          key={index}
        >
          <input type='checkbox' className='peer' defaultChecked />
          <div className='collapse-title bg-transparent peer-checked:border-b-0'>
            {deduction.name}
          </div>
          <div className='collapse-content bg-transparent'>
            <div className='flex flex-row items-center'>
              <div
                className={`${typeof initialAmount === 'number' && initialAmount <= 0 && 'hover:cursor-not-allowed opacity-50'} mt-[0.27rem]`}
              >
                <button
                  className='btn btn-circle btn-sm btn-outline btn-secondary tooltip tooltip-right'
                  data-tip='Rename Deduction'
                  onClick={() => handleRenameDeduction(index)}
                  disabled={isDisabled}
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
                  disabled={isDisabled}
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
                  data-tip={isDisabled ? null : 'Fixed Amount Deduction'}
                >
                  <TbLockDollar
                    className={`${
                      deduction.type === 'fixed'
                        ? `${
                            isDisabled
                              ? 'text-secondary opacity-50 hover:cursor-not-allowed'
                              : 'text-primary'
                          }`
                        : isDisabled
                          ? 'text-secondary dark:opacity-50 hover:cursor-not-allowed'
                          : 'text-secondary dark:opacity-50 hover:cursor-pointer'
                    } duration-200`}
                    onClick={
                      deduction.type !== 'fixed' && !isDisabled
                        ? () => handleDeductionTypeToggle(index)
                        : undefined
                    }
                    size='1.2rem'
                  />
                </span>
                <input
                  type='checkbox'
                  className='toggle toggle-secondary ml-4 rounded-full custom-toggle-duration'
                  checked={deduction.type === 'percentage'}
                  onChange={() => handleDeductionTypeToggle(index)}
                  disabled={isDisabled}
                />
                <span
                  className='tooltip tooltip-right ml-4'
                  data-tip={isDisabled ? null : 'Percentage Deduction'}
                >
                  <FaPercent
                    className={`${
                      deduction.type === 'fixed'
                        ? `${
                            isDisabled
                              ? 'text-secondary dark:opacity-50 hover:cursor-not-allowed'
                              : 'text-secondary dark:opacity-50 hover:cursor-pointer'
                          }`
                        : isDisabled
                          ? 'text-secondary opacity-50 hover:cursor-not-allowed'
                          : 'text-primary'
                    } duration-200`}
                    onClick={
                      deduction.type !== 'percentage' && !isDisabled
                        ? () => handleDeductionTypeToggle(index)
                        : undefined
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
            onClick={addDeduction}
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
                  const initialAmt =
                    typeof initialAmount === 'number'
                      ? initialAmount
                      : parseFloat(initialAmount);
                  const deductionValue =
                    typeof deduction.value === 'number'
                      ? deduction.value
                      : parseFloat(deduction.value || '0');

                  const deductionAmount =
                    deduction.type === 'percentage'
                      ? (initialAmt * deductionValue) / 100
                      : deductionValue;

                  return (
                    <li
                      key={index}
                      className='list-disc list-inside text-sm font-semibold ml-6 mt-2 first:mt-4'
                    >
                      {deduction.name}: <span className='font-light'>$</span>
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
    </>
  );
};

export default Deductions;
