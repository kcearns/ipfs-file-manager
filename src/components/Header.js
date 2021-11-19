import React from 'react'
import { Disclosure } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Header = ({ currentAccount, connectWallet }) => {
    return (
        <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">

                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <p className="hidden lg:block h-12 w-auto text-white font-bold p-2 text-2xl">IPFS File Manager</p>
                  </div>

                </div>
                { !currentAccount && (
                    <button
                    className="bg-blue-400 rounded-lg text-white p-2 font-bold"
                    onClick={connectWallet}
                    >
                      Connect Your Wallet
                    </button>                  
                )}
                { currentAccount && <h1 className="text-white">Your Address: {currentAccount}</h1>}

              </div>
            </div>
          </>
        )}
      </Disclosure>
    )
}

export default Header
