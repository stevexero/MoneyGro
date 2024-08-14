import { FaEye } from 'react-icons/fa';
import useInputsStore from '../../store';

const DeductionsSummary: React.FC = () => {
  const totalDeductions = useInputsStore((state) => state.totalDeductions);
  const distributableAmount = useInputsStore(
    (state) => state.distributableAmount
  );
  const toggleDeductionsHidden = useInputsStore(
    (state) => state.toggleDeductionsHidden
  );

  return (
    <div className='card card-compact card-bordered border-primary border-2 rounded-xl mt-6 w-full max-w-md'>
      <div className='card-body w-full flex flex-row justify-between items-center'>
        <div className='flex flex-row items-center flex-wrap'>
          <span>
            <span className='font-bold'>Deductions:</span>
            &nbsp;$
            <span className='text-secondary'>{totalDeductions.toFixed(2)}</span>
          </span>
          <span>
            &nbsp;&nbsp;
            <span>
              <span className='font-bold'>Distributable:</span>&nbsp;$
              <span className='text-secondary'>
                {distributableAmount.toFixed(2)}
              </span>
            </span>
          </span>
        </div>
        <button
          type='button'
          className='btn btn-circle btn-xs btn-outline btn-error tooltip tooltip-left'
          data-tip='Show Deductions'
          onClick={() => toggleDeductionsHidden()}
        >
          <FaEye className='ml-[0.3rem]' />
        </button>
      </div>
    </div>
  );
};

export default DeductionsSummary;
