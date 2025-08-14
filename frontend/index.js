document.addEventListener('DOMContentLoaded', function () {

    fetch('http://localhost:3001/professores')
      .then((response) => response.json())
      .then((data) => loadHTMLTable(data));
  
    document.querySelector('table tbody').addEventListener('click', function (event) {
      if (event.target.className === 'delete-row-btn') {
        deleteRowById(event.target.dataset.id);
      }
      if (event.target.className === 'edit-row-btn') {
        handleEditRow(event.target.dataset.id);
      }
    });
  
    document.getElementById('search-btn').onclick = function () {
      const searchValue = document.getElementById('search-input').value;
      fetch('http://localhost:3001/professores') // você pode filtrar no front
        .then((response) => response.json())
        .then((data) => {
          const filtered = data.filter(prof => prof.nome_professor.toLowerCase().includes(searchValue.toLowerCase()));
          loadHTMLTable(filtered);
        });
    };
  
    document.getElementById('add-btn').onclick = function () {
      const cpf = document.getElementById('cpf-input').value;
      const nome = document.getElementById('name-input').value;
      const email = document.getElementById('email-input').value;
      const telefone = document.getElementById('phone-input').value;
      const idioma = document.getElementById('language-input').value;
  
      document.getElementById('cpf-input').value = "";
      document.getElementById('name-input').value = "";
      document.getElementById('email-input').value = "";
      document.getElementById('phone-input').value = "";
      document.getElementById('language-input').value = "";
  
      fetch('http://localhost:3001/professores', {
        headers: { 'Content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          cpf_professor: cpf,
          nome_professor: nome,
          email_professor: email,
          telefone_professor: telefone,
          idioma
        }),
      })
        .then((response) => response.json())
        .then(() => {
          listProfessors();
        });
    };
  
    document.getElementById('update-btn').onclick = function () {
      const updateCpf = document.getElementById('update-cpf-input').value;
      const updateName = document.getElementById('update-name-input').value;
      const updateEmail = document.getElementById('update-email-input').value;
      const updateTelefone = document.getElementById('update-phone-input').value;
      const updateIdioma = document.getElementById('update-language-input').value;
      const id = document.getElementById('update-btn').dataset.id;
  
      fetch(`http://localhost:3001/professores/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          cpf_professor: updateCpf,
          nome_professor: updateName,
          email_professor: updateEmail,
          telefone_professor: updateTelefone,
          idioma: updateIdioma
        }),
      })
        .then((response) => response.json())
        .then(() => {
          document.getElementById('modal').style.display = 'none';
          listProfessors();
        });
    };
  
    document.getElementById('close-modal-btn').onclick = function () {
      document.getElementById('modal').style.display = 'none';
    };
  
  });
  
  // Função para deletar professor
  function deleteRowById(id) {
    fetch(`http://localhost:3001/professores/${id}`, { method: 'DELETE' })
      .then(() => listProfessors());
  }
  
  // Função para abrir modal e preencher campos
  function handleEditRow(id) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    if (!row) return;
    const cells = row.children;
  
    document.getElementById('update-cpf-input').value = cells[0].innerText;
    document.getElementById('update-name-input').value = cells[1].innerText;
    document.getElementById('update-email-input').value = cells[2].innerText;
    document.getElementById('update-phone-input').value = cells[3].innerText;
    document.getElementById('update-language-input').value = cells[4].innerText;
  
    document.getElementById('update-btn').dataset.id = id;
    document.getElementById('modal').style.display = 'block';
  }
  
  // Função para carregar a tabela
  function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
  
    if (data.length === 0) {
      table.innerHTML =
        "<tr><td class='no-data' colspan='7'>No Data</td></tr>";
      return;
    }
  
    let tableHtml = '';
    data.forEach(function (prof) {
      tableHtml += `<tr data-id="${prof.id_professor}">`;
      tableHtml += `<td>${prof.cpf_professor}</td>`;
      tableHtml += `<td>${prof.nome_professor}</td>`;
      tableHtml += `<td>${prof.email_professor}</td>`;
      tableHtml += `<td>${prof.telefone_professor}</td>`;
      tableHtml += `<td>${prof.idioma}</td>`;
      tableHtml += `<td><button class="delete-row-btn" data-id="${prof.id_professor}">Delete</button></td>`;
      tableHtml += `<td><button class="edit-row-btn" data-id="${prof.id_professor}">Edit</button></td>`;
      tableHtml += `</tr>`;
    });
  
    table.innerHTML = tableHtml;
  }
  
