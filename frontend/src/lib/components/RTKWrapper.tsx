"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store/store";

type Props = {
  children: React.ReactNode;
};

export default function RTKWrapper({ children }: Props) {
  return (
    <html>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
