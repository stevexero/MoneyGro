import { useState, useEffect, useMemo } from 'react';
import { GrClose } from 'react-icons/gr';
import useInputsStore from '../stores/initialAmountStore';
import useDeductionStore from '../stores/deductionStore';

const AnimatedInput: React.FC = () => {
  const initialAmount = useInputsStore((state) => state.initialAmount);
  const setinitialAmount = useInputsStore((state) => state.setinitialAmount);
  const removeAllDeductions = useDeductionStore(
    (state) => state.removeAllDeductions
  );
  const deductionsHidden = useDeductionStore((state) => state.deductionsHidden);
  const toggleDeductionsHidden = useDeductionStore(
    (state) => state.toggleDeductionsHidden
  );

  const [displayedText, setDisplayedText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [loopIndex, setLoopIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [typingSpeed, setTypingSpeed] = useState<number>(75);

  const placeholders = useMemo(
    () => [
      'How much was your paycheck?',
      'Enter your income.',
      'What did you earn this month?',
      'Input your salary amount.',
      'How much money did you make?',
      'Enter your total earnings.',
      'What’s your monthly income?',
      'How much did you get paid?',
      'Input your paycheck amount.',
      'How much did you bring home?',
    ],
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinitialAmount(e.target.value);
  };

  const handleResetClick = () => {
    setinitialAmount('');
    removeAllDeductions();
    if (deductionsHidden) {
      toggleDeductionsHidden();
    }
  };

  useEffect(() => {
    const handleTyping = () => {
      const currentText = placeholders[loopIndex];
      if (isDeleting) {
        setDisplayedText(currentText.substring(0, charIndex - 1));
        setCharIndex((prevIndex) => prevIndex - 1);
        setTypingSpeed(25);
      } else {
        setDisplayedText(currentText.substring(0, charIndex + 1));
        setCharIndex((prevIndex) => prevIndex + 1);
        setTypingSpeed(75);
      }

      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setLoopIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
      }
    };

    const typingInterval = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingInterval);
  }, [charIndex, isDeleting, loopIndex, placeholders, typingSpeed]);

  return (
    <label className='relative block w-full max-w-lg'>
      <input
        type='number'
        name='initialAmount'
        id='initialAmount'
        value={initialAmount}
        placeholder={displayedText}
        onChange={handleChange}
        className='input input-lg input-bordered border-4 input-primary w-full max-w-lg rounded-full shadow-2xl focus:shadow-2xl'
      />
      <span
        className='absolute inset-y-0 right-0 flex items-center mr-8 tooltip tooltip-right'
        data-tip='Clear Salary'
      >
        <GrClose
          className='w-5 h-5 text-gray-400 hover:cursor-pointer hover:text-secondary'
          onClick={handleResetClick}
        />
      </span>
    </label>
  );
};

export default AnimatedInput;
