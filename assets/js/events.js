(function () {
  const section = document.querySelector("#events-section");
  if (!section || typeof supabase === "undefined") {
    return;
  }

  const listEl = section.querySelector("[data-events-list]");
  const statusEl = section.querySelector("[data-events-status]");

  const setStatus = (message) => {
    if (statusEl) {
      statusEl.textContent = message;
      statusEl.classList.remove("d-none");
    }
  };

  const clearStatus = () => {
    if (statusEl) {
      statusEl.textContent = "";
      statusEl.classList.add("d-none");
    }
  };

  const getConfig = async () => {
    const response = await fetch("/api/supabase-config");
    if (!response.ok) {
      throw new Error("Konfiguracija za bazu nije postavljena.");
    }
    return response.json();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("sr-RS", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const renderEvents = (events) => {
    listEl.innerHTML = "";
    events.forEach((event) => {
      const col = document.createElement("div");
      col.className = "col-lg-4 col-md-6";

      const card = document.createElement("div");
      card.className = "event-card";

      const imageWrapper = document.createElement("div");
      imageWrapper.className = "event-card-image";
      if (event.image_url) {
        const img = document.createElement("img");
        img.src = event.image_url;
        img.alt = event.title || "Dogadjaj";
        imageWrapper.appendChild(img);
      }

      const body = document.createElement("div");
      body.className = "event-card-body";

      const badge = document.createElement("span");
      badge.className = "event-badge";
      badge.textContent = "Najava";

      const title = document.createElement("h4");
      title.textContent = event.title || "Dogadjaj u kafani";

      const meta = document.createElement("div");
      meta.className = "event-meta";
      meta.textContent = `${formatDate(event.event_date)} - Pocetak ${event.start_time || "TBA"}`;

      const performer = document.createElement("p");
      performer.className = "event-performer";
      performer.textContent = event.performer ? `Peva: ${event.performer}` : "Pevac ce biti objavljen";

      const description = document.createElement("p");
      description.className = "event-description";
      description.textContent = event.description || "Detalji stizu uskoro.";

      body.appendChild(badge);
      body.appendChild(title);
      body.appendChild(meta);
      body.appendChild(performer);
      body.appendChild(description);

      card.appendChild(imageWrapper);
      card.appendChild(body);
      col.appendChild(card);
      listEl.appendChild(col);
    });
  };

  const loadEvents = async () => {
    setStatus("Ucitavanje dogadjaja...");
    try {
      const config = await getConfig();
      const { createClient } = supabase;
      const client = createClient(config.url, config.anonKey);
      const today = new Date().toISOString().slice(0, 10);

      const { data, error } = await client
        .from("events")
        .select("id, title, description, performer, event_date, start_time, image_url")
        .gte("event_date", today)
        .order("event_date", { ascending: true })
        .limit(3);

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        setStatus("Trenutno nema najavljenih dogadjaja.");
        return;
      }

      clearStatus();
      renderEvents(data);
    } catch (err) {
      setStatus("Nije moguce dohvatiti najave. Proverite podesavanja Supabase naloga.");
      console.error(err);
    }
  };

  loadEvents();
})();
