// Sends a lead. When VITE_BACKEND_ENDPOINT is set (self-hosted build, e.g. on AWS Amplify), the
// lead is POSTed to that URL: the backend's lead endpoint, which must answer { "ok": true }.
// Otherwise it goes to the Base44 saveLead function, so the Base44 app keeps working unchanged.
const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;

export async function submitLead(payload) {
  if (BACKEND_ENDPOINT) {
    // text/plain keeps this a simple request, so the browser sends it without a CORS preflight.
    const res = await fetch(BACKEND_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...payload, site: "jagotech" }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.ok !== true) throw new Error(data.error || "Lead not saved");
    return { data };
  }
  const { base44 } = await import("@/api/base44Client");
  return base44.functions.invoke("saveLead", payload);
}
