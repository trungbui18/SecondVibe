// app/providers.tsx
"use client";

import React from "react";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react"; // 💡 cần thêm dòng này
import { store, persistor } from "@/lib/redux/store";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <GoogleOAuthProvider clientId="107380431999-b1eb9i7ne5gjnf9l0v0qeh0cra1ofekc.apps.googleusercontent.com">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default Providers;
