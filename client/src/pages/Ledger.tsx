"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { humanize } from 'underscore.string';
import moment from 'moment';
import { BadgeDollarSign, NotebookText, SlidersHorizontal } from 'lucide-react';
import { z } from 'zod';

import { Model } from '@/components/base/Model'
import OverviewInfoCard from '@/components/base/OverviewInfoCard';
import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import api from '@/lib/axios';
import { DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatMoney, getQuery } from '@/lib/transactionHelpers';
import { Badge } from '@/components/ui/badge';
import { ProfileType } from '@/types/user';
import { TransactionResponse } from '@/types/transaction';

const FORM_INIT_OBJECT = {
    sourceAccount: "",
    destinationAccount: "",
    amount: 0,
    description: '',
};

const INIT_PAGINATION_STATE = {
    total: 0,
    limit: 10,
    page: 1,
    totalPages: 0
};

export const sendMoneyFormSchema = z.object({
    sourceAccount: z.string().min(12, { message: 'Source account is mandatory.' }),
    destinationAccount: z.string().min(12, { message: 'Destination account is mandatory.' }),
    amount: z.coerce.number().min(0.01, { message: 'Min amount $0.01 is required.' }),
    description: z.string().min(1, { message: 'Description is required.' }),
}).refine((data) => data.sourceAccount !== data.destinationAccount, {
    message: 'Source and destination accounts must be different.',
    path: ['destinationAccount'],
});

