import useDeductionStore from '../../../stores/deductionStore';
import { validateDecimal } from '../../../utils/validation';

const Deductions = () => {
  const deductions = useDeductionStore((state) => state.deductions);
  const updateDeduction = useDeductionStore((state) => state.updateDeduction);

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

  return (
    <>
      <p className='mt-8 font-bold'>
        Deductions:{' '}
        {deductions.length <= 0 && (
          <span className='font-normal'>No Deductions Set</span>
        )}
      </p>
      <div
        className={`w-full grid sm:grid-cols-2 gap-4 ${deductions.length > 0 && 'mt-4'}`}
      >
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
                className='input input-sm input-primary rounded-lg w-16 text-right'
                name='value'
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
    </>
  );
};

export default Deductions;
