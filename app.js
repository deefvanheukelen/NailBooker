const STORAGE_KEY = "salon_app_v43";
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
  clientLetter: ""
};

const monthNames = [
  "JANUARI", "FEBRUARI", "MAART", "APRIL", "MEI", "JUNI",
  "JULI", "AUGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DECEMBER"
];

const longMonthNames = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december"
];

const paymentMethods = ["cash", "payconiq", "bancontact", "overschrijving"];

function addDaysStr(dateStr, days) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return formatDateInput(d);
}

function seedData() {
  if (localStorage.getItem(STORAGE_KEY)) return;

  const data = {
    customers: [
      { id: 1, firstName: "Kim", lastName: "van Dijk", phone: "06 12345678", email: "kim@example.com", note: "Komt liefst in de voormiddag." },
      { id: 2, firstName: "Lotte", lastName: "van Dam", phone: "06 87654321", email: "lotte@example.com", note: "Nieuwe klant sinds februari." },
      { id: 3, firstName: "Loes", lastName: "Maas", phone: "06 11223344", email: "loes@example.com", note: "Verkiest luxe behandeling." },
      { id: 4, firstName: "Lisa", lastName: "Jansen", phone: "06 99887766", email: "lisa@example.com", note: "Wil graag een sms-herinnering." }
    ],
    services: [
      { id: 1, name: "Basis", duration: 60, price: 65 },
      { id: 2, name: "Luxe", duration: 90, price: 95 },
      { id: 3, name: "Kleuren", duration: 75, price: 85 }
    ],
    appointments: [
      { id: 1, customerId: 2, serviceId: 1, date: todayStr, time: "10:00", duration: 60, price: 65, status: "gepland", paid: false, paymentMethod: "" },
      { id: 2, customerId: 3, serviceId: 2, date: todayStr, time: "11:30", duration: 90, price: 95, status: "gepland", paid: false, paymentMethod: "" },
      { id: 3, customerId: 1, serviceId: 1, date: todayStr, time: "14:00", duration: 60, price: 65, status: "gepland", paid: true, paymentMethod: "cash" },
      { id: 4, customerId: 3, serviceId: 2, date: addDaysStr(todayStr, 1), time: "11:30", duration: 90, price: 95, status: "afgerond", paid: true, paymentMethod: "bancontact" },
      { id: 5, customerId: 1, serviceId: 1, date: addDaysStr(todayStr, 1), time: "14:00", duration: 60, price: 65, status: "gepland", paid: false, paymentMethod: "" },
      { id: 6, customerId: 4, serviceId: 3, date: addDaysStr(todayStr, 1), time: "16:00", duration: 75, price: 85, status: "no-show", paid: false, paymentMethod: "" }
    ]
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
  return items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
}

function customerById(data, id) {
  return data.customers.find(c => c.id === id);
}

function serviceById(data, id) {
  return data.services.find(s => s.id === id);
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
  } else {
    fab.style.display = "none";
  }
}

