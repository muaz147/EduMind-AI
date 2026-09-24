(() => {
  const storedUserKey = "eduadaptUser";
  const usersKey = "eduadaptUsers";
  const sessionKey = "eduadaptSession";

  function createId() {
    return (
      globalThis.crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(16).slice(2)}`
    );
  }

  function readJson(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch {
      return fallback;
    }
  }

  function getUsers() {
    const savedUsers = readJson(usersKey, null);
    if (Array.isArray(savedUsers)) {
      return savedUsers.map((user) => ({
        ...user,
        id: user.id || createId(),
        registeredAt: user.registeredAt || new Date().toISOString(),
        loginCount: user.loginCount || 0,
        lastLogin: user.lastLogin || null,
      }));
    }

    const legacyUser = readJson(storedUserKey, null);
    return legacyUser
      ? [
          {
            ...legacyUser,
            id: legacyUser.id || createId(),
            registeredAt: legacyUser.registeredAt || new Date().toISOString(),
            loginCount: legacyUser.loginCount || 0,
            lastLogin: legacyUser.lastLogin || null,
          },
        ]
      : [];
  }

  function saveUsers(users) {
    localStorage.setItem(usersKey, JSON.stringify(users));
    localStorage.setItem(storedUserKey, JSON.stringify(users[0] || null));
  }

  function getSession() {
    try {
      return JSON.parse(sessionStorage.getItem(sessionKey));
    } catch {
      return null;
    }
  }

  function saveSession(session) {
    sessionStorage.setItem(sessionKey, JSON.stringify(session));
  }

  function clearSession() {
    sessionStorage.removeItem(sessionKey);
  }

  window.eduAdaptData = {
    getUsers,
    saveUsers,
    getSession,
    saveSession,
    clearSession,
    createId,
  };
})();
