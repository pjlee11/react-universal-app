const loadInitialProps = async (route, ctx) => {
  if (!route.getInitialProps) {
    return {};
  }

  try {
    return await route.getInitialProps(ctx);
  } catch (error) {
    return error;
  }
};

export default loadInitialProps;
