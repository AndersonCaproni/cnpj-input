const input       = document.getElementById('cnpj');
const fieldWrap   = document.getElementById('fieldWrap');
const fieldHint   = document.getElementById('fieldHint');
const fieldIcon   = document.getElementById('fieldIcon');
const progressBar = document.getElementById('progressBar');
const btnSubmit   = document.getElementById('btnSubmit');

const iconError = `
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>`;

const iconSuccess = `
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>`;

function mascaraAlfanumerico(v) {
  v = v.replace(/[^A-Za-z0-9]/g, '').toUpperCase().substring(0, 14);
  const p1 = v.substring(0, 2),  p2 = v.substring(2, 5),
        p3 = v.substring(5, 8),  p4 = v.substring(8, 12), p5 = v.substring(12, 14);
  let r = p1;
  if (v.length > 2)  r += '.' + p2;
  if (v.length > 5)  r += '.' + p3;
  if (v.length > 8)  r += '/' + p4;
  if (v.length > 12) r += '-' + p5;
  return r;
}

function calcProgress(raw) {
  return Math.min(100, Math.round((raw.length / 14) * 100));
}

function setState(state, msg) {
  fieldWrap.classList.remove('is-error', 'is-success');
  fieldHint.textContent = msg || '';
  fieldIcon.innerHTML   = '';

  if (state === 'error') {
    console.error(msg)
    fieldWrap.classList.add('is-error');
    fieldIcon.innerHTML = iconError;
  } else if (state === 'success') {
    console.log(msg)
    fieldWrap.classList.add('is-success');
    fieldIcon.innerHTML = iconSuccess;
  }
}

function setProgress(pct) {
  progressBar.style.width = pct + '%';
}

input.addEventListener('input', function () {
  const valor = mascaraAlfanumerico(this.value);

  this.value = valor;

  const raw = CNPJ.removeMascaraCNPJ(valor);
  setProgress(calcProgress(raw));
  btnSubmit.disabled = raw.length < 14;

  if (raw.length === 0)         setState(null, '');
  else if (raw.length < 14)     setState(null, `${raw.length} de 14 caracteres`);
  else if (CNPJ.isValid(valor)) setState('success', 'CNPJ válido ✓');
  else                          setState('error', 'Dígitos verificadores inválidos');
});

input.addEventListener('blur', function () {
  const raw = CNPJ.removeMascaraCNPJ(this.value);
  if (raw.length > 0 && raw.length < 14)
    setState('error', 'CNPJ incompleto');
});

input.addEventListener('focus', function () {
  const raw = CNPJ.removeMascaraCNPJ(this.value);
  if (raw.length > 0 && raw.length < 14)
    setState(null, `${raw.length} de 14 caracteres`);
});

function handleSubmit() {
  if (CNPJ.isValid(input.value))
    setState('success', `CNPJ ${CNPJ.removeMascaraCNPJ(input.value)} verificado com sucesso!`);
  else
    setState('error', 'CNPJ inválido. Verifique e tente novamente.');
}