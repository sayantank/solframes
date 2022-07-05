import { useWallet } from "@solana/wallet-adapter-react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getRegularLayout } from "../../layouts/RegularLayout";
import { FramesSchema, supabase } from "../../lib/supabase";

const INCREMENTS = [1, 5, 10, 50, 100];

type Props = {
  frame: FramesSchema;
};

interface Params extends ParsedUrlQuery {
  frame_id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: frames, error } = await supabase
    .from<FramesSchema>("frames")
    .select();

  if (error) return { paths: [], fallback: false };

  const paths = frames.map((frame) => ({
    params: { frame_id: frame.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params) return { notFound: true };

  const { frame_id } = params;
  const { data: frame, error } = await supabase
    .from<FramesSchema>("frames")
    .select()
    .eq("id", frame_id);

  if (error || frame.length == 0) return { notFound: true };

  return { props: { frame: frame[0] }, revalidate: 20 };
};

type PayFrameInputs = {
  amount: number;
};

function Pay({ frame }: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PayFrameInputs>();
  const watchAmount = watch("amount", 0);

  const onSubmit: SubmitHandler<PayFrameInputs> = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2 border-t border-t-indigo-200 pt-4">
        <div className="flex items-center space-x-2 text-sm font-light text-indigo-500">
          <span>By</span>
          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-medium leading-none text-indigo-100 bg-indigo-600 rounded-full">
            {frame.owner_key.slice(0, 4)}...{frame.owner_key.slice(-4)}
          </span>
        </div>
        <div className="text-4xl font-semibold text-indigo-600">
          {frame.title}
        </div>
        <div className="font-light text-indigo-400">{frame.description}</div>
      </div>
      <div className="p-4 rounded-lg bg-indigo-100 border border-indigo-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-1 mb-4">
            <label htmlFor="description" className="form-input-label">
              Amount
            </label>
            <input
              type="number"
              {...register("amount", { required: true })}
              className="form-input"
            />
            {errors.amount && (
              <span className="text-xs text-red-400">
                This field is required
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2 mb-4">
            {INCREMENTS.map((increment) => (
              <button
                key={`increment-${increment}`}
                type="button"
                className="py-1 px-3 border border-indigo-300 hover:bg-indigo-600 transition-all text-indigo-500 hover:text-white font-semibold rounded-lg"
                onClick={() =>
                  setValue("amount", Number(watchAmount.toString()) + increment)
                }
              >
                +{increment}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="primary-button w-full focus:outline-indigo-500"
          >
            Generate Transaction
          </button>
        </form>
      </div>
    </div>
  );
}

Pay.getLayout = (page: ReactNode) => getRegularLayout(page, "Home");

export default Pay;
