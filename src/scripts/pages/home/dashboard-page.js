class DashboardPage {
  async render() {
    return `
      <section class="dashboard">
        <header class="navbar">
          <img src="/logo.png" alt="Logo" class="logo" />
          <nav>
            <a href="#/dashboard">Beranda</a>
            <a href="#/riwayat">Riwayat</a>
            <button id="ajukan-penjemputan">Ajukan Penjemputan</button>
          </nav>
        </header>

        <main class="dashboard-main">
          <section class="cards-container">
            <!-- Tempat untuk menampilkan data (bisa dinamikan nanti) -->
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
          </section>
        </main>

        <footer>
          <div class="footer-logo">
            <img src="/logo.png" alt="Logo" />
          </div>
          <div class="footer-info">
            <h4>Kantor</h4>
            <p>Jl. Raya Jember No.KM13, Kawang, Labanasem, Kec. Kabat,<br />
            Kabupaten Banyuwangi, Jawa Timur 68461</p>
          </div>
          <div class="footer-links">
            <h4>Informasi</h4>
            <p><a href="#/dashboard">Beranda</a></p>
            <p><a href="#/riwayat">Riwayat</a></p>
            <p><a href="#/form-penjemputan">Ajukan Penjemputan</a></p>
          </div>
        </footer>
      </section>
    `;
  }

  async afterRender() {
  const button = document.getElementById('ajukan-penjemputan');
  button?.addEventListener('click', () => {
    window.location.hash = '#/pick-up';
  });

  // Ambil data dari localStorage
  const data = JSON.parse(localStorage.getItem('pickupData')) || [];

  const container = document.querySelector('.cards-container');
  container.innerHTML = ''; // Kosongkan dulu

  if (data.length === 0) {
    container.innerHTML = '<p style="text-align:center;">Belum ada data penjemputan.</p>';
    return;
  }

  // Tampilkan semua data (bisa diubah hanya 1 terakhir jika mau)
  data.reverse().forEach((item) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style = 'border:1px solid #ddd; padding:1rem; border-radius:8px; max-width:260px; background:#f9f9f9;';

    card.innerHTML = `
      <img src="${item.image}" alt="Pickup Image" style="width:100%; height:auto; border-radius:6px;" />
      <p><strong>Kategori:</strong> ${item.kategori}</p>
      <p><strong>Jumlah:</strong> ${item.quantity} kg</p>
      <p><strong>Harga/kg:</strong> Rp ${item.hargaPerKg.toLocaleString()}</p>
      <p><strong>Total:</strong> Rp ${item.total.toLocaleString()}</p>
      <p style="font-size:0.85rem; color:#666;">${new Date(item.timestamp).toLocaleString()}</p>
    `;

    container.appendChild(card);
  });
}
}

export default DashboardPage;