import { useEffect } from 'react';
import useInputsStore from '../stores/initialAmountStore';
import useJarStore from '../stores/jarStore';
import useDeductionStore from '../stores/deductionStore';

const Necessities: React.FC = () => {
  const initialAmount = useInputsStore((state) => state.initialAmount);
  const totalDeductions = useDeductionStore((state) => state.totalDeductions);
  const { jarInputs, customJars, necessities, setNecessities } = useJarStore();

  const initialAmt =
    typeof initialAmount === 'string'
      ? parseFloat(initialAmount) || 0
      : initialAmount;

  useEffect(() => {
    setNecessities(
      100 -
        (jarInputs.joy +
          jarInputs.generosity +
          jarInputs.knowledge +
          jarInputs.freedom +
          jarInputs.dreams +
          customJars.reduce((acc: number, jar) => acc + jar.value, 0))
    );
  }, [
    jarInputs.dreams,
    jarInputs.freedom,
    jarInputs.knowledge,
    jarInputs.generosity,
    jarInputs.joy,
    customJars,
    setNecessities,
  ]);

  return (
    <div className='card bg-neutral text-neutral-content rounded-xl mt-4 mb-16 w-full max-w-lg p-4'>
      <div className='card-body w-full flex justify-center items-center '>
        <h2 className='card-title'>{necessities}% - Necessities</h2>
        <div className='font-bold text-4xl mt-4'>
          $&nbsp;
          {(necessities * (initialAmt - totalDeductions) * 0.01).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Necessities;
