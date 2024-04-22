"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AsyncLoop {
    constructor() {
        this.modifiedData = [];
        this.i = 0;
    }
    async run(data, callback) {
        this.modifiedData = data;
        return new Promise((r) => {
            this.processData(data, callback, () => {
                r(this.modifiedData);
            });
        });
    }
    async processData(data, callback, onDone) {
        let obj = data[this.i];
        if (obj) {
            let md = await callback(obj, this.i);
            this.modifiedData[this.i] = md;
            this.i++;
            this.processData(data, callback, onDone);
        }
        else {
            onDone();
        }
    }
}
exports.default = AsyncLoop;
