'use client'

import { headerLinks } from '@/constant'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavItems = () => {
  const pathname = usePathname()

  return (
    <ul className="md:flex-between flex flex-col">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route
        return (
          <li key={link.label}>
            <Link
              href={link.route}
              className={`text-lg font-medium ${isActive ? 'text-primary-500' : 'text-black'}`}
            >
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
export default NavItems
