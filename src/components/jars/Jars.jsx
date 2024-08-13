import JarsCard from './JarsCard';
import useInputsStore from '../../store';
import { validatePercentage } from '../../utils/validation';

const Jars = () => {
  const jarInputs = useInputsStore((state) => state.jarInputs);
  const setJarInputs = useInputsStore((state) => state.setJarInputs);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (validatePercentage(value)) {
      setJarInputs(name, value);
    }
  };

  return (
    <>
      <JarsCard
        jarId='freedom'
        jarName='freedom'
        jarTitle='Freedom'
        jarValue={jarInputs.freedom}
        handleJarPercentageChange={handleChange}
      />

      <JarsCard
        jarId='dreams'
        jarName='dreams'
        jarTitle='Dreams'
        jarValue={jarInputs.dreams}
        handleJarPercentageChange={handleChange}
      />

      <JarsCard
        jarId='generosity'
        jarName='generosity'
        jarTitle='Generosity'
        jarValue={jarInputs.generosity}
        handleJarPercentageChange={handleChange}
      />

      <JarsCard
        jarId='knowledge'
        jarName='knowledge'
        jarTitle='Knowledge'
        jarValue={jarInputs.knowledge}
        handleJarPercentageChange={handleChange}
      />

      <JarsCard
        jarId='joy'
        jarName='joy'
        jarTitle='Joy'
        jarValue={jarInputs.joy}
        handleJarPercentageChange={handleChange}
      />
    </>
  );
};

export default Jars;
