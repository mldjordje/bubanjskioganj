(function () {
  if (typeof supabase === "undefined") {
    return;
  }

  const loginForm = document.querySelector("#admin-login-form");
  const eventForm = document.querySelector("#event-form");
  const loginCard = document.querySelector("[data-login-card]");
  const eventCard = document.querySelector("[data-event-card]");
  const statusEl = document.querySelector("[data-admin-status]");
  const eventsList = document.querySelector("[data-admin-events]");
  const logoutBtn = document.querySelector("#admin-logout-btn");
  const sessionInfo = document.querySelector("[data-session-info]");

  let client;
  let currentEditId = null;
  let currentImageUrl = null;

  const setStatus = (message, tone = "info") => {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = `admin-status admin-status-${tone}`;
  };

  const clearStatus = () => {
    if (!statusEl) return;
    statusEl.textContent = "";
    statusEl.className = "admin-status";
  };

  const getConfig = async () => {
    const response = await fetch("/api/supabase-config");
    if (!response.ok) {
      throw new Error("Nedostaju SUPABASE_URL i SUPABASE_ANON_KEY.");
    }
    return response.json();
  };

  const ensureClient = async () => {
    if (client) return client;
    const config = await getConfig();
    const { createClient } = supabase;
    client = createClient(config.url, config.anonKey);
    return client;
  };

  const showLogin = () => {
    if (loginCard) loginCard.classList.remove("d-none");
    if (eventCard) eventCard.classList.add("d-none");
    if (sessionInfo) sessionInfo.textContent = "";
  };

  const showPanel = (email) => {
    if (loginCard) loginCard.classList.add("d-none");
    if (eventCard) eventCard.classList.remove("d-none");
    if (sessionInfo) sessionInfo.textContent = email || "";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("sr-RS", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const safeFileName = (name) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, "-")
      .replace(/-+/g, "-");

  const uploadImage = async (file) => {
    const supa = await ensureClient();
    const bucket = "event-images";
    const filePath = `events/${Date.now()}-${safeFileName(file.name)}`;

    const { error: uploadError } = await supa.storage
      .from(bucket)
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supa.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  };

  const listEvents = async () => {
    if (!eventsList) return;
    eventsList.innerHTML = "<p>Ucitavanje prethodnih objava...</p>";
    try {
      const supa = await ensureClient();
      const { data, error } = await supa
        .from("events")
        .select("id, title, event_date, performer, start_time, description, image_url")
        .order("event_date", { ascending: false })
        .limit(5);

      if (error) throw error;

      if (!data || data.length === 0) {
        eventsList.innerHTML = "<p>Jos nema objavljenih dogadjaja.</p>";
        return;
      }

      const list = document.createElement("ul");
      list.className = "admin-events-list";

      data.forEach((event) => {
        const item = document.createElement("li");
        const performerText = event.performer ? ` - ${event.performer}` : "";
        const info = `${event.title || "Najava"} - ${formatDate(
          event.event_date
        )} - Pocetak ${event.start_time || "TBA"}${performerText}`;
        const infoEl = document.createElement("div");
        infoEl.textContent = info;

        const actions = document.createElement("div");
        actions.style.display = "flex";
        actions.style.gap = "8px";
        actions.style.marginTop = "4px";

        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.textContent = "Izmeni";
        editBtn.className = "events-admin-tag";
        editBtn.addEventListener("click", () => {
          if (!eventForm) return;
          eventForm.querySelector('input[name="title"]').value = event.title || "";
          eventForm.querySelector('input[name="performer"]').value = event.performer || "";
          eventForm.querySelector('input[name="event_date"]').value = event.event_date || "";
          eventForm.querySelector('input[name="start_time"]').value = event.start_time || "";
          eventForm.querySelector('textarea[name="description"]').value = event.description || "";
          currentEditId = event.id;
          currentImageUrl = event.image_url || null;
          setStatus("Uređujete postojeći događaj. Dodajte novu sliku samo ako želite da je zamenite.", "info");
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.textContent = "Obriši";
        deleteBtn.className = "events-admin-tag";
        deleteBtn.addEventListener("click", async () => {
          const confirmDelete = window.confirm("Obrisati ovu objavu?");
          if (!confirmDelete) return;
          try {
            const supaClient = await ensureClient();
            const { error: delError } = await supaClient
              .from("events")
              .delete()
              .eq("id", event.id);
            if (delError) throw delError;
            setStatus("Objava obrisana.", "success");
            await listEvents();
          } catch (err) {
            console.error(err);
            setStatus("Brisanje nije uspelo. Proverite konekciju i pravila.", "error");
          }
        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        item.appendChild(infoEl);
        item.appendChild(actions);
        list.appendChild(item);
      });

      eventsList.innerHTML = "";
      eventsList.appendChild(list);
    } catch (err) {
      eventsList.innerHTML =
        "<p>Ne mozemo da ucitamo objave. Proverite konekciju.</p>";
      console.error(err);
    }
  };

  const handleLogin = () => {
    if (!loginForm) return;
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearStatus();
      setStatus("Prijavljivanje...", "info");

      const email = loginForm.querySelector('input[name="email"]').value.trim();
      const password = loginForm
        .querySelector('input[name="password"]')
        .value.trim();

      try {
        const supa = await ensureClient();
        const { error } = await supa.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setStatus("Prijava neuspesna. Proverite kredencijale.", "error");
          return;
        }

        setStatus("Uspesna prijava.", "success");
        showPanel(email);
        await listEvents();
      } catch (err) {
        console.error(err);
        setStatus("Doslo je do greske pri prijavi.", "error");
      }
    });
  };

  const handleLogout = () => {
    if (!logoutBtn) return;
    logoutBtn.addEventListener("click", async () => {
      const supa = await ensureClient();
      await supa.auth.signOut();
      showLogin();
      setStatus("Odjavljeni ste.", "info");
    });
  };

  const handleEventForm = () => {
    if (!eventForm) return;
    eventForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearStatus();

      const submitBtn = eventForm.querySelector("button[type=submit]");
      const title = eventForm.querySelector('input[name="title"]').value.trim();
      const performer = eventForm
        .querySelector('input[name="performer"]')
        .value.trim();
      const eventDate = eventForm
        .querySelector('input[name="event_date"]')
        .value;
      const startTime = eventForm
        .querySelector('input[name="start_time"]')
        .value;
      const description = eventForm
        .querySelector('textarea[name="description"]')
        .value.trim();
      const fileInput = eventForm.querySelector('input[name="image"]');
      const file = fileInput && fileInput.files ? fileInput.files[0] : null;
      const isEditing = Boolean(currentEditId);

      if (!title || !eventDate || !startTime || !performer || (!file && !isEditing)) {
        setStatus("Popunite sva polja i dodajte sliku.", "error");
        return;
      }

      submitBtn.disabled = true;
      setStatus(isEditing ? "Čuvamo izmene..." : "Objavljujemo događaj...", "info");

      try {
        let imageUrl = currentImageUrl;
        if (file) {
          imageUrl = await uploadImage(file);
        }
        const supa = await ensureClient();

        if (!isEditing) {
          const { error } = await supa.from("events").insert([
            {
              title,
              description,
              performer,
              event_date: eventDate,
              start_time: startTime,
              image_url: imageUrl,
            },
          ]);

          if (error) {
            throw error;
          }
        } else {
          const { error } = await supa
            .from("events")
            .update({
              title,
              description,
              performer,
              event_date: eventDate,
              start_time: startTime,
              image_url: imageUrl,
            })
            .eq("id", currentEditId);
          if (error) {
            throw error;
          }
        }

        setStatus(isEditing ? "Izmene sačuvane." : "Dogadjaj je objavljen.", "success");
        eventForm.reset();
        currentEditId = null;
        currentImageUrl = null;
        await listEvents();
      } catch (err) {
        console.error(err);
        setStatus(
          "Objavljivanje nije uspelo. Proverite pravila i konekciju.",
          "error"
        );
      } finally {
        submitBtn.disabled = false;
      }
    });
  };

  const bootstrap = async () => {
    try {
      const supa = await ensureClient();
      const {
        data: { session },
      } = await supa.auth.getSession();

      if (session && session.user) {
        showPanel(session.user.email);
        await listEvents();
      } else {
        showLogin();
      }

      supa.auth.onAuthStateChange((event, sessionData) => {
        if (event === "SIGNED_OUT") {
          showLogin();
        }
        if (event === "SIGNED_IN" && sessionData?.user) {
          showPanel(sessionData.user.email);
          listEvents();
        }
      });
    } catch (err) {
      console.error(err);
      setStatus(
        "Konfiguracija nije postavljena. Dodajte SUPABASE promenljive na Vercelu.",
        "error"
      );
      showLogin();
    }
  };

  handleLogin();
  handleLogout();
  handleEventForm();
  bootstrap();
})();
