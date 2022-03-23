/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 *
 * @format
 */

 import App from "./App";
 import {
   ApolloClient,
   InMemoryCache,
   ApolloProvider,
 } from "@apollo/client";

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Loader() {
    const client = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </ApolloProvider>
    );
}
