import { GrAdd } from 'react-icons/gr';
import CustomJarCard from './CustomJarCard';
import { validatePercentage } from '../../utils/validation';
import useJarStore from '../../stores/jarStore';

const CustomJars = () => {
  const customJars = useJarStore((state) => state.customJars);
  const addCustomJar = useJarStore((state) => state.addCustomJar);
  const updateCustomJar = useJarStore((state) => state.updateCustomJar);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
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
        />
      ))}
      <div className='card card-compact bg-transparent card-bordered border-info border-2 text-neutral-content rounded-2xl flex items-center justify-center min-h-[156px]'>
        <button
          className='btn btn-circle btn-lg btn-info tooltip'
          data-tip='Add a Custom Jar'
          onClick={addCustomJar}
        >
          <GrAdd size='2rem' className='ml-[0.95rem] text-white' />
        </button>
      </div>
    </>
  );
};

export default CustomJars;
