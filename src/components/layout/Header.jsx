import { Bell, Search, User } from 'lucide-react';
import Logo from '../ui/Logo';

const Header = () => {
  return (
    <div className='sticky top-0 h-20 py-4 px-10 flex items-center justify-between border-b border-b-text-muted'>
      <Logo />
      <div className='flex gap-3'>
        <div className='p-2 bg-text-muted rounded-lg cursor-pointer transition-all duration-200 hover:bg-active hover:text-accent'>
          <Search size={20} />
        </div>
        <div className='p-2 bg-text-muted rounded-lg cursor-pointer transition-all duration-200 hover:bg-active hover:text-accent'>
          <Bell size={20} />
        </div>
        <div className='p-2 bg-text-muted rounded-lg cursor-pointer transition-all duration-200 hover:bg-active hover:text-accent'>
          <User size={20} />
        </div>
      </div>
    </div>
  );
};

export default Header;
