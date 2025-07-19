import MyPurchasesMenu from "./components/MyPurchasesMenu";
import { ReactNode } from "react";

export default function ManageLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="pt-4">{children}</div>
    </div>
  );
}
