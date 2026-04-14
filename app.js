const STORAGE_KEY = "nailbooker_v1";
const today = new Date();

function formatDateInput(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const todayStr = formatDateInput(today);

const state = {
  currentScreen: "agendaScreen",
  currentYear: today.getFullYear(),
  currentMonth: today.getMonth(),
  selectedDate: todayStr,
  selectedClientId: null,
  previousMainScreen: "clientsScreen",
  clientLetter: "",
  settingsSavePending: false,
  statsTopCustomersVisible: 10
};

const monthNames = [
  "JANUARI", "FEBRUARI", "MAART", "APRIL", "MEI", "JUNI",
  "JULI", "AUGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DECEMBER"
];

const longMonthNames = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december"
];

const defaultPaymentMethods = [
  { id: 1, name: "Cash", sortOrder: 1 },
  { id: 2, name: "Payconiq", sortOrder: 2 },
  { id: 3, name: "Bancontact", sortOrder: 3 },
  { id: 4, name: "Kaart", sortOrder: 4 },
  { id: 5, name: "Overschrijving", sortOrder: 5 },
  { id: 6, name: "Andere", sortOrder: 6 }
];

const revenuePickerState = {
  mode: "year",
  columns: [],
  selected: {}
};

const notificationTimers = new Map();
let notificationHeartbeatId = null;

const paymentPopoverState = {
  appointmentId: null,
  anchorRect: null
};


function addDaysStr(dateStr, days) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return formatDateInput(d);
}

function getDefaultSettings() {
  return {
    defaultBreakMinutes: 10,
    notificationsEnabled: false,
    reminderMinutes: 30,
    overlapWarningsEnabled: true
  };
}

function normalizeData(data) {
  const defaults = getDefaultSettings();
  const safe = data && typeof data === "object" ? data : {};
  const paymentMethods = normalizePaymentMethods(safe.paymentMethods);

  const appointments = Array.isArray(safe.appointments) ? safe.appointments.map(appointment => {
    const paymentMethodName = appointment?.paymentMethodName
      || appointment?.paymentMethodLabel
      || appointment?.paymentMethod
      || null;

    return {
      ...appointment,
      paymentMethodName: paymentMethodName ? String(paymentMethodName).trim() : null
    };
  }) : [];

  return {
    customers: Array.isArray(safe.customers) ? safe.customers : [],
    services: Array.isArray(safe.services) ? safe.services : [],
    appointments,
    paymentMethods,
    settings: {
      ...defaults,
      ...(safe.settings || {})
    }
  };
}

function seedData() {
  if (localStorage.getItem(STORAGE_KEY)) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeData({})));
}

function getData() {
  return normalizeData(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"));
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeData(data)));
}


function normalizePaymentMethods(items) {
  const source = Array.isArray(items) && items.length ? items : defaultPaymentMethods;
  return source
    .map((item, index) => {
      if (typeof item === "string") {
        return { id: index + 1, name: item, sortOrder: index + 1 };
      }
      const id = Number(item?.id);
      const sortOrder = Number(item?.sortOrder ?? item?.sort_order ?? index + 1);
      const name = String(item?.name || item?.label || "").trim();
      if (!name) return null;
      return {
        id: Number.isFinite(id) ? id : index + 1,
        name,
        sortOrder: Number.isFinite(sortOrder) ? sortOrder : index + 1
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, "nl-BE"));
}

function getPaymentMethods(data = getData()) {
  return normalizePaymentMethods(data?.paymentMethods);
}

function paymentMethodNameById(data, id) {
  if (id == null || id === "") return null;
  const method = getPaymentMethods(data).find(item => String(item.id) === String(id));
  return method?.name || null;
}

function paymentMethodNameForAppointment(appointment, data = getData()) {
  if (!appointment) return "";
  return appointment.paymentMethodName || "";
}

function buildPaymentMethodOptions(methods, selectedValue = "") {
  return methods.map(method => {
    const selected = String(method.name) === String(selectedValue) ? ' selected' : '';
    return `<option value="${method.name}"${selected}>${method.name}</option>`;
  }).join("");
}

function getRevenuePaymentFilterOptions(data = getData()) {
  const names = new Set();
  getPaymentMethods(data).forEach(method => {
    if (method.name) names.add(method.name);
  });
  (data.appointments || []).forEach(appointment => {
    const name = paymentMethodNameForAppointment(appointment, data);
    if (name) names.add(name);
  });
  return Array.from(names).sort((a, b) => a.localeCompare(b, "nl-BE"));
}

function euro(value) {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR"
  }).format(Number(value || 0));
}

function formatLongDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getDate()} ${longMonthNames[d.getMonth()]} ${d.getFullYear()}`;
}

function formatShortDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getDate()} ${longMonthNames[d.getMonth()]}`;
}

function nextId(items) {
  return items.length ? Math.max(...items.map(i => Number(i.id))) + 1 : 1;
}

function customerById(data, id) {
  return data.customers.find(c => String(c.id) === String(id));
}

function serviceById(data, id) {
  return data.services.find(s => String(s.id) === String(id));
}

function fullName(customer) {
  return [customer.firstName || "", customer.lastName || ""].join(" ").trim();
}

function weekBounds(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDay() || 7;
  const start = new Date(d);
  start.setDate(d.getDate() - day + 1);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return {
    start: formatDateInput(start),
    end: formatDateInput(end)
  };
}
function minutesFromTimeString(timeStr) {
  const [hours = "0", minutes = "0"] = String(timeStr || "00:00").split(":");
  return (Number(hours) * 60) + Number(minutes);
}

function timeStringFromMinutes(totalMinutes) {
  const safeMinutes = Math.max(0, Number(totalMinutes) || 0);
  const hours = Math.floor(safeMinutes / 60) % 24;
  const minutes = safeMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function getSettings() {
  return getData().settings || getDefaultSettings();
}

function appointmentTimeRange(appointment, breakMinutes = 0) {
  const startMinutes = minutesFromTimeString(appointment.time || appointment.appointment_time || "00:00");
  const duration = Number(appointment.duration || 0);
  const buffer = Math.max(0, Number(breakMinutes) || 0);
  return {
    startMinutes,
    endMinutes: startMinutes + duration + buffer
  };
}

function findAppointmentOverlap(payload, appointments, breakMinutes = 0, excludeId = null) {
  const newRange = appointmentTimeRange({
    time: payload.time,
    duration: payload.duration
  }, breakMinutes);

  return appointments
    .filter(app => app.date === payload.date)
    .filter(app => String(app.id) !== String(excludeId || ""))
    .find(app => {
      const existingRange = appointmentTimeRange(app, breakMinutes);
      return newRange.startMinutes < existingRange.endMinutes && newRange.endMinutes > existingRange.startMinutes;
    }) || null;
}

function findNextAvailableStartTime(payload, appointments, breakMinutes = 0, excludeId = null) {
  const durationWithBreak = Math.max(0, Number(payload.duration || 0)) + Math.max(0, Number(breakMinutes) || 0);
  const dayAppointments = appointments
    .filter(app => app.date === payload.date)
    .filter(app => String(app.id) !== String(excludeId || ""))
    .map(app => ({
      ...app,
      range: appointmentTimeRange(app, breakMinutes)
    }))
    .sort((a, b) => a.range.startMinutes - b.range.startMinutes);

  let candidateStart = minutesFromTimeString(payload.time || "00:00");

  for (const appointment of dayAppointments) {
    if (candidateStart + durationWithBreak <= appointment.range.startMinutes) {
      return candidateStart;
    }

    const overlaps = candidateStart < appointment.range.endMinutes && candidateStart + durationWithBreak > appointment.range.startMinutes;
    if (overlaps) {
      candidateStart = appointment.range.endMinutes;
    }
  }

  return candidateStart;
}

function buildOverlapMessage(payload, overlapApp, appointments, breakMinutes = 0, excludeId = null) {
  const data = getData();
  const customer = customerById(data, overlapApp.customerId);
  const service = serviceById(data, overlapApp.serviceId);
  const range = appointmentTimeRange(overlapApp, breakMinutes);
  const nextPossibleStart = findNextAvailableStartTime(payload, appointments, breakMinutes, excludeId);

  return [
    "Deze afspraak overlapt met een bestaande afspraak.",
    "",
    `${overlapApp.time} - ${timeStringFromMinutes(range.endMinutes)} · ${customer ? fullName(customer) : "Onbekende klant"}${service ? ` (${service.name})` : ""}`,
    "",
    `Eerstvolgend mogelijk tijdstip voor deze behandeling: ${timeStringFromMinutes(nextPossibleStart)}`,
    "",
    "Wil je deze afspraak toch opslaan?"
  ].join("\n");
}


function getAppointmentEndTime(appointment, breakMinutes = 0) {
  const range = appointmentTimeRange(appointment, breakMinutes);
  return timeStringFromMinutes(range.endMinutes);
}

function isAppointmentInPast(payload) {
  const appointmentDateTime = new Date(`${payload.date}T${payload.time || "00:00"}:00`);
  return appointmentDateTime.getTime() < Date.now();
}

function buildPastAppointmentMessage(payload) {
  return [
    "Deze afspraak valt in het verleden.",
    "",
    `${formatLongDate(payload.date)} om ${payload.time}`,
    "",
    "Wil je deze afspraak toch opslaan?"
  ].join("\n");
}

function jumpToToday() {
  state.selectedDate = todayStr;
  state.currentYear = today.getFullYear();
  state.currentMonth = today.getMonth();
  renderCalendar();
  renderAgendaList();
}


function setDialogMessage(container, message) {
  if (!container) return;
  container.textContent = message || "";
}

function openStyledDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "open");
  }
}

function closeStyledDialog(dialog) {
  if (!dialog) return;
  if (typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
  }
}

function showAppDialog({
  title = "Melding",
  message = "",
  confirmText = "OK",
  cancelText = "Annuleren",
  showCancel = false,
  variant = "info"
} = {}) {
  return new Promise(resolve => {
    const dialog = document.getElementById("appMessageDialog");
    const titleEl = document.getElementById("appMessageDialogTitle");
    const messageEl = document.getElementById("appMessageDialogText");
    const confirmBtn = document.getElementById("appMessageConfirmBtn");
    const cancelBtn = document.getElementById("appMessageCancelBtn");
    const card = dialog?.querySelector(".app-message-card");

    if (!dialog || !titleEl || !messageEl || !confirmBtn || !cancelBtn || !card) {
      if (showCancel) {
        resolve(window.confirm(message));
        return;
      }
      window.alert(message);
      resolve(true);
      return;
    }

    titleEl.textContent = title;
    setDialogMessage(messageEl, message);
    confirmBtn.textContent = confirmText;
    cancelBtn.textContent = cancelText;
    cancelBtn.classList.toggle("hidden", !showCancel);
    card.dataset.variant = variant;

    let settled = false;

    const cleanup = (result) => {
      if (settled) return;
      settled = true;
      dialog.removeEventListener("cancel", onCancel);
      dialog.removeEventListener("click", onBackdropClick);
      confirmBtn.removeEventListener("click", onConfirm);
      cancelBtn.removeEventListener("click", onCancelClick);
      closeStyledDialog(dialog);
      resolve(result);
    };

    const onConfirm = () => cleanup(true);
    const onCancel = (event) => {
      event.preventDefault();
      cleanup(false);
    };
    const onCancelClick = () => cleanup(false);
    const onBackdropClick = (event) => {
      const rect = dialog.getBoundingClientRect();
      const clickedInside = (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      );
      if (!clickedInside && showCancel) cleanup(false);
    };

    dialog.addEventListener("cancel", onCancel);
    dialog.addEventListener("click", onBackdropClick);
    confirmBtn.addEventListener("click", onConfirm);
    cancelBtn.addEventListener("click", onCancelClick);
    openStyledDialog(dialog);
    confirmBtn.focus();
  });
}

async function appAlert(message, options = {}) {
  await showAppDialog({
    title: options.title || "Melding",
    message,
    confirmText: options.confirmText || "OK",
    showCancel: false,
    variant: options.variant || "info"
  });
}

async function appConfirm(message, options = {}) {
  return showAppDialog({
    title: options.title || "Bevestiging",
    message,
    confirmText: options.confirmText || "Bevestigen",
    cancelText: options.cancelText || "Annuleren",
    showCancel: true,
    variant: options.variant || "warning"
  });
}


/* =========================
   AUTH / SUPABASE HELPERS
========================= */

async function getCurrentUser() {
    const { data } = await supabaseClient.auth.getUser();
    return data?.user ?? null;
}


async function getCurrentProfile() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabaseClient
        .from("profiles")
        .select("first_name, last_name, avatar_url")
        .eq("id", user.id)
        .maybeSingle();

    return profile ?? null;
}


function extractFirstNameFromUser(user, profile = null) {
  if (profile?.first_name?.trim()) return profile.first_name.trim();

  if (user?.user_metadata?.first_name?.trim()) {
    return user.user_metadata.first_name.trim();
  }

  if (user?.user_metadata?.full_name?.trim()) {
    return user.user_metadata.full_name.trim().split(/\s+/)[0];
  }

  const email = user?.email || "";
  if (email.includes("@")) return email.split("@")[0];

  return "log in";
}

function buildHeaderAccountIcon(profile = null) {
  if (profile?.avatar_url) {
    return `<img src="${profile.avatar_url}" alt="Profielfoto" />`;
  }
  return `
  <svg
	width="28"
	height="28"
	viewBox="0 0 7.4083331 7.4083333"
	version="1.1"
	id="svg-login"
	<g>
		<path style="fill:#df9db3;fill-opacity:1;stroke-width:0" 
		d="M 0.02065483,7.2874174 C 0.03201486,7.2209141 0.0639516,7.0141483 0.0916248,6.8279378 0.21895894,5.9711217 0.37280855,5.6926829 0.89086309,5.3814668 1.05004,5.2858419 1.6348599,5.0375849 2.1757299,4.8360375 L 2.3600042,4.7673699 2.1596079,5.0209379 C 1.986093,5.2404912 1.6851358,5.7017814 1.6851358,5.7481817 c 0,0.00863 0.1250337,0.015698 0.2778528,0.015698 H 2.2408415 L 2.8530307,6.2532212 C 3.4230649,6.7088655 3.4699877,6.7395931 3.5344423,6.6994453 3.572515,6.6757307 3.8673267,6.455528 4.1895795,6.2101045 L 4.7754942,5.7638794 h 0.2766182 c 0.1521396,0 0.2766166,-0.00707 0.2766166,-0.015698 0,-0.046142 -0.3004675,-0.5070727 -0.4721889,-0.724357 L 4.658428,4.773145 5.0661282,4.925074 c 1.4784506,0.5509424 1.6869677,0.7647133 1.8561126,1.9028638 0.027673,0.1862105 0.05961,0.3929763 0.07097,0.4594796 L 7.013865,7.4083333 H 3.506933 0 Z M 2.9062392,5.7770326 C 2.5804514,5.5192332 2.3091449,5.2949832 2.3033355,5.2786978 2.2975266,5.2624127 2.3672545,5.1257806 2.4582872,4.9750705 2.6052344,4.731793 2.6226959,4.6838039 2.6139482,4.5472776 L 2.6040958,4.3935012 2.313898,4.3703343 C 1.9190568,4.3388129 1.7026179,4.2988831 1.4862662,4.2176449 1.2820603,4.1409668 0.99423866,3.9021911 1.0690015,3.8714841 1.1742715,3.8282454 1.3668014,3.6176736 1.4424658,3.4630209 1.5789141,3.1841313 1.6206478,2.8667813 1.6206478,2.1081004 c 0,-0.5052406 0.012687,-0.7323499 0.04862,-0.8703043 0.1442381,-0.5537686 0.4971434,-0.94225993 1.0324557,-1.13656738 0.4257712,-0.15454662 0.8256262,-0.13233376 1.2243837,0.0680206 0.1479511,0.074337 0.2709037,0.11335661 0.3568949,0.11326152 0.1686944,-1.2176e-4 0.4425545,0.0814004 0.5938668,0.17691926 0.2466422,0.15569834 0.4171024,0.44569742 0.5023768,0.8546797 0.03596,0.1724636 0.046482,0.4192716 0.041689,0.97791 -0.00533,0.6212567 0.00301,0.7825573 0.049466,0.9568124 0.067097,0.2516667 0.2364139,0.5209458 0.390194,0.6205583 0.061721,0.03998 0.1124,0.083788 0.1126194,0.097349 C 5.9738228,4.004197 5.7850672,4.1119303 5.5866834,4.1873546 5.3821139,4.2651294 5.0219102,4.328291 4.5951743,4.3612147 l -0.2982582,0.023011 v 0.1528807 c 0,0.1381665 0.020172,0.1796259 0.2095871,0.430743 C 4.6217766,5.1206739 4.7155066,5.2571026 4.7147935,5.271026 4.7137087,5.2917587 3.749698,6.0689008 3.5545424,6.2063455 3.5060758,6.2404797 3.4192546,6.1829855 2.9062397,5.7770334 Z"
		id="path-login" />
	</g>
  </svg>
  `;
}

