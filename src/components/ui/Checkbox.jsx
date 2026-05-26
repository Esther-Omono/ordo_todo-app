import { Check } from 'lucide-react';

const Checkbox = ({ checked, onChange, size = 'md' }) => {
  const dimensions = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const iconDimensions = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <div className='relative flex items-center'>
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        className={`${dimensions} shrink-0 appearance-none border-2 border-text-secondary bg-bg-primary cursor-pointer rounded-full transition-all duration-200 checked:bg-accent checked:border-accent`}
      />
      {checked && (
        <Check
          className={`${iconDimensions} text-bg-primary absolute top-0.5 left-0.5 pointer-events-none`}
        />
      )}
    </div>
  );
};

export default Checkbox;
