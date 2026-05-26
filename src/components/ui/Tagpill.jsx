import { X } from 'lucide-react';

const Tagpill = ({ label, onRemove }) => {
  return (
    <span className='inline-flex items-center gap-1 py-0.5 px-2 rounded-2xl text-[10px] font-medium bg-active border border-accent text-accent tracking-wide'>
      {label}
      {onRemove && (
        <button
          onClick={() => onRemove(label)}
          className='cursor-pointer text-xs'
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
};

export default Tagpill;
