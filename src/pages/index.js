import React, { useState, useEffect } from 'react'
import UploadFile from '../components/UploadFile'
import Header from '../components/Header'
import FileList from '../components/FileList'
import { ethers } from 'ethers'
import { Dialog } from '@headlessui/react'

const Index = () => {
    const [currentAccount, setCurrentAccount] = useState(null)
    const [isOpen, setIsOpen] = useState(true)

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
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
        <Header currentAccount={currentAccount} />
        <div className="flex h-screen justify-center items-center">
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
            {
                !currentAccount && (
                    <button
                    className="bg-blue-400 rounded-lg text-white p-4 font-bold"
                    onClick={connectWallet}
                >
                    Connect Your Wallet
                </button>
                )
            }
        </div>
        </>
    )
}

export default Index
