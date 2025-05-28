import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {type FC, type ReactNode, useState} from "react";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

type Props = {
    children: ReactNode;
};
const QueryProvider: FC<Props> = ({ children }) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        retry: false,
                    },
                },
            }),
    );


    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
    );
};

export default QueryProvider;