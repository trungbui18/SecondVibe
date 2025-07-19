import ManagementMenu from "./components/ManagementMenu";
import { ReactNode } from "react";

export default function ManageLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <ManagementMenu />
      <div className="pt-8">{children}</div>
    </div>
  );
}
