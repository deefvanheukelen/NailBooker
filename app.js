const STORAGE_KEY = "nailbooker_v1";
const AGENDA_FAB_MENU_SETTING_KEY = "nailbooker_agenda_fab_menu_enabled";
const today = new Date();

function formatDateInput(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const todayStr = formatDateInput(today);


const SUPPORTED_LANGUAGES = [
  { code: "nl-BE", label: "Nederlands" },
  { code: "en-GB", label: "English" },
  { code: "fr-FR", label: "Français" }
];

const SUPPORTED_CURRENCIES = [
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "USD", label: "Dollar", symbol: "$" },
  { code: "GBP", label: "Britse pond", symbol: "£" }
];

const DEFAULT_LANGUAGE = "nl-BE";
const DEFAULT_CURRENCY = "EUR";

const i18n = {
  "nl-BE": {
    agenda: "Agenda", revenue: "Omzet", clients: "Klanten", services: "Diensten", paymentMethods: "Betaalwijze", statistics: "Statistieken", settings: "Instellingen", support: "Support", account: "Account",
    save: "Opslaan", cancel: "Annuleren", register: "Registreren", login: "Inloggen", logout: "Uitloggen", editProfile: "Gegevens wijzigen", changePassword: "Wachtwoord wijzigen",
    language: "Taal", currency: "Valuta", appPreferences: "App-voorkeuren", currencyChangeWarning: "Nieuwe afspraken gebruiken voortaan deze valuta. Bestaande afspraken en omzet blijven in hun oorspronkelijke munteenheid staan en worden niet omgerekend.",
    firstName: "Voornaam", lastName: "Naam", salonName: "Salonnaam", vatNumber: "BTW-nummer", email: "E-mail", password: "Wachtwoord", confirmPassword: "Bevestig wachtwoord", optional: "optioneel",
    noRevenueForSelection: "Geen omzetgegevens voor deze selectie.", paid: "Betaald", unpaid: "Onbetaald", paymentMethod: "Betaalwijze", unknown: "Onbekend", settingsSaved: "Instellingen opgeslagen.", settingsSavedDevice: "Instellingen opgeslagen op dit toestel.", saveSettings: "Instellingen opslaan", ok: "OK", confirmTitle: "Bevestiging", confirm: "Bevestigen"
  },
  "en-GB": {
    agenda: "Agenda", revenue: "Revenue", clients: "Clients", services: "Services", paymentMethods: "Payment methods", statistics: "Statistics", settings: "Settings", support: "Support", account: "Account",
    save: "Save", cancel: "Cancel", register: "Register", login: "Log in", logout: "Log out", editProfile: "Edit details", changePassword: "Change password",
    language: "Language", currency: "Currency", appPreferences: "App preferences", currencyChangeWarning: "New appointments will use this currency from now on. Existing appointments and revenue remain in their original currency and are not converted.",
    firstName: "First name", lastName: "Last name", salonName: "Salon name", vatNumber: "VAT number", email: "Email", password: "Password", confirmPassword: "Confirm password", optional: "optional",
    noRevenueForSelection: "No revenue data for this selection.", paid: "Paid", unpaid: "Unpaid", paymentMethod: "Payment method", unknown: "Unknown", settingsSaved: "Settings saved.", settingsSavedDevice: "Settings saved on this device.", saveSettings: "Save settings", ok: "OK", confirmTitle: "Confirmation", confirm: "Confirm"
  },
  "fr-FR": {
    agenda: "Agenda", revenue: "Chiffre d’affaires", clients: "Clients", services: "Services", paymentMethods: "Modes de paiement", statistics: "Statistiques", settings: "Paramètres", support: "Support", account: "Compte",
    save: "Enregistrer", cancel: "Annuler", register: "S’inscrire", login: "Connexion", logout: "Déconnexion", editProfile: "Modifier les données", changePassword: "Modifier le mot de passe",
    language: "Langue", currency: "Devise", appPreferences: "Préférences de l’application", currencyChangeWarning: "Les nouveaux rendez-vous utiliseront désormais cette devise. Les rendez-vous et revenus existants restent dans leur devise d’origine et ne sont pas convertis.",
    firstName: "Prénom", lastName: "Nom", salonName: "Nom du salon", vatNumber: "Numéro de TVA", email: "E-mail", password: "Mot de passe", confirmPassword: "Confirmer le mot de passe", optional: "optionnel",
    noRevenueForSelection: "Aucune donnée de chiffre d’affaires pour cette sélection.", paid: "Payé", unpaid: "Impayé", paymentMethod: "Mode de paiement", unknown: "Inconnu", settingsSaved: "Paramètres enregistrés.", settingsSavedDevice: "Paramètres enregistrés sur cet appareil.", saveSettings: "Enregistrer les paramètres", ok: "OK", confirmTitle: "Confirmation", confirm: "Confirmer"
  }
};

const i18nExtra = {
  "nl-BE": {
    planning: "Planning", notifications: "Meldingen", extras: "Interessante extra's", defaultBreak: "Standaard pauze tussen 2 afspraken (min)", overlapWarnings: "Overlapwaarschuwingen", overlapWarningsHint: "Waarschuw als een afspraak overlapt met een bestaande afspraak, rekening houdend met duur en pauze.", enableNotifications: "Meldingen inschakelen", enableNotificationsHint: "Voorbereid voor afspraakherinneringen in de app.", enableAgendaFabMenu: "Tab-menu activeren", enableAgendaFabMenuHint: "Toon rond de + knop snelle knoppen voor afspraak, kost, taak, klant, dienst en betaalwijze.", reminderBefore: "Herinnering vóór afspraak", savePending: "Instellingen opslaan...", notificationsOff: "Meldingen zijn uitgeschakeld.", notificationsActive: "Meldingen zijn actief op dit toestel zolang browser of app meldingen ondersteunt.", notificationsBlocked: "Meldingen zijn geblokkeerd in je browserinstellingen.", notificationsUnsupported: "Deze browser ondersteunt geen webmeldingen.", notificationsPermissionHint: "Schakel meldingen in en geef toestemming om herinneringen te tonen.", appointmentsOn: "Afspraken op", noAppointmentsOnDay: "Geen afspraken op deze dag.", noClientsFound: "Geen klanten gevonden.", noPhone: "Geen gsm", appointmentSingular: "afspraak", appointmentPlural: "afspraken", noActiveServices: "Nog geen actieve diensten.", inactive: "inactief", showInactiveServices: "Toon inactieve diensten", allPaymentMethods: "Alle betaalwijzen", allStatuses: "Alle statussen", day: "Dag", week: "Week", month: "Maand", year: "Jaar", today: "Vandaag", total: "Totaal", revenueOn: "Omzet op", revenueReport: "Omzetrapport", paymentMethodTitle: "Betaalwijze", unknownCustomer: "Onbekende klant", chooseMonth: "Maand kiezen", choose: "Kies", newAppointment: "Nieuwe afspraak", editAppointment: "Afspraak bewerken", customer: "Klant", date: "Datum", time: "Tijd", service: "Dienst", duration: "Duur (min)", price: "Prijs", status: "Status", planned: "Gepland", completed: "Afgerond", newClient: "Nieuwe klant", phone: "Telefoon", note: "Notitie", appointmentRemarks: "Opmerkingen", newService: "Nieuwe dienst", serviceName: "Naam dienst", newPaymentMethod: "Nieuwe betaalwijze", paymentMethodName: "Naam betaalwijze", editProfileTitle: "Profiel bewerken", currentPassword: "Huidig wachtwoord", newPassword: "Nieuw wachtwoord", message: "Melding", registerHere: "Nog geen account? Registreer hier"
  },
  "en-GB": {
    planning: "Planning", notifications: "Notifications", extras: "Useful extras", defaultBreak: "Default break between 2 appointments (min)", overlapWarnings: "Overlap warnings", overlapWarningsHint: "Warn when an appointment overlaps with an existing appointment, taking duration and break time into account.", enableNotifications: "Enable notifications", enableNotificationsHint: "Prepared for appointment reminders in the app.", enableAgendaFabMenu: "Enable tab menu", enableAgendaFabMenuHint: "Show quick buttons around the + button for appointment, cost, task, client, service and payment method.", reminderBefore: "Reminder before appointment", savePending: "Saving settings...", notificationsOff: "Notifications are disabled.", notificationsActive: "Notifications are active on this device while the browser or app supports notifications.", notificationsBlocked: "Notifications are blocked in your browser settings.", notificationsUnsupported: "This browser does not support web notifications.", notificationsPermissionHint: "Enable notifications and allow permission to show reminders.", appointmentsOn: "Appointments on", noAppointmentsOnDay: "No appointments on this day.", noClientsFound: "No clients found.", noPhone: "No mobile", appointmentSingular: "appointment", appointmentPlural: "appointments", noActiveServices: "No active services yet.", inactive: "inactive", showInactiveServices: "Show inactive services", allPaymentMethods: "All payment methods", allStatuses: "All statuses", day: "Day", week: "Week", month: "Month", year: "Year", today: "Today", total: "Total", revenueOn: "Revenue on", revenueReport: "Revenue report", paymentMethodTitle: "Payment method", unknownCustomer: "Unknown client", chooseMonth: "Choose month", choose: "Choose", newAppointment: "New appointment", editAppointment: "Edit appointment", customer: "Client", date: "Date", time: "Time", service: "Service", duration: "Duration (min)", price: "Price", status: "Status", planned: "Planned", completed: "Completed", newClient: "New client", phone: "Phone", note: "Note", appointmentRemarks: "Remarks", newService: "New service", serviceName: "Service name", newPaymentMethod: "New payment method", paymentMethodName: "Payment method name", editProfileTitle: "Edit profile", currentPassword: "Current password", newPassword: "New password", message: "Message", registerHere: "No account yet? Register here"
  },
  "fr-FR": {
    planning: "Planning", notifications: "Notifications", extras: "Extras utiles", defaultBreak: "Pause standard entre 2 rendez-vous (min)", overlapWarnings: "Avertissements de chevauchement", overlapWarningsHint: "Avertir lorsqu’un rendez-vous chevauche un rendez-vous existant, en tenant compte de la durée et de la pause.", enableNotifications: "Activer les notifications", enableNotificationsHint: "Prévu pour les rappels de rendez-vous dans l’application.", enableAgendaFabMenu: "Activer le menu d’onglets", enableAgendaFabMenuHint: "Afficher autour du bouton + des raccourcis pour rendez-vous, frais, tâche, client, service et mode de paiement.", reminderBefore: "Rappel avant le rendez-vous", savePending: "Enregistrement des paramètres...", notificationsOff: "Les notifications sont désactivées.", notificationsActive: "Les notifications sont actives sur cet appareil tant que le navigateur ou l’application les prend en charge.", notificationsBlocked: "Les notifications sont bloquées dans les paramètres de votre navigateur.", notificationsUnsupported: "Ce navigateur ne prend pas en charge les notifications web.", notificationsPermissionHint: "Activez les notifications et autorisez-les pour afficher les rappels.", appointmentsOn: "Rendez-vous le", noAppointmentsOnDay: "Aucun rendez-vous ce jour-là.", noClientsFound: "Aucun client trouvé.", noPhone: "Pas de GSM", appointmentSingular: "rendez-vous", appointmentPlural: "rendez-vous", noActiveServices: "Aucun service actif pour le moment.", inactive: "inactif", showInactiveServices: "Afficher les services inactifs", allPaymentMethods: "Tous les modes de paiement", allStatuses: "Tous les statuts", day: "Jour", week: "Semaine", month: "Mois", year: "Année", today: "Aujourd’hui", total: "Total", revenueOn: "Chiffre d’affaires le", revenueReport: "Rapport du chiffre d’affaires", paymentMethodTitle: "Mode de paiement", unknownCustomer: "Client inconnu", chooseMonth: "Choisir le mois", choose: "Choisir", newAppointment: "Nouveau rendez-vous", editAppointment: "Modifier le rendez-vous", customer: "Client", date: "Date", time: "Heure", service: "Service", duration: "Durée (min)", price: "Prix", status: "Statut", planned: "Planifié", completed: "Terminé", newClient: "Nouveau client", phone: "Téléphone", note: "Note", appointmentRemarks: "Remarques", newService: "Nouveau service", serviceName: "Nom du service", newPaymentMethod: "Nouveau mode de paiement", paymentMethodName: "Nom du mode de paiement", editProfileTitle: "Modifier le profil", currentPassword: "Mot de passe actuel", newPassword: "Nouveau mot de passe", message: "Message", registerHere: "Pas encore de compte ? Inscrivez-vous ici"
  }
};
Object.keys(i18nExtra).forEach(lang => Object.assign(i18n[lang], i18nExtra[lang]));

const i18nMore = {
  "nl-BE": {
    mondayShort:"Ma", tuesdayShort:"Di", wednesdayShort:"Wo", thursdayShort:"Do", fridayShort:"Vr", saturdayShort:"Za", sundayShort:"Zo",
    searchClientPlaceholder:"Zoek klant...", searchAppointmentCustomerPlaceholder:"Zoek op naam, telefoon of e-mail...", searchServicePlaceholder:"Zoek op beschrijving of kernwoord",
    delete:"Verwijderen", edit:"Bewerk", editClient:"Klant bewerken", editService:"Dienst bewerken", editPaymentMethod:"Betaalwijze bewerken", reactivateService:"Dienst opnieuw actief zetten", reactivateServiceHint:"De dienst verschijnt opnieuw in de actieve dienstenlijst en bij nieuwe afspraken.",
    customerNumber:"Klantnummer", appointments:"Afspraken", totalLower:"totaal", noAppointmentsYet:"Nog geen afspraken.", noPaymentMethods:"Nog geen betaalwijzen.", paymentSingular:"betaling", paymentPlural:"betalingen",
    customerCount:"Aantal klanten", pastAppointments:"Afgeronde afspraken", futureAppointments:"Geplande afspraken", totalRevenueUntilToday:"Totale omzet tot vandaag", chosenServices:"Gekozen behandelingen", revenueByService:"Omzet per behandeling", chosenPaymentMethod:"Gekozen betaalwijze", topCustomers:"Top klanten", all:"Alle", noCustomerStats:"Nog geen klantgegevens beschikbaar.", more:"Meer...", less:"Minder",
    serviceNameRequired:"Geef een naam voor de dienst in.", duplicateServiceTitle:"Dubbele dienstnaam", saveAnyway:"Toch opslaan", saveFailed:"Opslaan mislukt", duplicateServiceMessage:"Er bestaat al een dienst met de naam \"{name}\".\n\nWil je toch opslaan? Dan wordt deze dienst opgeslagen als \"{uniqueName}\".", chooseDate:"Kies datum", chooseTime:"Kies tijd", chooseCustomer:"Kies een klant...", chooseService:"Kies een dienst...", choosePaymentMethod:"Kies een betaalwijze...", chooseConfirm:"Kies"
  },
  "en-GB": {
    mondayShort:"Mon", tuesdayShort:"Tue", wednesdayShort:"Wed", thursdayShort:"Thu", fridayShort:"Fri", saturdayShort:"Sat", sundayShort:"Sun",
    searchClientPlaceholder:"Search client...", searchAppointmentCustomerPlaceholder:"Search by name, phone or email...", searchServicePlaceholder:"Search service...",
    delete:"Delete", edit:"Edit", editClient:"Edit client", editService:"Edit service", editPaymentMethod:"Edit payment method", reactivateService:"Reactivate service", reactivateServiceHint:"The service will appear again in the active services list and for new appointments.",
    customerNumber:"Client number", appointments:"Appointments", totalLower:"total", noAppointmentsYet:"No appointments yet.", noPaymentMethods:"No payment methods yet.", paymentSingular:"payment", paymentPlural:"payments",
    customerCount:"Number of clients", pastAppointments:"Completed appointments", futureAppointments:"Planned appointments", totalRevenueUntilToday:"Total revenue until today", chosenServices:"Selected services", revenueByService:"Revenue per service", chosenPaymentMethod:"Selected payment method", topCustomers:"Top clients", all:"All", noCustomerStats:"No client data available yet.", more:"More...", less:"Less",
    serviceNameRequired:"Enter a service name.", duplicateServiceTitle:"Duplicate service name", saveAnyway:"Save anyway", saveFailed:"Save failed", duplicateServiceMessage:"A service named \"{name}\" already exists.\n\nDo you still want to save it? This service will be saved as \"{uniqueName}\".", chooseDate:"Choose date", chooseTime:"Choose time", chooseCustomer:"Choose a client...", chooseService:"Choose a service...", choosePaymentMethod:"Choose a payment method...", chooseConfirm:"Choose"
  },
  "fr-FR": {
    mondayShort:"Lu", tuesdayShort:"Ma", wednesdayShort:"Me", thursdayShort:"Je", fridayShort:"Ve", saturdayShort:"Sa", sundayShort:"Di",
    searchClientPlaceholder:"Rechercher un client...", searchAppointmentCustomerPlaceholder:"Rechercher par nom, téléphone ou e-mail...", searchServicePlaceholder:"Rechercher un service...",
    delete:"Supprimer", edit:"Modifier", editClient:"Modifier le client", editService:"Modifier le service", editPaymentMethod:"Modifier le mode de paiement", reactivateService:"Réactiver le service", reactivateServiceHint:"Le service réapparaîtra dans la liste des services actifs et pour les nouveaux rendez-vous.",
    customerNumber:"Numéro client", appointments:"Rendez-vous", totalLower:"au total", noAppointmentsYet:"Pas encore de rendez-vous.", noPaymentMethods:"Aucun mode de paiement pour le moment.", paymentSingular:"paiement", paymentPlural:"paiements",
    customerCount:"Nombre de clients", pastAppointments:"Rendez-vous terminés", futureAppointments:"Rendez-vous planifiés", totalRevenueUntilToday:"Chiffre d’affaires total jusqu’à aujourd’hui", chosenServices:"Soins choisis", revenueByService:"Chiffre d’affaires par soin", chosenPaymentMethod:"Mode de paiement choisi", topCustomers:"Meilleurs clients", all:"Tous", noCustomerStats:"Aucune donnée client disponible pour le moment.", more:"Plus...", less:"Moins",
    serviceNameRequired:"Indiquez un nom de service.", duplicateServiceTitle:"Nom de service en double", saveAnyway:"Enregistrer quand même", saveFailed:"Échec de l’enregistrement", duplicateServiceMessage:"Un service nommé \"{name}\" existe déjà.\n\nVoulez-vous quand même l’enregistrer ? Ce service sera enregistré sous \"{uniqueName}\".", chooseDate:"Choisir la date", chooseTime:"Choisir l’heure", chooseCustomer:"Choisir un client...", chooseService:"Choisir un service...", choosePaymentMethod:"Choisir un mode de paiement...", chooseConfirm:"Choisir"
  }
};
Object.keys(i18nMore).forEach(lang => Object.assign(i18n[lang], i18nMore[lang]));

const i18nTodo = {
  "nl-BE": { todo: "To Do", newTodo: "Nieuwe taak", editTodo: "Taak bewerken", todoTitle: "Titel", todoDescription: "Omschrijving", addBullet: "Bullet toevoegen", noTodos: "Nog geen taken.", markDone: "Afvinken", markOpen: "Terug openzetten", completed: "Afgewerkt", open: "Open" },
  "en-GB": { todo: "To Do", newTodo: "New task", editTodo: "Edit task", todoTitle: "Title", todoDescription: "Description", addBullet: "Add bullet", noTodos: "No tasks yet.", markDone: "Mark done", markOpen: "Reopen", completed: "Done", open: "Open" },
  "fr-FR": { todo: "To Do", newTodo: "Nouvelle tâche", editTodo: "Modifier la tâche", todoTitle: "Titre", todoDescription: "Description", addBullet: "Ajouter une puce", noTodos: "Aucune tâche pour le moment.", markDone: "Terminer", markOpen: "Rouvrir", completed: "Terminée", open: "Ouverte" }
};
Object.keys(i18nTodo).forEach(lang => Object.assign(i18n[lang], i18nTodo[lang]));

const i18nCosts = {
  "nl-BE": { costs: "Kosten", newCost: "Nieuwe kost", editCost: "Kost bewerken", costDescription: "Omschrijving", costDate: "Datum", costAmountInclVat: "Bedrag incl. btw", vat: "Btw", standardCost: "Standaardkost", noCosts: "Nog geen kosten.", saveAsStandardCostQuestion: "Wil je deze kost opslaan als standaardkost zodat je ze later snel opnieuw kunt selecteren?", costSaved: "Kost opgeslagen.", costDeleted: "Kost verwijderd.", chooseStandardCost: "Zoek of kies een standaardkost...", totalInclVat: "Totaal incl. btw", totalExclVat: "Totaal excl. btw", standardCosts: "Standaardkosten", noStandardCosts: "Nog geen standaardkosten.", editStandardCost: "Standaardkost aanpassen", deleteStandardCostConfirm: "Deze standaardkost verwijderen?" },
  "en-GB": { costs: "Costs", newCost: "New cost", editCost: "Edit cost", costDescription: "Description", costDate: "Date", costAmountInclVat: "Amount incl. VAT", vat: "VAT", standardCost: "Standard cost", noCosts: "No costs yet.", saveAsStandardCostQuestion: "Do you want to save this cost as a standard cost so you can quickly select it again later?", costSaved: "Cost saved.", costDeleted: "Cost deleted.", chooseStandardCost: "Search or choose a standard cost...", totalInclVat: "Total incl. VAT", totalExclVat: "Total excl. VAT", standardCosts: "Standard costs", noStandardCosts: "No standard costs yet.", editStandardCost: "Edit standard cost", deleteStandardCostConfirm: "Delete this standard cost?" },
  "fr-FR": { costs: "Frais", newCost: "Nouveau frais", editCost: "Modifier le frais", costDescription: "Description", costDate: "Date", costAmountInclVat: "Montant TVAC", vat: "TVA", standardCost: "Frais standard", noCosts: "Aucun frais pour le moment.", saveAsStandardCostQuestion: "Voulez-vous enregistrer ce frais comme frais standard afin de pouvoir le sélectionner rapidement plus tard ?", costSaved: "Frais enregistré.", costDeleted: "Frais supprimé.", chooseStandardCost: "Rechercher ou choisir un frais standard...", totalInclVat: "Total TVAC", totalExclVat: "Total HTVA", standardCosts: "Frais standard", noStandardCosts: "Aucun frais standard pour le moment.", editStandardCost: "Modifier le frais standard", deleteStandardCostConfirm: "Supprimer ce frais standard ?" }
};
Object.keys(i18nCosts).forEach(lang => Object.assign(i18n[lang], i18nCosts[lang]));


let currentProfilePreferences = { language: DEFAULT_LANGUAGE, currency: DEFAULT_CURRENCY };

function normalizeLanguage(code) {
  return SUPPORTED_LANGUAGES.some(item => item.code === code) ? code : DEFAULT_LANGUAGE;
}

function normalizeCurrency(code) {
  return SUPPORTED_CURRENCIES.some(item => item.code === code) ? code : DEFAULT_CURRENCY;
}

function getCurrentLanguage() {
  return normalizeLanguage(currentProfilePreferences.language || getData()?.settings?.language || DEFAULT_LANGUAGE);
}

function getCurrentCurrency() {
  return normalizeCurrency(currentProfilePreferences.currency || getData()?.settings?.currency || DEFAULT_CURRENCY);
}

function t(key) {
  const lang = getCurrentLanguage();
  return i18n[lang]?.[key] || i18n[DEFAULT_LANGUAGE]?.[key] || key;
}

function getCurrencyLabel(code) {
  const currency = SUPPORTED_CURRENCIES.find(item => item.code === normalizeCurrency(code));
  return currency ? `${currency.label} (${currency.code})` : code;
}

function buildLanguageOptions(selected = DEFAULT_LANGUAGE) {
  const safe = normalizeLanguage(selected);
  return SUPPORTED_LANGUAGES.map(item => `<option value="${item.code}"${item.code === safe ? " selected" : ""}>${item.label}</option>`).join("");
}

function buildCurrencyOptions(selected = DEFAULT_CURRENCY) {
  const safe = normalizeCurrency(selected);
  return SUPPORTED_CURRENCIES.map(item => `<option value="${item.code}"${item.code === safe ? " selected" : ""}>${item.label} (${item.symbol})</option>`).join("");
}

function normalizePaymentReferencePrefix(value) {
  const text = String(value || "").trim();
  return text === "Idle & Ease" ? "" : text;
}

function updateStaticI18n() {
  document.documentElement.lang = getCurrentLanguage().slice(0, 2);

  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
  });

  const setText = (selector, key) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = t(key);
  };
  const setHtml = (selector, html) => {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = html;
  };

  const selectorMap = [
    ["#jumpToTodayBtn", "today"],
    ['label[for="settingsDefaultBreakMinutes"]', "defaultBreak"],
    ['label[for="settingsReminderMinutes"]', "reminderBefore"],
    ['label[for="loginEmail"]', "email"],
    ['label[for="loginPassword"]', "password"],
    ['#openRegisterDialogBtn', "registerHere"],
    ['#monthPickerDialog h3', "chooseMonth"],
    ['label[for="monthSelect"]', "month"],
    ['label[for="yearSelect"]', "year"],
    ['label[for="appointmentCustomerSearch"]', "customer"],
    ['label[for="appointmentDate"]', "date"],
    ['label[for="appointmentTime"]', "time"],
    ['label[for="appointmentServiceSearch"]', "service"],
    ['label[for="appointmentDuration"]', "duration"],
    ['label[for="appointmentPrice"]', "price"],
    ['label[for="appointmentStatus"]', "status"],
    ['label[for="appointmentRemarks"]', "appointmentRemarks"],
    ['label[for="clientFirstName"]', "firstName"],
    ['label[for="clientLastName"]', "lastName"],
    ['label[for="clientPhone"]', "phone"],
    ['label[for="clientEmail"]', "email"],
    ['label[for="clientNote"]', "note"],
    ['label[for="serviceName"]', "serviceName"],
    ['label[for="serviceDuration"]', "duration"],
    ['label[for="servicePrice"]', "price"],
    ['label[for="paymentMethodName"]', "paymentMethodName"],
    ['label[for="registerFirstName"]', "firstName"],
    ['label[for="registerLastName"]', "lastName"],
    ['label[for="registerEmail"]', "email"],
    ['label[for="registerPassword"]', "password"],
    ['label[for="registerPasswordConfirm"]', "confirmPassword"],
    ['label[for="editFirstName"]', "firstName"],
    ['label[for="editLastName"]', "lastName"],
    ['label[for="currentPassword"]', "currentPassword"],
    ['label[for="newPassword"]', "newPassword"],
    ['label[for="confirmPassword"]', "confirmPassword"],
    ['#passwordDialog h3', "changePassword"],
    ['#appMessageDialogTitle', "message"],
    ['#appointmentWheelPickerTitle', "choose"],
    ['#revenueWheelPickerTitle', "choose"]
  ];
  selectorMap.forEach(([selector, key]) => setText(selector, key));

  setHtml('label[for="registerSalonName"]', `${t("salonName")} <span class="optional-label">${t("optional")}</span>`);
  setHtml('label[for="registerVatNumber"]', `${t("vatNumber")} <span class="optional-label">${t("optional")}</span>`);
  setHtml('label[for="editSalonName"]', `${t("salonName")} <span class="optional-label">${t("optional")}</span>`);
  setHtml('label[for="editVatNumber"]', `${t("vatNumber")} <span class="optional-label">${t("optional")}</span>`);

  document.querySelectorAll(".account-data-label").forEach(el => {
    const text = el.textContent.trim().toLowerCase();
    const map = {
      "voornaam": "firstName", "first name": "firstName", "prénom": "firstName",
      "familienaam": "lastName", "naam": "lastName", "last name": "lastName", "nom": "lastName",
      "salonnaam": "salonName", "salon name": "salonName", "nom du salon": "salonName",
      "btw-nummer": "vatNumber", "vat number": "vatNumber", "numéro de tva": "vatNumber",
      "e-mail": "email", "email": "email",
      "wachtwoord": "password", "password": "password", "mot de passe": "password"
    };
    const key = map[text];
    if (key) el.textContent = t(key);
  });

  renderServiceAlphabetFilter();

  const revenuePeriodKeys = ["day", "week", "month", "year"];
  document.querySelectorAll(".revenue-period-title").forEach((el, index) => {
    const key = revenuePeriodKeys[index];
    if (key) el.textContent = t(key);
  });

  const revenueAppointmentLabels = [
    [".revenue-summary-appointments .revenue-main-label", "appointments"],
    [".revenue-summary-completed .revenue-main-label", "completed"],
    [".revenue-summary-planned-count .revenue-main-label", "planned"]
  ];
  revenueAppointmentLabels.forEach(([selector, key]) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = t(key);
  });

  const revenueMoneyLabels = [
    [".revenue-summary-total .revenue-main-label", "total"],
    [".revenue-summary-paid .revenue-main-label", "paid"],
    [".revenue-summary-unpaid .revenue-main-label", "unpaid"]
  ];
  revenueMoneyLabels.forEach(([selector, key]) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = t(key);
  });

  const settingsLabels = document.querySelectorAll("#settingsScreen .detail-label");
  [[1, "planning"], [2, "notifications"]].forEach(([index, key]) => {
    if (settingsLabels[index]) settingsLabels[index].textContent = t(key);
  });

  const authLabel = document.querySelector("#accountGuestView .detail-label");
  if (authLabel) authLabel.textContent = t("login");

  const statusFilter = document.getElementById("revenuePaymentStatusFilter");
  if (statusFilter) {
    const currentValue = statusFilter.value;
    statusFilter.innerHTML = `
      <option value="">${t("allStatuses")}</option>
      <option value="paid">${t("paid")}</option>
      <option value="unpaid">${t("unpaid")}</option>
    `;
    statusFilter.value = currentValue;
  }

  const periodType = document.getElementById("revenuePeriodType");
  if (periodType) {
    const currentValue = periodType.value;
    periodType.innerHTML = `
      <option value="day">${t("day")}</option>
      <option value="week">${t("week")}</option>
      <option value="month">${t("month")}</option>
      <option value="year">${t("year")}</option>
    `;
    periodType.value = currentValue;
  }

  const appointmentStatus = document.getElementById("appointmentStatus");
  if (appointmentStatus) {
    const currentValue = appointmentStatus.value;
    appointmentStatus.innerHTML = `
      <option value="gepland">${t("planned")}</option>
      <option value="afgerond">${t("completed")}</option>
      <option value="no-show">No-show</option>
    `;
    appointmentStatus.value = currentValue;
  }

  const weekdayKeys = ["mondayShort", "tuesdayShort", "wednesdayShort", "thursdayShort", "fridayShort", "saturdayShort", "sundayShort"];
  document.querySelectorAll(".weekday-row span").forEach((el, index) => {
    if (weekdayKeys[index]) el.textContent = t(weekdayKeys[index]);
  });

  [["#clientSearch", "searchClientPlaceholder"], ["#serviceSearch", "searchServicePlaceholder"], ["#appointmentCustomerSearch", "searchAppointmentCustomerPlaceholder"], ["#appointmentServiceSearch", "searchServicePlaceholder"]].forEach(([selector, key]) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute("placeholder", t(key));
  });

  [["#loginBtn", "login"], ["#logoutBtn", "logout"], ["#editProfileBtn", "editProfile"], ["#changePasswordBtn", "changePassword"], ["#deleteAppointmentBtn", "delete"], ["#deleteServiceBtn", "delete"], ["#deletePaymentMethodBtn", "delete"], ["#appointmentDateDisplayBtn", "chooseDate"], ["#appointmentTimeDisplayBtn", "chooseTime"]].forEach(([selector, key]) => setText(selector, key));

  document.querySelectorAll('button[data-close="appointmentDialog"], button[data-close="clientDialog"], button[data-close="serviceDialog"], button[data-close="paymentMethodDialog"], button[data-close="passwordDialog"], button[data-close="editProfileDialog"]').forEach(btn => {
    if (!btn.classList.contains("icon-btn")) btn.textContent = t("cancel");
  });
  document.querySelectorAll('#appointmentForm button[type="submit"], #clientForm button[type="submit"], #serviceForm button[type="submit"], #paymentMethodForm button[type="submit"], #passwordForm button[type="submit"], #editProfileForm button[type="submit"]').forEach(btn => {
    btn.textContent = t("save");
  });

  const overlapLabel = document.querySelector('label[for="settingsOverlapWarningsEnabled"]');
  if (overlapLabel) {
    const strong = overlapLabel.querySelector('strong');
    const small = overlapLabel.querySelector('small');
    if (strong) strong.textContent = t("overlapWarnings");
    if (small) small.textContent = t("overlapWarningsHint");
  }
  const notificationLabel = document.querySelector('label[for="settingsNotificationsEnabled"]');
  if (notificationLabel) {
    const strong = notificationLabel.querySelector('strong');
    const small = notificationLabel.querySelector('small');
    if (strong) strong.textContent = t("enableNotifications");
    if (small) small.textContent = t("enableNotificationsHint");
  }
  const agendaFabMenuLabel = document.querySelector('.settings-switch-row[for="settingsAgendaFabMenuEnabled"]');
  if (agendaFabMenuLabel) {
    const small = agendaFabMenuLabel.querySelector('small');
    if (small) small.textContent = t("enableAgendaFabMenuHint");
  }
  const serviceReactivate = document.querySelector('#serviceReactivateWrap');
  if (serviceReactivate) {
    const strong = serviceReactivate.querySelector('strong');
    const small = serviceReactivate.querySelector('small');
    if (strong) strong.textContent = t("reactivateService");
    if (small) small.textContent = t("reactivateServiceHint");
  }

  const screenTitle = document.getElementById("screenTitle");
  if (screenTitle) screenTitle.textContent = getScreenTitle(state.currentScreen, screenTitle.textContent);

  applyNavStyleActionButtons();
}

const state = {
  currentScreen: "agendaScreen",
  currentYear: today.getFullYear(),
  currentMonth: today.getMonth(),
  selectedDate: todayStr,
  selectedClientId: null,
  previousMainScreen: "clientsScreen",
  clientLetter: "",
  serviceLetter: "",
  settingsSavePending: false,
  settingsDirty: false,
  settingsInitialSignature: "",
  statsTopCustomersVisible: 10,
  revenueInitialized: false,
  revenueSelectedDateSynced: null,
  revenueSyncSelectedDateOnOpen: true,
  revenueLastRenderSignature: "",
  showInactiveServices: false,
  todoFilter: "all",
  standardCostLetter: "",
  standardCostSearch: "",
  costsPeriodType: "month",
  costsPeriodDate: todayStr,
  appNavigationReady: false,
  appNavigationLastScreen: null
};

const monthNames = [
  "JANUARI", "FEBRUARI", "MAART", "APRIL", "MEI", "JUNI",
  "JULI", "AUGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DECEMBER"
];

const longMonthNames = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december"
];

function getMonthNameLong(monthIndex) {
  const d = new Date(2026, Number(monthIndex) || 0, 1);
  return new Intl.DateTimeFormat(getCurrentLanguage(), { month: "long" }).format(d);
}

function getMonthNameUpper(monthIndex) {
  return getMonthNameLong(monthIndex).toLocaleUpperCase(getCurrentLanguage());
}

function capitalizeFirst(value) {
  const text = String(value || "");
  return text ? text.charAt(0).toLocaleUpperCase(getCurrentLanguage()) + text.slice(1) : text;
}

const defaultPaymentMethods = [
  { id: 1, name: "Cash", sortOrder: 1 },
  { id: 2, name: "Overschrijving", sortOrder: 2 },
  { id: 3, name: "QR-Code", sortOrder: 3 }
];

const revenuePickerState = {
  mode: "year",
  target: "revenue",
  columns: [],
  selected: {}
};

function getRevenuePickerTarget() {
  return revenuePickerState.target || "revenue";
}

function getRevenuePickerAnchorDate() {
  if (getRevenuePickerTarget() === "costs") return getCostsPeriodDate();
  return document.getElementById("revenueDate")?.value || todayStr;
}

function setRevenuePickerPeriod(type, dateStr) {
  if (getRevenuePickerTarget() === "costs") {
    setCostsPeriod(type, dateStr);
    return;
  }
  setRevenuePeriod(type, dateStr);
}

const notificationTimers = new Map();
let notificationHeartbeatId = null;

const paymentPopoverState = {
  appointmentId: null,
  anchorRect: null
};

const appointmentActionPopoverState = {
  appointmentId: null,
  anchorRect: null
};


function addDaysStr(dateStr, days) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return formatDateInput(d);
}

function readAgendaFabMenuEnabledPreference() {
  try {
    const stored = localStorage.getItem(AGENDA_FAB_MENU_SETTING_KEY);
    if (stored === "true") return true;
    if (stored === "false") return false;
  } catch (error) {}
  return true;
}

function writeAgendaFabMenuEnabledPreference(enabled) {
  try {
    localStorage.setItem(AGENDA_FAB_MENU_SETTING_KEY, enabled ? "true" : "false");
  } catch (error) {}
}

function isAgendaFabMenuEnabled() {
  const settings = getData()?.settings || {};
  if (typeof settings.agendaFabMenuEnabled === "boolean") return settings.agendaFabMenuEnabled;
  return readAgendaFabMenuEnabledPreference();
}

function getDefaultSettings() {
  return {
    defaultBreakMinutes: 10,
    notificationsEnabled: false,
    reminderMinutes: 30,
    overlapWarningsEnabled: true,
    agendaFabMenuEnabled: readAgendaFabMenuEnabledPreference(),
    showTipsOnOpen: true,
    language: DEFAULT_LANGUAGE,
    currency: DEFAULT_CURRENCY,
    paymentBeneficiaryName: "",
    paymentIban: "",
    paymentBic: "",
    paymentReferencePrefix: "",
    calendarFeedToken: ""
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
      paymentMethodName: paymentMethodName ? String(paymentMethodName).trim() : null,
      currency: normalizeCurrency(appointment?.currency || safe.settings?.currency || DEFAULT_CURRENCY),
      remarks: String(appointment?.remarks || appointment?.note || appointment?.appointment_remarks || "").trim(),
      isPrivate: Boolean(appointment?.isPrivate ?? appointment?.is_private),
      privateTitle: String(appointment?.privateTitle || appointment?.private_title || "").trim(),
      privateDetails: String(appointment?.privateDetails || appointment?.private_details || "").trim(),
      privateEndTime: appointment?.privateEndTime || appointment?.private_end_time || "",
      privateEndDate: getStoredPrivateEndDate(appointment, appointment?.date || appointment?.appointment_date || todayStr),
      recurrenceGroupId: appointment?.recurrenceGroupId || appointment?.recurrence_group_id || null,
      recurrenceRule: appointment?.recurrenceRule || appointment?.recurrence_rule || "none"
    };
  }) : [];

  const todos = Array.isArray(safe.todos) ? safe.todos.map(todo => ({
    id: todo?.id,
    title: String(todo?.title || "").trim(),
    description: String(todo?.description || todo?.note || "").trim(),
    completed: Boolean(todo?.completed ?? todo?.isCompleted ?? todo?.is_completed),
    createdAt: todo?.createdAt || todo?.created_at || null,
    updatedAt: todo?.updatedAt || todo?.updated_at || null
  })).filter(todo => todo.title || todo.description) : [];

  const costs = Array.isArray(safe.costs) ? safe.costs.map(cost => ({
    id: cost?.id,
    description: String(cost?.description || cost?.omschrijving || "").trim(),
    date: cost?.date || cost?.cost_date || todayStr,
    amountInclVat: Number(cost?.amountInclVat ?? cost?.amount_incl_vat ?? cost?.amount ?? 0),
    vatRate: Number(cost?.vatRate ?? cost?.vat_rate ?? 21),
    standardCostId: cost?.standardCostId ?? cost?.standard_cost_id ?? null,
    createdAt: cost?.createdAt || cost?.created_at || null,
    updatedAt: cost?.updatedAt || cost?.updated_at || null
  })).filter(cost => cost.description || Number(cost.amountInclVat) > 0) : [];

  const standardCosts = Array.isArray(safe.standardCosts) ? safe.standardCosts.map(item => ({
    id: item?.id,
    description: String(item?.description || item?.omschrijving || "").trim(),
    vatRate: Number(item?.vatRate ?? item?.vat_rate ?? 21),
    createdAt: item?.createdAt || item?.created_at || null,
    updatedAt: item?.updatedAt || item?.updated_at || null
  })).filter(item => item.description) : [];

  return {
    customers: Array.isArray(safe.customers) ? safe.customers : [],
    services: Array.isArray(safe.services) ? safe.services.map(service => ({
      ...service,
      isActive: service?.isActive !== false
    })) : [],
    appointments,
    todos,
    costs,
    standardCosts,
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
      const legacyPaymentName = "pay" + "coniq";
      if (!name || name.toLowerCase() === legacyPaymentName) return null;
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

function euro(value, currency = getCurrentCurrency()) {
  return new Intl.NumberFormat(getCurrentLanguage(), {
    style: "currency",
    currency: normalizeCurrency(currency)
  }).format(Number(value || 0));
}

function formatLongDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return new Intl.DateTimeFormat(getCurrentLanguage(), { day: "numeric", month: "long", year: "numeric" }).format(d);
}

function formatShortDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return new Intl.DateTimeFormat(getCurrentLanguage(), { day: "numeric", month: "long" }).format(d);
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

function customerNumber(customer) {
  const raw = customer?.customerNumber ?? customer?.customer_number ?? customer?.id ?? "";
  const value = String(raw).trim();
  if (!value) return "-";

  if (/^\d+$/.test(value)) {
    return `K${value.padStart(5, "0")}`;
  }

  return value.startsWith("K") ? value : `K${value}`;
}


function normalizePhoneNumber(value, defaultCountryCode = "32") {
  const raw = String(value || "").trim();
  if (!raw) return "";

  let compact = raw.replace(/[\s().\-/]/g, "");
  compact = compact.replace(/[^+\d]/g, "");

  if (compact.startsWith("00")) compact = `+${compact.slice(2)}`;
  if (compact.startsWith("+")) {
    const digits = compact.slice(1).replace(/\D/g, "");
    return digits ? `+${digits}` : "";
  }

  let digits = compact.replace(/\D/g, "");
  if (!digits) return "";

  if (digits.startsWith(defaultCountryCode)) return `+${digits}`;
  if (digits.startsWith("0")) digits = digits.slice(1);
  return `+${defaultCountryCode}${digits}`;
}

function phoneSearchKey(value) {
  return normalizePhoneNumber(value).replace(/\D/g, "");
}

function normalizeEmailForDuplicateCheck(value) {
  return String(value || "").trim().toLocaleLowerCase();
}

function nextCustomerNumber(data) {
  const numbers = (data.customers || [])
    .map(customer => customer?.customerNumber ?? customer?.customer_number)
    .map(value => String(value || "").replace(/\D/g, ""))
    .map(value => Number(value))
    .filter(value => Number.isFinite(value) && value > 0);
  return numbers.length ? Math.max(...numbers) + 1 : 1;
}

function findDuplicateCustomer(data, payload, excludeId = null) {
  const phoneKey = phoneSearchKey(payload.phone);
  const emailKey = normalizeEmailForDuplicateCheck(payload.email);

  if (!phoneKey && !emailKey) return null;

  return (data.customers || []).find(customer => {
    if (String(customer.id) === String(excludeId || "")) return false;
    const samePhone = phoneKey && phoneSearchKey(customer.phone) === phoneKey;
    const sameEmail = emailKey && normalizeEmailForDuplicateCheck(customer.email) === emailKey;
    return samePhone || sameEmail;
  }) || null;
}

function buildDuplicateCustomerMessage(duplicate, payload) {
  const parts = [];
  if (payload.phone && phoneSearchKey(payload.phone) === phoneSearchKey(duplicate.phone)) parts.push("telefoonnummer");
  if (payload.email && normalizeEmailForDuplicateCheck(payload.email) === normalizeEmailForDuplicateCheck(duplicate.email)) parts.push("e-mail");

  return [
    `Er bestaat al een klant met hetzelfde ${parts.join(" en ") || "telefoonnummer/e-mail"}.`,
    "",
    `${fullName(duplicate) || "Onbekende klant"} · ${customerNumber(duplicate)}`,
    duplicate.phone ? `Tel: ${duplicate.phone}` : "",
    duplicate.email ? `E-mail: ${duplicate.email}` : "",
    "",
    "Wil je deze klant toch opslaan?"
  ].filter(line => line !== "").join("\n");
}

function customerSearchText(customer) {
  return [
    fullName(customer),
    customer.firstName,
    customer.lastName,
    customer.phone,
    String(customer.phone || "").replace(/\D/g, ""),
    customer.email,
    customerNumber(customer)
  ].join(" ").toLowerCase();
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

function isPrivateAppointment(appointment) {
  return Boolean(appointment?.isPrivate ?? appointment?.is_private);
}


const PRIVATE_END_DATE_META_PREFIX = "[NB_PRIVATE_END_DATE:";

function isDateInputValue(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
}

function extractPrivateEndDateFromRemarks(value) {
  const text = String(value || "");
  const match = text.match(/\[NB_PRIVATE_END_DATE:(\d{4}-\d{2}-\d{2})\]/);
  return match ? match[1] : "";
}

function stripPrivateEndDateMeta(value) {
  return String(value || "").replace(/\s*\[NB_PRIVATE_END_DATE:\d{4}-\d{2}-\d{2}\]\s*/g, "").trim();
}

function getStoredPrivateEndDate(appointment, fallbackDate = todayStr) {
  const explicit = appointment?.privateEndDate || appointment?.private_end_date;
  if (isDateInputValue(explicit)) return explicit;
  const fromRemarks = extractPrivateEndDateFromRemarks(appointment?.remarks || appointment?.appointment_remarks || "");
  if (isDateInputValue(fromRemarks)) return fromRemarks;
  return fallbackDate || appointment?.date || appointment?.appointment_date || todayStr;
}

function withPrivateEndDateMeta(remarks, privateEndDate) {
  const clean = stripPrivateEndDateMeta(remarks);
  if (!isDateInputValue(privateEndDate)) return clean;
  return `${clean ? `${clean} ` : ""}[NB_PRIVATE_END_DATE:${privateEndDate}]`.trim();
}

function getPrivateRangeBounds(appointment) {
  const start = appointment?.originalDate || appointment?.date || appointment?.appointment_date || todayStr;
  const end = getStoredPrivateEndDate(appointment, start);
  return end >= start ? { start, end } : { start, end: start };
}

function appointmentIsActiveOnDate(appointment, dateStr) {
  if (!isPrivateAppointment(appointment)) return (appointment?.date || appointment?.appointment_date) === dateStr;
  const bounds = getPrivateRangeBounds(appointment);
  return dateStr >= bounds.start && dateStr <= bounds.end;
}

function expandPrivateAppointmentDateRange(appointment) {
  if (!isPrivateAppointment(appointment)) return [appointment];
  const bounds = getPrivateRangeBounds(appointment);
  const dates = [];
  const cursor = new Date(bounds.start + "T00:00:00");
  const endDate = new Date(bounds.end + "T00:00:00");
  if (Number.isNaN(cursor.getTime()) || Number.isNaN(endDate.getTime())) return [appointment];

  let index = 0;
  while (cursor <= endDate && index < 370) {
    const date = formatDateInput(cursor);
    dates.push({
      ...appointment,
      originalDate: appointment.originalDate || appointment.date,
      date,
      privateEndDate: bounds.end,
      isVirtualPrivateRange: date !== (appointment.originalDate || appointment.date)
    });
    cursor.setDate(cursor.getDate() + 1);
    index += 1;
  }
  return dates;
}

function appointmentsShareActiveDate(a, b) {
  const aStart = a?.date || a?.appointment_date || todayStr;
  const aEnd = isPrivateAppointment(a) ? getPrivateRangeBounds(a).end : aStart;
  const bStart = b?.date || b?.appointment_date || todayStr;
  const bEnd = isPrivateAppointment(b) ? getPrivateRangeBounds(b).end : bStart;
  return aStart <= bEnd && bStart <= aEnd;
}

function getVirtualPrivateRecurrenceAppointments(data = getData()) {
  const appointments = Array.isArray(data?.appointments) ? data.appointments : [];
  const counts = {
    daily: 365,
    weekly: 52,
    biweekly: 26,
    triweekly: 18,
    monthly: 24,
    quarterly: 12,
    semiannual: 10,
    yearly: 5
  };
  const stepDays = { daily: 1, weekly: 7, biweekly: 14, triweekly: 21 };
  const stepMonths = { monthly: 1, quarterly: 3, semiannual: 6 };

  return appointments
    .flatMap(appointment => {
      const rule = appointment?.recurrenceRule || appointment?.recurrence_rule || "none";
      if (!isPrivateAppointment(appointment) || rule === "none" || appointment.recurrenceGroupId || appointment.recurrence_group_id) {
        return [appointment];
      }

      const startDate = new Date((appointment.date || appointment.appointment_date || todayStr) + "T00:00:00");
      if (Number.isNaN(startDate.getTime())) return [appointment];

      const rangeBounds = getPrivateRangeBounds(appointment);
      const rangeDays = Math.max(0, Math.round((new Date(rangeBounds.end + "T00:00:00") - new Date(rangeBounds.start + "T00:00:00")) / 86400000));
      const total = counts[rule] || 1;

      return Array.from({ length: total }, (_, index) => {
        const d = new Date(startDate);
        if (rule === "yearly") d.setFullYear(startDate.getFullYear() + index);
        else if (stepMonths[rule]) d.setMonth(startDate.getMonth() + (stepMonths[rule] * index));
        else d.setDate(startDate.getDate() + (stepDays[rule] || 0) * index);

        const occurrenceDate = formatDateInput(d);
        const occurrenceEndDateObject = new Date(d);
        occurrenceEndDateObject.setDate(d.getDate() + rangeDays);

        return {
          ...appointment,
          id: index === 0 ? appointment.id : `${appointment.id}__${rule}_${index}`,
          sourceAppointmentId: appointment.id,
          originalDate: occurrenceDate,
          date: occurrenceDate,
          privateEndDate: formatDateInput(occurrenceEndDateObject),
          isVirtualRecurrence: index > 0
        };
      });
    })
    .flatMap(expandPrivateAppointmentDateRange);
}
function isMultiDayPrivateAppointment(appointment) {
  if (!isPrivateAppointment(appointment)) return false;
  const bounds = getPrivateRangeBounds(appointment);
  return bounds.end > bounds.start;
}

function getPrivateAgendaDisplayTime(appointment, dateStr) {
  const bounds = getPrivateRangeBounds(appointment);
  const currentDate = dateStr || appointment?.date || todayStr;
  const startTime = String(appointment?.time || appointment?.appointment_time || "00:00").slice(0, 5);
  const endTime = String(appointment?.privateEndTime || appointment?.private_end_time || startTime || "00:00").slice(0, 5);

  if (bounds.end <= bounds.start) {
    return { main: startTime, sub: `tot ${endTime}` };
  }

  if (currentDate === bounds.start) {
    return { main: startTime, sub: "tot 00:00" };
  }

  if (currentDate === bounds.end) {
    return { main: "00:00", sub: `tot ${endTime}` };
  }

  return { main: "Hele dag", sub: `tot ${formatShortDate(bounds.end)}` };
}

function getAppointmentSortMinutesForDate(appointment, dateStr) {
  if (isPrivateAppointment(appointment) && isMultiDayPrivateAppointment(appointment)) {
    const bounds = getPrivateRangeBounds(appointment);
    const currentDate = dateStr || appointment?.date || todayStr;
    if (currentDate === bounds.start) {
      return minutesFromTimeString(appointment.time || appointment.appointment_time || "00:00");
    }
    return 0;
  }

  return minutesFromTimeString(appointment.time || appointment.appointment_time || "00:00");
}

function getAppointmentsForDate(dateStr, data = getData()) {
  return getVirtualPrivateRecurrenceAppointments(data)
    .filter(appointment => appointment.date === dateStr)
    .sort((a, b) => {
      const timeSort = getAppointmentSortMinutesForDate(a, dateStr) - getAppointmentSortMinutesForDate(b, dateStr);
      if (timeSort) return timeSort;

      const privateSort = Number(isPrivateAppointment(b)) - Number(isPrivateAppointment(a));
      if (privateSort) return privateSort;

      return String(a.id || "").localeCompare(String(b.id || ""));
    });
}

function getAppointmentDisplayEndTime(appointment, breakMinutes = 0) {
  if (isPrivateAppointment(appointment)) {
    return String(appointment.privateEndTime || appointment.private_end_time || "").slice(0, 5) || getAppointmentEndTime(appointment, 0);
  }
  return getAppointmentEndTime(appointment, breakMinutes);
}

function calculatePrivateDuration(startTime, endTime) {
  const start = minutesFromTimeString(startTime || "00:00");
  let end = minutesFromTimeString(endTime || startTime || "00:00");
  if (end < start) end = start;
  return Math.max(0, end - start);
}

function getSettings() {
  return getData().settings || getDefaultSettings();
}

function appointmentTimeRange(appointment, breakMinutes = 0) {
  const bounds = isPrivateAppointment(appointment) ? getPrivateRangeBounds(appointment) : null;
  const isMultiDayPrivate = Boolean(bounds && bounds.end > bounds.start);
  if (isMultiDayPrivate) {
    return { startMinutes: 0, endMinutes: 24 * 60 };
  }

  const startMinutes = minutesFromTimeString(appointment.time || appointment.appointment_time || "00:00");
  const duration = isPrivateAppointment(appointment)
    ? calculatePrivateDuration(appointment.time || appointment.appointment_time, appointment.privateEndTime || appointment.private_end_time)
    : Number(appointment.duration || 0);
  const buffer = isPrivateAppointment(appointment) ? 0 : Math.max(0, Number(breakMinutes) || 0);
  return {
    startMinutes,
    endMinutes: startMinutes + duration + buffer
  };
}

function findAppointmentOverlap(payload, appointments, breakMinutes = 0, excludeId = null) {
  const newRange = appointmentTimeRange(payload, breakMinutes);

  return appointments
    .filter(app => appointmentsShareActiveDate(payload, app))
    .filter(app => String(app.id) !== String(excludeId || ""))
    .find(app => {
      const existingRange = appointmentTimeRange(app, breakMinutes);
      return newRange.startMinutes < existingRange.endMinutes && newRange.endMinutes > existingRange.startMinutes;
    }) || null;
}

function findNextAvailableStartTime(payload, appointments, breakMinutes = 0, excludeId = null) {
  const payloadRange = appointmentTimeRange(payload, breakMinutes);
  const durationWithBreak = Math.max(0, payloadRange.endMinutes - payloadRange.startMinutes);
  const dayAppointments = appointments
    .filter(app => appointmentsShareActiveDate(payload, app))
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
  const privateOverlap = isPrivateAppointment(overlapApp);
  const customer = privateOverlap ? null : customerById(data, overlapApp.customerId);
  const service = privateOverlap ? null : serviceById(data, overlapApp.serviceId);
  const range = appointmentTimeRange(overlapApp, breakMinutes);
  const nextPossibleStart = findNextAvailableStartTime(payload, appointments, breakMinutes, excludeId);
  const overlapTitle = privateOverlap
    ? `${overlapApp.privateTitle || "Privé-afspraak"}${overlapApp.privateDetails ? ` (${overlapApp.privateDetails})` : ""}`
    : `${customer ? fullName(customer) : "Onbekende klant"}${service ? ` (${service.name})` : ""}`;

  return [
    "Deze afspraak overlapt met een bestaande afspraak.",
    "",
    `${overlapApp.time} - ${timeStringFromMinutes(range.endMinutes)} · ${overlapTitle}`,
    "",
    `Eerstvolgend mogelijk tijdstip: ${timeStringFromMinutes(nextPossibleStart)}`,
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


function getSupabaseProjectUrl() {
  if (typeof SUPABASE_URL !== "undefined" && SUPABASE_URL) return SUPABASE_URL;
  if (typeof supabaseClient !== "undefined" && supabaseClient?.supabaseUrl) return supabaseClient.supabaseUrl;
  return "";
}

function createCalendarFeedToken() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID().replace(/-/g, "");
  }

  const bytes = new Uint8Array(24);
  if (window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
  }

  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
}

function getCalendarFeedUrl(token = getSettings().calendarFeedToken) {
  const projectUrl = getSupabaseProjectUrl().replace(/\/$/, "");
  const safeToken = String(token || "").trim();
  if (!projectUrl || !safeToken) return "";
  return `${projectUrl}/functions/v1/calendar-feed?token=${encodeURIComponent(safeToken)}`;
}

async function ensureCalendarFeedToken({ forceNew = false } = {}) {
  const user = await getCurrentUser();
  if (!user) {
    await appAlert("Log eerst in om een automatische kalenderlink te maken.", { title: "Google kalender", variant: "warning" });
    return "";
  }

  const currentSettings = getSettings();
  const token = forceNew || !currentSettings.calendarFeedToken
    ? createCalendarFeedToken()
    : currentSettings.calendarFeedToken;

  const payload = {
    user_id: user.id,
    default_break_minutes: Number(currentSettings.defaultBreakMinutes ?? 10),
    notifications_enabled: Boolean(currentSettings.notificationsEnabled),
    reminder_minutes: Number(currentSettings.reminderMinutes ?? 30),
    overlap_warnings_enabled: currentSettings.overlapWarningsEnabled !== false,
    language: normalizeLanguage(currentSettings.language || getCurrentLanguage()),
    currency: normalizeCurrency(currentSettings.currency || getCurrentCurrency()),
    payment_beneficiary_name: currentSettings.paymentBeneficiaryName || null,
    payment_iban: currentSettings.paymentIban || null,
    payment_bic: currentSettings.paymentBic || null,
    payment_reference_prefix: String(currentSettings.paymentReferencePrefix || "").trim() || null,
    calendar_feed_token: token,
    updated_at: new Date().toISOString()
  };

  const { error } = await supabaseClient
    .from("user_settings")
    .upsert(payload, { onConflict: "user_id" });

  if (error) {
    await appAlert("Kalenderlink maken mislukt: " + error.message, { title: "Google kalender", variant: "danger" });
    return "";
  }

  const data = getData();
  data.settings = { ...currentSettings, calendarFeedToken: token };
  saveData(data);
  renderCalendarFeedSettings();
  return token;
}

function renderCalendarFeedSettings() {
  const input = document.getElementById("calendarFeedUrl");
  const status = document.getElementById("calendarFeedStatus");
  const token = getSettings().calendarFeedToken;
  const url = getCalendarFeedUrl(token);

  if (input) input.value = url || "";
  if (status) {
    status.textContent = url
      ? "Deze link kun je één keer toevoegen in Google Calendar via ‘Via URL’. Nieuwe wijzigingen in NailBooker komen daarna automatisch mee zodra Google de feed ververst."
      : "Maak eerst een persoonlijke kalenderlink. Daarna kun je die één keer toevoegen in Google Calendar.";
  }
}

async function createOrCopyCalendarFeedUrl() {
  const token = await ensureCalendarFeedToken();
  const url = getCalendarFeedUrl(token);
  if (!url) return;

  try {
    await navigator.clipboard.writeText(url);
    await appAlert("Kalenderlink gekopieerd. Voeg deze in Google Calendar toe via: Andere agenda’s → Via URL.", { title: "Google kalender", variant: "success" });
  } catch (error) {
    const input = document.getElementById("calendarFeedUrl");
    if (input) {
      input.focus();
      input.select();
    }
    await appAlert("De kalenderlink staat in het tekstvak. Kopieer hem manueel en voeg hem toe in Google Calendar via ‘Via URL’.", { title: "Google kalender", variant: "info" });
  }
}

async function openGoogleCalendarSubscribePage() {
  await ensureCalendarFeedToken();
  renderCalendarFeedSettings();
  window.open("https://calendar.google.com/calendar/u/0/r/settings/addbyurl", "_blank", "noopener,noreferrer");
}

async function regenerateCalendarFeedUrl() {
  const confirmed = await appConfirm(
    "Wil je een nieuwe kalenderlink maken? De oude link werkt daarna niet meer. Je moet de nieuwe link opnieuw toevoegen in Google Calendar.",
    { title: "Nieuwe kalenderlink", confirmText: "Nieuwe link maken" }
  );
  if (!confirmed) return;

  const token = await ensureCalendarFeedToken({ forceNew: true });
  const url = getCalendarFeedUrl(token);
  if (url) {
    try { await navigator.clipboard.writeText(url); } catch (error) {}
    await appAlert("Nieuwe kalenderlink gemaakt en gekopieerd. Voeg deze opnieuw toe in Google Calendar.", { title: "Google kalender", variant: "success" });
  }
}

function jumpToToday() {
  if (state.selectedDate !== todayStr) {
    state.revenueSyncSelectedDateOnOpen = true;
  }
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
  title = t("message"),
  message = "",
  confirmText = t("ok") || "OK",
  cancelText = t("cancel"),
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
      const suspendedBusyDepth = suspendGlobalActionBusyForDialog();
      if (showCancel) {
        const result = window.confirm(message);
        if (result) resumeGlobalActionBusyAfterDialog(suspendedBusyDepth);
        resolve(result);
        return;
      }
      window.alert(message);
      resolve(true);
      return;
    }

    const suspendedBusyDepth = suspendGlobalActionBusyForDialog();

    titleEl.textContent = title;
    setDialogMessage(messageEl, message);
    confirmBtn.textContent = confirmText;
    cancelBtn.textContent = cancelText;
    cancelBtn.dataset.actionType = "cancel";
    cancelBtn.dataset.actionLabel = cancelText;
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
      if (result === true && showCancel) {
        resumeGlobalActionBusyAfterDialog(suspendedBusyDepth);
      }
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

    applyNavStyleActionButtons(dialog);

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
    title: options.title || t("message"),
    message,
    confirmText: options.confirmText || (t("ok") || "OK"),
    showCancel: false,
    variant: options.variant || "info"
  });
}

async function appConfirm(message, options = {}) {
  return showAppDialog({
    title: options.title || t("confirmTitle"),
    message,
    confirmText: options.confirmText || t("confirm"),
    cancelText: options.cancelText || t("cancel"),
    showCancel: true,
    variant: options.variant || "warning"
  });
}


function isRecurringAppointment(appointment) {
  return Boolean(appointment?.recurrenceGroupId || appointment?.recurrence_group_id) && String(appointment?.recurrenceRule || appointment?.recurrence_rule || "none") !== "none";
}

function getAppointmentRecurrenceGroupId(appointment) {
  return appointment?.recurrenceGroupId || appointment?.recurrence_group_id || null;
}

function dayDiff(dateA, dateB) {
  const a = new Date(String(dateA || todayStr) + "T00:00:00");
  const b = new Date(String(dateB || todayStr) + "T00:00:00");
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return 0;
  return Math.round((a.getTime() - b.getTime()) / 86400000);
}

function applyRecurringEditToAppointment(appointment, localPayload, originalAppointment, scope = "single") {
  const dateShift = scope === "single" ? 0 : dayDiff(localPayload.date, originalAppointment.date);
  const nextDate = scope === "single" ? localPayload.date : addDaysStr(appointment.date, dateShift);
  const localRangeDays = isPrivateAppointment(localPayload)
    ? Math.max(0, Math.round((new Date((localPayload.privateEndDate || localPayload.date) + "T00:00:00") - new Date(localPayload.date + "T00:00:00")) / 86400000))
    : 0;
  const shiftedPrivateEnd = new Date(nextDate + "T00:00:00");
  shiftedPrivateEnd.setDate(shiftedPrivateEnd.getDate() + localRangeDays);

  return {
    ...appointment,
    ...localPayload,
    id: appointment.id,
    date: nextDate,
    privateEndDate: isPrivateAppointment(localPayload) ? formatDateInput(shiftedPrivateEnd) : "",
    paid: appointment.paid,
    paymentMethodName: appointment.paymentMethodName ?? paymentMethodNameForAppointment(appointment),
    currency: appointment.currency || getCurrentCurrency(),
    recurrenceGroupId: getAppointmentRecurrenceGroupId(originalAppointment),
    recurrenceRule: localPayload.recurrenceRule || originalAppointment.recurrenceRule || "none"
  };
}

function getRecurringAffectedAppointments(data, originalAppointment, scope = "single") {
  if (!isRecurringAppointment(originalAppointment) || scope === "single") return [originalAppointment];
  const groupId = getAppointmentRecurrenceGroupId(originalAppointment);
  return (data.appointments || []).filter(appointment => {
    if (String(getAppointmentRecurrenceGroupId(appointment)) !== String(groupId)) return false;
    if (scope === "following") return String(appointment.date || "") >= String(originalAppointment.date || "");
    return true;
  });
}

function chooseRecurringAppointmentScope(action = "update") {
  const actionLabel = action === "delete" ? "verwijderd" : "aangepast";
  return new Promise(resolve => {
    const dialog = document.getElementById("appMessageDialog");
    const titleEl = document.getElementById("appMessageDialogTitle");
    const messageEl = document.getElementById("appMessageDialogText");
    const confirmBtn = document.getElementById("appMessageConfirmBtn");
    const cancelBtn = document.getElementById("appMessageCancelBtn");
    const card = dialog?.querySelector(".app-message-card");
    const actions = dialog?.querySelector(".modal-actions") || dialog?.querySelector(".app-message-actions");

    if (!dialog || !titleEl || !messageEl || !confirmBtn || !cancelBtn || !card || !actions) {
      const suspendedBusyDepth = suspendGlobalActionBusyForDialog();
      const wholeSeries = window.confirm(`Deze afspraak maakt deel uit van een herhalende reeks. OK = hele reeks ${actionLabel}, Annuleren = enkel deze afspraak.`);
      const result = wholeSeries ? "series" : "single";
      resumeGlobalActionBusyAfterDialog(suspendedBusyDepth);
      resolve(result);
      return;
    }

    const suspendedBusyDepth = suspendGlobalActionBusyForDialog();

    titleEl.textContent = action === "delete" ? "Herhalende afspraak verwijderen" : "Herhalende afspraak aanpassen";
    setDialogMessage(messageEl, `Deze afspraak maakt deel uit van een herhalende reeks. Wat wil je ${action === "delete" ? "verwijderen" : "aanpassen"}?`);
    card.dataset.variant = action === "delete" ? "danger" : "warning";
    confirmBtn.textContent = "Enkel deze afspraak";
    cancelBtn.textContent = t("cancel");
    cancelBtn.classList.remove("hidden");

    const followingBtn = document.createElement("button");
    followingBtn.type = "button";
    followingBtn.className = "btn btn-secondary";
    followingBtn.textContent = "Deze en volgende";

    const seriesBtn = document.createElement("button");
    seriesBtn.type = "button";
    seriesBtn.className = action === "delete" ? "btn btn-danger" : "btn btn-primary";
    seriesBtn.textContent = "De hele reeks";

    actions.insertBefore(followingBtn, cancelBtn);
    actions.insertBefore(seriesBtn, cancelBtn);
    actions.classList.add("recurrence-choice-actions");

    let settled = false;
    const cleanup = (result) => {
      if (settled) return;
      settled = true;
      dialog.removeEventListener("cancel", onCancel);
      confirmBtn.removeEventListener("click", onSingle);
      followingBtn.removeEventListener("click", onFollowing);
      seriesBtn.removeEventListener("click", onSeries);
      cancelBtn.removeEventListener("click", onCancelClick);
      followingBtn.remove();
      seriesBtn.remove();
      actions.classList.remove("recurrence-choice-actions");
      closeStyledDialog(dialog);
      if (result) {
        resumeGlobalActionBusyAfterDialog(suspendedBusyDepth);
      }
      resolve(result);
    };

    const onSingle = () => cleanup("single");
    const onFollowing = () => cleanup("following");
    const onSeries = () => cleanup("series");
    const onCancel = (event) => { event.preventDefault(); cleanup(null); };
    const onCancelClick = () => cleanup(null);

    dialog.addEventListener("cancel", onCancel);
    confirmBtn.addEventListener("click", onSingle);
    followingBtn.addEventListener("click", onFollowing);
    seriesBtn.addEventListener("click", onSeries);
    cancelBtn.addEventListener("click", onCancelClick);
    openStyledDialog(dialog);
    confirmBtn.focus();
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
        .select("first_name, last_name, salon_name, vat_number, email, country, region, timezone, language, currency, terms_accepted, terms_accepted_at, is_blocked, blocked_at, blocked_reason, is_admin")
        .eq("id", user.id)
        .maybeSingle();

    return profile ?? null;
}

function updateAdminNavVisibility(profile = null) {
  const adminNavBtn = document.getElementById("adminNavBtn");
  if (!adminNavBtn) return;

  const showAdminNav = Boolean(profile?.is_admin);
  adminNavBtn.classList.toggle("hidden", !showAdminNav);
  adminNavBtn.disabled = !showAdminNav || isAuthLocked();
  adminNavBtn.setAttribute("aria-hidden", String(!showAdminNav));
  adminNavBtn.tabIndex = showAdminNav ? 0 : -1;
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
  return `
  <svg class="header-account-svg" width="28" height="28" viewBox="0 0 7.4083331 7.4083333" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
    <path d="M 3.8617798 0.31005859 C 2.9582518 0.26493829 2.025428 0.58087526 1.2950114 1.333252 C -0.69412006 3.3821882 0.57271814 6.7574126 3.4437174 7.0579671 C 5.5379113 7.2772007 7.3912588 5.3012295 7.0631348 3.1992879 C 6.7922288 1.4638815 5.3676597 0.3852591 3.8617798 0.31005859 z M 3.716569 1.5673462 C 4.5693501 1.5673462 4.896384 2.2967116 4.8906576 2.740918 C 4.8906576 3.5393214 4.2681271 3.9021506 3.753776 3.9155233 C 3.1213517 3.9318815 2.5429972 3.4892773 2.5429972 2.740918 C 2.5429972 2.2320433 2.8406225 1.5755089 3.716569 1.5673462 z M 3.6958984 2.0102132 A 0.75140572 0.75140572 0 0 0 2.9445231 2.7615885 A 0.75140572 0.75140572 0 0 0 3.6958984 3.5129639 A 0.75140572 0.75140572 0 0 0 4.4472738 2.7615885 A 0.75140572 0.75140572 0 0 0 3.6958984 2.0102132 z M 3.8147542 4.0741699 L 4.3883626 4.0808879 L 4.4896484 4.104659 C 5.0513905 4.2380308 5.5324788 4.7773655 5.5324788 5.2730632 C 5.5324788 5.6237649 5.1140306 5.6046287 5.0462036 5.2508423 C 4.9819262 4.9155692 4.7152747 4.6477208 4.37441 4.5764648 L 4.2710571 4.5552775 L 3.6654093 4.5599284 L 3.0597616 4.5645793 L 2.949174 4.6043701 C 2.6609871 4.7095437 2.4412234 4.9624788 2.3869344 5.2508423 C 2.3633283 5.3762204 2.3262513 5.448053 2.2665283 5.483903 L 2.2665283 5.4833862 C 2.1507059 5.5529145 2.0199 5.5288422 1.9435506 5.4234416 L 1.9006592 5.3645304 L 1.9006592 5.2808146 C 1.9006592 4.8959817 2.2341795 4.4116338 2.6318807 4.2183472 C 2.9142584 4.0811219 3.0500538 4.0649184 3.8147542 4.0741699 z " fill="currentColor" />
  </svg>
  `;
}


function setAuthLocked(isLocked) {
  document.body.classList.toggle("auth-locked", Boolean(isLocked));

  document.querySelectorAll(".bottom-nav .nav-btn").forEach(button => {
    const isAccountButton = button.dataset.screen === "accountScreen";
    button.disabled = Boolean(isLocked && !isAccountButton);
    button.setAttribute("aria-disabled", String(Boolean(isLocked && !isAccountButton)));
    button.tabIndex = isLocked && !isAccountButton ? -1 : 0;
  });
}

function isAuthLocked() {
  return document.body.classList.contains("auth-locked");
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
    email: values.email || null,
    first_name: values.first_name || "",
    last_name: values.last_name || "",
    salon_name: values.salon_name || null,
    vat_number: values.vat_number || null,
    country: values.country || null,
    region: values.region || null,
    timezone: values.timezone || null,
    language: normalizeLanguage(values.language || DEFAULT_LANGUAGE),
    currency: normalizeCurrency(values.currency || DEFAULT_CURRENCY),
    terms_accepted: Boolean(values.terms_accepted),
    terms_accepted_at: values.terms_accepted_at || null
  };

  const { error } = await supabaseClient
    .from("profiles")
    .upsert(payload, { onConflict: "id" });

  if (error) throw error;
}

async function syncAuthUI() {
	const { data: { user } } = await supabaseClient.auth.getUser();
	const profile = await getCurrentProfile();
  updateAdminNavVisibility(profile);
  currentProfilePreferences = {
    language: normalizeLanguage(profile?.language || user?.user_metadata?.language || getData()?.settings?.language || DEFAULT_LANGUAGE),
    currency: normalizeCurrency(profile?.currency || user?.user_metadata?.currency || getData()?.settings?.currency || DEFAULT_CURRENCY)
  };

  if (user && profile?.is_blocked) {
    await supabaseClient.auth.signOut();
    setAuthLocked(true);
    const reason = profile?.blocked_reason ? `

Reden: ${profile.blocked_reason}` : "";
    await appAlert(`Dit account is tijdelijk geblokkeerd. Neem contact op met NailBooker support.${reason}`, { title: "Account geblokkeerd", variant: "warning" });
    return;
  }

  updateStaticI18n();

  setAuthLocked(!user);

  const headerUserName = document.getElementById("headerUserName");
  const headerAccountIcon = document.querySelector("#headerAccountBtn .header-account-icon");

  const guestView = document.getElementById("accountGuestView");
  const loggedInView = document.getElementById("accountLoggedInView");

  const accountProfileName = document.getElementById("accountProfileName");
  const accountProfileEmail = document.getElementById("accountProfileEmail");
  const accountProfileFirstName = document.getElementById("accountProfileFirstName");
  const accountProfileLastName = document.getElementById("accountProfileLastName");
  const accountProfileSalonName = document.getElementById("accountProfileSalonName");
  const accountProfileVatNumber = document.getElementById("accountProfileVatNumber");
  const accountProfileLanguage = document.getElementById("accountProfileLanguage");
  const accountProfileCurrency = document.getElementById("accountProfileCurrency");

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
  if (accountProfileSalonName) accountProfileSalonName.textContent = profile?.salon_name?.trim() || "-";
  if (accountProfileVatNumber) accountProfileVatNumber.textContent = profile?.vat_number?.trim() || "-";
  if (accountProfileLanguage) accountProfileLanguage.textContent = SUPPORTED_LANGUAGES.find(item => item.code === getCurrentLanguage())?.label || "-";
  if (accountProfileCurrency) accountProfileCurrency.textContent = getCurrencyLabel(getCurrentCurrency());

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

function refreshEditProfileSelects() {
  ["editLanguage", "editCountry", "editRegion", "editTimezone", "editCurrency"].forEach(id => {
    const select = document.getElementById(id);
    if (select && typeof refreshAppSelect === "function") refreshAppSelect(select);
  });
}

function syncEditProfileRegionOptions() {
  const countryEl = document.getElementById("editCountry");
  const regionEl = document.getElementById("editRegion");
  const timezoneEl = document.getElementById("editTimezone");
  if (!countryEl || !regionEl) return;

  const previousRegion = regionEl.value;
  const regions = getRegistrationRegions(countryEl.value || "BE");
  regionEl.innerHTML = regions.map(region => `<option value="${region.value}">${region.label}</option>`).join("");
  regionEl.value = regions.some(region => region.value === previousRegion) ? previousRegion : regions[0]?.value || "";

  const selectedRegion = regions.find(region => region.value === regionEl.value) || regions[0];
  if (timezoneEl && selectedRegion?.timezone) timezoneEl.value = selectedRegion.timezone;
  refreshEditProfileSelects();
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
  document.getElementById("editSalonName").value = profile?.salon_name || user.user_metadata?.salon_name || "";
  document.getElementById("editVatNumber").value = profile?.vat_number || user.user_metadata?.vat_number || "";

  const editLanguage = document.getElementById("editLanguage");
  const editCountry = document.getElementById("editCountry");
  const editRegion = document.getElementById("editRegion");
  const editTimezone = document.getElementById("editTimezone");
  const editCurrency = document.getElementById("editCurrency");

  const selectedLanguage = normalizeLanguage(profile?.language || user.user_metadata?.language || getCurrentLanguage());
  const selectedCurrency = normalizeCurrency(profile?.currency || user.user_metadata?.currency || getCurrentCurrency());
  const selectedCountry = profile?.country || user.user_metadata?.country || "BE";
  const selectedRegion = profile?.region || user.user_metadata?.region || "";
  const selectedTimezone = profile?.timezone || user.user_metadata?.timezone || "Europe/Brussels";

  if (editLanguage) {
    editLanguage.innerHTML = buildLanguageOptions(selectedLanguage);
    editLanguage.value = selectedLanguage;
  }

  if (editCountry) editCountry.value = selectedCountry;
  syncEditProfileRegionOptions();

  if (editRegion && selectedRegion) {
    const regionExists = Array.from(editRegion.options || []).some(option => option.value === selectedRegion);
    if (regionExists) editRegion.value = selectedRegion;
  }

  if (editTimezone) editTimezone.value = selectedTimezone;

  if (editCurrency) {
    editCurrency.innerHTML = buildCurrencyOptions(selectedCurrency);
    editCurrency.value = selectedCurrency;
  }

  refreshEditProfileSelects();
  document.getElementById("editProfileDialog").showModal();
  window.requestAnimationFrame(() => {
    refreshEditProfileSelects();
    window.requestAnimationFrame(refreshEditProfileSelects);
  });
}

async function saveProfileFromForm(event) {
  event.preventDefault();

  const firstName = document.getElementById("editFirstName")?.value.trim();
  const lastName = document.getElementById("editLastName")?.value.trim();
  const salonName = document.getElementById("editSalonName")?.value.trim() || "";
  const vatNumber = document.getElementById("editVatNumber")?.value.trim() || "";
  const country = document.getElementById("editCountry")?.value || "BE";
  const region = document.getElementById("editRegion")?.value || "Flanders";
  const timezone = document.getElementById("editTimezone")?.value || "Europe/Brussels";
  const language = normalizeLanguage(document.getElementById("editLanguage")?.value || getCurrentLanguage());
  const currency = normalizeCurrency(document.getElementById("editCurrency")?.value || getCurrentCurrency());

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

    const { error: updateUserError } = await supabaseClient.auth.updateUser({
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`.trim(),
        salon_name: salonName,
        vat_number: vatNumber,
        country,
        region,
        timezone,
        language,
        currency,
        terms_accepted: true
      }
    });

    if (updateUserError) {
      throw new Error(updateUserError.message || "Profiel wijzigen mislukt.");
    }

    await upsertProfile(user.id, {
      first_name: firstName,
      last_name: lastName,
      salon_name: salonName,
      vat_number: vatNumber,
      country,
      region,
      timezone,
      language,
      currency,
      terms_accepted: true,
      terms_accepted_at: (await getCurrentProfile())?.terms_accepted_at || new Date().toISOString()
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


const registerWizardState = { step: 1 };

const registerWizardCopy = {
  "nl-BE": {
    title: "Registreren",
    subtitle: "Maak je NailBooker-account aan in enkele korte stappen.",
    stepTitles: ["Taal", "E-mail", "Gegevens", "Beveiliging"],
    languageHint: "De app wordt meteen in deze taal gezet.",
    emailHint: "Dit e-mailadres gebruik je om in te loggen en om je account te verifiëren.",
    verifyHint: "Na registratie krijg je een e-mail om je account te voltooien.",
    terms: "Akkoord met gebruiksvoorwaarden",
    previous: "Vorige",
    next: "Volgende",
    register: "Registreren",
    country: "Land",
    region: "Regio",
    timezone: "Tijdzone",
    emailExists: "Er bestaat al een account voor dit e-mailadres. Log in of gebruik een ander e-mailadres.",
    emailCheckFailed: "E-mailcontrole mislukt. Probeer opnieuw.",
    requiredEmail: "Vul een geldig e-mailadres in.",
    requiredDetails: "Vul voornaam, naam, salonnaam, land, regio en tijdzone in.",
    requiredPassword: "Vul je wachtwoord en bevestiging in.",
    termsRequired: "Je moet akkoord gaan met de gebruiksvoorwaarden om te registreren.",
    passwordMismatch: "De wachtwoorden komen niet overeen.",
    registrationDone: "Registratie gelukt. Controleer je mailbox en klik op de bevestigingslink om je account te voltooien.",
    duplicateFallback: "Er bestaat mogelijk al een account voor dit e-mailadres. Probeer in te loggen of gebruik een ander e-mailadres."
  },
  "en-GB": {
    title: "Register",
    subtitle: "Create your NailBooker account in a few short steps.",
    stepTitles: ["Language", "Email", "Details", "Security"],
    languageHint: "The app switches to this language immediately.",
    emailHint: "You use this email address to log in and verify your account.",
    verifyHint: "After registration, you will receive an email to complete your account.",
    terms: "I agree to the terms of use",
    previous: "Previous",
    next: "Next",
    register: "Register",
    country: "Country",
    region: "Region",
    timezone: "Time zone",
    emailExists: "An account already exists for this email address. Log in or use another email address.",
    emailCheckFailed: "Email check failed. Please try again.",
    requiredEmail: "Enter a valid email address.",
    requiredDetails: "Enter first name, last name, salon name, country, region and time zone.",
    requiredPassword: "Enter your password and confirmation.",
    termsRequired: "You must agree to the terms of use to register.",
    passwordMismatch: "The passwords do not match.",
    registrationDone: "Registration successful. Check your mailbox and click the confirmation link to complete your account.",
    duplicateFallback: "An account may already exist for this email address. Try logging in or use another email address."
  },
  "fr-FR": {
    title: "S'inscrire",
    subtitle: "Créez votre compte NailBooker en quelques étapes courtes.",
    stepTitles: ["Langue", "E-mail", "Données", "Sécurité"],
    languageHint: "L'application passe immédiatement dans cette langue.",
    emailHint: "Vous utilisez cette adresse e-mail pour vous connecter et vérifier votre compte.",
    verifyHint: "Après l'inscription, vous recevrez un e-mail pour compléter votre compte.",
    terms: "J'accepte les conditions d'utilisation",
    previous: "Précédent",
    next: "Suivant",
    register: "S'inscrire",
    country: "Pays",
    region: "Région",
    timezone: "Fuseau horaire",
    emailExists: "Un compte existe déjà pour cette adresse e-mail. Connectez-vous ou utilisez une autre adresse.",
    emailCheckFailed: "La vérification de l'e-mail a échoué. Réessayez.",
    requiredEmail: "Saisissez une adresse e-mail valable.",
    requiredDetails: "Saisissez le prénom, le nom, le nom du salon, le pays, la région et le fuseau horaire.",
    requiredPassword: "Saisissez votre mot de passe et sa confirmation.",
    termsRequired: "Vous devez accepter les conditions d'utilisation pour vous inscrire.",
    passwordMismatch: "Les mots de passe ne correspondent pas.",
    registrationDone: "Inscription réussie. Consultez votre boîte mail et cliquez sur le lien de confirmation pour compléter votre compte.",
    duplicateFallback: "Un compte existe peut-être déjà pour cette adresse e-mail. Essayez de vous connecter ou utilisez une autre adresse."
  }
};

function getRegisterCopy() {
  return registerWizardCopy[getCurrentLanguage()] || registerWizardCopy[DEFAULT_LANGUAGE];
}

function getRegistrationRegions(country) {
  if (country === "NL") return [{ value: "NL", label: "Nederland", timezone: "Europe/Amsterdam" }];
  return [
    { value: "Flanders", label: "Vlaanderen", timezone: "Europe/Brussels" },
    { value: "Brussels", label: "Brussel", timezone: "Europe/Brussels" }
  ];
}

function syncRegisterRegionOptions() {
  const countryEl = document.getElementById("registerCountry");
  const regionEl = document.getElementById("registerRegion");
  const timezoneEl = document.getElementById("registerTimezone");
  if (!countryEl || !regionEl) return;

  const previousRegion = regionEl.value;
  const regions = getRegistrationRegions(countryEl.value || "BE");
  regionEl.innerHTML = regions.map(region => `<option value="${region.value}">${region.label}</option>`).join("");
  regionEl.value = regions.some(region => region.value === previousRegion) ? previousRegion : regions[0]?.value || "";

  const selectedRegion = regions.find(region => region.value === regionEl.value) || regions[0];
  if (timezoneEl && selectedRegion?.timezone) timezoneEl.value = selectedRegion.timezone;
  refreshRegisterWizardSelects();
}

function refreshRegisterWizardSelects() {
  ["registerLanguage", "registerCountry", "registerRegion", "registerTimezone", "registerCurrency"].forEach(id => {
    const select = document.getElementById(id);
    if (select && typeof refreshAppSelect === "function") refreshAppSelect(select);
  });
}

function setRegisterStep(step) {
  registerWizardState.step = Math.min(4, Math.max(1, Number(step) || 1));
  const copy = getRegisterCopy();

  document.querySelectorAll(".register-step").forEach(section => {
    section.classList.toggle("active", Number(section.dataset.registerStep) === registerWizardState.step);
  });
  document.querySelectorAll(".register-progress-dot").forEach(dot => {
    const value = Number(dot.dataset.registerProgress);
    dot.classList.toggle("active", value === registerWizardState.step);
    dot.classList.toggle("done", value < registerWizardState.step);
  });

  const title = document.getElementById("registerDialogTitle");
  const subtitle = document.getElementById("registerDialogSubtitle");
  if (title) title.textContent = `${copy.title} · ${copy.stepTitles[registerWizardState.step - 1]}`;
  if (subtitle) subtitle.textContent = copy.subtitle;

  document.getElementById("registerLanguageHint") && (document.getElementById("registerLanguageHint").textContent = copy.languageHint);
  document.getElementById("registerEmailHint") && (document.getElementById("registerEmailHint").textContent = copy.emailHint);
  document.getElementById("registerVerifyHint") && (document.getElementById("registerVerifyHint").textContent = copy.verifyHint);
  document.getElementById("registerTermsLabel") && (document.getElementById("registerTermsLabel").textContent = copy.terms);
  document.getElementById("registerBackBtn") && (document.getElementById("registerBackBtn").textContent = copy.previous);
  document.getElementById("registerNextBtn") && (document.getElementById("registerNextBtn").textContent = copy.next);
  document.getElementById("registerBtn") && (document.getElementById("registerBtn").textContent = copy.register);

  const backBtn = document.getElementById("registerBackBtn");
  const nextBtn = document.getElementById("registerNextBtn");
  const submitBtn = document.getElementById("registerBtn");
  if (backBtn) backBtn.classList.toggle("hidden", registerWizardState.step === 1);
  if (nextBtn) nextBtn.classList.toggle("hidden", registerWizardState.step === 4);
  if (submitBtn) submitBtn.classList.toggle("hidden", registerWizardState.step !== 4);

  const labelMap = {
    registerEmail: "email",
    registerFirstName: "firstName",
    registerLastName: "lastName",
    registerSalonName: "salonName",
    registerCurrency: "currency",
    registerPassword: "password",
    registerPasswordConfirm: "confirmPassword"
  };
  Object.entries(labelMap).forEach(([id, key]) => {
    const label = document.querySelector(`label[for="${id}"]`);
    if (label) label.textContent = t(key);
  });
  const countryLabel = document.querySelector('label[for="registerCountry"]');
  const regionLabel = document.querySelector('label[for="registerRegion"]');
  const timezoneLabel = document.querySelector('label[for="registerTimezone"]');
  if (countryLabel) countryLabel.textContent = copy.country;
  if (regionLabel) regionLabel.textContent = copy.region;
  if (timezoneLabel) timezoneLabel.textContent = copy.timezone;

  window.requestAnimationFrame(refreshRegisterWizardSelects);
}

function resetRegisterWizard() {
  const form = document.getElementById("registerForm");
  if (form) form.reset();
  const lang = document.getElementById("registerLanguage");
  if (lang) lang.value = getCurrentLanguage();
  syncRegisterRegionOptions();
  setRegisterStep(1);
  window.requestAnimationFrame(refreshRegisterWizardSelects);
}

function getRegisterValues() {
  return {
    language: normalizeLanguage(document.getElementById("registerLanguage")?.value || DEFAULT_LANGUAGE),
    email: document.getElementById("registerEmail")?.value.trim() || "",
    firstName: document.getElementById("registerFirstName")?.value.trim() || "",
    lastName: document.getElementById("registerLastName")?.value.trim() || "",
    salonName: document.getElementById("registerSalonName")?.value.trim() || "",
    country: document.getElementById("registerCountry")?.value || "BE",
    region: document.getElementById("registerRegion")?.value || "Flanders",
    timezone: document.getElementById("registerTimezone")?.value || "Europe/Brussels",
    currency: normalizeCurrency(document.getElementById("registerCurrency")?.value || DEFAULT_CURRENCY),
    password: document.getElementById("registerPassword")?.value || "",
    passwordConfirm: document.getElementById("registerPasswordConfirm")?.value || "",
    termsAccepted: Boolean(document.getElementById("registerTermsAccepted")?.checked)
  };
}

async function checkRegisterEmailAlreadyExists(email) {
  const cleanEmail = String(email || "").trim().toLocaleLowerCase();
  if (!cleanEmail) return false;

  try {
    const { data, error } = await supabaseClient.rpc("email_exists", { check_email: cleanEmail });
    if (error) {
      console.warn("email_exists RPC niet beschikbaar of mislukt:", error.message);
      return false;
    }
    return Boolean(data);
  } catch (error) {
    console.warn("E-mailcontrole overgeslagen:", error?.message || error);
    return false;
  }
}

async function validateRegisterStep(step = registerWizardState.step) {
  const values = getRegisterValues();
  const copy = getRegisterCopy();

  if (step === 2) {
    if (!values.email || !values.email.includes("@")) {
      await appAlert(copy.requiredEmail, { title: copy.stepTitles[1], variant: "warning" });
      return false;
    }
    const exists = await checkRegisterEmailAlreadyExists(values.email);
    if (exists) {
      await appAlert(copy.emailExists, { title: copy.stepTitles[1], variant: "warning" });
      return false;
    }
  }

  if (step === 3) {
    if (!values.firstName || !values.lastName || !values.salonName || !values.country || !values.region || !values.timezone) {
      await appAlert(copy.requiredDetails, { title: copy.stepTitles[2], variant: "warning" });
      return false;
    }
  }

  if (step === 4) {
    if (!values.password || !values.passwordConfirm) {
      await appAlert(copy.requiredPassword, { title: copy.stepTitles[3], variant: "warning" });
      return false;
    }
    if (!values.termsAccepted) {
      await appAlert(copy.termsRequired, { title: copy.stepTitles[3], variant: "warning" });
      return false;
    }
    if (values.password !== values.passwordConfirm) {
      await appAlert(copy.passwordMismatch, { title: copy.stepTitles[3], variant: "warning" });
      return false;
    }
  }

  return true;
}

async function goToNextRegisterStep() {
  if (!(await validateRegisterStep(registerWizardState.step))) return;
  setRegisterStep(registerWizardState.step + 1);
}

function goToPreviousRegisterStep() {
  setRegisterStep(registerWizardState.step - 1);
}

function handleRegisterLanguageChange(event) {
  currentProfilePreferences.language = normalizeLanguage(event.target.value || DEFAULT_LANGUAGE);
  const data = getData();
  data.settings = { ...getSettings(), language: currentProfilePreferences.language, currency: getCurrentCurrency() };
  saveData(data);
  updateStaticI18n();
  setRegisterStep(registerWizardState.step);
}

async function registerAccount(event) {
  if (event) event.preventDefault();

  const copy = getRegisterCopy();
  if (!(await validateRegisterStep(4))) return;

  const values = getRegisterValues();
  const duplicate = await checkRegisterEmailAlreadyExists(values.email);
  if (duplicate) {
    await appAlert(copy.emailExists, { title: copy.stepTitles[1], variant: "warning" });
    return;
  }

  const emailRedirectTo = `${window.location.origin}${window.location.pathname}`;

  const { data, error } = await supabaseClient.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      emailRedirectTo,
      data: {
        first_name: values.firstName,
        last_name: values.lastName,
        full_name: `${values.firstName} ${values.lastName}`.trim(),
        salon_name: values.salonName,
        country: values.country,
        region: values.region,
        timezone: values.timezone,
        language: values.language,
        currency: values.currency,
        terms_accepted: true
      }
    }
  });

  if (error) {
    const message = String(error.message || "");
    const isDuplicate = /already|registered|exists|user/i.test(message);
    await appAlert(isDuplicate ? copy.duplicateFallback : "Registratie mislukt: " + message, { title: copy.title, variant: "danger" });
    return;
  }

  if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    await appAlert(copy.duplicateFallback, { title: copy.title, variant: "warning" });
    return;
  }

  try {
    if (data.user && data.session) {
      await upsertProfile(data.user.id, {
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
        salon_name: values.salonName,
        country: values.country,
        region: values.region,
        timezone: values.timezone,
        language: values.language,
        currency: values.currency,
        terms_accepted: true,
        terms_accepted_at: new Date().toISOString()
      });
    }
  } catch (profileError) {
    console.error("Profiel opslaan mislukt:", profileError.message);
  }

  resetRegisterWizard();
  closeDialog("registerDialog");

  await refreshAuthState();

  if (data.session) {
    await loadAllDataFromSupabase();
    rerenderAll();
    await syncAuthUI();
    switchScreen("agendaScreen", t("agenda"));
    await appAlert("Registratie gelukt. Je bent nu ingelogd.", { title: copy.title, variant: "success" });
    openWelcomeGuide(true);
  } else {
    await syncAuthUI();
    switchScreen("accountScreen", t("account"));
    await appAlert(copy.registrationDone, { title: copy.title, variant: "success" });
  }
}

async function isCurrentAccountBlocked() {
  const profile = await getCurrentProfile();
  return Boolean(profile?.is_blocked);
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

  if (await isCurrentAccountBlocked()) {
    await supabaseClient.auth.signOut();
    await appAlert("Dit account is tijdelijk geblokkeerd. Neem contact op met de beheerder van NailBooker.", { title: "Account geblokkeerd", variant: "danger" });
    return;
  }

  document.getElementById("loginPassword").value = "";

  await refreshAuthState();
  await loadAllDataFromSupabase();
  state.revenueLastRenderSignature = "";
  rerenderAll();
  await syncAuthUI();
  switchScreen("agendaScreen", t("agenda"));
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
  state.revenueLastRenderSignature = "";
  rerenderAll();
  await syncAuthUI();
  switchScreen("accountScreen", t("account"));
}


/* =========================
   SUPPORT
========================= */

const APP_VERSION = "1.0.0";

function getSupportBrowserInfo() {
  const ua = navigator.userAgent || "Onbekende browser";
  if (/Edg\//.test(ua)) return "Microsoft Edge";
  if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) return "Google Chrome";
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return "Safari";
  if (/Firefox\//.test(ua)) return "Firefox";
  return ua.slice(0, 80);
}

function buildSupportDiagnostics() {
  const profile = authProfileCache || {};
  const user = authUserCache || {};
  const salonName = profile.salon_name || getData()?.profile?.salonName || "-";
  const userLabel = profile.email || user.email || "Niet ingelogd";

  return [
    `NailBooker versie: ${APP_VERSION}`,
    `Datum/tijd: ${new Date().toLocaleString("nl-BE")}`,
    `Scherm: ${getScreenTitle(state.currentScreen, state.currentScreen || "-")}`,
    `Browser: ${getSupportBrowserInfo()}`,
    `Platform: ${navigator.platform || "-"}`,
    `Taal: ${navigator.language || "-"}`,
    `Salonnaam: ${salonName}`,
    `Gebruiker: ${userLabel}`,
    `User ID: ${user.id || "-"}`
  ].join("\n");
}

function renderSupportPage() {
  const versionEl = document.getElementById("supportAppVersion");
  const browserEl = document.getElementById("supportBrowserInfo");
  const userEl = document.getElementById("supportUserInfo");
  const profile = authProfileCache || {};
  const user = authUserCache || {};

  if (versionEl) versionEl.textContent = APP_VERSION;
  if (browserEl) browserEl.textContent = getSupportBrowserInfo();
  if (userEl) userEl.textContent = profile.email || user.email || "Niet ingelogd";
}

async function copySupportDiagnostics() {
  const diagnostics = buildSupportDiagnostics();
  try {
    await navigator.clipboard.writeText(diagnostics);
    await appAlert("Technische info gekopieerd.", { title: "Support", variant: "success" });
  } catch (error) {
    await appAlert(diagnostics, { title: "Technische info" });
  }
}

function submitSupportForm(event) {
  event.preventDefault();

  const subject = document.getElementById("supportSubject")?.value?.trim() || "Supportvraag NailBooker";
  const message = document.getElementById("supportMessage")?.value?.trim() || "";
  const includeDiagnostics = document.getElementById("supportIncludeDiagnostics")?.checked !== false;
  const diagnostics = includeDiagnostics ? `\n\n--- Technische info ---\n${buildSupportDiagnostics()}` : "";
  const body = `${message}${diagnostics}`;

  const mailto = `mailto:support@nailbooker.be?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
}

/* =========================
   UI
========================= */


function getScreenTitle(screenId, fallback = "") {
  const map = {
    agendaScreen: "agenda",
    revenueScreen: "revenue",
    costsScreen: "costs",
    todoScreen: "todo",
    clientsScreen: "clients",
    servicesScreen: "services",
    paymentMethodsScreen: "paymentMethods",
    statisticsScreen: "statistics",
    settingsScreen: "settings",
    supportScreen: "support",
    accountScreen: "account"
  };
  const key = map[screenId];
  return key ? t(key) : fallback;
}


const agendaFabActions = [
  { key: "payment", screenId: "paymentMethodsScreen", labelKey: "newPaymentMethod", iconScreen: "paymentMethodsScreen", dx: -92, dy: 0, open: () => openNewPaymentMethodDialog() },
  { key: "services", screenId: "servicesScreen", labelKey: "newService", iconScreen: "servicesScreen", dx: -74, dy: -54, open: () => openNewServiceDialog() },
  { key: "clients", screenId: "clientsScreen", labelKey: "newClient", iconScreen: "clientsScreen", dx: -28, dy: -88, open: () => openNewClientDialog() },
  { key: "costs", screenId: "costsScreen", labelKey: "newCost", iconScreen: "costsScreen", dx: 28, dy: -88, open: () => openNewCostDialog() },
  { key: "todo", screenId: "todoScreen", labelKey: "newTodo", iconScreen: "todoScreen", dx: 74, dy: -54, open: () => openNewTodoDialog() },
  { key: "agenda", screenId: "agendaScreen", labelKey: "newAppointment", iconScreen: "agendaScreen", dx: 92, dy: 0, open: () => openNewAppointmentDialog() }
];

let agendaFabMenuDocumentHandlersInstalled = false;

function getNavIconHtmlForScreen(screenId) {
  const navIcon = document.querySelector(`.nav-btn[data-screen="${screenId}"] .nav-ico`);
  return navIcon ? navIcon.innerHTML : "+";
}

function closeAgendaFabMenu() {
  const menu = document.getElementById("agendaFabMenu");
  const fab = document.getElementById("floatingAddBtn");
  if (menu) menu.classList.remove("open");
  if (fab) {
    fab.classList.remove("fab-menu-open");
    fab.setAttribute("aria-expanded", "false");
  }
}

function openAgendaFabMenu() {
  const menu = ensureAgendaFabMenu();
  const fab = document.getElementById("floatingAddBtn");
  if (!menu || !fab) return;
  menu.classList.add("open");
  fab.classList.add("fab-menu-open");
  fab.setAttribute("aria-expanded", "true");
}

function toggleAgendaFabMenu(event) {
  event?.stopPropagation?.();
  if (isAuthLocked()) return;
  const menu = ensureAgendaFabMenu();
  if (!menu) return;
  if (menu.classList.contains("open")) closeAgendaFabMenu();
  else openAgendaFabMenu();
}

function runAgendaFabAction(action) {
  closeAgendaFabMenu();

  if (!action || isAuthLocked()) return;

  if (state.currentScreen !== action.screenId) {
    switchScreen(action.screenId, getScreenTitle(action.screenId));
  }

  window.setTimeout(() => {
    action.open?.();
  }, 0);
}

function ensureAgendaFabMenu() {
  let menu = document.getElementById("agendaFabMenu");
  const fab = document.getElementById("floatingAddBtn");
  if (!fab) return null;

  if (!menu) {
    menu = document.createElement("div");
    menu.id = "agendaFabMenu";
    menu.className = "agenda-fab-menu";
    menu.setAttribute("aria-label", "Snel toevoegen");

    agendaFabActions.forEach(action => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "agenda-fab-menu-item";
      button.dataset.action = action.key;
      button.style.setProperty("--fab-x", `${action.dx}px`);
      button.style.setProperty("--fab-y", `${action.dy}px`);
      button.setAttribute("aria-label", t(action.labelKey));

      const icon = document.createElement("span");
      icon.className = "agenda-fab-menu-icon";
      icon.innerHTML = getNavIconHtmlForScreen(action.iconScreen);

      const label = document.createElement("span");
      label.className = "agenda-fab-menu-label";
      label.textContent = t(action.labelKey);

      button.appendChild(icon);
      button.appendChild(label);

      button.addEventListener("click", event => {
        event.stopPropagation();
        runAgendaFabAction(action);
      });

      menu.appendChild(button);
    });

    document.body.appendChild(menu);
  } else {
    agendaFabActions.forEach(action => {
      const button = menu.querySelector(`[data-action="${action.key}"]`);
      if (!button) return;
      button.setAttribute("aria-label", t(action.labelKey));
      const label = button.querySelector(".agenda-fab-menu-label");
      if (label) label.textContent = t(action.labelKey);
      const icon = button.querySelector(".agenda-fab-menu-icon");
      if (icon && !icon.innerHTML.trim()) icon.innerHTML = getNavIconHtmlForScreen(action.iconScreen);
    });
  }

  if (!agendaFabMenuDocumentHandlersInstalled) {
    document.addEventListener("click", event => {
      const activeMenu = document.getElementById("agendaFabMenu");
      const activeFab = document.getElementById("floatingAddBtn");
      if (!activeMenu?.classList.contains("open")) return;
      if (activeMenu.contains(event.target) || activeFab?.contains(event.target)) return;
      closeAgendaFabMenu();
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeAgendaFabMenu();
    });

    agendaFabMenuDocumentHandlersInstalled = true;
  }

  return menu;
}


function updateTopbar(screenId, title) {
  document.getElementById("screenTitle").textContent = getScreenTitle(screenId, title);

  const backBtn = document.getElementById("backBtn");
  const fab = document.getElementById("floatingAddBtn");
  const standardCostsBtn = document.getElementById("standardCostsBtn");

  backBtn.classList.toggle("hidden-btn", screenId !== "clientDetailScreen");
  const showStandardCostsFab = screenId === "costsScreen" && getStandardCosts(getData()).length > 0;

  if (standardCostsBtn) {
    standardCostsBtn.onclick = openStandardCostsPopover;
    standardCostsBtn.classList.toggle("hidden", !showStandardCostsFab);
  }

  document.body.classList.toggle("costs-fab-pair", showStandardCostsFab);
  document.body.classList.toggle("costs-action-mode", screenId === "costsScreen");

  if (screenId !== "agendaScreen") {
    closeAgendaFabMenu();
  }

  if (screenId === "agendaScreen") {
    if (isAgendaFabMenuEnabled()) {
      ensureAgendaFabMenu();
      fab.onclick = toggleAgendaFabMenu;
      fab.setAttribute("aria-expanded", "false");
    } else {
      closeAgendaFabMenu();
      fab.onclick = openNewAppointmentDialog;
      fab.classList.remove("fab-menu-open");
      fab.setAttribute("aria-expanded", "false");
    }
    fab.style.display = "block";
  } else if (screenId === "costsScreen") {
    closeAgendaFabMenu();
    fab.onclick = openNewCostDialog;
    fab.style.display = "block";
  } else if (screenId === "todoScreen") {
    fab.onclick = openNewTodoDialog;
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
    closeAgendaFabMenu();
    fab.style.display = "none";
  }
}

function switchScreen(screenId, title, options = {}) {
  const previousScreen = state.currentScreen;

  if (previousScreen === "settingsScreen" && screenId !== "settingsScreen" && !confirmLeaveSettingsIfDirty()) {
    pushCurrentAppHistoryGuard?.();
    return;
  }

  if (isAuthLocked() && !["accountScreen", "supportScreen"].includes(screenId)) {
    screenId = "accountScreen";
    title = "Account";
  }

  state.currentScreen = screenId;

  if (["agendaScreen", "revenueScreen", "costsScreen", "todoScreen", "clientsScreen", "servicesScreen", "paymentMethodsScreen", "statisticsScreen", "settingsScreen", "supportScreen", "adminScreen", "accountScreen"].includes(screenId)) {
    state.previousMainScreen = screenId;
  }

  document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));

  const target = document.getElementById(screenId);
  if (target) target.classList.add("active");

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.screen === screenId);
  });
  ensureActiveNavVisible();

  updateTopbar(screenId, title);

  if (screenId === "revenueScreen") {
    const beforeSignature = state.revenueLastRenderSignature;
    syncRevenueToSelectedDateBeforePreview();
    if (state.revenueLastRenderSignature === beforeSignature) {
      renderRevenue();
    }
  }

  if (screenId === "costsScreen") {
    renderCosts();
  }

  if (screenId === "todoScreen") {
    renderTodos();
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

  if (screenId === "supportScreen") {
    renderSupportPage();
  }

  if (screenId === "paymentMethodsScreen") {
    renderPaymentMethods();
  }

  const activeClient = state.selectedClientId ? customerById(getData(), state.selectedClientId) : null;
  updateClientActionBar(activeClient);
  updateRevenueActionBar();
  updateCostsActionBar();

  if (screenId === "agendaScreen") {
    scheduleWelcomeGuideCheck();
  }

  syncAppBrowserHistory(screenId, title, {
    replace: Boolean(options.replaceHistory),
    skip: Boolean(options.skipHistory),
    previousScreen
  });
}

function panelIsCalendarSwiping() {
  const panel = document.querySelector(".calendar-panel");
  return panel?.dataset?.swipeAnimating === "true" || panel?.classList?.contains("is-swipe-animating");
}

function createCalendarDayCell(dateStr, dayNumber, { isOtherMonth = false, interactive = true, preview = false } = {}) {
  const data = getData();
  const appts = getAppointmentsForDate(dateStr, data);
  const cell = document.createElement("div");
  const isSelected = dateStr === state.selectedDate;
  const isToday = dateStr === todayStr;
  cell.className = `day-cell${isSelected ? " selected" : ""}${isToday ? " today" : ""}${isOtherMonth ? " other-month" : ""}`;
  cell.innerHTML = `<button class="day-button" aria-label="${dateStr}"${preview ? ' tabindex="-1" aria-hidden="true"' : ""}></button><span class="day-number">${dayNumber}</span>`;

  if (appts.length) {
    const dots = document.createElement("div");
    dots.className = "day-dots";

    const maxVisibleDots = window.matchMedia("(max-width: 420px)").matches ? 3 : 4;
    const visibleDots = Math.min(appts.length, maxVisibleDots);

    appts.slice(0, visibleDots).forEach(appointment => {
      const i = document.createElement("i");
      if (isPrivateAppointment(appointment)) i.classList.add("private-dot");
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

  if (!interactive || preview) return cell;

  let dayTapStartX = 0;
  let dayTapStartY = 0;
  let dayTapMoved = false;
  const dayTapMoveTolerance = 12;

  const selectCalendarDate = (event = null) => {
    closeAgendaFabMenu();
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (state.selectedDate !== dateStr) {
      state.revenueSyncSelectedDateOnOpen = true;
    }
    state.selectedDate = dateStr;
    const picked = new Date(dateStr + "T00:00:00");
    if (!Number.isNaN(picked.getTime())) {
      state.currentYear = picked.getFullYear();
      state.currentMonth = picked.getMonth();
    }
    renderCalendar();
    renderAgendaList();
  };

  const rememberDayTapStart = (x, y) => {
    dayTapStartX = x;
    dayTapStartY = y;
    dayTapMoved = false;
  };

  const updateDayTapMove = (x, y) => {
    if (Math.abs(x - dayTapStartX) > dayTapMoveTolerance || Math.abs(y - dayTapStartY) > dayTapMoveTolerance) {
      dayTapMoved = true;
    }
  };

  if (window.PointerEvent) {
    cell.addEventListener("pointerdown", event => rememberDayTapStart(event.clientX, event.clientY));
    cell.addEventListener("pointermove", event => updateDayTapMove(event.clientX, event.clientY));
    cell.addEventListener("pointerup", event => {
      if (dayTapMoved || panelIsCalendarSwiping()) return;
      selectCalendarDate(event);
    });
  } else {
    cell.addEventListener("touchstart", event => {
      if (event.touches.length !== 1) return;
      rememberDayTapStart(event.touches[0].clientX, event.touches[0].clientY);
    }, { passive: true });
    cell.addEventListener("touchmove", event => {
      if (event.touches.length !== 1) return;
      updateDayTapMove(event.touches[0].clientX, event.touches[0].clientY);
    }, { passive: true });
    cell.addEventListener("touchend", event => {
      if (dayTapMoved || panelIsCalendarSwiping()) return;
      selectCalendarDate(event);
    }, { passive: false });
  }

  cell.addEventListener("click", event => {
    if (dayTapMoved || panelIsCalendarSwiping()) return;
    selectCalendarDate(event);
  });

  return cell;
}

function appendCalendarMonthCells(grid, year, month, { interactive = true, preview = false } = {}) {
  if (!grid) return;
  grid.innerHTML = "";

  const first = new Date(year, month, 1);
  const start = new Date(first);
  const weekday = first.getDay() === 0 ? 7 : first.getDay();
  start.setDate(first.getDate() - (weekday - 1));

  const last = new Date(year, month + 1, 0);
  const end = new Date(last);
  const lastWeekday = last.getDay() === 0 ? 7 : last.getDay();
  end.setDate(last.getDate() + (7 - lastWeekday));

  // Toon enkel de volledige weken die de huidige maand effectief raken:
  // - vóór de 1ste enkel aanvullen tot maandag
  // - na de laatste dag enkel aanvullen tot zondag
  // - geen extra volledige weken van vorige/volgende maand
  let index = 0;
  while (true) {
    const d = new Date(start);
    d.setDate(start.getDate() + index);
    if (d > end) break;

    const dateStr = formatDateInput(d);
    const isOtherMonth = d.getMonth() !== month;
    grid.appendChild(createCalendarDayCell(dateStr, d.getDate(), { isOtherMonth, interactive, preview }));
    index += 1;
  }
}

function renderCalendar() {
  const grid = document.getElementById("calendarGrid");
  if (!grid) return;
  document.getElementById("monthPickerBtn").textContent = `${getMonthNameUpper(state.currentMonth)} ${state.currentYear}`;
  appendCalendarMonthCells(grid, state.currentYear, state.currentMonth, { interactive: true, preview: false });
}

function shiftedCalendarMonth(year, month, step) {
  const d = new Date(year, month + step, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
}

function setCalendarMonth(step) {
  const next = shiftedCalendarMonth(state.currentYear, state.currentMonth, step);

  // Alleen de zichtbare kalendermaand wijzigen.
  // De geselecteerde datum en de afsprakenlijst onder de kalender blijven behouden
  // tot de gebruiker bewust een dag kiest of op het vandaag-icoontje klikt.
  state.currentYear = next.year;
  state.currentMonth = next.month;

  renderCalendar();
}

function fillCalendarPreview(preview, year, month) {
  const panel = document.querySelector(".calendar-panel");
  if (!preview || !panel) return;

  preview.innerHTML = panel.innerHTML;
  preview.querySelectorAll("[id]").forEach(el => el.removeAttribute("id"));
  preview.querySelectorAll("button").forEach(button => {
    button.setAttribute("tabindex", "-1");
    button.setAttribute("aria-hidden", "true");
  });

  const title = preview.querySelector(".month-select-btn");
  const grid = preview.querySelector(".calendar-grid");
  if (!title || !grid) return;

  title.textContent = `${getMonthNameUpper(month)} ${year}`;
  appendCalendarMonthCells(grid, year, month, { interactive: false, preview: true });
}

function animateCalendarMonth(step) {
  const panel = document.querySelector(".calendar-panel");
  if (!panel || panel.dataset.swipeAnimating === "true") {
    setCalendarMonth(step);
    return;
  }

  const target = shiftedCalendarMonth(state.currentYear, state.currentMonth, step);
  const width = panel.clientWidth || window.innerWidth || 360;
  const preview = document.createElement("div");
  preview.className = "calendar-swipe-preview";
  fillCalendarPreview(preview, target.year, target.month);
  panel.appendChild(preview);

  panel.dataset.swipeAnimating = "true";
  panel.classList.add("is-swiping");
  panel.style.setProperty("--calendar-current-x", "0px");
  panel.style.setProperty("--calendar-preview-x", `${step > 0 ? width : -width}px`);
  panel.style.setProperty("--calendar-swipe-opacity", "0.65");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      panel.classList.remove("is-swiping");
      panel.classList.add("is-swipe-animating");
      panel.style.setProperty("--calendar-current-x", `${step > 0 ? -width : width}px`);
      panel.style.setProperty("--calendar-preview-x", "0px");
      panel.style.setProperty("--calendar-swipe-opacity", "1");
    });
  });

  const finish = () => {
    panel.removeEventListener("transitionend", onTransitionEnd);
    setCalendarMonth(step);
    preview.remove();
    panel.classList.remove("is-swiping", "is-swipe-animating");
    panel.style.removeProperty("--calendar-current-x");
    panel.style.removeProperty("--calendar-preview-x");
    panel.style.removeProperty("--calendar-swipe-opacity");
    delete panel.dataset.swipeAnimating;
  };

  const onTransitionEnd = event => {
    if (event.target.closest(".calendar-panel") !== panel) return;
    if (event.propertyName !== "transform") return;
    finish();
  };

  panel.addEventListener("transitionend", onTransitionEnd);
  window.setTimeout(() => {
    if (panel.dataset.swipeAnimating === "true") finish();
  }, 360);
}

function setupCalendarSwipeNavigation() {
  const panel = document.querySelector(".calendar-panel");
  if (!panel || panel.dataset.calendarSwipeReady === "true") return;
  panel.dataset.calendarSwipeReady = "true";

  let startX = 0;
  let startY = 0;
  let lastX = 0;
  let tracking = false;
  let horizontal = false;
  let suppressNextClick = false;
  let suppressClickTimer = null;
  let dragPreview = null;
  let dragStep = 0;
  const threshold = 44;
  const intentThreshold = 10;

  const clearDragStyles = () => {
    if (dragPreview) {
      dragPreview.remove();
      dragPreview = null;
    }
    dragStep = 0;
    panel.classList.remove("is-swiping", "is-swipe-animating");
    panel.style.removeProperty("--calendar-current-x");
    panel.style.removeProperty("--calendar-preview-x");
    panel.style.removeProperty("--calendar-swipe-opacity");
    delete panel.dataset.swipeAnimating;
  };

  const reset = () => {
    tracking = false;
    horizontal = false;
    startX = 0;
    startY = 0;
    lastX = 0;
  };

  const prepareDragPreview = dx => {
    const step = dx < 0 ? 1 : -1;
    if (dragPreview && dragStep === step) return true;

    if (dragPreview) dragPreview.remove();
    dragStep = step;

    const target = shiftedCalendarMonth(state.currentYear, state.currentMonth, step);
    dragPreview = document.createElement("div");
    dragPreview.className = "calendar-swipe-preview";
    fillCalendarPreview(dragPreview, target.year, target.month);
    panel.appendChild(dragPreview);
    panel.dataset.swipeAnimating = "true";
    panel.classList.remove("is-swipe-animating");
    panel.classList.add("is-swiping");
    return true;
  };

  const updateDragPosition = dx => {
    if (!prepareDragPreview(dx)) return false;
    const width = panel.clientWidth || window.innerWidth || 360;
    const limitedDx = Math.max(-width, Math.min(width, dx));
    const previewStart = dragStep > 0 ? width : -width;
    const progress = Math.min(1, Math.abs(limitedDx) / Math.max(width, 1));

    panel.style.setProperty("--calendar-current-x", `${limitedDx}px`);
    panel.style.setProperty("--calendar-preview-x", `${previewStart + limitedDx}px`);
    panel.style.setProperty("--calendar-swipe-opacity", String(0.35 + (progress * 0.65)));
    return true;
  };

  const finishInteractiveSwipe = commit => {
    const step = dragStep;
    const width = panel.clientWidth || window.innerWidth || 360;

    if (!dragPreview || !step) {
      clearDragStyles();
      return;
    }

    panel.classList.remove("is-swiping");
    panel.classList.add("is-swipe-animating");

    if (commit) {
      panel.style.setProperty("--calendar-current-x", `${step > 0 ? -width : width}px`);
      panel.style.setProperty("--calendar-preview-x", "0px");
      panel.style.setProperty("--calendar-swipe-opacity", "1");
    } else {
      panel.style.setProperty("--calendar-current-x", "0px");
      panel.style.setProperty("--calendar-preview-x", `${step > 0 ? width : -width}px`);
      panel.style.setProperty("--calendar-swipe-opacity", "0.35");
    }

    const finish = () => {
      panel.removeEventListener("transitionend", onTransitionEnd);
      if (commit) setCalendarMonth(step);
      clearDragStyles();
    };

    const onTransitionEnd = event => {
      if (event.target.closest(".calendar-panel") !== panel) return;
      if (event.propertyName !== "transform") return;
      finish();
    };

    panel.addEventListener("transitionend", onTransitionEnd);
    window.setTimeout(() => {
      if (panel.dataset.swipeAnimating === "true") finish();
    }, 360);
  };

  panel.addEventListener("touchstart", event => {
    if (event.touches.length !== 1) return;

    const interactive = event.target.closest("input, select, textarea, dialog");
    const headerButton = event.target.closest(".month-header button");
    if (interactive || headerButton || panel.dataset.swipeAnimating === "true") return;

    tracking = true;
    horizontal = false;
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    lastX = startX;
  }, { passive: true });

  panel.addEventListener("touchmove", event => {
    if (!tracking || event.touches.length !== 1) return;

    const x = event.touches[0].clientX;
    const y = event.touches[0].clientY;
    const dx = x - startX;
    const dy = y - startY;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (!horizontal) {
      if (absX < intentThreshold && absY < intentThreshold) return;

      if (absY > absX) {
        reset();
        clearDragStyles();
        return;
      }

      horizontal = true;
    }

    if (!updateDragPosition(dx)) return;
    event.preventDefault();
    lastX = x;
  }, { passive: false });

  panel.addEventListener("touchend", () => {
    if (!tracking || !horizontal) {
      reset();
      clearDragStyles();
      return;
    }

    const dx = lastX - startX;
    const commit = Math.abs(dx) >= threshold;
    reset();

    suppressNextClick = commit;
    finishInteractiveSwipe(commit);
  }, { passive: true });

  panel.addEventListener("touchcancel", () => {
    reset();
    finishInteractiveSwipe(false);
  }, { passive: true });

  panel.addEventListener("click", event => {
    if (!suppressNextClick) return;

    if (event.target.closest(".month-header button")) {
      suppressNextClick = false;
      return;
    }

    suppressNextClick = false;
    event.preventDefault();
    event.stopPropagation();
  }, true);
}


function getMainSwipeScreens() {
  return Array.from(document.querySelectorAll(".bottom-nav .nav-btn"))
    .map(btn => ({
      screenId: btn.dataset.screen,
      title: btn.dataset.title || btn.textContent.trim()
    }))
    .filter(item => item.screenId && document.getElementById(item.screenId))
    .filter(item => {
      const btn = document.querySelector(`.bottom-nav .nav-btn[data-screen="${item.screenId}"]`);
      return !btn || (!btn.classList.contains("hidden") && btn.getAttribute("aria-hidden") !== "true" && !btn.disabled);
    })
    .filter(item => !isAuthLocked() || item.screenId === "accountScreen");
}

function ensureActiveNavVisible() {
  const nav = document.querySelector(".bottom-nav");
  const activeBtn = nav?.querySelector(".nav-btn.active");
  if (!nav || !activeBtn || typeof activeBtn.scrollIntoView !== "function") return;

  window.requestAnimationFrame(() => {
    try {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest"
      });
    } catch (error) {
      const navRect = nav.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      if (btnRect.left < navRect.left) {
        nav.scrollLeft -= (navRect.left - btnRect.left) + 10;
      } else if (btnRect.right > navRect.right) {
        nav.scrollLeft += (btnRect.right - navRect.right) + 10;
      }
    }
  });
}

function animateAppScreen(step) {
  const layout = document.querySelector(".main-layout");
  if (!layout || layout.dataset.pageSwipeAnimating === "true") return false;

  const screens = getMainSwipeScreens();
  const currentIndex = screens.findIndex(item => item.screenId === state.currentScreen);
  const targetIndex = currentIndex + step;

  if (currentIndex < 0 || targetIndex < 0 || targetIndex >= screens.length) {
    return false;
  }

  const currentScreen = document.getElementById(screens[currentIndex].screenId);
  const targetScreen = document.getElementById(screens[targetIndex].screenId);
  if (!currentScreen || !targetScreen || currentScreen === targetScreen) return false;

  const width = layout.clientWidth || window.innerWidth || 360;
  const target = screens[targetIndex];

  if (target.screenId === "revenueScreen") {
    syncRevenueToSelectedDateBeforePreview();
  }

  layout.dataset.pageSwipeAnimating = "true";
  targetScreen.classList.add("swipe-preview");
  layout.classList.add("is-swiping");
  layout.style.setProperty("--swipe-x", "0px");
  layout.style.setProperty("--swipe-preview-x", `${step > 0 ? width : -width}px`);
  layout.style.setProperty("--swipe-opacity", "0.72");

  const cleanup = () => {
    layout.removeEventListener("transitionend", onTransitionEnd);
    targetScreen.classList.remove("swipe-preview");
    layout.classList.remove("is-swiping", "is-swipe-animating");
    layout.style.removeProperty("--swipe-x");
    layout.style.removeProperty("--swipe-preview-x");
    layout.style.removeProperty("--swipe-opacity");
    delete layout.dataset.pageSwipeAnimating;
  };

  const finish = () => {
    cleanup();
    switchScreen(target.screenId, target.title);
  };

  const onTransitionEnd = event => {
    if (event.target !== currentScreen || event.propertyName !== "transform") return;
    finish();
  };

  layout.addEventListener("transitionend", onTransitionEnd);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      layout.classList.remove("is-swiping");
      layout.classList.add("is-swipe-animating");
      layout.style.setProperty("--swipe-x", `${step > 0 ? -width : width}px`);
      layout.style.setProperty("--swipe-preview-x", "0px");
      layout.style.setProperty("--swipe-opacity", "1");
    });
  });

  window.setTimeout(() => {
    if (layout.dataset.pageSwipeAnimating === "true") finish();
  }, 380);

  return true;
}

function setupAppPageSwipeNavigation() {
  const layout = document.querySelector(".main-layout");
  if (!layout || layout.dataset.pageSwipeReady === "true") return;
  layout.dataset.pageSwipeReady = "true";

  let startX = 0;
  let startY = 0;
  let lastX = 0;
  let tracking = false;
  let horizontal = false;
  let suppressNextClick = false;
  let suppressClickTimer = null;
  let dragTargetScreen = null;
  let dragTarget = null;
  let dragStep = 0;
  const threshold = 56;
  const intentThreshold = 12;

  const reset = () => {
    tracking = false;
    horizontal = false;
    startX = 0;
    startY = 0;
    lastX = 0;
  };

  const clearDragStyles = () => {
    if (dragTargetScreen) {
      dragTargetScreen.classList.remove("swipe-preview");
    }
    dragTargetScreen = null;
    dragTarget = null;
    dragStep = 0;
    layout.classList.remove("is-swiping", "is-swipe-animating");
    layout.style.removeProperty("--swipe-x");
    layout.style.removeProperty("--swipe-preview-x");
    layout.style.removeProperty("--swipe-opacity");
    delete layout.dataset.pageSwipeAnimating;
  };

  const preparePageDrag = dx => {
    const step = dx < 0 ? 1 : -1;
    if (dragTargetScreen && dragStep === step) return true;

    const screens = getMainSwipeScreens();
    const currentIndex = screens.findIndex(item => item.screenId === state.currentScreen);
    const targetIndex = currentIndex + step;

    if (currentIndex < 0 || targetIndex < 0 || targetIndex >= screens.length) {
      clearDragStyles();
      return false;
    }

    const targetScreen = document.getElementById(screens[targetIndex].screenId);
    if (!targetScreen) {
      clearDragStyles();
      return false;
    }

    if (dragTargetScreen) dragTargetScreen.classList.remove("swipe-preview");

    dragStep = step;
    dragTarget = screens[targetIndex];
    dragTargetScreen = targetScreen;
    if (dragTarget.screenId === "revenueScreen") {
      syncRevenueToSelectedDateBeforePreview();
    }
    dragTargetScreen.classList.add("swipe-preview");
    layout.dataset.pageSwipeAnimating = "true";
    layout.classList.remove("is-swipe-animating");
    layout.classList.add("is-swiping");
    return true;
  };

  const updatePageDragPosition = dx => {
    if (!preparePageDrag(dx)) return false;

    const width = layout.clientWidth || window.innerWidth || 360;
    const limitedDx = Math.max(-width, Math.min(width, dx));
    const previewStart = dragStep > 0 ? width : -width;
    const progress = Math.min(1, Math.abs(limitedDx) / Math.max(width, 1));

    layout.style.setProperty("--swipe-x", `${limitedDx}px`);
    layout.style.setProperty("--swipe-preview-x", `${previewStart + limitedDx}px`);
    layout.style.setProperty("--swipe-opacity", String(0.35 + (progress * 0.65)));
    return true;
  };

  const finishPageDrag = commit => {
    const currentScreen = document.getElementById(state.currentScreen);
    const target = dragTarget;
    const targetScreen = dragTargetScreen;
    const step = dragStep;
    const width = layout.clientWidth || window.innerWidth || 360;

    if (!target || !targetScreen || !step || !currentScreen) {
      clearDragStyles();
      return false;
    }

    layout.classList.remove("is-swiping");
    layout.classList.add("is-swipe-animating");

    if (commit) {
      layout.style.setProperty("--swipe-x", `${step > 0 ? -width : width}px`);
      layout.style.setProperty("--swipe-preview-x", "0px");
      layout.style.setProperty("--swipe-opacity", "1");
    } else {
      layout.style.setProperty("--swipe-x", "0px");
      layout.style.setProperty("--swipe-preview-x", `${step > 0 ? width : -width}px`);
      layout.style.setProperty("--swipe-opacity", "0.35");
    }

    const finish = () => {
      layout.removeEventListener("transitionend", onTransitionEnd);
      clearDragStyles();
      if (commit) switchScreen(target.screenId, target.title);
    };

    const onTransitionEnd = event => {
      if (event.target !== currentScreen || event.propertyName !== "transform") return;
      finish();
    };

    layout.addEventListener("transitionend", onTransitionEnd);
    window.setTimeout(() => {
      if (layout.dataset.pageSwipeAnimating === "true") finish();
    }, 380);

    return commit;
  };

  layout.addEventListener("touchstart", event => {
    if (event.touches.length !== 1) return;
    if (layout.dataset.pageSwipeAnimating === "true") return;

    const target = event.target;
    if (target.closest("dialog, .modal, .payment-popover, .calendar-panel, .bottom-nav")) return;

    tracking = true;
    horizontal = false;
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    lastX = startX;
  }, { passive: true });

  layout.addEventListener("touchmove", event => {
    if (!tracking || event.touches.length !== 1) return;

    const x = event.touches[0].clientX;
    const y = event.touches[0].clientY;
    const dx = x - startX;
    const dy = y - startY;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (!horizontal) {
      if (absX < intentThreshold && absY < intentThreshold) return;

      if (absY > absX) {
        reset();
        clearDragStyles();
        return;
      }

      horizontal = true;
    }

    if (!updatePageDragPosition(dx)) return;
    event.preventDefault();
    lastX = x;
  }, { passive: false });

  layout.addEventListener("touchend", () => {
    if (!tracking || !horizontal) {
      reset();
      clearDragStyles();
      return;
    }

    const dx = lastX - startX;
    const commit = Math.abs(dx) >= threshold;
    reset();

    const didNavigate = finishPageDrag(commit);

    // Na een echte swipe kan iOS/Chrome nog een synthetische click afvuren
    // op het element waar de swipe begon. Die willen we kort blokkeren.
    // Belangrijk: deze blokkering mag NIET blijven hangen tot de eerste
    // echte tap op de nieuwe pagina, anders moet je daar 2 keer klikken.
    suppressNextClick = Boolean(didNavigate);
    window.clearTimeout(suppressClickTimer);
    if (suppressNextClick) {
      suppressClickTimer = window.setTimeout(() => {
        suppressNextClick = false;
      }, 300);
    }
  }, { passive: true });

  layout.addEventListener("touchcancel", () => {
    reset();
    finishPageDrag(false);
  }, { passive: true });

  layout.addEventListener("click", event => {
    if (!suppressNextClick) return;
    suppressNextClick = false;
    window.clearTimeout(suppressClickTimer);
    event.preventDefault();
    event.stopPropagation();
  }, true);
}


function renderAgendaList() {
  const data = getData();
  const list = document.getElementById("agendaList");

  document.getElementById("agendaListTitle").textContent = `${t("appointmentsOn")} ${formatLongDate(state.selectedDate)}`;
  const jumpBtn = document.getElementById("jumpToTodayBtn");
  if (jumpBtn) {
    jumpBtn.classList.toggle("hidden", state.selectedDate === todayStr);
  }

  const appts = getAppointmentsForDate(state.selectedDate, data);

  if (!appts.length) {
    list.innerHTML = `<div class="empty-state">${t("noAppointmentsOnDay")}</div>`;
    return;
  }

  list.innerHTML = "";

  const card = document.createElement("div");
  card.className = "appointment-card";

  appts.forEach(app => {
    const customer = customerById(data, app.customerId);
    const service = serviceById(data, app.serviceId);
    const privateApp = isPrivateAppointment(app);

    const row = document.createElement("div");
    row.className = `appointment-row${privateApp ? " private-appointment-row" : ""}`;
    const endTime = getAppointmentDisplayEndTime(app, getSettings().defaultBreakMinutes);
    const privateBounds = privateApp ? getPrivateRangeBounds(app) : null;
    const isMultiDayPrivate = Boolean(privateBounds && privateBounds.end > privateBounds.start);
    const privateDisplayTime = privateApp ? getPrivateAgendaDisplayTime(app, state.selectedDate) : null;

    const appointmentMetaParts = [];
    if (privateApp) {
      if (isMultiDayPrivate) appointmentMetaParts.push(`${formatShortDate(privateBounds.start)} t/m ${formatShortDate(privateBounds.end)}`);
      if (String(app.privateDetails || "").trim()) appointmentMetaParts.push("Meer details ...");
      else appointmentMetaParts.push("Privé-afspraak");
    } else {
      if (service?.name) appointmentMetaParts.push(service.name);
      if ((app.status || "").toLowerCase() === "no-show") {
        appointmentMetaParts.push("no show");
      } else if (app.paid && paymentMethodNameForAppointment(app, data)) {
        appointmentMetaParts.push(paymentMethodNameForAppointment(app, data));
      }
    }

    row.innerHTML = `
      <div class="time-block">
        <div class="time">${privateApp ? privateDisplayTime.main : app.time}</div>
        <div class="time-end">${privateApp ? privateDisplayTime.sub : `tot ${endTime}`}</div>
      </div>
      <div>
        <div class="main-name appointment-main-name">${privateApp ? htmlEscape(app.privateTitle || "Privé") : `${customer ? fullName(customer) : "Onbekend"}${String(app.remarks || "").trim() ? '<span class="appointment-remarks-star" title="Opmerking aanwezig" aria-label="Opmerking aanwezig">★</span>' : ""}`}</div>
        <div class="meta">${htmlEscape(appointmentMetaParts.join(" · "))}</div>
      </div>
      ${privateApp ? '<span class="private-chip">Privé</span>' : `<button class="price-chip ${app.paid ? "paid" : ""} ${(app.status || "").toLowerCase() === "no-show" ? "no-show" : ""}" data-id="${app.id}" type="button">${euro(app.price, app.currency)}</button>`}
    `;

    row.addEventListener("click", (e) => {
      if (e.target.closest(".price-chip")) return;
      if (privateApp) {
        openEditAppointmentDialog(app.sourceAppointmentId || app.id);
        return;
      }
      openAppointmentActionPopover(app.id, row);
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
  allBtn.textContent = t("all");
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

  const compactQuery = q.replace(/\D/g, "");
  let clients = data.customers.filter(c => {
    const haystack = customerSearchText(c);
    const phoneDigits = String(c.phone || "").replace(/\D/g, "");
    return haystack.includes(q) || (compactQuery && phoneDigits.includes(compactQuery));
  });

  if (state.clientLetter) {
    clients = clients.filter(c => (c.firstName || "").toUpperCase().startsWith(state.clientLetter));
  }

  clients.sort((a, b) => (a.firstName || "").localeCompare(b.firstName || ""));

  if (!clients.length) {
    list.innerHTML = `<div class="empty-state">${t("noClientsFound")}</div>`;
    return;
  }

  list.innerHTML = "";

  clients.forEach(client => {
    const count = data.appointments.filter(a => String(a.customerId) === String(client.id)).length;
    const phone = String(client.phone || "").trim();
    const card = document.createElement("div");
    card.className = "client-card";

    card.innerHTML = `
      <button type="button" data-id="${client.id}">
        <div class="client-name">${escapeHtml(fullName(client) || "Naamloos")}</div>
        <div class="meta">${escapeHtml(phone || t("noPhone"))} · ${count} ${count === 1 ? t("appointmentSingular") : t("appointmentPlural")}</div>
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => openClientDetail(client.id));
    list.appendChild(card);
  });
}


function renderServiceAlphabetFilter() {
  const wrap = document.getElementById("serviceAlphabetFilter");
  if (!wrap) return;

  const data = getData();
  const services = Array.isArray(data.services) ? data.services : [];
  const letters = [...new Set(
    services
      .filter(service => state.showInactiveServices || service.isActive !== false)
      .map(service => String(service.name || "").trim().charAt(0).toUpperCase())
      .filter(Boolean)
  )].sort((a, b) => a.localeCompare(b, getCurrentLanguage()));

  if (state.serviceLetter && !letters.includes(state.serviceLetter)) {
    state.serviceLetter = "";
  }

  wrap.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.className = "alphabet-btn all-btn" + (!state.serviceLetter ? " active" : "");
  allBtn.type = "button";
  allBtn.textContent = t("all");
  allBtn.onclick = () => {
    state.serviceLetter = "";
    renderServiceAlphabetFilter();
    renderServices();
  };
  wrap.appendChild(allBtn);

  letters.forEach(letter => {
    const btn = document.createElement("button");
    btn.className = "alphabet-btn" + (state.serviceLetter === letter ? " active" : "");
    btn.type = "button";
    btn.textContent = letter;

    btn.onclick = () => {
      state.serviceLetter = letter;
      renderServiceAlphabetFilter();
      renderServices();
    };

    wrap.appendChild(btn);
  });
}

function renderServices() {
  const data = getData();
  const list = document.getElementById("servicesList");
  if (!list) return;

  const services = Array.isArray(data.services) ? data.services : [];
  const searchInput = document.getElementById("serviceSearch");
  const q = String(searchInput?.value || "").trim().toLowerCase();
  const matchesSearch = service => !q || [service.name, service.duration, service.price]
    .join(" ")
    .toLowerCase()
    .includes(q);
  const matchesLetter = service => !state.serviceLetter || String(service.name || "").trim().toUpperCase().startsWith(state.serviceLetter);

  renderServiceAlphabetFilter();

  const activeServices = services
    .filter(service => service.isActive !== false)
    .filter(matchesSearch)
    .filter(matchesLetter)
    .sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "nl-BE"));
  const inactiveServices = services
    .filter(service => service.isActive === false)
    .filter(matchesSearch)
    .filter(matchesLetter)
    .sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "nl-BE"));
  const visibleServices = state.showInactiveServices
    ? [...activeServices, ...inactiveServices]
    : activeServices;

  list.innerHTML = "";

  if (!visibleServices.length) {
    list.innerHTML = `<div class="empty-state">${t("noActiveServices")}</div>`;
  } else {
    visibleServices.forEach(service => {
      const isInactive = service.isActive === false;
      const card = document.createElement("div");
      card.className = `service-card${isInactive ? " service-card-inactive" : ""}`;

      card.innerHTML = `
        <button type="button" data-id="${service.id}">
          <div class="client-name">${escapeHtml(service.name || "Naamloze dienst")}</div>
          <div class="meta">${service.duration} min · ${euro(service.price)}${isInactive ? ` · ${t("inactive")}` : ""}</div>
        </button>
      `;

      card.querySelector("button").addEventListener("click", () => openEditServiceDialog(service.id));
      list.appendChild(card);
    });
  }

  if (inactiveServices.length) {
    const toggleWrap = document.createElement("label");
    toggleWrap.className = "inactive-services-toggle";
    toggleWrap.innerHTML = `
      <input id="showInactiveServices" type="checkbox" ${state.showInactiveServices ? "checked" : ""} />
      <span>${t("showInactiveServices")}</span>
    `;

    toggleWrap.querySelector("input").addEventListener("change", event => {
      state.showInactiveServices = event.target.checked;
      renderServices();
    });

    list.appendChild(toggleWrap);
  }
}


function paymentMethodLabel(value) {
  if (!value) return "";
  const data = getData();
  return paymentMethodNameById(data, value) || String(value);
}

function formatRevenueDayChip(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const day = new Intl.DateTimeFormat(getCurrentLanguage(), { weekday: "short" }).format(d);
  return `${capitalizeFirst(day)} ${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function formatRevenueDayTile(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const day = new Intl.DateTimeFormat(getCurrentLanguage(), { weekday: "long" }).format(d);
  return `${capitalizeFirst(day)}<br>${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
}

function formatRevenueWeekTile(dateStr) {
  const bounds = weekBounds(dateStr);
  const start = new Date(bounds.start + "T00:00:00");
  const end = new Date(bounds.end + "T00:00:00");
  return `${String(start.getDate()).padStart(2, "0")}-${String(start.getMonth() + 1).padStart(2, "0")}-${start.getFullYear()}<br>${String(end.getDate()).padStart(2, "0")}-${String(end.getMonth() + 1).padStart(2, "0")}-${end.getFullYear()}`;
}

function formatRevenueMonthTile(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return `${capitalizeFirst(getMonthNameLong(d.getMonth()))}<br>${d.getFullYear()}`;
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

  if (mode === "week") {
    d.setDate(d.getDate() + (step * 7));
    return formatDateInput(d);
  }

  d.setDate(d.getDate() + step);
  return formatDateInput(d);
}

function getRevenueStatusFilterState() {
  return {
    showPaid: true,
    showUnpaid: true
  };
}

function getRevenueStatusFilterLabel() {
  const { showPaid, showUnpaid } = getRevenueStatusFilterState();
  if (showPaid && showUnpaid) return "Betaald + Onbetaald";
  if (showPaid) return "Betaald";
  if (showUnpaid) return "Onbetaald";
  return "Geen status geselecteerd";
}

function getRevenueRenderSignature() {
  const data = getData();
  const type = document.getElementById("revenuePeriodType")?.value || "day";
  const anchor = document.getElementById("revenueDate")?.value || todayStr;
  const appointmentSignature = (data.appointments || [])
    .map(a => [
      a.id,
      a.date,
      a.time,
      a.price,
      a.paid ? 1 : 0,
      a.paymentMethodName || "",
      a.currency || ""
    ].join(":"))
    .join("|");

  return [type, anchor, appointmentSignature].join("||");
}

function syncRevenueToSelectedDateBeforePreview() {
  const selectedDate = state.selectedDate || todayStr;
  const periodType = document.getElementById("revenuePeriodType");
  const dateInput = document.getElementById("revenueDate");
  if (!periodType || !dateInput) return;

  // De gekozen kalenderdag blijft de ankerdatum voor Omzet,
  // maar het laatst gekozen omzettype (dag/week/maand/jaar) blijft behouden.
  const needsSync = !state.revenueInitialized
    || state.revenueSyncSelectedDateOnOpen
    || state.revenueSelectedDateSynced !== selectedDate
    || dateInput.value !== selectedDate;

  if (!needsSync) return;

  dateInput.value = selectedDate;
  state.revenueInitialized = true;
  state.revenueSelectedDateSynced = selectedDate;
  state.revenueSyncSelectedDateOnOpen = false;
  renderRevenue();
}

function setRevenuePeriod(type, dateStr) {
  const safeDate = dateStr || document.getElementById("revenueDate").value || todayStr;
  const periodType = document.getElementById("revenuePeriodType");
  const dateInput = document.getElementById("revenueDate");

  if (periodType) periodType.value = type;
  if (dateInput) dateInput.value = safeDate;

  if (type === "day") {
    state.revenueInitialized = true;
    state.revenueSelectedDateSynced = safeDate;
    state.revenueSyncSelectedDateOnOpen = false;
  }

  renderRevenue();
}


function attachRevenuePeriodSwipe(button, mode, target = "revenue") {
  if (!button || button.dataset.revenueSwipeReady === "1") return;
  button.dataset.revenueSwipeReady = "1";
  button.dataset.revenueSwipeTarget = target;

  const threshold = 20;
  const maxDrag = 5;
  const resetSwipeVisual = () => {
    button.classList.remove("is-revenue-swiping", "is-revenue-swipe-committing", "is-revenue-swipe-settling");
    button.style.removeProperty("--revenue-swipe-y");
    button.style.removeProperty("--revenue-swipe-opacity");
  };

  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let lastDeltaY = 0;
  let isSwiping = false;
  let moved = false;

  const setSwipeVisual = (deltaY, opacity = 1) => {
    button.style.setProperty("--revenue-swipe-y", `${deltaY}px`);
    button.style.setProperty("--revenue-swipe-opacity", String(opacity));
  };

  const commitSwipe = (step) => {
    const anchor = target === "costs" ? getCostsPeriodDate() : (document.getElementById("revenueDate")?.value || todayStr);
    const nextDate = shiftRevenueDate(anchor, mode, step);
    const exitY = step > 0 ? -14 : 14;
    const enterY = step > 0 ? 14 : -14;

    button.dataset.revenueSwipeSuppressClick = "1";
    window.setTimeout(() => delete button.dataset.revenueSwipeSuppressClick, 360);

    button.classList.remove("is-revenue-swiping");
    button.classList.add("is-revenue-swipe-committing");
    setSwipeVisual(exitY, 0.25);

    window.setTimeout(() => {
      if (target === "costs") setCostsPeriod(mode, nextDate);
      else setRevenuePeriod(mode, nextDate);
      button.classList.remove("is-revenue-swipe-committing");
      button.classList.add("is-revenue-swipe-settling");
      setSwipeVisual(enterY, 0.25);

      requestAnimationFrame(() => {
        setSwipeVisual(0, 1);
        window.setTimeout(resetSwipeVisual, 230);
      });
    }, 105);
  };

  button.addEventListener("pointerdown", event => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    lastDeltaY = 0;
    isSwiping = false;
    moved = false;
    button.classList.remove("is-revenue-swipe-committing", "is-revenue-swipe-settling");
  });

  button.addEventListener("pointermove", event => {
    if (pointerId !== event.pointerId) return;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (!isSwiping && absY > 8 && absY > absX * 1.15) {
      isSwiping = true;
      moved = true;
      button.classList.add("is-revenue-swiping");
      try { button.setPointerCapture(event.pointerId); } catch (error) {}
    }

    if (!isSwiping) return;
    event.preventDefault();
    lastDeltaY = deltaY;
    const limitedY = Math.max(-maxDrag, Math.min(maxDrag, deltaY * 0.16));
    const opacity = Math.max(0.94, 1 - (Math.abs(limitedY) / 260));
    setSwipeVisual(limitedY, opacity);
  }, { passive: false });

  const finish = (event) => {
    if (pointerId !== event.pointerId) return;
    if (isSwiping) {
      event.preventDefault();
      const step = lastDeltaY < -threshold ? 1 : (lastDeltaY > threshold ? -1 : 0);
      if (step) {
        commitSwipe(step);
      } else {
        button.classList.remove("is-revenue-swiping");
        button.classList.add("is-revenue-swipe-settling");
        setSwipeVisual(0, 1);
        window.setTimeout(resetSwipeVisual, 220);
      }
    }
    pointerId = null;
    isSwiping = false;
    if (moved) {
      button.dataset.revenueSwipeSuppressClick = "1";
      window.setTimeout(() => delete button.dataset.revenueSwipeSuppressClick, 260);
    }
  };

  button.addEventListener("pointerup", finish, { passive: false });
  button.addEventListener("pointercancel", event => {
    if (pointerId !== event.pointerId) return;
    pointerId = null;
    isSwiping = false;
    resetSwipeVisual();
  });
}

function syncRevenuePeriodChips() {
  const type = document.getElementById("revenuePeriodType").value;
  const anchor = document.getElementById("revenueDate").value || todayStr;
  const anchorDate = new Date(anchor + "T00:00:00");

  const yearBtn = document.getElementById("revenueYearBtn");
  const monthBtn = document.getElementById("revenueMonthBtn");
  const weekBtn = document.getElementById("revenueWeekBtn");
  const dayBtn = document.getElementById("revenueDayBtn");

  const yearLabel = document.getElementById("revenueYearLabel");
  const monthLabel = document.getElementById("revenueMonthLabel");
  const weekLabel = document.getElementById("revenueWeekLabel");
  const dayLabel = document.getElementById("revenueDayLabel");

  if (yearLabel) yearLabel.textContent = String(anchorDate.getFullYear());
  if (monthLabel) monthLabel.innerHTML = formatRevenueMonthTile(anchor);
  if (weekLabel) weekLabel.innerHTML = formatRevenueWeekTile(anchor);
  if (dayLabel) dayLabel.innerHTML = formatRevenueDayTile(anchor);

  if (yearBtn) yearBtn.classList.toggle("active", type === "year");
  if (monthBtn) monthBtn.classList.toggle("active", type === "month");
  if (weekBtn) weekBtn.classList.toggle("active", type === "week");
  if (dayBtn) dayBtn.classList.toggle("active", type === "day");
}

function revenueFilteredAppointments() {
  const data = getData();
  const type = document.getElementById("revenuePeriodType").value;
  const anchor = document.getElementById("revenueDate").value || todayStr;
  let filtered = data.appointments.filter(a => String(a.status || "").toLowerCase() !== "no-show");

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

  return filtered;
}

function renderRevenueFilters() {
  // Geen zichtbare omzetfilters meer nodig.
}


function clampRevenueDay(year, monthIndex, day) {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  return Math.min(day, daysInMonth);
}

function getRevenueDataYears() {
  const data = getData();
  const sourceItems = getRevenuePickerTarget() === "costs" ? getCosts(data) : data.appointments;
  const years = sourceItems
    .map(item => Number(String(item.date || "").slice(0, 4)))
    .filter(Boolean);

  const currentYear = new Date(getRevenuePickerAnchorDate() + "T00:00:00").getFullYear();
  const minYear = years.length ? Math.min(...years, currentYear) : currentYear - 3;
  const maxYear = years.length ? Math.max(...years, currentYear) : currentYear + 3;

  return Array.from({ length: (maxYear - minYear + 5) }, (_, i) => minYear - 2 + i);
}

function centerRevenueWheelColumn(column, value, behavior = "auto") {
  if (!column) return;
  const selector = column.dataset.looping === "true"
    ? `.revenue-wheel-option[data-value="${value}"][data-loop-anchor="true"]`
    : `.revenue-wheel-option[data-value="${value}"]`;
  const option = column.querySelector(selector) || column.querySelector(`.revenue-wheel-option[data-value="${value}"]`);
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
      const pickerState = column.closest("#appointmentWheelColumns") ? appointmentPickerState : revenuePickerState;
      pickerState.selected[key] = value;
      centerRevenueWheelColumn(column, value, column.dataset.looping === "true" ? "auto" : behavior);
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
      const pickerState = column.closest("#appointmentWheelColumns") ? appointmentPickerState : revenuePickerState;
      pickerState.selected[key] = option.dataset.value;
      centerRevenueWheelColumn(column, option.dataset.value, "smooth");
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => finish("smooth"), 130);
    });
  });

  // Niet meteen finish("auto") uitvoeren: vóór het openen van de dialog
  // hebben de wielkolommen nog geen betrouwbare hoogte. Daardoor werd de
  // eerste optie (bv. 01 / Januari / 2024) als actief opgeslagen vóór we
  // konden centreren op de datum die in Omzet actief is.
}

function buildRevenueWheelColumn(key, values, formatter = value => value, options = {}) {
  const loopCount = options.loop ? 7 : 1;
  const middleLoopIndex = Math.floor(loopCount / 2);
  const repeatedValues = Array.from({ length: loopCount }, (_, loopIndex) =>
    values.map(value => ({ value, loopIndex }))
  ).flat();

  return `
    <div class="revenue-wheel-column" data-key="${key}"${options.loop ? ' data-looping="true"' : ""}>
      ${repeatedValues.map(({ value, loopIndex }) => `<div class="revenue-wheel-option" data-value="${value}"${loopIndex === middleLoopIndex ? ' data-loop-anchor="true"' : ""}>${formatter(value)}</div>`).join("")}
    </div>
  `;
}




const appointmentPickerState = {
  mode: "date",
  selected: {}
};

function formatAppointmentDateLabel(dateStr) {
  if (!dateStr) return t("chooseDate");
  const d = new Date(dateStr + "T00:00:00");
  if (Number.isNaN(d.getTime())) return t("chooseDate");
  const dayNames = [t("sundayShort"), t("mondayShort"), t("tuesdayShort"), t("wednesdayShort"), t("thursdayShort"), t("fridayShort"), t("saturdayShort")];
  return `${dayNames[d.getDay()]} ${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
}

function formatAppointmentTimeLabel(timeStr) {
  if (!timeStr) return t("chooseTime");
  const [h = "00", m = "00"] = String(timeStr).split(":");
  return `${String(Number(h) || 0).padStart(2, "0")}:${String(Number(m) || 0).padStart(2, "0")}`;
}

function syncAppointmentDateTimeDisplays() {
  const dateInput = document.getElementById("appointmentDate");
  const timeInput = document.getElementById("appointmentTime");
  const privateEndTimeInput = document.getElementById("appointmentPrivateEndTime");
  const dateBtn = document.getElementById("appointmentDateDisplayBtn");
  const timeBtn = document.getElementById("appointmentTimeDisplayBtn");
  const privateEndTimeBtn = document.getElementById("appointmentPrivateEndTimeDisplayBtn");
  const privateEndDateInput = document.getElementById("appointmentPrivateEndDate");
  const privateEndDateBtn = document.getElementById("appointmentPrivateEndDateDisplayBtn");

  if (dateBtn && dateInput) dateBtn.textContent = formatAppointmentDateLabel(dateInput.value);
  if (timeBtn && timeInput) timeBtn.textContent = formatAppointmentTimeLabel(timeInput.value);
  if (privateEndDateInput && !privateEndDateInput.value) privateEndDateInput.value = dateInput?.value || state.selectedDate || todayStr;
  if (privateEndDateBtn && privateEndDateInput) privateEndDateBtn.textContent = formatAppointmentDateLabel(privateEndDateInput.value);
  if (privateEndTimeBtn && privateEndTimeInput) privateEndTimeBtn.textContent = formatAppointmentTimeLabel(privateEndTimeInput.value);
}

function syncPrivateEndTimeWithStart() {
  const isPrivate = Boolean(document.getElementById("appointmentIsPrivate")?.checked);
  if (!isPrivate) return;

  const startInput = document.getElementById("appointmentTime");
  const endInput = document.getElementById("appointmentPrivateEndTime");
  if (!startInput || !endInput || !startInput.value) return;

  if (!endInput.value || minutesFromTimeString(endInput.value) <= minutesFromTimeString(startInput.value)) {
    endInput.value = getAppointmentTimePlusMinutes(startInput.value, 60);
  }

  syncAppointmentDateTimeDisplays();
}

function getPrivateRepeatLabel(value) {
  const labels = {
    none: "Niet herhaald",
    daily: "Dagelijks",
    weekly: "Wekelijks",
    biweekly: "Om de 2 weken",
    triweekly: "Om de 3 weken",
    monthly: "Maandelijks",
    quarterly: "Om de 3 maanden",
    semiannual: "Om de 6 maanden",
    yearly: "Jaarlijks"
  };
  return labels[value || "none"] || labels.none;
}

function updatePrivateRepeatWeeklyLabel() {
  const repeat = document.getElementById("appointmentPrivateRepeat");
  if (!repeat) return;
  Array.from(repeat.options || []).forEach(option => {
    option.textContent = getPrivateRepeatLabel(option.value);
  });
}

function createRecurrenceGroupId() {
  return (window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`).replace(/-/g, "");
}

function buildPrivateRecurrenceOccurrences(payload, repeatValue) {
  const rule = repeatValue || "none";
  if (rule === "none") return [{ ...payload, recurrenceRule: "none", recurrenceGroupId: null }];
  const groupId = createRecurrenceGroupId();
  const counts = {
    daily: 365,
    weekly: 52,
    biweekly: 26,
    triweekly: 18,
    monthly: 24,
    quarterly: 12,
    semiannual: 10,
    yearly: 5
  };
  const stepDays = { daily: 1, weekly: 7, biweekly: 14, triweekly: 21 };
  const stepMonths = { monthly: 1, quarterly: 3, semiannual: 6 };
  const startDate = new Date(payload.date + "T00:00:00");
  const total = counts[rule] || 1;
  const endDate = new Date((payload.privateEndDate || payload.date) + "T00:00:00");
  const rangeDays = Number.isNaN(endDate.getTime()) ? 0 : Math.max(0, Math.round((endDate - startDate) / 86400000));

  return Array.from({ length: total }, (_, index) => {
    const d = new Date(startDate);
    if (rule === "yearly") d.setFullYear(startDate.getFullYear() + index);
    else if (stepMonths[rule]) d.setMonth(startDate.getMonth() + (stepMonths[rule] * index));
    else d.setDate(startDate.getDate() + (stepDays[rule] || 0) * index);

    const shiftedEnd = new Date(d);
    shiftedEnd.setDate(d.getDate() + rangeDays);

    return {
      ...payload,
      date: formatDateInput(d),
      privateEndDate: formatDateInput(shiftedEnd),
      recurrenceRule: rule,
      recurrenceGroupId: groupId
    };
  });
}

function findFirstOverlapForAppointments(payloads, appointments, breakMinutes = 0, excludeId = null) {
  for (const payload of payloads) {
    const overlap = findAppointmentOverlap(payload, appointments, breakMinutes, excludeId);
    if (overlap) return { payload, overlap };
  }
  return null;
}

function syncFollowUpDisplays() {
  const dateInput = document.getElementById("followUpAppointmentDate");
  const timeInput = document.getElementById("followUpAppointmentTime");
  const dateBtn = document.getElementById("followUpAppointmentDateDisplayBtn");
  const timeBtn = document.getElementById("followUpAppointmentTimeDisplayBtn");
  if (dateBtn && dateInput) dateBtn.textContent = formatAppointmentDateLabel(dateInput.value);
  if (timeBtn && timeInput) timeBtn.textContent = formatAppointmentTimeLabel(timeInput.value);
}

function openFollowUpAppointmentDialog(sourceId) {
  const data = getData();
  const app = data.appointments.find(a => String(a.id) === String(sourceId));
  if (!app || isPrivateAppointment(app)) return;
  closeAppointmentActionPopover();
  document.getElementById("followUpSourceAppointmentId").value = app.id;
  document.getElementById("followUpAppointmentDate").value = app.date || state.selectedDate || todayStr;
  document.getElementById("followUpAppointmentTime").value = app.time || "10:00";
  const customer = customerById(data, app.customerId);
  const service = serviceById(data, app.serviceId);
  const info = document.getElementById("followUpAppointmentInfo");
  if (info) info.textContent = `${customer ? fullName(customer) : "Klant"}${service ? ` · ${service.name}` : ""}`;
  syncFollowUpDisplays();
  document.getElementById("followUpAppointmentDialog")?.showModal();
}

async function saveFollowUpAppointmentFromForm(event) {
  event.preventDefault();
  const user = await getCurrentUser();
  const data = getData();
  const sourceId = document.getElementById("followUpSourceAppointmentId")?.value;
  const source = data.appointments.find(a => String(a.id) === String(sourceId));
  if (!source) return;
  const payload = {
    customerId: source.customerId,
    date: document.getElementById("followUpAppointmentDate")?.value || state.selectedDate,
    time: document.getElementById("followUpAppointmentTime")?.value || source.time || "10:00",
    serviceId: source.serviceId,
    duration: Number(source.duration || 0),
    price: Number(source.price || 0),
    status: "gepland",
    remarks: source.remarks || "",
    isPrivate: false,
    privateTitle: "",
    privateDetails: "",
    privateEndTime: ""
  };
  const settings = getSettings();
  if (settings.overlapWarningsEnabled) {
    const overlapApp = findAppointmentOverlap(payload, data.appointments, settings.defaultBreakMinutes, null);
    if (overlapApp) {
      const confirmed = await appConfirm(buildOverlapMessage(payload, overlapApp, data.appointments, settings.defaultBreakMinutes, null), { title: "Overlap gedetecteerd", confirmText: t("save"), cancelText: t("cancel"), variant: "warning" });
      if (!confirmed) return;
    }
  }
  if (!user) {
    data.appointments.push({ id: nextId(data.appointments), ...payload, paid: false, paymentMethodName: null, currency: source.currency || getCurrentCurrency() });
    saveData(data);
  } else {
    const dbPayload = {
      user_id: user.id,
      customer_id: payload.customerId,
      appointment_date: payload.date,
      appointment_time: payload.time,
      service_id: payload.serviceId,
      duration: payload.duration,
      price: payload.price,
      status: payload.status,
      paid: false,
      payment_method_label: null,
      currency: normalizeCurrency(source.currency || getCurrentCurrency()),
      appointment_remarks: payload.remarks,
      is_private: false,
      private_title: null,
      private_details: null,
      private_end_time: null
    };
    const { error } = await supabaseClient.from("appointments").insert(dbPayload);
    if (error) { await appAlert("Vervolgafspraak opslaan mislukt: " + error.message, { title: "Opslaan mislukt", variant: "danger" }); return; }
    await loadAllDataFromSupabase();
  }
  closeDialog("followUpAppointmentDialog");
  state.selectedDate = payload.date;
  const picked = new Date(payload.date + "T00:00:00");
  state.currentYear = picked.getFullYear();
  state.currentMonth = picked.getMonth();
  rerenderAll();
}

function getAppointmentPickerYears(selectedYear) {
  const data = getData();
  const appointmentYears = (data.appointments || [])
    .map(a => Number(String(a.date || "").slice(0, 4)))
    .filter(Boolean);
  const currentYear = Number(selectedYear) || today.getFullYear();
  const minYear = appointmentYears.length ? Math.min(...appointmentYears, currentYear) : currentYear - 3;
  const maxYear = appointmentYears.length ? Math.max(...appointmentYears, currentYear) : currentYear + 3;
  return Array.from({ length: (maxYear - minYear + 7) }, (_, i) => minYear - 3 + i);
}

function openAppointmentWheelPicker(mode, targetInputId = null) {
  const dialog = document.getElementById("appointmentWheelPickerDialog");
  const title = document.getElementById("appointmentWheelPickerTitle");
  const columnsWrap = document.getElementById("appointmentWheelColumns");
  if (!dialog || !title || !columnsWrap) return;

  const dateTargetId = mode === "date" ? (targetInputId || "appointmentDate") : "appointmentDate";
  const dateValue = document.getElementById(dateTargetId)?.value || state.selectedDate || todayStr;
  const timeTargetId = targetInputId || "appointmentTime";
  const timeValue = document.getElementById(timeTargetId)?.value || "10:00";
  const date = new Date(dateValue + "T00:00:00");
  const selectedYear = date.getFullYear();
  const selectedMonthIndex = date.getMonth();
  const selectedDay = date.getDate();
  const [rawHour = "10", rawMinute = "00"] = timeValue.split(":");
  const selectedHour = Math.max(0, Math.min(23, Number(rawHour) || 0));
  const selectedMinute = Math.max(0, Math.min(59, Number(rawMinute) || 0));

  appointmentPickerState.mode = mode;
  appointmentPickerState.targetInputId = mode === "time" ? timeTargetId : dateTargetId;
  appointmentPickerState.selected = {};

  const shell = dialog.querySelector(".revenue-wheel-shell");

  if (mode === "time") {
    title.textContent = t("chooseTime");
    if (shell) shell.classList.remove("revenue-calendar-shell");
    columnsWrap.className = "revenue-wheel-columns two-cols";
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);
    columnsWrap.innerHTML =
      buildRevenueWheelColumn("hour", hours, value => String(value).padStart(2, "0"), { loop: true }) +
      buildRevenueWheelColumn("minute", minutes, value => String(value).padStart(2, "0"), { loop: true });
    appointmentPickerState.selected.hour = String(selectedHour);
    appointmentPickerState.selected.minute = String(selectedMinute);
  } else {
    title.textContent = "Kies dag";
    if (shell) shell.classList.add("revenue-calendar-shell");
    appointmentPickerState.selected.date = dateValue;
    renderAppointmentCalendarPicker(selectedYear, selectedMonthIndex, dateValue);
  }

  const columns = Array.from(columnsWrap.querySelectorAll(".revenue-wheel-column"));
  columns.forEach(column => attachRevenueWheelColumnEvents(column, column.dataset.key));

  const centerActiveValues = (behavior = "auto") => {
    Object.entries(appointmentPickerState.selected).forEach(([key, value]) => {
      centerRevenueWheelColumn(columnsWrap.querySelector(`[data-key="${key}"]`), value, behavior);
    });
  };

  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "open");

  if (mode === "time") {
    requestAnimationFrame(() => {
      centerActiveValues("auto");
      requestAnimationFrame(() => centerActiveValues("auto"));
    });
  }
}

function applyAppointmentWheelPickerSelection() {
  if (appointmentPickerState.mode === "time") {
    const hour = Math.max(0, Math.min(23, Number(appointmentPickerState.selected.hour) || 0));
    const minute = Math.max(0, Math.min(59, Number(appointmentPickerState.selected.minute) || 0));
    const timeInput = document.getElementById(appointmentPickerState.targetInputId || "appointmentTime");
    if (timeInput) timeInput.value = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    syncPrivateEndTimeWithStart();
    syncAppointmentDateTimeDisplays();
    syncFollowUpDisplays();
    return;
  }

  const dateInput = document.getElementById(appointmentPickerState.targetInputId || "appointmentDate");
  if (dateInput) dateInput.value = appointmentPickerState.selected.date || dateInput.value || state.selectedDate || todayStr;

  const startDateInput = document.getElementById("appointmentDate");
  const endDateInput = document.getElementById("appointmentPrivateEndDate");
  if (startDateInput && endDateInput) {
    if (dateInput?.id === "appointmentDate" && (!endDateInput.value || endDateInput.value < startDateInput.value)) {
      endDateInput.value = startDateInput.value;
    }
    if (dateInput?.id === "appointmentPrivateEndDate" && endDateInput.value < startDateInput.value) {
      endDateInput.value = startDateInput.value;
    }
  }

  syncAppointmentDateTimeDisplays();
  syncFollowUpDisplays();
  updatePrivateRepeatWeeklyLabel();
}

function getRevenueMonthWeekStart(year, monthIndex) {
  const firstOfMonth = new Date(year, monthIndex, 1);
  const mondayIndex = (firstOfMonth.getDay() + 6) % 7;
  const start = new Date(firstOfMonth);
  start.setDate(firstOfMonth.getDate() - mondayIndex);
  return start;
}

function getRevenueWeeksInMonth(year, monthIndex) {
  const firstOfMonth = new Date(year, monthIndex, 1);
  const lastOfMonth = new Date(year, monthIndex + 1, 0);
  const start = getRevenueMonthWeekStart(year, monthIndex);
  const mondayIndexLast = (lastOfMonth.getDay() + 6) % 7;
  const end = new Date(lastOfMonth);
  end.setDate(lastOfMonth.getDate() + (6 - mondayIndexLast));
  return Math.max(4, Math.round((end - start) / (7 * 24 * 60 * 60 * 1000)) + 1);
}

function getRevenueWeekOfMonth(date) {
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const start = getRevenueMonthWeekStart(year, monthIndex);
  const diffDays = Math.floor((new Date(year, monthIndex, date.getDate()) - start) / (24 * 60 * 60 * 1000));
  const maxWeeks = getRevenueWeeksInMonth(year, monthIndex);
  return Math.min(maxWeeks, Math.max(1, Math.floor(diffDays / 7) + 1));
}

function dateFromRevenueWeekOfMonth(year, monthIndex, weekNumber) {
  const maxWeeks = getRevenueWeeksInMonth(year, monthIndex);
  const safeWeek = Math.min(maxWeeks, Math.max(1, Number(weekNumber) || 1));
  const start = getRevenueMonthWeekStart(year, monthIndex);
  const date = new Date(start);
  date.setDate(start.getDate() + ((safeWeek - 1) * 7));
  return date;
}

function revenuePickerDateValue(year, monthIndex, day) {
  return formatDateInput(new Date(year, monthIndex, day));
}

function buildCalendarPickerDayButton({ date, visibleMonthIndex, selectedDateStr, selectedBounds = null, mode = "day", datasetName = "revenuePickerDay" }) {
  const value = formatDateInput(date);
  const isOtherMonth = date.getMonth() !== visibleMonthIndex;
  const isSelectedDay = mode === "day" && value === selectedDateStr;
  const isSelectedWeek = mode === "week" && selectedBounds && value >= selectedBounds.start && value <= selectedBounds.end;
  const dayAppointments = getAppointmentsForDate(value, getData());
  const appointmentCount = dayAppointments.length;
  const maxDots = 4;
  const dots = appointmentCount
    ? `<span class="revenue-calendar-dots" aria-hidden="true">${dayAppointments.slice(0, maxDots).map(appointment => `<i class="${isPrivateAppointment(appointment) ? "private-dot" : ""}"></i>`).join("")}${appointmentCount > maxDots ? '<em>+</em>' : ''}</span>`
    : "";

  return `<button class="revenue-calendar-day${isOtherMonth ? " is-other-month" : ""}${isSelectedDay ? " selected" : ""}${isSelectedWeek ? " selected-week" : ""}" type="button" data-${datasetName}="${value}"><span class="revenue-calendar-day-number">${date.getDate()}</span>${dots}</button>`;
}

function buildSharedCalendarPickerHtml({
  mode,
  year,
  monthIndex,
  selectedDateStr,
  datasetName,
  prevAttr,
  nextAttr
}) {
  const first = new Date(year, monthIndex, 1);
  const last = new Date(year, monthIndex + 1, 0);
  const firstWeekdayIndex = (first.getDay() + 6) % 7;
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - firstWeekdayIndex);
  const lastWeekdayIndex = (last.getDay() + 6) % 7;
  const gridEnd = new Date(last);
  gridEnd.setDate(last.getDate() + (6 - lastWeekdayIndex));

  const selectedBounds = mode === "week" ? weekBounds(selectedDateStr) : null;
  const monthLabel = `${capitalizeFirst(getMonthNameLong(monthIndex))} ${year}`;
  const weekdayKeys = ["mondayShort", "tuesdayShort", "wednesdayShort", "thursdayShort", "fridayShort", "saturdayShort", "sundayShort"];

  let html = `
    <div class="revenue-calendar-picker" data-mode="${mode}" data-year="${year}" data-month="${monthIndex}">
      <div class="revenue-calendar-picker-head">
        <button class="icon-btn revenue-calendar-nav" type="button" ${prevAttr} aria-label="Vorige maand">‹</button>
        <strong>${monthLabel}</strong>
        <button class="icon-btn revenue-calendar-nav" type="button" ${nextAttr} aria-label="Volgende maand">›</button>
      </div>
      <div class="revenue-calendar-weekdays">
        ${weekdayKeys.map(key => `<span>${t(key)}</span>`).join("")}
      </div>
      <div class="revenue-calendar-grid">
  `;

  const cursor = new Date(gridStart);
  while (cursor <= gridEnd) {
    html += buildCalendarPickerDayButton({
      date: cursor,
      visibleMonthIndex: monthIndex,
      selectedDateStr,
      selectedBounds,
      mode,
      datasetName
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  html += `
      </div>
    </div>
  `;

  return html;
}

function buildCalendarPickerSwipePreviewHtml({
  mode,
  year,
  monthIndex,
  delta,
  selectedDateStr,
  datasetName,
  prevAttr,
  nextAttr
}) {
  const next = new Date(year, monthIndex + delta, 1);
  const wrapper = document.createElement("div");
  wrapper.innerHTML = buildSharedCalendarPickerHtml({
    mode,
    year: next.getFullYear(),
    monthIndex: next.getMonth(),
    selectedDateStr,
    datasetName,
    prevAttr,
    nextAttr
  });

  const picker = wrapper.querySelector(".revenue-calendar-picker");
  if (!picker) return "";
  picker.querySelectorAll("button").forEach(button => {
    button.setAttribute("tabindex", "-1");
    button.setAttribute("aria-hidden", "true");
  });
  return picker.innerHTML;
}

function attachCalendarPickerSwipe(picker, goToMonth, buildPreviewHtml) {
  if (!picker || picker.dataset.calendarPickerSwipeReady === "true") return;
  picker.dataset.calendarPickerSwipeReady = "true";

  let startX = 0;
  let startY = 0;
  let lastX = 0;
  let tracking = false;
  let horizontal = false;
  let swiped = false;
  let dragPreview = null;
  let dragStep = 0;
  const threshold = 44;
  const intentThreshold = 10;

  const resetTracking = () => {
    tracking = false;
    horizontal = false;
    startX = 0;
    startY = 0;
    lastX = 0;
  };

  const clearDragStyles = () => {
    if (dragPreview) {
      dragPreview.remove();
      dragPreview = null;
    }
    dragStep = 0;
    picker.classList.remove("is-swiping", "is-swipe-animating");
    picker.style.removeProperty("--picker-current-x");
    picker.style.removeProperty("--picker-preview-x");
    picker.style.removeProperty("--picker-swipe-opacity");
    delete picker.dataset.swipeAnimating;
  };

  const prepareDragPreview = dx => {
    const step = dx < 0 ? 1 : -1;
    if (dragPreview && dragStep === step) return true;

    if (dragPreview) dragPreview.remove();
    dragStep = step;

    const previewHtml = typeof buildPreviewHtml === "function" ? buildPreviewHtml(step) : "";
    if (!previewHtml) return false;

    dragPreview = document.createElement("div");
    dragPreview.className = "revenue-calendar-swipe-preview";
    dragPreview.innerHTML = previewHtml;
    picker.appendChild(dragPreview);

    picker.dataset.swipeAnimating = "true";
    picker.classList.remove("is-swipe-animating");
    picker.classList.add("is-swiping");
    return true;
  };

  const updateDragPosition = dx => {
    if (!prepareDragPreview(dx)) return false;
    const width = picker.clientWidth || window.innerWidth || 360;
    const limitedDx = Math.max(-width, Math.min(width, dx));
    const previewStart = dragStep > 0 ? width : -width;
    const progress = Math.min(1, Math.abs(limitedDx) / Math.max(width, 1));

    picker.style.setProperty("--picker-current-x", `${limitedDx}px`);
    picker.style.setProperty("--picker-preview-x", `${previewStart + limitedDx}px`);
    picker.style.setProperty("--picker-swipe-opacity", String(0.35 + (progress * 0.65)));
    return true;
  };

  const finishInteractiveSwipe = commit => {
    const step = dragStep;
    const width = picker.clientWidth || window.innerWidth || 360;

    if (!dragPreview || !step) {
      clearDragStyles();
      return;
    }

    picker.classList.remove("is-swiping");
    picker.classList.add("is-swipe-animating");

    if (commit) {
      picker.style.setProperty("--picker-current-x", `${step > 0 ? -width : width}px`);
      picker.style.setProperty("--picker-preview-x", "0px");
      picker.style.setProperty("--picker-swipe-opacity", "1");
    } else {
      picker.style.setProperty("--picker-current-x", "0px");
      picker.style.setProperty("--picker-preview-x", `${step > 0 ? width : -width}px`);
      picker.style.setProperty("--picker-swipe-opacity", "0.35");
    }

    const finish = () => {
      picker.removeEventListener("transitionend", onTransitionEnd);
      if (commit) goToMonth(step);
      clearDragStyles();
    };

    const onTransitionEnd = event => {
      if (event.target !== dragPreview && !event.target.closest(".revenue-calendar-swipe-preview") && !event.target.closest(".revenue-calendar-picker")) return;
      if (event.propertyName !== "transform") return;
      finish();
    };

    picker.addEventListener("transitionend", onTransitionEnd);
    window.setTimeout(() => {
      if (picker.dataset.swipeAnimating === "true") finish();
    }, 360);
  };

  picker.addEventListener("touchstart", event => {
    if (event.touches.length !== 1) return;
    if (event.target.closest(".revenue-calendar-nav")) return;
    if (picker.dataset.swipeAnimating === "true") return;

    tracking = true;
    horizontal = false;
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    lastX = startX;
  }, { passive: true });

  picker.addEventListener("touchmove", event => {
    if (!tracking || event.touches.length !== 1) return;
    const x = event.touches[0].clientX;
    const y = event.touches[0].clientY;
    const dx = x - startX;
    const dy = y - startY;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (!horizontal) {
      if (absX < intentThreshold && absY < intentThreshold) return;
      if (absY > absX) {
        resetTracking();
        clearDragStyles();
        return;
      }
      horizontal = true;
      swiped = true;
    }

    if (!updateDragPosition(dx)) return;
    event.preventDefault();
    lastX = x;
  }, { passive: false });

  picker.addEventListener("touchend", () => {
    if (!tracking || !horizontal) {
      resetTracking();
      clearDragStyles();
      return;
    }

    const dx = lastX - startX;
    const commit = Math.abs(dx) >= threshold;
    resetTracking();
    finishInteractiveSwipe(commit);
  }, { passive: true });

  picker.addEventListener("touchcancel", () => {
    resetTracking();
    finishInteractiveSwipe(false);
  }, { passive: true });

  picker.addEventListener("click", event => {
    if (!swiped) return;
    swiped = false;
    event.preventDefault();
    event.stopPropagation();
  }, true);
}

function renderSharedCalendarPicker({
  columnsWrapId,
  pickerState,
  mode,
  year,
  monthIndex,
  selectedDateStr,
  datasetName,
  prevAttr,
  nextAttr,
  onMonthChange,
  onDaySelect
}) {
  const columnsWrap = document.getElementById(columnsWrapId);
  if (!columnsWrap) return;

  columnsWrap.className = "revenue-wheel-columns revenue-calendar-mode";
  columnsWrap.innerHTML = buildSharedCalendarPickerHtml({
    mode,
    year,
    monthIndex,
    selectedDateStr,
    datasetName,
    prevAttr,
    nextAttr
  });

  const picker = columnsWrap.querySelector(".revenue-calendar-picker");
  const goToMonth = (delta) => {
    const next = new Date(year, monthIndex + delta, 1);
    onMonthChange(next.getFullYear(), next.getMonth(), pickerState.selected.date || selectedDateStr);
  };

  picker?.querySelector(`[${prevAttr}]`)?.addEventListener("click", () => goToMonth(-1));
  picker?.querySelector(`[${nextAttr}]`)?.addEventListener("click", () => goToMonth(1));
  attachCalendarPickerSwipe(
    picker,
    goToMonth,
    delta => buildCalendarPickerSwipePreviewHtml({
      mode,
      year,
      monthIndex,
      delta,
      selectedDateStr: pickerState.selected.date || selectedDateStr,
      datasetName,
      prevAttr,
      nextAttr
    })
  );

  picker?.querySelectorAll(`[data-${datasetName}]`).forEach(button => {
    button.addEventListener("click", () => {
      const value = button.getAttribute(`data-${datasetName}`);
      if (!value) return;

      pickerState.selected.date = value;
      if (typeof onDaySelect === "function") onDaySelect(value);

      if (mode === "week") {
        const bounds = weekBounds(value);
        picker.querySelectorAll(".revenue-calendar-day").forEach(dayButton => {
          const dayValue = dayButton.getAttribute(`data-${datasetName}`) || "";
          dayButton.classList.toggle("selected-week", dayValue >= bounds.start && dayValue <= bounds.end);
          dayButton.classList.remove("selected");
        });
        return;
      }

      picker.querySelectorAll(".revenue-calendar-day").forEach(dayButton => {
        dayButton.classList.toggle("selected", dayButton.getAttribute(`data-${datasetName}`) === value);
        dayButton.classList.remove("selected-week");
      });
    });
  });
}

function renderRevenueCalendarPicker(mode, year, monthIndex, selectedDateStr = revenuePickerState.selected.date || getRevenuePickerAnchorDate()) {
  renderSharedCalendarPicker({
    columnsWrapId: "revenueWheelColumns",
    pickerState: revenuePickerState,
    mode,
    year,
    monthIndex,
    selectedDateStr,
    datasetName: "revenuePickerDay",
    prevAttr: "data-revenue-picker-prev",
    nextAttr: "data-revenue-picker-next",
    onMonthChange: (nextYear, nextMonth, selectedDate) => renderRevenueCalendarPicker(mode, nextYear, nextMonth, selectedDate)
  });
}

function renderAppointmentCalendarPicker(year, monthIndex, selectedDateStr = appointmentPickerState.selected.date || document.getElementById("appointmentDate")?.value || state.selectedDate || todayStr) {
  renderSharedCalendarPicker({
    columnsWrapId: "appointmentWheelColumns",
    pickerState: appointmentPickerState,
    mode: "day",
    year,
    monthIndex,
    selectedDateStr,
    datasetName: "appointmentPickerDay",
    prevAttr: "data-appointment-picker-prev",
    nextAttr: "data-appointment-picker-next",
    onMonthChange: (nextYear, nextMonth, selectedDate) => renderAppointmentCalendarPicker(nextYear, nextMonth, selectedDate)
  });
}

function buildRevenueMonthPickerHtml(year, selectedMonthIndex = 0) {
  const selectedDateStr = revenuePickerState.selected.date || getRevenuePickerAnchorDate();
  const selectedDate = new Date(selectedDateStr + "T00:00:00");
  const selectedYear = selectedDate.getFullYear();
  const currentMonthIndex = selectedDate.getMonth();

  return `
    <div class="revenue-month-picker" data-year="${year}">
      <div class="revenue-calendar-picker-head">
        <button class="icon-btn revenue-calendar-nav" type="button" data-revenue-month-prev aria-label="Vorig jaar">‹</button>
        <strong>${year}</strong>
        <button class="icon-btn revenue-calendar-nav" type="button" data-revenue-month-next aria-label="Volgend jaar">›</button>
      </div>
      <div class="revenue-month-grid">
        ${Array.from({ length: 12 }, (_, index) => `
          <button class="revenue-month-option${year === selectedYear && index === currentMonthIndex ? " selected" : ""}" type="button" data-revenue-picker-month="${index}">
            ${capitalizeFirst(getMonthNameLong(index))}
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function buildRevenueMonthPickerPreviewHtml(year, delta, selectedMonthIndex = 0) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = buildRevenueMonthPickerHtml(year + delta, selectedMonthIndex);
  const picker = wrapper.querySelector(".revenue-month-picker");
  if (!picker) return "";
  picker.querySelectorAll("button").forEach(button => {
    button.setAttribute("tabindex", "-1");
    button.setAttribute("aria-hidden", "true");
  });
  return picker.innerHTML;
}

function renderRevenueMonthPicker(year, selectedMonthIndex = new Date((revenuePickerState.selected.date || getRevenuePickerAnchorDate()) + "T00:00:00").getMonth()) {
  const columnsWrap = document.getElementById("revenueWheelColumns");
  if (!columnsWrap) return;

  const selectedDateStr = revenuePickerState.selected.date || getRevenuePickerAnchorDate();
  const selectedDate = new Date(selectedDateStr + "T00:00:00");

  columnsWrap.className = "revenue-wheel-columns revenue-calendar-mode";
  columnsWrap.innerHTML = buildRevenueMonthPickerHtml(year, selectedMonthIndex);

  const picker = columnsWrap.querySelector(".revenue-month-picker");
  const goToYear = delta => renderRevenueMonthPicker(year + delta, selectedMonthIndex);
  picker?.querySelector("[data-revenue-month-prev]")?.addEventListener("click", () => goToYear(-1));
  picker?.querySelector("[data-revenue-month-next]")?.addEventListener("click", () => goToYear(1));
  attachCalendarPickerSwipe(
    picker,
    goToYear,
    delta => buildRevenueMonthPickerPreviewHtml(year, delta, selectedMonthIndex)
  );

  picker?.querySelectorAll("[data-revenue-picker-month]").forEach(button => {
    button.addEventListener("click", () => {
      const monthIndex = Number(button.dataset.revenuePickerMonth || 0);
      const currentDay = selectedDate.getDate();
      const day = clampRevenueDay(year, monthIndex, currentDay);
      revenuePickerState.selected.date = formatDateInput(new Date(year, monthIndex, day));
      picker.querySelectorAll(".revenue-month-option").forEach(monthButton => {
        monthButton.classList.toggle("selected", monthButton === button);
      });
    });
  });
}

function openRevenueWheelPicker(mode, target = "revenue") {
  const dialog = document.getElementById("revenueWheelPickerDialog");
  const title = document.getElementById("revenueWheelPickerTitle");
  const columnsWrap = document.getElementById("revenueWheelColumns");
  const shell = dialog?.querySelector(".revenue-wheel-shell");
  const confirmBtn = document.getElementById("revenueWheelConfirmBtn");
  revenuePickerState.target = target || "revenue";
  const anchor = getRevenuePickerAnchorDate();
  const anchorDate = new Date(anchor + "T00:00:00");
  const selectedYear = anchorDate.getFullYear();
  const selectedMonthIndex = anchorDate.getMonth();

  if (!dialog || !title || !columnsWrap) return;

  revenuePickerState.mode = mode;
  revenuePickerState.columns = [];
  revenuePickerState.selected = { date: anchor };

  if (shell) shell.classList.toggle("revenue-calendar-shell", mode !== "year");
  if (confirmBtn) confirmBtn.classList.remove("hidden");

  if (mode === "day") {
    title.textContent = "Kies dag";
    renderRevenueCalendarPicker("day", selectedYear, selectedMonthIndex, anchor);
  } else if (mode === "week") {
    title.textContent = "Kies week";
    renderRevenueCalendarPicker("week", selectedYear, selectedMonthIndex, anchor);
  } else if (mode === "month") {
    title.textContent = "Kies maand";
    renderRevenueMonthPicker(selectedYear, selectedMonthIndex);
  } else {
    if (shell) shell.classList.remove("revenue-calendar-shell");
    title.textContent = "Kies jaar";
    columnsWrap.className = "revenue-wheel-columns";
    const years = getRevenueDataYears();
    columnsWrap.innerHTML = buildRevenueWheelColumn("year", years, value => value);
    revenuePickerState.selected.year = String(selectedYear);
    const columns = Array.from(columnsWrap.querySelectorAll(".revenue-wheel-column"));
    revenuePickerState.columns = columns;
    columns.forEach(column => attachRevenueWheelColumnEvents(column, column.dataset.key));
  }

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "open");
  }

  if (mode === "year") {
    const centerActiveRevenuePickerValues = (behavior = "auto") => {
      Object.entries(revenuePickerState.selected).forEach(([key, value]) => {
        centerRevenueWheelColumn(columnsWrap.querySelector(`[data-key="${key}"]`), value, behavior);
      });
    };

    requestAnimationFrame(() => {
      centerActiveRevenuePickerValues("auto");
      requestAnimationFrame(() => centerActiveRevenuePickerValues("auto"));
    });
  }
}

function applyRevenueWheelPickerSelection() {
  const anchor = getRevenuePickerAnchorDate();
  const anchorDate = new Date(anchor + "T00:00:00");
  const currentDay = anchorDate.getDate();

  if (revenuePickerState.mode === "year") {
    const year = Number(revenuePickerState.selected.year || anchorDate.getFullYear());
    const monthIndex = anchorDate.getMonth();
    const day = clampRevenueDay(year, monthIndex, currentDay);
    setRevenuePickerPeriod("year", formatDateInput(new Date(year, monthIndex, day)));
    return;
  }

  if (revenuePickerState.mode === "month") {
    const selectedDate = new Date((revenuePickerState.selected.date || anchor) + "T00:00:00");
    setRevenuePickerPeriod("month", formatDateInput(selectedDate));
    return;
  }

  if (revenuePickerState.mode === "week") {
    setRevenuePickerPeriod("week", revenuePickerState.selected.date || anchor);
    return;
  }

  setRevenuePickerPeriod("day", revenuePickerState.selected.date || anchor);
}

function openRevenueDatePicker(mode = "day") {
  const nativeInput = document.getElementById("revenueNativeDatePicker");
  const revenueDate = document.getElementById("revenueDate").value || todayStr;

  if (!nativeInput) {
    setRevenuePeriod(mode, revenueDate);
    return;
  }

  nativeInput.dataset.mode = mode;
  nativeInput.value = revenueDate;

  if (typeof nativeInput.showPicker === "function") {
    nativeInput.showPicker();
  } else {
    nativeInput.click();
  }
}

function openRevenueDayPicker() {
  openRevenueDatePicker("day");
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

  if (type === "week") {
    const bounds = weekBounds(anchor);
    const weekdayKeys = ["mondayShort", "tuesdayShort", "wednesdayShort", "thursdayShort", "fridayShort", "saturdayShort", "sundayShort"];
    return Array.from({ length: 7 }, (_, index) => {
      const d = new Date(bounds.start + "T00:00:00");
      d.setDate(d.getDate() + index);
      const key = formatDateInput(d);
      const items = filtered.filter(a => a.date === key);
      return {
        label: String(t(weekdayKeys[index]) || "").toLocaleLowerCase(getCurrentLanguage()),
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
  if (!chartWrap) return;

  const chartData = buildRevenueChartData(filtered, type, anchor);
  const visibleData = chartData.filter(item => Number(item.paid || 0) > 0 || Number(item.unpaid || 0) > 0);
  const useFullPeriodWidth = ["week", "month", "year"].includes(type);
  const dataToRender = useFullPeriodWidth ? chartData : (visibleData.length ? visibleData : chartData);
  const renderedBarCount = Math.max(dataToRender.length, 1);
  const maxValue = Math.max(...dataToRender.map(item => Number(item.paid || 0) + Number(item.unpaid || 0)), 0);
  const scaleMax = maxValue > 0 ? maxValue : 1;
  const chartHeight = 220;
  const chartAvailableWidth = Math.max(280, chartWrap.clientWidth || chartWrap.offsetWidth || 320);
  const chartGap = type === "month" ? 2 : Math.max(3, Math.min(10, Math.round(chartAvailableWidth * 0.012)));
  const columnWidth = useFullPeriodWidth
    ? Math.max(7, Math.floor((chartAvailableWidth - ((renderedBarCount - 1) * chartGap) - 16) / renderedBarCount))
    : Math.max(34, Math.min(92, Math.floor((chartAvailableWidth - ((renderedBarCount - 1) * chartGap) - 16) / renderedBarCount)));
  const maxStackWidth = type === "week" ? 28 : type === "year" ? 18 : type === "month" ? 10 : 46;
  const barGroupWidth = Math.max(4, Math.min(maxStackWidth, Math.round(columnWidth * 0.72)));
  const singleBarWidth = Math.max(3, Math.min(barGroupWidth, Math.round(barGroupWidth * 0.82)));
  const splitBarWidth = Math.max(3, Math.floor((barGroupWidth - 2) / 2));

  const formatAxisAmount = value => new Intl.NumberFormat(getCurrentLanguage(), {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(Math.round(Number(value || 0)));
  const axisValues = [1, 0.75, 0.5, 0.25, 0].map(step => scaleMax * step);
  const axisLabels = axisValues.map(value => formatAxisAmount(value));
  const longestAxisLabel = axisLabels.reduce((longest, label) => Math.max(longest, String(label).length), 1);
  const axisWidth = Math.max(18, Math.min(64, Math.ceil(longestAxisLabel * 6.2) + 4));

  chartWrap.innerHTML = `
    <div class="revenue-chart-plot revenue-chart-plot-v2" style="--revenue-chart-height:${chartHeight}px;--revenue-y-axis-width:${axisWidth}px;">
      <div class="revenue-y-axis" aria-hidden="true">
        ${axisLabels.map(label => `<span>${label}</span>`).join("")}
      </div>
      <div class="revenue-chart-area revenue-chart-area-v2">
        <div class="revenue-y-axis-line" aria-hidden="true"></div>
        <div class="revenue-x-axis-line" aria-hidden="true"></div>
        <div class="revenue-bars revenue-bars-v2 revenue-bars-${type}" style="--revenue-bar-count:${renderedBarCount};--revenue-bar-gap:${chartGap}px;--revenue-bar-column-width:${columnWidth}px;--revenue-bar-group-width:${barGroupWidth}px;--revenue-bar-single-width:${singleBarWidth}px;--revenue-bar-split-width:${splitBarWidth}px;">
          ${dataToRender.map(item => {
            const paid = Number(item.paid || 0);
            const unpaid = Number(item.unpaid || 0);
            const total = paid + unpaid;
            const hasPaid = paid > 0;
            const hasUnpaid = unpaid > 0;
            const hasBoth = hasPaid && hasUnpaid;
            const hasRevenue = total > 0;
            const totalHeight = hasRevenue ? Math.max(8, (total / scaleMax) * chartHeight) : 0;
            const paidHeight = hasPaid ? Math.max(8, (paid / scaleMax) * chartHeight) : 0;
            const unpaidHeight = hasUnpaid ? Math.max(8, (unpaid / scaleMax) * chartHeight) : 0;
            const title = hasRevenue ? `${item.label} · ${euro(total)}` : "";

            return `
              <div class="revenue-bar-col${hasRevenue ? "" : " is-empty"}" title="${title}">
                <div class="revenue-bar-cell" aria-hidden="true">
                  ${hasBoth ? `<span class="revenue-bar-total-bg" style="height:${totalHeight}px"></span>` : ""}
                  <div class="revenue-bar-pair${hasBoth ? " has-both" : ""}">
                    ${hasPaid ? `<span class="revenue-bar-fill paid" style="height:${paidHeight}px"></span>` : ""}
                    ${hasUnpaid ? `<span class="revenue-bar-fill unpaid" style="height:${unpaidHeight}px"></span>` : ""}
                  </div>
                </div>
                <span class="revenue-bar-label">${hasRevenue ? item.label : ""}</span>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    </div>
    ${maxValue > 0 ? `
      <div class="revenue-chart-legend">
        <span><i class="paid"></i> ${t("paid")}</span>
        <span><i class="unpaid"></i> ${t("unpaid")}</span>
      </div>
    ` : ""}
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
  const csvButton = document.getElementById('revenueExportCsvBtn');
  const reportButton = document.getElementById('revenueExportReportBtn');
  if (!bar) return;

  const shouldShow = state.currentScreen === 'revenueScreen';
  bar.classList.toggle('hidden', !shouldShow);
  if (csvButton) csvButton.disabled = !shouldShow;
  if (reportButton) reportButton.disabled = !shouldShow;
}

function updateCostsActionBar() {
  const bar = document.getElementById('costsActionBar');
  const csvButton = document.getElementById('costsExportCsvBtn');
  const reportButton = document.getElementById('costsExportReportBtn');
  if (!bar) return;

  const shouldShow = state.currentScreen === 'costsScreen';
  bar.classList.toggle('hidden', !shouldShow);
  if (csvButton) csvButton.disabled = !shouldShow;
  if (reportButton) reportButton.disabled = !shouldShow;
}

function getRevenueExportTitle() {
  const type = document.getElementById("revenuePeriodType")?.value || 'day';
  const anchor = document.getElementById("revenueDate")?.value || todayStr;

  if (type === 'year') return `omzet_${anchor.slice(0, 4)}`;
  if (type === 'month') return `omzet_${anchor.slice(0, 7)}`;
  if (type === 'week') {
    const bounds = weekBounds(anchor);
    return `omzet_week_${bounds.start}_tot_${bounds.end}`;
  }
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

  const paymentStatusFilter = getRevenueStatusFilterLabel();
  const periodType = document.getElementById('revenuePeriodType')?.value || 'day';
  const periodDate = document.getElementById('revenueDate')?.value || todayStr;

  const amountForCsv = (value) => Number(value || 0).toFixed(2).replace('.', ',');
  const sumAmount = (items, predicate = () => true) => items
    .filter(predicate)
    .reduce((sum, app) => sum + Number(app.price || 0), 0);

  const totalRevenue = sumAmount(filtered);
  const paidRevenue = sumAmount(filtered, app => app.paid);
  const unpaidRevenue = sumAmount(filtered, app => !app.paid);

  const rows = [
    ['Periode type', periodType],
    ['Periode datum', periodDate],
    ['Filter betaalstatus', paymentStatusFilter],
    [],
    ['OVERZICHT'],
    ['Aantal afspraken', filtered.length],
    ['Som totaal', amountForCsv(totalRevenue)],
    ['Som betaald', amountForCsv(paidRevenue)],
    ['Som onbetaald', amountForCsv(unpaidRevenue)],
    []
  ];

  const paymentTotals = new Map();
  filtered.forEach(app => {
    const method = app.paid ? (paymentMethodNameForAppointment(app, data) || 'Onbekend') : 'Onbetaald';
    const current = paymentTotals.get(method) || { count: 0, total: 0, paid: 0, unpaid: 0 };
    current.count += 1;
    current.total += Number(app.price || 0);
    if (app.paid) current.paid += Number(app.price || 0);
    if (!app.paid) current.unpaid += Number(app.price || 0);
    paymentTotals.set(method, current);
  });

  rows.push(['TOTALEN PER BETAALWIJZE']);
  rows.push(['Betaalwijze', 'Aantal afspraken', 'Totaal', 'Betaald', 'Onbetaald']);
  if (paymentTotals.size) {
    Array.from(paymentTotals.entries())
      .sort(([a], [b]) => a.localeCompare(b, 'nl-BE'))
      .forEach(([method, values]) => {
        rows.push([
          method,
          values.count,
          amountForCsv(values.total),
          amountForCsv(values.paid),
          amountForCsv(values.unpaid)
        ]);
      });
  } else {
    rows.push(['Geen gegevens', 0, amountForCsv(0), amountForCsv(0), amountForCsv(0)]);
  }
  rows.push([]);

  const periodTotals = new Map();
  filtered.forEach(app => {
    let key = app.date || '';
    let label = app.date || '';

    if (periodType === 'year') {
      key = String(app.date || '').slice(0, 7);
      const monthNumber = Number(key.slice(5, 7));
      label = monthNumber ? `${getMonthNameLong(monthNumber - 1)} ${key.slice(0, 4)}` : key;
    } else if (periodType === 'month' || periodType === 'week') {
      label = app.date ? formatLongDate(app.date) : '';
    } else {
      label = app.time || app.date || '';
    }

    const current = periodTotals.get(key) || { label, count: 0, total: 0, paid: 0, unpaid: 0 };
    current.count += 1;
    current.total += Number(app.price || 0);
    if (app.paid) current.paid += Number(app.price || 0);
    if (!app.paid) current.unpaid += Number(app.price || 0);
    periodTotals.set(key, current);
  });

  const periodOverviewTitle =
    periodType === 'year' ? 'TOTALEN PER MAAND' :
    periodType === 'month' ? 'TOTALEN PER DAG' :
    periodType === 'week' ? 'TOTALEN PER DAG' :
    'TOTALEN PER AFSPRAAKMOMENT';

  rows.push([periodOverviewTitle]);
  rows.push([
    periodType === 'year' ? 'Maand' : (periodType === 'month' || periodType === 'week') ? 'Datum' : 'Tijd',
    'Aantal afspraken',
    'Totaal',
    'Betaald',
    'Onbetaald'
  ]);

  if (periodTotals.size) {
    Array.from(periodTotals.entries())
      .sort(([a], [b]) => a.localeCompare(b, 'nl-BE'))
      .forEach(([, values]) => {
        rows.push([
          values.label,
          values.count,
          amountForCsv(values.total),
          amountForCsv(values.paid),
          amountForCsv(values.unpaid)
        ]);
      });
  } else {
    rows.push(['Geen gegevens', 0, amountForCsv(0), amountForCsv(0), amountForCsv(0)]);
  }

  rows.push([]);
  rows.push(['DETAIL AFSPRAKEN']);
  rows.push(['Datum', 'Tijd', 'Klant', 'Dienst', 'Prijs', 'Betaald', 'Betaalwijze', 'Status']);

  filtered.forEach(app => {
    const customer = customerById(data, app.customerId);
    const service = serviceById(data, app.serviceId);
    rows.push([
      app.date || '',
      app.time || '',
      customer ? fullName(customer) : 'Onbekend',
      service?.name || '',
      amountForCsv(app.price),
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
  link.dataset.allowBusyDownload = "true";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}


function htmlEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getRevenueReportData() {
  const data = getData();
  const filtered = revenueFilteredAppointments()
    .slice()
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

  const paymentStatusFilter = getRevenueStatusFilterLabel();
  const periodType = document.getElementById('revenuePeriodType')?.value || 'day';
  const periodDate = document.getElementById('revenueDate')?.value || todayStr;

  const sumAmount = (items, predicate = () => true) => items
    .filter(predicate)
    .reduce((sum, app) => sum + Number(app.price || 0), 0);

  const paymentTotals = new Map();
  filtered.forEach(app => {
    const method = app.paid ? (paymentMethodNameForAppointment(app, data) || 'Onbekend') : 'Onbetaald';
    const current = paymentTotals.get(method) || { label: method, count: 0, total: 0, paid: 0, unpaid: 0 };
    current.count += 1;
    current.total += Number(app.price || 0);
    if (app.paid) current.paid += Number(app.price || 0);
    if (!app.paid) current.unpaid += Number(app.price || 0);
    paymentTotals.set(method, current);
  });

  const periodTotals = new Map();
  filtered.forEach(app => {
    let key = app.date || '';
    let label = app.date || '';

    if (periodType === 'year') {
      key = String(app.date || '').slice(0, 7);
      const monthNumber = Number(key.slice(5, 7));
      label = monthNumber ? `${getMonthNameLong(monthNumber - 1)} ${key.slice(0, 4)}` : key;
    } else if (periodType === 'month' || periodType === 'week') {
      label = app.date ? formatLongDate(app.date) : '';
    } else {
      label = app.time || app.date || '';
    }

    const current = periodTotals.get(key) || { label, count: 0, total: 0, paid: 0, unpaid: 0 };
    current.count += 1;
    current.total += Number(app.price || 0);
    if (app.paid) current.paid += Number(app.price || 0);
    if (!app.paid) current.unpaid += Number(app.price || 0);
    periodTotals.set(key, current);
  });

  const periodTitle =
    periodType === 'year' ? 'Totalen per maand' :
    periodType === 'month' ? 'Totalen per dag' :
    periodType === 'week' ? 'Totalen per dag' :
    'Totalen per afspraakmoment';

  const periodColumnTitle =
    periodType === 'year' ? 'Maand' :
    (periodType === 'month' || periodType === 'week') ? 'Datum' :
    'Tijd';

  let reportTitle = 'Omzetrapport';
  if (periodType === 'day') reportTitle = `Omzetrapport · ${formatLongDate(periodDate)}`;
  if (periodType === 'week') {
    const bounds = weekBounds(periodDate);
    reportTitle = `Omzetrapport · week ${formatLongDate(bounds.start)} t.e.m. ${formatLongDate(bounds.end)}`;
  }
  if (periodType === 'month') {
    const d = new Date(periodDate + 'T00:00:00');
    reportTitle = `Omzetrapport · ${getMonthNameLong(d.getMonth())} ${d.getFullYear()}`;
  }
  if (periodType === 'year') reportTitle = `Omzetrapport · ${periodDate.slice(0, 4)}`;

  return {
    data,
    filtered,
    paymentStatusFilter,
    periodType,
    periodDate,
    reportTitle,
    totalRevenue: sumAmount(filtered),
    paidRevenue: sumAmount(filtered, app => app.paid),
    unpaidRevenue: sumAmount(filtered, app => !app.paid),
    paymentTotals: Array.from(paymentTotals.values()).sort((a, b) => a.label.localeCompare(b.label, 'nl-BE')),
    periodTotals: Array.from(periodTotals.entries()).sort(([a], [b]) => a.localeCompare(b, 'nl-BE')).map(([, values]) => values),
    periodTitle,
    periodColumnTitle
  };
}

function downloadRevenueStyledReport() {
  const report = getRevenueReportData();
  const createdAt = new Date().toLocaleString('nl-BE');
  const filterStatusLabel = report.paymentStatusFilter || 'Betaald + Onbetaald';

  const metricCard = (label, value) => `
    <article class="metric-card">
      <span>${htmlEscape(label)}</span>
      <strong>${htmlEscape(value)}</strong>
    </article>
  `;

  const moneyCells = item => `
    <td>${htmlEscape(item.count)}</td>
    <td class="money">${htmlEscape(euro(item.total))}</td>
    <td class="money paid">${htmlEscape(euro(item.paid))}</td>
    <td class="money unpaid">${htmlEscape(euro(item.unpaid))}</td>
  `;

  const paymentRows = report.paymentTotals.length
    ? report.paymentTotals.map(item => `<tr><td>${htmlEscape(item.label)}</td>${moneyCells(item)}</tr>`).join('')
    : `<tr><td>Geen gegevens</td><td>0</td><td class="money">${htmlEscape(euro(0))}</td><td class="money paid">${htmlEscape(euro(0))}</td><td class="money unpaid">${htmlEscape(euro(0))}</td></tr>`;

  const periodRows = report.periodTotals.length
    ? report.periodTotals.map(item => `<tr><td>${htmlEscape(item.label)}</td>${moneyCells(item)}</tr>`).join('')
    : `<tr><td>Geen gegevens</td><td>0</td><td class="money">${htmlEscape(euro(0))}</td><td class="money paid">${htmlEscape(euro(0))}</td><td class="money unpaid">${htmlEscape(euro(0))}</td></tr>`;

  const appointmentRows = report.filtered.length
    ? report.filtered.map(app => {
        const customer = customerById(report.data, app.customerId);
        const service = serviceById(report.data, app.serviceId);
        return `
          <tr>
            <td>${htmlEscape(app.date || '')}</td>
            <td>${htmlEscape(app.time || '')}</td>
            <td>${htmlEscape(customer ? fullName(customer) : 'Onbekend')}</td>
            <td>${htmlEscape(service?.name || '')}</td>
            <td class="money">${htmlEscape(euro(app.price))}</td>
            <td><span class="badge ${app.paid ? 'badge-paid' : 'badge-unpaid'}">${app.paid ? 'Betaald' : 'Onbetaald'}</span></td>
            <td>${htmlEscape(paymentMethodNameForAppointment(app, report.data) || '')}</td>
            <td>${htmlEscape(app.status || '')}</td>
          </tr>
        `;
      }).join('')
    : `<tr><td colspan="8" class="empty-row">Geen afspraken voor deze selectie.</td></tr>`;

  const html = `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${htmlEscape(report.reportTitle)}</title>
  <style>
    :root {
      --bg: #fbf7f9;
      --card: #ffffff;
      --line: #eddfe6;
      --primary: #d991ab;
      --primary-dark: #b86d87;
      --primary-soft: #f8e8ee;
      --text: #4e4650;
      --muted: #8c838d;
      --success-bg: #e7f6ea;
      --success-text: #2d8b4e;
      --danger-soft: #fff1f5;
      --danger: #d46a8a;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: linear-gradient(180deg, #fff 0%, var(--bg) 100%);
      color: var(--text);
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.45;
    }
    .page {
      width: min(1180px, calc(100% - 32px));
      margin: 0 auto;
      padding: 34px 0 48px;
    }
    .report-header {
      background: linear-gradient(135deg, var(--primary-soft), #fff);
      border: 1px solid var(--line);
      border-radius: 28px;
      padding: 26px;
      margin-bottom: 18px;
      box-shadow: 0 12px 30px rgba(170, 120, 145, 0.10);
    }
    .eyebrow {
      margin: 0 0 6px;
      color: var(--primary-dark);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    h1 {
      margin: 0;
      font-size: clamp(28px, 5vw, 46px);
      line-height: 1.05;
      color: var(--primary-dark);
    }
    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 18px;
      color: var(--muted);
      font-size: 14px;
    }
    .meta span {
      background: #fff;
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 8px 12px;
    }
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 18px;
    }
    .metric-card,
    .report-section {
      background: var(--card);
      border: 1px solid var(--line);
      box-shadow: 0 10px 24px rgba(170, 120, 145, 0.09);
    }
    .metric-card {
      border-radius: 22px;
      padding: 18px;
    }
    .metric-card span {
      display: block;
      color: var(--muted);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .metric-card strong {
      font-size: 24px;
      color: var(--text);
    }
    .report-section {
      border-radius: 24px;
      overflow: hidden;
      margin-bottom: 18px;
    }
    .section-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: var(--primary-soft);
      border-bottom: 1px solid var(--line);
      padding: 16px 18px;
    }
    .section-title h2 {
      margin: 0;
      color: var(--primary-dark);
      font-size: 18px;
    }
    .section-title span {
      color: var(--muted);
      font-size: 13px;
    }
    .table-wrap { overflow-x: auto; }
    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 720px;
    }
    th,
    td {
      padding: 13px 16px;
      border-bottom: 1px solid #f2e8ed;
      text-align: left;
      vertical-align: top;
      font-size: 14px;
    }
    th {
      color: var(--muted);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      background: #fffafd;
    }
    tbody tr:nth-child(even) td { background: #fffbfd; }
    tbody tr:last-child td { border-bottom: none; }
    .money {
      text-align: right;
      white-space: nowrap;
      font-weight: 700;
    }
    .paid { color: var(--success-text); }
    .unpaid { color: var(--danger); }
    .badge {
      display: inline-flex;
      align-items: center;
      min-height: 28px;
      border-radius: 999px;
      padding: 5px 10px;
      font-size: 12px;
      font-weight: 700;
      white-space: nowrap;
    }
    .badge-paid { background: var(--success-bg); color: var(--success-text); }
    .badge-unpaid { background: var(--danger-soft); color: var(--danger); }
    .empty-row {
      text-align: center;
      color: var(--muted);
      padding: 26px;
    }
    .print-actions {
      position: sticky;
      bottom: 18px;
      display: flex;
      justify-content: flex-end;
      pointer-events: none;
      margin-top: 20px;
    }
    .print-actions button {
      pointer-events: auto;
      border: none;
      border-radius: 999px;
      background: var(--primary-dark);
      color: #fff;
      min-height: 48px;
      padding: 0 18px;
      font-weight: 700;
      box-shadow: 0 12px 24px rgba(184, 109, 135, 0.22);
      cursor: pointer;
    }
    @media (max-width: 780px) {
      .page { width: min(100% - 18px, 1180px); padding-top: 12px; }
      .report-header { border-radius: 22px; padding: 20px; }
      .metric-grid { grid-template-columns: 1fr 1fr; }
      .metric-card strong { font-size: 20px; }
    }
    @media print {
      @page {
        size: A4 portrait;
        margin: 12mm;
      }

      html,
      body {
        width: 210mm;
        min-height: 297mm;
        background: #fff !important;
        color: #2f2a31;
        font-size: 10.5px;
        line-height: 1.28;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .page {
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
        padding: 0 !important;
      }

      .report-header {
        border-radius: 0;
        padding: 0 0 8mm;
        margin: 0 0 7mm;
        background: #fff !important;
        border: 0;
        border-bottom: 2px solid var(--primary);
      }

      .eyebrow {
        font-size: 9px;
        margin-bottom: 3px;
      }

      h1 {
        font-size: 22px;
        line-height: 1.12;
      }

      .meta {
        gap: 5px;
        margin-top: 6mm;
        font-size: 9.5px;
      }

      .meta span {
        padding: 4px 7px;
        border-radius: 999px;
      }

      .metric-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 4mm;
        margin-bottom: 6mm;
      }

      .metric-card,
      .report-section {
        box-shadow: none;
        break-inside: avoid;
        page-break-inside: avoid;
      }

      .metric-card {
        border-radius: 8px;
        padding: 4mm;
      }

      .metric-card span {
        font-size: 8px;
        margin-bottom: 3px;
      }

      .metric-card strong {
        font-size: 14px;
      }

      .report-section {
        border-radius: 8px;
        margin-bottom: 6mm;
        overflow: visible;
      }

      .section-title {
        padding: 4mm;
      }

      .section-title h2 {
        font-size: 13px;
      }

      .section-title span {
        font-size: 9px;
      }

      .table-wrap {
        overflow: visible;
      }

      table {
        width: 100%;
        min-width: 0;
        table-layout: fixed;
        page-break-inside: auto;
      }

      thead {
        display: table-header-group;
      }

      tr {
        page-break-inside: avoid;
        break-inside: avoid;
      }

      th,
      td {
        padding: 5px 6px;
        font-size: 8.7px;
        line-height: 1.25;
        overflow-wrap: anywhere;
        word-break: normal;
      }

      th {
        font-size: 7.8px;
      }

      .money {
        white-space: nowrap;
      }

      .badge {
        min-height: 0;
        padding: 2px 5px;
        font-size: 8px;
      }

      .print-actions {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <main class="page">
    <header class="report-header">
      <p class="eyebrow">NailBooker</p>
      <h1>${htmlEscape(report.reportTitle)}</h1>
      <div class="meta">
        <span>Gemaakt op ${htmlEscape(createdAt)}</span>
        <span>${htmlEscape(filterStatusLabel)}</span>
      </div>
    </header>

    <section class="metric-grid">
      ${metricCard('Aantal afspraken', report.filtered.length)}
      ${metricCard('Som totaal', euro(report.totalRevenue))}
      ${metricCard('Betaald', euro(report.paidRevenue))}
      ${metricCard('Onbetaald', euro(report.unpaidRevenue))}
    </section>

    <section class="report-section">
      <div class="section-title"><h2>${htmlEscape(report.periodTitle)}</h2><span>${htmlEscape(report.periodColumnTitle)}</span></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>${htmlEscape(report.periodColumnTitle)}</th><th>Aantal</th><th class="money">Totaal</th><th class="money">Betaald</th><th class="money">Onbetaald</th></tr></thead>
          <tbody>${periodRows}</tbody>
        </table>
      </div>
    </section>

    <section class="report-section">
      <div class="section-title"><h2>Totalen per betaalwijze</h2><span>Betaaloverzicht</span></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Betaalwijze</th><th>Aantal</th><th class="money">Totaal</th><th class="money">Betaald</th><th class="money">Onbetaald</th></tr></thead>
          <tbody>${paymentRows}</tbody>
        </table>
      </div>
    </section>

    <section class="report-section">
      <div class="section-title"><h2>Detail afspraken</h2><span>${report.filtered.length} afspraken</span></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Datum</th><th>Tijd</th><th>Klant</th><th>Dienst</th><th class="money">Prijs</th><th>Status</th><th>Betaalwijze</th><th>Afspraakstatus</th></tr></thead>
          <tbody>${appointmentRows}</tbody>
        </table>
      </div>
    </section>

    <div class="print-actions">
      <button type="button" onclick="window.print()">Printen / bewaren als PDF</button>
    </div>
  </main>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${getRevenueExportTitle()}_rapport.html`;
  link.dataset.allowBusyDownload = "true";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}


function getCostsExportTitle() {
  const type = getCostsPeriodType();
  const anchor = getCostsPeriodDate();

  if (type === 'year') return `kosten_${anchor.slice(0, 4)}`;
  if (type === 'month') return `kosten_${anchor.slice(0, 7)}`;
  if (type === 'week') {
    const bounds = weekBounds(anchor);
    return `kosten_week_${bounds.start}_tot_${bounds.end}`;
  }
  return `kosten_${anchor}`;
}

function getCostsReportData() {
  const filtered = getFilteredCosts(getData())
    .slice()
    .sort((a, b) => String(a.date || '').localeCompare(String(b.date || '')) || String(a.description || '').localeCompare(String(b.description || ''), 'nl-BE'));

  const periodType = getCostsPeriodType();
  const periodDate = getCostsPeriodDate();
  const totalIncl = filtered.reduce((sum, cost) => sum + Number(cost.amountInclVat || 0), 0);
  const vatTotal = filtered.reduce((sum, cost) => {
    const amount = Number(cost.amountInclVat || 0);
    const rate = Number(cost.vatRate || 0);
    return sum + (rate > 0 ? amount - (amount / (1 + (rate / 100))) : 0);
  }, 0);
  const totalExcl = totalIncl - vatTotal;

  const periodTotals = new Map();
  filtered.forEach(cost => {
    let key = cost.date || '';
    let label = cost.date || '';

    if (periodType === 'year') {
      key = String(cost.date || '').slice(0, 7);
      const monthNumber = Number(key.slice(5, 7));
      label = monthNumber ? `${getMonthNameLong(monthNumber - 1)} ${key.slice(0, 4)}` : key;
    } else {
      label = cost.date ? formatLongDate(cost.date) : '';
    }

    const current = periodTotals.get(key) || { label, count: 0, totalIncl: 0, totalExcl: 0, vatTotal: 0 };
    const amount = Number(cost.amountInclVat || 0);
    const rate = Number(cost.vatRate || 0);
    const vat = rate > 0 ? amount - (amount / (1 + (rate / 100))) : 0;
    current.count += 1;
    current.totalIncl += amount;
    current.vatTotal += vat;
    current.totalExcl += amount - vat;
    periodTotals.set(key, current);
  });

  const periodTitle =
    periodType === 'year' ? 'Totalen per maand' :
    periodType === 'month' ? 'Totalen per dag' :
    periodType === 'week' ? 'Totalen per dag' :
    'Totalen per kost';

  const periodColumnTitle = periodType === 'year' ? 'Maand' : periodType === 'day' ? 'Kost' : 'Datum';

  let reportTitle = 'Kostenrapport';
  if (periodType === 'day') reportTitle = `Kostenrapport · ${formatLongDate(periodDate)}`;
  if (periodType === 'week') {
    const bounds = weekBounds(periodDate);
    reportTitle = `Kostenrapport · week ${formatLongDate(bounds.start)} t.e.m. ${formatLongDate(bounds.end)}`;
  }
  if (periodType === 'month') {
    const d = new Date(periodDate + 'T00:00:00');
    reportTitle = `Kostenrapport · ${getMonthNameLong(d.getMonth())} ${d.getFullYear()}`;
  }
  if (periodType === 'year') reportTitle = `Kostenrapport · ${periodDate.slice(0, 4)}`;

  return {
    filtered,
    periodType,
    periodDate,
    reportTitle,
    totalIncl,
    totalExcl,
    vatTotal,
    periodTotals: Array.from(periodTotals.entries()).sort(([a], [b]) => a.localeCompare(b, 'nl-BE')).map(([, values]) => values),
    periodTitle,
    periodColumnTitle
  };
}

function downloadCostsCsv() {
  const report = getCostsReportData();
  const amountForCsv = (value) => Number(value || 0).toFixed(2).replace('.', ',');
  const rows = [
    ['Periode type', report.periodType],
    ['Periode datum', report.periodDate],
    [],
    ['OVERZICHT'],
    ['Aantal kosten', report.filtered.length],
    ['Totaal incl. btw', amountForCsv(report.totalIncl)],
    ['Totaal excl. btw', amountForCsv(report.totalExcl)],
    ['Btw', amountForCsv(report.vatTotal)],
    [],
    [report.periodTitle.toUpperCase()],
    [report.periodColumnTitle, 'Aantal kosten', 'Totaal incl. btw', 'Totaal excl. btw', 'Btw']
  ];

  if (report.periodTotals.length) {
    report.periodTotals.forEach(item => {
      rows.push([item.label, item.count, amountForCsv(item.totalIncl), amountForCsv(item.totalExcl), amountForCsv(item.vatTotal)]);
    });
  } else {
    rows.push(['Geen gegevens', 0, amountForCsv(0), amountForCsv(0), amountForCsv(0)]);
  }

  rows.push([]);
  rows.push(['DETAIL KOSTEN']);
  rows.push(['Datum', 'Omschrijving', 'Bedrag incl. btw', 'Btw %', 'Bedrag excl. btw', 'Btw']);

  report.filtered.forEach(cost => {
    const amount = Number(cost.amountInclVat || 0);
    const rate = Number(cost.vatRate || 0);
    const vat = rate > 0 ? amount - (amount / (1 + (rate / 100))) : 0;
    rows.push([
      cost.date || '',
      cost.description || '',
      amountForCsv(amount),
      rate,
      amountForCsv(amount - vat),
      amountForCsv(vat)
    ]);
  });

  const csv = rows.map(row => row.map(value => csvEscape(value)).join(';')).join('\r\n');
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${getCostsExportTitle()}.csv`;
  link.dataset.allowBusyDownload = "true";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadCostsStyledReport() {
  const report = getCostsReportData();
  const createdAt = new Date().toLocaleString('nl-BE');

  const metricCard = (label, value) => `
    <article class="metric-card">
      <span>${htmlEscape(label)}</span>
      <strong>${htmlEscape(value)}</strong>
    </article>
  `;

  const moneyCells = item => `
    <td>${htmlEscape(item.count)}</td>
    <td class="money">${htmlEscape(euro(item.totalIncl))}</td>
    <td class="money">${htmlEscape(euro(item.totalExcl))}</td>
    <td class="money">${htmlEscape(euro(item.vatTotal))}</td>
  `;

  const periodRows = report.periodTotals.length
    ? report.periodTotals.map(item => `<tr><td>${htmlEscape(item.label)}</td>${moneyCells(item)}</tr>`).join('')
    : `<tr><td>Geen gegevens</td><td>0</td><td class="money">${htmlEscape(euro(0))}</td><td class="money">${htmlEscape(euro(0))}</td><td class="money">${htmlEscape(euro(0))}</td></tr>`;

  const costRows = report.filtered.length
    ? report.filtered.map(cost => {
        const amount = Number(cost.amountInclVat || 0);
        const rate = Number(cost.vatRate || 0);
        const vat = rate > 0 ? amount - (amount / (1 + (rate / 100))) : 0;
        return `
          <tr>
            <td>${htmlEscape(cost.date || '')}</td>
            <td>${htmlEscape(cost.description || '')}</td>
            <td class="money">${htmlEscape(euro(amount))}</td>
            <td>${htmlEscape(rate)}%</td>
            <td class="money">${htmlEscape(euro(amount - vat))}</td>
            <td class="money">${htmlEscape(euro(vat))}</td>
          </tr>
        `;
      }).join('')
    : `<tr><td colspan="6" class="empty-row">Geen kosten voor deze selectie.</td></tr>`;

  const html = `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${htmlEscape(report.reportTitle)}</title>
  <style>
    :root { --bg:#fbf7f9; --card:#fff; --line:#eddfe6; --primary:#d991ab; --primary-dark:#b86d87; --primary-soft:#f8e8ee; --text:#4e4650; --muted:#8c838d; }
    * { box-sizing:border-box; }
    body { margin:0; background:linear-gradient(180deg,#fff 0%,var(--bg) 100%); color:var(--text); font-family:Arial, Helvetica, sans-serif; line-height:1.45; }
    .page { width:min(1180px, calc(100% - 32px)); margin:0 auto; padding:34px 0 48px; }
    .report-header { background:linear-gradient(135deg,var(--primary-soft),#fff); border:1px solid var(--line); border-radius:28px; padding:26px; margin-bottom:18px; box-shadow:0 12px 30px rgba(170,120,145,.10); }
    .eyebrow { margin:0 0 6px; color:var(--primary-dark); font-size:12px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; }
    h1 { margin:0; font-size:clamp(28px,5vw,46px); line-height:1.05; color:var(--primary-dark); }
    .meta { display:flex; flex-wrap:wrap; gap:10px; margin-top:18px; color:var(--muted); font-size:14px; }
    .meta span { background:#fff; border:1px solid var(--line); border-radius:999px; padding:8px 12px; }
    .metric-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; margin-bottom:18px; }
    .metric-card,.report-section { background:var(--card); border:1px solid var(--line); box-shadow:0 10px 24px rgba(170,120,145,.09); }
    .metric-card { border-radius:22px; padding:18px; }
    .metric-card span { display:block; color:var(--muted); font-size:12px; font-weight:700; letter-spacing:.04em; text-transform:uppercase; margin-bottom:8px; }
    .metric-card strong { font-size:24px; color:var(--text); }
    .report-section { border-radius:24px; overflow:hidden; margin-bottom:18px; }
    .section-title { display:flex; align-items:center; justify-content:space-between; gap:12px; background:var(--primary-soft); border-bottom:1px solid var(--line); padding:16px 18px; }
    .section-title h2 { margin:0; color:var(--primary-dark); font-size:18px; }
    .section-title span { color:var(--muted); font-size:13px; }
    .table-wrap { overflow-x:auto; }
    table { width:100%; border-collapse:collapse; min-width:720px; }
    th,td { padding:13px 16px; border-bottom:1px solid #f2e8ed; text-align:left; vertical-align:top; font-size:14px; }
    th { color:var(--muted); font-size:12px; font-weight:700; letter-spacing:.04em; text-transform:uppercase; background:#fffafd; }
    tbody tr:nth-child(even) td { background:#fffbfd; }
    tbody tr:last-child td { border-bottom:none; }
    .money { text-align:right; white-space:nowrap; font-weight:700; }
    .empty-row { text-align:center; color:var(--muted); padding:26px; }
    .print-actions { position:sticky; bottom:18px; display:flex; justify-content:flex-end; pointer-events:none; margin-top:20px; }
    .print-actions button { pointer-events:auto; border:none; border-radius:999px; background:var(--primary-dark); color:#fff; min-height:48px; padding:0 18px; font-weight:700; box-shadow:0 12px 24px rgba(184,109,135,.22); cursor:pointer; }
    @media (max-width:780px) { .page{width:min(100% - 18px,1180px); padding-top:12px;} .report-header{border-radius:22px; padding:20px;} .metric-grid{grid-template-columns:1fr 1fr;} .metric-card strong{font-size:20px;} }
    @media print { @page{size:A4 portrait; margin:12mm;} html,body{width:210mm; min-height:297mm; background:#fff!important; color:#2f2a31; font-size:10.5px; line-height:1.28; -webkit-print-color-adjust:exact; print-color-adjust:exact;} .page{width:100%!important; max-width:none!important; margin:0!important; padding:0!important;} .report-header{border-radius:0; padding:0 0 8mm; margin:0 0 7mm; background:#fff!important; border:0; border-bottom:2px solid var(--primary);} .eyebrow{font-size:9px; margin-bottom:3px;} h1{font-size:22px; line-height:1.12;} .meta{gap:5px; margin-top:6mm; font-size:9.5px;} .meta span{padding:4px 7px;} .metric-grid{grid-template-columns:repeat(4,1fr); gap:4mm; margin-bottom:6mm;} .metric-card,.report-section{box-shadow:none; break-inside:avoid; page-break-inside:avoid;} .metric-card{border-radius:8px; padding:4mm;} .metric-card span{font-size:8px; margin-bottom:3px;} .metric-card strong{font-size:14px;} .report-section{border-radius:8px; margin-bottom:6mm; overflow:visible;} .section-title{padding:4mm;} .section-title h2{font-size:13px;} .section-title span{font-size:9px;} .table-wrap{overflow:visible;} table{width:100%; min-width:0; table-layout:fixed; page-break-inside:auto;} thead{display:table-header-group;} tr{page-break-inside:avoid; break-inside:avoid;} th,td{padding:5px 6px; font-size:8.7px; line-height:1.25; overflow-wrap:anywhere;} th{font-size:7.8px;} .money{white-space:nowrap;} .print-actions{display:none!important;} }
  </style>
</head>
<body>
  <main class="page">
    <header class="report-header">
      <p class="eyebrow">NailBooker</p>
      <h1>${htmlEscape(report.reportTitle)}</h1>
      <div class="meta"><span>Gemaakt op ${htmlEscape(createdAt)}</span><span>${report.filtered.length} kosten</span></div>
    </header>
    <section class="metric-grid">
      ${metricCard('Aantal kosten', report.filtered.length)}
      ${metricCard('Totaal incl. btw', euro(report.totalIncl))}
      ${metricCard('Totaal excl. btw', euro(report.totalExcl))}
      ${metricCard('Btw', euro(report.vatTotal))}
    </section>
    <section class="report-section">
      <div class="section-title"><h2>${htmlEscape(report.periodTitle)}</h2><span>${htmlEscape(report.periodColumnTitle)}</span></div>
      <div class="table-wrap"><table><thead><tr><th>${htmlEscape(report.periodColumnTitle)}</th><th>Aantal</th><th class="money">Incl. btw</th><th class="money">Excl. btw</th><th class="money">Btw</th></tr></thead><tbody>${periodRows}</tbody></table></div>
    </section>
    <section class="report-section">
      <div class="section-title"><h2>Detail kosten</h2><span>${report.filtered.length} kosten</span></div>
      <div class="table-wrap"><table><thead><tr><th>Datum</th><th>Omschrijving</th><th class="money">Incl. btw</th><th>Btw %</th><th class="money">Excl. btw</th><th class="money">Btw</th></tr></thead><tbody>${costRows}</tbody></table></div>
    </section>
    <div class="print-actions"><button type="button" onclick="window.print()">Printen / bewaren als PDF</button></div>
  </main>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${getCostsExportTitle()}_rapport.html`;
  link.dataset.allowBusyDownload = "true";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function groupRevenueByCurrency(items, predicate = () => true) {
  return items.filter(predicate).reduce((map, app) => {
    const currency = normalizeCurrency(app.currency || getCurrentCurrency());
    map[currency] = (map[currency] || 0) + Number(app.price || 0);
    return map;
  }, {});
}

function formatCurrencyTotals(totals) {
  const entries = Object.entries(totals || {}).filter(([, value]) => Number(value || 0) !== 0);
  if (!entries.length) return euro(0);
  return entries.map(([currency, value]) => euro(value, currency)).join(" + ");
}

function renderRevenue() {
  renderRevenueFilters();
  syncRevenuePeriodChips();

  const renderSignature = getRevenueRenderSignature();
  const chartWrapForSignature = document.getElementById("revenueChart");
  const chartHasVisibleBars = Boolean(
    chartWrapForSignature?.querySelector(
      ".revenue-bar-col:not(.is-empty) .revenue-bar-fill.paid, .revenue-bar-col:not(.is-empty) .revenue-bar-fill.unpaid"
    )
  );

  // Alleen overslaan als de bestaande grafiek effectief zichtbare staven bevat.
  // Na accountwissel / data-herlaad kan de signature gelijk lijken terwijl de grafiek
  // nog leeg opgebouwd werd; dan moet Omzet opnieuw renderen.
  if (renderSignature && state.revenueLastRenderSignature === renderSignature && chartHasVisibleBars) {
    return;
  }
  state.revenueLastRenderSignature = renderSignature;

  const data = getData();
  const methodList = document.getElementById("paymentMethodList");
  const type = document.getElementById("revenuePeriodType").value;
  const anchor = document.getElementById("revenueDate").value || todayStr;
  const filtered = revenueFilteredAppointments();

  let title = t("revenue");
  if (type === "day") title = `${t("revenueOn")} ${formatLongDate(anchor)}`;
  if (type === "week") {
    const bounds = weekBounds(anchor);
    title = `${t("revenue")} ${formatLongDate(bounds.start)} - ${formatLongDate(bounds.end)}`;
  }
  if (type === "month") {
    const d = new Date(anchor + "T00:00:00");
    title = `${t("revenue")} ${getMonthNameLong(d.getMonth())} ${d.getFullYear()}`;
  }
  if (type === "year") title = `${t("revenue")} ${anchor.slice(0, 4)}`;

  const titleEl = document.getElementById("revenueTitle");
  if (titleEl) titleEl.textContent = title;

  const paid = groupRevenueByCurrency(filtered, a => a.paid);
  const total = groupRevenueByCurrency(filtered);
  const open = groupRevenueByCurrency(filtered, a => !a.paid);
  const totalNumeric = filtered.reduce((sum, a) => sum + Number(a.price || 0), 0);
  const appointmentCount = filtered.length;
  const completedCount = filtered.filter(a => String(a.status || "").toLowerCase() === "afgerond").length;
  const plannedCount = filtered.filter(a => String(a.status || "").toLowerCase() !== "afgerond").length;

  const appointmentCountEl = document.getElementById("revenueAppointmentCount");
  const completedCountEl = document.getElementById("revenueCompletedCount");
  const plannedCountEl = document.getElementById("revenuePlannedCount");

  if (appointmentCountEl) appointmentCountEl.textContent = String(appointmentCount);
  if (completedCountEl) completedCountEl.textContent = String(completedCount);
  if (plannedCountEl) plannedCountEl.textContent = String(plannedCount);

  document.getElementById("plannedRevenue").textContent = formatCurrencyTotals(total);
  document.getElementById("paidRevenue").textContent = formatCurrencyTotals(paid);
  document.getElementById("openRevenue").textContent = formatCurrencyTotals(open);

  const byMethod = {};
  filtered.filter(a => a.paid).forEach(a => {
    const key = paymentMethodNameForAppointment(a, data) || t("unknown");
    const currency = normalizeCurrency(a.currency || getCurrentCurrency());
    byMethod[key] = byMethod[key] || {};
    byMethod[key][currency] = (byMethod[key][currency] || 0) + Number(a.price || 0);
  });

  if (methodList) {
    const methodNames = Object.keys(byMethod).sort((a, b) => a.localeCompare(b, "nl-BE"));
    methodList.innerHTML = totalNumeric > 0 && methodNames.length
      ? `
          <h3 class="revenue-method-title">${t("paymentMethodTitle")}</h3>
          ${methodNames.map(method => `
            <div class="revenue-method-row">
              <span>${method}:</span>
              <strong>${formatCurrencyTotals(byMethod[method])}</strong>
            </div>
          `).join("")}
        `
      : "";
  }


  renderRevenueChart(filtered, type, anchor);
}

function getStatisticsSummary(data = getData()) {
  const customers = Array.isArray(data.customers) ? data.customers : [];
  const services = Array.isArray(data.services) ? data.services : [];
  const appointments = Array.isArray(data.appointments) ? data.appointments : [];

  const paidAppointments = appointments.filter(app => app.paid);
  const paidRevenue = paidAppointments.reduce((sum, app) => sum + Number(app.price || 0), 0);
  const now = new Date();
  const appointmentDateTime = app => new Date(`${app.date || todayStr}T${app.time || '00:00'}:00`);
  const pastAppointments = appointments.filter(app => appointmentDateTime(app).getTime() < now.getTime());
  const futureAppointments = appointments.filter(app => appointmentDateTime(app).getTime() >= now.getTime());
  const paidRevenueUntilToday = paidAppointments
    .filter(app => String(app.date || '') <= todayStr)
    .reduce((sum, app) => sum + Number(app.price || 0), 0);

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
    pastAppointmentCount: pastAppointments.length,
    futureAppointmentCount: futureAppointments.length,
    paidAppointmentCount: paidAppointments.length,
    paidRevenue,
    paidRevenueUntilToday,
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

function getStatisticsAppointmentYears(data = getData()) {
  return Array.from(new Set((data.appointments || [])
    .map(appointment => Number(String(appointment.date || "").slice(0, 4)))
    .filter(year => Number.isFinite(year) && year > 0)))
    .sort((a, b) => b - a);
}

function getTopCustomers(data = getData(), yearFilter = "all") {
  const totals = new Map();
  const safeYearFilter = String(yearFilter || "all");

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
    if (safeYearFilter !== 'all' && !String(appointment.date || '').startsWith(safeYearFilter)) return;
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
    .filter(customer => Number(customer.revenue || 0) > 0)
    .sort((a, b) => (b.revenue - a.revenue) || (b.paidAppointments - a.paidAppointments) || (b.appointments - a.appointments) || a.name.localeCompare(b.name, 'nl-BE'));
}

function renderStatistics() {
  const wrap = document.getElementById('statisticsOverview');
  if (!wrap) return;

  const data = getData();
  const summary = getStatisticsSummary(data);
  const topCustomerYears = getStatisticsAppointmentYears(data);
  if (state.statsTopCustomersYear !== 'all' && !topCustomerYears.includes(Number(state.statsTopCustomersYear))) {
    state.statsTopCustomersYear = 'all';
  }
  const selectedTopCustomerYear = state.statsTopCustomersYear || 'all';
  const topCustomers = getTopCustomers(data, selectedTopCustomerYear);
  const visibleCount = Math.max(10, Number(state.statsTopCustomersVisible) || 10);
  const visibleCustomers = topCustomers.slice(0, visibleCount);
  const hasMoreCustomers = visibleCustomers.length < topCustomers.length;
  const canShowLessCustomers = visibleCount > 10 && topCustomers.length > 10;

  wrap.innerHTML = `
    <section class="statistics-card statistics-kpi-grid">
      <div class="statistics-kpi">
        <span class="statistics-kpi-label">${t("customerCount")}</span>
        <strong>${summary.customerCount}</strong>
      </div>
      <div class="statistics-kpi">
        <span class="statistics-kpi-label">${t("pastAppointments")}</span>
        <strong>${summary.pastAppointmentCount}</strong>
      </div>
      <div class="statistics-kpi">
        <span class="statistics-kpi-label">${t("futureAppointments")}</span>
        <strong>${summary.futureAppointmentCount}</strong>
      </div>
      <div class="statistics-kpi">
        <span class="statistics-kpi-label">${t("totalRevenueUntilToday")}</span>
        <strong>${euro(summary.paidRevenueUntilToday)}</strong>
      </div>
    </section>

    <section class="statistics-card">
      <div class="statistics-card-head">
        <h2>${t("chosenServices")}</h2>
      </div>
      ${buildStatisticsDonut(summary.serviceUsage)}
    </section>

    <section class="statistics-card">
      <div class="statistics-card-head">
        <h2>${t("revenueByService")}</h2>
      </div>
      ${buildStatisticsDonut(summary.revenueByService, value => euro(value))}
    </section>

    <section class="statistics-card">
      <div class="statistics-card-head">
        <h2>${t("chosenPaymentMethod")}</h2>
      </div>
      ${buildStatisticsDonut(summary.paymentUsage)}
    </section>

    <section class="statistics-card">
      <div class="statistics-card-head statistics-card-head-stacked">
        <h2>${t("topCustomers")}</h2>
        <select id="topCustomersYearFilter" class="field compact-field statistics-year-filter" aria-label="Top klanten jaar filteren">
          <option value="all"${selectedTopCustomerYear === 'all' ? ' selected' : ''}>${t("all")}</option>
          ${topCustomerYears.map(year => `<option value="${year}"${String(year) === String(selectedTopCustomerYear) ? ' selected' : ''}>${year}</option>`).join('')}
        </select>
      </div>
      <div class="statistics-top-customers">
        ${visibleCustomers.length ? visibleCustomers.map((customer, index) => `
          <button class="statistics-top-customer-row" type="button" data-customer-id="${customer.id || ''}">
            <div class="statistics-top-customer-rank">${index + 1}</div>
            <div class="statistics-top-customer-name">${customer.name}</div>
            <strong class="statistics-top-customer-amount">${euro(customer.revenue)}</strong>
          </button>
        `).join('') : `<div class="statistics-empty">${t("noCustomerStats")}</div>`}
      </div>
      ${(hasMoreCustomers || canShowLessCustomers) ? `
        <div class="statistics-more-wrap">
          ${hasMoreCustomers ? `<button id="statisticsMoreCustomersBtn" class="btn btn-secondary statistics-more-btn" type="button">${t("more")}</button>` : ''}
          ${canShowLessCustomers ? `<button id="statisticsLessCustomersBtn" class="btn btn-secondary statistics-more-btn" type="button">${t("less")}</button>` : ''}
        </div>
      ` : ''}
    </section>
  `;


  const topCustomersYearFilter = document.getElementById('topCustomersYearFilter');
  if (topCustomersYearFilter) {
    topCustomersYearFilter.addEventListener('change', () => {
      state.statsTopCustomersYear = topCustomersYearFilter.value || 'all';
      state.statsTopCustomersVisible = 10;
      renderStatistics();
    });
  }

  wrap.querySelectorAll('.statistics-top-customer-row[data-customer-id]').forEach(row => {
    row.addEventListener('click', () => {
      const customerId = row.dataset.customerId;
      if (customerId) openClientDetail(customerId);
    });
  });

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


function getSettingsFormSnapshot() {
  const form = document.getElementById("settingsForm");
  if (!form) return "";
  const ids = [
    "settingsDefaultBreakMinutes",
    "settingsNotificationsEnabled",
    "settingsReminderMinutes",
    "settingsOverlapWarningsEnabled",
    "settingsAgendaFabMenuEnabled",
    "settingsShowTipsOnOpen",
    "settingsLanguage",
    "settingsCurrency",
    "settingsPaymentBeneficiaryName",
    "settingsPaymentIban",
    "settingsPaymentBic",
    "settingsPaymentReferencePrefix"
  ];

  const snapshot = ids.reduce((acc, id) => {
    const el = document.getElementById(id);
    if (!el) return acc;
    acc[id] = el.type === "checkbox" ? Boolean(el.checked) : String(el.value || "");
    return acc;
  }, {});

  return JSON.stringify(snapshot);
}

function updateSettingsDirtyState(isDirty = null) {
  const form = document.getElementById("settingsForm");
  const badge = document.getElementById("settingsDirtyBadge");
  const saveHint = document.getElementById("settingsSaveHint");
  const dirty = isDirty === null
    ? Boolean(state.settingsInitialSignature && getSettingsFormSnapshot() !== state.settingsInitialSignature)
    : Boolean(isDirty);

  state.settingsDirty = dirty;
  if (form) form.classList.toggle("is-dirty", dirty);
  if (badge) badge.classList.toggle("hidden", !dirty);
  if (saveHint && dirty && !state.settingsSavePending) {
    saveHint.textContent = "Je hebt niet-opgeslagen wijzigingen.";
  }
}

function markSettingsCleanFromCurrentForm() {
  state.settingsInitialSignature = getSettingsFormSnapshot();
  updateSettingsDirtyState(false);
}

function hasUnsavedSettingsChanges() {
  return state.currentScreen === "settingsScreen" && Boolean(state.settingsDirty);
}

function confirmLeaveSettingsIfDirty() {
  if (!hasUnsavedSettingsChanges()) return true;
  return window.confirm("Je hebt wijzigingen in Instellingen die nog niet opgeslagen zijn.\n\nWil je deze pagina verlaten zonder op te slaan?");
}

function hardenPaymentAutocompleteFields() {
  const fields = [
    ["settingsPaymentBeneficiaryName", "settings_qr_beneficiary_ref", "off"],
    ["settingsPaymentIban", "settings_qr_reference_code", "new-password"],
    ["settingsPaymentBic", "settings_qr_bank_ref", "new-password"]
  ];

  fields.forEach(([id, safeName, autocomplete]) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.setAttribute("name", safeName);
    input.setAttribute("autocomplete", autocomplete);
    input.setAttribute("autocorrect", "off");
    input.setAttribute("spellcheck", "false");
    input.setAttribute("data-lpignore", "true");
    input.setAttribute("data-1p-ignore", "true");
    input.setAttribute("data-form-type", "other");
  });
}

function setupSettingsDirtyTracking() {
  hardenPaymentAutocompleteFields();
  const form = document.getElementById("settingsForm");
  if (!form || form.dataset.dirtyTrackingReady === "true") return;
  form.dataset.dirtyTrackingReady = "true";

  form.addEventListener("input", event => {
    const target = event.target;
    if (target && target.id !== "calendarFeedUrl") updateSettingsDirtyState();
  });

  form.addEventListener("change", event => {
    const target = event.target;
    if (target && target.id !== "calendarFeedUrl") updateSettingsDirtyState();
  });

  window.addEventListener("beforeunload", event => {
    if (!hasUnsavedSettingsChanges()) return;
    event.preventDefault();
    event.returnValue = "";
  });
}

function renderSettings() {
  hardenPaymentAutocompleteFields();
  const settings = getSettings();

  const breakInput = document.getElementById("settingsDefaultBreakMinutes");
  const notificationsToggle = document.getElementById("settingsNotificationsEnabled");
  const reminderSelect = document.getElementById("settingsReminderMinutes");
  const overlapToggle = document.getElementById("settingsOverlapWarningsEnabled");
  const agendaFabMenuToggle = document.getElementById("settingsAgendaFabMenuEnabled");
  const tipsToggle = document.getElementById("settingsShowTipsOnOpen");
  const reminderWrap = document.getElementById("settingsReminderWrap");
  const saveHint = document.getElementById("settingsSaveHint");
  const languageSelect = document.getElementById("settingsLanguage");
  const currencySelect = document.getElementById("settingsCurrency");
  const paymentBeneficiaryNameInput = document.getElementById("settingsPaymentBeneficiaryName");
  const paymentIbanInput = document.getElementById("settingsPaymentIban");
  const paymentBicInput = document.getElementById("settingsPaymentBic");
  const paymentReferencePrefixInput = document.getElementById("settingsPaymentReferencePrefix");

  rebuildSettingsSelectOptions();

  if (!breakInput || !notificationsToggle || !reminderSelect || !overlapToggle || !reminderWrap || !saveHint) return;

  breakInput.value = Number(settings.defaultBreakMinutes || 0);
  notificationsToggle.checked = Boolean(settings.notificationsEnabled);
  reminderSelect.value = String(settings.reminderMinutes || 30);
  overlapToggle.checked = settings.overlapWarningsEnabled !== false;
  if (agendaFabMenuToggle) agendaFabMenuToggle.checked = settings.agendaFabMenuEnabled !== false;
  if (tipsToggle) tipsToggle.checked = settings.showTipsOnOpen !== false;
  if (paymentBeneficiaryNameInput) paymentBeneficiaryNameInput.value = settings.paymentBeneficiaryName || "";
  if (paymentIbanInput) paymentIbanInput.value = settings.paymentIban || "";
  if (paymentBicInput) paymentBicInput.value = settings.paymentBic || "";
  if (paymentReferencePrefixInput) paymentReferencePrefixInput.value = settings.paymentReferencePrefix || "";

  refreshAppSelect(reminderSelect);
  refreshAppSelect(languageSelect);
  refreshAppSelect(currencySelect);
  renderCalendarFeedSettings();
  const notificationsEnabled = Boolean(settings.notificationsEnabled);
  const permissionState = notificationsPermissionState();

  reminderWrap.classList.toggle("hidden", !notificationsEnabled);

  if (state.settingsSavePending) {
    saveHint.textContent = t("savePending");
  } else if (!notificationsEnabled) {
    saveHint.textContent = t("notificationsOff");
  } else if (permissionState === "granted") {
    saveHint.textContent = t("notificationsActive");
  } else if (permissionState === "denied") {
    saveHint.textContent = t("notificationsBlocked");
  } else if (permissionState === "unsupported") {
    saveHint.textContent = t("notificationsUnsupported");
  } else {
    saveHint.textContent = t("notificationsPermissionHint");
  }


  markSettingsCleanFromCurrentForm();
}

function getWelcomeGuideStorageKey() {
  try {
    const email = document.getElementById("accountProfileEmail")?.textContent || "local";
    return `nailbooker_welcome_guide_seen_${String(email || "local").trim().toLowerCase() || "local"}`;
  } catch (error) {
    return "nailbooker_welcome_guide_seen_local";
  }
}

function shouldShowWelcomeGuide() {
  const settings = getSettings();
  if (settings.showTipsOnOpen === false) return false;
  if (sessionStorage.getItem("nailbooker_welcome_guide_shown_this_session") === "true") return false;

  const data = getData();
  const hasClient = Array.isArray(data.customers) && data.customers.length > 0;
  const hasService = Array.isArray(data.services) && data.services.some(service => service?.isActive !== false);
  return !hasClient || !hasService;
}

function setWelcomeGuideVisible(visible) {
  const overlay = document.getElementById("welcomeGuideOverlay");
  if (!overlay) return;
  overlay.classList.toggle("hidden", !visible);
  overlay.setAttribute("aria-hidden", visible ? "false" : "true");
  if (visible) {
    sessionStorage.setItem("nailbooker_welcome_guide_shown_this_session", "true");
  }
}

function closeWelcomeGuide({ remember = false } = {}) {
  if (remember) {
    try { localStorage.setItem(getWelcomeGuideStorageKey(), "true"); } catch (error) {}
  }
  setWelcomeGuideVisible(false);
}

function openWelcomeGuide(force = false) {
  if (!force && !shouldShowWelcomeGuide()) return;
  const data = getData();
  const clientDone = Array.isArray(data.customers) && data.customers.length > 0;
  const serviceDone = Array.isArray(data.services) && data.services.some(service => service?.isActive !== false);
  const appointmentReady = clientDone && serviceDone;
  const guideToggle = document.getElementById("welcomeGuideTipsToggle");
  if (guideToggle) guideToggle.checked = getSettings().showTipsOnOpen !== false;

  document.getElementById("welcomeGuideClientCheck")?.classList.toggle("done", clientDone);
  document.getElementById("welcomeGuideServiceCheck")?.classList.toggle("done", serviceDone);
  document.getElementById("welcomeGuideAppointmentCheck")?.classList.toggle("done", appointmentReady);

  setWelcomeGuideVisible(true);
}

function scheduleWelcomeGuideCheck() {
  window.setTimeout(() => openWelcomeGuide(false), 450);
}

async function setTipsOnOpenPreference(enabled) {
  const data = getData();
  data.settings = { ...getSettings(), showTipsOnOpen: Boolean(enabled) };
  saveData(data);
}

async function loadSettingsFromSupabase() {
  const user = await getCurrentUser();
  if (!user) return getDefaultSettings();

  const { data, error } = await supabaseClient
    .from("user_settings")
    .select("default_break_minutes, notifications_enabled, reminder_minutes, overlap_warnings_enabled, language, currency, payment_beneficiary_name, payment_iban, payment_bic, payment_reference_prefix, calendar_feed_token")
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
    overlapWarningsEnabled: data?.overlap_warnings_enabled !== false,
    agendaFabMenuEnabled: readAgendaFabMenuEnabledPreference(),
    showTipsOnOpen: getData()?.settings?.showTipsOnOpen !== false,
    language: normalizeLanguage(data?.language || DEFAULT_LANGUAGE),
    currency: normalizeCurrency(data?.currency || DEFAULT_CURRENCY),
    paymentBeneficiaryName: String(data?.payment_beneficiary_name || ""),
    paymentIban: normalizeIban(data?.payment_iban || ""),
    paymentBic: String(data?.payment_bic || "").trim().toUpperCase(),
    paymentReferencePrefix: normalizePaymentReferencePrefix(data?.payment_reference_prefix),
    calendarFeedToken: String(data?.calendar_feed_token || "")
  };
}

async function saveSettingsFromForm(event) {
  if (event) event.preventDefault();

  const settings = {
    defaultBreakMinutes: Math.max(0, Number(document.getElementById("settingsDefaultBreakMinutes")?.value || 0)),
    notificationsEnabled: Boolean(document.getElementById("settingsNotificationsEnabled")?.checked),
    reminderMinutes: Number(document.getElementById("settingsReminderMinutes")?.value || 30),
    overlapWarningsEnabled: Boolean(document.getElementById("settingsOverlapWarningsEnabled")?.checked),
    agendaFabMenuEnabled: Boolean(document.getElementById("settingsAgendaFabMenuEnabled")?.checked),
    showTipsOnOpen: document.getElementById("settingsShowTipsOnOpen")?.checked !== false,
    language: normalizeLanguage(document.getElementById("settingsLanguage")?.value || getCurrentLanguage()),
    currency: normalizeCurrency(document.getElementById("settingsCurrency")?.value || getCurrentCurrency()),
    paymentBeneficiaryName: String(document.getElementById("settingsPaymentBeneficiaryName")?.value || "").trim(),
    paymentIban: normalizeIban(document.getElementById("settingsPaymentIban")?.value || ""),
    paymentBic: String(document.getElementById("settingsPaymentBic")?.value || "").trim().toUpperCase(),
    paymentReferencePrefix: String(document.getElementById("settingsPaymentReferencePrefix")?.value || "").trim(),
    calendarFeedToken: getSettings().calendarFeedToken || ""
  };

  if (settings.paymentIban && !isValidIban(settings.paymentIban)) {
    await appAlert("Het bankrekeningnummer is niet geldig. Controleer het IBAN-nummer en probeer opnieuw.", {
      title: "Ongeldig bankrekeningnummer",
      variant: "warning"
    });
    const paymentIbanInput = document.getElementById("settingsPaymentIban");
    if (paymentIbanInput) {
      paymentIbanInput.focus();
      paymentIbanInput.select?.();
    }
    return;
  }

  const user = await getCurrentUser();

  if (!user) {
    const data = getData();
    data.settings = settings;
    writeAgendaFabMenuEnabledPreference(settings.agendaFabMenuEnabled);
    currentProfilePreferences = { language: settings.language, currency: settings.currency };
    saveData(data);
    state.settingsSavePending = false;
    state.settingsDirty = false;
    markSettingsCleanFromCurrentForm();
    await syncNotificationState({ requestPermission: settings.notificationsEnabled });
    rerenderAll();
    await appAlert(t("settingsSavedDevice"), { title: t("settingsSaved"), variant: "success" });
    renderSettings();
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
    language: settings.language,
    currency: settings.currency,
    payment_beneficiary_name: settings.paymentBeneficiaryName || null,
    payment_iban: settings.paymentIban || null,
    payment_bic: settings.paymentBic || null,
    payment_reference_prefix: settings.paymentReferencePrefix || null,
    calendar_feed_token: settings.calendarFeedToken || null,
    updated_at: new Date().toISOString()
  };

  await upsertProfile(user.id, {
    ...(await getCurrentProfile() || {}),
    language: settings.language,
    currency: settings.currency,
    terms_accepted: true
  });

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
  writeAgendaFabMenuEnabledPreference(settings.agendaFabMenuEnabled);
  currentProfilePreferences = { language: settings.language, currency: settings.currency };
  saveData(data);
  state.settingsDirty = false;
  markSettingsCleanFromCurrentForm();
  await syncNotificationState({ requestPermission: settings.notificationsEnabled });
  rerenderAll();
  await appAlert(t("settingsSaved"), { title: t("settingsSaved"), variant: "success" });
  renderSettings();
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
            <div class="client-detail-label">${t("customerNumber")}</div>
            ${renderClientContactValue('text', customerNumber(client))}
          </div>

          <div class="client-detail-row client-detail-row-stacked">
            <div class="client-detail-label">${t("firstName")}</div>
            ${renderClientContactValue('text', client.firstName || '-')}
          </div>

          <div class="client-detail-row client-detail-row-stacked">
            <div class="client-detail-label">${t("lastName")}</div>
            ${renderClientContactValue('text', client.lastName || '-')}
          </div>

          <div class="client-detail-row client-detail-row-stacked">
            <div class="client-detail-label">${t("phone")}</div>
            ${renderClientContactValue('phone', client.phone || '')}
          </div>

          <div class="client-detail-row client-detail-row-stacked">
            <div class="client-detail-label">${t("email")}</div>
            ${renderClientContactValue('email', client.email || '')}
          </div>

          <div class="client-detail-note-block">
            <div class="client-detail-label">${t("note")}</div>
            <div class="client-detail-note">${safeNote}</div>
          </div>
        </div>

        <div class="client-detail-footer">
          <button class="btn client-detail-edit-btn app-action-nav-btn" id="editClientBtn" type="button" aria-label="${t("edit")}">
            <span class="app-action-nav-ico" aria-hidden="true">${getActionButtonIconSvg('edit')}</span>
            <span class="app-action-nav-label">${t("edit")}</span>
          </button>
        </div>
      </div>

      <div class="client-appointments-section">
        <div class="client-appointments-header">
          <div class="client-appointments-title">${t("appointments").toUpperCase()}</div>
          <div class="client-appointments-count">${appts.length} ${t("totalLower")}</div>
        </div>

        <div class="client-new-appointment-bar">
          <button
            class="client-inline-add-btn"
            id="newClientAppointmentBtn"
            type="button"
            aria-label="${t("newAppointment")}"
            title="${t("newAppointment")}"
          >
            +
          </button>
        </div>

        <div class="client-appointments-list">
          ${
            appts.length
              ? `<div class="appointment-card client-detail-appointment-card">${appts.map(app => {
                  const service = serviceById(data, app.serviceId);
                  const statusParts = [];
                  if ((app.status || "").toLowerCase() === "no-show") {
                    statusParts.push("no show");
                  } else {
                    statusParts.push(app.paid ? t("paid").toLowerCase() : t("unpaid").toLowerCase());
                    const method = paymentMethodNameForAppointment(app, data);
                    if (app.paid && method) statusParts.push(method);
                  }

                  return `
                    <div class="appointment-row client-detail-appointment-row" data-id="${app.id}" role="button" tabindex="0" aria-label="${t("editAppointment")}">
                      <div class="time-block">
                        <div class="time">${app.time || ""}</div>
                        <div class="time-end">${formatShortDate(app.date)}</div>
                      </div>
                      <div>
                        <div class="main-name">${service ? service.name : "-"}</div>
                        <div class="meta">${statusParts.join(" · ")}</div>
                      </div>
                      <button class="price-chip ${app.paid ? "paid" : ""} ${(app.status || "").toLowerCase() === "no-show" ? "no-show" : ""}" data-id="${app.id}" type="button">${euro(app.price, app.currency)}</button>
                    </div>
                  `;
                }).join("")}</div>`
              : `<div class="client-appointment-empty">${t("noAppointmentsYet")}</div>`
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

  content.querySelectorAll(".client-detail-appointment-row").forEach(row => {
    const openActions = () => openAppointmentActionPopover(row.dataset.id, row);
    row.addEventListener("click", event => {
      if (event.target.closest(".price-chip")) return;
      openActions();
    });
    row.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openActions();
      }
    });
  });

  content.querySelectorAll(".client-detail-appointment-row .price-chip").forEach(btn => {
    btn.addEventListener("click", event => {
      event.stopPropagation();
      openPaymentDialog(btn.dataset.id, btn);
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


function customerSearchText(customer) {
  return [
    fullName(customer),
    customer.firstName,
    customer.lastName,
    customer.phone,
    String(customer.phone || "").replace(/\D/g, ""),
    customer.email,
    customerNumber(customer)
  ].join(" ").toLowerCase();
}

function setAppointmentCustomer(customerId, { updateSearch = true } = {}) {
  const data = getData();
  const customerSelect = document.getElementById("appointmentCustomer");
  const searchInput = document.getElementById("appointmentCustomerSearch");
  const customer = customerById(data, customerId);

  if (customerSelect) {
    customerSelect.value = customer ? String(customer.id) : "";
  }

  if (searchInput && updateSearch) {
    searchInput.value = customer ? fullName(customer) : "";
  }

  refreshAppSelect(customerSelect);
}


function hideAppointmentCustomerResults() {
  const resultsWrap = document.getElementById("appointmentCustomerResults");
  const searchInput = document.getElementById("appointmentCustomerSearch");
  if (resultsWrap) resultsWrap.classList.add("hidden");
  if (searchInput) {
    searchInput.setAttribute("aria-expanded", "false");
    searchInput.blur();
  }
}

function renderAppointmentCustomerResults(query = "", showAllWhenEmpty = false) {
  const data = getData();
  const resultsWrap = document.getElementById("appointmentCustomerResults");
  const searchInput = document.getElementById("appointmentCustomerSearch");
  if (!resultsWrap) return;

  const safeQuery = String(query || "").trim().toLowerCase();
  const selectedId = document.getElementById("appointmentCustomer")?.value || "";

  let customers = data.customers.slice().sort((a, b) => fullName(a).localeCompare(fullName(b), "nl-BE"));
  if (safeQuery) {
    customers = customers.filter(customer => customerSearchText(customer).includes(safeQuery));
  } else if (!showAllWhenEmpty) {
    customers = [];
  }

  customers = customers.slice(0, 30);

  if (!customers.length) {
    resultsWrap.innerHTML = safeQuery
      ? `<div class="appointment-customer-empty">${t("noClientsFound")}</div>`
      : "";
    resultsWrap.classList.toggle("hidden", !safeQuery);
    if (searchInput) searchInput.setAttribute("aria-expanded", safeQuery ? "true" : "false");
    return;
  }

  resultsWrap.innerHTML = customers.map(customer => {
    const name = fullName(customer) || "Naamloos";
    const meta = [customer.phone, customer.email].filter(Boolean).join(" · ");
    const activeClass = String(customer.id) === String(selectedId) ? " active" : "";
    return `
      <button class="appointment-customer-result${activeClass}" type="button" role="option" data-customer-id="${customer.id}" aria-selected="${activeClass ? "true" : "false"}">
        <span class="appointment-customer-result-name">${name}</span>
        ${meta ? `<span class="appointment-customer-result-meta">${meta}</span>` : ""}
      </button>
    `;
  }).join("");

  resultsWrap.classList.remove("hidden");
  if (searchInput) searchInput.setAttribute("aria-expanded", "true");
}

function setupAppointmentCustomerSearch() {
  const searchInput = document.getElementById("appointmentCustomerSearch");
  const resultsWrap = document.getElementById("appointmentCustomerResults");
  const customerSelect = document.getElementById("appointmentCustomer");
  if (!searchInput || !customerSelect || searchInput.dataset.ready === "true") return;

  searchInput.dataset.ready = "true";
  if (resultsWrap) resultsWrap.classList.add("hidden");

  const rebuildCustomerDropdown = () => {
    const data = getData();
    const query = String(searchInput.value || "").trim().toLowerCase();
    const currentValue = customerSelect.value;

    let customers = data.customers.slice().sort((a, b) => fullName(a).localeCompare(fullName(b), "nl-BE"));
    if (query) customers = customers.filter(customer => customerSearchText(customer).includes(query));

    const hasCurrent = currentValue && customers.some(customer => String(customer.id) === String(currentValue));
    if (currentValue && !hasCurrent) {
      const currentCustomer = customerById(data, currentValue);
      if (currentCustomer) customers.unshift(currentCustomer);
    }

    customerSelect.innerHTML = `<option value="">${t("chooseCustomer")}</option>` +
      customers.map(customer => `<option value="${customer.id}">${htmlEscape(fullName(customer) || "Naamloos")}</option>`).join("");
    customerSelect.value = currentValue && Array.from(customerSelect.options).some(option => option.value === String(currentValue))
      ? String(currentValue)
      : "";
    refreshAppSelect(customerSelect);
  };

  searchInput.addEventListener("input", () => {
    customerSelect.value = "";
    refreshAppSelect(customerSelect);
    renderAppointmentCustomerResults(searchInput.value, true);
  });

  searchInput.addEventListener("focus", () => {
    renderAppointmentCustomerResults(searchInput.value, true);
  });

  if (resultsWrap && resultsWrap.dataset.ready !== "true") {
    resultsWrap.dataset.ready = "true";
    resultsWrap.addEventListener("click", event => {
      const button = event.target.closest("[data-customer-id]");
      if (!button) return;
      event.preventDefault();
      event.stopPropagation();
      setAppointmentCustomer(button.dataset.customerId);
      hideAppointmentCustomerResults();
      if (typeof updateAppointmentOpenCustomerButton === "function") updateAppointmentOpenCustomerButton();
    });
  }

  customerSelect.addEventListener("change", () => {
    const customer = customerById(getData(), customerSelect.value);
    searchInput.value = customer ? fullName(customer) : "";
    refreshAppSelect(customerSelect);
  });

  customerSelect.dataset.rebuildAppointmentDropdown = "true";
}

function serviceSearchText(service) {
  return [
    service?.name,
    service?.duration,
    service?.price,
    service?.isActive === false ? t("inactive") : ""
  ].join(" ").toLowerCase();
}

function setAppointmentService(serviceId, { updateSearch = true, updateDefaults = true } = {}) {
  const data = getData();
  const serviceSelect = document.getElementById("appointmentService");
  const searchInput = document.getElementById("appointmentServiceSearch");
  const service = serviceById(data, serviceId);

  if (serviceSelect) {
    serviceSelect.value = service ? String(service.id) : "";
  }

  if (searchInput && updateSearch) {
    searchInput.value = service ? service.name : "";
  }

  refreshAppSelect(serviceSelect);

  if (updateDefaults && service) {
    syncServiceDefaults();
  }
}

function hideAppointmentServiceResults() {
  const resultsWrap = document.getElementById("appointmentServiceResults");
  const searchInput = document.getElementById("appointmentServiceSearch");
  if (resultsWrap) resultsWrap.classList.add("hidden");
  if (searchInput) {
    searchInput.setAttribute("aria-expanded", "false");
    searchInput.blur();
  }
}

function renderAppointmentServiceResults(query = "", showAllWhenEmpty = false) {
  const data = getData();
  const resultsWrap = document.getElementById("appointmentServiceResults");
  const searchInput = document.getElementById("appointmentServiceSearch");
  if (!resultsWrap) return;

  const safeQuery = String(query || "").trim().toLowerCase();
  const selectedId = document.getElementById("appointmentService")?.value || "";

  let services = (data.services || [])
    .filter(service => service.isActive !== false || String(service.id) === String(selectedId))
    .slice()
    .sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "nl-BE"));

  if (safeQuery) {
    services = services.filter(service => serviceSearchText(service).includes(safeQuery));
  } else if (!showAllWhenEmpty) {
    services = [];
  }

  services = services.slice(0, 30);

  if (!services.length) {
    resultsWrap.innerHTML = safeQuery
      ? `<div class="appointment-service-empty">${t("noActiveServices")}</div>`
      : "";
    resultsWrap.classList.toggle("hidden", !safeQuery);
    if (searchInput) searchInput.setAttribute("aria-expanded", safeQuery ? "true" : "false");
    return;
  }

  resultsWrap.innerHTML = services.map(service => {
    const name = service.name || "Naamloze dienst";
    const metaParts = [];
    if (Number(service.duration || 0)) metaParts.push(`${Number(service.duration)} min`);
    if (Number(service.price || 0)) metaParts.push(euro(service.price));
    if (service.isActive === false) metaParts.push(t("inactive"));
    const activeClass = String(service.id) === String(selectedId) ? " active" : "";
    return `
      <button class="appointment-service-result${activeClass}" type="button" role="option" data-service-id="${service.id}" aria-selected="${activeClass ? "true" : "false"}">
        <span class="appointment-service-result-name">${htmlEscape(name)}</span>
        ${metaParts.length ? `<span class="appointment-service-result-meta">${htmlEscape(metaParts.join(" · "))}</span>` : ""}
      </button>
    `;
  }).join("");

  resultsWrap.classList.remove("hidden");
  if (searchInput) searchInput.setAttribute("aria-expanded", "true");
}

function setupAppointmentServiceSearch() {
  const searchInput = document.getElementById("appointmentServiceSearch");
  const resultsWrap = document.getElementById("appointmentServiceResults");
  const serviceSelect = document.getElementById("appointmentService");
  if (!searchInput || !serviceSelect || searchInput.dataset.ready === "true") return;

  searchInput.dataset.ready = "true";
  if (resultsWrap) resultsWrap.classList.add("hidden");

  const rebuildServiceDropdown = () => {
    const data = getData();
    const query = String(searchInput.value || "").trim().toLowerCase();
    const currentValue = serviceSelect.value;

    let services = (data.services || [])
      .filter(service => service.isActive !== false || String(service.id) === String(currentValue))
      .slice()
      .sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "nl-BE"));

    if (query) services = services.filter(service => serviceSearchText(service).includes(query));

    const hasCurrent = currentValue && services.some(service => String(service.id) === String(currentValue));
    if (currentValue && !hasCurrent) {
      const currentService = serviceById(data, currentValue);
      if (currentService) services.unshift(currentService);
    }

    serviceSelect.innerHTML = `<option value="">${t("chooseService")}</option>` + services.map(service => {
      const suffix = service.isActive === false ? ` (${t("inactive")})` : "";
      return `<option value="${service.id}">${htmlEscape((service.name || "Naamloze dienst") + suffix)}</option>`;
    }).join("");
    serviceSelect.value = currentValue && Array.from(serviceSelect.options).some(option => option.value === String(currentValue))
      ? String(currentValue)
      : "";
    refreshAppSelect(serviceSelect);
  };

  searchInput.addEventListener("input", () => {
    serviceSelect.value = "";
    refreshAppSelect(serviceSelect);
    renderAppointmentServiceResults(searchInput.value, true);
  });

  searchInput.addEventListener("focus", () => {
    renderAppointmentServiceResults(searchInput.value, true);
  });

  if (resultsWrap && resultsWrap.dataset.ready !== "true") {
    resultsWrap.dataset.ready = "true";
    resultsWrap.addEventListener("click", event => {
      const button = event.target.closest("[data-service-id]");
      if (!button) return;
      event.preventDefault();
      event.stopPropagation();
      setAppointmentService(button.dataset.serviceId);
      hideAppointmentServiceResults();
    });
  }

  serviceSelect.addEventListener("change", () => {
    const service = serviceById(getData(), serviceSelect.value);
    searchInput.value = service ? service.name : "";
    refreshAppSelect(serviceSelect);
    syncServiceDefaults();
  });

  serviceSelect.dataset.rebuildAppointmentDropdown = "true";
}



function setAppointmentPrivateMode(isPrivate) {
  const privateMode = Boolean(isPrivate);
  const form = document.getElementById("appointmentForm");
  const checkbox = document.getElementById("appointmentIsPrivate");
  if (checkbox) checkbox.checked = privateMode;
  if (form) form.classList.toggle("appointment-private-mode", privateMode);

  // Belangrijk: naast CSS ook expliciet met .hidden werken.
  // Zo kunnen gewone klantvelden en privévelden niet opnieuw tegelijk zichtbaar worden
  // door latere CSS-wijzigingen of browser-cache.
  document.querySelectorAll("#appointmentForm .appointment-normal-field").forEach(field => {
    field.classList.toggle("hidden", privateMode);
    field.setAttribute("aria-hidden", String(privateMode));
    field.querySelectorAll("input, select, textarea, button").forEach(control => {
      if (control.id !== "appointmentOpenCustomerBtn") control.disabled = privateMode;
    });
  });

  document.querySelectorAll("#appointmentForm .appointment-private-field").forEach(field => {
    field.classList.toggle("hidden", !privateMode);
    field.setAttribute("aria-hidden", String(!privateMode));
    field.querySelectorAll("input, select, textarea, button").forEach(control => {
      control.disabled = !privateMode;
    });
  });

  ["appointmentCustomer", "appointmentService", "appointmentDuration", "appointmentPrice"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.required = !privateMode;
  });

  const title = document.getElementById("appointmentPrivateTitle");
  const startTime = document.getElementById("appointmentTime");
  const endTime = document.getElementById("appointmentPrivateEndTime");
  const repeat = document.getElementById("appointmentPrivateRepeat");
  const details = document.getElementById("appointmentPrivateDetails");
  const timeLabel = document.getElementById("appointmentTimeLabel") || document.querySelector('label[for="appointmentTime"]');

  if (title) {
    title.required = privateMode;
    title.disabled = !privateMode;
  }
  if (startTime) {
    startTime.required = true;
    startTime.disabled = false;
  }
  if (endTime) {
    endTime.required = privateMode;
    endTime.disabled = !privateMode;
  }
  if (repeat) repeat.disabled = !privateMode;
  if (details) details.disabled = !privateMode;
  if (timeLabel) timeLabel.textContent = privateMode ? "Tijd van" : t("time");

  updatePrivateRepeatWeeklyLabel();
  if (privateMode) syncPrivateEndTimeWithStart();
  updateAppointmentOpenCustomerButton();
}

function updateAppointmentOpenCustomerButton() {
  const btn = document.getElementById("appointmentOpenCustomerBtn");
  if (!btn) return;
  const isPrivate = document.getElementById("appointmentIsPrivate")?.checked;
  const hasCustomer = Boolean(document.getElementById("appointmentCustomer")?.value);
  btn.classList.toggle("hidden", Boolean(isPrivate) || !hasCustomer);
}

function populateAppointmentForm(customerId = null) {
  const data = getData();
  const customerSelect = document.getElementById("appointmentCustomer");
  const serviceSelect = document.getElementById("appointmentService");

  customerSelect.innerHTML = `<option value="">${t("chooseCustomer")}</option>` +
    data.customers.map(c => `<option value="${c.id}">${fullName(c)}</option>`).join("");
  const activeServices = (data.services || []).filter(service => service.isActive !== false);
  serviceSelect.innerHTML = `<option value="">${t("chooseService")}</option>` +
    activeServices.map(s => `<option value="${s.id}">${htmlEscape(s.name || "Naamloze dienst")}</option>`).join("");

  setupAppointmentCustomerSearch();
  setupAppointmentServiceSearch();
  setAppointmentPrivateMode(false);

  if (customerId) {
    setAppointmentCustomer(customerId);
  } else {
    setAppointmentCustomer("");
    const searchInput = document.getElementById("appointmentCustomerSearch");
    if (searchInput) searchInput.value = "";
  }

  const serviceSearchInput = document.getElementById("appointmentServiceSearch");
  if (serviceSearchInput) serviceSearchInput.value = "";
  hideAppointmentServiceResults();
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

  document.getElementById("appointmentForm")?.classList.remove("appointment-form-edit");
  setAppointmentPrivateMode(false);
  document.getElementById("appointmentModalTitle").textContent = t("newAppointment");
  document.getElementById("appointmentId").value = "";
  document.getElementById("appointmentDate").value = state.selectedDate;
  const defaultStartTime = getRoundedCurrentAppointmentTime();
  document.getElementById("appointmentTime").value = defaultStartTime;
  document.getElementById("appointmentPrivateEndTime").value = getAppointmentTimePlusMinutes(defaultStartTime, 60);
  const privateEndDateInput = document.getElementById("appointmentPrivateEndDate");
  if (privateEndDateInput) privateEndDateInput.value = state.selectedDate;
  document.getElementById("appointmentPrivateTitle").value = "";
  document.getElementById("appointmentPrivateDetails").value = "";
  document.getElementById("appointmentPrivateRepeat").value = "none";
  updatePrivateRepeatWeeklyLabel();
  document.getElementById("appointmentStatus").value = "gepland";
  document.getElementById("appointmentStatusWrap").style.display = "none";
  document.getElementById("appointmentOpenCustomerBtn")?.classList.add("hidden");
  const remarksInput = document.getElementById("appointmentRemarks");
  if (remarksInput) remarksInput.value = "";
  syncAppointmentDateTimeDisplays();

  setAppointmentService("", { updateSearch: true, updateDefaults: false });

  const durationInput = document.getElementById("appointmentDuration");
  const priceInput = document.getElementById("appointmentPrice");
  if (durationInput) durationInput.value = "";
  if (priceInput) priceInput.value = "";
  hideAppointmentServiceResults();
  document.getElementById("deleteAppointmentBtn").style.visibility = "hidden";
  document.getElementById("appointmentDialog").showModal();
}

function openEditAppointmentDialog(id) {
  const data = getData();
  const sourceId = String(id || "").split("__")[0];
  const app = data.appointments.find(a => String(a.id) === String(sourceId));
  if (!app) return;

  populateAppointmentForm(app.customerId);

  const appointmentServiceSelect = document.getElementById("appointmentService");
  const currentService = serviceById(data, app.serviceId);
  if (appointmentServiceSelect && currentService && !Array.from(appointmentServiceSelect.options).some(option => String(option.value) === String(currentService.id))) {
    const option = document.createElement("option");
    option.value = currentService.id;
    option.textContent = `${currentService.name} (inactief)`;
    appointmentServiceSelect.appendChild(option);
  }

  document.getElementById("appointmentForm")?.classList.add("appointment-form-edit");
  document.getElementById("appointmentModalTitle").textContent = t("editAppointment");
  setAppointmentPrivateMode(isPrivateAppointment(app));
  document.getElementById("appointmentId").value = app.id;
  setAppointmentCustomer(app.customerId);
  hideAppointmentCustomerResults();
  document.getElementById("appointmentDate").value = app.date;
  document.getElementById("appointmentTime").value = app.time;
  document.getElementById("appointmentPrivateEndTime").value = app.privateEndTime || getAppointmentDisplayEndTime(app, 0) || "";
  const privateEndDateInput = document.getElementById("appointmentPrivateEndDate");
  if (privateEndDateInput) privateEndDateInput.value = getStoredPrivateEndDate(app, app.date);
  document.getElementById("appointmentPrivateTitle").value = app.privateTitle || "";
  document.getElementById("appointmentPrivateDetails").value = app.privateDetails || "";
  document.getElementById("appointmentPrivateRepeat").value = app.recurrenceRule || "none";
  updatePrivateRepeatWeeklyLabel();
  setAppointmentService(app.serviceId, { updateSearch: true, updateDefaults: false });
  hideAppointmentServiceResults();
  document.getElementById("appointmentDuration").value = app.duration;
  document.getElementById("appointmentPrice").value = app.price;
  document.getElementById("appointmentStatus").value = app.status;
  const remarksInput = document.getElementById("appointmentRemarks");
  if (remarksInput) remarksInput.value = app.remarks || "";
  document.getElementById("appointmentStatusWrap").style.display = isPrivateAppointment(app) ? "none" : "block";
  updateAppointmentOpenCustomerButton();
  syncAppointmentDateTimeDisplays();

  document.getElementById("deleteAppointmentBtn").style.visibility = "visible";
  document.getElementById("appointmentDialog").showModal();
}


function openAppointmentCustomerDetailFromDialog() {
  const customerId = document.getElementById("appointmentCustomer")?.value;
  if (!customerId) return;
  closeDialog("appointmentDialog");
  openClientDetail(customerId);
}

function positionAppointmentActionPopover() {
  const popover = document.getElementById("appointmentActionPopover");
  if (!popover || popover.classList.contains("hidden") || !appointmentActionPopoverState.anchorRect) return;

  const card = popover.querySelector(".payment-popover-card");
  if (!card) return;

  const margin = 12;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const cardRect = card.getBoundingClientRect();
  const anchor = appointmentActionPopoverState.anchorRect;

  let left = anchor.left + (anchor.width / 2) - (cardRect.width / 2);
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

function closeAppointmentActionPopover() {
  const popover = document.getElementById("appointmentActionPopover");
  if (!popover) return;
  popover.classList.add("hidden");
  popover.setAttribute("aria-hidden", "true");
  popover.style.left = "";
  popover.style.top = "";
  popover.removeAttribute("data-placement");
  appointmentActionPopoverState.appointmentId = null;
  appointmentActionPopoverState.anchorRect = null;
}

function getOrCreateAppointmentActionContactLinks() {
  const titleWrap = document.querySelector('#appointmentActionPopover .payment-popover-title-wrap');
  if (!titleWrap) return null;

  let links = document.getElementById('appointmentActionContactLinks');
  if (!links) {
    links = document.createElement('div');
    links.id = 'appointmentActionContactLinks';
    links.className = 'appointment-action-contact-links hidden';
    links.setAttribute('aria-label', 'Contactacties klant');
    titleWrap.innerHTML = '';
    titleWrap.appendChild(links);
  }
  return links;
}

function renderAppointmentActionContactLinks(customer = null) {
  const links = getOrCreateAppointmentActionContactLinks();
  if (!links) return;

  const phoneValue = normalizePhoneHref(customer?.phone || '');
  const emailValue = String(customer?.email || '').trim();
  const items = [];

  if (phoneValue) {
    items.push(`
      <a class="appointment-action-contact-btn client-action-btn-call" href="tel:${escapeHtml(phoneValue)}" aria-label="Bellen" title="Bellen">
        <span class="client-action-icon" aria-hidden="true">
          <svg class="client-action-svg client-action-svg-phone" viewBox="0 0 33.866663 33.866663" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M 23.909996,32.434977 C 20.389461,32.094537 15.982601,30.509443 12.849544,28.456682 7.2145569,24.764556 3.0899852,17.711697 2.4473057,10.6692 2.2754657,8.7864544 2.4546714,7.6922982 3.1790805,6.2285059 4.3160008,3.9275809 6.0482706,2.8458773 8.6236913,2.8286216 c 1.2263569,-0.00736 1.3845997,0.1133321 1.6342907,1.2571049 0.334981,1.5340315 0.980983,5.295665 1.1933,6.9485955 0.282797,2.201391 0.131555,2.609886 -1.095805,2.96081 -0.9857392,0.281804 -1.1985177,0.48832 -1.1985177,1.163277 0,0.679666 0.8533197,2.470356 1.8489857,3.880049 0.903416,1.279096 3.30761,3.6896 4.704684,4.716988 1.367875,1.006006 3.942592,2.313883 4.319583,2.194232 0.186889,-0.05922 0.291149,-0.243068 0.351169,-0.618407 0.102416,-0.640666 0.47429,-1.40353 0.849582,-1.742926 0.21091,-0.190772 0.457058,-0.243092 1.075419,-0.229114 1.489809,0.03375 6.767781,0.902178 8.481024,1.395594 0.791091,0.227897 0.975255,0.525719 0.975255,1.577619 0,1.820154 -0.573679,3.179294 -1.887625,4.472123 -1.130634,1.112384 -1.84168,1.435711 -3.601183,1.637302 -0.631587,0.07232 -1.177913,0.124016 -1.214051,0.114806 -0.03617,-0.0073 -0.553558,-0.06383 -1.149806,-0.121598 z" />
        </svg>
        </span>
      </a>`);
    items.push(`
      <a class="appointment-action-contact-btn client-action-btn-sms" href="sms:${escapeHtml(phoneValue)}" aria-label="Bericht sturen" title="Bericht sturen">
        <span class="client-action-icon" aria-hidden="true">
          <svg class="client-action-svg client-action-svg-sms" viewBox="0 0 33.866663 33.866663" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M 17.237191,4.2157633 C 15.924104,4.208373 14.50829,4.3016804 13.618807,4.4808634 10.623333,5.084378 7.6720597,6.584915 5.6999105,8.5069743 4.3110914,9.8604712 3.0792941,11.871952 2.5869222,13.589351 c -0.9929979,3.463411 -0.2111128,6.859917 2.2732463,9.874333 0.7518947,0.912356 1.7234255,1.766311 3.0049845,2.641183 0.5103951,0.34844 1.0304512,0.743743 1.155485,0.877982 0.2160192,0.23183 0.2217486,0.266071 0.1116211,0.682129 -0.1429863,0.540796 -0.5763827,1.273266 -1.1286133,1.90686 -0.2302149,0.264146 -0.475591,0.553612 -0.5451863,0.642855 -0.113099,0.144925 -0.1013234,0.162264 0.107487,0.162264 0.3834421,0 1.4285714,-0.357752 2.7352335,-0.93586 2.058384,-0.910801 1.816009,-0.872366 5.683891,-0.877466 3.794028,-0.0042 4.358245,-0.06403 6.114872,-0.65164 1.255404,-0.419959 3.022798,-1.269399 4.006474,-1.925463 3.510566,-2.341374 5.611292,-5.987736 5.603792,-9.71517 -0.0022,-0.910394 -0.04817,-1.328779 -0.214974,-1.945617 C 30.806233,11.774784 29.800559,10.032112 28.046867,8.3488444 25.802542,6.1947064 22.83288,4.8256552 19.353857,4.3413371 18.776038,4.2608885 18.025042,4.2201977 17.237191,4.2157633 Z M 11.552783,15.481742 a 1.6370258,1.6370258 0 0 1 1.63711,1.63711 1.6370258,1.6370258 0 0 1 -1.63711,1.636592 1.6370258,1.6370258 0 0 1 -1.6371092,-1.636592 1.6370258,1.6370258 0 0 1 1.6371092,-1.63711 z m 5.425509,0 a 1.6370258,1.6370258 0 0 1 1.637109,1.63711 1.6370258,1.6370258 0 0 1 -1.637109,1.636592 1.6370258,1.6370258 0 0 1 -1.63711,-1.636592 1.6370258,1.6370258 0 0 1 1.63711,-1.63711 z m 5.425508,0 a 1.6370258,1.6370258 0 0 1 1.63711,1.63711 1.6370258,1.6370258 0 0 1 -1.63711,1.636592 1.6370258,1.6370258 0 0 1 -1.637109,-1.636592 1.6370258,1.6370258 0 0 1 1.637109,-1.63711 z" />
        </svg>
        </span>
      </a>`);
  }

  if (emailValue) {
    items.push(`
      <a class="appointment-action-contact-btn client-action-btn-email" href="mailto:${escapeHtml(emailValue)}" aria-label="E-mail sturen" title="E-mail sturen">
        <span class="client-action-icon" aria-hidden="true">
          <svg class="client-action-svg client-action-svg-email" viewBox="0 0 33.866667 33.866667" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M 2.0799968,28.080039 C 1.8289663,27.991005 1.5567088,27.744414 1.4169892,27.479523 L 1.2985944,27.255051 1.2856283,17.293783 C 1.2761199,9.9601709 1.2859582,7.2635094 1.3226393,7.0709184 1.3881324,6.7276111 1.546333,6.4659599 1.7896315,6.2985663 2.1880519,6.024446 1.0607028,6.0436646 16.741875,6.0436646 c 15.858803,0 14.596946,-0.023411 14.991777,0.2780721 0.123077,0.093975 0.240534,0.2408551 0.323406,0.404415 l 0.130136,0.2568437 0.01153,10.0464896 c 0.01297,11.386989 0.04718,10.347367 -0.353329,10.747879 -0.414657,0.414658 1.256321,0.373783 -15.121186,0.369879 C 4.1636997,28.144218 2.2360869,28.13543 2.079981,28.080036 Z M 29.762479,17.794045 c 0,-6.591651 -0.0098,-7.9041993 -0.05842,-7.8750832 -0.03214,0.019219 -2.804728,2.3253752 -6.16132,5.1247982 -4.455652,3.716045 -6.164518,5.116653 -6.331205,5.189127 C 16.90421,20.36651 16.495626,20.352406 16.20551,20.198167 16.093541,20.138638 13.265393,17.80932 9.9207458,15.021914 6.5760985,12.234505 3.8134267,9.9381775 3.781474,9.9189603 3.7332257,9.8899451 3.7233859,11.224635 3.7233859,17.794043 v 7.91002 H 16.742938 29.762492 Z M 22.193734,12.99034 27.572168,8.5121374 22.157546,8.5010442 c -2.978042,-0.00605 -7.849026,-0.00605 -10.824409,0 L 5.9233485,8.5121374 11.30037,12.998771 c 2.957361,2.467649 5.408051,4.48284 5.445975,4.478203 0.03792,-0.0046 2.489251,-2.023623 5.447389,-4.486634 z" />
        </svg>
        </span>
      </a>`);
  }

  links.innerHTML = items.join('');
  links.classList.toggle('hidden', items.length === 0);

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', event => event.stopPropagation());
  });
}

function openAppointmentActionPopover(id, anchorEl = null) {
  const data = getData();
  const app = data.appointments.find(a => String(a.id) === String(id));
  if (!app) return;

  if (isPrivateAppointment(app)) {
    openEditAppointmentDialog(id);
    return;
  }

  closePaymentPopover();

  const popover = document.getElementById("appointmentActionPopover");
  if (!popover) {
    openEditAppointmentDialog(id);
    return;
  }

  const detailsBtn = document.getElementById("appointmentActionDetailsBtn");
  const deleteBtn = document.getElementById("appointmentActionDeleteBtn");
  const followUpBtn = document.getElementById("appointmentActionFollowUpBtn");
  const customerBtn = document.getElementById("appointmentActionCustomerBtn");
  const customer = customerById(data, app.customerId);

  renderAppointmentActionContactLinks(customer);

  if (detailsBtn) {
    detailsBtn.onclick = event => {
      event.stopPropagation();
      closeAppointmentActionPopover();
      openEditAppointmentDialog(id);
    };
  }

  if (deleteBtn) {
    deleteBtn.onclick = async event => {
      event.preventDefault();
      event.stopPropagation();
      const appointmentIdInput = document.getElementById("appointmentId");
      if (appointmentIdInput) appointmentIdInput.value = id;
      await deleteCurrentAppointment();
      closeAppointmentActionPopover();
    };
  }

  if (followUpBtn) {
    followUpBtn.onclick = event => {
      event.stopPropagation();
      openFollowUpAppointmentDialog(id);
    };
  }

  if (customerBtn) {
    customerBtn.disabled = !app.customerId;
    customerBtn.onclick = event => {
      event.stopPropagation();
      if (!app.customerId) return;
      closeAppointmentActionPopover();
      openClientDetail(app.customerId);
    };
  }

  const rect = anchorEl?.getBoundingClientRect?.();
  appointmentActionPopoverState.appointmentId = String(id);
  appointmentActionPopoverState.anchorRect = rect
    ? { top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left, width: rect.width, height: rect.height }
    : { top: window.innerHeight / 2, right: window.innerWidth / 2 + 120, bottom: window.innerHeight / 2, left: window.innerWidth / 2 - 120, width: 240, height: 0 };

  popover.classList.remove("hidden");
  popover.setAttribute("aria-hidden", "false");
  requestAnimationFrame(positionAppointmentActionPopover);
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
  requestAnimationFrame(positionPaymentQrPopover);
}

function positionPaymentQrPopover() {
  const qrPopover = document.getElementById("paymentQrPopover");
  const paymentPopover = document.getElementById("paymentPopover");
  if (!qrPopover || qrPopover.classList.contains("hidden") || !paymentPopover || paymentPopover.classList.contains("hidden")) return;

  const paymentCard = paymentPopover.querySelector(".payment-popover-card");
  const qrCard = qrPopover.querySelector(".payment-qr-card");
  if (!paymentCard || !qrCard) return;

  const margin = 12;
  const gap = 10;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const paymentRect = paymentCard.getBoundingClientRect();
  const qrRect = qrCard.getBoundingClientRect();

  let left = paymentRect.left + (paymentRect.width - qrRect.width) / 2;
  left = Math.max(margin, Math.min(left, viewportWidth - qrRect.width - margin));

  let top = paymentRect.bottom + gap;
  if (top + qrRect.height > viewportHeight - margin) {
    top = Math.max(margin, paymentRect.top - qrRect.height - gap);
    qrPopover.dataset.placement = "top";
  } else {
    qrPopover.dataset.placement = "bottom";
  }

  qrPopover.style.left = `${Math.round(left)}px`;
  qrPopover.style.top = `${Math.round(top)}px`;
}

function closePaymentPopover() {
  const popover = document.getElementById("paymentPopover");
  if (popover) {
    popover.classList.add("hidden");
    popover.setAttribute("aria-hidden", "true");
    popover.style.left = "";
    popover.style.top = "";
    popover.removeAttribute("data-placement");
  }

  const qrPopover = document.getElementById("paymentQrPopover");
  if (qrPopover) {
    qrPopover.classList.add("hidden");
    qrPopover.setAttribute("aria-hidden", "true");
    qrPopover.style.left = "";
    qrPopover.style.top = "";
    qrPopover.removeAttribute("data-placement");
  }

  paymentPopoverState.appointmentId = null;
  paymentPopoverState.anchorRect = null;
}

function normalizeIban(value) {
  return String(value || "").replace(/\s+/g, "").toUpperCase();
}

function isValidIban(value) {
  const iban = normalizeIban(value);
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban)) return false;

  const rearranged = `${iban.slice(4)}${iban.slice(0, 4)}`;
  let remainder = 0;

  for (const char of rearranged) {
    const code = char.charCodeAt(0);
    const chunk = code >= 65 && code <= 90 ? String(code - 55) : char;
    if (!/^\d+$/.test(chunk)) return false;

    for (const digit of chunk) {
      remainder = (remainder * 10 + Number(digit)) % 97;
    }
  }

  return remainder === 1;
}

function buildPaymentReference(app, data = getData()) {
  const settings = getSettings();
  const service = serviceById(data, app?.serviceId);
  const treatmentName = service?.name || app?.serviceName || "behandeling";
  const prefix = String(settings.paymentReferencePrefix || "").trim();
  return (prefix ? `${prefix} - ${treatmentName}` : treatmentName).slice(0, 140);
}

function buildEpcQrPayload(app, data = getData()) {
  const settings = getSettings();
  const iban = normalizeIban(settings.paymentIban || "");
  const beneficiary = String(settings.paymentBeneficiaryName || "").trim();
  if (!isValidIban(iban) || !beneficiary) return "";

  const amount = Number(app?.price || 0);
  const safeAmount = Number.isFinite(amount) && amount > 0 ? amount.toFixed(2) : "0.00";
  const bic = String(settings.paymentBic || "").trim().toUpperCase();
  const reference = buildPaymentReference(app, data);

  return [
    "BCD",
    "002",
    "1",
    "SCT",
    bic,
    beneficiary.slice(0, 70),
    iban,
    `EUR${safeAmount}`,
    "",
    "",
    reference
  ].join("\n");
}

function renderPaymentQrTooltip(app, data = getData()) {
  const qrPopover = document.getElementById("paymentQrPopover");
  const button = document.getElementById("paymentQrOpenBtn");
  const hint = document.getElementById("paymentQrButtonHint");
  if (!qrPopover || !button || !hint) return;

  const payload = buildEpcQrPayload(app, data);
  const canShowQr = Boolean(payload);

  if (!canShowQr) {
    qrPopover.classList.add("hidden");
    qrPopover.setAttribute("aria-hidden", "true");
    qrPopover.style.left = "";
    qrPopover.style.top = "";
    qrPopover.removeAttribute("data-placement");
    button.disabled = true;
    button.dataset.qrPayload = "";
    button.dataset.appointmentId = "";
    hint.textContent = "";
    return;
  }

  qrPopover.classList.remove("hidden");
  qrPopover.setAttribute("aria-hidden", "false");

  button.disabled = false;
  button.dataset.qrPayload = payload;
  button.dataset.appointmentId = app?.id ? String(app.id) : "";
  hint.textContent = "";
}

function openPaymentQrModal(event = null) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const button = document.getElementById("paymentQrOpenBtn");
  const dialog = document.getElementById("paymentQrDialog");
  const image = document.getElementById("paymentQrDialogImage");
  const text = document.getElementById("paymentQrDialogText");
  const amount = document.getElementById("paymentQrDialogAmount");
  if (!button || !dialog || !image || !text || !amount) return;

  const payload = button.dataset.qrPayload || "";
  const appointmentId = button.dataset.appointmentId || paymentPopoverState.appointmentId;
  const data = getData();
  const app = data.appointments.find(item => String(item.id) === String(appointmentId));

  if (!payload || !app) {
    image.removeAttribute("src");
    text.textContent = "Vul eerst naam en IBAN in bij Instellingen om een bank-QR te tonen.";
    amount.textContent = "";
  } else {
    image.src = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=14&data=${encodeURIComponent(payload)}`;
    image.dataset.qrPayload = payload;
    amount.textContent = euro(app.price, app.currency);
    text.textContent = buildPaymentReference(app, data);
  }

  openStyledDialog(dialog);
}

function renderPaymentPopoverOptions(app, data = getData()) {
  const list = document.getElementById("paymentMethodListPopup");
  if (!list) return;

  const methods = getPaymentMethods(data);
  const selectedName = paymentMethodNameForAppointment(app, data) || "";
  const isNoShow = (app.status || "").toLowerCase() === "no-show";
  const items = [
    { value: "", label: "Onbetaald", type: "unpaid" },
    { value: "no-show", label: "No show", type: "noshow" },
    ...methods.map(method => ({ value: method.name, label: method.name, type: "payment" }))
  ];

  list.innerHTML = items.map(item => {
    const isActive = item.type === "noshow"
      ? isNoShow
      : item.type === "unpaid"
        ? (!app.paid && !isNoShow)
        : (app.paid && item.value === selectedName && !isNoShow);
    return `
      <button
        type="button"
        class="payment-method-popup-item ${isActive ? "active" : ""} ${item.type === "unpaid" ? "is-unpaid" : ""} ${item.type === "noshow" ? "is-no-show" : ""}"
        data-payment-value="${item.value}"
        data-payment-type="${item.type}"
        role="menuitemradio"
        aria-checked="${isActive ? "true" : "false"}"
      >
        <span>${item.label}</span>
      </button>
    `;
  }).join("");

  list.querySelectorAll(".payment-method-popup-item").forEach(button => {
    button.addEventListener("click", withActionLock(async event => {
      event.stopPropagation();
      const methodName = button.dataset.paymentValue || "";
      const type = button.dataset.paymentType || "payment";
      if (type === "unpaid") {
        await markUnpaid();
        return;
      }
      if (type === "noshow") {
        await markNoShow();
        return;
      }
      await confirmPaymentSelection(methodName);
    }));
  });
}

function openPaymentDialog(id, anchorEl = null) {
  const data = getData();
  const app = data.appointments.find(a => String(a.id) === String(id));
  if (!app) return;

  const popover = document.getElementById("paymentPopover");
  if (!popover) return;

  document.getElementById("paymentAppointmentId").value = id;
  document.getElementById("paymentAmount").textContent = euro(app.price, app.currency);
  const currentMethodWrap = document.getElementById("paymentCurrentMethodWrap");
  const isNoShow = (app.status || "").toLowerCase() === "no-show";
  if (currentMethodWrap) currentMethodWrap.classList.toggle("hidden", isNoShow);
  document.getElementById("paymentDialogCurrentMethod").textContent = app.paid
    ? (paymentMethodNameForAppointment(app, data) || "Onbekend")
    : "Nog niet betaald";

  renderPaymentQrTooltip(app, data);
  renderPaymentPopoverOptions(app, data);

  const rect = anchorEl?.getBoundingClientRect?.();
  paymentPopoverState.appointmentId = String(id);
  paymentPopoverState.anchorRect = rect
    ? { top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left, width: rect.width, height: rect.height }
    : { top: window.innerHeight / 2, right: window.innerWidth / 2 + 120, bottom: window.innerHeight / 2, left: window.innerWidth / 2 - 120, width: 240, height: 0 };

  popover.classList.remove("hidden");
  popover.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => {
    positionPaymentPopover();
    positionPaymentQrPopover();
  });
}

function renderPaymentMethods() {
  const data = getData();
  const list = document.getElementById("paymentMethodsList");
  if (!list) return;

  const methods = getPaymentMethods(data);
  if (!methods.length) {
    list.innerHTML = `<div class="empty-state">${t("noPaymentMethods")}</div>`;
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
        <div class="meta">${usageCount} ${usageCount === 1 ? t("paymentSingular") : t("paymentPlural")}</div>
      </button>
    `;
    card.querySelector("button").addEventListener("click", () => openEditPaymentMethodDialog(method.id));
    list.appendChild(card);
  });
}

function openNewPaymentMethodDialog() {
  document.getElementById("paymentMethodModalTitle").textContent = t("newPaymentMethod");
  document.getElementById("paymentMethodId").value = "";
  document.getElementById("paymentMethodName").value = "";
  document.getElementById("deletePaymentMethodBtn").style.visibility = "hidden";
  document.getElementById("paymentMethodDialog").showModal();
}

function openEditPaymentMethodDialog(id) {
  const data = getData();
  const method = getPaymentMethods(data).find(item => String(item.id) === String(id));
  if (!method) return;

  document.getElementById("paymentMethodModalTitle").textContent = t("editPaymentMethod");
  document.getElementById("paymentMethodId").value = method.id;
  document.getElementById("paymentMethodName").value = method.name;
  document.getElementById("deletePaymentMethodBtn").style.visibility = "visible";
  document.getElementById("paymentMethodDialog").showModal();
}

function openNewClientDialog() {
  document.getElementById("clientModalTitle").textContent = t("newClient");
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

  document.getElementById("clientModalTitle").textContent = t("editClient");
  document.getElementById("clientId").value = client.id;
  document.getElementById("clientFirstName").value = client.firstName || "";
  document.getElementById("clientLastName").value = client.lastName || "";
  document.getElementById("clientPhone").value = client.phone || "";
  document.getElementById("clientEmail").value = client.email || "";
  document.getElementById("clientNote").value = client.note || "";

  document.getElementById("clientDialog").showModal();
}


function selectNumericFieldContent(event) {
  const input = event.currentTarget;
  if (!input) return;
  window.setTimeout(() => {
    try { input.select(); } catch (_) {}
  }, 0);
}

function normalizeDecimalInput(value) {
  let clean = String(value || "").replace(/[^0-9,.]/g, "");
  const firstSeparatorIndex = clean.search(/[,.]/);
  if (firstSeparatorIndex >= 0) {
    const before = clean.slice(0, firstSeparatorIndex + 1);
    const after = clean.slice(firstSeparatorIndex + 1).replace(/[,.]/g, "");
    clean = before + after;
  }
  return clean;
}

function normalizeDurationInput(value) {
  return String(value || "").replace(/[^0-9]/g, "");
}

function parseDecimalInput(value) {
  const normalized = String(value || "").trim().replace(",", ".");
  const number = Number(normalized);
  return Number.isFinite(number) ? number : 0;
}

function normalizeServicePriceInput(value) {
  return normalizeDecimalInput(value);
}

function parseServicePrice(value) {
  return parseDecimalInput(value);
}

function openNewServiceDialog() {
  document.getElementById("serviceModalTitle").textContent = t("newService");
  document.getElementById("serviceId").value = "";
  document.getElementById("serviceName").value = "";
  document.getElementById("serviceDuration").value = 60;
  document.getElementById("servicePrice").value = "";

  const reactivateWrap = document.getElementById("serviceReactivateWrap");
  const reactivateCheckbox = document.getElementById("serviceReactivateCheckbox");
  if (reactivateWrap) reactivateWrap.classList.add("hidden");
  if (reactivateCheckbox) reactivateCheckbox.checked = false;

  document.getElementById("deleteServiceBtn").style.visibility = "hidden";
  document.getElementById("serviceDialog").showModal();
}

function openEditServiceDialog(id) {
  const data = getData();
  const service = serviceById(data, id);
  if (!service) return;

  const isInactive = service.isActive === false;

  document.getElementById("serviceModalTitle").textContent = t("editService");
  document.getElementById("serviceId").value = service.id;
  document.getElementById("serviceName").value = service.name;
  document.getElementById("serviceDuration").value = service.duration;
  document.getElementById("servicePrice").value = service.price;

  const reactivateWrap = document.getElementById("serviceReactivateWrap");
  const reactivateCheckbox = document.getElementById("serviceReactivateCheckbox");
  if (reactivateWrap) reactivateWrap.classList.toggle("hidden", !isInactive);
  if (reactivateCheckbox) reactivateCheckbox.checked = false;

  document.getElementById("deleteServiceBtn").style.visibility = isInactive ? "hidden" : "visible";
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
    confirmText: t("delete"),
    cancelText: t("cancel"),
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


function normalizeServiceNameForDuplicateCheck(name) {
  return String(name || "").trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

function getUniqueServiceNameWithCounter(data, requestedName, excludeId = null) {
  const baseName = String(requestedName || "").trim().replace(/\s+/g, " ");
  if (!baseName) return "";

  const usedNames = new Set(
    (data.services || [])
      .filter(service => String(service.id) !== String(excludeId || ""))
      .map(service => normalizeServiceNameForDuplicateCheck(service.name))
      .filter(Boolean)
  );

  if (!usedNames.has(normalizeServiceNameForDuplicateCheck(baseName))) {
    return baseName;
  }

  let counter = 2;
  let candidate = `${baseName} (${counter})`;
  while (usedNames.has(normalizeServiceNameForDuplicateCheck(candidate))) {
    counter += 1;
    candidate = `${baseName} (${counter})`;
  }

  return candidate;
}

async function resolveServiceNameBeforeSave(data, requestedName, excludeId = null) {
  const cleanName = String(requestedName || "").trim().replace(/\s+/g, " ");
  if (!cleanName) {
    await appAlert(t("serviceNameRequired"), { title: t("service"), variant: "warning" });
    return null;
  }

  const duplicate = (data.services || []).find(service =>
    String(service.id) !== String(excludeId || "") &&
    normalizeServiceNameForDuplicateCheck(service.name) === normalizeServiceNameForDuplicateCheck(cleanName)
  );

  if (!duplicate) return cleanName;

  const uniqueName = getUniqueServiceNameWithCounter(data, cleanName, excludeId);
  const confirmed = await appConfirm(
    t("duplicateServiceMessage", { name: cleanName, uniqueName }),
    {
      title: t("duplicateServiceTitle"),
      confirmText: t("saveAnyway"),
      cancelText: t("cancel"),
      variant: "warning"
    }
  );

  return confirmed ? uniqueName : null;
}

async function saveClientFromForm(event) {
  event.preventDefault();

  const user = await getCurrentUser();
  const data = getData();
  const rawId = document.getElementById("clientId").value;
  const id = rawId ? Number(rawId) : null;

  const payload = {
    firstName: document.getElementById("clientFirstName").value.trim(),
    lastName: document.getElementById("clientLastName").value.trim(),
    phone: normalizePhoneNumber(document.getElementById("clientPhone").value),
    email: document.getElementById("clientEmail").value.trim(),
    note: document.getElementById("clientNote").value.trim()
  };

  const duplicate = findDuplicateCustomer(data, payload, id);
  if (duplicate) {
    const confirmed = await appConfirm(buildDuplicateCustomerMessage(duplicate, payload), {
      title: "Mogelijke dubbele klant",
      confirmText: t("saveAnyway"),
      cancelText: t("cancel"),
      variant: "warning"
    });
    if (!confirmed) return;
  }

  if (!user) {
    if (id) {
      Object.assign(customerById(data, id), payload);
    } else {
      data.customers.push({
        id: nextId(data.customers),
        customerNumber: nextCustomerNumber(data),
        ...payload
      });
    }

    saveData(data);
    closeDialog("clientDialog");
    renderAlphabetFilter();
    renderClients();
    renderRevenueFilters();
    return;
  }

  const dbPayload = {
    user_id: user.id,
    first_name: payload.firstName,
    last_name: payload.lastName,
    phone: payload.phone,
    email: payload.email,
    note: payload.note
  };

  if (!id) {
    dbPayload.customer_number = nextCustomerNumber(data);
  }

  let error;

  if (id) {
    ({ error } = await supabaseClient
      .from("customers")
      .update(dbPayload)
      .eq("id", Number(id))
      .eq("user_id", user.id));
  } else {
    ({ error } = await supabaseClient
      .from("customers")
      .insert(dbPayload));
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
  const data = getData();
  const rawId = document.getElementById("serviceId").value;
  const id = rawId ? Number(rawId) : null;
  const reactivateChecked = Boolean(document.getElementById("serviceReactivateCheckbox")?.checked);
  const serviceName = await resolveServiceNameBeforeSave(data, document.getElementById("serviceName").value, id);

  if (!serviceName) return;

  if (!user) {
    const existingService = id ? serviceById(data, id) : null;
    const nextIsActive = id
      ? (existingService?.isActive === false ? reactivateChecked : true)
      : true;

    const payload = {
      name: serviceName,
      duration: Number(document.getElementById("serviceDuration").value),
      price: parseServicePrice(document.getElementById("servicePrice").value),
      isActive: nextIsActive
    };

    if (id) {
      Object.assign(existingService, payload);
    } else {
      data.services.push({ id: nextId(data.services), ...payload });
    }

    saveData(data);
    closeDialog("serviceDialog");
    rerenderAll();
    return;
  }

  const existingService = id ? serviceById(data, id) : null;
  const nextIsActive = id
    ? (existingService?.isActive === false ? reactivateChecked : true)
    : true;

  const payload = {
    user_id: user.id,
    name: serviceName,
    duration: Number(document.getElementById("serviceDuration").value),
    price: parseServicePrice(document.getElementById("servicePrice").value),
    is_active: nextIsActive
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
    await appAlert("Opslaan dienst mislukt: " + error.message, { title: t("saveFailed"), variant: "danger" });
    return;
  }

  await loadAllDataFromSupabase();
  closeDialog("serviceDialog");
  rerenderAll();
}


function getRoundedCurrentAppointmentTime() {
  const now = new Date();
  const rounded = new Date(now);
  const minutes = rounded.getMinutes();
  const add = minutes === 0 ? 0 : 60 - minutes;
  rounded.setMinutes(minutes + add, 0, 0);
  return timeStringFromMinutes((rounded.getHours() * 60) + rounded.getMinutes());
}

function getAppointmentTimePlusMinutes(timeStr, minutesToAdd = 60) {
  return timeStringFromMinutes(minutesFromTimeString(timeStr || "00:00") + Number(minutesToAdd || 0));
}

async function saveAppointmentFromForm(event) {
  event.preventDefault();

  const user = await getCurrentUser();
  const data = getData();
  const rawId = document.getElementById("appointmentId").value;
  const id = rawId ? Number(rawId) : null;
  const settings = getSettings();

  const selectedCustomerId = document.getElementById("appointmentCustomer").value;
  const isPrivate = Boolean(document.getElementById("appointmentIsPrivate")?.checked);
  if (isPrivate) syncPrivateEndTimeWithStart();

  if (!isPrivate && !selectedCustomerId) {
    await appAlert("Kies eerst een klant uit de zoekresultaten.", { title: "Klant kiezen", variant: "warning" });
    document.getElementById("appointmentCustomerSearch")?.focus();
    return;
  }

  const selectedServiceId = document.getElementById("appointmentService")?.value || "";
  if (!isPrivate && !selectedServiceId) {
    await appAlert("Kies eerst een dienst uit de zoekresultaten.", { title: "Dienst kiezen", variant: "warning" });
    document.getElementById("appointmentServiceSearch")?.focus();
    return;
  }

  const privateStartTime = document.getElementById("appointmentTime")?.value || "";
  const privateEndTime = document.getElementById("appointmentPrivateEndTime")?.value || "";
  const privateEndDate = document.getElementById("appointmentPrivateEndDate")?.value || document.getElementById("appointmentDate")?.value || todayStr;
  const privateTitle = String(document.getElementById("appointmentPrivateTitle")?.value || "").trim();
  if (isPrivate && (!privateTitle || !privateStartTime || !privateEndTime)) {
    await appAlert("Vul voor een privé-afspraak minstens Tijd van, Tijd tot en een titel in.", { title: "Privé-afspraak", variant: "warning" });
    return;
  }
  if (isPrivate && privateEndDate < document.getElementById("appointmentDate").value) {
    await appAlert("Datum tot mag niet vroeger zijn dan Datum van.", { title: "Privé-afspraak", variant: "warning" });
    return;
  }
  if (isPrivate && privateEndDate === document.getElementById("appointmentDate").value && minutesFromTimeString(privateEndTime) < minutesFromTimeString(privateStartTime)) {
    await appAlert("Tijd tot mag niet vroeger zijn dan Tijd van.", { title: "Privé-afspraak", variant: "warning" });
    return;
  }

  const existingStoredApp = id ? data.appointments.find(a => String(a.id) === String(id)) : null;
  const existingRecurrenceGroupId = getAppointmentRecurrenceGroupId(existingStoredApp);
  const existingRecurrenceRule = existingStoredApp?.recurrenceRule || "none";

  const localPayload = {
    customerId: isPrivate ? null : Number(selectedCustomerId),
    date: document.getElementById("appointmentDate").value,
    time: document.getElementById("appointmentTime").value,
    serviceId: isPrivate ? null : Number(selectedServiceId),
    duration: isPrivate ? calculatePrivateDuration(privateStartTime, privateEndTime) : Number(document.getElementById("appointmentDuration").value),
    price: isPrivate ? 0 : parseDecimalInput(document.getElementById("appointmentPrice").value),
    status: isPrivate ? "gepland" : (id ? document.getElementById("appointmentStatus").value : "gepland"),
    remarks: isPrivate ? "" : String(document.getElementById("appointmentRemarks")?.value || "").trim(),
    isPrivate,
    privateTitle: isPrivate ? privateTitle : "",
    privateDetails: isPrivate ? String(document.getElementById("appointmentPrivateDetails")?.value || "").trim() : "",
    privateEndTime: isPrivate ? privateEndTime : "",
    privateEndDate: isPrivate ? privateEndDate : "",
    recurrenceRule: isPrivate ? (document.getElementById("appointmentPrivateRepeat")?.value || existingRecurrenceRule || "none") : "none",
    recurrenceGroupId: existingRecurrenceGroupId || null
  };

  if (isAppointmentInPast(localPayload)) {
    const confirmedPast = await appConfirm(buildPastAppointmentMessage(localPayload), {
      title: "Afspraak in het verleden",
      confirmText: t("save"),
      cancelText: t("cancel"),
      variant: "warning"
    });
    if (!confirmedPast) return;
  }

  let recurrenceEditScope = "single";
  if (id && isRecurringAppointment(existingStoredApp)) {
    recurrenceEditScope = await chooseRecurringAppointmentScope("update");
    if (!recurrenceEditScope) return;
  }

  const recurringAffectedAppointments = id && isRecurringAppointment(existingStoredApp)
    ? getRecurringAffectedAppointments(data, existingStoredApp, recurrenceEditScope)
    : [];

  const recurrenceOccurrences = (isPrivate && !id)
    ? buildPrivateRecurrenceOccurrences(localPayload, localPayload.recurrenceRule)
    : (recurringAffectedAppointments.length
        ? recurringAffectedAppointments.map(appointment => applyRecurringEditToAppointment(appointment, localPayload, existingStoredApp, recurrenceEditScope))
        : [localPayload]);

  if (settings.overlapWarningsEnabled) {
    const foundOverlap = findFirstOverlapForAppointments(recurrenceOccurrences, data.appointments, settings.defaultBreakMinutes, id);
    if (foundOverlap) {
      const confirmed = await appConfirm(buildOverlapMessage(foundOverlap.payload, foundOverlap.overlap, data.appointments, settings.defaultBreakMinutes, id), {
        title: "Overlap gedetecteerd",
        confirmText: t("save"),
        cancelText: t("cancel"),
        variant: "warning"
      });
      if (!confirmed) return;
    }
  }

  if (!user) {
    if (id) {
      if (recurringAffectedAppointments.length) {
        recurringAffectedAppointments.forEach(appointment => {
          const index = data.appointments.findIndex(a => String(a.id) === String(appointment.id));
          if (index >= 0) {
            data.appointments[index] = applyRecurringEditToAppointment(data.appointments[index], localPayload, existingStoredApp, recurrenceEditScope);
          }
        });
      } else {
        const existingApp = data.appointments.find(a => Number(a.id) === id);
        if (existingApp) Object.assign(existingApp, { ...localPayload, currency: existingApp.currency || getCurrentCurrency() });
      }
    } else {
      let nextLocalId = nextId(data.appointments);
      recurrenceOccurrences.forEach(item => {
        data.appointments.push({
          id: nextLocalId++,
          ...item,
          paid: false,
          paymentMethodName: null,
          currency: getCurrentCurrency()
        });
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

  const existingApp = existingStoredApp;
  const isPaid = existingApp ? Boolean(existingApp.paid) : false;
  const existingPaymentMethodName = paymentMethodNameForAppointment(existingApp, data) || null;
  const appointmentCurrency = normalizeCurrency(existingApp?.currency || getCurrentCurrency());

  const payload = {
    user_id: user.id,
    customer_id: localPayload.customerId,
    appointment_date: localPayload.date,
    appointment_time: localPayload.time,
    service_id: localPayload.serviceId,
    duration: localPayload.duration,
    price: localPayload.price,
    status: localPayload.status,
    paid: localPayload.isPrivate ? false : isPaid,
    payment_method_label: localPayload.isPrivate ? null : (isPaid ? existingPaymentMethodName : null),
    currency: appointmentCurrency,
    appointment_remarks: localPayload.isPrivate ? withPrivateEndDateMeta(localPayload.remarks, localPayload.privateEndDate || localPayload.date) : localPayload.remarks,
    is_private: localPayload.isPrivate,
    private_title: localPayload.privateTitle || null,
    private_details: localPayload.privateDetails || null,
    private_end_time: localPayload.privateEndTime || null,
    recurrence_group_id: localPayload.recurrenceGroupId || null,
    recurrence_rule: localPayload.recurrenceRule || "none"
  };

  let error;

  if (id) {
    if (recurringAffectedAppointments.length) {
      for (const item of recurrenceOccurrences) {
        const rowPayload = {
          ...payload,
          appointment_date: item.date,
          appointment_time: item.time,
          duration: item.duration,
          price: item.price,
          status: item.status,
          appointment_remarks: item.isPrivate ? withPrivateEndDateMeta(item.remarks, item.privateEndDate || item.date) : item.remarks,
          is_private: item.isPrivate,
          private_title: item.privateTitle || null,
          private_details: item.privateDetails || null,
          private_end_time: item.privateEndTime || null,
          recurrence_group_id: item.recurrenceGroupId || null,
          recurrence_rule: item.recurrenceRule || "none"
        };
        const result = await supabaseClient
          .from("appointments")
          .update(rowPayload)
          .eq("id", Number(item.id))
          .eq("user_id", user.id);
        if (result.error) {
          error = result.error;
          break;
        }
      }
    } else {
      ({ error } = await supabaseClient
        .from("appointments")
        .update(payload)
        .eq("id", Number(id))
        .eq("user_id", user.id));
    }
  } else {
    const rows = (isPrivate && recurrenceOccurrences.length > 1)
      ? recurrenceOccurrences.map(item => ({
          ...payload,
          appointment_date: item.date,
          recurrence_group_id: item.recurrenceGroupId || null,
          recurrence_rule: item.recurrenceRule || "none"
        }))
      : payload;

    const insertResult = await supabaseClient
      .from("appointments")
      .insert(rows);

    error = insertResult.error;
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

  const data = getData();
  const existingApp = data.appointments.find(a => String(a.id) === String(id));
  const recurring = isRecurringAppointment(existingApp);
  let deleteScope = "single";

  if (recurring) {
    deleteScope = await chooseRecurringAppointmentScope("delete");
    if (!deleteScope) return;
  } else {
    const confirmed = await appConfirm("Deze afspraak wordt definitief verwijderd.", {
      title: "Afspraak verwijderen",
      confirmText: t("delete"),
      cancelText: t("cancel"),
      variant: "danger"
    });
    if (!confirmed) return;
  }

  // Sluit eerst het afspraakvenster. Een <dialog> staat in de browser top-layer
  // en kan daardoor de globale busy-overlay visueel afdekken, ook met hoge z-index.
  // Vooral bij privé-afspraken werd "Even geduld" daardoor niet zichtbaar.
  closeDialog("appointmentDialog");
  await waitForBusyOverlayPaint();

  const errorMessage = await runWithGlobalActionBusy(async () => {
    setGlobalActionBusyVisible(true);
    await waitForBusyOverlayPaint();
    const deleteBusyStartedAt = Date.now();
    const freshData = getData();
    const freshExistingApp = freshData.appointments.find(a => String(a.id) === String(id)) || existingApp;
    const affectedAppointments = recurring
      ? getRecurringAffectedAppointments(freshData, freshExistingApp, deleteScope)
      : [freshExistingApp].filter(Boolean);

    const user = await getCurrentUser();

    if (!user) {
      const affectedIdSet = new Set(affectedAppointments.map(appointment => String(appointment.id)));
      freshData.appointments = freshData.appointments.filter(a => !affectedIdSet.has(String(a.id)));
      saveData(freshData);
      rerenderAll();
      await keepBusyOverlayVisibleSince(deleteBusyStartedAt, 750);
      return "";
    }

    let query = supabaseClient
      .from("appointments")
      .delete()
      .eq("user_id", user.id);

    if (recurring && deleteScope === "series") {
      query = query.eq("recurrence_group_id", getAppointmentRecurrenceGroupId(freshExistingApp));
    } else if (recurring && deleteScope === "following") {
      query = query
        .eq("recurrence_group_id", getAppointmentRecurrenceGroupId(freshExistingApp))
        .gte("appointment_date", freshExistingApp.date);
    } else {
      query = query.eq("id", Number(id));
    }

    const { error } = await query;

    if (error) {
      return "Verwijderen afspraak mislukt: " + error.message;
    }

    await loadAllDataFromSupabase();
    rerenderAll();
    await keepBusyOverlayVisibleSince(deleteBusyStartedAt, 750);
    return "";
  });

  if (errorMessage) {
    await appAlert(errorMessage, { title: "Verwijderen mislukt", variant: "danger" });
  }
}

async function deleteCurrentService() {
  const id = document.getElementById("serviceId").value;
  if (!id) return;

  const confirmed = await appConfirm("Deze dienst wordt op inactief gezet en verdwijnt uit de dienstenlijst en nieuwe afspraken. Bestaande afspraken blijven behouden.", {
    title: "Dienst inactief zetten",
    confirmText: "Inactief zetten",
    cancelText: t("cancel"),
    variant: "danger"
  });

  if (!confirmed) return;

  const user = await getCurrentUser();

  if (!user) {
    const data = getData();
    const service = serviceById(data, id);
    if (service) service.isActive = false;
    saveData(data);
    closeDialog("serviceDialog");
    rerenderAll();
    return;
  }

  const { error } = await supabaseClient
    .from("services")
    .update({ is_active: false })
    .eq("id", Number(id))
    .eq("user_id", user.id);

  if (error) {
    await appAlert("Dienst inactief zetten mislukt: " + error.message, { title: "Aanpassen mislukt", variant: "danger" });
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
    if ((appointment.status || "").toLowerCase() === "no-show") appointment.status = "gepland";

    saveData(data);
    closePaymentPopover();
    rerenderAll();
    return;
  }

  const { error } = await supabaseClient
    .from("appointments")
    .update({
      paid: false,
      payment_method_label: null,
      status: "gepland"
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

async function markNoShow() {
  const id = document.getElementById("paymentAppointmentId").value;
  const user = await getCurrentUser();

  if (!user) {
    const data = getData();
    const appointment = data.appointments.find(a => String(a.id) === String(id));
    if (!appointment) return;

    appointment.status = "no-show";
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
      status: "no-show",
      paid: false,
      payment_method_label: null
    })
    .eq("id", Number(id))
    .eq("user_id", user.id);

  if (error) {
    await appAlert("No show opslaan mislukt: " + error.message, { title: "Opslaan mislukt", variant: "danger" });
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
  monthSelect.innerHTML = monthNames.map((m, i) => `<option value="${i}">${getMonthNameUpper(i)}</option>`).join("");
  monthSelect.value = String(state.currentMonth);
  document.getElementById("yearSelect").value = state.currentYear;

  closeAllAppSelectDropdowns();
  refreshAppSelect(monthSelect);

  document.getElementById("monthPickerDialog").showModal();

  window.requestAnimationFrame(() => refreshAppSelect(monthSelect));
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
  updateStaticI18n();
  renderAlphabetFilter();
  renderCalendar();
  renderAgendaList();
  renderClients();
  renderServices();
  renderPaymentMethods();
  renderStatistics();
  renderRevenue();
  renderCosts();
  renderTodos();

  if (state.selectedClientId && state.currentScreen === "clientDetailScreen") {
    openClientDetail(state.selectedClientId);
  }

  syncNotificationState();
  applyNavStyleActionButtons();
}


function getActionButtonIconSvg(type) {
  const icons = {
    save: `<svg class="app-action-nav-icon" viewBox="0 0 7.4083331 7.4083333" aria-hidden="true" focusable="false"><path d="m 1.2487599,6.3350499 -0.09755,-0.067983 V 3.7370896 c 0,-1.9103368 0.012742,-2.5426364 0.052027,-2.58166 0.035778,-0.035538 0.252426,-0.051681 0.6936895,-0.051681 H 2.5385889 V 1.9651164 2.8264842 H 3.7742229 5.009857 V 1.9651173 1.1037498 H 5.3902354 5.7706138 L 6.1067451,1.4396243 6.4428764,1.7754988 6.4308947,4.021599 c -0.00945,1.7724982 -0.023861,2.2579 -0.068322,2.3020623 -0.044619,0.04432 -0.572285,0.058401 -2.5363015,0.067672 C 1.624705,6.4017253 1.3353593,6.3954233 1.24876,6.3350563 Z M 5.2892092,5.8747533 c 0.055268,-0.078383 0.067492,-0.2421888 0.067492,-0.9044356 0,-0.7512913 -0.00616,-0.8148317 -0.086711,-0.8948522 -0.083105,-0.082552 -0.1445187,-0.086135 -1.4769401,-0.086135 -0.8754091,0 -1.4212835,0.016507 -1.4740897,0.044588 -0.078777,0.041885 -0.083861,0.098794 -0.083861,0.9388902 0,0.6381478 0.014902,0.9091103 0.052027,0.9459891 0.038378,0.038125 0.4301191,0.05168 1.4933091,0.05168 1.4402317,0 1.4413315,-6.93e-5 1.508774,-0.09572 z M 4.0993893,1.9651155 V 1.2760213 H 4.4245562 4.7497231 V 1.9651155 2.65421 H 4.4245562 4.0993893 Z" /></svg>`,
    cancel: `<svg class="app-action-nav-icon" viewBox="0 0 7.4083331 7.4083333" aria-hidden="true" focusable="false"><path d="M 3.7216875,1.0757028 A 2.6458266,2.6458266 0 0 0 1.0758545,3.721536 2.6458266,2.6458266 0 0 0 3.7216875,6.3673694 2.6458266,2.6458266 0 0 0 6.3675215,3.721536 2.6458266,2.6458266 0 0 0 3.7216875,1.0757028 Z m -0.82292,1.3657978 c 0.05451,0 0.138465,0.070411 0.447301,0.375477 l 0.380029,0.3754771 0.378179,-0.3754771 c 0.292326,-0.2902706 0.392113,-0.375477 0.439905,-0.375477 0.04347,0 0.107409,0.044353 0.215615,0.1494797 0.208329,0.2023863 0.245294,0.2617301 0.207508,0.3332359 -0.01611,0.030483 -0.188746,0.217296 -0.383726,0.4151581 l -0.35457,0.3598322 0.335512,0.333947 c 0.184481,0.1836653 0.357479,0.3692108 0.384437,0.4123137 0.04674,0.074724 0.04701,0.081153 0.0081,0.1405195 -0.08631,0.1317284 -0.351617,0.3670857 -0.413878,0.3670857 -0.0465,0 -0.150027,-0.088488 -0.439621,-0.376046 L 3.7248165,4.2009804 3.4082215,4.5137358 C 3.2340805,4.6857555 3.0594205,4.8549521 3.0200865,4.8897817 2.9045905,4.9920513 2.8540445,4.9753377 2.6447515,4.766045 2.5193755,4.6406693 2.4577245,4.5608493 2.4577245,4.5238338 c 0,-0.039229 0.110334,-0.1669151 0.381308,-0.4410433 L 3.2204835,3.6969309 2.8390325,3.3116402 c -0.271639,-0.2745061 -0.381308,-0.401336 -0.381308,-0.4407588 0,-0.085362 0.353348,-0.4293808 0.441043,-0.4293808 z" /></svg>`,
    delete: `<svg class="app-action-nav-icon" viewBox="0 0 7.4083331 7.4083333" aria-hidden="true" focusable="false"><path d="m 2.2698341,6.1775822 c -0.1094284,-0.04971 -0.231493,-0.164087 -0.290851,-0.272533 -0.037167,-0.0679 -0.041899,-0.221644 -0.052699,-1.711931 L 1.9144211,2.5557908 1.7067886,2.5489308 1.4991566,2.5420708 V 2.3545326 2.1669857 l 0.1008498,-0.0073 0.1008498,-0.0073 0.013669,-0.1423763 c 0.01596,-0.1662368 0.034542,-0.2158412 0.089015,-0.2376519 0.02183,-0.00874 0.2399086,-0.021819 0.4846179,-0.029062 L 2.7330836,1.7301305 V 1.6192114 c 0,-0.3484396 0.3062313,-0.68698353 0.5910897,-0.68179893 0.077671,0.00141 0.1969862,-0.00708 0.4182785,-0.00708 h 0.4780034 c 0.3249416,0.00541 0.5533562,0.39764923 0.5533562,0.71128873 v 0.095511 l 0.3025494,0.00123 c 0.3906803,0.00158 0.6135415,0.026715 0.6614465,0.07462 0.023407,0.023407 0.042463,0.097122 0.050279,0.1944918 l 0.012586,0.1567987 h 0.091669 0.091669 V 2.3541076 2.543943 H 5.7823104 5.5806105 l -5.209e-4,1.6076662 c -5.104e-4,1.566046 -0.00177,1.61043 -0.048858,1.714448 -0.062582,0.138254 -0.1489784,0.227906 -0.2879761,0.29883 l -0.1119258,0.05711 -1.3830257,-5.24e-4 c -1.288121,-4.9e-4 -1.3895764,-0.0035 -1.4784713,-0.04388 z m 2.8347098,-0.400527 0.070458,-0.06526 0.00704,-1.578004 0.00704,-1.5780044 -1.4415606,-0.00612 -1.4415606,-0.00612 v 1.5800134 1.580014 l 0.069363,0.06936 0.069363,0.06936 H 3.7393895 5.0340922 Z M 2.7330841,4.1931182 V 2.9710547 h 0.2016996 0.2017 v 1.2220635 1.222064 h -0.2017 -0.2016996 z m 0.8067992,0 V 2.9710547 h 0.2017 0.2016996 v 1.2220635 1.222064 h -0.2016996 -0.2017 z m 0.8305286,0 V 2.9710547 H 4.560247 4.7500825 v 1.2220635 1.222064 H 4.560247 4.3704119 Z M 4.3466819,1.6275524 C 4.3525019,1.4948826 4.3066309,1.3905375 4.2264459,1.3628251 4.1044771,1.3096741 4.063522,1.3135821 3.7620234,1.3163031 3.4605248,1.3190231 3.3539331,1.3387671 3.2833638,1.3817941 3.1976948,1.4340251 3.136483,1.5521229 3.136483,1.6651764 v 0.07195 h 0.6050997 0.6050992 z" /></svg>`,
    ok: `<svg class="app-action-nav-icon" viewBox="0 0 7.4083331 7.4083333" aria-hidden="true" focusable="false"><path d="M 3.0465827,6.023294 C 2.9739427,5.999434 2.8963597,5.944464 2.8604957,5.891429 2.8433557,5.866079 2.7829257,5.76905 2.7262217,5.675813 2.5980057,5.465003 2.4549037,5.256914 2.2820347,5.029908 2.1539417,4.861701 2.1487597,4.852462 2.1487597,4.79231 c 0,-0.05732 0.0045,-0.06692 0.05384,-0.114171 0.117778,-0.112851 0.307085,-0.123696 0.448503,-0.02569 0.05211,0.03611 0.173259,0.200332 0.382098,0.517943 0.07379,0.112229 0.136067,0.204053 0.138384,0.204053 0.0023,0 0.03545,-0.05509 0.07362,-0.122432 0.294617,-0.519657 0.753512,-1.139717 1.196512,-1.616729 0.138195,-0.148805 0.507732,-0.517006 0.587531,-0.585406 0.09414,-0.0807 0.208563,-0.03957 0.208563,0.07497 0,0.0405 -0.0123,0.06068 -0.08951,0.146846 -0.646693,0.721674 -1.206898,1.591625 -1.599732,2.48425 -0.05664,0.128705 -0.126804,0.209421 -0.216681,0.249269 -0.07283,0.03229 -0.214666,0.04128 -0.285304,0.01808 z" /></svg>`,
    register: `<svg class="app-action-nav-icon" viewBox="0 0 7.4083331 7.4083333" aria-hidden="true" focusable="false"><path id="path1" style="fill:#000000;stroke-width:0.999995" d="M 6.540686 1.1265462 C 6.5207502 1.1259342 6.4989928 1.1281559 6.4729899 1.1322306 C 6.3772463 1.1472499 6.3497802 1.1686728 6.2456136 1.3079305 L 6.1639648 1.4169678 L 6.4921102 1.6582967 L 6.8202555 1.9001424 L 6.9039714 1.786971 C 7.0046224 1.6508614 7.0205585 1.6103329 7.0068075 1.5218709 C 6.9907771 1.4187716 6.9623561 1.3853884 6.7696126 1.245402 C 6.6474355 1.1566718 6.6004936 1.1283823 6.540686 1.1265462 z M 6.0988525 1.5048177 L 5.1795288 2.7528035 C 4.6737295 3.4391482 4.2539592 4.0131979 4.2467692 4.0281779 C 4.2334909 4.0558302 4.0991703 4.4764461 4.0255941 4.7687012 C 3.9847 4.7299384 3.9355355 4.6928504 3.8829671 4.6648315 C 3.7510954 4.5945355 3.5467462 4.5673529 3.3837728 4.5981689 C 3.2055152 4.6318736 3.0572014 4.6974253 2.7863932 4.8627523 C 2.6028527 4.9748009 2.545036 4.9979558 2.490804 4.9800578 C 2.448657 4.9661488 2.4365438 4.9456167 2.4365438 4.8880737 C 2.4365438 4.7517822 2.3524866 4.6644998 2.2127848 4.6555298 C 2.1189412 4.6495073 2.0419341 4.6728654 1.8774048 4.7573324 C 1.7856367 4.8044519 1.7535755 4.8170539 1.7575155 4.8043579 C 1.7604575 4.7948124 1.7694893 4.7468955 1.7776693 4.6979045 C 1.8403308 4.3222779 1.818114 3.9298591 1.723409 3.7362061 C 1.6845351 3.6567162 1.5954465 3.5730611 1.5249715 3.5496541 C 1.4241082 3.5161533 1.2935972 3.5348565 1.1854574 3.59823 C 1.0558029 3.6742126 0.86767815 3.8574764 0.77101237 4.0018229 C 0.58903797 4.2735582 0.49269029 4.614555 0.51004639 4.9237305 C 0.52303559 5.1550861 0.54938069 5.2177694 0.63458659 5.2177694 C 0.71761246 5.2177694 0.75323227 5.1632646 0.73483887 5.0637736 C 0.68023278 4.7683827 0.74891291 4.4324187 0.91932373 4.1609863 C 1.0647234 3.9293918 1.2846915 3.742924 1.4128337 3.742924 C 1.4555521 3.742924 1.4636897 3.7471843 1.5001668 3.7852987 C 1.5643263 3.852333 1.5904826 3.959306 1.6014526 4.203361 C 1.6115892 4.4289165 1.581476 4.6753556 1.515153 4.9123617 L 1.4856974 5.0177816 L 1.3890625 5.11545 C 1.284441 5.221176 1.1482805 5.395798 1.1017415 5.483903 C 1.0318675 5.6161831 1.019508 5.7334123 1.065568 5.8275513 C 1.080468 5.8580023 1.103242 5.8870774 1.118278 5.8952474 C 1.1786704 5.9280435 1.2211164 5.9106834 1.2872599 5.8265177 C 1.4113785 5.6685804 1.5327619 5.4591578 1.6143717 5.2616943 L 1.6619141 5.1464559 L 1.7399455 5.0885783 C 1.8923139 4.9751134 2.1051774 4.8677189 2.1791951 4.8668864 L 2.2236369 4.8663696 L 2.2303548 4.9330322 C 2.2430026 5.0608284 2.3070799 5.1421803 2.4246582 5.1784953 C 2.5011574 5.2021194 2.538608 5.2025317 2.6174113 5.1821126 C 2.6923686 5.1626893 2.7448313 5.1362095 2.8959473 5.0415527 C 3.1956042 4.8538521 3.4007604 4.7803198 3.5811768 4.7955729 C 3.7280662 4.8079895 3.8497488 4.8688587 3.9212077 4.9655884 C 3.9436157 4.9959214 3.973851 5.0251807 3.988387 5.0307007 C 4.0118873 5.0396356 4.0366277 5.038455 4.058667 5.0301839 C 4.0823353 5.0308561 4.1082484 5.023071 4.131014 5.0074463 C 4.3503697 4.8568971 4.8450496 4.5443453 4.8725708 4.5242716 C 4.8901365 4.5114593 5.2503917 4.0297198 5.828068 3.2463135 L 6.7551432 1.9890259 L 6.4269979 1.7471802 L 6.0988525 1.5048177 z M 4.4855143 4.0876058 L 4.5010173 4.2152466 L 4.5165202 4.3423706 L 4.6446777 4.3175659 L 4.7733521 4.2927612 L 4.7764526 4.345988 C 4.7781026 4.375449 4.7822144 4.4189319 4.7857544 4.4426229 L 4.7924723 4.4860311 L 4.5304728 4.6565633 C 4.3864769 4.750369 4.263131 4.8296099 4.256071 4.8327799 C 4.246158 4.8372299 4.2424213 4.8340635 4.2400513 4.8183105 C 4.2330329 4.7718075 4.1832581 4.7361197 4.1351481 4.7433797 C 4.1265881 4.7446748 4.1193141 4.7446097 4.1191284 4.7433797 C 4.1189454 4.7421659 4.1588641 4.601959 4.2074951 4.4312541 L 4.2958618 4.1206787 L 4.3909465 4.1041423 L 4.4855143 4.0876058 z " /></svg>`,
    edit: `<svg class="app-action-nav-icon" viewBox="0 0 7.4083331 7.4083333" aria-hidden="true" focusable="false"><path style="fill:#000000;stroke-width:0.999997" d="M 0.85745286,4.071847 V 1.4504062 H 2.1945137 c 1.1852598,0 1.3414524,0.00187 1.3757367,0.016158 0.1821091,0.076071 0.1821091,0.3389267 0,0.4149979 -0.034144,0.014263 -0.1685224,0.016158 -1.1468806,0.016158 H 1.3151649 V 4.071851 6.2459823 h 2.1689307 2.168927 l 4.01e-5,-1.0948674 c 4e-5,-0.7592936 0.00334,-1.1076208 0.011408,-1.1364781 0.031955,-0.1169908 0.1497368,-0.1877603 0.2683253,-0.1612213 0.074458,0.016665 0.1476153,0.08657 0.1656811,0.158314 0.00901,0.035891 0.012208,0.3913215 0.012208,1.3650459 V 6.6932919 H 3.4840622 0.8574195 Z M 1.9877636,5.5692403 c -0.015204,-0.011962 -0.027639,-0.032029 -0.027639,-0.044604 0,-0.025965 0.5483906,-1.2375886 0.5834909,-1.2891762 C 2.5561845,4.2169871 3.2293223,3.538324 4.0394791,2.7273167 L 5.5124923,1.2527564 5.9000532,1.6402179 6.2876208,2.0276795 4.8026394,3.513364 C 3.8774492,4.4389925 3.3019711,5.0072229 3.2760466,5.0207316 3.2239172,5.047897 2.0594218,5.5770097 2.0340363,5.5850673 c -0.010727,0.0034 -0.030354,-0.00334 -0.046272,-0.015831 z m 0.8071627,-0.4414675 0.382294,-0.1742256 7.88e-5,-0.058554 c 3.93e-5,-0.032209 0.00314,-0.090873 0.00685,-0.1303713 l 0.00678,-0.071815 -0.1758955,0.00734 -0.1758968,0.00734 0.0052,-0.1724897 0.0052,-0.1724892 -0.1296535,0.00294 -0.1296536,0.00294 -0.1798221,0.3948973 c -0.098902,0.2171933 -0.1798222,0.396247 -0.1798222,0.3978975 0,0.00167 0.00951,0.003 0.021141,0.003 0.065418,0 0.1244966,0.057093 0.1244966,0.1203258 0,0.021421 0.00414,0.026578 0.018206,0.022649 0.010014,-0.0028 0.1902367,-0.08349 0.4004979,-0.1793145 z M 6.0043185,1.535671 5.6166175,1.1483322 5.7466806,1.0199769 C 5.9131089,0.85573486 5.9544308,0.83275836 6.0847341,0.83199986 6.2262851,0.83119926 6.263224,0.85207366 6.4560638,1.0420535 6.684228,1.2668341 6.7154429,1.3166471 6.71607,1.4569327 6.7166037,1.5773005 6.6875837,1.6281002 6.5264658,1.7888632 L 6.3920196,1.9230105 Z" /></svg>`
  };
  return icons[type] || "";
}

function applyNavStyleActionButtons(root = document) {
  const actionMap = [
    { type: "save", key: "save", match: /^(instellingen\s+)?opslaan$|^save settings$|^save$|^enregistrer( les paramètres)?$/i },
    { type: "cancel", key: "cancel", match: /^annuleren$|^cancel$|^annuler$/i },
    { type: "delete", key: "delete", match: /^verwijderen$|^delete$|^supprimer$/i },
    { type: "ok", key: "ok", match: /^(ok)$/i },
    { type: "ok", key: "chooseConfirm", match: /^kies$|^choose$|^choisir$/i },
    { type: "register", key: "register", match: /^registreren$|^register$|^s’inscrire$|^s'inscrire$/i }
  ];

  root.querySelectorAll("button").forEach(button => {
    if (button.classList.contains("nav-btn") || button.classList.contains("icon-btn") || button.classList.contains("fab")) return;

    let action = null;
    if (button.dataset.actionType) {
      action = actionMap.find(item => item.type === button.dataset.actionType);
    }

    if (!action) {
      const plainText = (button.dataset.actionLabel || button.textContent || "").replace(/\s+/g, " ").trim();
      action = actionMap.find(item => item.match.test(plainText));
    }

    if (!action) return;

    const explicitLabel = String(button.dataset.actionLabel || "").trim();
    const label = explicitLabel || t(action.key);
    button.dataset.actionLabel = label;
    button.dataset.actionType = action.type;
    button.dataset.actionKey = action.key;
    button.setAttribute("aria-label", label);
    button.title = label;
    button.classList.add("app-action-nav-btn");
    button.innerHTML = `
      <span class="app-action-nav-ico" aria-hidden="true">${getActionButtonIconSvg(action.type)}</span>
      <span class="app-action-nav-label">${label}</span>
    `;
  });
}



/* =========================
   KOSTEN
========================= */
function getCosts(data = getData()) {
  return Array.isArray(data.costs) ? data.costs : [];
}

function getStandardCosts(data = getData()) {
  return Array.isArray(data.standardCosts) ? data.standardCosts : [];
}

function costById(data, id) {
  return getCosts(data).find(cost => String(cost.id) === String(id));
}

function getCostsPeriodType() {
  return state.costsPeriodType || "month";
}

function getCostsPeriodDate() {
  return state.costsPeriodDate || state.selectedDate || todayStr;
}

function setCostsPeriod(type, dateStr) {
  state.costsPeriodType = type || getCostsPeriodType();
  state.costsPeriodDate = dateStr || getCostsPeriodDate();
  renderCosts();
}

function getFilteredCosts(data = getData()) {
  const type = getCostsPeriodType();
  const anchor = getCostsPeriodDate();
  let costs = getCosts(data);

  if (type === "day") {
    costs = costs.filter(cost => cost.date === anchor);
  } else if (type === "week") {
    const bounds = weekBounds(anchor);
    costs = costs.filter(cost => cost.date >= bounds.start && cost.date <= bounds.end);
  } else if (type === "month") {
    const prefix = anchor.slice(0, 7);
    costs = costs.filter(cost => String(cost.date || "").startsWith(prefix));
  } else if (type === "year") {
    const prefix = anchor.slice(0, 4);
    costs = costs.filter(cost => String(cost.date || "").startsWith(prefix));
  }

  return costs;
}

function syncCostsPeriodChips() {
  const type = getCostsPeriodType();
  const anchor = getCostsPeriodDate();
  const anchorDate = new Date(anchor + "T00:00:00");

  const yearBtn = document.getElementById("costsYearBtn");
  const monthBtn = document.getElementById("costsMonthBtn");
  const weekBtn = document.getElementById("costsWeekBtn");
  const dayBtn = document.getElementById("costsDayBtn");

  const yearLabel = document.getElementById("costsYearLabel");
  const monthLabel = document.getElementById("costsMonthLabel");
  const weekLabel = document.getElementById("costsWeekLabel");
  const dayLabel = document.getElementById("costsDayLabel");

  if (yearLabel) yearLabel.textContent = String(anchorDate.getFullYear());
  if (monthLabel) monthLabel.innerHTML = formatRevenueMonthTile(anchor);
  if (weekLabel) weekLabel.innerHTML = formatRevenueWeekTile(anchor);
  if (dayLabel) dayLabel.innerHTML = formatRevenueDayTile(anchor);

  if (yearBtn) yearBtn.classList.toggle("active", type === "year");
  if (monthBtn) monthBtn.classList.toggle("active", type === "month");
  if (weekBtn) weekBtn.classList.toggle("active", type === "week");
  if (dayBtn) dayBtn.classList.toggle("active", type === "day");
}

function openCostsWheelPicker(mode = "day") {
  openRevenueWheelPicker(mode, "costs");
}

function openCostsDatePicker(mode = "day") {
  openCostsWheelPicker(mode);
}

function standardCostExists(data, description) {
  const key = String(description || "").trim().toLocaleLowerCase();
  return getStandardCosts(data).find(item => String(item.description || "").trim().toLocaleLowerCase() === key) || null;
}

function buildVatOptions(selected = 21) {
  return [0, 6, 12, 19, 21].map(rate => `<option value="${rate}"${Number(selected) === rate ? " selected" : ""}>${rate}%</option>`).join("");
}

function renderCostStandardSuggestions(filter = "", showAllWhenEmpty = true) {
  const wrap = document.getElementById("costStandardSuggestions");
  const searchInput = document.getElementById("costDescription");
  const select = document.getElementById("costStandardCostSelect");
  if (!wrap) return;

  const data = getData();
  const safeFilter = String(filter || "").trim().toLocaleLowerCase();
  const currentValue = document.getElementById("costStandardCostId")?.value || "";

  let items = getStandardCosts(data)
    .slice()
    .sort((a, b) => String(a.description || "").localeCompare(String(b.description || ""), "nl-BE"));

  if (safeFilter) {
    items = items.filter(item => String(item.description || "").toLocaleLowerCase().includes(safeFilter));
  } else if (!showAllWhenEmpty) {
    items = [];
  }

  items = items.slice(0, 30);

  if (select) {
    select.innerHTML = `<option value="">${t("chooseStandardCost")}</option>` + getStandardCosts(data)
      .slice()
      .sort((a, b) => String(a.description || "").localeCompare(String(b.description || ""), "nl-BE"))
      .map(item => `<option value="${item.id}">${escapeHtml(item.description || "")}</option>`)
      .join("");
    select.value = currentValue && Array.from(select.options).some(option => String(option.value) === String(currentValue)) ? String(currentValue) : "";
    refreshAppSelect(select);
  }

  if (!items.length) {
    wrap.innerHTML = safeFilter ? `<div class="appointment-service-empty">${t("noStandardCosts")}</div>` : "";
    wrap.classList.toggle("hidden", !safeFilter);
    if (searchInput) searchInput.setAttribute("aria-expanded", safeFilter ? "true" : "false");
    return;
  }

  wrap.innerHTML = items.map(item => {
    const activeClass = String(item.id) === String(currentValue) ? " active" : "";
    return `
      <button class="appointment-service-result cost-standard-suggestion${activeClass}" type="button" role="option" data-standard-cost-id="${item.id}" aria-selected="${activeClass ? "true" : "false"}">
        <span class="appointment-service-result-name">${escapeHtml(item.description || "")}</span>
        <span class="appointment-service-result-meta">${Number(item.vatRate || 21)}% btw</span>
      </button>
    `;
  }).join("");

  wrap.classList.remove("hidden");
  if (searchInput) searchInput.setAttribute("aria-expanded", "true");

  wrap.querySelectorAll("[data-standard-cost-id]").forEach(btn => {
    btn.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      const item = getStandardCosts(getData()).find(standard => String(standard.id) === String(btn.dataset.standardCostId));
      if (!item) return;
      document.getElementById("costDescription").value = item.description || "";
      document.getElementById("costVatRate").innerHTML = buildVatOptions(item.vatRate || 21);
      document.getElementById("costStandardCostId").value = item.id || "";
      if (select) select.value = String(item.id || "");
      wrap.classList.add("hidden");
      document.getElementById("costDescription")?.setAttribute("aria-expanded", "false");
      document.getElementById("costDescription")?.blur();
      refreshAppSelect(document.getElementById("costVatRate"));
      refreshAppSelect(select);
    });
  });
}

function getCostsPeriodTitle() {
  const type = getCostsPeriodType();
  const anchor = getCostsPeriodDate();

  if (type === "day") return `${t("costs")} ${formatLongDate(anchor)}`;
  if (type === "week") {
    const bounds = weekBounds(anchor);
    return `${t("costs")} ${formatLongDate(bounds.start)} - ${formatLongDate(bounds.end)}`;
  }
  if (type === "month") {
    const d = new Date(anchor + "T00:00:00");
    return `${t("costs")} ${getMonthNameLong(d.getMonth())} ${d.getFullYear()}`;
  }
  if (type === "year") return `${t("costs")} ${anchor.slice(0, 4)}`;

  return t("costs");
}

function renderCosts() {
  const list = document.getElementById("costsList");
  const totalInclEl = document.getElementById("costsTotalInclAmount");
  const totalExclEl = document.getElementById("costsTotalExclAmount");
  const vatEl = document.getElementById("costsVatAmount");
  if (!list) return;

  const data = getData();
  syncCostsPeriodChips();

  const titleEl = document.getElementById("costsTitle");
  if (titleEl) titleEl.textContent = getCostsPeriodTitle();

  const costs = getFilteredCosts(data).slice().sort((a, b) => {
    const dateSort = String(b.date || "").localeCompare(String(a.date || ""));
    if (dateSort) return dateSort;
    return String(b.updatedAt || b.createdAt || b.id || "").localeCompare(String(a.updatedAt || a.createdAt || a.id || ""));
  });

  const totalIncl = costs.reduce((sum, cost) => sum + Number(cost.amountInclVat || 0), 0);
  const vatTotal = costs.reduce((sum, cost) => {
    const amount = Number(cost.amountInclVat || 0);
    const rate = Number(cost.vatRate || 0);
    return sum + (rate > 0 ? amount - (amount / (1 + (rate / 100))) : 0);
  }, 0);
  const totalExcl = totalIncl - vatTotal;

  if (totalInclEl) totalInclEl.textContent = euro(totalIncl);
  if (totalExclEl) totalExclEl.textContent = euro(totalExcl);
  if (vatEl) vatEl.textContent = euro(vatTotal);
  updateTopbar(state.currentScreen, getScreenTitle(state.currentScreen));
  refreshStandardCostsButton();

  if (!costs.length) {
    list.innerHTML = `<div class="empty-state">${t("noCosts")}</div>`;
    return;
  }

  list.innerHTML = costs.map(cost => `
    <article class="cost-card">
      <button class="cost-main-btn" type="button" data-cost-edit="${cost.id}">
        <div class="cost-row-top">
          <strong>${escapeHtml(cost.description || t("costDescription"))}</strong>
          <span>${euro(cost.amountInclVat)}</span>
        </div>
        <div class="cost-row-meta">
          <span>${formatLongDate(cost.date || todayStr)}</span>
          <span>${Number(cost.vatRate || 21)}% btw</span>
        </div>
      </button>
    </article>
  `).join("");

  list.querySelectorAll("[data-cost-edit]").forEach(btn => {
    btn.addEventListener("click", () => openEditCostDialog(btn.dataset.costEdit));
  });
}

function openNewCostDialog() {
  const form = document.getElementById("costForm");
  if (form) form.reset();
  document.getElementById("costId").value = "";
  document.getElementById("costStandardCostId").value = "";
  const standardCheckbox = document.getElementById("costSaveAsStandardCost");
  if (standardCheckbox) standardCheckbox.checked = false;
  document.getElementById("costDate").value = todayStr;
  document.getElementById("costVatRate").innerHTML = buildVatOptions(21);
  document.getElementById("costModalTitle").textContent = t("newCost");
  document.getElementById("deleteCostBtn")?.classList.add("hidden");
  renderCostStandardSuggestions("");
  document.getElementById("costDialog")?.showModal();
  refreshAppSelect(document.getElementById("costVatRate"));
}

function openEditCostDialog(id) {
  const data = getData();
  const cost = costById(data, id);
  if (!cost) return;
  document.getElementById("costId").value = cost.id;
  document.getElementById("costStandardCostId").value = cost.standardCostId || "";
  const standardCheckbox = document.getElementById("costSaveAsStandardCost");
  if (standardCheckbox) standardCheckbox.checked = Boolean(cost.standardCostId);
  document.getElementById("costDescription").value = cost.description || "";
  document.getElementById("costDate").value = cost.date || todayStr;
  document.getElementById("costAmountInclVat").value = Number(cost.amountInclVat || 0).toFixed(2);
  document.getElementById("costVatRate").innerHTML = buildVatOptions(cost.vatRate || 21);
  document.getElementById("costModalTitle").textContent = t("editCost");
  document.getElementById("deleteCostBtn")?.classList.remove("hidden");
  renderCostStandardSuggestions(cost.description || "");
  document.getElementById("costDialog")?.showModal();
  refreshAppSelect(document.getElementById("costVatRate"));
}

async function saveStandardCost(description, vatRate, existingId = null) {
  const user = await getCurrentUser();
  const data = getData();
  const cleanDescription = String(description || "").trim();
  if (!cleanDescription) return null;

  if (!user) {
    data.standardCosts = getStandardCosts(data);
    const existing = standardCostExists(data, cleanDescription);
    if (existing) return existing;
    const item = { id: nextId(data.standardCosts), description: cleanDescription, vatRate: Number(vatRate || 21), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    data.standardCosts.push(item);
    saveData(data);
    refreshStandardCostsButton();
    return item;
  }

  if (existingId) return { id: existingId, description: cleanDescription, vatRate: Number(vatRate || 21) };

  const { data: inserted, error } = await supabaseClient
    .from("standard_costs")
    .insert({ user_id: user.id, description: cleanDescription, vat_rate: Number(vatRate || 21) })
    .select("id, description, vat_rate")
    .maybeSingle();

  if (error) {
    console.error("Standaardkost opslaan mislukt:", error.message);
    return null;
  }

  await loadAllDataFromSupabase();
  return inserted ? { id: inserted.id, description: inserted.description, vatRate: inserted.vat_rate } : null;
}

async function saveCostFromForm(event) {
  event.preventDefault();
  const rawId = document.getElementById("costId")?.value;
  const id = rawId ? Number(rawId) || rawId : null;
  const description = String(document.getElementById("costDescription")?.value || "").trim();
  const date = document.getElementById("costDate")?.value || todayStr;
  const amountInclVat = parseDecimalInput(document.getElementById("costAmountInclVat")?.value);
  const vatRate = Number(document.getElementById("costVatRate")?.value || 21);
  let standardCostId = document.getElementById("costStandardCostId")?.value || null;
  const saveAsStandardCost = Boolean(document.getElementById("costSaveAsStandardCost")?.checked);
  const now = new Date().toISOString();

  if (!description) {
    await appAlert("Geef een omschrijving voor de kost in.", { title: t("costs"), variant: "warning" });
    return;
  }
  if (!date) {
    await appAlert("Kies een datum voor de kost.", { title: t("costs"), variant: "warning" });
    return;
  }
  if (!Number.isFinite(amountInclVat) || amountInclVat < 0) {
    await appAlert("Geef een geldig bedrag in.", { title: t("costs"), variant: "warning" });
    return;
  }

  let saveFailed = false;
  const costDialog = document.getElementById("costDialog");
  const reopenCostDialogOnFailure = Boolean(costDialog?.open);

  // Sluit de dialog vóór de databasebewerking. Een native <dialog> zit in de top layer
  // en kan de globale "Even geduld"-overlay visueel afdekken.
  closeDialog("costDialog");

  await runWithGlobalActionBusy(async () => {
    const user = await getCurrentUser();
    const data = getData();

    if (!id && saveAsStandardCost && !standardCostId) {
      const standard = await saveStandardCost(description, vatRate);
      if (standard?.id) standardCostId = standard.id;
    }

    const payload = { description, date, amountInclVat, vatRate, standardCostId, updatedAt: now };

    if (!user) {
      data.costs = getCosts(data);
      if (id) {
        const existing = costById(data, id);
        if (existing) Object.assign(existing, payload);
      } else {
        data.costs.push({ id: nextId(data.costs), ...payload, createdAt: now });
      }
      saveData(data);
      return;
    }

    const dbPayload = {
      user_id: user.id,
      description,
      cost_date: date,
      amount_incl_vat: amountInclVat,
      vat_rate: vatRate,
      standard_cost_id: standardCostId ? Number(standardCostId) || standardCostId : null,
      updated_at: now
    };

    let error;
    if (id) {
      ({ error } = await supabaseClient.from("costs").update(dbPayload).eq("id", id).eq("user_id", user.id));
    } else {
      ({ error } = await supabaseClient.from("costs").insert({ ...dbPayload, created_at: now }));
    }

    if (error) {
      saveFailed = true;
      await appAlert("Opslaan kost mislukt: " + error.message, { title: t("saveFailed"), variant: "danger" });
      return;
    }

    await loadAllDataFromSupabase();
  });

  if (saveFailed) {
    if (reopenCostDialogOnFailure) document.getElementById("costDialog")?.showModal();
    return;
  }

  renderCosts();
  refreshStandardCostsButton();
  updateCostsActionBar();
}

async function deleteCurrentCost() {
  const id = document.getElementById("costId")?.value;
  if (!id) return;
  const confirmed = await appConfirm("Deze kost verwijderen?", {
    title: t("delete"),
    confirmText: t("delete"),
    cancelText: t("cancel"),
    variant: "warning"
  });
  if (!confirmed) return;

  let deleteFailed = false;
  const costDialog = document.getElementById("costDialog");
  const reopenCostDialogOnFailure = Boolean(costDialog?.open);
  closeDialog("costDialog");

  await runWithGlobalActionBusy(async () => {
    const user = await getCurrentUser();
    const data = getData();

    if (!user) {
      data.costs = getCosts(data).filter(cost => String(cost.id) !== String(id));
      saveData(data);
      return;
    }

    const { error } = await supabaseClient.from("costs").delete().eq("id", id).eq("user_id", user.id);
    if (error) {
      deleteFailed = true;
      await appAlert("Verwijderen kost mislukt: " + error.message, { title: "Verwijderen mislukt", variant: "danger" });
      return;
    }
    await loadAllDataFromSupabase();
  });

  if (deleteFailed) {
    if (reopenCostDialogOnFailure) document.getElementById("costDialog")?.showModal();
    return;
  }
  renderCosts();
}


function refreshStandardCostsButton() {
  const btn = document.getElementById("standardCostsBtn");
  if (!btn) return;
  btn.classList.toggle("hidden", !(state.currentScreen === "costsScreen" && getStandardCosts(getData()).length > 0));
}

function getStandardCostSearchText(item) {
  return [item?.description, `${Number(item?.vatRate || 21)}% btw`].join(" ").toLocaleLowerCase(getCurrentLanguage());
}

function renderStandardCostAlphabetFilter(items = getStandardCosts(getData())) {
  const wrap = document.getElementById("standardCostsAlphabetFilter");
  if (!wrap) return;
  const letters = Array.from(new Set(items
    .map(item => String(item.description || "").trim().charAt(0).toLocaleUpperCase(getCurrentLanguage()))
    .filter(letter => /^[A-ZÀ-ÖØ-Þ]/i.test(letter))
  )).sort((a, b) => a.localeCompare(b, getCurrentLanguage()));
  const active = state.standardCostLetter || "";
  wrap.innerHTML = [`<button class="alphabet-btn${active === "" ? " active" : ""}" type="button" data-standard-cost-letter="">Alle</button>`]
    .concat(letters.map(letter => `<button class="alphabet-btn${active === letter ? " active" : ""}" type="button" data-standard-cost-letter="${escapeHtml(letter)}">${escapeHtml(letter)}</button>`))
    .join("");
  wrap.querySelectorAll("[data-standard-cost-letter]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.standardCostLetter = btn.dataset.standardCostLetter || "";
      renderStandardCostsManager();
    });
  });
}

function renderStandardCostsManager() {
  const list = document.getElementById("standardCostsManagerList");
  if (!list) return;
  const searchInput = document.getElementById("standardCostsSearch");
  if (searchInput && searchInput.value !== state.standardCostSearch) searchInput.value = state.standardCostSearch || "";

  const allItems = getStandardCosts(getData()).slice().sort((a, b) => String(a.description || "").localeCompare(String(b.description || ""), getCurrentLanguage()));
  renderStandardCostAlphabetFilter(allItems);

  const filter = String(state.standardCostSearch || "").trim().toLocaleLowerCase(getCurrentLanguage());
  let items = allItems;
  if (state.standardCostLetter) {
    items = items.filter(item => String(item.description || "").trim().charAt(0).toLocaleUpperCase(getCurrentLanguage()) === state.standardCostLetter);
  }
  if (filter) {
    items = items.filter(item => getStandardCostSearchText(item).includes(filter));
  }

  if (!items.length) {
    list.innerHTML = `<div class="empty-state">${t("noStandardCosts")}</div>`;
    refreshStandardCostsButton();
    return;
  }

  list.innerHTML = items.map(item => `
    <article class="standard-cost-manager-item standard-cost-manager-row">
      <button class="standard-cost-manager-main standard-cost-manager-btn" type="button" data-standard-cost-edit="${item.id}">
        <strong>${escapeHtml(item.description || "")}</strong>
        <small>${Number(item.vatRate || 21)}% btw</small>
      </button>
    </article>
  `).join("");
  list.querySelectorAll("[data-standard-cost-edit]").forEach(btn => {
    btn.addEventListener("click", () => openEditStandardCostDialog(btn.dataset.standardCostEdit));
  });
  refreshStandardCostsButton();
}

function openStandardCostsPopover() {
  state.standardCostSearch = "";
  state.standardCostLetter = "";
  const searchInput = document.getElementById("standardCostsSearch");
  if (searchInput) searchInput.value = "";
  renderStandardCostsManager();
  const title = document.querySelector("#standardCostsDialog h3");
  if (title) title.textContent = t("standardCosts");
  document.getElementById("standardCostsDialog")?.showModal();
}

function openEditStandardCostDialog(id) {
  const item = getStandardCosts(getData()).find(standard => String(standard.id) === String(id));
  if (!item) return;
  closeDialog("standardCostsDialog");
  document.getElementById("standardCostEditId").value = item.id;
  document.getElementById("standardCostEditDescription").value = item.description || "";
  document.getElementById("standardCostEditVatRate").innerHTML = buildVatOptions(item.vatRate || 21);
  const title = document.querySelector("#standardCostEditDialog h3");
  if (title) title.textContent = t("editStandardCost");
  document.getElementById("standardCostEditDialog")?.showModal();
  refreshAppSelect(document.getElementById("standardCostEditVatRate"));
}

async function saveStandardCostEditFromForm(event) {
  event.preventDefault();
  const id = document.getElementById("standardCostEditId")?.value;
  const description = String(document.getElementById("standardCostEditDescription")?.value || "").trim();
  const vatRate = Number(document.getElementById("standardCostEditVatRate")?.value || 21);
  if (!id || !description) return;

  let saveFailed = false;
  const standardCostEditDialog = document.getElementById("standardCostEditDialog");
  const reopenStandardCostDialogOnFailure = Boolean(standardCostEditDialog?.open);
  closeDialog("standardCostEditDialog");

  await runWithGlobalActionBusy(async () => {
    const user = await getCurrentUser();
    const data = getData();
    if (!user) {
      const item = getStandardCosts(data).find(standard => String(standard.id) === String(id));
      if (item) {
        item.description = description;
        item.vatRate = vatRate;
        item.updatedAt = new Date().toISOString();
        saveData(data);
      }
      return;
    }

    const { error } = await supabaseClient
      .from("standard_costs")
      .update({ description, vat_rate: vatRate, updated_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", user.id);
    if (error) {
      saveFailed = true;
      await appAlert("Standaardkost aanpassen mislukt: " + error.message, { title: t("saveFailed"), variant: "danger" });
      return;
    }
    await loadAllDataFromSupabase();
  });

  if (saveFailed) {
    if (reopenStandardCostDialogOnFailure) document.getElementById("standardCostEditDialog")?.showModal();
    return;
  }
  renderCostStandardSuggestions(document.getElementById("costDescription")?.value || "");
  renderCosts();
  openStandardCostsPopover();
}

async function deleteStandardCost(id) {
  if (!id) return;
  const confirmed = await appConfirm(t("deleteStandardCostConfirm"), {
    title: t("delete"),
    confirmText: t("delete"),
    cancelText: "Nee",
    variant: "warning"
  });
  if (!confirmed) return;

  let deleteFailed = false;
  const standardCostEditDialog = document.getElementById("standardCostEditDialog");
  const reopenStandardCostDialogOnFailure = Boolean(standardCostEditDialog?.open);
  closeDialog("standardCostEditDialog");

  await runWithGlobalActionBusy(async () => {
    const user = await getCurrentUser();
    const data = getData();
    if (!user) {
      data.standardCosts = getStandardCosts(data).filter(item => String(item.id) !== String(id));
      data.costs = getCosts(data).map(cost => String(cost.standardCostId) === String(id) ? { ...cost, standardCostId: null } : cost);
      saveData(data);
      return;
    }

    const { error } = await supabaseClient.from("standard_costs").delete().eq("id", id).eq("user_id", user.id);
    if (error) {
      deleteFailed = true;
      await appAlert("Standaardkost verwijderen mislukt: " + error.message, { title: "Verwijderen mislukt", variant: "danger" });
      return;
    }
    await loadAllDataFromSupabase();
  });

  if (deleteFailed) {
    if (reopenStandardCostDialogOnFailure) document.getElementById("standardCostEditDialog")?.showModal();
    return;
  }
  renderCosts();
  renderStandardCostsManager();
  renderCostStandardSuggestions(document.getElementById("costDescription")?.value || "");
  if (getStandardCosts(getData()).length) {
    const managerDialog = document.getElementById("standardCostsDialog");
    if (managerDialog && !managerDialog.open) openStandardCostsPopover();
  }
}


/* =========================
   TO DO
========================= */
function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatTodoDescription(description = "") {
  const lines = String(description || "").split(/\r?\n/);
  let html = "";
  let inList = false;

  lines.forEach(line => {
    const trimmed = line.trim();
    const bullet = trimmed.match(/^[-*•]\s+(.*)$/);

    if (bullet) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${escapeHtml(bullet[1])}</li>`;
      return;
    }

    if (inList) {
      html += "</ul>";
      inList = false;
    }

    if (trimmed) {
      html += `<p>${escapeHtml(trimmed)}</p>`;
    }
  });

  if (inList) html += "</ul>";
  return html;
}

function getTodos(data = getData()) {
  return Array.isArray(data.todos) ? data.todos : [];
}

function todoById(data, id) {
  return getTodos(data).find(todo => String(todo.id) === String(id));
}

function getFilteredTodos(data = getData()) {
  const todos = getTodos(data).slice().sort((a, b) => {
    if (Boolean(a.completed) !== Boolean(b.completed)) return a.completed ? 1 : -1;
    return String(b.updatedAt || b.createdAt || b.id || "").localeCompare(String(a.updatedAt || a.createdAt || a.id || ""));
  });

  if (state.todoFilter === "open") return todos.filter(todo => !todo.completed);
  if (state.todoFilter === "done") return todos.filter(todo => todo.completed);
  return todos;
}

function renderTodos() {
  const list = document.getElementById("todoList");
  const count = document.getElementById("todoCountBadge");
  if (!list) return;

  const data = getData();
  const todos = getFilteredTodos(data);
  const allTodos = getTodos(data);
  const openCount = allTodos.filter(todo => !todo.completed).length;

  document.querySelectorAll(".todo-filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.todoFilter === state.todoFilter);
  });

  if (count) {
    count.textContent = `${openCount} open`;
  }

  if (!todos.length) {
    list.innerHTML = `<div class="empty-state">${t("noTodos")}</div>`;
    return;
  }

  list.innerHTML = todos.map(todo => `
    <article class="todo-card${todo.completed ? " is-completed" : ""}">
      <button class="todo-check-btn" type="button" data-todo-toggle="${todo.id}" aria-label="${todo.completed ? t("markOpen") : t("markDone")}">
        <span>${todo.completed ? "✓" : ""}</span>
      </button>
      <button class="todo-main-btn" type="button" data-todo-edit="${todo.id}">
        <div class="todo-title-row">
          <strong class="todo-title">${escapeHtml(todo.title || t("newTodo"))}</strong>
          <span class="todo-status-pill${todo.completed ? " done" : ""}">${todo.completed ? t("completed") : t("open")}</span>
        </div>
        ${todo.description ? `<div class="todo-note">${formatTodoDescription(todo.description)}</div>` : ""}
      </button>
    </article>
  `).join("");

  list.querySelectorAll("[data-todo-edit]").forEach(btn => {
    btn.addEventListener("click", () => openEditTodoDialog(btn.dataset.todoEdit));
  });

  list.querySelectorAll("[data-todo-toggle]").forEach(btn => {
    btn.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      toggleTodoCompleted(btn.dataset.todoToggle);
    });
  });
}

function openNewTodoDialog() {
  const form = document.getElementById("todoForm");
  if (form) form.reset();
  document.getElementById("todoId").value = "";
  document.getElementById("todoCompleted").checked = false;
  document.getElementById("todoModalTitle").textContent = t("newTodo");
  document.getElementById("deleteTodoBtn")?.classList.add("hidden");
  document.getElementById("todoDialog")?.showModal();
}

function openEditTodoDialog(id) {
  const data = getData();
  const todo = todoById(data, id);
  if (!todo) return;

  document.getElementById("todoId").value = todo.id;
  document.getElementById("todoTitle").value = todo.title || "";
  document.getElementById("todoDescription").value = todo.description || "";
  document.getElementById("todoCompleted").checked = Boolean(todo.completed);
  document.getElementById("todoModalTitle").textContent = t("editTodo");
  document.getElementById("deleteTodoBtn")?.classList.remove("hidden");
  document.getElementById("todoDialog")?.showModal();
}

function addTodoBulletLine() {
  const textarea = document.getElementById("todoDescription");
  if (!textarea) return;
  const start = textarea.selectionStart ?? textarea.value.length;
  const end = textarea.selectionEnd ?? textarea.value.length;
  const before = textarea.value.slice(0, start);
  const after = textarea.value.slice(end);
  const prefix = before && !before.endsWith("\n") ? "\n" : "";
  const insert = `${prefix}- `;
  textarea.value = before + insert + after;
  const cursor = (before + insert).length;
  textarea.focus();
  textarea.setSelectionRange(cursor, cursor);
}

async function saveTodoFromForm(event) {
  event.preventDefault();

  const user = await getCurrentUser();
  const data = getData();
  const rawId = document.getElementById("todoId").value;
  const id = rawId ? Number(rawId) || rawId : null;
  const now = new Date().toISOString();

  const payload = {
    title: String(document.getElementById("todoTitle")?.value || "").trim(),
    description: String(document.getElementById("todoDescription")?.value || "").trim(),
    completed: Boolean(document.getElementById("todoCompleted")?.checked),
    updatedAt: now
  };

  if (!payload.title) {
    await appAlert("Geef de taak een titel.", { title: t("todo"), variant: "warning" });
    return;
  }

  if (!user) {
    if (id) {
      const existing = todoById(data, id);
      if (existing) Object.assign(existing, payload);
    } else {
      data.todos = getTodos(data);
      data.todos.push({ id: nextId(data.todos), ...payload, createdAt: now });
    }
    saveData(data);
    closeDialog("todoDialog");
    renderTodos();
    return;
  }

  const dbPayload = {
    user_id: user.id,
    title: payload.title,
    description: payload.description,
    is_completed: payload.completed,
    updated_at: now
  };

  let error;
  if (id) {
    ({ error } = await supabaseClient
      .from("todos")
      .update(dbPayload)
      .eq("id", id)
      .eq("user_id", user.id));
  } else {
    ({ error } = await supabaseClient
      .from("todos")
      .insert({ ...dbPayload, created_at: now }));
  }

  if (error) {
    await appAlert("Opslaan taak mislukt: " + error.message, { title: t("saveFailed"), variant: "danger" });
    return;
  }

  await loadAllDataFromSupabase();
  closeDialog("todoDialog");
  renderTodos();
}

async function toggleTodoCompleted(id) {
  const data = getData();
  const todo = todoById(data, id);
  if (!todo) return;
  todo.completed = !todo.completed;
  todo.updatedAt = new Date().toISOString();

  const user = await getCurrentUser();
  if (!user) {
    saveData(data);
    renderTodos();
    return;
  }

  const { error } = await supabaseClient
    .from("todos")
    .update({ is_completed: todo.completed, updated_at: todo.updatedAt })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    await appAlert("Taak aanpassen mislukt: " + error.message, { title: t("saveFailed"), variant: "danger" });
    return;
  }

  await loadAllDataFromSupabase();
  renderTodos();
}

async function deleteCurrentTodo() {
  const id = document.getElementById("todoId")?.value;
  if (!id) return;

  const confirmed = await appConfirm("Deze taak verwijderen?", {
    title: t("delete"),
    confirmText: t("delete"),
    cancelText: t("cancel"),
    variant: "warning"
  });
  if (!confirmed) return;

  const user = await getCurrentUser();
  const data = getData();

  if (!user) {
    data.todos = getTodos(data).filter(todo => String(todo.id) !== String(id));
    saveData(data);
    closeDialog("todoDialog");
    renderTodos();
    return;
  }

  const { error } = await supabaseClient
    .from("todos")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    await appAlert("Verwijderen taak mislukt: " + error.message, { title: "Verwijderen mislukt", variant: "danger" });
    return;
  }

  await loadAllDataFromSupabase();
  closeDialog("todoDialog");
  renderTodos();
}

async function loadTodosFromSupabase() {
  const user = await getCurrentUser();
  if (!user) return [];

  const { data, error } = await supabaseClient
    .from("todos")
    .select("id, title, description, is_completed, created_at, updated_at")
    .eq("user_id", user.id)
    .order("is_completed", { ascending: true })
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Fout bij laden taken:", error.message);
    return [];
  }

  return (data || []).map(todo => ({
    id: todo.id,
    title: todo.title,
    description: todo.description || "",
    completed: Boolean(todo.is_completed),
    createdAt: todo.created_at,
    updatedAt: todo.updated_at
  }));
}

/* =========================
   EVENTS
========================= */

function registerEvents() {
  applyNavStyleActionButtons();

  document.getElementById("prevMonthBtn").addEventListener("click", () => animateCalendarMonth(-1));
  document.getElementById("nextMonthBtn").addEventListener("click", () => animateCalendarMonth(1));
  setupCalendarSwipeNavigation();
  setupAppPageSwipeNavigation();
  ensureActiveNavVisible();

  document.getElementById("monthPickerBtn").addEventListener("click", openMonthPicker);
  document.getElementById("monthPickerForm").addEventListener("submit", saveMonthPicker);
  const todayIconBtn = document.getElementById("todayIconBtn");
  if (todayIconBtn) {
    const handleTodayIconTap = event => {
      event.preventDefault();
      event.stopPropagation();
      jumpToToday();
    };

    // Pointer/touch-start maakt het icoontje betrouwbaar op iPhone: de actie
    // gebeurt meteen bij de tik en kan niet door swipe-click-suppressie worden
    // tegengehouden. De click-listener blijft als fallback voor desktop.
    if (window.PointerEvent) {
      todayIconBtn.addEventListener("pointerup", handleTodayIconTap);
    } else {
      todayIconBtn.addEventListener("touchend", handleTodayIconTap, { passive: false });
    }
    todayIconBtn.addEventListener("click", handleTodayIconTap);
  }

  document.getElementById("jumpToTodayBtn")?.addEventListener("click", jumpToToday);

  document.getElementById("costForm")?.addEventListener("submit", withActionLock(saveCostFromForm));
  document.getElementById("deleteCostBtn")?.addEventListener("click", withActionLock(deleteCurrentCost));
  document.getElementById("deleteStandardCostBtn")?.addEventListener("click", withActionLock(() => deleteStandardCost(document.getElementById("standardCostEditId")?.value)));
  document.getElementById("standardCostsBtn")?.addEventListener("click", openStandardCostsPopover);
  document.getElementById("standardCostEditForm")?.addEventListener("submit", withActionLock(saveStandardCostEditFromForm));

  const attachCostsPeriodButton = (id, mode) => {
    const button = document.getElementById(id);
    if (!button) return;

    attachRevenuePeriodSwipe(button, mode, "costs");
    button.addEventListener("contextmenu", event => event.preventDefault());
    button.addEventListener("click", event => {
      event.preventDefault();
      if (button.dataset.revenueSwipeSuppressClick === "1") return;
      const currentMode = getCostsPeriodType();
      const anchor = getCostsPeriodDate();
      if (currentMode === mode) {
        openCostsWheelPicker(mode);
        return;
      }
      setCostsPeriod(mode, anchor);
    });
  };

  attachCostsPeriodButton("costsYearBtn", "year");
  attachCostsPeriodButton("costsMonthBtn", "month");
  attachCostsPeriodButton("costsWeekBtn", "week");
  attachCostsPeriodButton("costsDayBtn", "day");

  const costsNativeDatePicker = document.getElementById("costsNativeDatePicker");
  if (costsNativeDatePicker) {
    costsNativeDatePicker.addEventListener("change", event => {
      const pickedDate = event.target.value;
      if (!pickedDate) return;
      setCostsPeriod(event.target.dataset.mode || "day", pickedDate);
    });
  }
  document.getElementById("standardCostsSearch")?.addEventListener("input", event => {
    state.standardCostSearch = event.target.value || "";
    renderStandardCostsManager();
  });
  document.getElementById("costDescription")?.addEventListener("focus", event => renderCostStandardSuggestions(event.target.value, true));
  document.getElementById("costDescription")?.addEventListener("input", event => {
    document.getElementById("costStandardCostId").value = "";
    const select = document.getElementById("costStandardCostSelect");
    if (select) select.value = "";
    renderCostStandardSuggestions(event.target.value, true);
  });
  document.getElementById("costStandardCostSelect")?.addEventListener("change", event => {
    const item = getStandardCosts(getData()).find(standard => String(standard.id) === String(event.target.value));
    if (!item) return;
    document.getElementById("costDescription").value = item.description || "";
    document.getElementById("costVatRate").innerHTML = buildVatOptions(item.vatRate || 21);
    document.getElementById("costStandardCostId").value = item.id || "";
    refreshAppSelect(document.getElementById("costVatRate"));
  });
  document.addEventListener("click", event => {
    const picker = event.target.closest(".cost-standard-picker");
    const wrap = document.getElementById("costStandardSuggestions");
    if (!picker && wrap) {
      wrap.classList.add("hidden");
      document.getElementById("costDescription")?.setAttribute("aria-expanded", "false");
    }
  });

  document.getElementById("todoForm")?.addEventListener("submit", withActionLock(saveTodoFromForm));
  document.getElementById("deleteTodoBtn")?.addEventListener("click", withActionLock(deleteCurrentTodo));
  document.getElementById("todoAddBulletBtn")?.addEventListener("click", addTodoBulletLine);
  document.querySelectorAll(".todo-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.todoFilter = btn.dataset.todoFilter || "all";
      renderTodos();
    });
  });

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", (event) => {
      if (isAuthLocked() && btn.dataset.screen !== "accountScreen") {
        event.preventDefault();
        event.stopPropagation();
        switchScreen("accountScreen", t("account"));
        return;
      }
      switchScreen(btn.dataset.screen, getScreenTitle(btn.dataset.screen, btn.dataset.title));
    });
  });

  document.getElementById("backBtn").addEventListener("click", () => {
    const map = {
      agendaScreen: "Agenda",
      clientsScreen: "Klanten",
      servicesScreen: "Diensten",
      paymentMethodsScreen: "Betaalwijze",
      statisticsScreen: "Statistieken",
      revenueScreen: "Omzet",
      costsScreen: "Kosten",
      todoScreen: "To Do",
      settingsScreen: "Instellingen",
      accountScreen: "Account"
    };

    switchScreen(state.previousMainScreen, getScreenTitle(state.previousMainScreen, map[state.previousMainScreen]));
  });

  document.getElementById("clientSearch").addEventListener("input", renderClients);
  document.getElementById("serviceSearch")?.addEventListener("input", renderServices);
  document.getElementById("appointmentService").addEventListener("change", syncServiceDefaults);
  document.getElementById("settingsForm")?.addEventListener("submit", withActionLock(saveSettingsFromForm));
  setupSettingsDirtyTracking();
  document.getElementById("copyCalendarFeedUrlBtn")?.addEventListener("click", withActionLock(createOrCopyCalendarFeedUrl));
  document.getElementById("openGoogleCalendarSubscribeBtn")?.addEventListener("click", withActionLock(openGoogleCalendarSubscribePage));
  document.getElementById("regenerateCalendarFeedUrlBtn")?.addEventListener("click", withActionLock(regenerateCalendarFeedUrl));
  document.getElementById("settingsLanguage")?.addEventListener("change", event => {
    currentProfilePreferences.language = normalizeLanguage(event.target.value);
    const data = getData();
    data.settings = { ...getSettings(), language: currentProfilePreferences.language, currency: getCurrentCurrency() };
    saveData(data);
    rerenderAll();
  });
  document.getElementById("settingsCurrency")?.addEventListener("change", event => {
    currentProfilePreferences.currency = normalizeCurrency(event.target.value);
    const data = getData();
    data.settings = { ...getSettings(), language: getCurrentLanguage(), currency: currentProfilePreferences.currency };
    saveData(data);
    rerenderAll();
  });
  document.getElementById("settingsShowTipsOnOpen")?.addEventListener("change", event => {
    setTipsOnOpenPreference(event.target.checked !== false);
    updateSettingsDirtyState();
  });

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

  document.getElementById("appointmentDateDisplayBtn")?.addEventListener("click", () => openAppointmentWheelPicker("date"));
  document.getElementById("appointmentTimeDisplayBtn")?.addEventListener("click", () => openAppointmentWheelPicker("time", "appointmentTime"));
  document.getElementById("appointmentPrivateEndDateDisplayBtn")?.addEventListener("click", () => openAppointmentWheelPicker("date", "appointmentPrivateEndDate"));
  document.getElementById("appointmentPrivateEndTimeDisplayBtn")?.addEventListener("click", () => openAppointmentWheelPicker("time", "appointmentPrivateEndTime"));
  document.getElementById("appointmentPrivateEndDate")?.addEventListener("change", () => {
    const startDateInput = document.getElementById("appointmentDate");
    const endDateInput = document.getElementById("appointmentPrivateEndDate");
    if (startDateInput && endDateInput && endDateInput.value < startDateInput.value) {
      endDateInput.value = startDateInput.value;
    }
    syncAppointmentDateTimeDisplays();
  });
  ["appointmentTime", "appointmentPrivateEndTime"].forEach(id => {
    document.getElementById(id)?.addEventListener("change", syncPrivateEndTimeWithStart);
    document.getElementById(id)?.addEventListener("input", syncPrivateEndTimeWithStart);
  });
  document.getElementById("appointmentIsPrivate")?.addEventListener("change", event => setAppointmentPrivateMode(event.target.checked));
  document.getElementById("appointmentDate")?.addEventListener("change", () => {
    const startDateInput = document.getElementById("appointmentDate");
    const endDateInput = document.getElementById("appointmentPrivateEndDate");
    if (startDateInput && endDateInput && (!endDateInput.value || endDateInput.value < startDateInput.value)) {
      endDateInput.value = startDateInput.value;
    }
    syncAppointmentDateTimeDisplays();
    updatePrivateRepeatWeeklyLabel();
  });
  document.getElementById("appointmentPrivateRepeat")?.addEventListener("change", updatePrivateRepeatWeeklyLabel);
  document.getElementById("appointmentTime")?.addEventListener("change", syncAppointmentDateTimeDisplays);
  document.getElementById("followUpAppointmentDateDisplayBtn")?.addEventListener("click", () => openAppointmentWheelPicker("date", "followUpAppointmentDate"));
  document.getElementById("followUpAppointmentTimeDisplayBtn")?.addEventListener("click", () => openAppointmentWheelPicker("time", "followUpAppointmentTime"));
  document.getElementById("followUpAppointmentDate")?.addEventListener("change", syncFollowUpDisplays);
  document.getElementById("followUpAppointmentTime")?.addEventListener("change", syncFollowUpDisplays);
  document.getElementById("followUpAppointmentForm")?.addEventListener("submit", withActionLock(saveFollowUpAppointmentFromForm));

  const appointmentWheelPickerForm = document.getElementById("appointmentWheelPickerForm");
  if (appointmentWheelPickerForm) {
    appointmentWheelPickerForm.addEventListener("submit", event => {
      event.preventDefault();
      applyAppointmentWheelPickerSelection();
      closeDialog("appointmentWheelPickerDialog");
    });
  }

  document.getElementById("appointmentForm").addEventListener("submit", withActionLock(saveAppointmentFromForm));
  document.getElementById("appointmentOpenCustomerBtn")?.addEventListener("click", openAppointmentCustomerDetailFromDialog);
  document.getElementById("deleteAppointmentBtn").addEventListener("click", withActionLock(deleteCurrentAppointment));

  document.getElementById("clientForm").addEventListener("submit", withActionLock(saveClientFromForm));

  document.getElementById("serviceForm").addEventListener("submit", withActionLock(saveServiceFromForm));
  ["appointmentDuration", "appointmentPrice", "serviceDuration", "servicePrice", "costAmountInclVat"].forEach(id => {
    const input = document.getElementById(id);
    input?.addEventListener("focus", selectNumericFieldContent);
    input?.addEventListener("click", selectNumericFieldContent);
  });
  ["appointmentDuration", "serviceDuration"].forEach(id => {
    document.getElementById(id)?.addEventListener("input", event => {
      const input = event.currentTarget;
      const clean = normalizeDurationInput(input.value);
      if (input.value !== clean) input.value = clean;
    });
  });

  ["appointmentPrice", "servicePrice", "costAmountInclVat"].forEach(id => {
    document.getElementById(id)?.addEventListener("input", event => {
      const input = event.currentTarget;
      const clean = normalizeDecimalInput(input.value);
      if (input.value !== clean) input.value = clean;
    });
  });
  document.getElementById("deleteServiceBtn").addEventListener("click", withActionLock(deleteCurrentService));

  document.getElementById("paymentMethodForm").addEventListener("submit", withActionLock(savePaymentMethodFromForm));
  document.getElementById("deletePaymentMethodBtn").addEventListener("click", withActionLock(deleteCurrentPaymentMethod));

  document.getElementById("paymentPopoverCloseBtn")?.addEventListener("click", closePaymentPopover);
  document.getElementById("paymentQrOpenBtn")?.addEventListener("click", openPaymentQrModal);
  document.getElementById("appointmentActionPopoverCloseBtn")?.addEventListener("click", closeAppointmentActionPopover);

  document.addEventListener("click", event => {
    const actionPopover = document.getElementById("appointmentActionPopover");
    if (actionPopover && !actionPopover.classList.contains("hidden")) {
      if (!actionPopover.contains(event.target) && !event.target.closest(".appointment-row")) {
        closeAppointmentActionPopover();
      }
    }

    const popover = document.getElementById("paymentPopover");
    if (!popover || popover.classList.contains("hidden")) return;
    if (popover.contains(event.target)) return;
    if (event.target.closest("#paymentQrPopover")) return;
    if (event.target.closest("#paymentQrDialog")) return;
    if (event.target.closest(".price-chip")) return;
    closePaymentPopover();
  });

  window.addEventListener("resize", () => {
    const actionPopover = document.getElementById("appointmentActionPopover");
    if (actionPopover && !actionPopover.classList.contains("hidden")) positionAppointmentActionPopover();

    const popover = document.getElementById("paymentPopover");
    if (popover && !popover.classList.contains("hidden")) positionPaymentPopover();
  });

  document.getElementById("agendaList")?.addEventListener("scroll", () => { closePaymentPopover(); closeAppointmentActionPopover(); }, { passive: true });
  document.querySelector(".calendar-panel")?.addEventListener("scroll", () => { closePaymentPopover(); closeAppointmentActionPopover(); }, { passive: true });
  document.querySelector(".calendar-panel")?.addEventListener("click", () => { closeAgendaFabMenu(); }, { passive: true });

  document.querySelectorAll("[data-close]").forEach(btn => {
    btn.addEventListener("click", () => closeDialog(btn.dataset.close));
  });

  document.getElementById("revenueDate").value = todayStr;

  ["revenuePeriodType", "revenueDate"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", renderRevenue);
  });

  const attachRevenuePeriodButton = (id, mode, openPicker) => {
    const button = document.getElementById(id);
    if (!button) return;

    attachRevenuePeriodSwipe(button, mode);
    button.addEventListener("contextmenu", event => event.preventDefault());
    button.addEventListener("click", event => {
      event.preventDefault();
      if (button.dataset.revenueSwipeSuppressClick === "1") return;

      const currentMode = document.getElementById("revenuePeriodType")?.value || "day";
      const anchor = document.getElementById("revenueDate")?.value || todayStr;

      if (currentMode === mode) {
        openPicker();
        return;
      }

      setRevenuePeriod(mode, anchor);
    });
  };

  attachRevenuePeriodButton("revenueYearBtn", "year", () => openRevenueWheelPicker("year"));
  attachRevenuePeriodButton("revenueMonthBtn", "month", () => openRevenueWheelPicker("month"));
  attachRevenuePeriodButton("revenueWeekBtn", "week", () => openRevenueWheelPicker("week"));
  attachRevenuePeriodButton("revenueDayBtn", "day", () => openRevenueWheelPicker("day"));

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
      const mode = event.target.dataset.mode || "day";
      setRevenuePeriod(mode, pickedDate);
    });
  }

  const revenueExportCsvBtn = document.getElementById("revenueExportCsvBtn");
  if (revenueExportCsvBtn) {
    revenueExportCsvBtn.addEventListener("click", withActionLock(downloadRevenueCsv));
  }

  const revenueExportReportBtn = document.getElementById("revenueExportReportBtn");
  if (revenueExportReportBtn) {
    revenueExportReportBtn.addEventListener("click", withActionLock(downloadRevenueStyledReport));
  }

  const costsExportCsvBtn = document.getElementById("costsExportCsvBtn");
  if (costsExportCsvBtn) {
    costsExportCsvBtn.addEventListener("click", withActionLock(downloadCostsCsv));
  }

  const costsExportReportBtn = document.getElementById("costsExportReportBtn");
  if (costsExportReportBtn) {
    costsExportReportBtn.addEventListener("click", withActionLock(downloadCostsStyledReport));
  }

  const registerBtn = document.getElementById("registerBtn");
  const registerForm = document.getElementById("registerForm");
  const openRegisterBtn = document.getElementById("openRegisterDialogBtn");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const headerAccountBtn = document.getElementById("headerAccountBtn");
  const headerSupportBtn = document.getElementById("headerSupportBtn");

  const editProfileBtn = document.getElementById("editProfileBtn");
  const changePasswordBtn = document.getElementById("changePasswordBtn");
  const editProfileForm = document.getElementById("editProfileForm");
  const passwordForm = document.getElementById("passwordForm");

  if (registerForm) registerForm.addEventListener("submit", withActionLock(registerAccount));
  document.getElementById("registerNextBtn")?.addEventListener("click", withActionLock(goToNextRegisterStep));
  document.getElementById("registerBackBtn")?.addEventListener("click", goToPreviousRegisterStep);
  document.getElementById("registerLanguage")?.addEventListener("change", handleRegisterLanguageChange);
  document.getElementById("registerCountry")?.addEventListener("change", syncRegisterRegionOptions);
  document.getElementById("registerRegion")?.addEventListener("change", syncRegisterRegionOptions);
  document.getElementById("editCountry")?.addEventListener("change", syncEditProfileRegionOptions);
  document.getElementById("editRegion")?.addEventListener("change", syncEditProfileRegionOptions);

  if (openRegisterBtn) {
    openRegisterBtn.addEventListener("click", () => {
      resetRegisterWizard();
      document.getElementById("registerDialog").showModal();
      setupPasswordToggleButtons();
    });
  }

  if (loginBtn) loginBtn.addEventListener("click", withActionLock(loginAccount));
  if (logoutBtn) logoutBtn.addEventListener("click", withActionLock(logoutAccount));
  if (editProfileBtn) editProfileBtn.addEventListener("click", openEditProfileDialog);
  if (changePasswordBtn) changePasswordBtn.addEventListener("click", openPasswordDialog);
  if (editProfileForm) editProfileForm.addEventListener("submit", withActionLock(saveProfileFromForm));
  if (passwordForm) passwordForm.addEventListener("submit", withActionLock(savePasswordFromForm));

  document.getElementById("welcomeGuideCloseBtn")?.addEventListener("click", () => closeWelcomeGuide());
  document.getElementById("welcomeGuideStartClientBtn")?.addEventListener("click", () => {
    closeWelcomeGuide();
    switchScreen("clientsScreen", t("clients"));
    window.setTimeout(openNewClientDialog, 180);
  });
  document.getElementById("welcomeGuideStartServiceBtn")?.addEventListener("click", () => {
    closeWelcomeGuide();
    switchScreen("servicesScreen", t("services"));
    window.setTimeout(openNewServiceDialog, 180);
  });
  document.getElementById("welcomeGuideTipsToggle")?.addEventListener("change", event => {
    setTipsOnOpenPreference(event.target.checked !== false);
  });

  setupPasswordToggleButtons();
  setupAppSelectDropdowns();

  if (headerAccountBtn) {
    headerAccountBtn.addEventListener("click", () => {
      switchScreen("accountScreen", t("account"));
    });
  }

  if (headerSupportBtn) {
    headerSupportBtn.addEventListener("click", () => {
      switchScreen("supportScreen", t("support"));
    });
  }

  document.getElementById("supportForm")?.addEventListener("submit", submitSupportForm);
  document.getElementById("supportCopyDiagnosticsBtn")?.addEventListener("click", copySupportDiagnostics);

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
    note: c.note,
    customerNumber: c.customer_number ?? null
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
    price: Number(s.price || 0),
    isActive: s.is_active !== false
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

  return (data || []).map(a => {
    const rawRemarks = String(a.appointment_remarks || a.remarks || "").trim();
    return {
    id: a.id,
    customerId: a.customer_id,
    serviceId: a.service_id,
    date: a.appointment_date,
    time: a.appointment_time ? String(a.appointment_time).slice(0, 5) : "",
    duration: a.duration,
    price: Number(a.price || 0),
    status: a.status,
    paid: Boolean(a.paid),
    paymentMethodName: a.payment_method_label ?? null,
    currency: normalizeCurrency(a.currency || DEFAULT_CURRENCY),
    remarks: stripPrivateEndDateMeta(rawRemarks),
    isPrivate: Boolean(a.is_private),
    privateTitle: String(a.private_title || "").trim(),
    privateDetails: String(a.private_details || "").trim(),
    privateEndTime: a.private_end_time ? String(a.private_end_time).slice(0, 5) : "",
    privateEndDate: getStoredPrivateEndDate({ ...a, appointment_remarks: rawRemarks }, a.appointment_date),
    recurrenceGroupId: a.recurrence_group_id || null,
    recurrenceRule: a.recurrence_rule || "none"
  };
  });
}


async function loadStandardCostsFromSupabase() {
  const user = await getCurrentUser();
  if (!user) return [];
  const { data, error } = await supabaseClient
    .from("standard_costs")
    .select("id, description, vat_rate, created_at, updated_at")
    .eq("user_id", user.id)
    .order("description", { ascending: true });
  if (error) {
    console.error("Fout bij laden standaardkosten:", error.message);
    return [];
  }
  return (data || []).map(item => ({
    id: item.id,
    description: item.description || "",
    vatRate: Number(item.vat_rate || 21),
    createdAt: item.created_at,
    updatedAt: item.updated_at
  }));
}

async function loadCostsFromSupabase() {
  const user = await getCurrentUser();
  if (!user) return [];
  const { data, error } = await supabaseClient
    .from("costs")
    .select("id, description, cost_date, amount_incl_vat, vat_rate, standard_cost_id, created_at, updated_at")
    .eq("user_id", user.id)
    .order("cost_date", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Fout bij laden kosten:", error.message);
    return [];
  }
  return (data || []).map(cost => ({
    id: cost.id,
    description: cost.description || "",
    date: cost.cost_date,
    amountInclVat: Number(cost.amount_incl_vat || 0),
    vatRate: Number(cost.vat_rate || 21),
    standardCostId: cost.standard_cost_id || null,
    createdAt: cost.created_at,
    updatedAt: cost.updated_at
  }));
}

async function loadAllDataFromSupabase() {
  const customers = await loadCustomersFromSupabase();
  const services = await loadServicesFromSupabase();
  const paymentMethods = await loadPaymentMethodsFromSupabase();
  const appointments = await loadAppointmentsFromSupabase();
  const todos = await loadTodosFromSupabase();
  const standardCosts = await loadStandardCostsFromSupabase();
  const costs = await loadCostsFromSupabase();
  const settings = await loadSettingsFromSupabase();

  saveData({
    customers,
    services,
    paymentMethods,
    appointments,
    todos,
    standardCosts,
    costs,
    settings
  });

  state.revenueLastRenderSignature = "";
  await syncNotificationState();
}

/* =========================
   STARTUP
========================= */



/* =========================
   APP NAVIGATIE VIA BROWSER / ANDROID TERUGKNOP
========================= */
function getAppHistoryPayload(screenId = state.currentScreen, title = "") {
  const safeScreenId = document.getElementById(screenId) ? screenId : "agendaScreen";
  return {
    nailbookerApp: true,
    screenId: safeScreenId,
    title: getScreenTitle(safeScreenId, title || "")
  };
}

function syncAppBrowserHistory(screenId, title = "", { replace = false, skip = false, previousScreen = null } = {}) {
  if (skip || !state.appNavigationReady || !window.history?.pushState) return;

  const payload = getAppHistoryPayload(screenId, title);
  const isSameScreen = state.appNavigationLastScreen === payload.screenId;

  try {
    if (replace || !history.state?.nailbookerApp) {
      history.replaceState(payload, "", window.location.href);
      history.pushState({ ...payload, guard: true }, "", window.location.href);
      state.appNavigationLastScreen = payload.screenId;
      return;
    }

    if (!isSameScreen && previousScreen !== payload.screenId) {
      history.pushState(payload, "", window.location.href);
      state.appNavigationLastScreen = payload.screenId;
    }
  } catch (error) {
    console.warn("App-navigatie kon niet aan browser history gekoppeld worden:", error?.message || error);
  }
}

function pushCurrentAppHistoryGuard() {
  if (!state.appNavigationReady || !window.history?.pushState) return;
  try {
    const payload = getAppHistoryPayload(state.currentScreen);
    history.pushState({ ...payload, guard: true }, "", window.location.href);
    state.appNavigationLastScreen = payload.screenId;
  } catch (error) {
    console.warn("App-terugknop guard kon niet geplaatst worden:", error?.message || error);
  }
}

function closeTopAppOverlayForBackButton() {
  const openSelect = document.querySelector('.app-select-wrap.is-open');
  if (openSelect) {
    closeAllAppSelectDropdowns();
    return true;
  }

  const actionPopover = document.getElementById("appointmentActionPopover");
  if (actionPopover && !actionPopover.classList.contains("hidden")) {
    closeAppointmentActionPopover();
    return true;
  }

  const openDialogs = Array.from(document.querySelectorAll("dialog[open]"));
  const dialog = openDialogs[openDialogs.length - 1];
  if (dialog) {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    return true;
  }

  const paymentPopover = document.getElementById("paymentPopover");
  if (paymentPopover && !paymentPopover.classList.contains("hidden")) {
    closePaymentPopover();
    return true;
  }

  return false;
}

function handleAppBrowserBack(event) {
  if (closeTopAppOverlayForBackButton()) {
    pushCurrentAppHistoryGuard();
    return;
  }

  const payload = event.state?.nailbookerApp ? event.state : null;

  if (!payload || !payload.screenId || payload.screenId === state.currentScreen) {
    pushCurrentAppHistoryGuard();
    return;
  }

  switchScreen(payload.screenId, getScreenTitle(payload.screenId, payload.title || ""), { skipHistory: true });
  state.appNavigationLastScreen = payload.screenId;
}

function setupAppBrowserBackNavigation() {
  if (state.appNavigationReady) return;
  if (!window.history?.pushState) return;

  state.appNavigationReady = true;
  window.addEventListener("popstate", handleAppBrowserBack);
}


/* =========================
   APP-STIJL DROPDOWNS
   - Vervangt de browserweergave van <select> door een eigen app-dropdown.
   - De originele select blijft bestaan, zodat alle bestaande change-events,
     formulierlogica en waarden blijven werken.
========================= */
let appSelectsReady = false;
let appSelectObserver = null;

function closeAllAppSelectDropdowns(exceptWrap = null) {
  document.querySelectorAll('.app-select-wrap.is-open').forEach(wrap => {
    if (wrap !== exceptWrap) wrap.classList.remove('is-open');
  });
}

function getSelectDisplayText(select) {
  const option = select.options?.[select.selectedIndex];
  return option ? option.textContent.trim() : '';
}

function syncAppSelectButton(select) {
  const wrap = select.closest('.app-select-wrap');
  const button = wrap?.querySelector('.app-select-button');
  const valueEl = button?.querySelector('.app-select-value');
  if (!button || !valueEl) return;

  valueEl.textContent = getSelectDisplayText(select) || select.getAttribute('aria-label') || 'Kies';
  button.disabled = select.disabled;
  button.setAttribute('aria-disabled', String(select.disabled));
}

function renderAppSelectOptions(select) {
  const wrap = select.closest('.app-select-wrap');
  const list = wrap?.querySelector('.app-select-options');
  if (!wrap || !list) return;

  list.innerHTML = '';

  Array.from(select.options || []).forEach(option => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'app-select-option';
    item.textContent = option.textContent.trim();
    item.dataset.value = option.value;
    item.disabled = option.disabled;

    const isSelected = option.value === select.value;
    item.classList.toggle('is-selected', isSelected);
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', String(isSelected));

    item.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      if (option.disabled) return;

      select.value = option.value;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      syncAppSelectButton(select);
      renderAppSelectOptions(select);
      wrap.classList.remove('is-open');
      wrap.querySelector('.app-select-button')?.focus({ preventScroll: true });
    });

    list.appendChild(item);
  });
}

function refreshAppSelect(select) {
  if (!select) return;

  const wrap = select.closest('.app-select-wrap');
  const hasValidWrap = Boolean(wrap && wrap.querySelector('.app-select-button') && wrap.querySelector('.app-select-options'));

  if (select.dataset.appSelectReady !== 'true' || !hasValidWrap) {
    if (!hasValidWrap) {
      delete select.dataset.appSelectReady;
      if (wrap) {
        wrap.parentNode.insertBefore(select, wrap);
        wrap.remove();
      }
    }
    enhanceAppSelect(select);
    return;
  }

  syncAppSelectButton(select);
  renderAppSelectOptions(select);
}

function enhanceAppSelect(select) {
  if (!select || select.dataset.appSelectReady === 'true') return;
  if (isAppointmentPickerFallbackSelect(select)) {
    unwrapHiddenAppointmentPickerSelect(select);
    return;
  }
  if (select.multiple) return;

  select.dataset.appSelectReady = 'true';

  const wrap = document.createElement('span');
  wrap.className = 'app-select-wrap';

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'app-select-button';
  button.setAttribute('aria-haspopup', 'listbox');
  button.innerHTML = '<span class="app-select-value"></span><span class="app-select-arrow" aria-hidden="true"></span>';

  const list = document.createElement('div');
  list.className = 'app-select-options';
  list.setAttribute('role', 'listbox');

  select.parentNode.insertBefore(wrap, select);
  wrap.appendChild(select);
  wrap.appendChild(button);
  wrap.appendChild(list);

  button.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    if (select.disabled) return;

    const shouldOpen = !wrap.classList.contains('is-open');
    closeAllAppSelectDropdowns(wrap);
    renderAppSelectOptions(select);
    wrap.classList.toggle('is-open', shouldOpen);
  });

  button.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      wrap.classList.remove('is-open');
      return;
    }

    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault();
      renderAppSelectOptions(select);
      closeAllAppSelectDropdowns(wrap);
      wrap.classList.add('is-open');
      const active = list.querySelector('.app-select-option.is-selected:not(:disabled)') || list.querySelector('.app-select-option:not(:disabled)');
      active?.focus({ preventScroll: true });
    }
  });

  select.addEventListener('change', () => {
    syncAppSelectButton(select);
    renderAppSelectOptions(select);
  });

  const selectObserver = new MutationObserver(() => {
    syncAppSelectButton(select);
    renderAppSelectOptions(select);
  });
  selectObserver.observe(select, { childList: true, subtree: true, attributes: true, attributeFilter: ['disabled', 'selected', 'value'] });

  syncAppSelectButton(select);
  renderAppSelectOptions(select);
}

function rebuildSettingsSelectOptions() {
  const languageSelect = document.getElementById('settingsLanguage');
  const currencySelect = document.getElementById('settingsCurrency');

  if (languageSelect) {
    const selectedLanguage = normalizeLanguage(languageSelect.value || getCurrentLanguage());
    languageSelect.innerHTML = buildLanguageOptions(selectedLanguage);
    languageSelect.value = selectedLanguage;
  }

  if (currencySelect) {
    const selectedCurrency = normalizeCurrency(currencySelect.value || getCurrentCurrency());
    currencySelect.innerHTML = buildCurrencyOptions(selectedCurrency);
    currencySelect.value = selectedCurrency;
  }
}

function isAppointmentPickerFallbackSelect(select) {
  return Boolean(select?.classList?.contains("appointment-customer-select-fallback") || select?.classList?.contains("appointment-service-select-fallback"));
}

function unwrapHiddenAppointmentPickerSelect(select) {
  if (!isAppointmentPickerFallbackSelect(select)) return;

  const wrap = select.closest(".app-select-wrap");
  if (wrap) {
    wrap.parentNode.insertBefore(select, wrap);
    wrap.remove();
  }

  delete select.dataset.appSelectReady;
  select.tabIndex = -1;
  select.setAttribute("aria-hidden", "true");
}

function setupAppointmentPickerOutsideClose() {
  if (document.body.dataset.appointmentPickerOutsideCloseReady === "true") return;
  document.body.dataset.appointmentPickerOutsideCloseReady = "true";

  document.addEventListener("pointerdown", event => {
    if (!event.target.closest(".appointment-customer-picker")) {
      hideAppointmentCustomerResults();
    }
    if (!event.target.closest(".appointment-service-picker")) {
      hideAppointmentServiceResults();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    hideAppointmentCustomerResults();
    hideAppointmentServiceResults();
  });
}

function setupAppSelectDropdowns() {
  rebuildSettingsSelectOptions();

  document.querySelectorAll('select').forEach(select => {
    select.removeAttribute('size');
    if (isAppointmentPickerFallbackSelect(select)) {
      unwrapHiddenAppointmentPickerSelect(select);
    } else {
      enhanceAppSelect(select);
    }
  });

  setupAppointmentPickerOutsideClose();

  if (appSelectsReady) return;
  appSelectsReady = true;

  document.addEventListener('click', event => {
    if (!event.target.closest('.app-select-wrap')) closeAllAppSelectDropdowns();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeAllAppSelectDropdowns();
  });

  appSelectObserver = new MutationObserver(() => {
    document.querySelectorAll('select').forEach(select => {
      select.removeAttribute('size');
      enhanceAppSelect(select);
    });
  });
  appSelectObserver.observe(document.body, { childList: true, subtree: true });
}


let globalActionLockDepth = 0;
let globalActionBusyTimer = null;
let globalActionBusyHideTimer = null;
let globalActionBusyVisibleSince = 0;
const GLOBAL_ACTION_BUSY_MIN_VISIBLE_MS = 650;

function getAppBusyOverlay() {
  return document.getElementById("appBusyOverlay");
}

function setGlobalActionBusyVisible(visible) {
  const overlay = getAppBusyOverlay();

  if (globalActionBusyHideTimer) {
    clearTimeout(globalActionBusyHideTimer);
    globalActionBusyHideTimer = null;
  }

  if (visible) {
    globalActionBusyVisibleSince = Date.now();
  }

  document.body?.classList.toggle("app-is-busy", Boolean(visible));
  if (!overlay) return;
  overlay.classList.toggle("hidden", !visible);
  overlay.setAttribute("aria-hidden", visible ? "false" : "true");
}

function suspendGlobalActionBusyForDialog() {
  const suspendedDepth = globalActionLockDepth;

  if (globalActionBusyTimer) {
    clearTimeout(globalActionBusyTimer);
    globalActionBusyTimer = null;
  }
  if (globalActionBusyHideTimer) {
    clearTimeout(globalActionBusyHideTimer);
    globalActionBusyHideTimer = null;
  }

  globalActionLockDepth = 0;
  setGlobalActionBusyVisible(false);
  return suspendedDepth;
}

function resumeGlobalActionBusyAfterDialog(suspendedDepth) {
  if (!suspendedDepth || suspendedDepth <= 0) return;
  globalActionLockDepth = Math.max(globalActionLockDepth, suspendedDepth);
  requestGlobalActionBusy({ immediate: true });
}

function requestGlobalActionBusy({ immediate = true, delay = 0 } = {}) {
  if (globalActionLockDepth <= 0) return;
  if (globalActionBusyTimer) {
    clearTimeout(globalActionBusyTimer);
    globalActionBusyTimer = null;
  }

  const show = () => {
    if (globalActionLockDepth > 0) setGlobalActionBusyVisible(true);
  };

  if (immediate || delay <= 0) show();
  else globalActionBusyTimer = window.setTimeout(show, delay);
}

function beginGlobalActionLock() {
  globalActionLockDepth += 1;
  requestGlobalActionBusy({ immediate: true });
}

function endGlobalActionLock() {
  globalActionLockDepth = Math.max(0, globalActionLockDepth - 1);
  if (globalActionLockDepth === 0) {
    if (globalActionBusyTimer) {
      clearTimeout(globalActionBusyTimer);
      globalActionBusyTimer = null;
    }

    const elapsed = globalActionBusyVisibleSince ? Date.now() - globalActionBusyVisibleSince : GLOBAL_ACTION_BUSY_MIN_VISIBLE_MS;
    const remaining = Math.max(0, GLOBAL_ACTION_BUSY_MIN_VISIBLE_MS - elapsed);

    if (remaining > 0 && getAppBusyOverlay() && !getAppBusyOverlay().classList.contains("hidden")) {
      globalActionBusyHideTimer = window.setTimeout(() => {
        globalActionBusyHideTimer = null;
        if (globalActionLockDepth === 0) setGlobalActionBusyVisible(false);
      }, remaining);
    } else {
      setGlobalActionBusyVisible(false);
    }
  }
}

function blockInteractionWhileBusy(event) {
  if (globalActionLockDepth <= 0) return;
  const overlay = getAppBusyOverlay();

  // Zodra een actie-lock actief is, blokkeren we alle interactie buiten de busy-overlay.
  // Niet wachten tot de browser de overlay visueel heeft getekend, want net die korte tussenfase
  // liet op iPhone nog swipes/klikken door bij snelle submits.
  if (overlay && overlay.contains(event.target)) return;
  if (event.target?.closest?.('[data-allow-busy-download="true"]')) return;

  event.preventDefault();
  event.stopImmediatePropagation?.();
  event.stopPropagation();
}

["click", "dblclick", "pointerdown", "touchstart", "touchmove", "wheel", "keydown"].forEach(type => {
  document.addEventListener(type, blockInteractionWhileBusy, { capture: true, passive: false });
});

function getActionLockButton(event) {
  if (!event?.target) return null;
  if (event.target.matches?.('button')) return event.target;
  return event.target.closest?.('button');
}

function setActionLocked(button, locked) {
  if (!button) return;
  if (locked) {
    button.dataset.actionLocked = "true";
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    button.classList.add("is-action-locked");
  } else {
    delete button.dataset.actionLocked;
    button.disabled = false;
    button.removeAttribute("aria-busy");
    button.classList.remove("is-action-locked");
  }
}

function waitForBusyOverlayPaint() {
  return new Promise(resolve => {
    if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
    } else {
      setTimeout(resolve, 0);
    }
  });
}

function waitMilliseconds(ms) {
  return new Promise(resolve => window.setTimeout(resolve, Math.max(0, Number(ms) || 0)));
}

async function keepBusyOverlayVisibleSince(startedAt, minVisibleMs = 750) {
  const elapsed = Date.now() - Number(startedAt || Date.now());
  const remaining = Math.max(0, Number(minVisibleMs || 0) - elapsed);
  if (remaining > 0) await waitMilliseconds(remaining);
}

function withActionLock(handler) {
  return async function actionLockWrapper(event) {
    const button = getActionLockButton(event) || this?.querySelector?.('button[type="submit"], .btn-primary, .btn-danger, button');
    if (button?.dataset?.actionLocked === "true" || globalActionLockDepth > 0) {
      event?.preventDefault?.();
      event?.stopImmediatePropagation?.();
      event?.stopPropagation?.();
      return;
    }

    beginGlobalActionLock();
    setActionLocked(button, true);
    try {
      // Geef de browser eerst tijd om de overlay écht te tekenen.
      // Zonder deze paint-pauze zijn korte/medium acties soms klaar vóór de gebruiker iets ziet,
      // terwijl interactie in die fractie toch nog mogelijk voelt.
      await waitForBusyOverlayPaint();
      return await handler.call(this, event);
    } finally {
      setActionLocked(button, false);
      endGlobalActionLock();
    }
  };
}

async function runWithGlobalActionBusy(work) {
  beginGlobalActionLock();
  try {
    // Forceer de busy-overlay onmiddellijk zichtbaar.
    // Dit is nodig bij flows met eerst een bevestigingsdialoog (bv. privé-afspraak verwijderen),
    // omdat de overlay anders soms pas na de effectieve delete wordt getekend.
    setGlobalActionBusyVisible(true);
    await waitForBusyOverlayPaint();
    return await work();
  } finally {
    endGlobalActionLock();
  }
}

function wrapSupabaseWriteThenableWithBusy(query) {
  if (!query || query.__nailbookerBusyWrapped) return query;
  const originalThen = typeof query.then === "function" ? query.then.bind(query) : null;
  if (!originalThen) return query;

  Object.defineProperty(query, "__nailbookerBusyWrapped", { value: true, configurable: true });
  query.then = function nailbookerBusyThen(onFulfilled, onRejected) {
    beginGlobalActionLock();
    return originalThen(
      value => {
        endGlobalActionLock();
        return typeof onFulfilled === "function" ? onFulfilled(value) : value;
      },
      error => {
        endGlobalActionLock();
        if (typeof onRejected === "function") return onRejected(error);
        throw error;
      }
    );
  };
  return query;
}

function installSupabaseWriteBusyPatch() {
  if (typeof supabaseClient === "undefined" || !supabaseClient || supabaseClient.__nailbookerBusyPatchInstalled) return;

  const originalFrom = typeof supabaseClient.from === "function" ? supabaseClient.from.bind(supabaseClient) : null;
  if (originalFrom) {
    supabaseClient.from = function nailbookerBusyFrom(...args) {
      const builder = originalFrom(...args);
      ["insert", "update", "upsert", "delete"].forEach(methodName => {
        if (!builder || typeof builder[methodName] !== "function" || builder[methodName].__nailbookerBusyPatched) return;
        const originalMethod = builder[methodName].bind(builder);
        const patchedMethod = function nailbookerBusyWriteMethod(...methodArgs) {
          return wrapSupabaseWriteThenableWithBusy(originalMethod(...methodArgs));
        };
        Object.defineProperty(patchedMethod, "__nailbookerBusyPatched", { value: true });
        builder[methodName] = patchedMethod;
      });
      return builder;
    };
  }

  if (supabaseClient.auth && typeof supabaseClient.auth.updateUser === "function") {
    const originalUpdateUser = supabaseClient.auth.updateUser.bind(supabaseClient.auth);
    supabaseClient.auth.updateUser = (...args) => runWithGlobalActionBusy(() => originalUpdateUser(...args));
  }

  Object.defineProperty(supabaseClient, "__nailbookerBusyPatchInstalled", { value: true, configurable: true });
}

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
	installSupabaseWriteBusyPatch();
	await initAppData();
	registerEvents();
	await syncAuthUI();
	rerenderAll();
	await syncNotificationState();

  const user = await getCurrentUser();

  setupAppBrowserBackNavigation();

  if (user) {
    switchScreen("agendaScreen", t("agenda"), { replaceHistory: true });
  } else {
    switchScreen("accountScreen", t("account"), { replaceHistory: true });
  }
}



/* =========================================================
   AGENDA: MAANDKALENDER <-> DAGKALENDER
   Dagweergave met uurindeling zoals een compacte Google Calendar.
========================================================= */
(function installAgendaDayCalendarMode() {
  const HOUR_HEIGHT = 56;
  const AGENDA_DAY_LINE_OFFSET = 10;
  const START_SCROLL_HOUR = 8;

  if (!state) return;
  if (!state.agendaCalendarMode) state.agendaCalendarMode = "month";
  function agendaDayVisualTop(minutes) {
    const safeMinutes = Math.max(0, Math.min(24 * 60, Number(minutes) || 0));
    if (safeMinutes >= 24 * 60) return 24 * HOUR_HEIGHT;
    return (safeMinutes / 60) * HOUR_HEIGHT + AGENDA_DAY_LINE_OFFSET;
  }

  function agendaDayVisualHeight(startMinutes, endMinutes) {
    const safeStart = Math.max(0, Math.min(24 * 60, Number(startMinutes) || 0));
    const safeEnd = Math.max(safeStart, Math.min(24 * 60, Number(endMinutes) || safeStart));
    return Math.max(1, agendaDayVisualTop(safeEnd) - agendaDayVisualTop(safeStart));
  }


  const originalRenderCalendar = renderCalendar;
  const originalRenderAgendaList = renderAgendaList;
  const originalRegisterEvents = registerEvents;
  const originalJumpToToday = jumpToToday;

  function getSelectedDateObject() {
    const d = new Date(String(state.selectedDate || todayStr) + "T00:00:00");
    return Number.isNaN(d.getTime()) ? new Date(todayStr + "T00:00:00") : d;
  }

  function clampAgendaDayScrollTop(scroll, value) {
    if (!scroll) return 0;
    const maxScrollTop = Math.max(0, scroll.scrollHeight - scroll.clientHeight);
    return Math.max(0, Math.min(Number(value) || 0, maxScrollTop));
  }

  function preferredAgendaDayScrollTop(scroll, dateStr = state.selectedDate) {
    if (!scroll) return 0;
    if (dateStr === todayStr) {
      const now = new Date();
      const minutes = (now.getHours() * 60) + now.getMinutes();
      return clampAgendaDayScrollTop(scroll, agendaDayVisualTop(minutes) - (scroll.clientHeight / 2));
    }
    return clampAgendaDayScrollTop(scroll, START_SCROLL_HOUR * HOUR_HEIGHT);
  }

  function applyAgendaDayScrollPosition(scroll, wrap, dateStr = state.selectedDate) {
    if (!scroll) return;

    const forceDefault = Boolean(state.agendaDayForceDefaultScroll);
    const restoreScrollTop = Number(state.agendaDayRestoreScrollTop);

    if (!forceDefault && Number.isFinite(restoreScrollTop) && restoreScrollTop >= 0) {
      scroll.scrollTop = clampAgendaDayScrollTop(scroll, restoreScrollTop);
      if (wrap) wrap.dataset.userScrolled = "1";
      return;
    }

    if (forceDefault || !wrap?.dataset.userScrolled) {
      scroll.scrollTop = preferredAgendaDayScrollTop(scroll, dateStr);
      if (wrap && forceDefault) wrap.dataset.userScrolled = "1";
    }
  }

  function setAgendaCalendarMode(mode) {
    const nextMode = mode === "day" ? "day" : "month";
    if (nextMode === "day") {
      state.agendaDayForceDefaultScroll = true;
      delete state.agendaDayRestoreScrollTop;
      const existingWrap = document.getElementById("agendaDayCalendar");
      if (existingWrap) delete existingWrap.dataset.userScrolled;
    }
    state.agendaCalendarMode = nextMode;
    document.body.classList.toggle("agenda-day-mode", nextMode === "day");
    closeAgendaFabMenu?.();
    renderCalendar();
    renderAgendaList();

    window.setTimeout(() => {
      state.agendaCalendarMode = nextMode;
      document.body.classList.toggle("agenda-day-mode", nextMode === "day");
      updateAgendaCalendarModeUi();
    }, 0);
  }

  function ensureAgendaCalendarToggle() {
    const panel = document.querySelector("#agendaScreen .calendar-panel");
    if (!panel) return null;

    let toggle = document.getElementById("agendaCalendarModeToggle");
    if (!toggle) {
      toggle = document.createElement("button");
      toggle.id = "agendaCalendarModeToggle";
      toggle.type = "button";
      toggle.className = "agenda-calendar-mode-toggle";
      toggle.setAttribute("aria-label", "Wissel tussen maandkalender en dagkalender");
      toggle.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        const now = Date.now();
        const lastSwipe = Number(state.agendaDayLastSwipeAt || 0);
        if (now - lastSwipe < 180) return;

        closeAgendaFabMenu?.();
        const isDayMode = state.agendaCalendarMode === "day" || document.body.classList.contains("agenda-day-mode");
        setAgendaCalendarMode(isDayMode ? "month" : "day");
      }, true);
      panel.appendChild(toggle);
    }

    toggle.innerHTML = state.agendaCalendarMode === "day"
      ? '<span class="agenda-calendar-toggle-chevrons is-down"><span>›</span><span>›</span></span>'
      : '<span class="agenda-calendar-toggle-chevrons is-up"><span>›</span><span>›</span></span>';

    return toggle;
  }

  function ensureAgendaDayCalendar() {
    const panel = document.querySelector("#agendaScreen .calendar-panel");
    if (!panel) return null;

    let wrap = document.getElementById("agendaDayCalendar");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "agendaDayCalendar";
      wrap.className = "agenda-day-calendar";
      wrap.addEventListener("click", () => closeAgendaFabMenu?.());
      panel.insertBefore(wrap, document.getElementById("agendaCalendarModeToggle") || null);
    }

    return wrap;
  }

  function setMonthHeaderForDayMode() {
    const title = document.getElementById("monthPickerBtn");
    if (!title) return;
    const d = getSelectedDateObject();
    title.textContent = new Intl.DateTimeFormat(getCurrentLanguage(), {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(d);
  }

  function minutesForDayView(appointment) {
    const dateStr = state.selectedDate;
    if (isPrivateAppointment(appointment)) {
      const bounds = getPrivateRangeBounds(appointment);
      const start = minutesFromTimeString(appointment.time || "00:00");
      const end = minutesFromTimeString(appointment.privateEndTime || appointment.private_end_time || appointment.time || "00:00");
      if (bounds.end > bounds.start) {
        if (dateStr === bounds.start) return { start: start, end: 24 * 60 };
        if (dateStr === bounds.end) return { start: 0, end: Math.max(end, 30) };
        return { start: 0, end: 24 * 60 };
      }
      return { start, end: Math.max(end, start + 30) };
    }

    // Dagkalender: het visuele blok moet exact lopen van beginuur tot het
    // einduur dat ook in het blok wordt getoond. Daarom gebruiken we dezelfde
    // berekening als getAppointmentDisplayEndTime(), inclusief standaardpauze.
    const range = appointmentTimeRange(appointment, Number(getSettings().defaultBreakMinutes || 0));
    const start = Math.max(0, Math.min(24 * 60, range.startMinutes));
    const end = Math.max(start + 15, Math.min(24 * 60, range.endMinutes));
    return { start, end };
  }


  function isPinnedFullDayPrivateForDayView(appointment) {
    if (!isPrivateAppointment(appointment)) return false;
    const bounds = getPrivateRangeBounds(appointment);
    if (bounds.end <= bounds.start) return false;
    const currentDate = state.selectedDate;
    return currentDate > bounds.start && currentDate < bounds.end;
  }

  function assignOverlapColumns(items) {
    const sorted = items
      .slice()
      .sort((a, b) => a.range.start - b.range.start || a.range.end - b.range.end);

    const groups = [];
    let current = [];
    let groupEnd = -1;

    sorted.forEach(item => {
      if (!current.length || item.range.start < groupEnd) {
        current.push(item);
        groupEnd = Math.max(groupEnd, item.range.end);
      } else {
        groups.push(current);
        current = [item];
        groupEnd = item.range.end;
      }
    });
    if (current.length) groups.push(current);

    groups.forEach(group => {
      const activeColumns = [];
      group.forEach(item => {
        let columnIndex = activeColumns.findIndex(end => end <= item.range.start);
        if (columnIndex === -1) {
          columnIndex = activeColumns.length;
        }
        activeColumns[columnIndex] = item.range.end;
        item.columnIndex = columnIndex;
      });

      const columnCount = Math.max(1, ...group.map(item => item.columnIndex + 1));
      group.forEach(item => {
        item.columnCount = columnCount;
      });
    });

    return sorted;
  }


  function buildAgendaDayCalendarMarkupForDate(dateStr) {
    const previousSelectedDate = state.selectedDate;
    state.selectedDate = dateStr;

    try {
      const data = getData();
      const appts = getAppointmentsForDate(dateStr, data);
      const totalHeight = 24 * HOUR_HEIGHT;

      const hourRows = Array.from({ length: 24 }, (_, hour) => `
        <div class="agenda-day-hour-row" style="height:${HOUR_HEIGHT}px">
          <div class="agenda-day-hour-label">${String(hour).padStart(2, "0")}:00</div>
          <div class="agenda-day-hour-line"></div>
        </div>
      `).join("");

      const pinnedPrivateAppointments = appts.filter(isPinnedFullDayPrivateForDayView);
      const timedAppointments = assignOverlapColumns(appts
        .filter(app => !isPinnedFullDayPrivateForDayView(app))
        .map(app => ({ app, range: minutesForDayView(app) })));

      const pinnedBlocks = pinnedPrivateAppointments.map(app => {
        const displayTime = getPrivateAgendaDisplayTime(app, dateStr);
        const title = app.privateTitle || "Privé";
        const sub = app.privateDetails || "Privé-afspraak";
        return `
          <button class="agenda-day-pinned-private appointment-card" type="button" data-appointment-id="${htmlEscape(String(app.sourceAppointmentId || app.id))}">
            <div class="agenda-day-appointment-row appointment-row">
              <div class="time-block">
                <span class="time">${htmlEscape(displayTime.main)}</span>
                <span class="time-end">${htmlEscape(displayTime.sub)}</span>
              </div>
              <div class="agenda-day-appointment-main">
                <div class="main-name">${htmlEscape(title)}</div>
                <div class="meta">${htmlEscape(sub)}</div>
              </div>
            </div>
          </button>
        `;
      }).join("");

      const appointmentBlocks = timedAppointments.map(item => {
        const app = item.app;
        const privateApp = isPrivateAppointment(app);
        const customer = customerById(data, app.customerId);
        const service = serviceById(data, app.serviceId);
        const range = item.range;
        const top = agendaDayVisualTop(range.start);
        const height = agendaDayVisualHeight(range.start, range.end);
        const columnWidth = 100 / Math.max(1, item.columnCount || 1);
        const left = (item.columnIndex || 0) * columnWidth;
        const width = columnWidth;
        const displayTime = privateApp ? getPrivateAgendaDisplayTime(app, dateStr) : {
          main: String(app.time || "00:00").slice(0, 5),
          sub: `tot ${getAppointmentDisplayEndTime(app, Number(getSettings().defaultBreakMinutes || 0))}`
        };
        const title = privateApp
          ? (app.privateTitle || "Privé")
          : (customer ? fullName(customer) : "Onbekend");
        const sub = privateApp
          ? (app.privateDetails || "Privé-afspraak")
          : [service?.name || "", app.paid ? paymentMethodNameForAppointment(app, data) : ""].filter(Boolean).join(" · ");
        const amount = privateApp ? "" : euro(app.price || 0, app.currency || getCurrentCurrency());
        const paidClass = !privateApp && app.paid ? " paid" : "";
        const noShowClass = !privateApp && String(app.status || "").toLowerCase() === "no-show" ? " no-show" : "";
        const realId = htmlEscape(String(app.sourceAppointmentId || app.id));
        return `
          <button class="agenda-day-appointment appointment-card${privateApp ? " private" : " normal"}" type="button" data-appointment-id="${realId}" data-private="${privateApp ? "1" : "0"}" style="top:${top}px;height:${height}px;left:${left}%;width:calc(${width}% - 4px)">
            <div class="agenda-day-appointment-row appointment-row">
              <div class="time-block">
                <span class="time">${htmlEscape(displayTime.main)}</span>
                <span class="time-end">${htmlEscape(displayTime.sub)}</span>
              </div>
              <div class="agenda-day-appointment-main">
                <div class="main-name">${htmlEscape(title)}</div>
                <div class="meta">${htmlEscape(sub)}</div>
              </div>
              ${privateApp ? "" : `<span class="price-chip${paidClass}${noShowClass}" data-day-payment-chip="1" data-id="${realId}" data-appointment-id="${realId}">${htmlEscape(amount)}</span>`}
            </div>
          </button>
        `;
      }).join("");

      return `
        ${pinnedBlocks ? `<div class="agenda-day-pinned-private-wrap">${pinnedBlocks}</div>` : ""}
        <div class="agenda-day-scroll">
          <div class="agenda-day-grid" style="height:${totalHeight}px">
            ${hourRows}
            ${dateStr === todayStr ? `<div class="agenda-day-now-line" style="top:${agendaDayVisualTop(new Date().getHours() * 60 + new Date().getMinutes())}px"><span></span></div>` : ""}
            <div class="agenda-day-appointments-layer">${appointmentBlocks}</div>
          </div>
        </div>
      `;
    } finally {
      state.selectedDate = previousSelectedDate;
    }
  }

  function renderAgendaDayCalendar() {
    const wrap = ensureAgendaDayCalendar();
    if (!wrap) return;

    // Bewaar de huidige scrollpositie vóór de dagkalender opnieuw wordt opgebouwd.
    // renderCalendar() en renderAgendaList() kunnen kort na elkaar renderAgendaDayCalendar()
    // aanroepen. Zonder deze buffer kan de tweede render de herstelde positie opnieuw
    // verliezen, waardoor de dagkalender na een swipe terug naar 00:00 springt.
    const existingDayScroll = wrap.querySelector(".agenda-day-scroll");
    const existingScrollTop = existingDayScroll ? existingDayScroll.scrollTop : null;
    if (
      !state.agendaDayForceDefaultScroll &&
      existingDayScroll &&
      wrap.dataset.userScrolled === "1" &&
      !Number.isFinite(Number(state.agendaDayRestoreScrollTop)) &&
      Number.isFinite(existingScrollTop)
    ) {
      state.agendaDayRestoreScrollTop = existingScrollTop;
    }

    const data = getData();
    const appts = getAppointmentsForDate(state.selectedDate, data);
    const totalHeight = 24 * HOUR_HEIGHT;

    const hourRows = Array.from({ length: 24 }, (_, hour) => `
      <div class="agenda-day-hour-row" style="height:${HOUR_HEIGHT}px">
        <div class="agenda-day-hour-label">${String(hour).padStart(2, "0")}:00</div>
        <div class="agenda-day-hour-line"></div>
      </div>
    `).join("");

    const pinnedPrivateAppointments = appts.filter(isPinnedFullDayPrivateForDayView);
    const timedAppointments = assignOverlapColumns(appts
      .filter(app => !isPinnedFullDayPrivateForDayView(app))
      .map(app => ({ app, range: minutesForDayView(app) })));

    const pinnedBlocks = pinnedPrivateAppointments.map(app => {
      const displayTime = getPrivateAgendaDisplayTime(app, state.selectedDate);
      const title = app.privateTitle || "Privé";
      const sub = app.privateDetails || "Privé-afspraak";
      return `
        <button class="agenda-day-pinned-private appointment-card" type="button" data-appointment-id="${htmlEscape(String(app.sourceAppointmentId || app.id))}">
          <div class="agenda-day-appointment-row appointment-row">
            <div class="time-block">
              <span class="time">${htmlEscape(displayTime.main)}</span>
              <span class="time-end">${htmlEscape(displayTime.sub)}</span>
            </div>
            <div class="agenda-day-appointment-main">
              <div class="main-name">${htmlEscape(title)}</div>
              <div class="meta">${htmlEscape(sub)}</div>
            </div>
          </div>
        </button>
      `;
    }).join("");

    const appointmentBlocks = timedAppointments.map(item => {
      const app = item.app;
      const privateApp = isPrivateAppointment(app);
      const customer = customerById(data, app.customerId);
      const service = serviceById(data, app.serviceId);
      const range = item.range;
      const top = agendaDayVisualTop(range.start);
      const height = agendaDayVisualHeight(range.start, range.end);
      const columnWidth = 100 / Math.max(1, item.columnCount || 1);
      const left = (item.columnIndex || 0) * columnWidth;
      const width = columnWidth;
      const displayTime = privateApp ? getPrivateAgendaDisplayTime(app, state.selectedDate) : {
        main: String(app.time || "00:00").slice(0, 5),
        sub: `tot ${getAppointmentDisplayEndTime(app, Number(getSettings().defaultBreakMinutes || 0))}`
      };
      const title = privateApp
        ? (app.privateTitle || "Privé")
        : (customer ? fullName(customer) : "Onbekend");
      const sub = privateApp
        ? (app.privateDetails || "Privé-afspraak")
        : [service?.name || "", app.paid ? paymentMethodNameForAppointment(app, data) : ""].filter(Boolean).join(" · ");
      const amount = privateApp ? "" : euro(app.price || 0, app.currency || getCurrentCurrency());
      const paidClass = !privateApp && app.paid ? " paid" : "";
      const noShowClass = !privateApp && String(app.status || "").toLowerCase() === "no-show" ? " no-show" : "";
      const realId = htmlEscape(String(app.sourceAppointmentId || app.id));
      return `
        <button class="agenda-day-appointment appointment-card${privateApp ? " private" : " normal"}" type="button" data-appointment-id="${realId}" data-private="${privateApp ? "1" : "0"}" style="top:${top}px;height:${height}px;left:${left}%;width:calc(${width}% - 4px)">
          <div class="agenda-day-appointment-row appointment-row">
            <div class="time-block">
              <span class="time">${htmlEscape(displayTime.main)}</span>
              <span class="time-end">${htmlEscape(displayTime.sub)}</span>
            </div>
            <div class="agenda-day-appointment-main">
              <div class="main-name">${htmlEscape(title)}</div>
              <div class="meta">${htmlEscape(sub)}</div>
            </div>
            ${privateApp ? "" : `<span class="price-chip${paidClass}${noShowClass}" data-day-payment-chip="1" data-id="${realId}" data-appointment-id="${realId}">${htmlEscape(amount)}</span>`}
          </div>
        </button>
      `;
    }).join("");

    wrap.classList.toggle("has-pinned-private-day", pinnedPrivateAppointments.length > 0);
    wrap.innerHTML = `
      ${pinnedBlocks ? `<div class="agenda-day-pinned-private-wrap">${pinnedBlocks}</div>` : ""}
      <button class="agenda-day-hidden-nav agenda-day-hidden-nav-top hidden" type="button" aria-label="Toon eerdere verborgen afspraken">...</button>
      <div class="agenda-day-scroll">
        <div class="agenda-day-grid" style="height:${totalHeight}px">
          ${hourRows}
          ${state.selectedDate === todayStr ? `<div class="agenda-day-now-line" style="top:${agendaDayVisualTop(new Date().getHours() * 60 + new Date().getMinutes())}px"><span></span></div>` : ""}
          <div class="agenda-day-appointments-layer">${appointmentBlocks}</div>
        </div>
      </div>
      <button class="agenda-day-hidden-nav agenda-day-hidden-nav-bottom hidden" type="button" aria-label="Toon latere verborgen afspraken">...</button>
    `;

    const dayScroll = wrap.querySelector(".agenda-day-scroll");
    const hiddenTopBtn = wrap.querySelector(".agenda-day-hidden-nav-top");
    const hiddenBottomBtn = wrap.querySelector(".agenda-day-hidden-nav-bottom");

    // Meteen scrollen, niet pas in een setTimeout. Zo verschijnt de dagkalender
    // bij openen en tijdens swipen direct op het juiste uur, zonder 00:00-flits.
    applyAgendaDayScrollPosition(dayScroll, wrap, state.selectedDate);

    const getVisibleDayAppointmentButtons = () => Array.from(wrap.querySelectorAll(".agenda-day-scroll .agenda-day-appointment"));

    const updateAgendaDayHiddenNavButtons = () => {
      if (!dayScroll || !hiddenTopBtn || !hiddenBottomBtn) return;

      const appointments = getVisibleDayAppointmentButtons();
      const scrollTop = dayScroll.scrollTop;
      const viewportBottom = scrollTop + dayScroll.clientHeight;
      const tolerance = 6;

      const hasHiddenAbove = appointments.some(button => (button.offsetTop + button.offsetHeight) < (scrollTop + tolerance));
      const hasHiddenBelow = appointments.some(button => button.offsetTop > (viewportBottom - tolerance));

      hiddenTopBtn.classList.toggle("hidden", !hasHiddenAbove);
      hiddenBottomBtn.classList.toggle("hidden", !hasHiddenBelow);
    };

    const scrollToNearestHiddenAppointment = direction => {
      if (!dayScroll) return;

      const appointments = getVisibleDayAppointmentButtons()
        .map(button => ({ button, top: button.offsetTop, bottom: button.offsetTop + button.offsetHeight }))
        .sort((a, b) => a.top - b.top);

      const scrollTop = dayScroll.scrollTop;
      const viewportBottom = scrollTop + dayScroll.clientHeight;
      const target = direction < 0
        ? appointments.filter(item => item.bottom < scrollTop + 6).pop()
        : appointments.find(item => item.top > viewportBottom - 6);

      if (!target) return;

      dayScroll.scrollTo({
        top: Math.max(0, target.top - 10),
        behavior: "smooth"
      });
    };

    [hiddenTopBtn, hiddenBottomBtn].forEach((button, index) => {
      if (!button) return;
      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation?.();
        closeAgendaFabMenu?.();
        scrollToNearestHiddenAppointment(index === 0 ? -1 : 1);
      });
    });

    if (dayScroll) {
      dayScroll.addEventListener("scroll", () => {
        wrap.dataset.userScrolled = "1";
        updateAgendaDayHiddenNavButtons();
      }, { passive: true });
      window.setTimeout(updateAgendaDayHiddenNavButtons, 0);
    }

    wrap.querySelectorAll(".agenda-day-appointment, .agenda-day-pinned-private").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        closeAgendaFabMenu?.();
        const id = button.dataset.appointmentId;
        const app = getAppointmentsForDate(state.selectedDate, getData()).find(item => String(item.id) === String(id) || String(item.sourceAppointmentId || "") === String(id));
        if (!app) return;

        const paymentChip = event.target?.closest?.("[data-day-payment-chip]");
        if (paymentChip && !isPrivateAppointment(app)) {
          if (typeof openPaymentDialog === "function") {
            openPaymentDialog(app.sourceAppointmentId || app.id, paymentChip);
            return;
          }
        }

        if (typeof openAppointmentActionPopover === "function") {
          openAppointmentActionPopover(app.sourceAppointmentId || app.id, button);
        } else {
          openEditAppointmentDialog(app.sourceAppointmentId || app.id);
        }
      });
    });

    if (!wrap.dataset.daySwipeBound) {
      wrap.dataset.daySwipeBound = "1";
      let touchStartX = 0;
      let touchStartY = 0;
      let lastX = 0;
      let tracking = false;
      let horizontal = false;
      let daySwipePreview = null;
      let daySwipeStep = 0;
      let swipeLock = false;
      let suppressDayClick = false;
      let suppressDayClickTimer = null;
      const intentThreshold = 10;
      const commitThreshold = 54;

      const getDayWrap = () => document.getElementById("agendaDayCalendar");

      const clearDaySwipe = () => {
        const dayWrap = getDayWrap();
        if (daySwipePreview) {
          daySwipePreview.remove();
          daySwipePreview = null;
        }
        daySwipeStep = 0;
        if (dayWrap) {
          dayWrap.classList.remove("is-day-swiping", "is-day-swipe-animating");
          dayWrap.style.removeProperty("--agenda-day-current-x");
          dayWrap.style.removeProperty("--agenda-day-preview-x");
          dayWrap.style.removeProperty("--agenda-day-preview-opacity");
        }
      };

      const resetDaySwipeTracking = () => {
        tracking = false;
        horizontal = false;
        touchStartX = 0;
        touchStartY = 0;
        lastX = 0;
      };

      const ensureDaySwipePreview = dx => {
        const dayWrap = getDayWrap();
        if (!dayWrap) return false;
        const step = dx < 0 ? 1 : -1;
        if (daySwipePreview && daySwipeStep === step) return true;

        if (daySwipePreview) daySwipePreview.remove();
        daySwipeStep = step;

        const d = getSelectedDateObject();
        d.setDate(d.getDate() + step);
        const targetDate = formatDateInput(d);

        daySwipePreview = document.createElement("div");
        daySwipePreview.className = "agenda-day-swipe-preview";
        daySwipePreview.innerHTML = buildAgendaDayCalendarMarkupForDate(targetDate);
        daySwipePreview.querySelectorAll("[id]").forEach(el => el.removeAttribute("id"));
        daySwipePreview.querySelectorAll("button").forEach(button => {
          button.setAttribute("tabindex", "-1");
          button.setAttribute("aria-hidden", "true");
        });

        const currentScroll = dayWrap.querySelector(".agenda-day-scroll")?.scrollTop || 0;
        const previewScroll = daySwipePreview.querySelector(".agenda-day-scroll");

        dayWrap.appendChild(daySwipePreview);
        if (previewScroll) previewScroll.scrollTop = clampAgendaDayScrollTop(previewScroll, currentScroll);
        dayWrap.classList.remove("is-day-swipe-animating");
        dayWrap.classList.add("is-day-swiping");
        return true;
      };

      const updateDaySwipePosition = dx => {
        const dayWrap = getDayWrap();
        if (!dayWrap || !ensureDaySwipePreview(dx)) return false;
        const width = dayWrap.clientWidth || window.innerWidth || 360;
        const limitedDx = Math.max(-width, Math.min(width, dx));
        const previewStart = daySwipeStep > 0 ? width : -width;
        const progress = Math.min(1, Math.abs(limitedDx) / Math.max(width, 1));
        dayWrap.style.setProperty("--agenda-day-current-x", `${limitedDx}px`);
        dayWrap.style.setProperty("--agenda-day-preview-x", `${previewStart + limitedDx}px`);
        dayWrap.style.setProperty("--agenda-day-preview-opacity", String(0.45 + (progress * 0.55)));
        return true;
      };

      const finishDaySwipe = commit => {
        const dayWrap = getDayWrap();
        const step = daySwipeStep;
        if (!dayWrap || !daySwipePreview || !step) {
          clearDaySwipe();
          swipeLock = false;
          return;
        }

        const width = dayWrap.clientWidth || window.innerWidth || 360;
        let settled = false;
        dayWrap.classList.remove("is-day-swiping");
        dayWrap.classList.add("is-day-swipe-animating");

        if (commit) {
          dayWrap.style.setProperty("--agenda-day-current-x", `${step > 0 ? -width : width}px`);
          dayWrap.style.setProperty("--agenda-day-preview-x", "0px");
          dayWrap.style.setProperty("--agenda-day-preview-opacity", "1");
        } else {
          dayWrap.style.setProperty("--agenda-day-current-x", "0px");
          dayWrap.style.setProperty("--agenda-day-preview-x", `${step > 0 ? width : -width}px`);
          dayWrap.style.setProperty("--agenda-day-preview-opacity", "0.45");
        }

        const done = () => {
          if (settled) return;
          settled = true;
          dayWrap.removeEventListener("transitionend", onTransitionEnd);

          if (commit) {
            state.agendaDayLastSwipeAt = Date.now();
            state.agendaCalendarMode = "day";
            document.body.classList.add("agenda-day-mode");
            closeAgendaFabMenu?.();
            const preservedDayScrollTop = dayWrap.querySelector(".agenda-day-scroll")?.scrollTop;
            if (Number.isFinite(preservedDayScrollTop)) {
              state.agendaDayRestoreScrollTop = preservedDayScrollTop;
            }
            clearDaySwipe();
            shiftSelectedDay(step);
            window.setTimeout(() => {
              state.agendaCalendarMode = "day";
              document.body.classList.add("agenda-day-mode");
              updateAgendaCalendarModeUi();
              swipeLock = false;
            }, 0);
          } else {
            clearDaySwipe();
            swipeLock = false;
          }
        };

        const onTransitionEnd = event => {
          if (event.propertyName !== "transform") return;
          const target = event.target;
          if (target !== dayWrap && !target.closest?.("#agendaDayCalendar")) return;
          done();
        };

        dayWrap.addEventListener("transitionend", onTransitionEnd);
        window.setTimeout(done, 260);
      };

      wrap.addEventListener("touchstart", event => {
        const touch = event.touches?.[0];
        if (!touch || swipeLock) return;

        // Laat swipen ook toe wanneer de vinger start op een afspraakblok.
        // Op dagen met een grote afspraak bedekt dat blok bijna de volledige dagkalender;
        // een algemene button-blokkering zorgde er dan voor dat de swipe nooit startte.
        if (event.target.closest("input, select, textarea, dialog, #agendaCalendarModeToggle")) return;
        if (state.agendaCalendarMode !== "day") return;

        tracking = true;
        horizontal = false;
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        lastX = touchStartX;
      }, { passive: true });

      wrap.addEventListener("touchmove", event => {
        if (!tracking || event.touches.length !== 1) return;
        const touch = event.touches[0];
        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        if (!horizontal) {
          if (absX < intentThreshold && absY < intentThreshold) return;
          if (absY > absX) {
            resetDaySwipeTracking();
            clearDaySwipe();
            return;
          }
          horizontal = true;
          closeAgendaFabMenu?.();
        }

        if (updateDaySwipePosition(dx)) {
          event.preventDefault();
          event.stopPropagation();
          lastX = touch.clientX;
        }
      }, { passive: false });

      wrap.addEventListener("touchend", event => {
        if (!tracking || !horizontal) {
          resetDaySwipeTracking();
          clearDaySwipe();
          return;
        }

        const endX = event.changedTouches?.[0]?.clientX ?? lastX;
        const dx = endX - touchStartX;
        const dayWrap = getDayWrap();
        const width = dayWrap?.clientWidth || window.innerWidth || 360;
        const dynamicThreshold = Math.min(commitThreshold, Math.max(38, width * 0.14));
        const commit = Math.abs(dx) >= dynamicThreshold;

        if (commit && daySwipeStep !== (dx < 0 ? 1 : -1)) {
          ensureDaySwipePreview(dx);
        }

        resetDaySwipeTracking();
        event.preventDefault();
        event.stopPropagation();
        swipeLock = true;

        if (commit) {
          suppressDayClick = true;
          window.clearTimeout(suppressDayClickTimer);
          suppressDayClickTimer = window.setTimeout(() => {
            suppressDayClick = false;
          }, 380);
        }

        finishDaySwipe(commit);
      }, { passive: false });

      wrap.addEventListener("click", event => {
        if (!suppressDayClick) return;
        suppressDayClick = false;
        window.clearTimeout(suppressDayClickTimer);
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation?.();
      }, true);

      wrap.addEventListener("touchcancel", () => {
        resetDaySwipeTracking();
        swipeLock = true;
        finishDaySwipe(false);
      }, { passive: true });
    }

    window.setTimeout(() => {
      const scroll = wrap.querySelector(".agenda-day-scroll");
      if (!scroll) return;

      applyAgendaDayScrollPosition(scroll, wrap, state.selectedDate);

      if (Number.isFinite(Number(state.agendaDayRestoreScrollTop))) {
        window.clearTimeout(state.agendaDayRestoreScrollTopClearTimer);
        state.agendaDayRestoreScrollTopClearTimer = window.setTimeout(() => {
          delete state.agendaDayRestoreScrollTop;
          delete state.agendaDayRestoreScrollTopClearTimer;
        }, 500);
      }

      if (state.agendaDayForceDefaultScroll) {
        delete state.agendaDayForceDefaultScroll;
      }
    }, 0);
  }

  function shiftSelectedDay(step) {
    const currentDayScrollTop = document.querySelector("#agendaDayCalendar .agenda-day-scroll")?.scrollTop;
    if (!Number.isFinite(Number(state.agendaDayRestoreScrollTop)) && Number.isFinite(currentDayScrollTop)) {
      state.agendaDayRestoreScrollTop = currentDayScrollTop;
    }

    const d = getSelectedDateObject();
    d.setDate(d.getDate() + step);
    state.selectedDate = formatDateInput(d);
    state.currentYear = d.getFullYear();
    state.currentMonth = d.getMonth();
    state.revenueSyncSelectedDateOnOpen = true;
    renderCalendar();
    renderAgendaList();
    renderRevenue();
  }

  function updateAgendaCalendarModeUi() {
    document.body.classList.toggle("agenda-day-mode", state.agendaCalendarMode === "day");
    ensureAgendaCalendarToggle();

    const dayCalendar = ensureAgendaDayCalendar();
    const weekdayRow = document.querySelector("#agendaScreen .weekday-row");
    const monthGrid = document.getElementById("calendarGrid");

    if (state.agendaCalendarMode === "day") {
      if (weekdayRow) weekdayRow.classList.add("hidden");
      if (monthGrid) monthGrid.classList.add("hidden");
      if (dayCalendar) dayCalendar.classList.remove("hidden");
      setMonthHeaderForDayMode();
      renderAgendaDayCalendar();
    } else {
      if (weekdayRow) weekdayRow.classList.remove("hidden");
      if (monthGrid) monthGrid.classList.remove("hidden");
      if (dayCalendar) dayCalendar.classList.add("hidden");
      const title = document.getElementById("monthPickerBtn");
      if (title) title.textContent = `${getMonthNameUpper(state.currentMonth)} ${state.currentYear}`;
    }
  }

  renderCalendar = function patchedRenderCalendar() {
    originalRenderCalendar();
    updateAgendaCalendarModeUi();
  };

  renderAgendaList = function patchedRenderAgendaList() {
    originalRenderAgendaList();
    if (state.agendaCalendarMode === "day") {
      renderAgendaDayCalendar();
    }
  };

  jumpToToday = function patchedJumpToToday() {
    originalJumpToToday();
    if (state.agendaCalendarMode === "day") {
      const d = getSelectedDateObject();
      state.currentYear = d.getFullYear();
      state.currentMonth = d.getMonth();
      renderCalendar();
      renderAgendaList();
    }
  };

  registerEvents = function patchedRegisterEvents() {
    originalRegisterEvents();

    document.getElementById("prevMonthBtn")?.addEventListener("click", event => {
      if (state.agendaCalendarMode !== "day") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      closeAgendaFabMenu?.();
      shiftSelectedDay(-1);
    }, true);

    document.getElementById("nextMonthBtn")?.addEventListener("click", event => {
      if (state.agendaCalendarMode !== "day") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      closeAgendaFabMenu?.();
      shiftSelectedDay(1);
    }, true);

    document.getElementById("monthPickerBtn")?.addEventListener("click", event => {
      if (state.agendaCalendarMode !== "day") return;
      closeAgendaFabMenu?.();
    }, true);

    document.querySelector("#agendaScreen .calendar-panel")?.addEventListener("click", () => {
      closeAgendaFabMenu?.();
    }, true);
  };
})();


startApp();
/* =========================
   ADMIN - geïntegreerd in app
========================= */
const adminState = {
  users: [],
  filtered: [],
  isLoaded: false,
  isLoading: false
};

function adminToast(message) {
  const toast = document.getElementById("adminToast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove("hidden");
  window.clearTimeout(adminToast._timer);
  adminToast._timer = window.setTimeout(() => toast.classList.add("hidden"), 3600);
}

function humanAdminError(error) {
  const msg = String(error?.message || error || "");
  if (msg === "Failed to fetch" || msg.includes("Failed to fetch")) {
    return "Kan de admin-functie niet bereiken. Controleer of de Supabase Edge Function 'admin-users' is gedeployed en CORS actief is.";
  }
  if (msg.includes("FunctionsHttpError")) return "De admin-functie gaf een fout terug. Controleer de Edge Function logs in Supabase.";
  if (msg.includes("Niet ingelogd")) return "Je bent niet ingelogd.";
  return msg || "Er ging iets mis.";
}

function escapeAdminHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  }[char]));
}

function formatAdminDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("nl-BE", { dateStyle: "short", timeStyle: "short" }).format(date);
}

function setAdminButtonBusy(button, busy, textWhenBusy = "Even geduld...") {
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

function setAdminEmptyState(message) {
  const list = document.getElementById("adminUsersList");
  if (list) list.innerHTML = `<div class="admin-empty-state">${escapeAdminHtml(message)}</div>`;
}

async function callAdminFunction(action, payload = {}) {
  if (!window.SUPABASE_URL || String(window.SUPABASE_URL).includes("VUL_HIER")) throw new Error("Supabase URL ontbreekt. Controleer supabase-client.js.");
  if (!supabaseClient) throw new Error("Supabase is niet geïnitialiseerd.");

  const { data: sessionData } = await supabaseClient.auth.getSession();
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

async function ensureAdminAccess() {
  const profile = await getCurrentProfile();
  updateAdminNavVisibility(profile);
  if (!profile?.is_admin) {
    throw new Error("Geen adminrechten voor dit account.");
  }
  return profile;
}

async function loadAdminUsers(force = false) {
  if (adminState.isLoading) return;
  if (adminState.isLoaded && !force) {
    applyAdminFilters();
    return;
  }

  const refreshBtn = document.getElementById("adminRefreshBtn");
  try {
    adminState.isLoading = true;
    setAdminButtonBusy(refreshBtn, true, "Laden...");
    setAdminEmptyState("Gebruikers laden...");
    await ensureAdminAccess();
    const result = await callAdminFunction("list");
    adminState.users = Array.isArray(result.users) ? result.users : [];
    adminState.isLoaded = true;
    applyAdminFilters();
  } catch (error) {
    setAdminEmptyState(humanAdminError(error));
    adminToast(humanAdminError(error));
  } finally {
    adminState.isLoading = false;
    setAdminButtonBusy(refreshBtn, false);
  }
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
      ? `<button class="btn btn-secondary" type="button" data-admin-action="unblock" data-user-id="${escapeAdminHtml(user.id)}">Deblokkeren</button>`
      : `<button class="btn btn-secondary" type="button" data-admin-action="block" data-user-id="${escapeAdminHtml(user.id)}">Blokkeren</button>`;
    return `
      <article class="admin-user-card">
        <div class="admin-user-card-main">
          <div class="admin-user-topline">
            <div>
              <div class="admin-user-name">${escapeAdminHtml(name)}</div>
              <div class="admin-user-email">${escapeAdminHtml(user.email || "-")}</div>
              <div class="admin-user-small">Aangemaakt: ${escapeAdminHtml(formatAdminDateTime(user.created_at))}</div>
            </div>
            <span class="admin-status-pill ${statusClass}">${statusText}</span>
          </div>
          <div class="admin-user-grid">
            <div class="admin-user-field"><span>Salon</span><strong>${escapeAdminHtml(user.salon_name || "-")}</strong></div>
            <div class="admin-user-field"><span>Locatie</span><strong>${escapeAdminHtml(location)}</strong></div>
            <div class="admin-user-field"><span>Tijdzone</span><strong>${escapeAdminHtml(user.timezone || "-")}</strong></div>
            <div class="admin-user-field"><span>Abonnement</span><strong>${escapeAdminHtml(plan)} · ${escapeAdminHtml(subStatus)}</strong></div>
            <div class="admin-user-field"><span>Gebruik</span><strong>${Number(user.appointments_count || 0)} afspraken</strong></div>
            <div class="admin-user-field"><span>Data</span><strong>${Number(user.customers_count || 0)} klanten · ${Number(user.errors_count || 0)} errors</strong></div>
          </div>
        </div>
        <div class="admin-actions">
          ${blockAction}
          <button class="btn btn-danger" type="button" data-admin-action="delete" data-user-id="${escapeAdminHtml(user.id)}">Verwijderen</button>
        </div>
      </article>`;
  }).join("");
}

async function blockAdminUser(userId) {
  const reason = window.prompt("Reden voor blokkering/pauzering?", "Misbruik of administratieve reden") || "";
  await callAdminFunction("block", { userId, reason });
  adminToast("Account geblokkeerd. Gegevens blijven bewaard.");
  adminState.isLoaded = false;
  await loadAdminUsers(true);
}

async function unblockAdminUser(userId) {
  await callAdminFunction("unblock", { userId });
  adminToast("Account opnieuw actief.");
  adminState.isLoaded = false;
  await loadAdminUsers(true);
}

async function deleteAdminUser(userId) {
  const user = adminState.users.find(item => String(item.id) === String(userId));
  const label = user?.email || userId;
  const confirmation = window.prompt(`Dit verwijdert ${label} volledig, inclusief geschiedenis. Typ VERWIJDEREN om te bevestigen.`);
  if (confirmation !== "VERWIJDEREN") return;
  await callAdminFunction("delete", { userId, reason: "Definitief verwijderd door admin" });
  adminToast("Account en bekende geschiedenis volledig verwijderd.");
  adminState.isLoaded = false;
  await loadAdminUsers(true);
}

function setupIntegratedAdminEvents() {
  document.getElementById("adminRefreshBtn")?.addEventListener("click", () => loadAdminUsers(true));
  document.getElementById("adminSearch")?.addEventListener("input", applyAdminFilters);
  document.getElementById("adminStatusFilter")?.addEventListener("change", applyAdminFilters);
  document.getElementById("adminUsersList")?.addEventListener("click", event => {
    const button = event.target.closest("button[data-admin-action]");
    if (!button) return;
    const action = button.dataset.adminAction;
    const userId = button.dataset.userId;
    const run = action === "block" ? blockAdminUser : action === "unblock" ? unblockAdminUser : deleteAdminUser;
    setAdminButtonBusy(button, true);
    run(userId).catch(error => adminToast(humanAdminError(error))).finally(() => setAdminButtonBusy(button, false));
  });
}

(function patchAdminScreenLoader() {
  setupIntegratedAdminEvents();
  const originalSwitchScreenForAdmin = switchScreen;
  switchScreen = function patchedAdminSwitchScreen(screenId, title, options = {}) {
    originalSwitchScreenForAdmin(screenId, title, options);
    if (state.currentScreen === "adminScreen") {
      loadAdminUsers(false);
    }
  };
})();
