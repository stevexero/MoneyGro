interface JarsDivProps {
  jarId: string;
  jarTitle: string;
  jarValue: number;
  handleJarPercentageChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const JarsDiv: React.FC<JarsDivProps> = ({
  jarId,
  jarTitle,
  jarValue,
  handleJarPercentageChange,
}) => {
  return (
    <div className='flex flex-row items-center justify-between'>
      <label className='mr-4' htmlFor={jarId}>
        {jarTitle}:
      </label>
      <div>
        <input
          type='number'
          className='input input-sm input-primary rounded-lg w-16 text-right'
          name={jarId}
          id={jarId}
          value={jarValue === 0 ? '' : jarValue}
          onChange={handleJarPercentageChange}
          min={0}
          max={99}
          placeholder='0'
        />{' '}
        %
      </div>
    </div>
  );
};

export default JarsDiv;
