import useDeductionStore from '../../stores/deductionStore';

const DeductionRenameModal: React.FC = () => {
  const isDeductionsRenameModalOpen = useDeductionStore(
    (state) => state.isDeductionsRenameModalOpen
  );
  const renameDeduction = useDeductionStore((state) => state.renameDeduction);
  const setIsDeductionsRenameModalOpen = useDeductionStore(
    (state) => state.setIsDeductionsRenameModalOpen
  );
  const currentDeductionIndex = useDeductionStore(
    (state) => state.currentDeductionIndex
  );
  const newDeductionName = useDeductionStore((state) => state.newDeductionName);
  const setNewDeductionName = useDeductionStore(
    (state) => state.setNewDeductionName
  );

  const handleRenameDeduction = () => {
    if (currentDeductionIndex !== null && newDeductionName) {
      renameDeduction(currentDeductionIndex, newDeductionName);
    }
    setIsDeductionsRenameModalOpen(false);
  };

  return (
    <>
      {isDeductionsRenameModalOpen && (
        <dialog
          id='rename_modal'
          className='modal bg-primary bg-opacity-30'
          open
        >
          <div className='modal-box rounded-xl'>
            <h3 className='font-bold text-lg'>Rename Deduction</h3>
            <input
              type='text'
              value={newDeductionName}
              onChange={(e) => setNewDeductionName(e.target.value)}
              className='input input-bordered input-primary border-primary w-full mt-4 rounded-full'
              placeholder='Enter new name'
            />
            <div className='modal-action'>
              <button
                className='btn btn-primary text-white rounded-xl'
                onClick={handleRenameDeduction}
              >
                Rename
              </button>
              <button
                className='btn btn-primary btn-outline rounded-xl'
                onClick={() => setIsDeductionsRenameModalOpen(false)}
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

export default DeductionRenameModal;
