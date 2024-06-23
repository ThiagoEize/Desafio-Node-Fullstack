// context/HelperContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";
import ConfirmDeleteModal from "../components/confirmDeleteModal/ConfirmDeleteModal"; // Adjust the import path as needed

interface HelperContextProps {
  confirm: (message: string, title: string) => Promise<boolean>;
}

const HelperContext = createContext<HelperContextProps | undefined>(undefined);

const HelperProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState<{
    message: string;
    title: string;
    resolve?: (value: boolean) => void;
  } | null>(null);

  const handleClose = () => {
    if (modalProps?.resolve) {
      modalProps.resolve(false);
    }
    setShowModal(false);
    setModalProps(null);
  };

  const handleConfirm = () => {
    if (modalProps?.resolve) {
      modalProps.resolve(true);
    }
    setShowModal(false);
    setModalProps(null);
  };

  const confirm = (title: string, message: string) => {
    return new Promise<boolean>((resolve) => {
      setModalProps({ message, title, resolve });
      setShowModal(true);
    });
  };

  return (
    <HelperContext.Provider value={{ confirm }}>
      {children}
      {showModal && modalProps && (
        <ConfirmDeleteModal
          show={true}
          handleClose={handleClose}
          handleConfirm={handleConfirm}
          itemName={modalProps.message}
          title={modalProps.title}
        />
      )}
    </HelperContext.Provider>
  );
};

const useHelperContext = () => {
  const context = useContext(HelperContext);
  if (!context) {
    throw new Error("useHelperContext must be used within a HelperProvider");
  }
  return context;
};

export { HelperProvider, useHelperContext };
