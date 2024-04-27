declare const addGenerationQuery: (data: {
    prompt: string;
    script: string;
    user_id: string;
    chat_id: string;
}) => Promise<void>;
declare const getGenerationsQuery: (user_id: string) => Promise<any[]>;
export { addGenerationQuery, getGenerationsQuery };
