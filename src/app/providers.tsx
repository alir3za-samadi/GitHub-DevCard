"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/queries/common/query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type ReactNode } from "react";
import { TooltipProvider } from "@/components/base/tooltip";
import { ThemeProvider } from "@/components/providers/theme-provider";

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
