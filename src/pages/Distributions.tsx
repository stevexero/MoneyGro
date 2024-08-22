import AnimatedInput from '../components/AnimatedInput';
import Deductions from '../components/deductions/Deductions';
import CustomJars from '../components/jars/CustomJars';
import Jars from '../components/jars/Jars';
import Necessities from '../components/Necessities';
import Presets from '../components/Presets';
import TotalDistributions from '../components/TotalDistributions';

const Distributions = () => {
  return (
    <div className='container flex flex-col items-center mt-12'>
      <AnimatedInput />
      <Presets />

      <div className='mt-8 w-full flex flex-col items-center'>
        <Deductions />

        <div className='container w-full max-w-lg grid grid-cols-2 gap-4 mt-8'>
          <Jars />
          <CustomJars />
        </div>

        <TotalDistributions />
        <Necessities />
      </div>
    </div>
  );
};

export default Distributions;
