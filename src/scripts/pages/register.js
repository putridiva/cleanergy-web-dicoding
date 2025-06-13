class Register {
  async render() {
    return `
      <div class="auth-container">
        <div class="auth-image">
          <img src="/pr.png" alt="Ilustrasi daftar akun" />
        </div>
        <div class="auth-form">
          <h2>Daftar</h2>
          <p>Buat akun untuk mulai menjaga lingkungan bersama <b>Cleanergy</b></p>
          <form id="registerForm">
            <div class="input-group">
              <input type="text" id="fullName" placeholder="Nama Lengkap" required />
            </div>
            <div class="input-group">
              <input type="text" id="username" placeholder="Nama Pengguna" required />
            </div>
            <div class="input-group">
              <input type="password" id="password" placeholder="Kata Sandi" required />
            </div>
            <button type="submit" class="btn-submit">Daftar</button>
          </form>
          <p class="switch-link">Sudah punya akun? <a href="#/login">Masuk</a></p>
        </div>
      </div>
    `;
  }

  async afterRender() {
  const form = document.querySelector('#registerForm');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fullName = document.querySelector('#fullName').value.trim();
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (!fullName || !username || !password) {
      alert('Harap isi semua kolom.');
      return;
    }

    // Ambil data pengguna dari localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Cek apakah username sudah ada
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      alert('Username sudah digunakan. Silakan pilih username lain.');
      return;
    }

    // Simpan user baru
    const newUser = {
      fullName,
      username,
      password,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    console.log('User registered:', newUser);

    alert(`Pendaftaran berhasil! Silakan login, ${username}.`);
    window.location.hash = '#/login';
  });
}
}

export default Register;
