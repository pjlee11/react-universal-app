import React from 'react';
import { ServerData } from '../../../';
import { ServerStyleSheet } from 'styled-components';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

async function withWrapper(App) {
  this.sheet = new ServerStyleSheet();

  this.client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'https://fakerql.com/graphql',
      fetch: fetch,
    }),
    cache: new InMemoryCache(),
  });

  const apolloApp = (
    <ApolloProvider client={this.client}>
      {this.sheet.collectStyles(App)}
    </ApolloProvider>
  );

  try {
    await getDataFromTree(apolloApp);
  } catch (error) {
    console.log(error);
  }

  return apolloApp;
}

withWrapper.getTags = function() {
  const styles = this.sheet.getStyleElement();

  const initialApolloData = this.client.extract();

  return [styles, <ServerData id="__APOLLO_DATA__" data={initialApolloData} />];
};

export default withWrapper;