function buildAccountAvatar(profile = null) {
  if (profile?.avatar_url) {
    return `<img src="${profile.avatar_url}" alt="Profielfoto" />`;
  }
  return `
  <svg
	width="28"
	height="28"
	viewBox="0 0 7.4083331 7.4083333"
	version="1.1"
	id="svg-login"
	<g>
		<path style="fill:#df9db3;fill-opacity:1;stroke-width:0" 
		d="M 0.02065483,7.2874174 C 0.03201486,7.2209141 0.0639516,7.0141483 0.0916248,6.8279378 0.21895894,5.9711217 0.37280855,5.6926829 0.89086309,5.3814668 1.05004,5.2858419 1.6348599,5.0375849 2.1757299,4.8360375 L 2.3600042,4.7673699 2.1596079,5.0209379 C 1.986093,5.2404912 1.6851358,5.7017814 1.6851358,5.7481817 c 0,0.00863 0.1250337,0.015698 0.2778528,0.015698 H 2.2408415 L 2.8530307,6.2532212 C 3.4230649,6.7088655 3.4699877,6.7395931 3.5344423,6.6994453 3.572515,6.6757307 3.8673267,6.455528 4.1895795,6.2101045 L 4.7754942,5.7638794 h 0.2766182 c 0.1521396,0 0.2766166,-0.00707 0.2766166,-0.015698 0,-0.046142 -0.3004675,-0.5070727 -0.4721889,-0.724357 L 4.658428,4.773145 5.0661282,4.925074 c 1.4784506,0.5509424 1.6869677,0.7647133 1.8561126,1.9028638 0.027673,0.1862105 0.05961,0.3929763 0.07097,0.4594796 L 7.013865,7.4083333 H 3.506933 0 Z M 2.9062392,5.7770326 C 2.5804514,5.5192332 2.3091449,5.2949832 2.3033355,5.2786978 2.2975266,5.2624127 2.3672545,5.1257806 2.4582872,4.9750705 2.6052344,4.731793 2.6226959,4.6838039 2.6139482,4.5472776 L 2.6040958,4.3935012 2.313898,4.3703343 C 1.9190568,4.3388129 1.7026179,4.2988831 1.4862662,4.2176449 1.2820603,4.1409668 0.99423866,3.9021911 1.0690015,3.8714841 1.1742715,3.8282454 1.3668014,3.6176736 1.4424658,3.4630209 1.5789141,3.1841313 1.6206478,2.8667813 1.6206478,2.1081004 c 0,-0.5052406 0.012687,-0.7323499 0.04862,-0.8703043 0.1442381,-0.5537686 0.4971434,-0.94225993 1.0324557,-1.13656738 0.4257712,-0.15454662 0.8256262,-0.13233376 1.2243837,0.0680206 0.1479511,0.074337 0.2709037,0.11335661 0.3568949,0.11326152 0.1686944,-1.2176e-4 0.4425545,0.0814004 0.5938668,0.17691926 0.2466422,0.15569834 0.4171024,0.44569742 0.5023768,0.8546797 0.03596,0.1724636 0.046482,0.4192716 0.041689,0.97791 -0.00533,0.6212567 0.00301,0.7825573 0.049466,0.9568124 0.067097,0.2516667 0.2364139,0.5209458 0.390194,0.6205583 0.061721,0.03998 0.1124,0.083788 0.1126194,0.097349 C 5.9738228,4.004197 5.7850672,4.1119303 5.5866834,4.1873546 5.3821139,4.2651294 5.0219102,4.328291 4.5951743,4.3612147 l -0.2982582,0.023011 v 0.1528807 c 0,0.1381665 0.020172,0.1796259 0.2095871,0.430743 C 4.6217766,5.1206739 4.7155066,5.2571026 4.7147935,5.271026 4.7137087,5.2917587 3.749698,6.0689008 3.5545424,6.2063455 3.5060758,6.2404797 3.4192546,6.1829855 2.9062397,5.7770334 Z"
		id="path-login" />
	</g>
  </svg>
  `;
}

async function uploadAvatar(userId, file) {
  if (!file) return null;

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const filePath = `${userId}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabaseClient.storage
    .from("avatars")
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data } = supabaseClient.storage
    .from("avatars")
    .getPublicUrl(filePath);

  return data?.publicUrl || null;
}

async function upsertProfile(userId, values) {
  const payload = {
    id: userId,
    first_name: values.first_name || "",
    last_name: values.last_name || "",
    avatar_url: values.avatar_url || null
  };

  const { error } = await supabaseClient
    .from("profiles")
    .upsert(payload, { onConflict: "id" });

  if (error) throw error;
}

async function syncAuthUI() {
	const { data: { user } } = await supabaseClient.auth.getUser();
	const profile = await getCurrentProfile();

  const headerUserName = document.getElementById("headerUserName");
  const headerAccountIcon = document.querySelector("#headerAccountBtn .header-account-icon");

  const guestView = document.getElementById("accountGuestView");
  const loggedInView = document.getElementById("accountLoggedInView");

  const accountProfileName = document.getElementById("accountProfileName");
  const accountProfileEmail = document.getElementById("accountProfileEmail");
  const accountProfileFirstName = document.getElementById("accountProfileFirstName");
  const accountProfileLastName = document.getElementById("accountProfileLastName");
  const accountAvatar = document.getElementById("accountAvatar");

  if (headerUserName) {
    headerUserName.textContent = user ? extractFirstNameFromUser(user, profile) : "log in";
  }

  if (headerAccountIcon) {
    headerAccountIcon.innerHTML = buildHeaderAccountIcon(profile);
  }

  if (!user) {
    if (guestView) guestView.classList.remove("hidden");
    if (loggedInView) loggedInView.classList.add("hidden");
    return;
  }

  const firstName =
    profile?.first_name?.trim() ||
    user.user_metadata?.first_name?.trim() ||
    extractFirstNameFromUser(user, profile);

  const lastName =
    profile?.last_name?.trim() ||
    user.user_metadata?.last_name?.trim() ||
    "-";

  const profileName = [firstName, lastName].filter(Boolean).join(" ").trim() || user.email || "-";

  if (accountProfileName) accountProfileName.textContent = profileName;
  if (accountProfileEmail) accountProfileEmail.textContent = user.email || "-";
  if (accountProfileFirstName) accountProfileFirstName.textContent = firstName || "-";
  if (accountProfileLastName) accountProfileLastName.textContent = lastName || "-";
  if (accountAvatar) accountAvatar.innerHTML = buildAccountAvatar(profile);

  if (guestView) guestView.classList.add("hidden");
  if (loggedInView) loggedInView.classList.remove("hidden");
}


let authRefreshScheduled = false;

async function ensureActiveAuthSession({ email = "", password = "" } = {}) {
  const { data: sessionData, error: sessionError } = await supabaseClient.auth.getSession();
  if (sessionError) {
    console.error("Fout bij ophalen sessie:", sessionError.message);
  }

  if (sessionData?.session?.access_token) {
    return sessionData.session;
  }

  const safeEmail = String(email || "").trim();
  const safePassword = String(password || "");

  if (safeEmail && safePassword) {
    const { data: signInData, error: signInError } = await supabaseClient.auth.signInWithPassword({
      email: safeEmail,
      password: safePassword
    });

    if (signInError) {
      throw new Error("Je huidige wachtwoord kon niet geverifieerd worden. Meld je opnieuw aan en probeer daarna opnieuw.");
    }

    if (signInData?.session?.access_token) {
      return signInData.session;
    }
  }

  const { data: refreshData, error: refreshError } = await supabaseClient.auth.refreshSession();
  if (refreshError) {
    console.error("Fout bij verversen sessie:", refreshError.message);
  }

  if (refreshData?.session?.access_token) {
    return refreshData.session;
  }

  throw new Error("Auth session missing!");
}

async function verifyCurrentPassword(userEmail, password) {
  const safeEmail = String(userEmail || "").trim();
  const safePassword = String(password || "");
  if (!safeEmail || !safePassword) {
    throw new Error("Vul je huidige wachtwoord in.");
  }

  const tempClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storageKey: `nailbooker-temp-auth-${Date.now()}`
    }
  });

  const { error } = await tempClient.auth.signInWithPassword({
    email: safeEmail,
    password: safePassword
  });

  try {
    await tempClient.auth.signOut();
  } catch (signOutError) {
    console.warn("Tijdelijke reauth signOut mislukt:", signOutError?.message || signOutError);
  }

  if (error) {
    throw new Error("Het huidige wachtwoord is onjuist.");
  }
}

async function refreshAuthState() {
  try {
    await ensureActiveAuthSession();
  } catch (error) {
    console.warn("Geen actieve sessie tijdens refreshAuthState:", error?.message || error);
  }

  await syncAuthUI();
}

function scheduleAuthUiRefresh() {
  if (authRefreshScheduled) return;
  authRefreshScheduled = true;

  window.setTimeout(async () => {
    authRefreshScheduled = false;
    try {
      await syncAuthUI();
      const user = await getCurrentUser();
      if (user) {
        await loadAllDataFromSupabase();
      }
      rerenderAll();
    } catch (error) {
      console.error("Fout bij auth UI refresh:", error?.message || error);
    }
  }, 0);
}

async function openEditProfileDialog() {
  const { data: userData } = await supabaseClient.auth.getUser();
  const user = userData?.user;
  if (!user) {
    await appAlert("Log eerst in om je profiel te wijzigen.", { title: "Profiel", variant: "warning" });
    return;
  }

  const profile = await getCurrentProfile();
  document.getElementById("editFirstName").value = profile?.first_name || user.user_metadata?.first_name || "";
  document.getElementById("editLastName").value = profile?.last_name || user.user_metadata?.last_name || "";
  document.getElementById("editAvatar").value = "";
  document.getElementById("editProfileDialog").showModal();
}

async function saveProfileFromForm(event) {
  event.preventDefault();

  const firstName = document.getElementById("editFirstName")?.value.trim();
  const lastName = document.getElementById("editLastName")?.value.trim();
  const avatarFile = document.getElementById("editAvatar")?.files?.[0] || null;

  if (!firstName || !lastName) {
    await appAlert("Vul voornaam en naam in.", { title: "Profiel", variant: "warning" });
    return;
  }

  const { data: userData } = await supabaseClient.auth.getUser();
  const user = userData?.user;
  if (!user) {
    await appAlert("Je bent niet ingelogd.", { title: "Profiel", variant: "warning" });
    return;
  }

  try {
    await ensureActiveAuthSession();

    let avatarUrl = (await getCurrentProfile())?.avatar_url || null;
    if (avatarFile) {
      avatarUrl = await uploadAvatar(user.id, avatarFile);
    }

    const { error: updateUserError } = await supabaseClient.auth.updateUser({
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`.trim()
      }
    });

    if (updateUserError) {
      throw new Error(updateUserError.message || "Profiel wijzigen mislukt.");
    }

    await upsertProfile(user.id, {
      first_name: firstName,
      last_name: lastName,
      avatar_url: avatarUrl
    });

    closeDialog("editProfileDialog");
    await refreshAuthState();
    await loadAllDataFromSupabase();
    rerenderAll();
    await appAlert("Je profiel werd aangepast.", { title: "Profiel opgeslagen", variant: "success" });
  } catch (error) {
    console.error("saveProfileFromForm error:", error);
    await appAlert(`Opslaan mislukt. ${error.message || error}`, { title: "Opslaan mislukt", variant: "danger" });
  }
}


function setupPasswordToggleButtons() {
  document.querySelectorAll('[data-password-toggle]').forEach(button => {
    if (button.dataset.passwordToggleReady === 'true') return;
    button.dataset.passwordToggleReady = 'true';

    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      const targetId = button.getAttribute('data-password-toggle');
      const input = targetId ? document.getElementById(targetId) : null;
      if (!input) return;

      const isVisible = input.type === 'text';
      const selectionStart = typeof input.selectionStart === 'number' ? input.selectionStart : null;
      const selectionEnd = typeof input.selectionEnd === 'number' ? input.selectionEnd : null;

      input.setAttribute('type', isVisible ? 'password' : 'text');
      button.setAttribute('aria-pressed', isVisible ? 'false' : 'true');
      button.setAttribute('aria-label', isVisible ? 'Toon wachtwoord' : 'Verberg wachtwoord');

      window.requestAnimationFrame(() => {
        try {
          input.focus({ preventScroll: true });
        } catch (error) {
          input.focus();
        }
        if (selectionStart !== null && selectionEnd !== null) {
          try {
            input.setSelectionRange(selectionStart, selectionEnd);
          } catch (error) {}
        }
      });
    });
  });
}

function openPasswordDialog() {
  const form = document.getElementById("passwordForm");
  if (form) form.reset();
  document.getElementById("passwordDialog").showModal();
  setupPasswordToggleButtons();
}

async function savePasswordFromForm(event) {
  event.preventDefault();

  const currentPassword = document.getElementById("currentPassword")?.value || "";
  const newPassword = document.getElementById("newPassword")?.value || "";
  const confirmPassword = document.getElementById("confirmPassword")?.value || "";
  const submitBtn = document.querySelector('#passwordForm button[type="submit"]');

  if (!currentPassword) {
    await appAlert("Vul je huidige wachtwoord in.", { title: "Wachtwoord wijzigen", variant: "warning" });
    return;
  }

  if (!newPassword || newPassword.length < 6) {
    await appAlert("Je nieuwe wachtwoord moet minstens 6 tekens bevatten.", { title: "Wachtwoord wijzigen", variant: "warning" });
    return;
  }

  if (newPassword !== confirmPassword) {
    await appAlert("De nieuwe wachtwoorden komen niet overeen.", { title: "Wachtwoord wijzigen", variant: "warning" });
    return;
  }

  const { data: userData } = await supabaseClient.auth.getUser();
  const user = userData?.user;
  if (!user?.email) {
    await appAlert("Je bent niet ingelogd.", { title: "Wachtwoord wijzigen", variant: "warning" });
    return;
  }

  if (submitBtn) submitBtn.disabled = true;

  const tempClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storageKey: `nailbooker-password-change-${Date.now()}`
    }
  });

  try {
    const { error: signInError } = await tempClient.auth.signInWithPassword({
      email: user.email,
      password: currentPassword
    });

    if (signInError) {
      throw new Error("Het huidige wachtwoord is onjuist.");
    }

    const { error: updatePasswordError } = await tempClient.auth.updateUser({
      password: newPassword
    });

    if (updatePasswordError) {
      throw new Error(`Wachtwoord wijzigen mislukt: ${updatePasswordError.message || updatePasswordError}`);
    }

    try {
      await supabaseClient.auth.signOut();
    } catch (signOutError) {
      console.warn("Hoofdclient signOut na wachtwoordwijziging mislukt:", signOutError?.message || signOutError);
    }

    const { error: signInWithNewPasswordError } = await supabaseClient.auth.signInWithPassword({
      email: user.email,
      password: newPassword
    });

    if (signInWithNewPasswordError) {
      throw new Error("Wachtwoord aangepast, maar opnieuw aanmelden mislukte. Log één keer opnieuw in met je nieuwe wachtwoord.");
    }

    closeDialog("passwordDialog");
    await refreshAuthState();
    await loadAllDataFromSupabase();
    rerenderAll();
    await appAlert("Je wachtwoord werd gewijzigd.", { title: "Wachtwoord gewijzigd", variant: "success" });
  } catch (error) {
    console.error("savePasswordFromForm error:", error);
    await appAlert(`Opslaan mislukt. ${error.message || error}`, { title: "Opslaan mislukt", variant: "danger" });
  } finally {
    try {
      await tempClient.auth.signOut();
    } catch (tempSignOutError) {
      console.warn("Tijdelijke client signOut mislukt:", tempSignOutError?.message || tempSignOutError);
    }

    if (submitBtn) submitBtn.disabled = false;
  }
}

