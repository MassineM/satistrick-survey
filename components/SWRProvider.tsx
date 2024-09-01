"use client";

import { fetcher } from "@/lib/swr";
import { SWRConfig } from "swr";

interface Props {
  children: React.ReactNode;
}

function SWRProvider({ children }: Props) {
  return (
    <SWRConfig
      value={{
        fetcher: ([url, token, args]) => fetcher(url, token, args),
      }}
    >
      {children}
    </SWRConfig>
  );
}

export default SWRProvider;
