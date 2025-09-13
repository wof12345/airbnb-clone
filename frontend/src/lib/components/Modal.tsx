import { ReactNode, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Button from "./Buttons/Button";
import { IconX } from "@tabler/icons-react";

type ModalProps = {
  state: boolean;
  setState: any;
  children: ReactNode;
};

export default function Modal({
  state = false,
  setState = () => {
    state = false;
  },
  children,
  ...props
}: ModalProps) {
  useEffect(() => {
    if (state) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [state]);

  return (
    <div className={`z-101`}>
      <div
        className={`overlay fixed w-full h-full z-[102] bg-gray-800  top-0 left-0  ${
          state ? "opacity-40" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setState(0)}
      ></div>

      <div
        className={twMerge(
          `absolute left-0 right-0 top-[40%] bottom-0 rounded-3xl bg-white w-[90%] sm:w-[80%] max-w-[1200px] max-h-[90vh] z-[103] m-auto transition-all duration-500 delay-100 ${
            state ? "scale-100" : "scale-0"
          }`,
          props.className
        )}
      >
        <Button
          onClick={() => setState(0)}
          className="p-1.5 bg-transparent hover:bg-gray-100  absolute top-4 left-4"
          variant="icon"
        >
          <IconX size={18} />
        </Button>

        <div className="modal-body w-full h-full overflow-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