async function registerAccount(event) {
  if (event) event.preventDefault();

  const firstName = document.getElementById("registerFirstName").value.trim();
  const lastName = document.getElementById("registerLastName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;
  const passwordConfirm = document.getElementById("registerPasswordConfirm").value;
  const photoFile = document.getElementById("registerPhoto").files?.[0] || null;

  if (!firstName || !lastName || !email || !password || !passwordConfirm) {
    await appAlert("Vul voornaam, naam, e-mail, wachtwoord en bevestiging in.");
    return;
  }

  if (password !== passwordConfirm) {
    await appAlert("De wachtwoorden komen niet overeen.");
    return;
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`.trim()
      }
    }
  });

  if (error) {
    await appAlert("Registratie mislukt: " + error.message, { title: "Registratie mislukt", variant: "danger" });
    return;
  }

  try {
    let avatarUrl = null;

    if (photoFile && data.user && data.session) {
      avatarUrl = await uploadAvatar(data.user.id, photoFile);
    }

    if (data.user && data.session) {
      await upsertProfile(data.user.id, {
        first_name: firstName,
        last_name: lastName,
        avatar_url: avatarUrl
      });
    }
  } catch (profileError) {
    console.error("Profiel opslaan mislukt:", profileError.message);
    await appAlert("Je account is aangemaakt, maar de profielfoto of profielgegevens konden niet volledig opgeslagen worden.", { title: "Registratie voltooid", variant: "warning" });
  }

  document.getElementById("registerForm").reset();
  closeDialog("registerDialog");

  await refreshAuthState();

  if (data.session) {
    await loadAllDataFromSupabase();
    rerenderAll();
    await syncAuthUI();
    switchScreen("agendaScreen", "Agenda");
    await appAlert("Registratie gelukt. Je bent nu ingelogd.", { title: "Registratie gelukt", variant: "success" });
  } else {
    await syncAuthUI();
    switchScreen("accountScreen", "Account");
    await appAlert("Registratie gelukt. Controleer eventueel je mailbox en log daarna in.", { title: "Registratie gelukt", variant: "success" });
  }
}

async function loginAccount() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    await appAlert("Inloggen mislukt: " + error.message, { title: "Inloggen mislukt", variant: "danger" });
    return;
  }

  document.getElementById("loginPassword").value = "";

  await refreshAuthState();
  await loadAllDataFromSupabase();
  rerenderAll();
  await syncAuthUI();
  switchScreen("agendaScreen", "Agenda");
}

async function logoutAccount() {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    await appAlert("Uitloggen mislukt: " + error.message, { title: "Uitloggen mislukt", variant: "danger" });
    return;
  }

  authUserCache = null;
  authProfileCache = null;
  authInitialized = true;

  localStorage.removeItem(STORAGE_KEY);
  seedData();
  rerenderAll();
  await syncAuthUI();
  switchScreen("accountScreen", "Account");
}

/* =========================
   UI
========================= */

function updateTopbar(screenId, title) {
  document.getElementById("screenTitle").textContent = title;

  const backBtn = document.getElementById("backBtn");
  const fab = document.getElementById("floatingAddBtn");

  backBtn.classList.toggle("hidden-btn", screenId !== "clientDetailScreen");

  if (screenId === "agendaScreen") {
    fab.onclick = () => openNewAppointmentDialog();
    fab.style.display = "block";
  } else if (screenId === "clientsScreen") {
    fab.onclick = openNewClientDialog;
    fab.style.display = "block";
  } else if (screenId === "servicesScreen") {
    fab.onclick = openNewServiceDialog;
    fab.style.display = "block";
  } else if (screenId === "paymentMethodsScreen") {
    fab.onclick = openNewPaymentMethodDialog;
    fab.style.display = "block";
  } else {
    fab.style.display = "none";
  }
}

function switchScreen(screenId, title) {
  state.currentScreen = screenId;

  if (["agendaScreen", "clientsScreen", "servicesScreen", "paymentMethodsScreen", "statisticsScreen", "revenueScreen", "settingsScreen", "accountScreen"].includes(screenId)) {
    state.previousMainScreen = screenId;
  }

  document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));

  const target = document.getElementById(screenId);
  if (target) target.classList.add("active");

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.screen === screenId);
  });

  updateTopbar(screenId, title);

  if (screenId === "revenueScreen") {
    setRevenuePeriod("day", state.selectedDate || todayStr);
  }

  if (screenId === "statisticsScreen") {
    if (!Number.isFinite(Number(state.statsTopCustomersVisible)) || Number(state.statsTopCustomersVisible) < 10) {
      state.statsTopCustomersVisible = 10;
    }
    renderStatistics();
  }

  if (screenId === "accountScreen") {
    syncAuthUI();
  }

  if (screenId === "settingsScreen") {
    renderSettings();
  }

  if (screenId === "paymentMethodsScreen") {
    renderPaymentMethods();
  }

  const activeClient = state.selectedClientId ? customerById(getData(), state.selectedClientId) : null;
  updateClientActionBar(activeClient);
  updateRevenueActionBar();
}

function renderCalendar() {
  const data = getData();
  const grid = document.getElementById("calendarGrid");

  grid.innerHTML = "";
  document.getElementById("monthPickerBtn").textContent = `${monthNames[state.currentMonth]} ${state.currentYear}`;

  const first = new Date(state.currentYear, state.currentMonth, 1);
  const last = new Date(state.currentYear, state.currentMonth + 1, 0);

  let weekday = first.getDay();
  weekday = weekday === 0 ? 7 : weekday;

  for (let i = 1; i < weekday; i++) {
    const empty = document.createElement("div");
    empty.className = "empty-cell";
    grid.appendChild(empty);
  }

  for (let day = 1; day <= last.getDate(); day++) {
    const dateStr = `${state.currentYear}-${String(state.currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const appts = data.appointments.filter(a => a.date === dateStr);

    const cell = document.createElement("div");
    const isSelected = dateStr === state.selectedDate;
    const isToday = dateStr === todayStr;
    cell.className = `day-cell${isSelected ? " selected" : ""}${isToday ? " today" : ""}`;
    cell.innerHTML = `<button class="day-button" aria-label="${dateStr}"></button><span class="day-number">${day}</span>`;

    if (appts.length) {
      const dots = document.createElement("div");
      dots.className = "day-dots";

      const maxVisibleDots = window.matchMedia("(max-width: 420px)").matches ? 3 : 4;
      const visibleDots = Math.min(appts.length, maxVisibleDots);

      Array.from({ length: visibleDots }).forEach(() => {
        const i = document.createElement("i");
        dots.appendChild(i);
      });

      if (appts.length > visibleDots) {
        const more = document.createElement("span");
        more.className = "day-dots-more";
        more.textContent = "+";
        dots.appendChild(more);
      }

      cell.appendChild(dots);
    }

    cell.querySelector(".day-button").addEventListener("click", () => {
      state.selectedDate = dateStr;
      renderCalendar();
      renderAgendaList();
    });

    grid.appendChild(cell);
  }
}

function renderAgendaList() {
  const data = getData();
  const list = document.getElementById("agendaList");

  document.getElementById("agendaListTitle").textContent = `Afspraken op ${formatLongDate(state.selectedDate)}`;
  const jumpBtn = document.getElementById("jumpToTodayBtn");
  if (jumpBtn) {
    jumpBtn.classList.toggle("hidden", state.selectedDate === todayStr);
  }

  const appts = data.appointments
    .filter(a => a.date === state.selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  if (!appts.length) {
    list.innerHTML = `<div class="empty-state">Geen afspraken op deze dag.</div>`;
    return;
  }

  list.innerHTML = "";

  const card = document.createElement("div");
  card.className = "appointment-card";

  appts.forEach(app => {
    const customer = customerById(data, app.customerId);
    const service = serviceById(data, app.serviceId);

    const row = document.createElement("div");
    row.className = "appointment-row";
    const endTime = getAppointmentEndTime(app, getSettings().defaultBreakMinutes);

    const appointmentMetaParts = [];
    if (service?.name) {
      appointmentMetaParts.push(service.name);
    }
    if ((app.status || "").toLowerCase() === "no-show") {
      appointmentMetaParts.push("no show");
    } else if (app.paid && paymentMethodNameForAppointment(app, data)) {
      appointmentMetaParts.push(paymentMethodNameForAppointment(app, data));
    }

    row.innerHTML = `
      <div class="time-block">
        <div class="time">${app.time}</div>
        <div class="time-end">tot ${endTime}</div>
      </div>
      <div>
        <div class="main-name">${customer ? fullName(customer) : "Onbekend"}</div>
        <div class="meta">${appointmentMetaParts.join(" · ")}</div>
      </div>
      <button class="price-chip ${app.paid ? "paid" : ""}" data-id="${app.id}" type="button">${euro(app.price)}</button>
    `;

    row.addEventListener("click", (e) => {
      if (e.target.closest(".price-chip")) return;
      openEditAppointmentDialog(app.id);
    });

    card.appendChild(row);
  });

  list.appendChild(card);

  list.querySelectorAll(".price-chip").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openPaymentDialog(btn.dataset.id, btn);
    });
  });
}

function renderAlphabetFilter() {
  const wrap = document.getElementById("alphabetFilter");
  const data = getData();

  const letters = [...new Set(
    data.customers
      .map(c => (c.firstName || "").trim().charAt(0).toUpperCase())
      .filter(Boolean)
  )].sort();

  wrap.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.className = "alphabet-btn all-btn" + (!state.clientLetter ? " active" : "");
  allBtn.textContent = "Alle";
  allBtn.onclick = () => {
    state.clientLetter = "";
    renderAlphabetFilter();
    renderClients();
  };
  wrap.appendChild(allBtn);

  letters.forEach(letter => {
    const btn = document.createElement("button");
    btn.className = "alphabet-btn" + (state.clientLetter === letter ? " active" : "");
    btn.textContent = letter;

    btn.onclick = () => {
      state.clientLetter = letter;
      renderAlphabetFilter();
      renderClients();
    };

    wrap.appendChild(btn);
  });
}

function renderClients() {
  const data = getData();
  const q = document.getElementById("clientSearch").value.trim().toLowerCase();
  const list = document.getElementById("clientsList");

  let clients = data.customers.filter(c =>
    [fullName(c), c.phone, c.email].join(" ").toLowerCase().includes(q)
  );

  if (state.clientLetter) {
    clients = clients.filter(c => (c.firstName || "").toUpperCase().startsWith(state.clientLetter));
  }

  clients.sort((a, b) => (a.firstName || "").localeCompare(b.firstName || ""));

  if (!clients.length) {
    list.innerHTML = `<div class="empty-state">Geen klanten gevonden.</div>`;
    return;
  }

  list.innerHTML = "";

  clients.forEach(client => {
    const count = data.appointments.filter(a => String(a.customerId) === String(client.id)).length;
    const card = document.createElement("div");
    card.className = "client-card";

    card.innerHTML = `
      <button type="button" data-id="${client.id}">
        <div class="client-name">${fullName(client)}</div>
        <div class="meta">${client.phone || "Geen telefoon"} · ${count} afspraken</div>
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => openClientDetail(client.id));
    list.appendChild(card);
  });
}

function renderServices() {
  const data = getData();
  const list = document.getElementById("servicesList");

  if (!data.services.length) {
    list.innerHTML = `<div class="empty-state">Nog geen diensten.</div>`;
    return;
  }

  list.innerHTML = "";

  data.services.forEach(service => {
    const card = document.createElement("div");
    card.className = "service-card";

    card.innerHTML = `
      <button type="button" data-id="${service.id}">
        <div class="client-name">${service.name}</div>
        <div class="meta">${service.duration} min · ${euro(service.price)}</div>
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => openEditServiceDialog(service.id));
    list.appendChild(card);
  });
}


function paymentMethodLabel(value) {
  if (!value) return "";
  const data = getData();
  return paymentMethodNameById(data, value) || String(value);
}

