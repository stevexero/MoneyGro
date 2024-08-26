import useThemeStore from '../../../stores/themeStore';

const Themes = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.value);
  };

  return (
    <>
      <p className='mt-8 font-bold'>Preferred Theme:</p>
      <div className=' flex flex-row items-center mt-4'>
        <input
          type='radio'
          name='preferred-theme'
          className='radio radio-primary theme-controller'
          value='light'
          checked={theme === 'light'}
          onChange={handleThemeChange}
        />
        <span className='label-text ml-4'>Light</span>
        <input
          type='radio'
          name='preferred-theme'
          className='radio radio-primary theme-controller ml-6'
          value='synthwave'
          checked={theme === 'synthwave'}
          onChange={handleThemeChange}
        />
        <span className='label-text ml-4'>Dark</span>
      </div>
    </>
  );
};

export default Themes;
