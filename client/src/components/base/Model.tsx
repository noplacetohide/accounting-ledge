import { ReactNode } from "react"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"

type DialogDemoProps = {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    modelClassName?: string
    header?: ReactNode
    body?: ReactNode
    footer?: ReactNode
}

export function Model({ open, onOpenChange, header, body, footer, modelClassName = 'sm:max-w-[425px]' }: DialogDemoProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={modelClassName}>
                {header}

                {body}
                {footer}
            </DialogContent>
        </Dialog>
    )
}
