import useInputsStore from '../../store';
import DeductionsSummary from './DeductionsSummary';
import ItemizedDeductions from './ItemizedDeductions';
import DeductionRenameModal from './DeductionRenameModal';
import AddDeductionButton from './AddDeductionButton';
import DeductionsCard from './DeductionsCard';

const Deductions: React.FC = () => {
  const deductionsHidden = useInputsStore((state) => state.deductionsHidden);
  return (
    <>
      {deductionsHidden ? (
        <DeductionsSummary />
      ) : (
        <>
          <DeductionsCard />
          <AddDeductionButton />
          <ItemizedDeductions />
        </>
      )}
      <DeductionRenameModal />
    </>
  );
};

export default Deductions;
