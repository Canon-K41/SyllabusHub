import Link from 'next/link';
import clsx from 'clsx';
import IconToggle from '../assets/icons/square-toggle.svg';
import IconHome from '../assets/icons/home.svg';
import IconSettings from '../assets/icons/setting.svg';
import IconHelp from '../assets/icons/help.svg';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  router: string;
}

const Sidebar = ({ isOpen, setIsOpen, router }: SidebarProps) => {
  const links = [
    { href: '/', label: 'ホーム', icon: <IconHome className='inline-block mr-2' /> },
    { href: '/settings', label: '設定', icon: <IconSettings className='inline-block mr-2' /> },
    { href: '/help', label: 'ヘルプ', icon: <IconHelp className='inline-block mr-2' /> },
  ];

  return (
    <div className={clsx('fixed top-0 left-0 h-full w-60 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-10 md:translate-x-0', isOpen ? 'translate-x-0 ' : 'hidden')}>
      <nav className="p-2 space-y-2">
        <button
          className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded transition duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <IconToggle className='inline-block mr-2' />
        </button>
        {links.map(({ href, label, icon }) => (
          <Link href={href} key={href}>
            <div className={clsx('block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded transition duration-200', { 'bg-gray-200': router === href })}>
              {icon}
              {label}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
