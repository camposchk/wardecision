class FooterElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h6>Sobre</h6>
          <p class="text-justify">WarDecision.com <i>OFERECENDO O MELHOR PARA O SEU NEGÓCIO</i> é uma iniciativa para ajudar a vizualização de diversas áreas do seu negócio, empreendimento ou organização através de predições de Machine Learning. O WarDecision é focado em oferecer resultados eficientes e seguraça para todos os seus dados.</p>
        </div>

        <div class="col-xs-6 col-md-3">
          <h6>Categorias</h6>
          <ul class="footer-links">
            <li><a href="http://scanfcode.com/category/c-language/">C</a></li>
            <li><a href="http://scanfcode.com/category/front-end-development/">UI Design</a></li>
            <li><a href="http://scanfcode.com/category/back-end-development/">PHP</a></li>
            <li><a href="http://scanfcode.com/category/java-programming-language/">Java</a></li>
            <li><a href="http://scanfcode.com/category/android/">Android</a></li>
            <li><a href="http://scanfcode.com/category/templates/">Templates</a></li>
          </ul>
        </div>

        <div class="col-xs-6 col-md-3">
          <h6>Links</h6>
          <ul class="footer-links">
            <li><a href="http://scanfcode.com/about/">Sobre nós</a></li>
            <li><a href="http://scanfcode.com/contact/">Entre em contato</a></li>
            <li><a href="http://scanfcode.com/privacy-policy/">Política de privacidade</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-sm-6 col-xs-12">
          <p class="copyright-text">Copyright &copy; 2024 All Rights Reserved by 
       <a href="#">Nabelly</a>.
          </p>
        </div>

        <div class="col-md-4 col-sm-6 col-xs-12">
          <ul class="social-icons">
            <li><a class="facebook" href="#"><i class="bi bi-facebook"></i></a></li>
            <li><a class="twitter" href="#"><i class="bi bi-twitter"></i></a></li>
            <li><a class="dribbble" href="#"><i class="bi bi-instagram"></i></a></li>
            <li><a class="linkedin" href="#"><i class="bi bi-linkedin"></i></a></li>   
          </ul>
        </div>
      </div>
    </div>`;
    }
}

customElements.define('footer-component', FooterElement)