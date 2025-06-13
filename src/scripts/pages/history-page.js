class RiwayatPage {
  async render() {
    return `
      <main class="riwayat-container">
        <header class="navbar">
      <img src="/logo.png" alt="Logo" class="logo" />
      <nav>
        <a href="#/dashboard">Beranda</a>
        <a href="#/riwayat">Riwayat</a>
        <button id="ajukan-penjemputan">Ajukan Penjemputan</button>
      </nav>
    </header>
        <div id="riwayat-list"></div>
      </main>
    `;
  }

  async afterRender() {
    const riwayatList = document.getElementById('riwayat-list');
    let data = JSON.parse(localStorage.getItem('pickupData')) || [];

    function renderList() {
      riwayatList.innerHTML = '';
      data.forEach((item, index) => {
        riwayatList.innerHTML += `
          <div class="riwayat-item">
            <img src="${item.image}" style="max-width: 100px;" />
            <p><strong>Kategori:</strong> ${item.kategori}</p>
            <p><strong>Quantity:</strong> ${item.quantity} kg</p>
            <p><strong>Total:</strong> Rp ${item.total}</p>
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="delete-btn" data-index="${index}">Hapus</button>
          </div>
          <hr />
        `;
      });

      // Re-attach listeners
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = e.target.dataset.index;
          data.splice(index, 1);
          localStorage.setItem('pickupData', JSON.stringify(data));
          renderList(); // Refresh tampilan
        });
      });

      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const index = e.target.dataset.index;
          const item = data[index];
          const newQty = prompt('Edit jumlah (kg):', item.quantity);
          if (newQty !== null) {
            const updatedQty = parseFloat(newQty);
            if (!isNaN(updatedQty)) {
              item.quantity = updatedQty;
              item.total = updatedQty * item.hargaPerKg;
              data[index] = item;
              localStorage.setItem('pickupData', JSON.stringify(data));
              renderList(); // Refresh tampilan
            } else {
              alert("Input tidak valid.");
            }
          }
        });
      });
    }

    renderList();
  }
}

export default RiwayatPage;
