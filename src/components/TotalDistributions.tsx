import useInputsStore from '../store';

const TotalDistributions: React.FC = () => {
  const initialAmount = useInputsStore((state) => state.initialAmount);
  const jarInputs = useInputsStore((state) => state.jarInputs);
  const customJars = useInputsStore((state) => state.customJars);
  const totalDeductions = useInputsStore((state) => state.totalDeductions);

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
    <div className='card card-compact card-bordered border-primary border-4 rounded-3xl mt-6 w-full max-w-lg lg:max-w-2xl'>
      <div className='card-body w-full flex justify-center items-center font-extralight'>
        {/* <span className='card-title'> */}
        <h3>
          {totalPercentage}% - Total Distributions: $
          {totalDistributedAmount.toFixed(2)}
        </h3>
        {/* </span> */}
      </div>
    </div>
  );
};

export default TotalDistributions;
