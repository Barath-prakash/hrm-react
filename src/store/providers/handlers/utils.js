const setContextState = (setState, paramName, value) => {
    setState((prevData) => ({
        ...prevData,
        ...(typeof value === 'object' && !Array.isArray(value)
            ? {
                  [paramName]: {
                      ...prevData?.[paramName],
                      ...value
                  }
              }
            : {
                  [paramName]: value
              })
    }));
};

export { setContextState };
