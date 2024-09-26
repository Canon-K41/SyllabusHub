import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import IconHome from '@/assets/icons/home.svg';
import IconCalendar from '@/assets/icons/week-calendar.svg';
import IconSettings from '@/assets/icons/setting.svg';
import IconHelp from '@/assets/icons/help.svg';

const user_id = 'guest';

const links = [
  { href: '/', label: 'ホーム', icon: <IconHome className='inline-block mr-2' /> },
  { href: `/${user_id}/calendar`, label: '時間割', icon: <IconCalendar className='inline-block mr-2' /> },
  { href: `/${user_id}/settings`, label: '設定', icon: <IconSettings className='inline-block mr-2' /> },
  { href: '/help', label: 'ヘルプ', icon: <IconHelp className='inline-block mr-2' /> },
];

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const  currentPath = usePathname();
  return (
    <div className={clsx('fixed top-16 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-10', isOpen ? 'translate-x-0 w-56' : '-translate-x-full')}>
      <nav className="p-2 space-y-2">
        {links.map((link, index) => (
          <Link href={link.href} key={index}>
            <div className={clsx('block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded transition duration-200', currentPath == link.href ? 'bg-gray-200' : '' )}>
              {link.icon}
              {link.label}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
