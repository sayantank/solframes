import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useFrames from "../../hooks/useFrames";
import { getAppLayout } from "../../layouts/AppLayout";
import { CreateFrameResponse } from "../api/create_frame";

type CreateFrameInputs = {
  title: string;
  description: string;
};

function App() {
  const wallet = useWallet();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFrameInputs>();

  const { frames, isLoading, mutate } = useFrames(wallet.publicKey);

  const onSubmit: SubmitHandler<CreateFrameInputs> = async (data) => {
    if (!wallet.connected || !wallet.publicKey || !wallet.signMessage) {
      return;
    }
    try {
      const signature = await wallet.signMessage(
        Buffer.from(JSON.stringify(data))
      );
      await axios.post<CreateFrameResponse>("/api/create_frame", {
        title: data.title,
        description: data.description,
        owner: wallet.publicKey.toString(),
        signature: Buffer.from(signature).toString("hex"),
      });
      await mutate();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(
          (error.response?.data as CreateFrameResponse).error?.message
        );
      }
    }
  };

  return (
    <div className="px-2 md:px-0 flex flex-col">
      <div className="p-4 rounded-lg bg-indigo-100 border border-indigo-200">
        {wallet.connected ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-1 mb-2">
              <label htmlFor="title" className="form-input-label">
                Title
              </label>
              <input
                type="text"
                {...register("title", { required: true })}
                className="form-input"
              />
              {errors.title && (
                <span className="text-xs text-red-400">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1 mb-4">
              <label htmlFor="description" className="form-input-label">
                Description
              </label>
              <input
                type="text"
                {...register("description")}
                className="form-input"
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
      <div>
        {isLoading && <p>loading</p>}
        {frames && (
          <div>
            {frames.map((frame) => (
              <p key={frame.id}>{frame.title}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

App.getLayout = (page: ReactNode) => getAppLayout(page, "Home");

export default App;
