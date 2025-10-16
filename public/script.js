const form = document.getElementById('subscribeForm');
const message = document.getElementById('message');
const listEl = document.getElementById('list');
const refreshBtn = document.getElementById('refresh');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  message.textContent = 'Enviando...';

  const data = {
    full_name: document.getElementById('full_name').value,
    birthdate: document.getElementById('birthdate').value,
    email: document.getElementById('email').value,
    gender: document.getElementById('gender').value
  };

  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Erro desconhecido');

    message.textContent = '✅ Inscrição realizada com sucesso!';
    form.reset();
    loadList();
  } catch (err) {
    message.textContent = '❌ ' + err.message;
  }
});

async function loadList() {
  listEl.innerHTML = 'Carregando...';
  try {
    const res = await fetch('/api/subscribers');
    const rows = await res.json();

    if (rows.length === 0) listEl.innerHTML = '<li>Nenhum inscrito ainda.</li>';
    else listEl.innerHTML = rows
      .map(r => `<li><strong>${r.full_name}</strong> — ${r.email} — ${r.birthdate}</li>`)
      .join('');
  } catch {
    listEl.innerHTML = '<li>Erro ao carregar lista.</li>';
  }
}

refreshBtn.addEventListener('click', loadList);
window.addEventListener('load', loadList);
