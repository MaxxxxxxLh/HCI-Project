import { TaskInterface } from "@/interfaces/TaskInterface"

export const Box = (props:TaskInterface) => {
    return  (
        <>
            <div className="">
                <h1>{props.title}</h1>
                <div className="">
                    <p>{props.content}</p>
                    <p>{props.level}</p>
                    <p>{props.date}</p>
                    <p>{props.categorie}</p>    
                </div>
            </div>
        </>
    )
}