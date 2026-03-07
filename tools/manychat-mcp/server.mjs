#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API_KEY = process.env.MANYCHAT_API_KEY;
const BASE_URL = "https://api.manychat.com/fb";

if (!API_KEY) {
  console.error("MANYCHAT_API_KEY environment variable is required");
  process.exit(1);
}

async function manychatRequest(endpoint, method = "GET", body = null) {
  const opts = {
    method,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${endpoint}`, opts);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`ManyChat API error ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

const server = new McpServer({
  name: "manychat",
  version: "1.0.0",
});

// ── Page Info ──
server.tool("get_page_info", "Get ManyChat page/bot info", {}, async () => {
  const data = await manychatRequest("/page/getInfo");
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
});

// ── Subscribers ──
server.tool(
  "get_subscriber",
  "Get subscriber info by ID",
  { subscriber_id: z.string().describe("ManyChat subscriber ID") },
  async ({ subscriber_id }) => {
    const data = await manychatRequest(`/subscriber/getInfo?subscriber_id=${subscriber_id}`);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

server.tool(
  "find_subscriber_by_name",
  "Find subscribers by name",
  { name: z.string().describe("Name to search for") },
  async ({ name }) => {
    const data = await manychatRequest(`/subscriber/findByName?name=${encodeURIComponent(name)}`);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

server.tool(
  "get_subscribers_by_tag",
  "Get all subscribers with a specific tag",
  { tag_id: z.number().describe("Tag ID") },
  async ({ tag_id }) => {
    const data = await manychatRequest("/subscriber/getInfoByTag", "POST", { tag_id });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// ── Tags ──
server.tool("list_tags", "List all tags", {}, async () => {
  const data = await manychatRequest("/page/getTags");
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
});

server.tool(
  "create_tag",
  "Create a new tag",
  { name: z.string().describe("Tag name") },
  async ({ name }) => {
    const data = await manychatRequest("/page/createTag", "POST", { name });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

server.tool(
  "add_tag_to_subscriber",
  "Add a tag to a subscriber",
  {
    subscriber_id: z.string().describe("Subscriber ID"),
    tag_id: z.number().describe("Tag ID"),
  },
  async ({ subscriber_id, tag_id }) => {
    const data = await manychatRequest("/subscriber/addTag", "POST", { subscriber_id, tag_id });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

server.tool(
  "remove_tag_from_subscriber",
  "Remove a tag from a subscriber",
  {
    subscriber_id: z.string().describe("Subscriber ID"),
    tag_id: z.number().describe("Tag ID"),
  },
  async ({ subscriber_id, tag_id }) => {
    const data = await manychatRequest("/subscriber/removeTag", "POST", { subscriber_id, tag_id });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// ── Custom Fields ──
server.tool("list_custom_fields", "List all custom fields", {}, async () => {
  const data = await manychatRequest("/page/getCustomFields");
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
});

server.tool(
  "set_custom_field",
  "Set a custom field value for a subscriber",
  {
    subscriber_id: z.string().describe("Subscriber ID"),
    field_id: z.number().describe("Custom field ID"),
    field_value: z.string().describe("Value to set"),
  },
  async ({ subscriber_id, field_id, field_value }) => {
    const data = await manychatRequest("/subscriber/setCustomField", "POST", {
      subscriber_id,
      field_id,
      field_value,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// ── Flows ──
server.tool("list_flows", "List all flows/automations", {}, async () => {
  const data = await manychatRequest("/page/getFlows");
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
});

// ── Send Content ──
server.tool(
  "send_flow",
  "Send a flow to a subscriber",
  {
    subscriber_id: z.string().describe("Subscriber ID"),
    flow_ns: z.string().describe("Flow namespace/ID"),
  },
  async ({ subscriber_id, flow_ns }) => {
    const data = await manychatRequest("/sending/sendFlow", "POST", {
      subscriber_id,
      flow_ns,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

server.tool(
  "send_text",
  "Send a text message to a subscriber",
  {
    subscriber_id: z.string().describe("Subscriber ID"),
    text: z.string().describe("Message text"),
    message_tag: z
      .string()
      .default("ACCOUNT_UPDATE")
      .describe("Message tag (ACCOUNT_UPDATE, CONFIRMED_EVENT_UPDATE, POST_PURCHASE_UPDATE)"),
  },
  async ({ subscriber_id, text, message_tag }) => {
    const data = await manychatRequest("/sending/sendContent", "POST", {
      subscriber_id,
      data: { version: "v2", content: { messages: [{ type: "text", text }] } },
      message_tag,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// ── Bot Fields ──
server.tool("list_bot_fields", "List all bot (global) fields", {}, async () => {
  const data = await manychatRequest("/page/getBotFields");
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
});

server.tool(
  "set_bot_field",
  "Set a bot (global) field value",
  {
    field_id: z.number().describe("Bot field ID"),
    field_value: z.string().describe("Value to set"),
  },
  async ({ field_id, field_value }) => {
    const data = await manychatRequest("/page/setBotField", "POST", { field_id, field_value });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// ── Subscriber Management ──
server.tool(
  "subscribe_subscriber",
  "Subscribe (opt-in) a subscriber to the bot",
  { subscriber_id: z.string().describe("Subscriber ID") },
  async ({ subscriber_id }) => {
    const data = await manychatRequest("/subscriber/subscribe", "POST", { subscriber_id });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

server.tool(
  "unsubscribe_subscriber",
  "Unsubscribe (opt-out) a subscriber from the bot",
  { subscriber_id: z.string().describe("Subscriber ID") },
  async ({ subscriber_id }) => {
    const data = await manychatRequest("/subscriber/unsubscribe", "POST", { subscriber_id });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// ── OTN (One-Time Notification) ──
server.tool(
  "send_otn",
  "Send a one-time notification to a subscriber",
  {
    subscriber_id: z.string().describe("Subscriber ID"),
    otn_topic_id: z.number().describe("OTN topic ID"),
    text: z.string().describe("Notification text"),
  },
  async ({ subscriber_id, otn_topic_id, text }) => {
    const data = await manychatRequest("/sending/sendContent", "POST", {
      subscriber_id,
      data: { version: "v2", content: { messages: [{ type: "text", text }] } },
      message_tag: "ONE_TIME_NOTIFICATION",
      otn_topic_id,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

// ── Growth Tools ──
server.tool("list_growth_tools", "List all growth tools (widgets)", {}, async () => {
  const data = await manychatRequest("/page/getGrowthTools");
  return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
