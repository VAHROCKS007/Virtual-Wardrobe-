```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Virtual Wardrobe: O Provador Virtual Inteligente</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
  <style>
    /* Reset e Configurações Gerais */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    } 

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9f9f9;
    } 

    a {
      text-decoration: none;
      color: inherit;
    } 

    img {
      max-width: 100%;
      height: auto;
      display: block;
    } 

    .container {
      width: 90%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    } 

    .section {
      padding: 80px 0;
      text-align: center;
    } 

    .section-title {
      font-size: 2.5rem;
      margin-bottom: 20px;
      color: #1a1a2e;
      font-weight: 700;
    } 

    .section-subtitle {
      font-size: 1.2rem;
      color: #555;
      max-width: 800px;
      margin: 0 auto 40px;
    } 

    /* Header */
    header {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: #fff;
      padding: 60px 0;
      text-align: center;
    } 

    header h1 {
      font-size: 3rem;
      margin-bottom: 20px;
      font-weight: 800;
    } 

    header p {
      font-size: 1.3rem;
      max-width: 900px;
      margin: 0 auto;
      opacity: 0.9;
    } 

    /* Seção de Funcionalidades */
    .features {
      background-color: #fff;
    } 

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 40px;
      margin-top: 40px;
    } 

    .feature-card {
      padding: 30px;
      border-radius: 12px;
      background: #f5f7ff;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    } 

    .feature-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    } 

    .feature-icon {
      font-size: 3rem;
      color: #7b2cbf;
      margin-bottom: 20px;
    } 

    .feature-card h3 {
      font-size: 1.5rem;
      margin-bottom: 15px;
      color: #1a1a2e;
    } 

    /* Seção de Benefícios */
    .benefits {
      background-color: #f0f4ff;
    } 

    .benefits-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 40px;
      margin-top: 40px;
    } 

    .benefits-column {
      flex: 1;
      min-width: 300px;
      max-width: 500px;
      text-align: left;
    } 

    .benefits-column h3 {
      font-size: 1.6rem;
      margin-bottom: 20px;
      color: #1a1a2e;
      text-align: center;
    } 

    .benefits-list {
      list-style: none;
    } 

    .benefits-list li {
      margin-bottom: 15px;
      padding-left: 30px;
      position: relative;
      font-size: 1.1rem;
      color: #444;
    } 

    .benefits-list li::before {
      content: "✓";
      position: absolute;
      left: 0;
      top: 0;
      background: #7b2cbf;
      color: white;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
    } 

    /* Seção de Diferenciais */
    .differentials {
      background-color: #fff;
    } 

    .differential-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
      margin-top: 40px;
    } 

    .differential-item {
      background: #eef2ff;
      padding: 25px;
      border-radius: 10px;
      text-align: center;
    } 

    .differential-item h3 {
      font-size: 1.4rem;
      margin-bottom: 15px;
      color: #1a1a2e;
    } 

    .differential-item p {
      color: #555;
      font-size: 1rem;
    } 

    /* Seção Futuro da Moda */
    .future {
      background: linear-gradient(135deg, #7b2cbf 0%, #5a189a 100%);
      color: white;
    } 

    .future .section-title,
    .future .section-subtitle {
      color: white;
    } 

    .future-features {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 40px;
      margin-top: 40px;
    } 

    .future-card {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 30px;
      width: 100%;
      max-width: 400px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.2);
    } 

    .future-card h3 {
      font-size: 1.5rem;
      margin-bottom: 15px;
    } 

    .future-card p {
      font-size: 1.1rem;
      opacity: 0.9;
    } 

    /* Seção de Contato */
    .cta {
      background-color: #f5f7ff;
      text-align: center;
    } 

    .cta-container {
      max-width: 700px;
      margin: 0 auto;
    } 

    .contact-info {
      margin: 40px 0;
      font-size: 1.1rem;
      color: #444;
      text-align: center;
    } 

    .contact-info p {
      margin: 10px 0;
    } 

    .btn {
      display: inline-block;
      background: #7b2cbf;
      color: white;
      padding: 15px 40px;
      font-size: 1.2rem;
      border-radius: 50px;
      font-weight: 600;
      transition: background 0.3s ease, transform 0.2s ease;
      box-shadow: 0 5px 15px rgba(123, 44, 191, 0.3);
    } 

    .btn:hover {
      background: #5a189a;
      transform: translateY(-3px);
    } 

    /* Footer */
    footer {
      background: #1a1a2e;
      color: #aaa;
      text-align: center;
      padding: 30px 0;
      font-size: 0.9rem;
    } 

    /* Responsividade */
    @media (max-width: 768px) {
      header h1 {
        font-size: 2.5rem;
      } 

      header p {
        font-size: 1.1rem;
      } 

      .section-title {
        font-size: 2rem;
      } 

      .section {
        padding: 60px 0;
      }
    } 

    @media (max-width: 480px) {
      header h1 {
        font-size: 2rem;
      } 

      .section-title {
        font-size: 1.8rem;
      } 

      .container {
        padding: 20px;
      }
    }
  </style>
</head>
<body> 

  <!-- Header -->
  <header>
    <div class="container">
      <h1>Virtual Wardrobe: O Provador Virtual Inteligente</h1>
      <p>Bem-vindo ao futuro da moda! Descubra como nosso provador virtual inteligente transforma a experiência de compra online, unindo tecnologia e estilo de forma inovadora.</p>
    </div>
  </header> 

  <!-- Funcionalidades -->
  <section class="section features">
    <div class="container">
      <h2 class="section-title">Principais Funcionalidades</h2>
      <p class="section-subtitle">Descubra como o Virtual Wardrobe reinventa a forma de experimentar roupas online.</p> 

      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-user-astronaut"></i>
          </div>
          <h3>Experiência de Usuário Revigorada</h3>
          <p>Crie seu "gêmeo digital" com base em sua imagem e modelagem para experimentar roupas com realismo total.</p>
        </div> 

        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-shopping-cart"></i>
          </div>
          <h3>Compra Instantânea</h3>
          <p>Adicione seus looks favoritos ao carrinho com apenas alguns cliques, diretamente pelo aplicativo.</p>
        </div> 

        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-lightbulb"></i>
          </div>
          <h3>Descoberta de Estilos</h3>
          <p>Explore novas tendências e encontre o estilo perfeito para cada ocasião com facilidade.</p>
        </div>
      </div>
    </div>
  </section> 

  <!-- Benefícios -->
  <section class="section benefits">
    <div class="container">
      <h2 class="section-title">Benefícios do Virtual Wardrobe</h2>
      <p class="section-subtitle">Uma solução vantajosa tanto para clientes quanto para marcas de moda.</p> 

      <div class="benefits-container">
        <div class="benefits-column">
          <h3>Para o Cliente</h3>
          <ul class="benefits-list">
            <li>Economia de Tempo: Diga adeus às filas e aos provadores físicos.</li>
            <li>Escolhas Confiantes: Visualize o ajuste e o caimento das peças antes de comprar.</li>
            <li>Experiência Aprimorada: Compre de onde quiser, quando quiser, com total comodidade.</li>
          </ul>
        </div> 

        <div class="benefits-column">
          <h3>Para a Marca</h3>
          <ul class="benefits-list">
            <li>Aumento nas Vendas: Potencialize sua receita e taxa de conversão.</li>
            <li>Engajamento Digital: Crie uma conexão mais profunda com seus clientes.</li>
            <li>Fortalecimento da Imagem: Posicione sua marca como moderna e inovadora.</li>
            <li>Redução de Trocas: Diminua custos e melhore a satisfação pós-compra.</li>
            <li>Lealdade do Cliente: Ofereça uma experiência única que fideliza.</li>
          </ul>
        </div>
      </div>
    </div>
  </section> 

  <!-- Diferenciais -->
  <section class="section differentials">
    <div class="container">
      <h2 class="section-title">Diferenciais do Virtual Wardrobe</h2>
      <p class="section-subtitle">O que nos torna a escolha ideal para inovar no varejo de moda.</p> 

      <div class="differential-grid">
        <div class="differential-item">
          <h3>Design Intuitivo</h3>
          <p>Navegação simples e fluida, acessível para todos os tipos de usuários.</p>
        </div>
        <div class="differential-item">
          <h3>Resultados Realistas</h3>
          <p>Simulação fiel do caimento e das texturas dos tecidos para maior confiança.</p>
        </div>
        <div class="differential-item">
          <h3>Satisfação do Usuário</h3>
          <p>Facilidade de uso que gera maior confiança na compra e fidelização.</p>
        </div>
      </div>
    </div>
  </section> 

  <!-- Futuro da Moda -->
  <section class="section future">
    <div class="container">
      <h2 class="section-title">O Futuro da Moda</h2>
      <p class="section-subtitle">Tecnologias inovadoras que estão moldando a experiência de moda do amanhã.</p> 

      <div class="future-features">
        <div class="future-card">
          <h3><i class="fas fa-vr-cardboard"></i> Realidade Aumentada (RA)</h3>
          <p>Experimente roupas no seu próprio ambiente com precisão e imersão total.</p>
        </div>
        <div class="future-card">
          <h3><i class="fas fa-share-alt"></i> Integração Social</h3>
          <p>Compartilhe seus looks com amigos para opiniões e inspiração em tempo real.</p>
        </div>
      </div>
    </div>
  </section> 

  <!-- CTA - Contato -->
  <section class="section cta">
    <div class="container">
      <h2 class="section-title">Vamos ao Próximo Nível?</h2>
      <p class="section-subtitle">Vamos agendar uma demonstração e conversar sobre uma parceria para levar a experiência digital da sua marca ao próximo nível?</p> 

      <div class="contact-info">
        <p><strong>Valéria Rodrigues</strong></p>
        <p><i class="fas fa-envelope"></i> vrstecnologia@gmail.com</p>
        <p><i class="fas fa-phone"></i> (94) 98104-2156</p>
      </div> 

      <a href="mailto:vrstecnologia@gmail.com?subject=Agendamento de Demonstração - Virtual Wardrobe" class="btn">Agende uma Demonstração</a>
    </div>
  </section> 

  <!-- Footer -->
  <footer>
    <div class="container">
      <p>&copy; 2025 Virtual Wardrobe. Todos os direitos reservados. Inovando a moda com tecnologia.</p>
    </div>
  </footer> 

  <script>
    // Efeito de rolagem suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    }); 

    // Animação simples ao rolar a página (fade-in nas seções)
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
      threshold: 0.1
    }; 

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions); 

    sections.forEach(section => {
      section.style.opacity = 0;
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      observer.observe(section);
    });
  </script> 

</body>
</html>