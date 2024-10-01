class NavbarLogout extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class=" nav navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="/"><img src="assets/logo.png"></a>
      
              <button class="navbar-toggler custom-toggler-margin" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
    
            <div class="collapse navbar-collapse" id="navbarText">
                

              <div class="navbar-end">
                  <ul class="navbar-nav mb-2 mb-lg-0">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/home"><h4 class="link">Home</h4></a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#"><h4 class="link">Fale Conosco</h4></a>
                      </li>
                  </ul>
              </div>
            </div>
          </div>
        </nav>
      `;
  }
}

customElements.define('navbar-logout-component', NavbarLogout);