function switchScreen(screenId, title) {
  state.currentScreen = screenId;

  if (["agendaScreen", "clientsScreen", "servicesScreen", "revenueScreen"].includes(screenId)) {
    state.previousMainScreen = screenId;
  }

  document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.screen === screenId);
  });

  updateTopbar(screenId, title);
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
    cell.className = "day-cell" + (dateStr === state.selectedDate ? " selected" : "");
    cell.innerHTML = `<button class="day-button" aria-label="${dateStr}"></button><span class="day-number">${day}</span>`;

    if (appts.length) {
      const dots = document.createElement("div");
      dots.className = "day-dots";

      appts.slice(0, 4).forEach(() => {
        const i = document.createElement("i");
        dots.appendChild(i);
      });

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
    row.innerHTML = `
      <div class="time">${app.time}</div>
      <div>
        <div class="main-name">${customer ? fullName(customer) : "Onbekend"}</div>
        <div class="meta">${service ? service.name : ""} · ${app.status}${app.paid ? " · betaald" : ""}</div>
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
      openPaymentDialog(Number(btn.dataset.id));
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
    const count = data.appointments.filter(a => a.customerId === client.id).length;
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

function revenueFilteredAppointments() {
  const data = getData();
  const type = document.getElementById("revenuePeriodType").value;
  const anchor = document.getElementById("revenueDate").value || todayStr;
  const paymentStatusFilter = document.getElementById("revenuePaymentStatusFilter").value;
  const paymentFilter = document.getElementById("revenuePaymentFilter").value;
  const customerFilter = document.getElementById("revenueCustomerFilter").value;

  let filtered = [...data.appointments];

  if (type === "day") {
    filtered = filtered.filter(a => a.date === anchor);
  } else if (type === "week") {
    const bounds = weekBounds(anchor);
    filtered = filtered.filter(a => a.date >= bounds.start && a.date <= bounds.end);
  } else if (type === "month") {
    const prefix = anchor.slice(0, 7);
    filtered = filtered.filter(a => a.date.startsWith(prefix));
  } else if (type === "year") {
    const prefix = anchor.slice(0, 4);
    filtered = filtered.filter(a => a.date.startsWith(prefix));
  }

  if (paymentStatusFilter === "paid") filtered = filtered.filter(a => a.paid);
  if (paymentStatusFilter === "unpaid") filtered = filtered.filter(a => !a.paid);
  if (paymentFilter) filtered = filtered.filter(a => a.paymentMethod === paymentFilter);
  if (customerFilter) filtered = filtered.filter(a => String(a.customerId) === customerFilter);

  return filtered;
}

function renderRevenueFilters() {
  const data = getData();
  const paymentSel = document.getElementById("revenuePaymentFilter");
  const customerSel = document.getElementById("revenueCustomerFilter");
  const existingPayment = paymentSel.value;
  const existingCustomer = customerSel.value;

  paymentSel.innerHTML =
    `<option value="">Alle betaalmiddelen</option>` +
    paymentMethods.map(m => `<option value="${m}">${m}</option>`).join("");

  customerSel.innerHTML =
    `<option value="">Alle klanten</option>` +
    data.customers
      .sort((a, b) => fullName(a).localeCompare(fullName(b)))
      .map(c => `<option value="${c.id}">${fullName(c)}</option>`)
      .join("");

  paymentSel.value = existingPayment;
  customerSel.value = existingCustomer;
}

function renderRevenue() {
  renderRevenueFilters();

  const data = getData();
  const list = document.getElementById("paymentMethodList");
  const type = document.getElementById("revenuePeriodType").value;
  const anchor = document.getElementById("revenueDate").value || todayStr;
  const filtered = revenueFilteredAppointments();

  let title = "Overzicht";
  if (type === "day") title = `Omzet op ${formatLongDate(anchor)}`;
  if (type === "week") {
    const bounds = weekBounds(anchor);
    title = `Omzet week ${formatShortDate(bounds.start)} - ${formatShortDate(bounds.end)}`;
  }
  if (type === "month") {
    const d = new Date(anchor + "T00:00:00");
    title = `Omzet ${longMonthNames[d.getMonth()]} ${d.getFullYear()}`;
  }
  if (type === "year") title = `Omzet ${anchor.slice(0, 4)}`;

  document.getElementById("revenueTitle").textContent = title;

  const paid = filtered.filter(a => a.paid).reduce((sum, a) => sum + Number(a.price || 0), 0);
  const planned = filtered.filter(a => a.status !== "no-show").reduce((sum, a) => sum + Number(a.price || 0), 0);
  const open = filtered.filter(a => !a.paid && a.status !== "no-show").reduce((sum, a) => sum + Number(a.price || 0), 0);

  document.getElementById("plannedRevenue").textContent = euro(planned);
  document.getElementById("paidRevenue").textContent = euro(paid);
  document.getElementById("openRevenue").textContent = euro(open);

  if (!filtered.length) {
    list.innerHTML = `<div class="empty-state">Geen afspraken voor deze selectie.</div>`;
    return;
  }

  const byMethod = {};
  filtered.filter(a => a.paid).forEach(a => {
    const key = a.paymentMethod || "onbekend";
    byMethod[key] = (byMethod[key] || 0) + Number(a.price || 0);
  });

  const customerTotals = {};
  filtered.forEach(a => {
    const cust = customerById(data, a.customerId);
    const key = cust ? fullName(cust) : "Onbekend";
    customerTotals[key] = (customerTotals[key] || 0) + Number(a.price || 0);
  });

  list.innerHTML = "";

  const byMethodCard = document.createElement("div");
  byMethodCard.className = "revenue-card";
  byMethodCard.innerHTML =
    `<div class="detail-block"><div class="detail-label">Per betaalmethode</div></div>` +
    (
      Object.keys(byMethod).length
        ? Object.entries(byMethod).map(([method, amount]) => `
            <div class="detail-block">
              <div class="inline-header">
                <div class="detail-value">${method}</div>
                <div class="detail-value">${euro(amount)}</div>
              </div>
            </div>
          `).join("")
        : `<div class="detail-block"><div class="detail-value">Nog geen geregistreerde betalingen.</div></div>`
    );

  list.appendChild(byMethodCard);

  const byCustomerCard = document.createElement("div");
  byCustomerCard.className = "revenue-card";
  byCustomerCard.innerHTML =
    `<div class="detail-block"><div class="detail-label">Per klant</div></div>` +
    Object.entries(customerTotals)
      .sort((a, b) => b[1] - a[1])
      .map(([name, amount]) => `
        <div class="detail-block">
          <div class="inline-header">
            <div class="detail-value">${name}</div>
            <div class="detail-value">${euro(amount)}</div>
          </div>
        </div>
      `).join("");

  list.appendChild(byCustomerCard);
}

function openClientDetail(clientId) {
  state.selectedClientId = clientId;

  const data = getData();
  const client = customerById(data, clientId);
  const content = document.getElementById("clientDetailContent");

  const appts = data.appointments
    .filter(a => a.customerId === clientId)
    .sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`));

  content.innerHTML = `
    <div class="detail-card">
      <div class="detail-block">
        <div class="inline-header">
          <div>
            <div class="detail-label">Naam</div>
            <div class="detail-value">${fullName(client)}</div>
          </div>
          <button class="ghost-btn detail-action-btn" id="editClientBtn" type="button">Bewerk</button>
        </div>
      </div>

      <div class="detail-block">
        <div class="info-grid">
          <div>
            <div class="detail-label">Telefoon</div>
            <div class="detail-value">${client.phone || "-"}</div>
          </div>
          <div>
            <div class="detail-label">E-mail</div>
            <div class="detail-value">${client.email || "-"}</div>
          </div>
        </div>
      </div>

      <div class="detail-block">
        <div class="detail-label">Notitie</div>
        <div class="detail-value">${client.note || "-"}</div>
      </div>
    </div>

    <div class="detail-card">
      <div class="detail-block">
        <div class="inline-header">
          <div>
            <div class="detail-label">Afspraken</div>
            <div class="detail-value">${appts.length} totaal</div>
          </div>
          <button class="btn btn-primary detail-action-btn" id="newClientAppointmentBtn" type="button">Nieuwe afspraak</button>
        </div>
      </div>

      ${
        appts.length
          ? appts.map(app => {
              const service = serviceById(data, app.serviceId);
              return `
                <div class="detail-block">
                  <div class="inline-header">
                    <div>
                      <div class="detail-value">${formatShortDate(app.date)} · ${app.time}</div>
                      <div class="meta">
                        ${service ? service.name : ""} · ${app.status} · ${euro(app.price)}${app.paid ? " · " + app.paymentMethod : ""}
                      </div>
                    </div>
                    <button class="ghost-btn detail-action-btn from-detail-edit" data-id="${app.id}" type="button">Bewerk</button>
                  </div>
                </div>
              `;
            }).join("")
          : `<div class="detail-block"><div class="detail-value">Nog geen afspraken.</div></div>`
      }
    </div>
  `;

  document.getElementById("editClientBtn").addEventListener("click", () => openEditClientDialog(clientId));
  document.getElementById("newClientAppointmentBtn").addEventListener("click", () => openNewAppointmentDialog(clientId));

  content.querySelectorAll(".from-detail-edit").forEach(btn => {
    btn.addEventListener("click", () => openEditAppointmentDialog(Number(btn.dataset.id)));
  });

  switchScreen("clientDetailScreen", "Klant");
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
  const service = serviceById(data, Number(document.getElementById("appointmentService").value));

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
  const app = data.appointments.find(a => a.id === id);

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

  document.getElementById("deleteAppointmentBtn").style.visibility = "visible";
  document.getElementById("appointmentDialog").showModal();
}

