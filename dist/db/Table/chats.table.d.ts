declare const createNewChatQuery: (userId: string) => Promise<import("pg").QueryResult<any>>;
declare const getChatByIdQuery: (id: string) => Promise<import("pg").QueryResult<any>>;
declare const fetchUserChatsQuery: (userId: string) => Promise<import("pg").QueryResult<any>>;
declare const fetchChatGenerations: (chatId: string) => Promise<import("pg").QueryResult<any>>;
export { createNewChatQuery, getChatByIdQuery, fetchUserChatsQuery, fetchChatGenerations };
