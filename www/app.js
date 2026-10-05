let alunos = [];
let proximoId = 1;
const CHAVE = "alunos_app_database";

function carregar() {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo) {
        alunos = JSON.parse(salvo);
        proximoId = alunos.length ? Math.max(...alunos.map(a => a.id)) + 1 : 1;
    }
    listar();
}

function persistir() {
    localStorage.setItem(CHAVE, JSON.stringify(alunos));
}

function listar() {
    const tbody = document.getElementById("listaAlunos");
    tbody.innerHTML = "";
    if (alunos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#64748b;">Nenhum aluno cadastrado.</td></tr>';
        return;
    }
    alunos.forEach(a => {
        tbody.innerHTML += `<tr>
            <td>#\${a.id}</td>
            <td><strong>\${a.nome}</strong></td>
            <td>\${a.idade ? a.idade + " anos" : "-"}</td>
            <td><button class="btn-del" onclick="excluir(\${a.id})">Excluir</button></td>
        </tr>`;
    });
}

function salvar() {
    const n = document.getElementById("nome");
    const e = document.getElementById("email");
    const i = document.getElementById("idade");

    if (!n.value.trim()) return alert("Preencha o nome!");

    alunos.push({
        id: proximoId++,
        nome: n.value.trim(),
        email: e.value.trim(),
        idade: i.value.trim()
    });

    n.value = e.value = i.value = "";
    persistir();
    listar();
}

function excluir(id) {
    alunos = alunos.filter(a => a.id !== id);
    persistir();
    listar();
}

carregar();

// ===== Registro do Service Worker (PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('Service Worker registrado'))
            .catch(err => console.warn('Falha no SW:', err));
    });
}