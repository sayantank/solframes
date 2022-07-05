// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PublicKey } from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";
import nacl from "tweetnacl";
import { FramesSchema, supabase } from "../../lib/supabase";

export type CreateFrameResponse = {
  data?: FramesSchema;
  error?: {
    message: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateFrameResponse>
) {
  if (req.method === "POST") {
    const { title, description, owner, signature } = req.body;

    try {
      const ownerKey = new PublicKey(owner);
      const signatureBuffer = Buffer.from(signature, "hex");

      const isVerified = nacl.sign.detached.verify(
        Buffer.from(JSON.stringify({ title, description })),
        signatureBuffer,
        ownerKey.toBuffer()
      );
      if (!isVerified) {
        return res
          .status(500)
          .send({ error: { message: "Invalid signature." } });
      }

      const { data: frames, error } = await supabase
        .from<FramesSchema>("frames")
        .insert({
          title: title,
          description: description,
          owner_key: ownerKey.toString(),
        });

      if (error || frames.length === 0) {
        console.log(error);
        return res.status(500).send({ error: { message: "Supabase error." } });
      }

      return res.status(200).send({ data: frames[0] });
    } catch (e) {
      console.error(e);
      return res.status(500).send({
        error: {
          message: "Invalid data provided.",
        },
      });
    }
  } else {
    return res.status(405).send({ error: { message: "Method not allowed." } });
  }
}
