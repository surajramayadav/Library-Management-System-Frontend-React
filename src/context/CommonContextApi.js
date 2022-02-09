import React from "react";

export const CommonContext = React.createContext();

export default function CommonContextProvider({ children }) {
  const [show, setShow] = React.useState(false);

  const [options, setOptions] = React.useState({});

  const closeModalHandler = () => setShow(false);

  const selectOptions1 = (values, name1, level) => {
    setOptions({ value: values, name: name1, level });
  };

  return (
    <CommonContext.Provider
      value={{
        show,
        setShow,
        close: closeModalHandler,
        allSelect: selectOptions1,
        options,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
}
