import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppRoutes from "./AppRoutes";

export function render(url: string) {
  const helmetContext: { helmet?: Record<string, { toString(): string }> } = {};
  const queryClient = new QueryClient();

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;
  const head = helmet
    ? [
        helmet.title?.toString() || "",
        helmet.meta?.toString() || "",
        helmet.link?.toString() || "",
        helmet.script?.toString() || "",
      ]
        .filter(Boolean)
        .join("\n  ")
    : "";

  return { html, head };
}
