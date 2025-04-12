export default function taskConvertor(tasks:string){
    const splittasks = tasks.split('\r\n').slice(2)
    return splittasks
}