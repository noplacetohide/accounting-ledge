import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '../ui/card';

type OverviewInfoCardTypes = {
    value?: string | number;
    description?: string;
    key?: string;
    title?: string;
};

export default function OverviewInfoCard({ value, description, key = '', title = '', }: OverviewInfoCardTypes) {
    return (
        <Card key={key} className="w-full gap-1 rounded">
            <CardHeader>
                {
                    title && <CardTitle className='text-md lg:text-lg xl:text-xl text-gray-600'>{title || ''}</CardTitle>
                }
            </CardHeader>
            <CardContent>
                <p className='text-xl md:text-2xl font-bold'>{value ?? '-'}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <CardDescription className='text-xs font-medium text-gray-500'>{description || ''}</CardDescription>
            </CardFooter>
        </Card>
    )
}
