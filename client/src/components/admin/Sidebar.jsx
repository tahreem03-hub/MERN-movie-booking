import React from 'react'
import { assets } from '../../assets/assets'
import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

    const user = {
        firstName: 'admin',
        lastName: 'User',
        imgURL: assets.profile,
    }

    const adminNavLinks = [
        { name: 'Dashboard', path: '/admin', Icon: LayoutDashboardIcon },
        { name: 'Add Shows', path: '/admin/add-shows', Icon: PlusSquareIcon },
        { name: 'List Shows', path: '/admin/list-shows', Icon: ListIcon },
        { name: 'List Bookings', path: '/admin/list-bookings', Icon: ListCollapseIcon },
    ]
    return (
        <div className='h-[calc(100vh-64px)] md:flex flex-col items-center pt-8
          w-13 md:w-60 shrink-0 border-r border-gray-300/20 text-sm'>
            <img src={user.imgURL} alt="" className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto' />
            <p className=''>{user.firstName} {user.lastName}</p>
            <div className='w-full'>
                {adminNavLinks.map((link, index) => (
                    <NavLink key={index} to={link.path} end className={({ isActive }) =>
                        `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6
                     text-gray-400 ${isActive && 'bg-primary/15 text-primary group'}`}>
                        {({ isActive }) => (
                            <>
                                <link.Icon className='w-5 h-5' />
                                <p className='max-md:hidden'>{link.name}</p>
                                <span className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive && 'bg-primary'}`}/>
                            </>
                        )}


                    </NavLink>
                ))}
            </div>

        </div>
    )
}

export default Sidebar
