import IconToggle from '@/assets/icons/square-toggle.svg';

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="flex h-16 bg-white fixed w-full items-center shadow top-0 z-20">
      <button className='p-3 rounded-md hover:bg-gray-200' onClick={toggleSidebar}>
        <IconToggle className='text-gray-700' />
      </button>
    </header>
  );
}
