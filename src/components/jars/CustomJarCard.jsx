import PropTypes from 'prop-types';
import { FaPercent } from 'react-icons/fa6';
import useInputsStore from '../../store';
import { CgRename } from 'react-icons/cg';
import { GrClose } from 'react-icons/gr';

const CustomJarCard = ({
  jarIndex,
  jarId,
  jarTitle,
  jarValue,
  handleJarPercentageChange,
}) => {
  const initialAmount = useInputsStore((state) => state.initialAmount);
  const totalDeductions = useInputsStore((state) => state.totalDeductions);
  const customJars = useInputsStore((state) => state.customJars);
  const renameCustomJar = useInputsStore((state) => state.renameCustomJar);
  const removeCustomJar = useInputsStore((state) => state.removeCustomJar);

  const updateCustomJar = (index) => {
    const newName = window.prompt(
      'Enter new name for the jar:',
      customJars[index].name
    );
    if (newName) {
      renameCustomJar(newName, index);
    }
  };

  return (
    <div
      key={jarIndex}
      id={jarId}
      className='inputs card card-compact bg-neutral text-neutral-content rounded-xl'
    >
      <div className='card-body'>
        <h2 className='card-title'>{jarTitle}</h2>
        <div className='w-full flex justify-center items-center'>
          <input
            type='number'
            name='value'
            className='input bg-transparent font-bold text-4xl max-w-[4.5rem] text-center focus:outline-none active:outline-none focus:border-none active:border-none'
            value={jarValue}
            onChange={handleJarPercentageChange}
            min={0}
          />
          <FaPercent size='2rem' />
        </div>
        <div className='card-actions w-full flex flex-row justify-between items-center'>
          <div>
            <button
              className='btn btn-circle btn-xs btn-outline btn-primary tooltip tooltip-right'
              data-tip='Rename Custom Jar'
              onClick={() => updateCustomJar(jarIndex)}
            >
              <CgRename className='ml-[0.1rem] mt-[0.075rem]' size='1.1rem' />
            </button>
            <button
              className='btn btn-circle btn-xs btn-outline btn-error tooltip tooltip-top ml-2'
              data-tip='Remove Custom Jar'
              onClick={() => removeCustomJar(jarIndex)}
            >
              <GrClose className='ml-[0.3rem]' />
            </button>
          </div>
          <div>
            $&nbsp;
            {((initialAmount - totalDeductions) * (jarValue * 0.01)).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

CustomJarCard.propTypes = {
  jarIndex: PropTypes.number,
  jarId: PropTypes.string,
  jarTitle: PropTypes.string,
  jarValue: PropTypes.number,
  handleJarPercentageChange: PropTypes.func,
  customCard: PropTypes.bool,
  customCardIndex: PropTypes.number,
};

export default CustomJarCard;
