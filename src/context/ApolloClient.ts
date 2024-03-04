import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: 'https://api.studio.thegraph.com/query/66835/dlottery_v2/version/latest',
    cache: new InMemoryCache(),
});

export default apolloClient