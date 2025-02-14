declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      JWT_SECRET: string;
    }
  }
}

export { };
