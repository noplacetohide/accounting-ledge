"use client"

import { Label } from "@radix-ui/react-label"
import {
    Select as SelectDropdown,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select"

type ItemsProps = {
    label?: string;
    value?: string | undefined;
}

type SelectProps = {
    label?: string
    placeholder?: string
    value?: string
    onChange?: (value: string) => void
    onValueChange?: (value: string) => void
    selectLabel?: string
    labelClassName?: string
    selectBtnClassNames?: string
    items?: ItemsProps[]
}

export function Select({
    label,
    selectLabel,
    placeholder,
    onChange,
    onValueChange,
    value,
    labelClassName = '',
    selectBtnClassNames = '',
    items = [],
}: SelectProps) {
    const handleValueChange = (newValue: string) => {
        if (onValueChange) onValueChange(newValue);
        if (onChange) onChange(newValue);
    };

    return (
        <div className="space-y-2">
            {label && <Label className={labelClassName}>{label}</Label>}
            <SelectDropdown
                value={value}
                onValueChange={handleValueChange}
            >
                <SelectTrigger className={`w-full ${selectBtnClassNames}`}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {selectLabel && <SelectLabel>{selectLabel}</SelectLabel>}
                        {items.map(({ value, label }, index) => (
                            <SelectItem key={`select-${index}`} value={value || ''}>{label}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </SelectDropdown>
        </div>
    )
}