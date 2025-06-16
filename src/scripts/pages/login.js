class Login {
  async render() {
    return `
      <div class="auth-container">
        <div class="auth-image">
          <img src="laki.png" alt="Orang buang sampah" />
        </div>
        <div class="auth-form">
          <h2>Masuk</h2>
          <p>Selamat Datang di <b>Cleanergy</b></p>
          <form id="loginForm">
            <div class="input-group">
              <input type="text" id="username" placeholder="Nama Pengguna" required />
            </div>
            <div class="input-group">
              <input type="password" id="password" placeholder="Kata Sandi" required />
            </div>
            <button type="submit" class="btn-submit">Masuk</button>
          </form>
          <p class="switch-link">Belum punya akun? <a href="#/register">Daftar</a></p>
        </div>
      </div>
    `;
  }

  async afterRender() {
  const form = document.querySelector('#loginForm');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (!username || !password) {
      alert('Silakan isi semua kolom.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username);

    if (!user) {
      alert('Akun tidak ditemukan. Silakan daftar terlebih dahulu.');
      return;
    }

    if (user.password !== password) {
      alert('Kata sandi salah. Coba lagi.');
      return;
    }

    console.log('Login sukses:', { username });
    alert(`Selamat datang, ${username}!`);
    window.location.hash = '#/dashboard';
  });
}
}

export default Login;
