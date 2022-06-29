import { Menu } from "@headlessui/react";
import { MouseEventHandler } from "react";
import { classNames } from "../../../utils/general";

type WalletMenuItemProps = {
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export function WalletMenuItem({ children, onClick }: WalletMenuItemProps) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={classNames(
            "group flex w-full items-center rounded-md px-4 py-2",
            active ? "bg-indigo-500 text-white" : "text-indigo-600"
          )}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
}
