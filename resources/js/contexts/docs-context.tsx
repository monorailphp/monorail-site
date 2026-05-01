import { createContext, useContext } from 'react';

const DocsContentContext = createContext<string>('');

export function useDocsContent(): string {
    return useContext(DocsContentContext);
}

export { DocsContentContext };
