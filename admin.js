const adminState = {
  users: [],
  filtered: []
};

function getAdminConfigError() {
  if (!window.supabaseClient && !window.supabase) return "Supabase library is niet geladen.";
  if (!window.SUPABASE_URL || String(window.SUPABASE_URL).includes("VUL_HIER")) return "Supabase URL ontbreekt. Controleer supabase-client.js.";
  if (!window.SUPABASE_ANON_KEY || String(window.SUPABASE_ANON_KEY).includes("VUL_HIER")) return "Supabase anon key ontbreekt. Controleer supabase-client.js.";
  return "";
}

const adminConfigError = getAdminConfigError();
const adminSupabase = adminConfigError
  ? null
  : (window.supabaseClient || supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storage: window.localStorage }
    }));

function adminToast(message) {
  const toast = document.getElementById("adminToast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove("hidden");
  window.clearTimeout(adminToast._timer);
  adminToast._timer = window.setTimeout(() => toast.classList.add("hidden"), 3600);
}

function setAdminLoginMessage(message) {
  const el = document.getElementById("adminLoginMessage");
  if (el) el.textContent = message || "";
}

function humanAdminError(error) {
  const msg = String(error?.message || error || "");
  if (msg === "Failed to fetch" || msg.includes("Failed to fetch")) {
    return "Kan de admin-functie niet bereiken. Controleer of de Supabase Edge Function 'admin-users' is gedeployed en CORS actief is.";
  }
  if (msg.includes("FunctionsHttpError")) return "De admin-functie gaf een fout terug. Controleer de Edge Function logs in Supabase.";
  return msg || "Er ging iets mis.";
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  }[char]));
}

function formatDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("nl-BE", { dateStyle: "short", timeStyle: "short" }).format(date);
}

function setButtonBusy(button, busy, textWhenBusy = "Even geduld...") {
  if (!button) return;
  if (busy) {
    button.dataset.originalText = button.textContent;
    button.textContent = textWhenBusy;
    button.disabled = true;
  } else {
    button.textContent = button.dataset.originalText || button.textContent;
    button.disabled = false;
  }
}

async function callAdminFunction(action, payload = {}) {
  if (adminConfigError) throw new Error(adminConfigError);
  if (!adminSupabase) throw new Error("Supabase is niet geïnitialiseerd.");

  const { data: sessionData } = await adminSupabase.auth.getSession();
  const token = sessionData?.session?.access_token;
  if (!token) throw new Error("Niet ingelogd.");

  const url = `${window.SUPABASE_URL.replace(/\/$/, "")}/functions/v1/admin-users`;
  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ action, ...payload })
    });
  } catch (error) {
    throw new Error(humanAdminError(error));
  }

  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || `Adminactie mislukt (${response.status}).`);
  return result;
}

async function adminLogin() {
  setAdminLoginMessage("");
  if (adminConfigError) return setAdminLoginMessage(adminConfigError);

  const email = document.getElementById("adminEmail")?.value?.trim();
  const password = document.getElementById("adminPassword")?.value || "";
  const loginBtn = document.getElementById("adminLoginBtn");

  if (!email || !password) return setAdminLoginMessage("Vul je e-mailadres en wachtwoord in.");

  try {
    setButtonBusy(loginBtn, true, "Inloggen...");
    const { error } = await adminSupabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await showAdminDashboard();
  } catch (error) {
    await adminSupabase?.auth.signOut();
    setAdminLoginMessage(humanAdminError(error) || "Inloggen mislukt.");
  } finally {
    setButtonBusy(loginBtn, false);
  }
}

async function adminLogout() {
  if (adminSupabase) await adminSupabase.auth.signOut();
  document.getElementById("adminLoginCard")?.classList.remove("hidden");
  document.getElementById("adminLoginCard")?.classList.add("active");
  document.getElementById("adminDashboard")?.classList.add("hidden");
  document.getElementById("adminDashboard")?.classList.remove("active");
  document.getElementById("adminLogoutBtn")?.classList.add("hidden");
}

