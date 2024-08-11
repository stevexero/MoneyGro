import { useEffect, useState } from 'react';
import { GrClose, GrAdd } from 'react-icons/gr';
import { FaPercent } from 'react-icons/fa6';
import { CgRename } from 'react-icons/cg';
import useInputsStore from './store';
import Navbar from './components/Navbar';
import AnimatedInput from './components/AnimatedInput';
import Deductions from './components/Deductions';
import JarsCard from './components/jars/JarsCard';

function App() {
  const initialAmount = useInputsStore((state) => state.initialAmount);
  const totalDeductions = useInputsStore((state) => state.totalDeductions);

  const [inputs, setInputs] = useState({
    dreams: 10,
    freedom: 10,
    knowledge: 10,
    generosity: 5,
    joy: 10,
  });
  const [necessities, setNecessities] = useState(100);
  const [customJars, setCustomJars] = useState([]);

  const validateDecimal = (value) => {
    const pattern = /^\d*(\.\d{0,2})?$/;
    return pattern.test(value);
  };

  const validatePercentage = (value) => {
    const pattern = /^\d{0,2}$/;
    return pattern.test(value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'initialAmount') {
      if (validateDecimal(value)) {
        setInputs({
          ...inputs,
          [name]: parseFloat(value) || value,
        });
      }
    } else {
      if (validatePercentage(value)) {
        setInputs({
          ...inputs,
          [name]: parseFloat(value) || value,
        });
      }
    }
  };

  const handleCustomJarChange = (index, event) => {
    const { name, value } = event.target;
    setCustomJars((prevCustomJars) =>
      prevCustomJars.map((jar, i) =>
        i === index
          ? {
              ...jar,
              [name]: parseFloat(value) || value,
            }
          : jar
      )
    );
  };

  const addCustomJarField = () => {
    setCustomJars((prevCustomJars) => [
      ...prevCustomJars,
      {
        value: '',
        name: 'Custom Jar',
      },
    ]);
  };

  const removeCustomJarField = (index) => {
    setCustomJars((prevCustomJars) =>
      prevCustomJars.filter((_, i) => i !== index)
    );
  };

  const renameCustomJar = (index) => {
    const newName = window.prompt(
      'Enter new name for the jar:',
      customJars[index].name
    );
    if (newName) {
      setCustomJars((prevCustomJars) =>
        prevCustomJars.map((jar, i) =>
          i === index ? { ...jar, name: newName } : jar
        )
      );
    }
  };

  useEffect(() => {
    setNecessities(
      100 -
        (inputs.joy +
          inputs.generosity +
          inputs.knowledge +
          inputs.freedom +
          inputs.dreams +
          customJars.reduce(
            (acc, jar) => acc + (parseFloat(jar.value) || 0),
            0
          ))
    );
  }, [
    inputs.dreams,
    inputs.freedom,
    inputs.knowledge,
    inputs.generosity,
    inputs.joy,
    customJars,
  ]);

  return (
    <div className='container mx-auto px-4 md:px-0 overflow-x-hidden'>
      <Navbar />
      <div className='container flex flex-col items-center mt-12'>
        <AnimatedInput />

        <div className='mt-16 w-full flex flex-col items-center'>
          {/* USER DEDUCTIONS */}
          <Deductions />

          {/* SIX JARS */}
          <div className='container w-full max-w-lg grid grid-cols-2 gap-4 mt-8 lg:max-w-2xl lg:grid-cols-3'>
            <JarsCard
              jarId='freedom'
              jarTitle='Freedom'
              jarValue={inputs.freedom}
              handleJarPercentageChange={handleChange}
            />

            <JarsCard
              jarId='dreams'
              jarTitle='Dreams'
              jarValue={inputs.dreams}
              handleJarPercentageChange={handleChange}
            />

            <JarsCard
              jarId='generosity'
              jarTitle='Generosity'
              jarValue={inputs.generosity}
              handleJarPercentageChange={handleChange}
            />

            <JarsCard
              jarId='knowledge'
              jarTitle='Knowledge'
              jarValue={inputs.knowledge}
              handleJarPercentageChange={handleChange}
            />

            <JarsCard
              jarId='joy'
              jarTitle='Joy'
              jarValue={inputs.joy}
              handleJarPercentageChange={handleChange}
            />

            {customJars.map((jar, index) => (
              <div
                key={index}
                className='inputs card card-compact bg-neutral text-neutral-content rounded-xl'
              >
                <div className='card-body'>
                  <h2 className='card-title'>{jar.name}</h2>
                  <div className='w-full flex justify-center items-center'>
                    <input
                      type='number'
                      name='value'
                      className='input bg-transparent font-bold text-4xl max-w-[4.5rem] text-center focus:outline-none active:outline-none focus:border-none active:border-none'
                      value={jar.value}
                      onChange={(event) => handleCustomJarChange(index, event)}
                      min={0}
                    />
                    <FaPercent size='2rem' />
                  </div>
                  <div className='card-actions w-full flex flex-row justify-between items-center'>
                    <div>
                      <button
                        className='btn btn-circle btn-xs btn-outline btn-primary tooltip tooltip-right'
                        data-tip='Rename Custom Jar'
                        onClick={() => renameCustomJar(index)}
                      >
                        <CgRename
                          className='ml-[0.1rem] mt-[0.075rem]'
                          size='1.1rem'
                        />
                      </button>
                      <button
                        className='btn btn-circle btn-xs btn-outline btn-error tooltip tooltip-top ml-2'
                        data-tip='Remove Custom Jar'
                        onClick={() => removeCustomJarField(index)}
                      >
                        <GrClose className='ml-[0.3rem]' />
                      </button>
                    </div>
                    <div>
                      $&nbsp;
                      {(
                        (initialAmount - totalDeductions) *
                        (jar.value * 0.01)
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className='card card-compact bg-transparent card-bordered border-neutral text-neutral-content rounded-xl flex items-center justify-center min-h-[156px]'>
              <button
                className='btn btn-circle btn-lg btn-primary tooltip'
                data-tip='Add a Custom Jar'
                onClick={addCustomJarField}
              >
                <GrAdd size='2rem' className='ml-[0.95rem]' />
              </button>
            </div>
          </div>

          {/* TODO: TOTAL DISTRIBUTIONS */}
          {/* <div className='card bg-neutral text-neutral-content rounded-xl mt-6 mb-16 w-full max-w-lg p-4 lg:max-w-2xl'>
            <div className='card-body w-full flex justify-center items-center '>
              <span className='card-title'>
                {necessities}% - Total Distributions
              </span>
              <div className='font-bold text-4xl mt-4'>
                $&nbsp;
                {(
                  necessities *
                  // (inputs.initialAmount - totalDeductions) *
                  (initialAmount - totalDeductions) *
                  0.01
                ).toFixed(2)}
              </div>
            </div>
          </div> */}

          {/* NECESSITIES */}
          <div className='card bg-neutral text-neutral-content rounded-xl mt-6 mb-16 w-full max-w-lg p-4 lg:max-w-2xl'>
            <div className='card-body w-full flex justify-center items-center '>
              <h2 className='card-title'>
                {necessities}% - Leftover for Necessities
              </h2>
              <div className='font-bold text-4xl mt-4'>
                $&nbsp;
                {(
                  necessities *
                  (initialAmount - totalDeductions) *
                  0.01
                ).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
