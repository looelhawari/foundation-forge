/// <reference types="vite/client" />

// Allow importing PDF files
declare module "*.pdf" {
    const src: string;
    export default src;
}
