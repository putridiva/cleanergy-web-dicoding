export default class HomePage {
  async render() {
    return `
      <section class="home-container">
      <div class="hero-content">
<h1>Selamat Datang di <span class="brand">Cleanergy</span></h1>
          <p class="tagline">Bersama kita jaga lingkungan dengan tindakan sederhana.</p>
          <div class="hero-actions">
            <a href="#/register" class="cta-button primary">Mulai Sekarang</a>
            <a href="#/login" class="cta-button secondary">Masuk</a>
          </div>
        </div>
        <div class="hero-image">
          <img src="/cleanergy.png" alt="Orang menjaga lingkungan" />
        </div>
        <div class="features">
          <div class="feature-card">
            <div class="feature-icon">♻️</div>
            <h3>Daur Ulang</h3>
            <p>Pelajari cara mendaur ulang sampah dengan benar</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🌱</div>
            <h3>Edukasi</h3>
            <p>Dapatkan pengetahuan tentang lingkungan</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🏆</div>
            <h3>Reward</h3>
            <p>Dapatkan hadiah untuk aksi lingkunganmu</p>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Do your job here
  }
}
