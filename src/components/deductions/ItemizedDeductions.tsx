import { FaEyeSlash } from 'react-icons/fa';
import useInputsStore from '../../stores/initialAmountStore';
import useDeductionStore from '../../stores/deductionStore';

const ItemizedDeductions: React.FC = () => {
  const initialAmount = useInputsStore((state) => state.initialAmount);
  const {
    deductions,
    toggleDeductionsHidden,
    totalDeductions,
    distributableAmount,
  } = useDeductionStore();

  return (
    <>
      {deductions && deductions.length > 0 && (
        <div className='border-info border-2 rounded-3xl mb-2 p-6 mt-4 w-full max-w-sm'>
          {deductions.length > 0 && (
            <div>
              <div className='w-full flex flex-row items-center justify-between'>
                <h3 className='font-bold text-lg'>Itemized Deductions:</h3>
                <button
                  type='button'
                  className='btn btn-circle btn-xs btn-outline btn-error tooltip tooltip-left'
                  data-tip='Hide Deductions'
                  onClick={() => toggleDeductionsHidden()}
                >
                  <FaEyeSlash className='ml-[0.3rem]' />
                </button>
              </div>
              <ul>
                {deductions.map((deduction, index) => {
                  const initialAmt = Number.isNaN(Number(initialAmount))
                    ? 0
                    : Number(initialAmount);

                  const deductionValue = Number.isNaN(Number(deduction.value))
                    ? 0
                    : Number(deduction.value);

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
                  {isNaN(Number(totalDeductions))
                    ? '0.00'
                    : totalDeductions.toFixed(2)}
                  {/* {totalDeductions.toFixed(2)} */}
                </span>
              </p>
              <p className='mt-4 font-semibold'>
                Distributable Amount: <span className='font-light'>$</span>
                <span className='font-normal text-secondary'>
                  {isNaN(Number(distributableAmount))
                    ? '0.00'
                    : distributableAmount.toFixed(2)}
                  {/* {distributableAmount.toFixed(2)} */}
                </span>
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ItemizedDeductions;
