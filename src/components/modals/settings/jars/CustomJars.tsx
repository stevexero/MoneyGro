import useJarStore from '../../../../stores/jarStore';
import { validatePercentage } from '../../../../utils/validation';

const CustomJars = () => {
  const customJars = useJarStore((state) => state.customJars);
  const updateCustomJar = useJarStore((state) => state.updateCustomJar);

  const handleCustomJarChange = (
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
      <p className='mt-8 font-bold'>
        Custom Jars:{' '}
        {customJars.length <= 0 && (
          <span className='font-normal'>No Custom Jars Set</span>
        )}
      </p>
      <div
        className={`w-full grid sm:grid-cols-2 gap-4 ${customJars.length > 0 && 'mt-4'}`}
      >
        {customJars.map((jar, index) => (
          <div
            key={index}
            className='flex flex-row items-center justify-between'
          >
            <label className='mr-4' htmlFor='dreams'>
              {jar.name}
            </label>
            <div>
              <input
                type='number'
                className='input input-sm input-primary rounded-lg w-16 text-right'
                name='value'
                value={jar.value === 0 ? '' : jar.value}
                onChange={(event) => handleCustomJarChange(event, index)}
                min={0}
                max={99}
                placeholder='0'
              />{' '}
              %
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CustomJars;
