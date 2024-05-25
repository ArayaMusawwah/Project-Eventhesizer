'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@radix-ui/react-separator'
import Image from 'next/image'
import NavItems from './NavItems'

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt=""
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        {/* @ts-ignore */}
        <SheetContent
          className="flex flex-col gap-6 bg-white md:hidden"
          side={'right'}
        >
          <Image
            src="/assets/images/logo.svg"
            alt="Eventhesizer Logo"
            width={128}
            height={38}
          />
          <Separator className="border border-gray-200" />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  )
}
export default MobileNav