async function showAdminDashboard() {
  await loadAdminUsers();
  document.getElementById("adminLoginCard")?.classList.add("hidden");
  document.getElementById("adminLoginCard")?.classList.remove("active");
  document.getElementById("adminDashboard")?.classList.remove("hidden");
  document.getElementById("adminDashboard")?.classList.add("active");
  document.getElementById("adminLogoutBtn")?.classList.remove("hidden");
}

async function loadAdminUsers() {
  const result = await callAdminFunction("list");
  adminState.users = Array.isArray(result.users) ? result.users : [];
  applyAdminFilters();
}

function applyAdminFilters() {
  const query = String(document.getElementById("adminSearch")?.value || "").trim().toLowerCase();
  const status = document.getElementById("adminStatusFilter")?.value || "all";

  adminState.filtered = adminState.users.filter(user => {
    if (status === "active" && user.is_blocked) return false;
    if (status === "blocked" && !user.is_blocked) return false;
    const haystack = [user.first_name, user.last_name, user.email, user.salon_name, user.country, user.region, user.city, user.timezone, user.subscription_plan, user.subscription_status].join(" ").toLowerCase();
    return !query || haystack.includes(query);
  });
  renderAdminStats();
  renderAdminUsers();
}

function renderAdminStats() {
  const users = adminState.users;
  const total = users.length;
  const blocked = users.filter(user => user.is_blocked).length;
  const active = total - blocked;
  const subscriptions = users.filter(user => ["active", "trial"].includes(String(user.subscription_status || "").toLowerCase())).length;
  [["adminTotalUsers", total], ["adminActiveUsers", active], ["adminBlockedUsers", blocked], ["adminActiveSubscriptions", subscriptions]].forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(value);
  });
}

function renderAdminUsers() {
  const list = document.getElementById("adminUsersList");
  if (!list) return;
  if (!adminState.filtered.length) {
    list.innerHTML = `<div class="admin-empty-state">Geen accounts gevonden voor deze selectie.</div>`;
    return;
  }
  list.innerHTML = adminState.filtered.map(user => {
    const name = [user.first_name, user.last_name].filter(Boolean).join(" ") || "Naam ontbreekt";
    const location = [user.region, user.country].filter(Boolean).join(" · ") || "-";
    const plan = user.subscription_plan || "free";
    const subStatus = user.subscription_status || "none";
    const statusClass = user.is_blocked ? "blocked" : "";
    const statusText = user.is_blocked ? "Geblokkeerd" : "Actief";
    const blockAction = user.is_blocked
      ? `<button class="btn btn-secondary" type="button" data-admin-action="unblock" data-user-id="${escapeHtml(user.id)}">Deblokkeren</button>`
      : `<button class="btn btn-secondary" type="button" data-admin-action="block" data-user-id="${escapeHtml(user.id)}">Blokkeren</button>`;
    return `
      <article class="admin-user-card">
        <div class="admin-user-card-main">
          <div class="admin-user-topline">
            <div>
              <div class="admin-user-name">${escapeHtml(name)}</div>
              <div class="admin-user-email">${escapeHtml(user.email || "-")}</div>
              <div class="admin-user-small">Aangemaakt: ${escapeHtml(formatDateTime(user.created_at))}</div>
            </div>
            <span class="admin-status-pill ${statusClass}">${statusText}</span>
          </div>
          <div class="admin-user-grid">
            <div class="admin-user-field"><span>Salon</span><strong>${escapeHtml(user.salon_name || "-")}</strong></div>
            <div class="admin-user-field"><span>Locatie</span><strong>${escapeHtml(location)}</strong></div>
            <div class="admin-user-field"><span>Tijdzone</span><strong>${escapeHtml(user.timezone || "-")}</strong></div>
            <div class="admin-user-field"><span>Abonnement</span><strong>${escapeHtml(plan)} · ${escapeHtml(subStatus)}</strong></div>
            <div class="admin-user-field"><span>Gebruik</span><strong>${Number(user.appointments_count || 0)} afspraken</strong></div>
            <div class="admin-user-field"><span>Data</span><strong>${Number(user.customers_count || 0)} klanten · ${Number(user.errors_count || 0)} errors</strong></div>
          </div>
        </div>
        <div class="admin-actions">
          ${blockAction}
          <button class="btn btn-danger" type="button" data-admin-action="delete" data-user-id="${escapeHtml(user.id)}">Verwijderen</button>
        </div>
      </article>`;
  }).join("");
}