function formatRevenueDayChip(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const days = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
  return `${days[d.getDay()]} ${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function shiftRevenueDate(baseDateStr, mode, step) {
  const d = new Date(baseDateStr + "T00:00:00");

  if (mode === "year") {
    d.setFullYear(d.getFullYear() + step);
    return formatDateInput(d);
  }

  if (mode === "month") {
    d.setMonth(d.getMonth() + step);
    return formatDateInput(d);
  }

  d.setDate(d.getDate() + step);
  return formatDateInput(d);
}

function setRevenuePeriod(type, dateStr) {
  const safeDate = dateStr || document.getElementById("revenueDate").value || todayStr;
  const periodType = document.getElementById("revenuePeriodType");
  const dateInput = document.getElementById("revenueDate");

  if (periodType) periodType.value = type;
  if (dateInput) dateInput.value = safeDate;

  renderRevenue();
}

function syncRevenuePeriodChips() {
  const type = document.getElementById("revenuePeriodType").value;
  const anchor = document.getElementById("revenueDate").value || todayStr;
  const anchorDate = new Date(anchor + "T00:00:00");

  const yearChip = document.getElementById("revenueYearChip");
  const monthChip = document.getElementById("revenueMonthChip");
  const dayChip = document.getElementById("revenueDayChip");

  const yearLabel = document.getElementById("revenueYearLabel");
  const monthLabel = document.getElementById("revenueMonthLabel");
  const dayLabel = document.getElementById("revenueDayLabel");

  if (yearLabel) {
    yearLabel.textContent = String(anchorDate.getFullYear());
  }

  if (monthLabel) {
    monthLabel.textContent = longMonthNames[anchorDate.getMonth()].charAt(0).toUpperCase() + longMonthNames[anchorDate.getMonth()].slice(1);
  }

  if (dayLabel) {
    dayLabel.textContent = formatRevenueDayChip(anchor);
  }

  if (yearChip) yearChip.classList.toggle("active", type === "year");
  if (monthChip) monthChip.classList.toggle("active", type === "month");
  if (dayChip) dayChip.classList.toggle("active", type === "day");
}

function revenueFilteredAppointments() {
  const data = getData();
  const type = document.getElementById("revenuePeriodType").value;
  const anchor = document.getElementById("revenueDate").value || todayStr;
  const paymentStatusFilter = document.getElementById("revenuePaymentStatusFilter").value;
  const paymentFilter = document.getElementById("revenuePaymentFilter").value;

  let filtered = data.appointments.filter(a => a.status !== "no-show");

  if (type === "day") {
    filtered = filtered.filter(a => a.date === anchor);
  } else if (type === "month") {
    const prefix = anchor.slice(0, 7);
    filtered = filtered.filter(a => a.date.startsWith(prefix));
  } else if (type === "year") {
    const prefix = anchor.slice(0, 4);
    filtered = filtered.filter(a => a.date.startsWith(prefix));
  }

  if (paymentStatusFilter === "paid") filtered = filtered.filter(a => a.paid);
  if (paymentStatusFilter === "unpaid") filtered = filtered.filter(a => !a.paid);
  if (paymentFilter) filtered = filtered.filter(a => paymentMethodNameForAppointment(a, data) === paymentFilter);

  return filtered;
}

function renderRevenueFilters() {
  const data = getData();
  const paymentSel = document.getElementById("revenuePaymentFilter");
  const existingPayment = paymentSel ? paymentSel.value : "";

  if (paymentSel) {
    paymentSel.innerHTML =
      `<option value="">Alle betaalwijzen</option>` +
      getRevenuePaymentFilterOptions(data).map(name => `<option value="${name}">${name}</option>`).join("");
    paymentSel.value = existingPayment;
  }

}


function clampRevenueDay(year, monthIndex, day) {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  return Math.min(day, daysInMonth);
}

function getRevenueDataYears() {
  const data = getData();
  const appointmentYears = data.appointments
    .map(a => Number(String(a.date || "").slice(0, 4)))
    .filter(Boolean);

  const currentYear = new Date((document.getElementById("revenueDate")?.value || todayStr) + "T00:00:00").getFullYear();
  const minYear = appointmentYears.length ? Math.min(...appointmentYears, currentYear) : currentYear - 3;
  const maxYear = appointmentYears.length ? Math.max(...appointmentYears, currentYear) : currentYear + 3;

  return Array.from({ length: (maxYear - minYear + 5) }, (_, i) => minYear - 2 + i);
}

function centerRevenueWheelColumn(column, value, behavior = "auto") {
  if (!column) return;
  const option = column.querySelector(`.revenue-wheel-option[data-value="${value}"]`);
  if (!option) return;
  const target = option.offsetTop - (column.clientHeight / 2) + (option.offsetHeight / 2);
  if (behavior === "smooth") {
    column.scrollTo({ top: target, behavior: "smooth" });
  } else {
    column.scrollTop = target;
  }
  updateRevenueWheelColumnSelection(column);
}

function updateRevenueWheelColumnSelection(column) {
  if (!column) return null;
  const options = Array.from(column.querySelectorAll(".revenue-wheel-option"));
  if (!options.length) return null;

  const columnCenter = column.scrollTop + (column.clientHeight / 2);
  let closest = options[0];
  let bestDistance = Infinity;

  options.forEach(option => {
    const optionCenter = option.offsetTop + (option.offsetHeight / 2);
    const distance = Math.abs(optionCenter - columnCenter);
    if (distance < bestDistance) {
      bestDistance = distance;
      closest = option;
    }
  });

  options.forEach(option => option.classList.toggle("active", option === closest));
  return closest?.dataset?.value ?? null;
}

function attachRevenueWheelColumnEvents(column, key) {
  if (!column) return;
  let timeoutId = null;
  const optionHeight = 48;

  const finish = (behavior = "smooth") => {
    const value = updateRevenueWheelColumnSelection(column);
    if (value != null) {
      revenuePickerState.selected[key] = value;
      centerRevenueWheelColumn(column, value, behavior);
    }
  };

  column.addEventListener("scroll", () => {
    updateRevenueWheelColumnSelection(column);
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => finish("smooth"), 110);
  });

  column.addEventListener("wheel", (event) => {
    if (window.matchMedia("(pointer:fine)").matches) {
      event.preventDefault();
      const direction = event.deltaY > 0 ? 1 : -1;
      const targetTop = column.scrollTop + (direction * optionHeight);
      column.scrollTo({ top: targetTop, behavior: "smooth" });
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => finish("smooth"), 130);
    }
  }, { passive: false });

  column.querySelectorAll(".revenue-wheel-option").forEach(option => {
    option.addEventListener("click", () => {
      revenuePickerState.selected[key] = option.dataset.value;
      centerRevenueWheelColumn(column, option.dataset.value, "smooth");
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => finish("smooth"), 130);
    });
  });

  finish("auto");
}

function buildRevenueWheelColumn(key, values, formatter = value => value) {
  return `
    <div class="revenue-wheel-column" data-key="${key}">
      ${values.map(value => `<div class="revenue-wheel-option" data-value="${value}">${formatter(value)}</div>`).join("")}
    </div>
  `;
}

function openRevenueWheelPicker(mode) {
  const dialog = document.getElementById("revenueWheelPickerDialog");
  const title = document.getElementById("revenueWheelPickerTitle");
  const columnsWrap = document.getElementById("revenueWheelColumns");
  const anchor = document.getElementById("revenueDate").value || todayStr;
  const anchorDate = new Date(anchor + "T00:00:00");
  const selectedYear = anchorDate.getFullYear();
  const selectedMonthIndex = anchorDate.getMonth();

  revenuePickerState.mode = mode;
  revenuePickerState.columns = [];
  revenuePickerState.selected = {};

  if (mode === "year") {
    title.textContent = "Kies jaar";
    columnsWrap.className = "revenue-wheel-columns";
    const years = getRevenueDataYears();
    columnsWrap.innerHTML = buildRevenueWheelColumn("year", years, value => value);
  } else {
    title.textContent = "Kies maand";
    columnsWrap.className = "revenue-wheel-columns";
    const months = Array.from({ length: 12 }, (_, i) => i);
    columnsWrap.innerHTML =
      buildRevenueWheelColumn("monthIndex", months, value => longMonthNames[value].charAt(0).toUpperCase() + longMonthNames[value].slice(1));
  }

  const columns = Array.from(columnsWrap.querySelectorAll(".revenue-wheel-column"));
  revenuePickerState.columns = columns;

  columns.forEach(column => attachRevenueWheelColumnEvents(column, column.dataset.key));

  if (mode === "year") {
    centerRevenueWheelColumn(columnsWrap.querySelector('[data-key="year"]'), selectedYear);
    revenuePickerState.selected.year = String(selectedYear);
  } else {
    centerRevenueWheelColumn(columnsWrap.querySelector('[data-key="monthIndex"]'), selectedMonthIndex);
    revenuePickerState.selected.monthIndex = String(selectedMonthIndex);
  }

  if (typeof dialog.showModal === "function") dialog.showModal();
}

function applyRevenueWheelPickerSelection() {
  const anchor = document.getElementById("revenueDate").value || todayStr;
  const anchorDate = new Date(anchor + "T00:00:00");
  const currentDay = anchorDate.getDate();

  if (revenuePickerState.mode === "year") {
    const year = Number(revenuePickerState.selected.year || anchorDate.getFullYear());
    const monthIndex = anchorDate.getMonth();
    const day = clampRevenueDay(year, monthIndex, currentDay);
    setRevenuePeriod("year", formatDateInput(new Date(year, monthIndex, day)));
    return;
  }

  const year = anchorDate.getFullYear();
  const monthIndex = Number(revenuePickerState.selected.monthIndex || anchorDate.getMonth());
  const day = clampRevenueDay(year, monthIndex, currentDay);
  setRevenuePeriod("month", formatDateInput(new Date(year, monthIndex, day)));
}

function openRevenueDayPicker() {
  const nativeInput = document.getElementById("revenueNativeDatePicker");
  const revenueDate = document.getElementById("revenueDate").value || todayStr;

  if (!nativeInput) {
    setRevenuePeriod("day", revenueDate);
    return;
  }

  nativeInput.value = revenueDate;

  if (typeof nativeInput.showPicker === "function") {
    nativeInput.showPicker();
  } else {
    nativeInput.click();
  }
}


function buildRevenueChartData(filtered, type, anchor) {
  if (type === "year") {
    return Array.from({ length: 12 }, (_, index) => {
      const month = String(index + 1).padStart(2, "0");
      const prefix = `${anchor.slice(0, 4)}-${month}`;
      const items = filtered.filter(a => a.date.startsWith(prefix));
      return {
        label: String(index + 1),
        paid: items.filter(a => a.paid).reduce((sum, a) => sum + Number(a.price || 0), 0),
        unpaid: items.filter(a => !a.paid).reduce((sum, a) => sum + Number(a.price || 0), 0)
      };
    });
  }

  if (type === "month") {
    const year = Number(anchor.slice(0, 4));
    const monthIndex = Number(anchor.slice(5, 7)) - 1;
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = String(index + 1).padStart(2, "0");
      const key = `${anchor.slice(0, 7)}-${day}`;
      const items = filtered.filter(a => a.date === key);
      return {
        label: String(index + 1),
        paid: items.filter(a => a.paid).reduce((sum, a) => sum + Number(a.price || 0), 0),
        unpaid: items.filter(a => !a.paid).reduce((sum, a) => sum + Number(a.price || 0), 0)
      };
    });
  }

  const items = filtered.slice().sort((a, b) => a.time.localeCompare(b.time));
  return items.map(a => ({
    label: a.time || "",
    paid: a.paid ? Number(a.price || 0) : 0,
    unpaid: !a.paid ? Number(a.price || 0) : 0
  }));
}

function renderRevenueChart(filtered, type, anchor) {
  const chartWrap = document.getElementById("revenueChart");
  const subtitle = document.getElementById("revenueChartSubtitle");

  if (!chartWrap) return;

  const chartData = buildRevenueChartData(filtered, type, anchor);
  const visibleData = chartData.filter(item => item.paid > 0 || item.unpaid > 0);
  const dataToRender = visibleData.length ? visibleData : chartData;
  const maxValue = Math.max(...dataToRender.map(item => item.paid + item.unpaid), 0);

  if (subtitle) {
    subtitle.textContent =
      type === "year" ? "Jaaromzet" :
      type === "month" ? "Maandomzet" :
      "Dagomzet";
  }

  if (!dataToRender.length || maxValue === 0) {
    chartWrap.innerHTML = `<div class="empty-state">Geen omzetgegevens voor deze selectie.</div>`;
    return;
  }

  chartWrap.innerHTML = `
    <div class="revenue-bars">
      ${dataToRender.map(item => {
        const total = item.paid + item.unpaid;
        const totalHeight = Math.max(8, (total / maxValue) * 220);
        const paidHeight = total > 0 ? (item.paid / total) * totalHeight : 0;
        const unpaidHeight = totalHeight - paidHeight;

        return `
          <div class="revenue-bar-col" title="${item.label} · ${euro(total)}">
            <div class="revenue-bar-stack" style="height:${totalHeight}px">
              ${unpaidHeight > 0 ? `<span class="revenue-bar-segment unpaid" style="height:${unpaidHeight}px"></span>` : ""}
              ${paidHeight > 0 ? `<span class="revenue-bar-segment paid" style="height:${paidHeight}px"></span>` : ""}
            </div>
            <span class="revenue-bar-label">${item.label}</span>
          </div>
        `;
      }).join("")}
    </div>
    <div class="revenue-chart-legend">
      <span><i class="paid"></i> Betaald</span>
      <span><i class="unpaid"></i> Onbetaald</span>
    </div>
  `;

  const bars = chartWrap.querySelector('.revenue-bars');
  if (bars) {
    bars.addEventListener('wheel', event => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (bars.scrollWidth <= bars.clientWidth) return;
      event.preventDefault();
      bars.scrollLeft += event.deltaY;
    }, { passive: false });
  }
}

function updateRevenueActionBar() {
  const bar = document.getElementById('revenueActionBar');
  const button = document.getElementById('revenueExportCsvBtn');
  if (!bar || !button) return;

  const shouldShow = state.currentScreen === 'revenueScreen';
  bar.classList.toggle('hidden', !shouldShow);
  button.disabled = !shouldShow;
}

function getRevenueExportTitle() {
  const type = document.getElementById("revenuePeriodType")?.value || 'day';
  const anchor = document.getElementById("revenueDate")?.value || todayStr;

  if (type === 'year') return `omzet_${anchor.slice(0, 4)}`;
  if (type === 'month') return `omzet_${anchor.slice(0, 7)}`;
  return `omzet_${anchor}`;
}

function csvEscape(value) {
  const safe = String(value ?? '').replace(/"/g, '""');
  return `"${safe}"`;
}

function downloadRevenueCsv() {
  const data = getData();
  const filtered = revenueFilteredAppointments()
    .slice()
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

  const paymentStatusFilter = document.getElementById('revenuePaymentStatusFilter')?.value || '';
  const paymentFilter = document.getElementById('revenuePaymentFilter')?.value || '';
  const periodType = document.getElementById('revenuePeriodType')?.value || 'day';
  const periodDate = document.getElementById('revenueDate')?.value || todayStr;

  const rows = [
    ['Periode type', periodType],
    ['Periode datum', periodDate],
    ['Filter betaalstatus', paymentStatusFilter || 'alle'],
    ['Filter betaalwijze', paymentFilter || 'alle'],
    [],
    ['Datum', 'Tijd', 'Klant', 'Dienst', 'Prijs', 'Betaald', 'Betaalwijze', 'Status']
  ];

  filtered.forEach(app => {
    const customer = customerById(data, app.customerId);
    const service = serviceById(data, app.serviceId);
    rows.push([
      app.date || '',
      app.time || '',
      customer ? fullName(customer) : 'Onbekend',
      service?.name || '',
      Number(app.price || 0).toFixed(2).replace('.', ','),
      app.paid ? 'Ja' : 'Nee',
      paymentMethodNameForAppointment(app, data) || '',
      app.status || ''
    ]);
  });

  const csv = rows
    .map(row => row.map(value => csvEscape(value)).join(';'))
    .join('\r\n');

  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${getRevenueExportTitle()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function renderRevenue() {
  renderRevenueFilters();
  syncRevenuePeriodChips();

  const data = getData();
  const methodList = document.getElementById("paymentMethodList");
  const type = document.getElementById("revenuePeriodType").value;
  const anchor = document.getElementById("revenueDate").value || todayStr;
  const filtered = revenueFilteredAppointments();

  let title = "Omzet";
  if (type === "day") title = `Omzet op ${formatLongDate(anchor)}`;
  if (type === "month") {
    const d = new Date(anchor + "T00:00:00");
    title = `Omzet ${longMonthNames[d.getMonth()]} ${d.getFullYear()}`;
  }
  if (type === "year") title = `Omzet ${anchor.slice(0, 4)}`;

  const titleEl = document.getElementById("revenueTitle");
  if (titleEl) titleEl.textContent = title;

  const paid = filtered.filter(a => a.paid).reduce((sum, a) => sum + Number(a.price || 0), 0);
  const total = filtered.reduce((sum, a) => sum + Number(a.price || 0), 0);
  const open = filtered.filter(a => !a.paid).reduce((sum, a) => sum + Number(a.price || 0), 0);

  document.getElementById("plannedRevenue").textContent = euro(total);
  document.getElementById("paidRevenue").textContent = euro(paid);
  document.getElementById("openRevenue").textContent = euro(open);

  const byMethod = {};
  filtered.filter(a => a.paid).forEach(a => {
    const key = paymentMethodNameForAppointment(a, data) || "Onbekend";
    byMethod[key] = (byMethod[key] || 0) + Number(a.price || 0);
  });

  if (methodList) {
    const methodNames = Object.keys(byMethod).length ? Object.keys(byMethod).sort((a, b) => a.localeCompare(b, "nl-BE")) : getRevenuePaymentFilterOptions(data);
    methodList.innerHTML = methodNames.length
      ? methodNames.map(method => `
          <div class="revenue-method-row">
            <span>${method}:</span>
            <strong>${euro(byMethod[method] || 0)}</strong>
          </div>
        `).join("")
      : `<div class="empty-state">Nog geen betaalgegevens.</div>`;
  }


  renderRevenueChart(filtered, type, anchor);
}

function getStatisticsSummary(data = getData()) {
  const customers = Array.isArray(data.customers) ? data.customers : [];
  const services = Array.isArray(data.services) ? data.services : [];
  const appointments = Array.isArray(data.appointments) ? data.appointments : [];

  const paidAppointments = appointments.filter(app => app.paid);
  const paidRevenue = paidAppointments.reduce((sum, app) => sum + Number(app.price || 0), 0);

  const serviceUsage = services.map(service => ({
    label: service.name,
    value: appointments.filter(app => String(app.serviceId) === String(service.id)).length
  })).filter(item => item.value > 0).sort((a, b) => b.value - a.value || a.label.localeCompare(b.label, 'nl-BE'));

  const paymentUsageMap = {};
  paidAppointments.forEach(app => {
    const label = paymentMethodNameForAppointment(app, data) || 'Onbekend';
    paymentUsageMap[label] = (paymentUsageMap[label] || 0) + 1;
  });
  const paymentUsage = Object.entries(paymentUsageMap).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value || a.label.localeCompare(b.label, 'nl-BE'));

  const statusMap = {};
  appointments.forEach(app => {
    const label = String(app.status || 'Onbekend').trim() || 'Onbekend';
    statusMap[label] = (statusMap[label] || 0) + 1;
  });
  const statusUsage = Object.entries(statusMap).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value || a.label.localeCompare(b.label, 'nl-BE'));

  const revenueByServiceMap = {};
  paidAppointments.forEach(app => {
    const service = services.find(item => String(item.id) === String(app.serviceId));
    const label = service?.name || 'Onbekende dienst';
    revenueByServiceMap[label] = (revenueByServiceMap[label] || 0) + Number(app.price || 0);
  });
  const revenueByService = Object.entries(revenueByServiceMap).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value || a.label.localeCompare(b.label, 'nl-BE'));

  return {
    appointmentCount: appointments.length,
    customerCount: customers.length,
    paidAppointmentCount: paidAppointments.length,
    paidRevenue,
    serviceUsage,
    paymentUsage,
    statusUsage,
    revenueByService
  };
}

function buildStatisticsDonut(items, valueFormatter = value => String(value)) {
  const safeItems = Array.isArray(items) ? items.filter(item => Number(item.value) > 0) : [];
  const total = safeItems.reduce((sum, item) => sum + Number(item.value || 0), 0);

  if (!safeItems.length || total <= 0) {
    return `
      <div class="statistics-empty">Nog geen gegevens beschikbaar.</div>
    `;
  }

  const palette = ['#d991ab', '#b86d87', '#f1bfd0', '#8c838d', '#df9db3', '#f8e8ee', '#c97b97', '#b3a1ac'];
  const center = 100;
  const radius = 90;
  const innerRadius = 42;

  const polarToCartesian = (cx, cy, r, angleDeg) => {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: cx + (r * Math.cos(angleRad)),
      y: cy + (r * Math.sin(angleRad))
    };
  };

  const describeArcSlice = (cx, cy, outerR, innerR, startAngle, endAngle) => {
    const outerStart = polarToCartesian(cx, cy, outerR, endAngle);
    const outerEnd = polarToCartesian(cx, cy, outerR, startAngle);
    const innerStart = polarToCartesian(cx, cy, innerR, startAngle);
    const innerEnd = polarToCartesian(cx, cy, innerR, endAngle);
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return [
      `M ${outerStart.x} ${outerStart.y}`,
      `A ${outerR} ${outerR} 0 ${largeArcFlag} 0 ${outerEnd.x} ${outerEnd.y}`,
      `L ${innerStart.x} ${innerStart.y}`,
      `A ${innerR} ${innerR} 0 ${largeArcFlag} 1 ${innerEnd.x} ${innerEnd.y}`,
      'Z'
    ].join(' ');
  };

  let currentAngle = 0;
  const slices = safeItems.map((item, index) => {
    const value = Number(item.value || 0);
    const percentage = (value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    return {
      ...item,
      color: palette[index % palette.length],
      percentage,
      path: describeArcSlice(center, center, radius, innerRadius, startAngle, endAngle)
    };
  });

  return `
    <div class="statistics-chart-layout">
      <div class="statistics-donut-wrap">
        <svg class="statistics-donut-svg" viewBox="0 0 200 200" aria-hidden="true">
          ${slices.map(slice => `<path d="${slice.path}" fill="${slice.color}"></path>`).join('')}
        </svg>
        <div class="statistics-donut-hole">${valueFormatter(total)}</div>
      </div>
      <div class="statistics-legend statistics-legend-table" role="table" aria-label="Overzicht diagramgegevens">
        ${safeItems.map((item, index) => {
          const percentage = total > 0 ? (Number(item.value || 0) / total) * 100 : 0;
          return `
            <div class="statistics-legend-row" role="row">
              <span class="statistics-legend-label" role="cell">
                <i style="background:${palette[index % palette.length]}"></i>${item.label}
              </span>
              <strong class="statistics-legend-value" role="cell">${valueFormatter(item.value)}</strong>
              <span class="statistics-legend-percentage" role="cell">${Math.round(percentage)}%</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function getTopCustomers(data = getData()) {
  const totals = new Map();

  (data.customers || []).forEach(customer => {
    const name = fullName(customer) || 'Onbekend';
    totals.set(String(customer.id), {
      id: customer.id,
      name,
      revenue: 0,
      appointments: 0,
      paidAppointments: 0
    });
  });

  (data.appointments || []).forEach(appointment => {
    if ((appointment.status || '').toLowerCase() === 'no-show') return;
    const customer = customerById(data, appointment.customerId);
    const key = customer ? String(customer.id) : `unknown-${appointment.customerId || appointment.id}`;
    const name = customer ? fullName(customer) : 'Onbekend';
    const current = totals.get(key) || { id: appointment.customerId || null, name, revenue: 0, appointments: 0, paidAppointments: 0 };
    current.appointments += 1;
    if (appointment.paid) {
      current.paidAppointments += 1;
      current.revenue += Number(appointment.price || 0);
    }
    totals.set(key, current);
  });

  return Array.from(totals.values())
    .sort((a, b) => (b.revenue - a.revenue) || (b.paidAppointments - a.paidAppointments) || (b.appointments - a.appointments) || a.name.localeCompare(b.name, 'nl-BE'));
}

function renderStatistics() {
  const wrap = document.getElementById('statisticsOverview');
  if (!wrap) return;

  const data = getData();
  const summary = getStatisticsSummary(data);
  const topCustomers = getTopCustomers(data);
  const visibleCount = Math.max(10, Number(state.statsTopCustomersVisible) || 10);
  const visibleCustomers = topCustomers.slice(0, visibleCount);
  const hasMoreCustomers = visibleCustomers.length < topCustomers.length;
  const canShowLessCustomers = visibleCount > 10 && topCustomers.length > 10;

  wrap.innerHTML = `
    <section class="statistics-card statistics-kpi-grid">
      <div class="statistics-kpi">
        <span class="statistics-kpi-label">Aantal klanten</span>
        <strong>${summary.customerCount}</strong>
      </div>
      <div class="statistics-kpi">
        <span class="statistics-kpi-label">Aantal afspraken</span>
        <strong>${summary.appointmentCount}</strong>
      </div>
      <div class="statistics-kpi">
        <span class="statistics-kpi-label">Betaalde afspraken</span>
        <strong>${summary.paidAppointmentCount}</strong>
      </div>
      <div class="statistics-kpi">
        <span class="statistics-kpi-label">Omzet tot op heden</span>
        <strong>${euro(summary.paidRevenue)}</strong>
      </div>
    </section>

    <section class="statistics-card">
      <div class="statistics-card-head">
        <h2>Gekozen behandelingen</h2>
      </div>
      ${buildStatisticsDonut(summary.serviceUsage)}
    </section>

    <section class="statistics-card">
      <div class="statistics-card-head">
        <h2>Omzet per behandeling</h2>
      </div>
      ${buildStatisticsDonut(summary.revenueByService, value => euro(value))}
    </section>

    <section class="statistics-card">
      <div class="statistics-card-head">
        <h2>Gekozen betaalwijze</h2>
      </div>
      ${buildStatisticsDonut(summary.paymentUsage)}
    </section>

    <section class="statistics-card">
      <div class="statistics-card-head">
        <h2>Top klanten</h2>
      </div>
      <div class="statistics-top-customers">
        ${visibleCustomers.length ? visibleCustomers.map((customer, index) => `
          <div class="statistics-top-customer-row">
            <div class="statistics-top-customer-rank">${index + 1}</div>
            <div class="statistics-top-customer-name">${customer.name}</div>
            <strong class="statistics-top-customer-amount">${euro(customer.revenue)}</strong>
          </div>
        `).join('') : `<div class="statistics-empty">Nog geen klantgegevens beschikbaar.</div>`}
      </div>
      ${(hasMoreCustomers || canShowLessCustomers) ? `
        <div class="statistics-more-wrap">
          ${hasMoreCustomers ? `<button id="statisticsMoreCustomersBtn" class="btn btn-secondary statistics-more-btn" type="button">Meer...</button>` : ''}
          ${canShowLessCustomers ? `<button id="statisticsLessCustomersBtn" class="btn btn-secondary statistics-more-btn" type="button">Minder</button>` : ''}
        </div>
      ` : ''}
    </section>
  `;

  const moreBtn = document.getElementById('statisticsMoreCustomersBtn');
  if (moreBtn) {
    moreBtn.addEventListener('click', () => {
      state.statsTopCustomersVisible = Math.min(topCustomers.length, visibleCount + 10);
      renderStatistics();
    });
  }

  const lessBtn = document.getElementById('statisticsLessCustomersBtn');
  if (lessBtn) {
    lessBtn.addEventListener('click', () => {
      state.statsTopCustomersVisible = Math.max(10, visibleCount - 10);
      renderStatistics();
    });
  }
}

function notificationsSupported() {
  return typeof window !== 'undefined' && 'Notification' in window;
}

function notificationsPermissionState() {
  if (!notificationsSupported()) return 'unsupported';
  return Notification.permission;
}

async function requestNotificationPermissionIfNeeded() {
  if (!notificationsSupported()) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  try {
    return await Notification.requestPermission();
  } catch (error) {
    console.error('Fout bij vragen meldingsrechten:', error);
    return Notification.permission || 'default';
  }
}

function clearScheduledNotifications() {
  notificationTimers.forEach(timerId => window.clearTimeout(timerId));
  notificationTimers.clear();
  if (notificationHeartbeatId) {
    window.clearInterval(notificationHeartbeatId);
    notificationHeartbeatId = null;
  }
}

function reminderStorageKey(appointment, reminderMinutes) {
  return `nailbooker-reminder-${appointment.id}-${appointment.date}-${appointment.time}-${reminderMinutes}`;
}

function appointmentReminderDueAt(appointment, reminderMinutes) {
  const appointmentAt = new Date(`${appointment.date}T${appointment.time || '00:00'}:00`).getTime();
  return appointmentAt - (Math.max(0, Number(reminderMinutes) || 0) * 60 * 1000);
}

async function showAppointmentNotification(appointment) {
  const data = getData();
  const customer = customerById(data, appointment.customerId);
  const service = serviceById(data, appointment.serviceId);
  const title = customer ? fullName(customer) : 'Aankomende afspraak';
  const body = [service?.name || 'Afspraak', `${formatLongDate(appointment.date)} om ${appointment.time}`].filter(Boolean).join(' · ');
  const options = {
    body,
    tag: `appointment-${appointment.id}`,
    renotify: false,
    badge: 'icons/icon-192.png',
    icon: 'icons/icon-192.png',
    data: { appointmentId: appointment.id, screen: 'agendaScreen', date: appointment.date }
  };

  try {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, options);
      return true;
    }
  } catch (error) {
    console.warn('Service worker melding mislukt, fallback naar Notification:', error);
  }

  if (notificationsSupported() && Notification.permission === 'granted') {
    new Notification(title, options);
    return true;
  }

  return false;
}

async function triggerDueAppointmentNotifications() {
  const settings = getSettings();
  if (!settings.notificationsEnabled || notificationsPermissionState() !== 'granted') return;

  const now = Date.now();
  const appointments = getData().appointments
    .filter(app => (app.status || '').toLowerCase() !== 'no-show')
    .filter(app => new Date(`${app.date}T${app.time || '00:00'}:00`).getTime() > now);

  for (const appointment of appointments) {
    const dueAt = appointmentReminderDueAt(appointment, settings.reminderMinutes);
    const appointmentAt = new Date(`${appointment.date}T${appointment.time || '00:00'}:00`).getTime();
    const storageKey = reminderStorageKey(appointment, settings.reminderMinutes);
    if (localStorage.getItem(storageKey)) continue;
    if (now >= dueAt && now < appointmentAt) {
      const shown = await showAppointmentNotification(appointment);
      if (shown) {
        localStorage.setItem(storageKey, String(Date.now()));
      }
    }
  }
}

async function scheduleAppointmentNotifications() {
  clearScheduledNotifications();

  const settings = getSettings();
  if (!settings.notificationsEnabled) return;
  if (notificationsPermissionState() !== 'granted') return;

  const now = Date.now();
  const appointments = getData().appointments
    .filter(app => (app.status || '').toLowerCase() !== 'no-show')
    .filter(app => new Date(`${app.date}T${app.time || '00:00'}:00`).getTime() > now)
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

  appointments.forEach(appointment => {
    const dueAt = appointmentReminderDueAt(appointment, settings.reminderMinutes);
    const delay = dueAt - now;
    const storageKey = reminderStorageKey(appointment, settings.reminderMinutes);
    if (localStorage.getItem(storageKey)) return;
    if (delay <= 0 || delay > 2147483647) return;

    const timerId = window.setTimeout(async () => {
      const shown = await showAppointmentNotification(appointment);
      if (shown) {
        localStorage.setItem(storageKey, String(Date.now()));
      }
      notificationTimers.delete(storageKey);
    }, delay);

    notificationTimers.set(storageKey, timerId);
  });

  await triggerDueAppointmentNotifications();
  notificationHeartbeatId = window.setInterval(() => {
    triggerDueAppointmentNotifications();
  }, 60000);
}

async function syncNotificationState(options = {}) {
  const { requestPermission = false } = options;
  const settings = getSettings();
  if (!settings.notificationsEnabled) {
    clearScheduledNotifications();
    return true;
  }

  const permission = requestPermission
    ? await requestNotificationPermissionIfNeeded()
    : notificationsPermissionState();

  if (permission !== 'granted') {
    clearScheduledNotifications();
    return false;
  }

  await scheduleAppointmentNotifications();
  return true;
}

function renderSettings() {
  const settings = getSettings();

  const breakInput = document.getElementById("settingsDefaultBreakMinutes");
  const notificationsToggle = document.getElementById("settingsNotificationsEnabled");
  const reminderSelect = document.getElementById("settingsReminderMinutes");
  const overlapToggle = document.getElementById("settingsOverlapWarningsEnabled");
  const reminderWrap = document.getElementById("settingsReminderWrap");
  const saveHint = document.getElementById("settingsSaveHint");

  if (!breakInput || !notificationsToggle || !reminderSelect || !overlapToggle || !reminderWrap || !saveHint) return;

  breakInput.value = Number(settings.defaultBreakMinutes || 0);
  notificationsToggle.checked = Boolean(settings.notificationsEnabled);
  reminderSelect.value = String(settings.reminderMinutes || 30);
  overlapToggle.checked = settings.overlapWarningsEnabled !== false;
  const notificationsEnabled = Boolean(settings.notificationsEnabled);
  const permissionState = notificationsPermissionState();

  reminderWrap.classList.toggle("hidden", !notificationsEnabled);

  if (state.settingsSavePending) {
    saveHint.textContent = "Instellingen opslaan...";
  } else if (!notificationsEnabled) {
    saveHint.textContent = "Meldingen zijn uitgeschakeld.";
  } else if (permissionState === "granted") {
    saveHint.textContent = "Meldingen zijn actief op dit toestel zolang browser of app meldingen ondersteunt.";
  } else if (permissionState === "denied") {
    saveHint.textContent = "Meldingen zijn geblokkeerd in je browserinstellingen.";
  } else if (permissionState === "unsupported") {
    saveHint.textContent = "Deze browser ondersteunt geen webmeldingen.";
  } else {
    saveHint.textContent = "Schakel meldingen in en geef toestemming om herinneringen te tonen.";
  }
}


async function loadSettingsFromSupabase() {
  const user = await getCurrentUser();
  if (!user) return getDefaultSettings();

  const { data, error } = await supabaseClient
    .from("user_settings")
    .select("default_break_minutes, notifications_enabled, reminder_minutes, overlap_warnings_enabled")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Fout bij laden instellingen:", error.message);
    return getDefaultSettings();
  }

  return {
    defaultBreakMinutes: Number(data?.default_break_minutes ?? 10),
    notificationsEnabled: Boolean(data?.notifications_enabled ?? false),
    reminderMinutes: Number(data?.reminder_minutes ?? 30),
    overlapWarningsEnabled: data?.overlap_warnings_enabled !== false
  };
}

async function saveSettingsFromForm(event) {
  if (event) event.preventDefault();

  const settings = {
    defaultBreakMinutes: Math.max(0, Number(document.getElementById("settingsDefaultBreakMinutes")?.value || 0)),
    notificationsEnabled: Boolean(document.getElementById("settingsNotificationsEnabled")?.checked),
    reminderMinutes: Number(document.getElementById("settingsReminderMinutes")?.value || 30),
    overlapWarningsEnabled: Boolean(document.getElementById("settingsOverlapWarningsEnabled")?.checked)
  };

  const user = await getCurrentUser();

  if (!user) {
    const data = getData();
    data.settings = settings;
    saveData(data);
    state.settingsSavePending = false;
    await syncNotificationState({ requestPermission: settings.notificationsEnabled });
    renderSettings();
    await appAlert("Instellingen opgeslagen op dit toestel.", { title: "Instellingen opgeslagen", variant: "success" });
    return;
  }

  state.settingsSavePending = true;
  renderSettings();

  const payload = {
    user_id: user.id,
    default_break_minutes: settings.defaultBreakMinutes,
    notifications_enabled: settings.notificationsEnabled,
    reminder_minutes: settings.reminderMinutes,
    overlap_warnings_enabled: settings.overlapWarningsEnabled,
    updated_at: new Date().toISOString()
  };

  const { error } = await supabaseClient
    .from("user_settings")
    .upsert(payload, { onConflict: "user_id" });

  state.settingsSavePending = false;

  if (error) {
    renderSettings();
    await appAlert("Opslaan instellingen mislukt: " + error.message, { title: "Opslaan mislukt", variant: "danger" });
    return;
  }

  const data = getData();
  data.settings = settings;
  saveData(data);
  await syncNotificationState({ requestPermission: settings.notificationsEnabled });
  renderSettings();
  await appAlert("Instellingen opgeslagen.", { title: "Instellingen opgeslagen", variant: "success" });
}

// =============================
// CLIENT DETAIL SCREEN UPDATE
// =============================


function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizePhoneHref(phone) {
  return String(phone || '').replace(/[^+\d]/g, '');
}

function updateClientActionBar(client = null) {
  const bar = document.getElementById('clientActionBar');
  const callBtn = document.getElementById('clientActionCall');
  const smsBtn = document.getElementById('clientActionSms');
  const emailBtn = document.getElementById('clientActionEmail');

  if (!bar || !callBtn || !smsBtn || !emailBtn) return;

  const phoneValue = normalizePhoneHref(client?.phone || '');
  const emailValue = String(client?.email || '').trim();

  const hasPhone = Boolean(phoneValue);
  const hasEmail = Boolean(emailValue);
  const shouldShowBar = state.currentScreen === 'clientDetailScreen' && (hasPhone || hasEmail);

  callBtn.classList.toggle('hidden', !hasPhone);
  smsBtn.classList.toggle('hidden', !hasPhone);
  emailBtn.classList.toggle('hidden', !hasEmail);

  if (hasPhone) {
    callBtn.href = `tel:${phoneValue}`;
    callBtn.setAttribute('aria-label', `Bel ${client.phone || phoneValue}`);
    callBtn.title = `Bel ${client.phone || phoneValue}`;

    smsBtn.href = `sms:${phoneValue}`;
    smsBtn.setAttribute('aria-label', `Stuur sms naar ${client.phone || phoneValue}`);
    smsBtn.title = `Stuur sms naar ${client.phone || phoneValue}`;
  } else {
    callBtn.removeAttribute('href');
    smsBtn.removeAttribute('href');
  }

  if (hasEmail) {
    emailBtn.href = `mailto:${emailValue}`;
    emailBtn.setAttribute('aria-label', `Mail naar ${emailValue}`);
    emailBtn.title = `Mail naar ${emailValue}`;
  } else {
    emailBtn.removeAttribute('href');
  }

  bar.classList.toggle('hidden', !shouldShowBar);
}

function renderClientContactValue(type, value) {
  const safeValue = String(value || '').trim();
  if (!safeValue) return `<div class="client-detail-value">-</div>`;
  return `<div class="client-detail-value">${escapeHtml(safeValue)}</div>`;
}

function openClientDetail(clientId) {
  state.selectedClientId = clientId;

  const data = getData();
  const client = customerById(data, clientId);
  const content = document.getElementById("clientDetailContent");

  if (!client || !content) return;

  const appts = data.appointments
    .filter(a => String(a.customerId) === String(clientId))
    .sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`));

  const safeNote = escapeHtml(client.note || '-').replace(/\n/g, '<br>');

  content.innerHTML = `
    <div class="client-detail-page">

      <div class="client-detail-card">
        <div class="client-detail-table">
          <div class="client-detail-row client-detail-row-stacked">
            <div class="client-detail-label">Voornaam</div>
            ${renderClientContactValue('text', client.firstName || '-')}
          </div>

          <div class="client-detail-row client-detail-row-stacked">
            <div class="client-detail-label">Naam</div>
            ${renderClientContactValue('text', client.lastName || '-')}
          </div>

          <div class="client-detail-row client-detail-row-stacked">
            <div class="client-detail-label">Telefoon</div>
            ${renderClientContactValue('phone', client.phone || '')}
          </div>

          <div class="client-detail-row client-detail-row-stacked">
            <div class="client-detail-label">E-mail</div>
            ${renderClientContactValue('email', client.email || '')}
          </div>

          <div class="client-detail-note-block">
            <div class="client-detail-label">Notitie</div>
            <div class="client-detail-note">${safeNote}</div>
          </div>
        </div>

        <div class="client-detail-footer">
          <button class="btn btn-primary client-detail-edit-btn" id="editClientBtn" type="button">
            Bewerken
          </button>
        </div>
      </div>

      <div class="client-appointments-section">
        <div class="client-appointments-header">
          <div class="client-appointments-title">AFSPRAKEN</div>
          <div class="client-appointments-count">${appts.length} totaal</div>
        </div>

        <div class="client-new-appointment-bar">
          <button
            class="btn btn-primary client-new-appointment-btn"
            id="newClientAppointmentBtn"
            type="button"
          >
            Nieuwe afspraak
          </button>
        </div>

        <div class="client-appointments-list">
          ${
            appts.length
              ? appts.map(app => {
                  const service = serviceById(data, app.serviceId);

                  return `
                    <div class="client-appointment-row">
                      <div class="client-appointment-datecol">
                        <div class="client-appointment-date">${formatShortDate(app.date)}</div>
                        <div class="client-appointment-time">${app.time || ""}</div>
                      </div>

                      <div class="client-appointment-main">
                        <div class="client-appointment-service">${service ? service.name : "-"}</div>
                        <div class="client-appointment-status">
                          ${app.status || "-"}${app.paid ? " · betaald" : ""}
                        </div>
                      </div>

                      <div class="client-appointment-actions">
                        <button
                          class="btn btn-primary client-appointment-edit-btn from-detail-edit"
                          data-id="${app.id}"
                          type="button"
                        >
                          Bewerk
                        </button>
                      </div>
                    </div>
                  `;
                }).join("")
              : `<div class="client-appointment-empty">Nog geen afspraken.</div>`
          }
        </div>

      </div>

    </div>
  `;

  const editClientBtn = document.getElementById("editClientBtn");
  if (editClientBtn) {
    editClientBtn.addEventListener("click", () => {
      openEditClientDialog(clientId);
    });
  }

  const newClientAppointmentBtn = document.getElementById("newClientAppointmentBtn");
  if (newClientAppointmentBtn) {
    newClientAppointmentBtn.addEventListener("click", () => {
      openNewAppointmentDialog(clientId);
    });
  }

  content.querySelectorAll(".from-detail-edit").forEach(btn => {
    btn.addEventListener("click", () => {
      openEditAppointmentDialog(btn.dataset.id);
    });
  });

  switchScreen("clientDetailScreen", "Klant");
  updateClientActionBar(client);
}

// =============================
// HELPERS (ongewijzigd gedrag)
// =============================

function createAppointmentForClient(clientId) {
  openNewAppointment(clientId);
}


function populateAppointmentForm(customerId = null) {
  const data = getData();
  const customerSelect = document.getElementById("appointmentCustomer");
  const serviceSelect = document.getElementById("appointmentService");

  customerSelect.innerHTML = data.customers.map(c => `<option value="${c.id}">${fullName(c)}</option>`).join("");
  serviceSelect.innerHTML = data.services.map(s => `<option value="${s.id}">${s.name}</option>`).join("");

  if (customerId) {
    customerSelect.value = String(customerId);
  }
}

function syncServiceDefaults() {
  const data = getData();
  const service = serviceById(data, document.getElementById("appointmentService").value);

  if (!service) return;

  document.getElementById("appointmentDuration").value = service.duration;
  document.getElementById("appointmentPrice").value = service.price;
}

function openNewAppointmentDialog(prefillCustomerId = null) {
  populateAppointmentForm(prefillCustomerId);

  document.getElementById("appointmentModalTitle").textContent = "Nieuwe afspraak";
  document.getElementById("appointmentId").value = "";
  document.getElementById("appointmentDate").value = state.selectedDate;
  document.getElementById("appointmentTime").value = "10:00";
  document.getElementById("appointmentStatus").value = "gepland";
  document.getElementById("appointmentStatusWrap").style.display = "none";

  const serviceSelect = document.getElementById("appointmentService");
  if (serviceSelect.options.length) {
    serviceSelect.value = serviceSelect.options[0].value;
  }

  syncServiceDefaults();
  document.getElementById("deleteAppointmentBtn").style.visibility = "hidden";
  document.getElementById("appointmentDialog").showModal();
}

function openEditAppointmentDialog(id) {
  const data = getData();
  const app = data.appointments.find(a => String(a.id) === String(id));
  if (!app) return;

  populateAppointmentForm(app.customerId);

  document.getElementById("appointmentModalTitle").textContent = "Afspraak bewerken";
  document.getElementById("appointmentId").value = app.id;
  document.getElementById("appointmentCustomer").value = app.customerId;
  document.getElementById("appointmentDate").value = app.date;
  document.getElementById("appointmentTime").value = app.time;
  document.getElementById("appointmentService").value = app.serviceId;
  document.getElementById("appointmentDuration").value = app.duration;
  document.getElementById("appointmentPrice").value = app.price;
  document.getElementById("appointmentStatus").value = app.status;
  document.getElementById("appointmentStatusWrap").style.display = "block";

  document.getElementById("deleteAppointmentBtn").style.visibility = "visible";
  document.getElementById("appointmentDialog").showModal();
}

function positionPaymentPopover() {
  const popover = document.getElementById("paymentPopover");
  if (!popover || popover.classList.contains("hidden") || !paymentPopoverState.anchorRect) return;

  const card = popover.querySelector(".payment-popover-card");
  if (!card) return;

  const margin = 12;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const cardRect = card.getBoundingClientRect();
  const anchor = paymentPopoverState.anchorRect;

  let left = anchor.right - cardRect.width;
  left = Math.max(margin, Math.min(left, viewportWidth - cardRect.width - margin));

  let top = anchor.top - cardRect.height - 10;
  const spaceAbove = anchor.top - margin;
  const spaceBelow = viewportHeight - anchor.bottom - margin;

  if (top < margin) {
    if (spaceBelow >= cardRect.height || spaceBelow > spaceAbove) {
      top = Math.min(viewportHeight - cardRect.height - margin, anchor.bottom + 10);
      popover.dataset.placement = "bottom";
    } else {
      top = margin;
      popover.dataset.placement = "top";
    }
  } else {
    popover.dataset.placement = "top";
  }

  popover.style.left = `${Math.round(left)}px`;
  popover.style.top = `${Math.round(top)}px`;
}

function closePaymentPopover() {
  const popover = document.getElementById("paymentPopover");
  if (!popover) return;
  popover.classList.add("hidden");
  popover.setAttribute("aria-hidden", "true");
  popover.style.left = "";
  popover.style.top = "";
  popover.removeAttribute("data-placement");
  paymentPopoverState.appointmentId = null;
  paymentPopoverState.anchorRect = null;
}

function renderPaymentPopoverOptions(app, data = getData()) {
  const list = document.getElementById("paymentMethodListPopup");
  if (!list) return;

  const methods = getPaymentMethods(data);
  const selectedName = paymentMethodNameForAppointment(app, data) || "";
  const items = [{ value: "", label: "Onbetaald", unpaid: true }, ...methods.map(method => ({ value: method.name, label: method.name, unpaid: false }))];

  list.innerHTML = items.map(item => {
    const isActive = item.unpaid ? !app.paid : (app.paid && item.value === selectedName);
    return `
      <button
        type="button"
        class="payment-method-popup-item ${isActive ? "active" : ""} ${item.unpaid ? "is-unpaid" : ""}"
        data-payment-value="${item.value}"
        data-unpaid="${item.unpaid ? "true" : "false"}"
        role="menuitemradio"
        aria-checked="${isActive ? "true" : "false"}"
      >
        <span>${item.label}</span>
      </button>
    `;
  }).join("");

  list.querySelectorAll(".payment-method-popup-item").forEach(button => {
    button.addEventListener("click", async event => {
      event.stopPropagation();
      const methodName = button.dataset.paymentValue || "";
      if (button.dataset.unpaid === "true") {
        await markUnpaid();
        return;
      }
      await confirmPaymentSelection(methodName);
    });
  });
}

function openPaymentDialog(id, anchorEl = null) {
  const data = getData();
  const app = data.appointments.find(a => String(a.id) === String(id));
  if (!app) return;

  const popover = document.getElementById("paymentPopover");
  if (!popover) return;

  document.getElementById("paymentAppointmentId").value = id;
  document.getElementById("paymentAmount").textContent = euro(app.price);
  document.getElementById("paymentDialogCurrentMethod").textContent = app.paid
    ? (paymentMethodNameForAppointment(app, data) || "Onbekend")
    : "Nog niet betaald";

  renderPaymentPopoverOptions(app, data);

  const rect = anchorEl?.getBoundingClientRect?.();
  paymentPopoverState.appointmentId = String(id);
  paymentPopoverState.anchorRect = rect
    ? { top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left, width: rect.width, height: rect.height }
    : { top: window.innerHeight / 2, right: window.innerWidth / 2 + 120, bottom: window.innerHeight / 2, left: window.innerWidth / 2 - 120, width: 240, height: 0 };

  popover.classList.remove("hidden");
  popover.setAttribute("aria-hidden", "false");
  requestAnimationFrame(positionPaymentPopover);
}

function renderPaymentMethods() {
  const data = getData();
  const list = document.getElementById("paymentMethodsList");
  if (!list) return;

  const methods = getPaymentMethods(data);
  if (!methods.length) {
    list.innerHTML = `<div class="empty-state">Nog geen betaalwijzen.</div>`;
    return;
  }

  list.innerHTML = "";
  methods.forEach(method => {
    const usageCount = (data.appointments || []).filter(app => paymentMethodNameForAppointment(app, data) === method.name).length;
    const card = document.createElement("div");
    card.className = "service-card payment-method-card";
    card.innerHTML = `
      <button type="button" data-id="${method.id}">
        <div class="client-name">${method.name}</div>
        <div class="meta">${usageCount} betaling${usageCount === 1 ? "" : "en"}</div>
      </button>
    `;
    card.querySelector("button").addEventListener("click", () => openEditPaymentMethodDialog(method.id));
    list.appendChild(card);
  });
}

function openNewPaymentMethodDialog() {
  document.getElementById("paymentMethodModalTitle").textContent = "Nieuwe betaalwijze";
  document.getElementById("paymentMethodId").value = "";
  document.getElementById("paymentMethodName").value = "";
  document.getElementById("deletePaymentMethodBtn").style.visibility = "hidden";
  document.getElementById("paymentMethodDialog").showModal();
}

function openEditPaymentMethodDialog(id) {
  const data = getData();
  const method = getPaymentMethods(data).find(item => String(item.id) === String(id));
  if (!method) return;

  document.getElementById("paymentMethodModalTitle").textContent = "Betaalwijze bewerken";
  document.getElementById("paymentMethodId").value = method.id;
  document.getElementById("paymentMethodName").value = method.name;
  document.getElementById("deletePaymentMethodBtn").style.visibility = "visible";
  document.getElementById("paymentMethodDialog").showModal();
}

function openNewClientDialog() {
  document.getElementById("clientModalTitle").textContent = "Nieuwe klant";
  document.getElementById("clientId").value = "";
  document.getElementById("clientFirstName").value = "";
  document.getElementById("clientLastName").value = "";
  document.getElementById("clientPhone").value = "";
  document.getElementById("clientEmail").value = "";
  document.getElementById("clientNote").value = "";

  document.getElementById("clientDialog").showModal();
}

function openEditClientDialog(id) {
  const data = getData();
  const client = customerById(data, id);
  if (!client) return;

  document.getElementById("clientModalTitle").textContent = "Klant bewerken";
  document.getElementById("clientId").value = client.id;
  document.getElementById("clientFirstName").value = client.firstName || "";
  document.getElementById("clientLastName").value = client.lastName || "";
  document.getElementById("clientPhone").value = client.phone || "";
  document.getElementById("clientEmail").value = client.email || "";
  document.getElementById("clientNote").value = client.note || "";

  document.getElementById("clientDialog").showModal();
}

function openNewServiceDialog() {
  document.getElementById("serviceModalTitle").textContent = "Nieuwe dienst";
  document.getElementById("serviceId").value = "";
  document.getElementById("serviceName").value = "";
  document.getElementById("serviceDuration").value = 60;
  document.getElementById("servicePrice").value = 65;

  document.getElementById("deleteServiceBtn").style.visibility = "hidden";
  document.getElementById("serviceDialog").showModal();
}

function openEditServiceDialog(id) {
  const data = getData();
  const service = serviceById(data, id);
  if (!service) return;

  document.getElementById("serviceModalTitle").textContent = "Dienst bewerken";
  document.getElementById("serviceId").value = service.id;
  document.getElementById("serviceName").value = service.name;
  document.getElementById("serviceDuration").value = service.duration;
  document.getElementById("servicePrice").value = service.price;

  document.getElementById("deleteServiceBtn").style.visibility = "visible";
  document.getElementById("serviceDialog").showModal();
}

/* =========================
   SAVE / DELETE
========================= */

async function savePaymentMethodFromForm(event) {
  event.preventDefault();

  const user = await getCurrentUser();
  const data = getData();
  const rawId = document.getElementById("paymentMethodId").value;
  const id = rawId ? Number(rawId) : null;
  const name = document.getElementById("paymentMethodName").value.trim();

  if (!name) {
    await appAlert("Geef een naam voor de betaalwijze in.", { title: "Betaalwijze", variant: "warning" });
    return;
  }

  const duplicate = getPaymentMethods(data).find(method => method.name.toLowerCase() === name.toLowerCase() && String(method.id) !== String(id || ""));
  if (duplicate) {
    await appAlert("Er bestaat al een betaalwijze met deze naam.", { title: "Dubbele betaalwijze", variant: "warning" });
    return;
  }

  if (!user) {
    const methods = getPaymentMethods(data);
    if (id) {
      const existing = methods.find(method => Number(method.id) === id);
      if (existing) existing.name = name;
    } else {
      methods.push({ id: nextId(methods), name, sortOrder: methods.length + 1 });
    }
    data.paymentMethods = methods.map((method, index) => ({ ...method, sortOrder: index + 1 }));
    saveData(data);
    closeDialog("paymentMethodDialog");
    rerenderAll();
    return;
  }

  let error;
  if (id) {
    ({ error } = await supabaseClient
      .from("payment_methods")
      .update({ name, updated_at: new Date().toISOString() })
      .eq("id", Number(id))
      .eq("user_id", user.id));
  } else {
    ({ error } = await supabaseClient
      .from("payment_methods")
      .insert({
        user_id: user.id,
        name,
        sort_order: getPaymentMethods(data).length + 1
      }));
  }

  if (error) {
    await appAlert("Opslaan betaalwijze mislukt: " + error.message, { title: "Opslaan mislukt", variant: "danger" });
    return;
  }

  await loadAllDataFromSupabase();
  closeDialog("paymentMethodDialog");
  rerenderAll();
}

async function deleteCurrentPaymentMethod() {
  const id = document.getElementById("paymentMethodId").value;
  if (!id) return;

  const data = getData();
  if (getPaymentMethods(data).length <= 1) {
    await appAlert("Er moet minstens één betaalwijze overblijven.", { title: "Betaalwijze", variant: "warning" });
    return;
  }

  const confirmed = await appConfirm("Deze betaalwijze wordt verwijderd uit de keuzelijst. Eerdere betalingen behouden hun opgeslagen naam.", {
    title: "Betaalwijze verwijderen",
    confirmText: "Verwijderen",
    cancelText: "Annuleren",
    variant: "warning"
  });
  if (!confirmed) return;

  const user = await getCurrentUser();

  if (!user) {
    data.paymentMethods = getPaymentMethods(data).filter(method => String(method.id) !== String(id));
    saveData(data);
    closeDialog("paymentMethodDialog");
    rerenderAll();
    return;
  }

  const { error } = await supabaseClient
    .from("payment_methods")
    .delete()
    .eq("id", Number(id))
    .eq("user_id", user.id);

  if (error) {
    await appAlert("Verwijderen betaalwijze mislukt: " + error.message, { title: "Verwijderen mislukt", variant: "danger" });
    return;
  }

  await loadAllDataFromSupabase();
  closeDialog("paymentMethodDialog");
  rerenderAll();
}

async function saveClientFromForm(event) {
  event.preventDefault();

  const user = await getCurrentUser();

  if (!user) {
    const data = getData();
    const id = Number(document.getElementById("clientId").value);

    const payload = {
      firstName: document.getElementById("clientFirstName").value.trim(),
      lastName: document.getElementById("clientLastName").value.trim(),
      phone: document.getElementById("clientPhone").value.trim(),
      email: document.getElementById("clientEmail").value.trim(),
      note: document.getElementById("clientNote").value.trim()
    };

    if (id) {
      Object.assign(customerById(data, id), payload);
    } else {
      data.customers.push({ id: nextId(data.customers), ...payload });
    }

    saveData(data);
    closeDialog("clientDialog");
    renderAlphabetFilter();
    renderClients();
    renderRevenueFilters();
    return;
  }

  const id = document.getElementById("clientId").value;

  const payload = {
    user_id: user.id,
    first_name: document.getElementById("clientFirstName").value.trim(),
    last_name: document.getElementById("clientLastName").value.trim(),
    phone: document.getElementById("clientPhone").value.trim(),
    email: document.getElementById("clientEmail").value.trim(),
    note: document.getElementById("clientNote").value.trim()
  };

  let error;

  if (id) {
    ({ error } = await supabaseClient
      .from("customers")
      .update(payload)
      .eq("id", Number(id))
      .eq("user_id", user.id));
  } else {
    ({ error } = await supabaseClient
      .from("customers")
      .insert(payload));
  }

  if (error) {
    await appAlert("Opslaan klant mislukt: " + error.message, { title: "Opslaan mislukt", variant: "danger" });
    return;
  }

  await loadAllDataFromSupabase();
  closeDialog("clientDialog");
  renderAlphabetFilter();
  renderClients();
  renderRevenueFilters();

  if (state.selectedClientId) {
    openClientDetail(state.selectedClientId);
  }
}

async function saveServiceFromForm(event) {
  event.preventDefault();

  const user = await getCurrentUser();

  if (!user) {
    const data = getData();
    const id = Number(document.getElementById("serviceId").value);

    const payload = {
      name: document.getElementById("serviceName").value.trim(),
      duration: Number(document.getElementById("serviceDuration").value),
      price: Number(document.getElementById("servicePrice").value)
    };

    if (id) {
      Object.assign(serviceById(data, id), payload);
    } else {
      data.services.push({ id: nextId(data.services), ...payload });
    }

    saveData(data);
    closeDialog("serviceDialog");
    rerenderAll();
    return;
  }

  const id = document.getElementById("serviceId").value;

  const payload = {
    user_id: user.id,
    name: document.getElementById("serviceName").value.trim(),
    duration: Number(document.getElementById("serviceDuration").value),
    price: Number(document.getElementById("servicePrice").value)
  };

  let error;

  if (id) {
    ({ error } = await supabaseClient
      .from("services")
      .update(payload)
      .eq("id", Number(id))
      .eq("user_id", user.id));
  } else {
    ({ error } = await supabaseClient
      .from("services")
      .insert(payload));
  }

  if (error) {
    await appAlert("Opslaan dienst mislukt: " + error.message, { title: "Opslaan mislukt", variant: "danger" });
    return;
  }

  await loadAllDataFromSupabase();
  closeDialog("serviceDialog");
  rerenderAll();
}

async function saveAppointmentFromForm(event) {
  event.preventDefault();

  const user = await getCurrentUser();
  const data = getData();
  const rawId = document.getElementById("appointmentId").value;
  const id = rawId ? Number(rawId) : null;
  const settings = getSettings();

  const localPayload = {
    customerId: Number(document.getElementById("appointmentCustomer").value),
    date: document.getElementById("appointmentDate").value,
    time: document.getElementById("appointmentTime").value,
    serviceId: Number(document.getElementById("appointmentService").value),
    duration: Number(document.getElementById("appointmentDuration").value),
    price: Number(document.getElementById("appointmentPrice").value),
    status: id ? document.getElementById("appointmentStatus").value : "gepland"
  };

  if (isAppointmentInPast(localPayload)) {
    const confirmedPast = await appConfirm(buildPastAppointmentMessage(localPayload), {
      title: "Afspraak in het verleden",
      confirmText: "Toch opslaan",
      cancelText: "Annuleren",
      variant: "warning"
    });
    if (!confirmedPast) return;
  }

  if (settings.overlapWarningsEnabled) {
    const overlapApp = findAppointmentOverlap(localPayload, data.appointments, settings.defaultBreakMinutes, id);
    if (overlapApp) {
      const confirmed = await appConfirm(buildOverlapMessage(localPayload, overlapApp, data.appointments, settings.defaultBreakMinutes, id), {
        title: "Overlap gedetecteerd",
        confirmText: "Toch opslaan",
        cancelText: "Annuleren",
        variant: "warning"
      });
      if (!confirmed) return;
    }
  }

  if (!user) {
    if (id) {
      const existingApp = data.appointments.find(a => Number(a.id) === id);
      Object.assign(existingApp, localPayload);
    } else {
      data.appointments.push({
        id: nextId(data.appointments),
        ...localPayload,
        paid: false,
        paymentMethodName: null
      });
    }

    saveData(data);
    closeDialog("appointmentDialog");

    state.selectedDate = localPayload.date;
    const picked = new Date(localPayload.date + "T00:00:00");
    state.currentYear = picked.getFullYear();
    state.currentMonth = picked.getMonth();

    rerenderAll();
    return;
  }

  const existingApp = data.appointments.find(a => String(a.id) === String(id));
  const isPaid = existingApp ? Boolean(existingApp.paid) : false;
  const existingPaymentMethodName = paymentMethodNameForAppointment(existingApp, data) || null;

  const payload = {
    user_id: user.id,
    customer_id: localPayload.customerId,
    appointment_date: localPayload.date,
    appointment_time: localPayload.time,
    service_id: localPayload.serviceId,
    duration: localPayload.duration,
    price: localPayload.price,
    status: localPayload.status,
    paid: isPaid,
    payment_method_label: isPaid ? existingPaymentMethodName : null
  };

  let error;

  if (id) {
    ({ error } = await supabaseClient
      .from("appointments")
      .update(payload)
      .eq("id", Number(id))
      .eq("user_id", user.id));
  } else {
    ({ error } = await supabaseClient
      .from("appointments")
      .insert(payload));
  }

  if (error) {
    await appAlert("Opslaan afspraak mislukt: " + error.message, { title: "Opslaan mislukt", variant: "danger" });
    return;
  }

  await loadAllDataFromSupabase();
  closeDialog("appointmentDialog");

  state.selectedDate = payload.appointment_date;
  const picked = new Date(payload.appointment_date + "T00:00:00");
  state.currentYear = picked.getFullYear();
  state.currentMonth = picked.getMonth();

  rerenderAll();
}

async function deleteCurrentAppointment() {
  const id = document.getElementById("appointmentId").value;
  if (!id) return;

  const user = await getCurrentUser();

  if (!user) {
    const data = getData();
    data.appointments = data.appointments.filter(a => String(a.id) !== String(id));
    saveData(data);
    closeDialog("appointmentDialog");
    rerenderAll();
    return;
  }

  const { error } = await supabaseClient
    .from("appointments")
    .delete()
    .eq("id", Number(id))
    .eq("user_id", user.id);

  if (error) {
    await appAlert("Verwijderen afspraak mislukt: " + error.message, { title: "Verwijderen mislukt", variant: "danger" });
    return;
  }

  await loadAllDataFromSupabase();
  closeDialog("appointmentDialog");
  rerenderAll();
}

async function deleteCurrentService() {
  const id = document.getElementById("serviceId").value;
  if (!id) return;

  const user = await getCurrentUser();

  if (!user) {
    const data = getData();
    data.services = data.services.filter(s => String(s.id) !== String(id));
    saveData(data);
    closeDialog("serviceDialog");
    rerenderAll();
    return;
  }

  const { error } = await supabaseClient
    .from("services")
    .delete()
    .eq("id", Number(id))
    .eq("user_id", user.id);

  if (error) {
    await appAlert("Verwijderen dienst mislukt: " + error.message, { title: "Verwijderen mislukt", variant: "danger" });
    return;
  }

  await loadAllDataFromSupabase();
  closeDialog("serviceDialog");
  rerenderAll();
}

async function confirmPaymentSelection(methodName) {
  const id = document.getElementById("paymentAppointmentId").value;
  const safeMethodName = String(methodName || "").trim();
  const user = await getCurrentUser();
  const data = getData();

  if (!safeMethodName) {
    await appAlert("Kies een geldige betaalwijze.", { title: "Betaling", variant: "warning" });
    return;
  }

  if (!user) {
    const appointment = data.appointments.find(a => String(a.id) === String(id));
    if (!appointment) return;

    appointment.paid = true;
    appointment.paymentMethodName = safeMethodName;
    if (appointment.status === "gepland") appointment.status = "afgerond";

    saveData(data);
    closePaymentPopover();
    rerenderAll();
    return;
  }

  const { error } = await supabaseClient
    .from("appointments")
    .update({
      paid: true,
      payment_method_label: safeMethodName,
      status: "afgerond"
    })
    .eq("id", Number(id))
    .eq("user_id", user.id);

  if (error) {
    await appAlert("Betaling opslaan mislukt: " + error.message, { title: "Opslaan mislukt", variant: "danger" });
    return;
  }

  await loadAllDataFromSupabase();
  closePaymentPopover();
  rerenderAll();
}

async function markUnpaid() {
  const id = document.getElementById("paymentAppointmentId").value;
  const user = await getCurrentUser();

  if (!user) {
    const data = getData();
    const appointment = data.appointments.find(a => String(a.id) === String(id));
    if (!appointment) return;

    appointment.paid = false;
    appointment.paymentMethodName = null;

    saveData(data);
    closePaymentPopover();
    rerenderAll();
    return;
  }

  const { error } = await supabaseClient
    .from("appointments")
    .update({
      paid: false,
      payment_method_label: null
    })
    .eq("id", Number(id))
    .eq("user_id", user.id);

  if (error) {
    await appAlert("Betaling bijwerken mislukt: " + error.message, { title: "Bijwerken mislukt", variant: "danger" });
    return;
  }

  await loadAllDataFromSupabase();
  closePaymentPopover();
  rerenderAll();
}

/* =========================
   MONTH PICKER
========================= */

function openMonthPicker() {
  const monthSelect = document.getElementById("monthSelect");
  monthSelect.innerHTML = monthNames.map((m, i) => `<option value="${i}">${m}</option>`).join("");
  monthSelect.value = String(state.currentMonth);
  document.getElementById("yearSelect").value = state.currentYear;

  document.getElementById("monthPickerDialog").showModal();
}

function saveMonthPicker(event) {
  event.preventDefault();

  state.currentMonth = Number(document.getElementById("monthSelect").value);
  state.currentYear = Number(document.getElementById("yearSelect").value);

  const daysInMonth = new Date(state.currentYear, state.currentMonth + 1, 0).getDate();
  const existingDay = Number(state.selectedDate.slice(8, 10));
  const safeDay = Math.min(existingDay, daysInMonth);

  state.selectedDate = `${state.currentYear}-${String(state.currentMonth + 1).padStart(2, "0")}-${String(safeDay).padStart(2, "0")}`;

  closeDialog("monthPickerDialog");
  renderCalendar();
  renderAgendaList();
  renderRevenue();
}

function closeDialog(id) {
  const dialog = document.getElementById(id);
  if (!dialog) return;
  if (typeof dialog.close === "function") dialog.close();
}

function rerenderAll() {
  renderAlphabetFilter();
  renderCalendar();
  renderAgendaList();
  renderClients();
  renderServices();
  renderPaymentMethods();
  renderStatistics();
  renderRevenue();

  if (state.selectedClientId && state.currentScreen === "clientDetailScreen") {
    openClientDetail(state.selectedClientId);
  }

  syncNotificationState();
}

/* =========================
   EVENTS
========================= */

function registerEvents() {
  document.getElementById("prevMonthBtn").addEventListener("click", () => {
    state.currentMonth--;
    if (state.currentMonth < 0) {
      state.currentMonth = 11;
      state.currentYear--;
    }

    state.selectedDate = `${state.currentYear}-${String(state.currentMonth + 1).padStart(2, "0")}-01`;
    renderCalendar();
    renderAgendaList();
    renderRevenue();
  });

  document.getElementById("nextMonthBtn").addEventListener("click", () => {
    state.currentMonth++;
    if (state.currentMonth > 11) {
      state.currentMonth = 0;
      state.currentYear++;
    }

    state.selectedDate = `${state.currentYear}-${String(state.currentMonth + 1).padStart(2, "0")}-01`;
    renderCalendar();
    renderAgendaList();
    renderRevenue();
  });

  document.getElementById("monthPickerBtn").addEventListener("click", openMonthPicker);
  document.getElementById("monthPickerForm").addEventListener("submit", saveMonthPicker);
  document.getElementById("jumpToTodayBtn")?.addEventListener("click", jumpToToday);

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => switchScreen(btn.dataset.screen, btn.dataset.title));
  });

  document.getElementById("backBtn").addEventListener("click", () => {
    const map = {
      agendaScreen: "Agenda",
      clientsScreen: "Klanten",
      servicesScreen: "Diensten",
      paymentMethodsScreen: "Betaalwijze",
      statisticsScreen: "Statistieken",
      revenueScreen: "Omzet",
      settingsScreen: "Instellingen",
      accountScreen: "Account"
    };

    switchScreen(state.previousMainScreen, map[state.previousMainScreen]);
  });

  document.getElementById("clientSearch").addEventListener("input", renderClients);
  document.getElementById("appointmentService").addEventListener("change", syncServiceDefaults);
  document.getElementById("settingsForm")?.addEventListener("submit", saveSettingsFromForm);
  document.getElementById("settingsNotificationsEnabled")?.addEventListener("change", async event => {
    const checked = Boolean(event.target.checked);
    const data = getData();
    data.settings = { ...getSettings(), notificationsEnabled: checked };
    saveData(data);
    if (checked) {
      await syncNotificationState({ requestPermission: true });
    } else {
      clearScheduledNotifications();
    }
    renderSettings();
  });

  document.getElementById("appointmentForm").addEventListener("submit", saveAppointmentFromForm);
  document.getElementById("deleteAppointmentBtn").addEventListener("click", deleteCurrentAppointment);

  document.getElementById("clientForm").addEventListener("submit", saveClientFromForm);

  document.getElementById("serviceForm").addEventListener("submit", saveServiceFromForm);
  document.getElementById("deleteServiceBtn").addEventListener("click", deleteCurrentService);

  document.getElementById("paymentMethodForm").addEventListener("submit", savePaymentMethodFromForm);
  document.getElementById("deletePaymentMethodBtn").addEventListener("click", deleteCurrentPaymentMethod);

  document.getElementById("paymentPopoverCloseBtn")?.addEventListener("click", closePaymentPopover);

  document.addEventListener("click", event => {
    const popover = document.getElementById("paymentPopover");
    if (!popover || popover.classList.contains("hidden")) return;
    if (popover.contains(event.target)) return;
    if (event.target.closest(".price-chip")) return;
    closePaymentPopover();
  });

  window.addEventListener("resize", () => {
    const popover = document.getElementById("paymentPopover");
    if (popover && !popover.classList.contains("hidden")) positionPaymentPopover();
  });

  document.getElementById("agendaList")?.addEventListener("scroll", closePaymentPopover, { passive: true });
  document.querySelector(".calendar-panel")?.addEventListener("scroll", closePaymentPopover, { passive: true });

  document.querySelectorAll("[data-close]").forEach(btn => {
    btn.addEventListener("click", () => closeDialog(btn.dataset.close));
  });

  document.getElementById("revenueDate").value = todayStr;

  ["revenuePeriodType", "revenueDate", "revenuePaymentStatusFilter", "revenuePaymentFilter"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", renderRevenue);
  });

  const revenueYearMain = document.getElementById("revenueYearMain");
  const revenueYearToggle = document.getElementById("revenueYearToggle");
  const revenueMonthMain = document.getElementById("revenueMonthMain");
  const revenueMonthToggle = document.getElementById("revenueMonthToggle");
  const revenueDayMain = document.getElementById("revenueDayMain");
  const revenueDayToggle = document.getElementById("revenueDayToggle");

  if (revenueYearMain) {
    revenueYearMain.addEventListener("click", () => {
      const anchor = document.getElementById("revenueDate").value || todayStr;
      setRevenuePeriod("year", anchor);
    });
  }

  if (revenueYearToggle) {
    revenueYearToggle.addEventListener("click", () => {
      openRevenueWheelPicker("year");
    });
  }

  if (revenueMonthMain) {
    revenueMonthMain.addEventListener("click", () => {
      const anchor = document.getElementById("revenueDate").value || todayStr;
      setRevenuePeriod("month", anchor);
    });
  }

  if (revenueMonthToggle) {
    revenueMonthToggle.addEventListener("click", () => {
      openRevenueWheelPicker("month");
    });
  }

  if (revenueDayMain) {
    revenueDayMain.addEventListener("click", () => {
      const anchor = document.getElementById("revenueDate").value || todayStr;
      setRevenuePeriod("day", anchor);
    });
  }

  if (revenueDayToggle) {
    revenueDayToggle.addEventListener("click", () => {
      openRevenueDayPicker();
    });
  }

  const revenueWheelPickerForm = document.getElementById("revenueWheelPickerForm");
  if (revenueWheelPickerForm) {
    revenueWheelPickerForm.addEventListener("submit", event => {
      event.preventDefault();
      applyRevenueWheelPickerSelection();
      closeDialog("revenueWheelPickerDialog");
    });
  }

  const revenueNativeDatePicker = document.getElementById("revenueNativeDatePicker");
  if (revenueNativeDatePicker) {
    revenueNativeDatePicker.addEventListener("change", event => {
      const pickedDate = event.target.value;
      if (!pickedDate) return;
      setRevenuePeriod("day", pickedDate);
    });
  }

  const revenueExportCsvBtn = document.getElementById("revenueExportCsvBtn");
  if (revenueExportCsvBtn) {
    revenueExportCsvBtn.addEventListener("click", downloadRevenueCsv);
  }

  const registerBtn = document.getElementById("registerBtn");
  const registerForm = document.getElementById("registerForm");
  const openRegisterBtn = document.getElementById("openRegisterDialogBtn");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const headerAccountBtn = document.getElementById("headerAccountBtn");

  const editProfileBtn = document.getElementById("editProfileBtn");
  const changePasswordBtn = document.getElementById("changePasswordBtn");
  const editProfileForm = document.getElementById("editProfileForm");
  const passwordForm = document.getElementById("passwordForm");

  if (registerBtn) registerBtn.addEventListener("click", registerAccount);
  if (registerForm) registerForm.addEventListener("submit", registerAccount);

  if (openRegisterBtn) {
    openRegisterBtn.addEventListener("click", () => {
      document.getElementById("registerDialog").showModal();
      setupPasswordToggleButtons();
    });
  }

  if (loginBtn) loginBtn.addEventListener("click", loginAccount);
  if (logoutBtn) logoutBtn.addEventListener("click", logoutAccount);
  if (editProfileBtn) editProfileBtn.addEventListener("click", openEditProfileDialog);
  if (changePasswordBtn) changePasswordBtn.addEventListener("click", openPasswordDialog);
  if (editProfileForm) editProfileForm.addEventListener("submit", saveProfileFromForm);
  if (passwordForm) passwordForm.addEventListener("submit", savePasswordFromForm);

  setupPasswordToggleButtons();

  if (headerAccountBtn) {
    headerAccountBtn.addEventListener("click", () => {
      switchScreen("accountScreen", "Account");
    });
  }

	supabaseClient.auth.onAuthStateChange(() => {
		scheduleAuthUiRefresh();
	});

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      triggerDueAppointmentNotifications();
    }
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data?.type === 'OPEN_SCREEN') {
        if (event.data.date) {
          state.selectedDate = event.data.date;
          const picked = new Date(`${event.data.date}T00:00:00`);
          state.currentYear = picked.getFullYear();
          state.currentMonth = picked.getMonth();
        }
        switchScreen(event.data.screen || 'agendaScreen', event.data.screen === 'statisticsScreen' ? 'Statistieken' : 'Agenda');
        rerenderAll();
      }
    });
  }
}


