"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const AsyncLoop_1 = __importDefault(require("./AsyncLoop"));
function fetch(dirPath = './src/routes', currentPath = '') {
    const files = fs_1.default.readdirSync(dirPath);
    let paths = [];
    for (const file of files) {
        const filePath = path_1.default.join(dirPath, file);
        if (fs_1.default.statSync(filePath).isDirectory()) {
            const subDirPath = path_1.default.join(currentPath, file);
            const subDirPaths = fetch(filePath, subDirPath);
            paths = paths.concat(subDirPaths);
        }
        else if (file.endsWith('.ts')) {
            const filePathWithoutExt = path_1.default.join(currentPath, file);
            paths.push(filePathWithoutExt);
        }
    }
    return paths;
}
const getAllPaths = async () => {
    let routes = [];
    let paths = fetch();
    let base = process.cwd() + '/dist/routes/';
    await new AsyncLoop_1.default().run(paths, async (p) => {
        let modulePath = base + p.replace('.ts', '.js');
        let module = await Promise.resolve(`${modulePath}`).then(s => __importStar(require(s)));
        routes.push({ fun: module.default, path: p.replace('.ts', '') });
    });
    return routes;
};
exports.default = getAllPaths;
