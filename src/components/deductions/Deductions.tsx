import DeductionsSummary from './DeductionsSummary';
import ItemizedDeductions from './ItemizedDeductions';
import DeductionRenameModal from './DeductionRenameModal';
import AddDeductionButton from './AddDeductionButton';
import DeductionsCard from './DeductionsCard';
import useDeductionStore from '../../stores/deductionStore';

const Deductions: React.FC = () => {
  const deductionsHidden = useDeductionStore((state) => state.deductionsHidden);
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
