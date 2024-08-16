import Navbar from './components/Navbar';
import AnimatedInput from './components/AnimatedInput';
import Deductions from './components/deductions/Deductions';
import Jars from './components/jars/Jars';
import CustomJars from './components/jars/CustomJars';
import Necessities from './components/Necessities';
import TotalDistributions from './components/TotalDistributions';
import Presets from './components/Presets';
import Footer from './components/Footer';

const App: React.FC = () => {
  localStorage.setItem('umami.disabled', '1');

  return (
    <div className='container mx-auto px-4 md:px-0 overflow-x-hidden'>
      <Navbar />
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
      <Footer />
    </div>
  );
};

export default App;
