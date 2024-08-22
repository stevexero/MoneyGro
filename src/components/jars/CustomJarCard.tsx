import { useState } from 'react';
import { FaPercent } from 'react-icons/fa6';
import useInputsStore from '../../stores/initialAmountStore';
import { CgRename } from 'react-icons/cg';
import { GrClose } from 'react-icons/gr';
import useJarStore from '../../stores/jarStore';
import useDeductionStore from '../../stores/deductionStore';

interface CustomJarCardProps {
  jarIndex: number;
  jarId: string;
  jarTitle: string;
  jarValue: number;
  handleJarPercentageChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const CustomJarCard: React.FC<CustomJarCardProps> = ({
  jarIndex,
  jarId,
  jarTitle,
  jarValue,
  handleJarPercentageChange,
}) => {
  const initialAmount = useInputsStore((state) => state.initialAmount);
  const totalDeductions = useDeductionStore((state) => state.totalDeductions);
  const customJars = useJarStore((state) => state.customJars);
  const renameCustomJar = useJarStore((state) => state.renameCustomJar);
  const removeCustomJar = useJarStore((state) => state.removeCustomJar);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomJarIndex, setCurrentCustomJarIndex] = useState<
    number | null
  >(null);
  const [newCustomJarName, setNewCustomJarName] = useState('');

  const initialAmt =
    typeof initialAmount === 'string'
      ? parseFloat(initialAmount) || 0
      : initialAmount;

  const openRenameModal = (index: number) => {
    setCurrentCustomJarIndex(index);
    setNewCustomJarName(customJars[index].name);
    setIsModalOpen(true);
  };

  const handleRenameCustomJar = () => {
    if (currentCustomJarIndex !== null && newCustomJarName) {
      updateCustomJar(currentCustomJarIndex, newCustomJarName);
    }
    setIsModalOpen(false);
  };

  const updateCustomJar = (index: number, newName: string) => {
    if (newName) {
      renameCustomJar(newName, index);
    }
  };

  return (
    <>
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
              className={`input bg-transparent font-bold text-4xl max-w-[4.5rem] focus:outline-none active:outline-none focus:border-none active:border-none ${jarValue.toString().length === 1 ? 'text-center' : ''}`}
              value={jarValue === 0 ? '' : jarValue}
              onChange={handleJarPercentageChange}
              min={0}
              placeholder='0'
            />
            <FaPercent size='2rem' />
          </div>
          <div className='card-actions w-full flex flex-row justify-between items-center'>
            <div className='flex flex-row items-center'>
              <button
                className='btn btn-circle btn-xs btn-outline btn-primary tooltip tooltip-right'
                data-tip='Rename Custom Jar'
                onClick={() => openRenameModal(jarIndex)}
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
              {((initialAmt - totalDeductions) * (jarValue * 0.01)).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Jar Rename Modal */}
      {isModalOpen && (
        <dialog
          id='rename_modal'
          className='modal bg-primary bg-opacity-30'
          open
        >
          <div className='modal-box rounded-xl'>
            <h3 className='font-bold text-lg'>Rename Custom Jar</h3>
            <input
              type='text'
              value={newCustomJarName}
              onChange={(e) => setNewCustomJarName(e.target.value)}
              className='input input-bordered input-primary border-primary w-full mt-4 rounded-full'
              placeholder='Enter new name'
            />
            <div className='modal-action'>
              <button
                className='btn btn-primary text-white rounded-xl'
                onClick={handleRenameCustomJar}
              >
                Rename
              </button>
              <button
                className='btn btn-primary btn-outline rounded-xl'
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default CustomJarCard;
