"use client";

import { ReactNode, useContext, useState } from "react";
import { PageSectionContext, PageSectionHeader } from "./PageSectionContext";

export const usePageSection = () => {
  const context = useContext(PageSectionContext);
  if (!context) {
    throw new Error("usePageSection must be used within a PageSectionProvider");
  }
  return context;
};

export const PageSectionProvider = ({ children }: { children: ReactNode }) => {
  const [headerList, setHeaderList] = useState<PageSectionHeader[]>([]);

  return (
    <PageSectionContext.Provider
      value={{
        headerList,
        setHeaderList,
      }}
    >
      {children}
    </PageSectionContext.Provider>
  );
};
