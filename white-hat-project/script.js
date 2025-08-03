/* ===== MATRIX RAIN EFFECT ===== */
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const chars = "01";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0f0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 33);

/* ===== ELEMENTS ===== */
const hackBtn = document.getElementById('hackBtn');
const password = document.getElementById('password');
const accessSuccess = document.getElementById('accessSuccess');
const accessDenied = document.getElementById('accessDenied');
const loading = document.getElementById('loading');
const progressBox = document.getElementById('progressBox');
const progressBar = document.getElementById('progressBar');
const percent = document.getElementById('percent');
const traceLog = document.getElementById('traceLog');
const kontakContainer = document.getElementById('kontakContainer');
const faceText = document.getElementById('faceText');
const scanFace = document.getElementById('scanFace');
const liveLog = document.getElementById('liveLog');
const beep = document.getElementById('beepSound');
const typing = document.getElementById('typingSound');
const hackerSound = document.getElementById('hackerSound');
const fade = document.getElementById('screenFade');
const whoosh = document.getElementById('whooshSound');
const copyNotification = document.getElementById('copyNotification');

/* ===== PASSWORD CHECK ===== */
hackBtn.addEventListener('click', () => {
  if (password.value === "140704") {
    hackerSound.play();
    accessSuccess.style.display = "block";
    setTimeout(() => {
      accessSuccess.style.display = "none";
      startLoading();
    }, 1500);
  } else {
    accessDenied.style.display = "block";
    setTimeout(() => accessDenied.style.display = "none", 1500);
  }
});

/* ===== LOADING SEQUENCE ===== */
function startLoading() {
  loading.style.display = "block";
  progressBox.style.display = "block";
  traceLog.style.display = "block";

  let progress = 0;
  let traceData = [
    "[SCAN] Tracing IP 192.168.1.1",
    "[TRACE] Routing via proxy...",
    "[INFO] Fetching keys...",
    "[INFO] Decrypting blocks...",
    "[SUCCESS] Access channel open"
  ];
  let iTrace = 0;

  let interval = setInterval(() => {
    progress++;
    progressBar.style.width = progress + "%";
    percent.textContent = progress + "%";
    beep.play();

    if (progress % 20 === 0 && iTrace < traceData.length) {
      traceLog.innerHTML += traceData[iTrace++] + "<br>";
      traceLog.scrollTop = traceLog.scrollHeight;
    }

    if (progress >= 100) {
      clearInterval(interval);
      loading.style.display = "none";
      progressBox.style.display = "none";
      traceLog.style.display = "none";
      hackBtn.style.display = "none";
      password.style.display = "none";

      fade.style.opacity = 1;
      whoosh.play();

      setTimeout(() => {
        fade.style.opacity = 0;
        showFaceScan();
      }, 1500);
    }
  }, 40);
}

/* ===== FACE SCAN EFFECT ===== */
function showFaceScan() {
  faceText.style.display = "block";
  scanFace.style.display = "block";
  setTimeout(() => {
    faceText.style.display = "none";
    scanFace.style.display = "none";
    showContacts();
  }, 3000);
}

/* ===== SHOW CONTACTS ===== */
function showContacts() {
  kontakContainer.style.display = "block";
  kontakContainer.classList.add("glitch-contacts");
  kontakContainer.querySelectorAll('.kontak').forEach((c, i) => {
    setTimeout(() => c.classList.add('show'), i * 500);
  });

  setTimeout(() => startLiveLog(), 1500);
}

/* ===== TERMINAL REAL TIME ===== */
function startLiveLog() {
  liveLog.style.display = "block";
  const logs = [
    "[INFO] Monitoring traffic...",
    "[ALERT] Unauthorized login detected.",
    "[SCAN] Port 443 open.",
    "[TRACE] Connected to hidden network.",
    "[KEY] Session token updated.",
    "[LOG] Data packets intercepted.",
    "[END] System secured."
  ];
  let i = 0;
  setInterval(() => {
    liveLog.innerHTML += logs[i % logs.length] + "<br>";
    liveLog.scrollTop = liveLog.scrollHeight;
    typing.play();
    i++;
  }, 800);
}

/* ===== COPY NUMBER ===== */
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(btn.dataset.number);
    copyNotification.style.display = "block";
    setTimeout(() => copyNotification.style.display = "none", 1500);
  });
});
