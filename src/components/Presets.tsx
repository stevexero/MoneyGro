import { useEffect, useState } from 'react';
import useInputsStore from '../store';

const Presets: React.FC = () => {
  const jarInputs = useInputsStore((state) => state.jarInputs);
  const setJarInputs = useInputsStore((state) => state.setJarInputs);

  const [optionsDisabled, setOptionsDisabled] = useState(true);
  const [category, setCategory] = useState('default');
  const [fixedAmt, setFixedAmt] = useState(1);
  const [isDefaultChecked, setIsDefaultChecked] = useState(true);
  const [isStartingChecked, setIsStartingChecked] = useState(false);
  const [isFixedChecked, setIsFixedChecked] = useState(false);
  const [isFivesChecked, setIsFivesChecked] = useState(false);
  const [isTensChecked, setIsTensChecked] = useState(false);
  const [isCustomChecked, setIsCustomChecked] = useState(false);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'default') {
      setCategory('default');
      setOptionsDisabled(true);

      setIsDefaultChecked(true);
      setIsStartingChecked(false);
      setIsFixedChecked(false);
      setIsFivesChecked(false);
      setIsTensChecked(false);
      setIsCustomChecked(false);

      setJarInputs('freedom', 10);
      setJarInputs('dreams', 10);
      setJarInputs('generosity', 5);
      setJarInputs('knowledge', 10);
      setJarInputs('joy', 10);
    } else if (e.target.id === 'starting') {
      setCategory('starting');
      setOptionsDisabled(true);

      setIsDefaultChecked(false);
      setIsStartingChecked(true);
      setIsFixedChecked(false);
      setIsFivesChecked(false);
      setIsTensChecked(false);
      setIsCustomChecked(false);

      setJarInputs('freedom', 3);
      setJarInputs('dreams', 3);
      setJarInputs('generosity', 3);
      setJarInputs('knowledge', 3);
      setJarInputs('joy', 3);
    } else if (e.target.id === 'fives') {
      setCategory('fives');
      setOptionsDisabled(true);

      setIsDefaultChecked(false);
      setIsStartingChecked(false);
      setIsFixedChecked(false);
      setIsFivesChecked(true);
      setIsTensChecked(false);
      setIsCustomChecked(false);

      setJarInputs('freedom', 5);
      setJarInputs('dreams', 5);
      setJarInputs('generosity', 5);
      setJarInputs('knowledge', 5);
      setJarInputs('joy', 5);
    } else if (e.target.id === 'tens') {
      setCategory('tens');
      setOptionsDisabled(true);

      setIsDefaultChecked(false);
      setIsStartingChecked(false);
      setIsFixedChecked(false);
      setIsFivesChecked(false);
      setIsTensChecked(true);
      setIsCustomChecked(false);

      setJarInputs('freedom', 10);
      setJarInputs('dreams', 10);
      setJarInputs('generosity', 10);
      setJarInputs('knowledge', 10);
      setJarInputs('joy', 10);
    } else if (e.target.id === 'fixed') {
      setCategory('fixed');
      setOptionsDisabled(false);

      setIsDefaultChecked(false);
      setIsStartingChecked(false);
      setIsFixedChecked(true);
      setIsFivesChecked(false);
      setIsTensChecked(false);
      setIsCustomChecked(false);

      setJarInputs('freedom', fixedAmt);
      setJarInputs('dreams', fixedAmt);
      setJarInputs('generosity', fixedAmt);
      setJarInputs('knowledge', fixedAmt);
      setJarInputs('joy', fixedAmt);
    } else {
      // Custom
      setCategory('custom');
      setOptionsDisabled(true);

      setIsDefaultChecked(false);
      setIsStartingChecked(false);
      setIsFixedChecked(false);
      setIsFivesChecked(false);
      setIsTensChecked(false);
      setIsCustomChecked(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFixedAmt(parseFloat(e.target.value));

    setJarInputs('freedom', e.target.value);
    setJarInputs('dreams', e.target.value);
    setJarInputs('generosity', e.target.value);
    setJarInputs('knowledge', e.target.value);
    setJarInputs('joy', e.target.value);
  };

  useEffect(() => {
    if (category === 'default') {
      if (
        jarInputs.freedom === 10 &&
        jarInputs.dreams === 10 &&
        jarInputs.knowledge === 10 &&
        jarInputs.generosity === 5 &&
        jarInputs.joy === 10
      ) {
        setIsDefaultChecked(true);
        setIsStartingChecked(false);
        setIsFixedChecked(false);
        setIsFivesChecked(false);
        setIsTensChecked(false);
        setIsCustomChecked(false);
      } else {
        setIsDefaultChecked(false);
        setIsStartingChecked(false);
        setIsFixedChecked(false);
        setIsFivesChecked(false);
        setIsTensChecked(false);
        setIsCustomChecked(true);
      }
    } else if (category === 'starting') {
      if (Object.values(jarInputs).every((value) => value === 3)) {
        setIsDefaultChecked(false);
        setIsStartingChecked(true);
        setIsFixedChecked(false);
        setIsFivesChecked(false);
        setIsTensChecked(false);
        setIsCustomChecked(false);
      } else {
        setIsDefaultChecked(false);
        setIsStartingChecked(false);
        setIsFixedChecked(false);
        setIsFivesChecked(false);
        setIsTensChecked(false);
        setIsCustomChecked(true);
      }
    } else if (category === 'fixed') {
      if (Object.values(jarInputs).every((value) => value === fixedAmt)) {
        setOptionsDisabled(false);

        setIsDefaultChecked(false);
        setIsStartingChecked(false);
        setIsFixedChecked(true);
        setIsFivesChecked(false);
        setIsTensChecked(false);
        setIsCustomChecked(false);
      } else {
        setOptionsDisabled(true);

        setIsDefaultChecked(false);
        setIsStartingChecked(false);
        setIsFixedChecked(false);
        setIsFivesChecked(false);
        setIsTensChecked(false);
        setIsCustomChecked(true);
      }
    } else if (category === 'fives') {
      if (Object.values(jarInputs).every((value) => value === 5)) {
        setIsDefaultChecked(false);
        setIsStartingChecked(false);
        setIsFixedChecked(false);
        setIsFivesChecked(true);
        setIsTensChecked(false);
        setIsCustomChecked(false);
      } else {
        setIsDefaultChecked(false);
        setIsStartingChecked(false);
        setIsFixedChecked(false);
        setIsFivesChecked(false);
        setIsTensChecked(false);
        setIsCustomChecked(true);
      }
    } else if (category === 'tens') {
      if (Object.values(jarInputs).every((value) => value === 10)) {
        setIsDefaultChecked(false);
        setIsStartingChecked(false);
        setIsFixedChecked(false);
        setIsFivesChecked(false);
        setIsTensChecked(true);
        setIsCustomChecked(false);
      } else {
        setIsDefaultChecked(false);
        setIsStartingChecked(false);
        setIsFixedChecked(false);
        setIsFivesChecked(false);
        setIsTensChecked(false);
        setIsCustomChecked(true);
      }
    }
  }, [jarInputs, category, fixedAmt]);

  return (
    <div className='w-full max-w-md grid grid-cols-2 sm:grid-cols-3 gap-x-4 mt-6'>
      <div className='flex flex-row items-center ml-4 sm:ml-0'>
        <input
          className='radio radio-primary mr-2'
          id='default'
          type='radio'
          name='jars'
          checked={isDefaultChecked}
          onChange={handleCheck}
        />
        <label className='label cursor-pointer' htmlFor='default'>
          Default
        </label>
      </div>
      <div className='flex flex-row items-center'>
        <input
          className='radio radio-primary mr-2'
          id='starting'
          type='radio'
          name='jars'
          checked={isStartingChecked}
          onChange={handleCheck}
        />
        <label className='label cursor-pointer' htmlFor='starting'>
          Starting Out
        </label>
      </div>
      <div className='flex flex-row items-center ml-4 sm:ml-0'>
        <input
          className='radio radio-primary mr-2'
          id='fixed'
          type='radio'
          name='jars'
          checked={isFixedChecked}
          onChange={handleCheck}
        />
        <label className='label cursor-pointer' htmlFor='fixed'>
          Fixed
        </label>
        <select
          className='select select-primary select-xs rounded-full ml-4'
          onChange={handleChange}
          disabled={optionsDisabled}
        >
          <option defaultChecked>1</option>
          <option>2</option>
          <option>4</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>11</option>
          <option>12</option>
          <option>13</option>
          <option>14</option>
          <option>15</option>
          <option>16</option>
          <option>17</option>
          <option>18</option>
          <option>19</option>
          <option>20</option>
        </select>
      </div>
      <div className='flex flex-row items-center'>
        <input
          className='radio radio-primary mr-2'
          id='fives'
          type='radio'
          name='jars'
          checked={isFivesChecked}
          onChange={handleCheck}
        />
        <label className='label cursor-pointer' htmlFor='fives'>
          Fives
        </label>
      </div>
      <div className='flex flex-row items-center ml-4 sm:ml-0'>
        <input
          className='radio radio-primary mr-2'
          id='tens'
          type='radio'
          name='jars'
          checked={isTensChecked}
          onChange={handleCheck}
        />
        <label className='label cursor-pointer' htmlFor='tens'>
          Tens
        </label>
      </div>
      <div className='flex flex-row items-center'>
        <input
          className='radio radio-primary mr-2'
          id='custom'
          type='radio'
          name='jars'
          checked={isCustomChecked}
          onChange={handleCheck}
        />
        <label className='label cursor-pointer' htmlFor='custom'>
          Custom
        </label>
      </div>
    </div>
  );
};

export default Presets;
