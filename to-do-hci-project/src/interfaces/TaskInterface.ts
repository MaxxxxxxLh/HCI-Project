export interface TaskInterface{
    id: number,
    title: string,
    content: string,
    level: string,
    date: Date,
    category: string,
    isFinished: boolean,
    //undertask: JSX.Element,
}