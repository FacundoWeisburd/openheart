// --- Contador de tiempo juntos ---

// Fecha inicial (ejemplo: 2 de agosto de 2024)
const startDate = new Date("2024-08-02T00:00:00");

const contadorEl = document.getElementById("contador");

function actualizarContador() {
  const now = new Date();
  const diffMs = now - startDate;

  // Cálculos simples para días, horas, minutos, segundos
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Formateo con GSAP para animar números (opcional)
  // Pero para simplificar acá solo actualizamos texto
  contadorEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Actualizo cada segundo
setInterval(actualizarContador, 1000);
actualizarContador();

// --- Mood Tracker ---

const moodDisplay = document.getElementById("moodDisplay");
const moodButtons = document.querySelectorAll(".moodBtn");

const moods = {
  happy: "😊",
  sad: "😢",
  angry: "😠",
  tired: "😴",
  smoked: "😵‍💫",
  neutral: "😐",
};

// Cargo estado guardado (localStorage)
let currentMood = localStorage.getItem("openheartMood") || "neutral";

function setMood(mood) {
  currentMood = mood;
  moodDisplay.textContent = moods[mood];

  // Cambio clase para colores (se usa en CSS)
  Object.keys(moods).forEach((m) => moodDisplay.classList.remove(m));
  moodDisplay.classList.add(mood);

  // Guardar en localStorage
  localStorage.setItem("openheartMood", mood);

  // Animación GSAP para "vibrar" emoji
  gsap.fromTo(
    moodDisplay,
    { scale: 0.8, rotation: -10 },
    { scale: 1, rotation: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" }
  );
}

// Inicializo con mood guardado
setMood(currentMood);

// Cambiar mood con botones
moodButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setMood(btn.dataset.mood);
  });
});

// También cambiar mood haciendo click en el emoji (ciclo)
moodDisplay.addEventListener("click", () => {
  const keys = Object.keys(moods);
  const currentIndex = keys.indexOf(currentMood);
  const nextIndex = (currentIndex + 1) % keys.length;
  setMood(keys[nextIndex]);
});
