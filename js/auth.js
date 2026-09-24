const data = window.eduAdaptData;

function showNotice(options) {
  if (typeof Swal === "undefined") {
    return Promise.resolve();
  }

  return Swal.fire({
    buttonsStyling: false,
    background: "#15151e",
    color: "#f7f7fb",
    confirmButtonColor: "#8b5cf6",
    customClass: {
      popup: "eduadapt-alert",
      confirmButton: "eduadapt-alert-button",
    },
    ...options,
  });
}

function setupRegistration() {
  const form = document.querySelector("#register-form");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim().toLowerCase();
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (password !== confirmPassword) {
      await showNotice({
        icon: "warning",
        title: "Passwords do not match",
        text: "Please check both password fields and try again.",
        confirmButtonText: "Try again",
      });
      return;
    }

    const users = data.getUsers();
    if (users.some((user) => user.email === email)) {
      await showNotice({
        icon: "warning",
        title: "Account already exists",
        text: "Use a different email or log in to your existing account.",
        confirmButtonText: "Try again",
      });
      return;
    }

    users.push({
      id: data.createId(),
      name,
      email,
      password,
      registeredAt: new Date().toISOString(),
      loginCount: 0,
      lastLogin: null,
    });
    data.saveUsers(users);
    data.clearSession();

    await showNotice({
      icon: "success",
      title: "Account created",
      text: `Welcome to EduAdapt AI, ${name}. Log in to start your learning journey.`,
      confirmButtonText: "Go to login",
    });

    window.location.href = "login.html";
  });
}

function setupLogin() {
  const form = document.querySelector("#login-form");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const email = formData.get("email").trim().toLowerCase();
    const password = formData.get("password");
    const users = data.getUsers();
    const user = users.find(
      (item) => item.email === email && item.password === password,
    );

    if (!user || user.email !== email || user.password !== password) {
      await showNotice({
        icon: "error",
        title: "Login unsuccessful",
        text: "Check your email and password, then try again.",
        confirmButtonText: "Try again",
      });
      return;
    }

    user.loginCount = (user.loginCount || 0) + 1;
    user.lastLogin = new Date().toISOString();
    data.saveUsers(users);
    data.saveSession({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    await showNotice({
      icon: "success",
      title: "Welcome back",
      text: `You are now signed in, ${user.name}.`,
      timer: 1300,
      showConfirmButton: false,
    });

    window.location.href = getLoginRedirect();
  });
}

function getLoginRedirect() {
  const requestedPage = new URLSearchParams(window.location.search).get(
    "redirect",
  );
  const allowedPages = new Set(["dashboard.html", "quiz.html"]);
  return allowedPages.has(requestedPage) ? requestedPage : "dashboard.html";
}

function setupPasswordToggles() {
  document.querySelectorAll(".password-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const input = document.getElementById(toggle.dataset.passwordTarget);
      if (!input) return;

      const isVisible = input.type === "text";
      input.type = isVisible ? "password" : "text";
      toggle.setAttribute(
        "aria-label",
        isVisible ? "Show password" : "Hide password",
      );
      toggle.setAttribute(
        "title",
        isVisible ? "Show password" : "Hide password",
      );
    });
  });
}

function setupDashboard() {
  const greeting = document.querySelector("#dashboard-greeting");
  if (!greeting) return;

  const session = data.getSession();

  if (!session?.name) {
    window.location.replace("login.html");
    return;
  }

  greeting.textContent = `Good afternoon, ${session.name} 👋`;
  const avatar = document.querySelector("#dashboard-avatar");
  if (avatar) {
    avatar.textContent = session.name.charAt(0).toUpperCase();
    avatar.setAttribute("aria-label", `Profile: ${session.name}`);
  }

  const logoutButton = document.querySelector("#logout-button");
  logoutButton?.addEventListener("click", async () => {
    data.clearSession();
    await showNotice({
      icon: "success",
      title: "Logged out",
      text: "See you next time.",
      timer: 900,
      showConfirmButton: false,
    });
    window.location.href = "index.html";
  });

  renderUserHistory();
}

function setupQuizAccess() {
  if (!document.querySelector(".quiz-layout") || data.getSession()?.name) return;

  showNotice({
    icon: "info",
    title: "Login required",
    text: "Please log in before starting a quiz.",
    confirmButtonText: "Go to login",
  }).then(() => {
    window.location.href = "login.html?redirect=quiz.html";
  });
}

function formatDate(value) {
  if (!value) return "Never";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function renderUserHistory() {
  const list = document.querySelector("#user-history-list");
  const emptyState = document.querySelector("#user-history-empty");
  if (!list || !emptyState) return;

  const users = data.getUsers();
  list.replaceChildren();
  emptyState.hidden = users.length > 0;

  users.forEach((user) => {
    const item = document.createElement("li");
    item.className = "user-history-item";
    item.innerHTML = `
      <div>
        <strong>${user.name}</strong>
        <span>${user.email}</span>
        <small>Joined ${formatDate(user.registeredAt)} · ${user.loginCount || 0} logins · Last login ${formatDate(user.lastLogin)}</small>
      </div>
      <button class="delete-user-button" type="button" data-user-id="${user.id}">Delete</button>
    `;
    list.append(item);
  });

  list.querySelectorAll(".delete-user-button").forEach((button) => {
    button.addEventListener("click", () => deleteUser(button.dataset.userId));
  });
}

async function deleteUser(userId) {
  const users = data.getUsers();
  const user = users.find((item) => item.id === userId);
  if (!user) return;

  const result = await showNotice({
    icon: "warning",
    title: `Delete ${user.name}?`,
    text: "This removes the account from this browser's user history.",
    showCancelButton: true,
    confirmButtonText: "Delete user",
    cancelButtonText: "Keep user",
  });
  if (!result.isConfirmed) return;

  data.saveUsers(users.filter((item) => item.id !== userId));
  if (data.getSession()?.id === userId) {
    data.clearSession();
    window.location.href = "index.html";
    return;
  }

  renderUserHistory();
}

document.addEventListener("DOMContentLoaded", () => {
  setupPasswordToggles();
  setupRegistration();
  setupLogin();
  setupDashboard();
  setupQuizAccess();
});
