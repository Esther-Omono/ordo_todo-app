const PRIORITY_COLORS = {
  low: 'bg-accent',
  medium: 'bg-warning',
  high: 'bg-urgent',
};

const PriorityStripe = ({ priority, orientation = 'vertical' }) => {
  const color = PRIORITY_COLORS[priority?.toLowerCase()] ?? 'bg-warning';

  const orientationClass =
    orientation === 'vertical'
      ? 'absolute left-0 top-0 bottom-0 w-1 rounded-l-[10px]'
      : 'h-1 rounded-t-[14px] shrink-0';

  return <div className={`${orientationClass} ${color}`} />;
};

export default PriorityStripe;
