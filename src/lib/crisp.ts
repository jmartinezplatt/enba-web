// Crisp Chat — Integration Helper
// Docs: https://docs.crisp.chat/guides/chatbox-sdks/web-sdk/dollar-crisp/

// TODO: Replace with your real Crisp Website ID from https://app.crisp.chat/settings/websites/
const CRISP_WEBSITE_ID = "b7916682-8f6a-46d5-b510-b8f4f3b87748";

declare global {
  interface Window {
    $crisp: unknown[];
    CRISP_WEBSITE_ID: string;
  }
}

/**
 * Loads the Crisp widget script. Called once on app mount.
 */
export function initCrisp() {
  if (window.$crisp) return; // already loaded

  window.$crisp = [];
  window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;

  const script = document.createElement("script");
  script.src = "https://client.crisp.chat/l.js";
  script.async = true;
  document.head.appendChild(script);
}

/**
 * Opens the Crisp chat box and optionally sends context as the first message
 * so the n8n webhook receives it and can route to the right agent.
 */
export function openCrispChat(context?: {
  page: string;
  destino?: string;
  velero?: string;
  modelo?: string;
}) {
  if (!window.$crisp) return;

  // Set session data that Crisp passes to webhooks (available in n8n)
  if (context) {
    window.$crisp.push(["set", "session:data", [[
      ["pagina_origen", context.page],
      ...(context.destino ? [["destino", context.destino]] : []),
      ...(context.velero ? [["velero", context.velero]] : []),
      ...(context.modelo ? [["modelo", context.modelo]] : []),
    ]]]);
  }

  // Open the chat box
  window.$crisp.push(["do", "chat:open"]);
}
