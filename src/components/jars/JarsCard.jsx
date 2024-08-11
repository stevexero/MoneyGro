import PropTypes from 'prop-types';
import { FaPercent } from 'react-icons/fa6';
import useInputsStore from '../../store';

const JarsCard = ({ jarId, jarTitle, jarValue, handleJarPercentageChange }) => {
  const initialAmount = useInputsStore((state) => state.initialAmount);
  const totalDeductions = useInputsStore((state) => state.totalDeductions);
  return (
    <div className='card card-compact bg-neutral text-neutral-content rounded-xl'>
      <div className='card-body'>
        <h2 className='card-title'>{jarTitle}</h2>
        <div className='w-full flex justify-center items-center'>
          <input
            type='number'
            className='input bg-transparent font-bold text-4xl max-w-[4.5rem] text-center focus:outline-none active:outline-none focus:border-none active:border-none'
            name={jarId}
            id={jarId}
            value={jarValue}
            onChange={handleJarPercentageChange}
            min={0}
            max={99}
          />
          <FaPercent size='2rem' />
        </div>
        <div className='card-actions justify-end'>
          <div>
            $&nbsp;
            {((initialAmount - totalDeductions) * (jarValue * 0.01)).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

JarsCard.propTypes = {
  jarId: PropTypes.string,
  jarTitle: PropTypes.string,
  jarValue: PropTypes.number,
  handleJarPercentageChange: PropTypes.func,
};

export default JarsCard;
