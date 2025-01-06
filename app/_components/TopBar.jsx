'use client';

import Link from 'next/link';
import { FaSignOutAlt, FaSignInAlt, FaBars, FaGamepad, FaUserPlus, FaUser } from 'react-icons/fa';
import { useAuth } from '../_lib/AuthContext';
import { useSidebar } from '../_lib/SidebarContext';
import { usePathname } from 'next/navigation';

export default function TopBar() {
  const { user } = useAuth();
  const { expanded, setExpanded } = useSidebar();

  return (<div className='bg-gray-800 flex flex-wrap justify-between items-center px-4 py-2 mb-5 gap-3'>
    <div className='flex gap-5'>
      {!expanded ? <span className='text-2xl font-bold flex items-center gap-3'>Crossword <FaGamepad className="text-green-500" /></span> : null}
      <button className='text-3xl' onClick={() => setExpanded(true)}><FaBars /></button>
    </div>
    <TopBarButon user={user} />
  </div>)
};

function TopBarButon({ user }) {
  const pathName = usePathname()
  const returnUrl = pathName != '/public/user/signin' ? pathName : null;
  if (user)
    return (<div className='flex gap-2 items-center'>
      <Link href="/protected/user/signout" className="btn border-2">Sign out <FaSignOutAlt /></Link>
      <Link href="/protected/user/profile">
        {user.photoURL ? <img src={user.photoURL} alt="Profile picture" className="aspect-square w-10 object-cover" /> : <FaUser className='w-[3rem]' />}
      </Link>
    </div>
    )

  return <div className='flex gap-3'>
    <Link href={`/public/user/signin?${returnUrl ? `returnUrl=${returnUrl}` : ''}`} className="btn border-2">Sign in <FaSignInAlt /></Link>
    <Link href={`/public/user/register?${returnUrl ? `returnUrl=${returnUrl}` : ''}`} className="btn border-2">Register <FaUserPlus /></Link>
  </div>
}