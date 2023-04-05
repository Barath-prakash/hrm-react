const setContextState = ({ setState, paramName, paramValue }) => {
    setState((prevData) => ({
        ...prevData,
        ...(typeof paramValue === 'object' && !Array.isArray(paramValue)
            ? {
                  [paramName]: {
                      ...prevData?.[paramName],
                      ...paramValue
                  }
              }
            : {
                  [paramName]: paramValue
              })
    }));
};

export { setContextState };
