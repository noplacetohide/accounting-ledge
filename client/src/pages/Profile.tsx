import { ProfileType } from '@/types/user';
import moment from 'moment';
import React from 'react'

export default function Profile({ data }: ProfileType) {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <div className="bg-white rounded shadow mt-6">
                <div className="p-6">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold text-white">
                            {data?.name?.charAt(0) || '😄'}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">{data?.name || '-'}</h3>
                            <p className="text-gray-600">{data?.email || '-'}</p>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h4 className="font-bold mb-4">Personal Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm mb-1">Name</label>
                                <input type="text" value={data?.name || '-'} className="w-full p-2 border rounded bg-gray-100" disabled />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm mb-1">Email</label>
                                <input type="text" value={data?.email || '-'} className="w-full p-2 border rounded bg-gray-100" disabled />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm mb-1">Account Number</label>
                                <input type="text" value={data?.accountNumber || '-'} className="w-full p-2 border rounded bg-gray-100" disabled />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm mb-1">Account Since</label>
                                <input type="text" value={moment(data?.createdAt).format('lll') || '-'} className="w-full p-2 border rounded bg-gray-100" disabled />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
