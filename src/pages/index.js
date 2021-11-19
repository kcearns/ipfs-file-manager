import React, { Fragment, useState, useEffect } from 'react'
import UploadFile from '../components/UploadFile'
import Header from '../components/Header'
import FileList from '../components/FileList'
import { Dialog, Transition } from '@headlessui/react'

const Index = () => {
    const [currentAccount, setCurrentAccount] = useState(null)
    let [isOpen, setIsOpen] = useState(true)

    const closeModal = () => {
        setIsOpen(false)
    }

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window
            if (!ethereum) {
                console.log('Make sure you have Metamask')
                return
            } else {
                console.log('We have the ethereum object', ethereum)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const connectWallet = async () => {
        try {
            const { ethereum } = window
            if (!ethereum) {
                alert('Get metamask')
                return
            }

            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            })

            console.log('Connected:', accounts[0] )
            setCurrentAccount(accounts[0])

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])
    

    return (
        <>
        <Header currentAccount={currentAccount} connectWallet={connectWallet} />
        <div className="container mx-auto">
            <div>
                {
                    currentAccount && (
                        <>
                        <UploadFile />
                        <FileList />
                        </>
                    )
                }
            </div>
        </div>

        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
            >
            <div className="min-h-screen px-4 text-center">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <Dialog.Overlay className="fixed inset-0" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
                >
                &#8203;
                </span>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                    >
                    !!DANGER!!
                    </Dialog.Title>
                    <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        This site is for testing only. Do not upload files you want to keep.
                    </p>
                    </div>

                    <div className="mt-4">
                    <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={closeModal}
                    >
                        I agree, let me in!
                    </button>
                    </div>
                </div>
                </Transition.Child>
            </div>
            </Dialog>
        </Transition>        
        </>
    )
}

export default Index
