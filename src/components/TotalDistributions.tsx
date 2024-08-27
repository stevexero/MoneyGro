import useInputsStore from '../stores/initialAmountStore';
import useDeductionStore from '../stores/deductionStore';
import useJarStore from '../stores/jarStore';

const TotalDistributions: React.FC = () => {
  const initialAmount = useInputsStore((state) => state.initialAmount);
  const { jarInputs, customJars } = useJarStore();
  const totalDeductions = useDeductionStore((state) => state.totalDeductions);

  const totalPercentage =
    jarInputs.dreams +
    jarInputs.freedom +
    jarInputs.knowledge +
    jarInputs.generosity +
    jarInputs.joy +
    customJars.reduce((acc, jar) => acc + jar.value, 0);

  const initialAmt =
    typeof initialAmount === 'number'
      ? initialAmount
      : parseFloat(initialAmount) || 0;

  const distributableAmount = initialAmt - totalDeductions;

  const totalDistributedAmount = (distributableAmount * totalPercentage) / 100;

  return (
    <div className='card card-compact card-bordered border-primary border-2 rounded-xl mt-6 w-full max-w-md'>
      <div className='card-body w-full flex justify-center items-center'>
        <h3>
          <span className='text-secondary'>{totalPercentage}</span>% -{' '}
          <span className='font-bold'>Total Distributions:</span> $
          <span className='text-secondary'>
            {totalDistributedAmount.toFixed(2)}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default TotalDistributions;