export default function Ledger({ data: userProfile }: ProfileType) {
    const [sendUserMoneyModel, setSendUserMoneyModel] = useState(false);
    const [openFilters, setOpenFilters] = useState(false);
    const [userTransactionHistory, setUserTransactionHistory] = useState([]);
    const [userBalance, setUserBalance] = useState({ balance: 0 });
    const [pagination, setPagination] = useState(INIT_PAGINATION_STATE);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const form = useForm({
        resolver: zodResolver(sendMoneyFormSchema),
        defaultValues: FORM_INIT_OBJECT,
    });

    const fetchUserBalance = async () => {
        try {
            const query = getQuery(pagination);
            const { data } = await api.get(`/api/v1/ledger/accounts/balance?${query}`);
            console.log("data?.data ", data?.data)
            setUserBalance(data?.data || []);
        } catch (error) {
            console.error(error)
        }
    }
    const fetchUserTransactionHistory = async () => {
        try {
            const query = getQuery(pagination);
            const { data } = await api.get(`/api/v1/ledger/transactions?${query}`);
            setUserTransactionHistory(data?.data || []);
            setPagination(data?.pagination || INIT_PAGINATION_STATE);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchUserBalance();
    }, [pagination.page]);


    useEffect(() => {
        fetchUserTransactionHistory();
    }, [pagination.page]);

    async function onSubmit(formState: z.infer<typeof sendMoneyFormSchema>) {
        try {
            setIsButtonDisabled(true);
            console.log(" form ", formState)
            await api.post('api/v1/ledger/transactions', formState);

            await fetchUserBalance();
            setSendUserMoneyModel(false);
            toast.success('Your transaction has been recorded!');

        } catch (error: any) {
            console.error("Error submitting form:", error);
            const errorMsg = error?.response?.data?.message || 'Unable to save transaction!';
            toast.error(errorMsg);
        } finally {
            setIsButtonDisabled(false);
        }
    }

    const renderInvestmentModelHeader = () => {
        return (
            <DialogHeader>
                <DialogTitle className='text-md font-bold'>Send Money</DialogTitle>
                <DialogDescription className='text-sm font-medium text-gray-500'>
                    Validate account number and send the money lighting speed ⚡️
                </DialogDescription>
            </DialogHeader>
        )
    }

    const renderInvestmentModelBody = () => {
        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        <div className="col-span-1">
                            <FormField
                                control={form.control}
                                name="sourceAccount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="label-sm">Source Account*</FormLabel>
                                        <FormControl>
                                            <Input disabled placeholder="Source Account" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-1">
                            <FormField
                                control={form.control}
                                name="destinationAccount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="label-sm">Destination Account*</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Destination Account" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-1">
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="label-sm">Amount($)*</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="amount min 0.01"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-1">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="label-sm">Description*</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="description"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={isButtonDisabled}
                            className={isButtonDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                        >
                            <NotebookText /> Send
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        )
    };

    const handlePreviousClick = () => {
        if (pagination.page > 1) {
            setPagination({ ...pagination, page: pagination.page - 1 });
        }
    };

    const handleNextClick = () => {
        if (pagination.page < pagination.totalPages) {
            setPagination({ ...pagination, page: pagination.page + 1 });
        }
    };

    const renderTxnRow = (transaction: TransactionResponse, index: number) => {
        const txn = transaction.entries.find(entry => entry.account.accountNumber === userProfile.accountNumber);
        const type = txn?.type == 'CREDIT';
        return (
            <TableRow key={transaction.id} className='text-sm'>
                <TableCell className='text-sm'>{index + 1}</TableCell>
                <TableCell className='text-sm'>{transaction?.transactionDate ? moment(transaction?.transactionDate).format('lll') : '-'}</TableCell>
                <TableCell><Badge className={`${type ? 'bg-orange-400' : 'bg-green-600'} rounded`}>{humanize(txn?.type || '-')}</Badge></TableCell>
                <TableCell>{formatMoney(txn?.amount)}</TableCell>
                <TableCell>{transaction?.id || '-'}</TableCell>
                <TableCell>{transaction?.description || '-'}</TableCell>
            </TableRow>
        )
    }
    return (
        <div className="p-6">
            <Model
                modelClassName='max-w-[90%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[80%] xl:md:max-w-[70%]'
                header={renderInvestmentModelHeader()}
                body={renderInvestmentModelBody()}
                open={sendUserMoneyModel}
                onOpenChange={() => {
                    setSendUserMoneyModel(false);
                    form.reset({ ...FORM_INIT_OBJECT });
                }}
            />
            <div className='flex justify-between items-baseline'>
                <div className="text-lg md:text-xl xl:text-2xl font-bold mb-4 text-gray-800">Hi 👋🏻, {userProfile.name}</div>
                <Button onClick={() => {
                    form.reset({
                        ...FORM_INIT_OBJECT,
                        sourceAccount: userProfile?.accountNumber || ''
                    });
                    setSendUserMoneyModel(true)
                }}>
                    <BadgeDollarSign />
                    <span className='hidden sm:block'>Send Money</span>
                </Button>
            </div>
            <p className='text-sm font-semibold text-gray-600 pb-4'>See your account ledger and make transaction anytime.</p>
            <div className="text-md md:text-lg xl:text-xl font-bold mb-4">Account Overview</div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4'>
                <OverviewInfoCard
                    title='Active Balance'
                    value={formatMoney(userBalance?.balance || '-')}
                />
            </div>
            <div className="mt-6 bg-white rounded shadow">

                <>
                    <div className="p-4 border-b flex justify-between">
                        <h3 className="font-bold">Your Transactions</h3>
                        <Button className="cursor-pointer" onClick={() => { setOpenFilters(!openFilters) }}><SlidersHorizontal /></Button>
                    </div>
                    {openFilters && (
                        <div className="p-4 border-b flex justify-center items-center gap-4">
                            <h3 className="font-bold">Your Transactions</h3>
                            <Button onClick={() => { }}><SlidersHorizontal /></Button>
                        </div>
                    )}
                    <div className="p-4">
                        {(!!userTransactionHistory?.length) && (
                            <Table>
                                <TableCaption>
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious className={pagination.page == 1 ? 'cursor-not-allowed' : 'cursor-pointer'} onClick={() => handlePreviousClick()} />
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink isActive>
                                                    {pagination.page}
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationNext className={pagination.page >= pagination.totalPages ? 'cursor-not-allowed' : 'cursor-pointer'} onClick={() => handleNextClick()} />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </TableCaption>
                                <TableHeader>
                                    <TableRow className='font-bold text-gray-600'>
                                        <TableHead>#</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Txn Type</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Txn id</TableHead>
                                        <TableHead>Txn Note</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {userTransactionHistory.map((txn: TransactionResponse, index: number) => (
                                        renderTxnRow(txn, index)
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                        {!(!!userTransactionHistory?.length) && (
                            <p className='text-center text-xl text-gray-700 font-medium'>No Transaction Found</p>
                        )}
                    </div>
                </>

            </div>
        </div >
    )
}