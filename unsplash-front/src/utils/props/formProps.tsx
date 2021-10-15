import React, {SyntheticEvent, CSSProperties, Ref} from "react";

export declare interface IFormProps {
    method: string
    actionUrl?: string
    style?:CSSProperties
    reference?: Ref<HTMLDivElement>
    onSubmit?: (event: SyntheticEvent) => void
}