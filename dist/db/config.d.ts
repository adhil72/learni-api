import pg from 'pg';
declare function stringFormatter(inputString: string): string;
declare function stringFormatterRev(inputString: string): string;
declare const _default: {
    connect: () => Promise<void>;
    client: pg.Client;
    stringFormatter: typeof stringFormatter;
    stringFormatterRev: typeof stringFormatterRev;
};
export default _default;
