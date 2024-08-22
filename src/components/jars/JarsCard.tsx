import { useEffect, useMemo, useState } from 'react';
import { FaPercent, FaInfo } from 'react-icons/fa6';
import useInputsStore from '../../stores/initialAmountStore';
import useDeductionStore from '../../stores/deductionStore';

interface JarsCardProps {
  jarId: string;
  jarTitle: string;
  jarValue: number;
  handleJarPercentageChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const JarsCard: React.FC<JarsCardProps> = ({
  jarId,
  jarTitle,
  jarValue,
  handleJarPercentageChange,
}) => {
  const initialAmount = useInputsStore((state) => state.initialAmount);
  const totalDeductions = useDeductionStore((state) => state.totalDeductions);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jarName, setJarName] = useState('');
  const [jarDialog, setJarDialog] = useState('');

  const jarInfo = useMemo(
    () => ({
      freedom:
        'Dedicated to investments or savings that will generate passive income, helping you achieve financial independence',
      dreams:
        "Dedicated to larger, future expenses such as vacations, new gadgets, or other big-ticket items. It's a savings jar, but it's meant to be spent eventually",
      generosity:
        'Dedicated to charitable donations, gifts, or any form of giving back to others',
      knowledge:
        'Dedicated to self-improvement, courses, books, or any form of learning that can help you grow personally or professionally',
      joy: "Dedicated to guilt-free spending on fun and entertainment, like dining out, movies, or hobbies. It's important to enjoy life, and this jar ensures you do so without feeling guilty",
    }),
    []
  );

  const initialAmt =
    typeof initialAmount === 'number'
      ? initialAmount
      : parseFloat(initialAmount) || 0;

  const openInfoModal = (jar: string) => {
    setJarName(jar);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (jarName in jarInfo) {
      setJarDialog(jarInfo[jarName as keyof typeof jarInfo]);
    }
  }, [jarInfo, jarName]);

  return (
    <>
      <div className='card card-compact bg-neutral text-neutral-content rounded-xl'>
        <div className='card-body'>
          <div className='flex flex-row items-start justify-between'>
            <h2 className='card-title'>{jarTitle}</h2>
            <button
              className='btn btn-outline btn-xs btn-circle btn-primary'
              onClick={() => openInfoModal(jarId)}
            >
              <FaInfo />
            </button>
          </div>
          <div className='w-full flex justify-center items-center'>
            <input
              type='number'
              className={`input bg-transparent font-bold text-4xl max-w-[4.5rem] focus:outline-none active:outline-none focus:border-none active:border-none ${jarValue.toString().length === 1 ? 'text-center' : ''}`}
              name={jarId}
              id={jarId}
              value={jarValue === 0 ? '' : jarValue}
              onChange={handleJarPercentageChange}
              min={0}
              max={99}
              placeholder='0'
            />
            <FaPercent size='2rem' />
          </div>
          <div className={'card-actions justify-end'}>
            <div>
              $&nbsp;
              {((initialAmt - totalDeductions) * (jarValue * 0.01)).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Jar Info Modal */}
      {isModalOpen && (
        <dialog
          id='jar_info_modal'
          className='modal bg-primary bg-opacity-30'
          open
        >
          <div className='modal-box rounded-xl'>
            <h3 className='font-bold text-lg'>The {jarTitle} Jar</h3>
            <p className='py-4'>{jarDialog}</p>
            <div className='modal-action'>
              <button
                className='btn btn-primary text-white rounded-xl'
                // onClick={() => setIsModalOpen(false)}
              >
                Learn More
              </button>
              <button
                className='btn btn-primary btn-outline rounded-xl'
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default JarsCard;
