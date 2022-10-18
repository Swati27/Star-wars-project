export default async function fetchJson(...args) {
  const res = await fetch(...args);
  return await res.json();
  }
  