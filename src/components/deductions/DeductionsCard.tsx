import { useEffect, useState } from 'react';
import { CgRename } from 'react-icons/cg';
import { TbLockDollar } from 'react-icons/tb';
import { FaPercent } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import useInputsStore from '../../store';
import { validateDecimal } from '../../utils/validation';

const DeductionsCard: React.FC = () => {
  const initialAmount = useInputsStore((state) => state.initialAmount);
  const deductions = useInputsStore((state) => state.deductions);
  const totalDeductions = useInputsStore((state) => state.totalDeductions);
  const setTotalDeductions = useInputsStore(
    (state) => state.setTotalDeductions
  );
  const updateDeduction = useInputsStore((state) => state.updateDeduction);
  const toggleDeductionType = useInputsStore(
    (state) => state.toggleDeductionType
  );
  const removeDeduction = useInputsStore((state) => state.removeDeduction);
  const setCurrentDeductionIndex = useInputsStore(
    (state) => state.setCurrentDeductionIndex
  );
  const setDistributableAmount = useInputsStore(
    (state) => state.setDistributableAmount
  );
  const setIsDeductionsRenameModalOpen = useInputsStore(
    (state) => state.setIsDeductionsRenameModalOpen
  );
  const setNewDeductionName = useInputsStore(
    (state) => state.setNewDeductionName
  );

  const [isDisabled, setIsDisabled] = useState(true);

  const initialAmt =
    typeof initialAmount === 'string'
      ? parseFloat(initialAmount)
      : initialAmount;

  const openRenameModal = (index: number) => {
    setCurrentDeductionIndex(index);
    setNewDeductionName(deductions[index].name);
    setIsDeductionsRenameModalOpen(true);
  };

  const handleDeductionChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
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
          className='collapse collapse-arrow border-info border-2 rounded-3xl mb-4 p-0 max-w-sm'
          key={index}
        >
          <input type='checkbox' className='peer' defaultChecked />
          <div className='collapse-title bg-transparent peer-checked:border-b-0 ml-1 after:-mt-[0.175rem] after:mr-1'>
            {deduction.name}{' '}
            {typeof deduction.value === 'string'
              ? parseFloat(deduction.value) > 0 &&
                `: ${deduction.type === 'fixed' ? '$' : ''}${deduction.value}${deduction.type === 'percentage' ? '%' : ''}`
              : deduction.value > 0 &&
                `: ${deduction.type === 'fixed' ? '$' : ''}${deduction.value}${deduction.type === 'percentage' ? '%' : ''}`}
          </div>
          <div className='collapse-content bg-transparent'>
            <div className='flex flex-row items-center'>
              <div
                className={`${typeof initialAmount === 'number' && initialAmount <= 0 && 'hover:cursor-not-allowed opacity-50'} mt-[0.27rem]`}
              >
                <button
                  className='btn btn-circle btn-sm btn-outline btn-secondary tooltip tooltip-right'
                  data-tip='Rename Deduction'
                  onClick={() => openRenameModal(index)}
                  disabled={isDisabled}
                >
                  <CgRename
                    className='ml-[0.35rem] mt-[0.075rem]'
                    size='1.2rem'
                  />
                </button>
              </div>
              <label className='input input-bordered input-sm input-secondary rounded-full w-full flex items-center gap-2 px-4 ml-4 whitespace-nowrap'>
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
    </>
  );
};

export default DeductionsCard;
