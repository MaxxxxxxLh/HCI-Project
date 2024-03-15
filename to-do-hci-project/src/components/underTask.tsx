import { UndertaskInterface } from "@/interfaces/UnderTaskInterface"

export const Undertask = (props: UndertaskInterface) => {
    return (
        <>
            <h1>{props.title}</h1>
            <p>props.date</p>
        </>
    )
}