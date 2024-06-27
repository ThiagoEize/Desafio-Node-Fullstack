import React, { useState } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { FaArrowsUpDown } from "react-icons/fa6";

interface Field {
  key: string;
  name: string;
}

interface FieldsModalProps {
  show: boolean;
  handleClose: () => void;
  eventFieldsToDisplay: Field[];
  setEventFieldsToDisplay: (fields: Field[]) => void;
  availableEventFields: Field[];
  setAvailableEventFields: (fields: Field[]) => void;
}

const FieldsModal: React.FC<FieldsModalProps> = ({
  show,
  handleClose,
  eventFieldsToDisplay,
  setEventFieldsToDisplay,
  availableEventFields,
  setAvailableEventFields,
}) => {
  const [draggedField, setDraggedField] = useState<number | null>(null);
  const [draggedFromAvailable, setDraggedFromAvailable] =
    useState<boolean>(false);

  const ModalComponent: any = Modal;
  const ModalHeader: any = Modal.Header;
  const ModalTitle: any = Modal.Title;
  const ModalBody: any = Modal.Body;
  const ModalFooter: any = Modal.Footer;
  const ListGroupComponent: any = ListGroup;
  const ListGroupItem: any = ListGroup.Item;
  const ButtonComponent: any = Button;

  const handleDragStart = (index: any, fromAvailable: boolean) => {
    setDraggedField(index);
    setDraggedFromAvailable(fromAvailable);
  };

  const handleDrop = (index: any, toAvailable: boolean) => {
    if (draggedField === null) return;

    if (toAvailable !== draggedFromAvailable) {
      if (draggedFromAvailable) {
        const updatedAvailableFields = [...availableEventFields];
        const [addedField] = updatedAvailableFields.splice(draggedField, 1);
        const updatedFields = [...eventFieldsToDisplay];
        updatedFields.splice(index, 0, addedField);
        setEventFieldsToDisplay(updatedFields);
        setAvailableEventFields(updatedAvailableFields);
      } else {
        const updatedFields = [...eventFieldsToDisplay];
        const [removedField] = updatedFields.splice(draggedField, 1);
        const updatedAvailableFields = [...availableEventFields];
        updatedAvailableFields.splice(index, 0, removedField);
        setEventFieldsToDisplay(updatedFields);
        setAvailableEventFields(updatedAvailableFields);
      }
    } else {
      const updatedList = draggedFromAvailable
        ? [...availableEventFields]
        : [...eventFieldsToDisplay];
      const [removedField] = updatedList.splice(draggedField, 1);
      updatedList.splice(index, 0, removedField);

      if (draggedFromAvailable) {
        setAvailableEventFields(updatedList);
      } else {
        setEventFieldsToDisplay(updatedList);
      }
    }

    setDraggedField(null);
    setDraggedFromAvailable(false);
  };

  const handleRemoveField = (index: any) => {
    const updatedFields = [...eventFieldsToDisplay];
    const [removedField] = updatedFields.splice(index, 1);
    setEventFieldsToDisplay(updatedFields);
    setAvailableEventFields([...availableEventFields, removedField]);
  };

  const handleAddField = (index: any) => {
    const updatedAvailableFields = [...availableEventFields];
    const [addedField] = updatedAvailableFields.splice(index, 1);
    setAvailableEventFields(updatedAvailableFields);
    setEventFieldsToDisplay([...eventFieldsToDisplay, addedField]);
  };

  const handleSaveFields = () => {
    localStorage.setItem(
      "eventFieldsToDisplay",
      JSON.stringify(eventFieldsToDisplay)
    );
    localStorage.setItem(
      "availableEventFields",
      JSON.stringify(availableEventFields)
    );
    handleClose();
  };

  return (
    <ModalComponent show={show} onHide={handleClose}>
      <ModalHeader closeButton>
        <ModalTitle>Modifique a visualização</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <h5>Campos visíveis</h5>
        <ListGroupComponent>
          {eventFieldsToDisplay.map((field, index) => (
            <ListGroupItem
              key={field.key}
              draggable
              onDragStart={() => handleDragStart(index, false)}
              onDragOver={(e: React.DragEvent<HTMLDivElement>) =>
                e.preventDefault()
              }
              onDrop={() => handleDrop(index, false)}
            >
              <ButtonComponent
                variant="danger"
                size="sm"
                onClick={() => handleRemoveField(index)}
                style={{ marginRight: "10px" }}
              >
                <FaArrowsUpDown />
              </ButtonComponent>
              {field.name}
            </ListGroupItem>
          ))}
        </ListGroupComponent>
        <h5 className="mt-4">Campos disponíveis</h5>
        <ListGroupComponent>
          {availableEventFields.map((field, index) => (
            <ListGroupItem
              key={field.key}
              draggable
              onDragStart={() => handleDragStart(index, true)}
              onDragOver={(e: React.DragEvent<HTMLDivElement>) =>
                e.preventDefault()
              }
              onDrop={() => handleDrop(index, true)}
            >
              <ButtonComponent
                variant="success"
                size="sm"
                onClick={() => handleAddField(index)}
                style={{ marginRight: "10px" }}
              >
                <FaArrowsUpDown />
              </ButtonComponent>
              {field.name}
            </ListGroupItem>
          ))}
        </ListGroupComponent>
      </ModalBody>
      <ModalFooter>
        <ButtonComponent
          variant="secondary"
          onClick={handleClose}
          style={{ marginRight: "10px" }}
        >
          Fechar
        </ButtonComponent>
        <ButtonComponent variant="primary" onClick={handleSaveFields}>
          Salvar visualização
        </ButtonComponent>
      </ModalFooter>
    </ModalComponent>
  );
};

export default FieldsModal;