function openPaymentDialog(id) {
  const data = getData();
  const app = data.appointments.find(a => a.id === id);

  document.getElementById("paymentAppointmentId").value = id;
  document.getElementById("paymentAmount").textContent = euro(app.price);
  document.getElementById("paymentMethod").value = app.paymentMethod || "cash";

  document.getElementById("paymentDialog").showModal();
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

  document.getElementById("serviceModalTitle").textContent = "Dienst bewerken";
  document.getElementById("serviceId").value = service.id;
  document.getElementById("serviceName").value = service.name;
  document.getElementById("serviceDuration").value = service.duration;
  document.getElementById("servicePrice").value = service.price;

  document.getElementById("deleteServiceBtn").style.visibility = "visible";
  document.getElementById("serviceDialog").showModal();
}

function saveAppointmentFromForm(event) {
  event.preventDefault();

  const data = getData();
  const id = Number(document.getElementById("appointmentId").value);

  const payload = {
    customerId: Number(document.getElementById("appointmentCustomer").value),
    date: document.getElementById("appointmentDate").value,
    time: document.getElementById("appointmentTime").value,
    serviceId: Number(document.getElementById("appointmentService").value),
    duration: Number(document.getElementById("appointmentDuration").value),
    price: Number(document.getElementById("appointmentPrice").value),
    status: document.getElementById("appointmentStatus").value
  };

  if (id) {
    Object.assign(data.appointments.find(a => a.id === id), payload);
  } else {
    data.appointments.push({
      id: nextId(data.appointments),
      ...payload,
      paid: false,
      paymentMethod: ""
    });
  }

  saveData(data);
  closeDialog("appointmentDialog");

  state.selectedDate = payload.date;
  const picked = new Date(payload.date + "T00:00:00");
  state.currentYear = picked.getFullYear();
  state.currentMonth = picked.getMonth();

  rerenderAll();
}

