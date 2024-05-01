// "use client";

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

// function makeClient() {
//   const httpLink = new HttpLink({
//     uri: "http://localhost:3000/api/graphql",
//     fetchOptions: { cache: "no-store" },
//   });

//   return new NextSSRApolloClient({
//     cache: new NextSSRInMemoryCache(),
//     link:
//       typeof window === "undefined"
//         ? ApolloLink.from([
//             new SSRMultipartLink({
//               stripDefer: true,
//             }),
//             httpLink,
//           ])
//         : httpLink,
//   });
// }

// export function ApolloWrapper({ children }) {
//   return (
//     <ApolloNextAppProvider makeClient={makeClient}>
//       {children}
//     </ApolloNextAppProvider>
//   );
// }

  export const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache()
  });