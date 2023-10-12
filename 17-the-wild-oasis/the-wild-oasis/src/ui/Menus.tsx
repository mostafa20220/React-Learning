import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";
import useClickOutside from "../hooks/useClickOutside";
import { set } from "date-fns";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type PropsType = {
  children: React.ReactNode;
};

const MenusContext = createContext<{
  openList: string;
  open: (list: string) => void;
  close: () => void;
  position: DOMRect | null;
  setPosition: React.Dispatch<React.SetStateAction<DOMRect | null>>;
  el: HTMLElement | null;
  setEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}>({
  openList: "",
  open: () => {},
  close: () => {},
  position: null,
  setPosition: () => {},
  el: null,
  setEl: () => {},
});

function Menus({ children }: PropsType) {
  const [openList, setOpenList] = useState<string>("");
  const [position, setPosition] = useState(null);

  const [el, setEl] = useState<HTMLElement | null>(null);

  const open = setOpenList;
  const close = () => setOpenList("");

  return (
    <MenusContext.Provider
      value={{ openList, open, close, position, setPosition, el, setEl }}
    >
      {children}
    </MenusContext.Provider>
  );
}

type TogglePropsType = {
  list: string;
};

function Toggle({ list }: TogglePropsType) {
  const { openList, open, close, setPosition, setEl } =
    useContext(MenusContext);

  const toggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("openList", openList, "list", list);
    if (openList && openList === list) close();
    else {
      const btnEl = (e.target as HTMLButtonElement).closest(
        "button"
      ) as HTMLButtonElement;
      open(list);
      setPosition(btnEl.getBoundingClientRect());

      setEl(btnEl);

      console.log(openList);
    }
  };

  return (
    <StyledToggle onClick={toggle}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

type ListPropsType = {
  children: React.ReactNode;
  name: string;
};

function List({ children, name }: ListPropsType) {
  const { openList, setPosition, position, close, el } =
    useContext(MenusContext);
  const ref = useClickOutside(close);

  const pos = {
    x: window.innerWidth - position?.right,
    y: position?.y + position?.height + 8,
  };

  //* 1 Solution: //? This solution is better because it will close the menu when the user scrolls
  // useEffect(() => {
  //   document.addEventListener("scroll", close);

  //   return () => document.removeEventListener("scroll", close);
  // }, []);

  //* 2 Solution: //? This solution is not good because it will re-render the component every time the scroll event is triggered
  useEffect(() => {
    const handleScroll = () => {
      setPosition(el?.getBoundingClientRect());
    };
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, [el, setPosition]);

  if (openList !== name) return null;

  return createPortal(
    <StyledList ref={ref} position={pos}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children , onClick}: PropsType & { onClick?: () => void }) {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>{children}</StyledButton>
    </li>
  );
}

export default Menus;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
