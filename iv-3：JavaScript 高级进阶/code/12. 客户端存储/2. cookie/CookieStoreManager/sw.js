self.addEventListener("install", async (event) => {
  console.log("service worker is installed");
  const subscriptions = await self.registration.cookies.getSubscriptions();
  await self.registration.cookies.unsubscribe(subscriptions);

  await self.registration.cookies.subscribe([
    {
      name: "cookie-x",
    },
  ]);
});

// 监听变化
self.addEventListener("cookiechange", (ev) => {
  console.log("service worker cookiechange:", ev.changed, ev.deleted);
});

console.log("service worker !!!!");
