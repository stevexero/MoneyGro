import { useEffect } from 'react';
import useInputsStore from '../store';

const Necessities = () => {
  const initialAmount = useInputsStore((state) => state.initialAmount);
  const totalDeductions = useInputsStore((state) => state.totalDeductions);
  const jarInputs = useInputsStore((state) => state.jarInputs);
  const customJars = useInputsStore((state) => state.customJars);
  const necessities = useInputsStore((state) => state.necessities);
  const setNecessities = useInputsStore((state) => state.setNecessities);

  useEffect(() => {
    setNecessities(
      100 -
        (jarInputs.joy +
          jarInputs.generosity +
          jarInputs.knowledge +
          jarInputs.freedom +
          jarInputs.dreams +
          customJars.reduce(
            (acc, jar) => acc + (parseFloat(jar.value) || 0),
            0
          ))
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
    <div className='card bg-neutral text-neutral-content rounded-xl mt-6 mb-16 w-full max-w-lg p-4 lg:max-w-2xl'>
      <div className='card-body w-full flex justify-center items-center '>
        <h2 className='card-title'>
          {necessities}% - Leftover for Necessities
        </h2>
        <div className='font-bold text-4xl mt-4'>
          $&nbsp;
          {(necessities * (initialAmount - totalDeductions) * 0.01).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Necessities;
