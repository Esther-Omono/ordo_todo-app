import Logo from '../ui/Logo';

const Header = () => {
  return (
    <div className='h-20 py-4 px-10 flex items-center justify-between bg-bg-secondary'>
      <Logo />
      <div>Toggle</div>
    </div>
  );
};

export default Header;
