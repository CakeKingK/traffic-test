const http = require("http");
const os = require("os");
const redis = require("redis")

const instance = process.env.APP_INSTANCE || "unknown";
const redisHost = process.env.REDIS_HOST || "localhost";
const client = redis.createClient({ url: `redis://${redisHost}:6379`});
client.connect().catch(() => console.log("redis connect failed"));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

http.createServer(async (req, res) => {
  if (req.url.startsWith("/health")) {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ ok: true, instance, host: os.hostname() }));
  }

  if (req.url.startsWith("/cached")) {
    const url = new URL(req.url, "http://localhost");
    const key = url.searchParams.get("key") || "default";
    const cached = await client.get(key);
    if (cached) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ instance, cache: "HIT", key, value: cached }));
    }
    await sleep(30);
    const value = `value_${Date.now()}`;
    await client.setEx(key, 10, value);
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ instance, cache: "MISS", key, value }));
  }

  if (req.url.startsWith("/slow")) {
    await sleep(100);
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ instance, slow: true }));
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ instance, message: "hello" }));
}).listen(8080, () => console.log(`server up: ${instance}`));