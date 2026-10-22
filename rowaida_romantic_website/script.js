const messages = {
  love: {
    title: "A little feeling",
    text: "يا رويدا، إنتِ بقيتي غالية عندي بشكل يمكن الكلام ميقدرش يوصفه. نفسي نفضل قريبين من بعض، ونكمل سوا بالخير، وربنا يكتب لنا اللي فيه الخير لينا."
  },
  respect: {
    title: "What I admire in you",
    text: "من أكتر الحاجات اللي بحبها فيكي طيبتك وجدعنتك واحترامك. إنتِ إنسانة بقدّرها من قلبي، وده عندي شيء أكبر من أي كلام حلو."
  },
  smile: {
    title: "A little sunshine",
    text: "يمكن متعرفيش قد إيه كلامك البسيط بيفرق معايا، وقد إيه وجودك بيخلّي يومي ألطف. ساعات الحاجات الصغيرة هي اللي بتفضل في القلب."
  },
  future: {
    title: "A wish for tomorrow",
    text: "مش عايز أستعجل الأيام ولا أفرض على بكرة شكل معين. كل اللي بتمناه إن ربنا يكتب لنا الخير، وتفضل بينا المودة والراحة والاحترام."
  },
  special: {
    title: "Just you, Rowaida",
    text: "عملتلك المكان الصغير ده عشان أقولك إنك مميزة عندي، وإنّي بتمنى لك فرحة وراحة بال وأيام حلوة على قد طيبة قلبك. خدي بالك من نفسك دايمًا ♡"
  },
  final: {
    title: "A final little note",
    text: "لو فيه حاجة أتمنى تفضلي فاكرها، فهي إنك تستاهلي كل خير وفرحة. شكرًا على وجودك، وربنا يجعل اللي جاي أجمل وأحنّ علينا كلنا. ♡"
  }
};

const modal = document.getElementById("messageModal");
const modalTitle = document.getElementById("modalTitle");
const modalCopy = document.getElementById("modalCopy");
const closeModalButton = document.getElementById("closeModal");
const modalDoneButton = document.getElementById("modalDone");
const toast = document.getElementById("toast");
let toastTimer;

function openMessage(key) {
  const message = messages[key];
  if (!message) return;
  modalTitle.textContent = message.title;
  modalCopy.textContent = message.text;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeModalButton.focus();
}

function closeMessage() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll(".rose-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.add("blooming");
    openMessage(card.dataset.message);
    window.setTimeout(() => card.classList.remove("blooming"), 700);
  });
});

document.getElementById("openLetter").addEventListener("click", () => openMessage("final"));
closeModalButton.addEventListener("click", closeMessage);
modalDoneButton.addEventListener("click", closeMessage);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeMessage();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMessage();
});

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3500);
}

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicState = document.getElementById("musicState");
const soundButton = document.getElementById("soundButton");
let musicStarted = false;

async function toggleMusic() {
  if (!musicStarted) {
    try {
      await music.play();
      musicStarted = true;
      musicState.textContent = "Ⅱ";
      musicButton.setAttribute("aria-pressed", "true");
    } catch (error) {
      showToast("لإضافة الأغنية، ضَع ملف MP3 مرخّصًا باسم rowaida-song.mp3 داخل مجلد assets.");
    }
    return;
  }
  if (music.paused) {
    try {
      await music.play();
      musicState.textContent = "Ⅱ";
    } catch (error) {
      showToast("مش قادر أشغّل الملف. تأكد إنه موجود داخل مجلد assets.");
    }
  } else {
    music.pause();
    musicState.textContent = "▶";
  }
}
musicButton.addEventListener("click", toggleMusic);
soundButton.addEventListener("click", () => {
  music.muted = !music.muted;
  soundButton.textContent = music.muted ? "♫̸" : "♫";
  soundButton.setAttribute("aria-pressed", String(!music.muted));
  showToast(music.muted ? "تم كتم الموسيقى" : "تم تشغيل الصوت");
});
music.addEventListener("play", () => { musicStarted = true; musicState.textContent = "Ⅱ"; });
music.addEventListener("pause", () => { musicState.textContent = "▶"; });

function createParticles() {
  const container = document.getElementById("particles");
  const symbols = ["♥", "♡", "✦", "·", "❀"];
  const colors = ["#ff7fa8", "#f7c3d5", "#c77bff", "#d7b17b"];
  const count = window.matchMedia("(max-width: 600px)").matches ? 20 : 34;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.setProperty("--x", `${Math.random() * 100}%`);
    particle.style.setProperty("--size", `${8 + Math.random() * 14}px`);
    particle.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);
    particle.style.setProperty("--duration", `${11 + Math.random() * 17}s`);
    particle.style.setProperty("--delay", `${-Math.random() * 26}s`);
    particle.style.setProperty("--drift", `${Math.round(Math.random() * 150 - 75)}px`);
    particle.style.setProperty("--opacity", `${0.25 + Math.random() * 0.55}`);
    container.appendChild(particle);
  }
}
createParticles();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));