async function blockUser(userId) {
  const reason = window.prompt("Reden voor blokkering/pauzering?", "Misbruik of administratieve reden") || "";
  await callAdminFunction("block", { userId, reason });
  adminToast("Account geblokkeerd. Gegevens blijven bewaard.");
  await loadAdminUsers();
}

async function unblockUser(userId) {
  await callAdminFunction("unblock", { userId });
  adminToast("Account opnieuw actief.");
  await loadAdminUsers();
}

async function deleteUser(userId) {
  const user = adminState.users.find(item => String(item.id) === String(userId));
  const label = user?.email || userId;
  const confirmation = window.prompt(`Dit verwijdert ${label} volledig, inclusief geschiedenis. Typ VERWIJDEREN om te bevestigen.`);
  if (confirmation !== "VERWIJDEREN") return;
  await callAdminFunction("delete", { userId, reason: "Definitief verwijderd door admin" });
  adminToast("Account en bekende geschiedenis volledig verwijderd.");
  await loadAdminUsers();
}

function setupAdminEvents() {
  document.getElementById("adminLoginBtn")?.addEventListener("click", adminLogin);
  document.getElementById("adminPassword")?.addEventListener("keydown", event => { if (event.key === "Enter") adminLogin(); });
  document.getElementById("adminLogoutBtn")?.addEventListener("click", adminLogout);
  document.getElementById("adminRefreshBtn")?.addEventListener("click", () => loadAdminUsers().catch(error => adminToast(humanAdminError(error))));
  document.getElementById("adminSearch")?.addEventListener("input", applyAdminFilters);
  document.getElementById("adminStatusFilter")?.addEventListener("change", applyAdminFilters);
  document.getElementById("adminPasswordToggle")?.addEventListener("click", event => {
    const button = event.currentTarget;
    const input = document.getElementById("adminPassword");
    const pressed = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!pressed));
    if (input) input.type = pressed ? "password" : "text";
  });
  document.getElementById("adminUsersList")?.addEventListener("click", event => {
    const button = event.target.closest("button[data-admin-action]");
    if (!button) return;
    const action = button.dataset.adminAction;
    const userId = button.dataset.userId;
    const run = action === "block" ? blockUser : action === "unblock" ? unblockUser : deleteUser;
    setButtonBusy(button, true);
    run(userId).catch(error => adminToast(humanAdminError(error))).finally(() => setButtonBusy(button, false));
  });
}

async function initAdmin() {
  setupAdminEvents();
  if (adminConfigError) return setAdminLoginMessage(adminConfigError);
  const { data } = await adminSupabase.auth.getSession();
  if (data?.session) {
    try { await showAdminDashboard(); }
    catch (error) {
      setAdminLoginMessage(humanAdminError(error));
      await adminSupabase.auth.signOut();
      document.getElementById("adminLoginCard")?.classList.remove("hidden");
      document.getElementById("adminLoginCard")?.classList.add("active");
      document.getElementById("adminDashboard")?.classList.add("hidden");
      document.getElementById("adminDashboard")?.classList.remove("active");
    }
  }
}

document.addEventListener("DOMContentLoaded", initAdmin);
