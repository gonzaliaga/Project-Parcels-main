/* eslint-disable @next/next/no-img-element */
import { Menu, Transition } from "@headlessui/react"
import { BiSolidUserCircle } from "react-icons/bi"
import Link from "next/link"
import { NewUser } from "@/app/hook"
export default function UserMenu({
  user,
  handleLogout
}: {
  user: NewUser | undefined
  handleLogout: () => void
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center">
          {user?.image ? (
            <img
              src={user?.image ?? "default-image-url"}
              className="h-[3rem] w-[3rem] rounded-full duration-200 hover:scale-110"
              alt="no found"
            />
          ) : (
            <BiSolidUserCircle className="h-12 w-12 p-1 hover:text-[#039D60] duration-200 text-gray-400" />
          )}
        </Menu.Button>
      </div>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-[9rem] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link href="/userDataRegister">
                  <button
                    className={`${
                      active ? "bg-[#00ad68be] text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Mi Perfil
                  </button>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? "bg-[#00ad68be] text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Cerrar sesion
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
