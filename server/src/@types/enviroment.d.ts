export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CS_CODE: string;
            DATABASE_URL: string;
            ENV: 'test' | 'dev' | 'prod';
        }
    }
}