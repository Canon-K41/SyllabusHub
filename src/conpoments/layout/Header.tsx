import IconToggle from '@/assets/icons/square-toggle.svg';

interface HeaderProps {
  setIsOpen: (isOpen: boolean) => void;
}

const Header = ({ setIsOpen }: HeaderProps) => (
  <div className="h-40 w-full bg-white flex items-center justify-between px-4">
  <button
    className="p-2 top-0 left-0 bg-white  z-10"
    onClick={() => setIsOpen(prev => !prev)}
  >
    <IconToggle className='text-gray-700' />
  </button>
  </div>
);

export default Header;