async function registerServiceWorker() {
	if ("serviceWorker" in navigator) {
	  try {
	    await navigator.serviceWorker.register("./sw.js");
	  } catch (error) {
	    console.error('Registratie service worker mislukt:', error);
	  }
	}
}

/* =========================
   LADEN VAN SUPABASE
=========================== */

async function loadCustomersFromSupabase() {
  const user = await getCurrentUser();
  if (!user) return [];

  const { data, error } = await supabaseClient
    .from("customers")
    .select("*")
    .eq("user_id", user.id)
    .order("first_name", { ascending: true });

  if (error) {
    console.error("Fout bij laden klanten:", error.message);
    return [];
  }

  return (data || []).map(c => ({
    id: c.id,
    firstName: c.first_name,
    lastName: c.last_name,
    phone: c.phone,
    email: c.email,
    note: c.note
  }));
}

async function loadPaymentMethodsFromSupabase() {
  const user = await getCurrentUser();
  if (!user) return [];

  let { data, error } = await supabaseClient
    .from("payment_methods")
    .select("id, name, sort_order")
    .eq("user_id", user.id)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    console.error("Fout bij laden betaalwijzen:", error.message);
    return [];
  }

  if (!data || !data.length) {
    const seedPayload = defaultPaymentMethods.map((method, index) => ({
      user_id: user.id,
      name: method.name,
      sort_order: index + 1
    }));

    const { data: inserted, error: insertError } = await supabaseClient
      .from("payment_methods")
      .insert(seedPayload)
      .select("id, name, sort_order");

    if (insertError) {
      console.error("Fout bij aanmaken standaard betaalwijzen:", insertError.message);
      return normalizePaymentMethods(defaultPaymentMethods);
    }

    data = inserted || [];
  }

  return normalizePaymentMethods((data || []).map(method => ({
    id: method.id,
    name: method.name,
    sortOrder: method.sort_order
  })));
}

