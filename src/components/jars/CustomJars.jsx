import { GrAdd } from 'react-icons/gr';
import CustomJarCard from './CustomJarCard';
import useInputsStore from '../../store';
import { validatePercentage } from '../../utils/validation';

const CustomJars = () => {
  const customJars = useInputsStore((state) => state.customJars);
  const addCustomJar = useInputsStore((state) => state.addCustomJar);
  const updateCustomJar = useInputsStore((state) => state.updateCustomJar);

  const handleChange = (event, index) => {
    const { name, value } = event.target;

    if (validatePercentage(value)) {
      updateCustomJar(index, name, value);
    }
  };

  return (
    <>
      {customJars.map((jar, index) => (
        <CustomJarCard
          key={index}
          jarIndex={index}
          jarId={jar.name}
          jarTitle={jar.name}
          jarValue={jar.value}
          handleJarPercentageChange={(event) => handleChange(event, index)}
          customCard={true}
          customCardIndex={index}
        />
      ))}
      <div className='card card-compact bg-transparent card-bordered border-neutral text-neutral-content rounded-xl flex items-center justify-center min-h-[156px]'>
        <button
          className='btn btn-circle btn-lg btn-primary tooltip'
          data-tip='Add a Custom Jar'
          onClick={addCustomJar}
        >
          <GrAdd size='2rem' className='ml-[0.95rem]' />
        </button>
      </div>
    </>
  );
};

export default CustomJars;
