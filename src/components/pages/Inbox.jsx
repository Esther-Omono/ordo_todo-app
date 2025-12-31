import EmptyState from '../ui/EmptyState';
import Logo from '../ui/Logo';

const Inbox = () => {
  const hasTasks = false; // later this will come from state

  if (!hasTasks) {
    return (
      <div className='w-full flex items-center justify-center'>
        <EmptyState
          title={
            <div className='flex items-center justify-center gap-2'>
              <span>Welcome to</span>
              <Logo />
            </div>
          }
          description='Organize your tasks, stay focused, and take control of your day.'
          actionLabel='Add your first task'
          onAction={() => console.log('Open add task modal')}
        />
      </div>
    );
  }

  return <div>Inbox</div>;
};

export default Inbox;
