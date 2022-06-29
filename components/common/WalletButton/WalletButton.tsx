import { Menu, Transition } from "@headlessui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Fragment, useEffect } from "react";
import { WalletMenuItem } from "./WalletMenuItem";

export function WalletButton() {
  const wallet = useWallet();

  useEffect(() => {
    if (wallet.wallet) {
      wallet.wallet.adapter.connect();
    }
  }, [wallet.wallet]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="primary-button inline-flex w-full justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-opacity-75">
        {wallet.connected
          ? `${wallet.publicKey?.toString().slice(0, 4)}...${wallet.publicKey
              ?.toString()
              .slice(-4)}`
          : "Connect Wallet"}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-indigo-200 rounded-md bg-indigo-100 shadow-lg ring-1 ring-indigo ring-opacity-5 focus:outline-none">
          {!wallet.connected ? (
            <>
              {wallet.wallets
                .filter(
                  (w) =>
                    w.readyState === "Installed" || w.readyState === "Loadable"
                )
                .map((w) => (
                  <WalletMenuItem
                    key={w.adapter.name}
                    onClick={() => {
                      wallet.select(w.adapter.name);
                    }}
                  >
                    {w.adapter.name}
                  </WalletMenuItem>
                ))}
            </>
          ) : (
            <WalletMenuItem onClick={() => wallet.disconnect()}>
              Disconnect
            </WalletMenuItem>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
