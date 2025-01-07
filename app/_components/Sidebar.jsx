'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaUser, FaCogs, FaGamepad, FaTimes, FaBook } from 'react-icons/fa';
import { useSidebar } from '../_lib/SidebarContext';
import { useAuth } from '../_lib/AuthContext';

export default function Sidebar() {

  const { expanded, setExpanded } = useSidebar()
  const { user } = useAuth()
  const menuItems = [
    { name: 'Home', icon: FaHome, link: '/' },
    { name: 'Profile', icon: FaUser, link: '/protected/user/profile' },
    { name: 'Game', icon: FaGamepad, link: '/public/game' },
    { name: 'Articles', icon: FaBook, link: '/protected/user/articles' },
  ];

  const pathName = usePathname()

  return (
    <div className={"h-screen w-64 bg-gray-900 text-white flex flex-col fixed overflow-x-auto z-10 " + (expanded ? 'block' : 'hidden')}>
      <div className="text-2xl font-bold p-4 flex items-center gap-3 relative">
        Crossword <FaGamepad className="text-green-500" />
        <button className="absolute top-3 right-3" onClick={() => setExpanded(false)}><FaTimes /></button></div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item, i) => (
            <li key={i}>
              <Link href={item.link}
                className={`flex items-center p-4 w-full text-left rounded-lg ${pathName === item.link
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
              >
                <item.icon className="h-6 w-6 mr-3" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};