async function loadServicesFromSupabase() {
  const user = await getCurrentUser();
  if (!user) return [];

  const { data, error } = await supabaseClient
    .from("services")
    .select("*")
    .eq("user_id", user.id)
    .order("name", { ascending: true });

  if (error) {
    console.error("Fout bij laden diensten:", error.message);
    return [];
  }

  return (data || []).map(s => ({
    id: s.id,
    name: s.name,
    duration: s.duration,
    price: Number(s.price || 0)
  }));
}

async function loadAppointmentsFromSupabase() {
  const user = await getCurrentUser();
  if (!user) return [];

  const { data, error } = await supabaseClient
    .from("appointments")
    .select("*")
    .eq("user_id", user.id)
    .order("appointment_date", { ascending: true })
    .order("appointment_time", { ascending: true });

  if (error) {
    console.error("Fout bij laden afspraken:", error.message);
    return [];
  }

  return (data || []).map(a => ({
    id: a.id,
    customerId: a.customer_id,
    serviceId: a.service_id,
    date: a.appointment_date,
    time: a.appointment_time ? String(a.appointment_time).slice(0, 5) : "",
    duration: a.duration,
    price: Number(a.price || 0),
    status: a.status,
    paid: Boolean(a.paid),
    paymentMethodName: a.payment_method_label ?? null
  }));
}

async function loadAllDataFromSupabase() {
  const customers = await loadCustomersFromSupabase();
  const services = await loadServicesFromSupabase();
  const paymentMethods = await loadPaymentMethodsFromSupabase();
  const appointments = await loadAppointmentsFromSupabase();
  const settings = await loadSettingsFromSupabase();

  saveData({
    customers,
    services,
    paymentMethods,
    appointments,
    settings
  });

  await syncNotificationState();
}

/* =========================
   STARTUP
========================= */

async function initAppData() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (user) {
        await loadAllDataFromSupabase();
    } else {
        seedData();
    }
}

async function startApp() {
	await registerServiceWorker();
	await initAppData();
	registerEvents();
	await syncAuthUI();
	rerenderAll();
	await syncNotificationState();

  const user = await getCurrentUser();

  if (user) {
    switchScreen("agendaScreen", "Agenda");
  } else {
    switchScreen("accountScreen", "Account");
  }
}

startApp();