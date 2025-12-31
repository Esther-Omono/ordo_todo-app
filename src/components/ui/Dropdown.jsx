import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

function Dropdown({ icon, label, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative mb-3'>
      <div
        className='flex justify-between rounded-md bg-bg-primary p-3 shadow-md cursor-pointer transition-all duration-200 hover:bg-accent hover:text-bg-primary hover:shadow-lg hover:scale-[1.02]'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='flex gap-2'>
          {icon}
          <p>{label}</p>
        </div>
        <ChevronDown
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>
      {isOpen && <div className='mt-4 w-full'>{children}</div>}
    </div>
  );
}

export default Dropdown;
