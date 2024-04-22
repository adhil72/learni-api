export default class AsyncLoop {
    modifiedData: any[];
    i: number;
    run(data: any[], callback: any): Promise<any>;
    processData(data: any[], callback: any, onDone: any): Promise<void>;
}
