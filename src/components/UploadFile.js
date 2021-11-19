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
        let transaction = await contract.setUploadedFiles(fileUrl)
        let tx = await transaction.wait()
        console.log(tx)
        setFileUrl(null)
    }

    return (
        <>
        <div className="my-10">
            { !fileUrl && (
                <>
                    <div className="flex p-2">
                        <div>
                            <svg className="h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div className="p-3">

                            <label>
                                <span className="text-white bg-blue-400 rounded-lg p-2 font-bold cursor-pointer">Select file</span>
                                <input className="sr-only" name="file-upload" type="file" onChange={onChange} />
                            </label>
                        </div>
                    </div>
                </>
            )}
            <div>
                { fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} />}             
            </div>
            <div className="mt-3">
                { fileUrl && ( <button className="bg-blue-400 rounded-lg text-white p-2 font-bold" onClick={uploadToContract}>Upload file</button> ) }
            </div>
        </div>        
        </>
    )
}

export default UploadFile
