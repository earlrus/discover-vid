import { Magic } from "magic-sdk";

// must use a Dedicated Wallet API Key

const createMagic = () =>
  typeof window !== "undefined" && new Magic(process.env.NEXT_PUBLIC_MAGIC_KEY);
export const magic = createMagic();