function deleteCurrentAppointment() {
  const id = Number(document.getElementById("appointmentId").value);
  if (!id) return;

  const data = getData();
  data.appointments = data.appointments.filter(a => a.id !== id);

  saveData(data);
  closeDialog("appointmentDialog");
  rerenderAll();
}

function saveClientFromForm(event) {
  event.preventDefault();

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
    data.customers.push({
      id: nextId(data.customers),
      ...payload
    });
  }

  saveData(data);
  closeDialog("clientDialog");
  renderAlphabetFilter();
  renderClients();
  renderRevenueFilters();

  if (state.selectedClientId) {
    openClientDetail(state.selectedClientId);
  }
}

function saveServiceFromForm(event) {
  event.preventDefault();

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
    data.services.push({
      id: nextId(data.services),
      ...payload
    });
  }

  saveData(data);
  closeDialog("serviceDialog");
  rerenderAll();
}

function deleteCurrentService() {
  const id = Number(document.getElementById("serviceId").value);
  if (!id) return;

  const data = getData();
  data.services = data.services.filter(s => s.id !== id);

  saveData(data);
  closeDialog("serviceDialog");
  rerenderAll();
}

function confirmPayment(event) {
  event.preventDefault();

  const data = getData();
  const id = Number(document.getElementById("paymentAppointmentId").value);
  const appointment = data.appointments.find(a => a.id === id);

  appointment.paid = true;
  appointment.paymentMethod = document.getElementById("paymentMethod").value;

  if (appointment.status === "gepland") {
    appointment.status = "afgerond";
  }

  saveData(data);
  closeDialog("paymentDialog");
  rerenderAll();
}

function markUnpaid() {
  const data = getData();
  const id = Number(document.getElementById("paymentAppointmentId").value);
  const appointment = data.appointments.find(a => a.id === id);

  appointment.paid = false;
  appointment.paymentMethod = "";

  saveData(data);
  closeDialog("paymentDialog");
  rerenderAll();
}

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
  document.getElementById(id).close();
}

function rerenderAll() {
  renderAlphabetFilter();
  renderCalendar();
  renderAgendaList();
  renderClients();
  renderServices();
  renderRevenue();

  if (state.selectedClientId && state.currentScreen === "clientDetailScreen") {
    openClientDetail(state.selectedClientId);
  }
}

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

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => switchScreen(btn.dataset.screen, btn.dataset.title));
  });

  document.getElementById("backBtn").addEventListener("click", () => {
    const map = {
      agendaScreen: "Agenda",
      clientsScreen: "Klanten",
      servicesScreen: "Diensten",
      revenueScreen: "Omzet"
    };
    switchScreen(state.previousMainScreen, map[state.previousMainScreen]);
  });

  document.getElementById("clientSearch").addEventListener("input", renderClients);
  document.getElementById("appointmentService").addEventListener("change", syncServiceDefaults);
  document.getElementById("appointmentForm").addEventListener("submit", saveAppointmentFromForm);
  document.getElementById("deleteAppointmentBtn").addEventListener("click", deleteCurrentAppointment);
  document.getElementById("clientForm").addEventListener("submit", saveClientFromForm);
  document.getElementById("serviceForm").addEventListener("submit", saveServiceFromForm);
  document.getElementById("deleteServiceBtn").addEventListener("click", deleteCurrentService);
  document.getElementById("paymentForm").addEventListener("submit", confirmPayment);
  document.getElementById("markUnpaidBtn").addEventListener("click", markUnpaid);

  document.querySelectorAll("[data-close]").forEach(btn => {
    btn.addEventListener("click", () => closeDialog(btn.dataset.close));
  });

  document.getElementById("revenueDate").value = todayStr;

  ["revenuePeriodType", "revenueDate", "revenuePaymentStatusFilter", "revenuePaymentFilter", "revenueCustomerFilter"].forEach(id => {
    document.getElementById(id).addEventListener("change", renderRevenue);
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(console.error);
  }
}

seedData();
registerEvents();
switchScreen("agendaScreen", "Agenda");
rerenderAll();
registerServiceWorker();