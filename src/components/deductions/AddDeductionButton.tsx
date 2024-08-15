import { GrAdd } from 'react-icons/gr';
import useInputsStore from '../../store';

const AddDeductionButton: React.FC = () => {
  const addDeduction = useInputsStore((state) => state.addDeduction);

  return (
    <div className='w-full flex items-center justify-center'>
      <div className='w-full max-w-sm'>
        <button
          className='input border-none rounded-full flex items-center gap-2 opacity-85 hover:cursor-pointer hover:opacity-100 hover:outline-none active:outline-none focus:outline-none active:opacity-100 focus:opacity-100'
          onClick={addDeduction}
        >
          <span className='btn btn-primary btn-circle btn-active btn-xs text-white light:text-slate-800'>
            <GrAdd />
          </span>
          <span className='grow'>Add a Deduction</span>
        </button>
      </div>
    </div>
  );
};

export default AddDeductionButton;
