class Navbar extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <nav class=" nav navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="/home"><img src="assets/logo.png"></a>
      
              <button class="navbar-toggler custom-toggler-margin" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
    
            <div class="collapse navbar-collapse" id="navbarText">
                <h3 class="brand-title"><spantitle>WAR</spantitle> DECISION</h3>

                <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/home"><h4 class="link">Home</h4></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/list"><h4 class="link">Gerenciar</h4></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#"><h4 class="link">Fale Conosco</h4></a>
                  </li>
                </ul>

              <span class="navbar-text">
                <div class="btn-area">
                <a href="/">
                  <button type="button" class="btn-second btn-leave">SAIR</button>
                </a>
                  </div>
              </span>
            </div>
          </div>
        </nav>
      `;
    }
  }
  
  customElements.define('navbar-component', Navbar);
  