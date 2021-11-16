import React, { useState } from 'react'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { ethers } from 'ethers'
import Web3Model from 'web3modal'

import { contractAddress } from '../utils/constants'

import IPFSFileStorage from '../../artifacts/contracts/IPFSFileStorage.sol/IPFSFileStorage.json'

const ipfsClient = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const UploadFile = () => {
    const [fileUrl, setFileUrl] = useState(null)

    const onChange = async (e) => {
        const file = e.target.files[0]
        try {
            const uploadedFile = await ipfsClient.add(file)
            const url = `https://ipfs.infura.io/ipfs/${uploadedFile.path}`
            console.log(`File uploaded successfully to ${url}`)
            setFileUrl(url)
        } catch (error) {
            console.log('File upload failed', error)
        }
    }

    const uploadToContract = async () => {
        const web3Modal = new Web3Model()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        let contract = new ethers.Contract(contractAddress, IPFSFileStorage.abi, signer )
        let transaction = await contract.upload(fileUrl)
        let tx = await transaction.wait()
        console.log(tx)
    }

    return (
        <>

                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label for="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" onChange={onChange} className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                    PNG, JPG, GIF up to 10MB
                                </p>                    
                            </div>
                        </div>
                    </div>


            <div>
                <button 
                    onClick={uploadToContract}
                >
                    Create contract txn    
                </button>
            {
                fileUrl && (
                    <>
                    <div className="flex justify-center">
                        <img className="rounded mt-4" width="350" src={fileUrl} />
                    </div>
                    <div>
                        <a href={fileUrl} className="text-sm text-gray-800">{fileUrl}</a>
                    </div>
                    </>
                )
            }
            </div>
        </>
    )
}

export default UploadFile
