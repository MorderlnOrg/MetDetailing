const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

const closeMenu = () => {
  if (!siteHeader || !menuToggle) {
    return;
  }

  siteHeader.classList.remove("is-menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Deschide meniul");
};

if (siteHeader && menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("is-menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Inchide meniul" : "Deschide meniul");
  });

  document.addEventListener("click", (event) => {
    if (!siteHeader.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 901px)").matches) {
      closeMenu();
    }
  });
}

document.querySelectorAll(".comparison").forEach((comparison) => {
  const range = comparison.querySelector(".comparison__range");

  if (!range) {
    return;
  }

  const updateSplit = () => {
    comparison.style.setProperty("--split", `${range.value}%`);
  };

  range.addEventListener("input", updateSplit);
  updateSplit();
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    closeMenu();
  });
});

const bookingForm = document.querySelector("#booking-form");
const bookingDate = document.querySelector("#booking-date");
const whatsappNumber = "40700000000";

if (bookingDate) {
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  bookingDate.min = localToday.toISOString().split("T")[0];
}

const formatDate = (value) => {
  if (!value) {
    return "";
  }

  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
};

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) {
      return;
    }

    const formData = new FormData(bookingForm);
    const message = [
      "Salut, vreau o programare pentru detailing auto.",
      "",
      `Nume: ${formData.get("name")}`,
      `Telefon: ${formData.get("phone")}`,
      `Serviciu dorit: ${formData.get("service")}`,
      `Masina: ${formData.get("car")}`,
      `Data preferata: ${formatDate(formData.get("date"))}`,
      `Interval preferat: ${formData.get("time")}`,
      `Zona / localitate: ${formData.get("area")}`,
      `Detalii: ${formData.get("notes") || "Nu am adaugat detalii."}`,
      "",
      "Pot trimite si poze pentru estimare.",
    ].join("\n");

    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  });
}
