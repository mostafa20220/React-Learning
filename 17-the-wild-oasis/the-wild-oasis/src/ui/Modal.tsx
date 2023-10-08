import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import {
  ReactElement,
  useMemo,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { set } from "date-fns";
import useClickOutside from "../hooks/useClickOutside";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// const ModalContext = createContext<{ OpenWindowName: string, open: (window: string) => void, close: () => void }>({ OpenWindowName: "", open: () => {}, close: () => {} });

type ModalContextType = {
  OpenWindowName: string;
  open: (window: string) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType>({
  OpenWindowName: "",
  open: () => {},
  close: () => {},
});

type ModalProps = { children: React.ReactNode };

export default function Modal({ children }: ModalProps) {
  const [OpenWindowName, setOpenWindowName] = useState("");

  const modalContextValue = useMemo(
    () => ({
      OpenWindowName,
      open: setOpenWindowName,
      close: setOpenWindowName.bind(null, ""),
    }),
    [OpenWindowName]
  );

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  );
}

type OpenProps = { children: ReactElement; window: string };

function Open({ children, window }: OpenProps) {
  const { open } = useContext<ModalContextType>(ModalContext);

  return cloneElement(children, { onClick: open.bind(null, window) });
}

type WindowProps = { children: ReactElement; name: string };

function Window({ children, name }: WindowProps) {
  const { OpenWindowName, close } = useContext<ModalContextType>(ModalContext);

  const ref = useClickOutside(close);

  if (OpenWindowName !== name) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {cloneElement(children, { onClose: close, isItModal: true })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;