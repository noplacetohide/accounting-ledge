"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Label } from '@radix-ui/react-label';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerProps = {
    label?: string
    placeholder?: string
    labelClassName?: string
    value?: string | Date | null
    onChange?: (date: string) => void
}

export function DatePicker({
    label,
    placeholder,
    labelClassName = '',
    value,
    onChange
}: DatePickerProps) {
    const [date, setDate] = React.useState<Date | undefined>(
        value ? (typeof value === 'string' ? new Date(value) : value) : undefined
    );

    React.useEffect(() => {
        if (value) {
            setDate(typeof value === 'string' ? new Date(value) : value);
        }
    }, [value]);

    const handleSelect = (newDate: Date | undefined) => {
        setDate(newDate);

        if (newDate && onChange) {
            onChange(newDate.toISOString());
        } else if (onChange) {
            onChange('');
        }
    };

    return (
        <div className="space-y-2">
            {label && <Label className={labelClassName}>{label}</Label>}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>{placeholder || 'Pick a date'}</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleSelect}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}