import { ImageResponse } from "next/og";
import { join } from "path";
import { readFile } from "fs/promises";

export type Props = {
  title?: string;
};

export default async function OpengraphImage(
  props?: Props,
): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME || "MintCase",
    },
    ...props,
  };

  const [fontFile, logoFile] = await Promise.all([
    readFile(join(process.cwd(), "./fonts/Inter-Bold.ttf")),
    readFile(join(process.cwd(), "./public/logo.png")),
  ]);
  const font = Uint8Array.from(fontFile).buffer;
  const logoBase64 = `data:image/png;base64,${logoFile.toString("base64")}`;

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-[#0B0B0D]">
        <img src={logoBase64} alt="MintCase" tw="h-24 w-auto" />
        <p tw="mt-10 text-5xl font-bold text-white">{title}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: font,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
