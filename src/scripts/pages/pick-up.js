class PickUpPage {
  async render() {
  return `
    <header class="navbar">
      <img src="/logo.png" alt="Logo" class="logo" />
      <nav>
        <a href="#/dashboard">Beranda</a>
        <a href="#/riwayat">Riwayat</a>
        <button id="ajukan-penjemputan">Ajukan Penjemputan</button>
      </nav>
    </header>

    <main class="form-penjemputan">
      <div class="form-content">
        <div class="form-image">
          <img src="./src/assets/assets/file-icon.png" alt="File Icon" />
          <br />
          <img id="preview-image" src="" alt="Preview Gambar" style="max-width: 200px; display: none; margin-top: 10px;" />
        </div>
        <div class="form-fields">
  <label for="kategori">Kategori</label>
  <select id="kategori" disabled style="margin-bottom: 10px;"></select>
  <hr />

  <label for="quantity">Quantity (Kg)</label>
  <input type="number" id="quantity" placeholder="Masukkan jumlah (kg)" style="margin-bottom: 10px;" />
  <hr />

  <label for="harga">Harga / kg</label>
  <input type="number" id="harga" disabled />
  <hr />

  <label for="total">Total Harga</label>
  <input type="number" id="total" disabled />
  <hr />

  <input type="file" id="file-upload" accept="image/*" style="margin-bottom: 10px;" />
  <button class="btn-upload" id="upload-button">Simpan Data</button>
</div>

      </div>
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
        <p><a href="#/pick-up">Ajukan Penjemputan</a></p>
      </div>
    </footer>
  `;
}

  async afterRender() {
    const fileInput = document.getElementById('file-upload');
    const previewImage = document.getElementById('preview-image');
    const kategoriSelect = document.getElementById('kategori');
    const hargaInput = document.getElementById('harga');
    const quantityInput = document.getElementById('quantity');
    const totalInput = document.getElementById('total');
    const uploadButton = document.getElementById('upload-button');

    let kategoriList = [];
    let selectedCategory = null;

    async function loadKategori() {
      const response = await fetch("http://localhost:8000/kategori");
      const data = await response.json();
      kategoriList = data;

      kategoriSelect.innerHTML = data.map(item => `
        <option value="${item.kategori}" data-harga="${item.harga_per_kg}">
          ${item.kategori}
        </option>
      `).join('');

      const selectedOption = kategoriSelect.options[0];
      if (selectedOption) {
        hargaInput.value = selectedOption.dataset.harga;
        selectedCategory = {
          nama: selectedOption.value,
          harga: parseInt(selectedOption.dataset.harga),
        };
        updateTotal();
      }
    }

    function updateTotal() {
      const qty = parseFloat(quantityInput.value) || 0;
      const harga = parseFloat(hargaInput.value) || 0;
      totalInput.value = qty * harga;
    }

    await loadKategori();

    kategoriSelect.addEventListener('change', function () {
      const selectedOption = kategoriSelect.options[kategoriSelect.selectedIndex];
      hargaInput.value = selectedOption.dataset.harga;
      selectedCategory = {
        nama: selectedOption.value,
        harga: parseInt(selectedOption.dataset.harga),
      };
      updateTotal();
    });

    quantityInput.addEventListener('input', updateTotal);

    fileInput.addEventListener('change', async function () {
      const file = this.files[0];
      if (!file) return;

      // Tampilkan preview
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewImage.style.display = 'block';
      };
      reader.readAsDataURL(file);

      // Kirim ke endpoint /predict
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:8000/predict", {
          method: "POST",
          body: formData
        });
        const result = await response.json();
        const klasifikasi = result.predicted_class;

        // Cari data kategori hasil prediksi
        const kategoriData = kategoriList.find(k => k.kategori === klasifikasi);
        if (kategoriData) {
          kategoriSelect.value = kategoriData.kategori;
          hargaInput.value = kategoriData.harga_per_kg;
          selectedCategory = {
            nama: kategoriData.kategori,
            harga: kategoriData.harga_per_kg,
          };
          updateTotal();
        } else {
          alert("Kategori hasil prediksi tidak ditemukan!");
        }

        console.log("Prediksi:", klasifikasi, "Confidence:", result.confidence);
      } catch (error) {
        alert("Gagal memproses gambar!");
        console.error(error);
      }
    });

    uploadButton.addEventListener('click', () => {
      const file = fileInput.files[0];
      if (!file || !selectedCategory) {
        alert('Lengkapi semua data dan unggah gambar dulu!');
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        const imageBase64 = e.target.result;
        const qty = parseFloat(quantityInput.value) || 0;
        const harga = selectedCategory.harga;
        const total = qty * harga;

        const pickupData = {
          image: imageBase64,
          kategori: selectedCategory.nama,
          quantity: qty,
          hargaPerKg: harga,
          total,
          timestamp: new Date().toISOString(),
        };

        let existingData = JSON.parse(localStorage.getItem('pickupData')) || [];
        existingData.push(pickupData);
        localStorage.setItem('pickupData', JSON.stringify(existingData));

        alert("Data berhasil disimpan!");
        window.location.hash = '#/dashboard';
      };

      reader.readAsDataURL(file);
    });
  }
}

export default PickUpPage;