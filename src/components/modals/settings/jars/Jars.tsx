import useJarStore from '../../../../stores/jarStore';
import { validatePercentage } from '../../../../utils/validation';
import JarsDiv from './JarsDiv';

const Jars: React.FC = () => {
  const jarInputs = useJarStore((state) => state.jarInputs);
  const setJarInputs = useJarStore((state) => state.setJarInputs);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (validatePercentage(value)) {
      setJarInputs(name, value);
    }
  };

  return (
    <>
      <p className='mt-4 font-bold'>Standard Jars:</p>
      <div className='w-full grid sm:grid-cols-2 gap-4 mt-4'>
        <JarsDiv
          jarId='freedom'
          jarTitle='Freedom'
          jarValue={jarInputs.freedom}
          handleJarPercentageChange={handleChange}
        />

        <JarsDiv
          jarId='dreams'
          jarTitle='Dreams'
          jarValue={jarInputs.dreams}
          handleJarPercentageChange={handleChange}
        />

        <JarsDiv
          jarId='generosity'
          jarTitle='Generosity'
          jarValue={jarInputs.generosity}
          handleJarPercentageChange={handleChange}
        />

        <JarsDiv
          jarId='knowledge'
          jarTitle='Knowledge'
          jarValue={jarInputs.knowledge}
          handleJarPercentageChange={handleChange}
        />

        <JarsDiv
          jarId='joy'
          jarTitle='Joy'
          jarValue={jarInputs.joy}
          handleJarPercentageChange={handleChange}
        />
      </div>
    </>
  );
};

export default Jars;
