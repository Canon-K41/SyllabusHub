import IconToggle from '../assets/icons/square-toggle.svg';

interface HeaderProps {
  setIsOpen: (isOpen: boolean) => void;
}

const Header = ({ setIsOpen }: HeaderProps) => (
  <button
    className="p-2 fixed top-0 left-0 m-4 bg-white rounded shadow-lg z-10"
    onClick={() => setIsOpen(prev => !prev)}
  >
    <IconToggle className='text-gray-700' />
  </button>
);

export default Header;
