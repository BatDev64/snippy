'use client'

import { useState } from "react"
import { Button } from "../ui/Button"
import { Clipboard } from "../ui/icons"
import { clipboard } from "@/utils/clipboard"

interface Props {
    text: string
}

export const CopyButton = ({ text }: Props) => {
    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = async () => {
        const result = await clipboard(text)
        setIsCopied(result)
    }

    return (
        <Button variant="default"
            size="sm"
            leftIcon={<Clipboard className="h-3 w-3 " />}
            className=""
            onClick={handleCopy}
        >
            {isCopied ? "Copied!" : "Copy"}
        </Button>
    )
}