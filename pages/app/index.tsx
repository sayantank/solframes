import { useWallet } from "@solana/wallet-adapter-react";
import { ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { WalletButton } from "../../components/common/WalletButton";
import { getAppLayout } from "../../layouts/AppLayout";

type CreateFrameInputs = {
  title: string;
  description: string;
};

function App() {
  const wallet = useWallet();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateFrameInputs>();

  const onSubmit: SubmitHandler<CreateFrameInputs> = (data) =>
    console.log(data);

  return (
    <div className="px-2 md:px-0 flex flex-col">
      <div className="p-4 rounded-lg bg-indigo-100 border border-indigo-200">
        {wallet.connected ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-1 mb-2">
              <label
                htmlFor="title"
                className="text-sm font-light text-indigo-500"
              >
                Title
              </label>
              <input
                type="text"
                {...register("title", { required: true })}
                className="bg-transparent border border-indigo-300 p-2 rounded-lg focus:outline-indigo-500 text-indigo-700"
              />
            </div>
            <div className="flex flex-col space-y-1 mb-4">
              <label
                htmlFor="description"
                className="text-sm font-light text-indigo-500"
              >
                Description
              </label>
              <input
                type="text"
                {...register("description")}
                className="bg-transparent border border-indigo-300 p-2 rounded-lg focus:outline-indigo-500 text-indigo-700"
              />
            </div>

            <button
              type="submit"
              className="primary-button w-full focus:outline-indigo-500"
            >
              Create Frame
            </button>
          </form>
        ) : (
          <p className="w-full text-center font-light text-indigo-400">
            Wallet not connected 👀
          </p>
        )}
      </div>
    </div>
  );
}

App.getLayout = (page: ReactNode) => getAppLayout(page, "Home");

export default App;
