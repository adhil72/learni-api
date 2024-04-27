declare const addUserQuery: (data: {
    email: string;
    password: string;
    id: string;
}) => Promise<import("pg").QueryResult<any>>;
declare const updatePasswordQuery: (id: string, password: string) => Promise<import("pg").QueryResult<any>>;
declare const getUserWithEmailQuery: (email: string) => Promise<any>;
export { addUserQuery, getUserWithEmailQuery, updatePasswordQuery };
