import Navbar from './components/Navbar';
import AnimatedInput from './components/AnimatedInput';
import Deductions from './components/Deductions';
import Jars from './components/jars/Jars';
import CustomJars from './components/jars/CustomJars';
import Necessities from './components/Necessities';
import TotalDistributions from './components/TotalDistributions';

const App: React.FC = () => {
  return (
    <div className='container mx-auto px-4 md:px-0 overflow-x-hidden'>
      <Navbar />
      <div className='container flex flex-col items-center mt-12'>
        <AnimatedInput />

        <div className='mt-16 w-full flex flex-col items-center'>
          <Deductions />

          <div className='container w-full max-w-lg grid grid-cols-2 gap-4 mt-8 lg:max-w-2xl lg:grid-cols-3'>
            <Jars />
            <CustomJars />
          </div>

          <TotalDistributions />
          <Necessities />
        </div>
      </div>
    </div>
  );
};

export default App;
