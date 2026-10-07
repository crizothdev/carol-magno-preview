(function () {
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    menu.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (element) { observer.observe(element); });
  } else {
    revealEls.forEach(function (element) { element.classList.add("is-visible"); });
  }

  var lightbox = document.getElementById("albumLightbox");
  var lightboxImage = document.getElementById("lightboxImage");
  var lightboxAlbum = document.getElementById("lightboxAlbum");
  var lightboxTitle = document.getElementById("lightboxTitle");
  var lightboxCount = document.getElementById("lightboxCount");
  var closeBtn = document.querySelector("[data-lightbox-close]");
  var prevBtn = document.querySelector("[data-lightbox-prev]");
  var nextBtn = document.querySelector("[data-lightbox-next]");
  var activeAlbum = [];
  var activeIndex = 0;

  document.querySelectorAll(".album__grid").forEach(function (grid) {
    var items = Array.prototype.slice.call(grid.querySelectorAll("[data-album-item]"));
    var gridItems = items.slice(1);
    var extraCount = gridItems.length - 4;

    if (extraCount > 0) {
      var more = document.createElement("span");
      more.className = "album__more";
      more.textContent = "+" + extraCount;
      gridItems[3].classList.add("album__item--more");
      gridItems[3].appendChild(more);
      gridItems.slice(4).forEach(function (item) {
        item.classList.add("album__item--hidden");
      });
    }
  });

  function renderLightbox() {
    if (!lightbox || !activeAlbum.length) return;
    var item = activeAlbum[activeIndex];
    lightboxImage.src = item.src;
    lightboxImage.alt = item.title;
    lightboxAlbum.textContent = item.album;
    lightboxTitle.textContent = item.title;
    lightboxCount.textContent = (activeIndex + 1) + " / " + activeAlbum.length;
  }

  function openLightbox(button) {
    var albumEl = button.closest("[data-album]");
    if (!albumEl || !lightbox) return;
    var albumName = albumEl.getAttribute("data-album") || "Projeto";
    var buttons = Array.prototype.slice.call(albumEl.querySelectorAll("[data-album-item]"));
    activeAlbum = buttons.map(function (albumButton) {
      return {
        album: albumName,
        src: albumButton.getAttribute("data-src"),
        title: albumButton.getAttribute("data-title") || albumName
      };
    });
    activeIndex = button.classList.contains("album__item--more") ? 5 : buttons.indexOf(button);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    renderLightbox();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function moveLightbox(step) {
    if (!activeAlbum.length) return;
    activeIndex = (activeIndex + step + activeAlbum.length) % activeAlbum.length;
    renderLightbox();
  }

  document.querySelectorAll("[data-album-item]").forEach(function (button) {
    button.addEventListener("click", function () { openLightbox(button); });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", function () { moveLightbox(-1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { moveLightbox(1); });
  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") moveLightbox(-1);
    if (event.key === "ArrowRight") moveLightbox(1);
  });

  var blogApp = document.querySelector("[data-blog-app]");

  if (blogApp) {
    var bloggerPostsMock = [
      {
        kind: "blogger#post",
        id: "9104000000000000001",
        blog: { id: "8707705486929956659" },
        published: "2026-10-03T09:00:00-03:00",
        updated: "2026-10-03T09:00:00-03:00",
        url: "https://crizorthblog.blogspot.com/2026/10/arquitetura-sustentavel.html",
        selfLink: "https://www.googleapis.com/blogger/v3/blogs/8707705486929956659/posts/9104000000000000001",
        title: "Arquitetura sustentável começa nas decisões de projeto",
        content: "<p>Projetar com sustentabilidade envolve escolhas desde a implantação até o desempenho térmico, lumínico e acústico. Um bom projeto reduz desperdícios, melhora o conforto e cria espaços mais eficientes ao longo do tempo.</p><p>Quando a análise acontece ainda na etapa inicial, a arquitetura consegue equilibrar estética, função e impacto ambiental com mais precisão. A orientação solar, a leitura dos ventos, a relação com o entorno e a escolha dos materiais deixam de ser decisões isoladas e passam a formar uma estratégia única de desempenho.</p><figure class=\"blog-inline-image\"><img src=\"assets/carol/bio-carol.jpg\" alt=\"Estudo de arquitetura e sustentabilidade\"><figcaption>Estudo técnico e leitura sensível do espaço</figcaption></figure><p>Em residências e edifícios, essa abordagem permite prever melhor o comportamento do ambiente antes da obra. A iluminação natural pode ser aproveitada com mais inteligência, a ventilação pode reduzir a dependência de equipamentos mecânicos e a proteção solar pode contribuir para ambientes mais confortáveis durante todo o ano.</p><p>A sustentabilidade também aparece nos detalhes: no desenho das aberturas, no aproveitamento de áreas verdes, na especificação de revestimentos, no controle do consumo de água e na redução de resíduos durante o processo construtivo. Cada uma dessas decisões interfere na experiência de uso e no custo de manutenção da edificação.</p><p>Por isso, o projeto arquitetônico precisa unir técnica e sensibilidade. Mais do que aplicar soluções prontas, é necessário compreender o terreno, o programa, a rotina dos usuários e as possibilidades reais de cada obra. O resultado é uma arquitetura que responde melhor ao clima, ao investimento e ao modo de viver de quem vai ocupar aquele espaço.</p><p>Ao integrar sustentabilidade desde o começo, o projeto ganha coerência. A estética não fica separada do desempenho, e a funcionalidade não depende de adaptações posteriores. Tudo passa a nascer junto: forma, conforto, eficiência e identidade.</p>",
        labels: ["Sustentabilidade", "Projeto"],
        author: { displayName: "Carol Magno Arquitetura" },
        image: { url: "assets/carol/categoria-edificios.jpg" }
      },
      {
        kind: "blogger#post",
        id: "9104000000000000002",
        blog: { id: "8707705486929956659" },
        published: "2026-09-21T10:30:00-03:00",
        updated: "2026-09-21T10:30:00-03:00",
        url: "https://crizorthblog.blogspot.com/2026/09/viabilidade-arquitetonica.html",
        selfLink: "https://www.googleapis.com/blogger/v3/blogs/8707705486929956659/posts/9104000000000000002",
        title: "Por que estudar a viabilidade antes de construir",
        content: "<p>A viabilidade arquitetônica organiza possibilidades, restrições e potencial de uso do terreno antes das decisões definitivas. Esse estudo evita retrabalho e ajuda o cliente a enxergar o caminho mais adequado para o investimento.</p>",
        labels: ["Viabilidade", "Planejamento"],
        author: { displayName: "Carol Magno Arquitetura" },
        image: { url: "assets/carol/hero-fachada.jpg" }
      },
      {
        kind: "blogger#post",
        id: "9104000000000000003",
        blog: { id: "8707705486929956659" },
        published: "2026-08-28T14:20:00-03:00",
        updated: "2026-08-28T14:20:00-03:00",
        url: "https://crizorthblog.blogspot.com/2026/08/conforto-termico.html",
        selfLink: "https://www.googleapis.com/blogger/v3/blogs/8707705486929956659/posts/9104000000000000003",
        title: "Conforto térmico como parte da experiência",
        content: "<p>Iluminação natural, ventilação cruzada e proteção solar são decisões que transformam a relação entre usuário e espaço. O resultado é uma arquitetura mais agradável e eficiente.</p>",
        labels: ["Conforto", "Sustentabilidade"],
        author: { displayName: "Carol Magno Arquitetura" },
        image: { url: "assets/carol/categoria-residenciais.jpg" }
      },
      {
        kind: "blogger#post",
        id: "9104000000000000004",
        blog: { id: "8707705486929956659" },
        published: "2026-08-09T08:40:00-03:00",
        updated: "2026-08-09T08:40:00-03:00",
        url: "https://crizorthblog.blogspot.com/2026/08/interiores-funcionais.html",
        selfLink: "https://www.googleapis.com/blogger/v3/blogs/8707705486929956659/posts/9104000000000000004",
        title: "Interiores funcionais para rotinas reais",
        content: "<p>Projetos de interiores devem responder ao uso diário, à circulação, à iluminação e à personalidade de quem habita o espaço. Funcionalidade e beleza precisam caminhar juntas.</p>",
        labels: ["Interiores"],
        author: { displayName: "Carol Magno Arquitetura" },
        image: { url: "assets/carol/projeto-interiores-riz.jpg" }
      },
      {
        kind: "blogger#post",
        id: "9104000000000000005",
        blog: { id: "8707705486929956659" },
        published: "2026-07-18T11:10:00-03:00",
        updated: "2026-07-18T11:10:00-03:00",
        url: "https://crizorthblog.blogspot.com/2026/07/edificios-e-desempenho.html",
        selfLink: "https://www.googleapis.com/blogger/v3/blogs/8707705486929956659/posts/9104000000000000005",
        title: "Edifícios e desempenho desde a implantação",
        content: "<p>Em edifícios multifamiliares, a implantação orienta conforto, eficiência e experiência dos moradores. O estudo do entorno é parte essencial do projeto.</p>",
        labels: ["Edifícios", "Desempenho"],
        author: { displayName: "Carol Magno Arquitetura" },
        image: { url: "assets/carol/projeto-lucca.png" }
      },
      {
        kind: "blogger#post",
        id: "9104000000000000006",
        blog: { id: "8707705486929956659" },
        published: "2026-06-30T16:00:00-03:00",
        updated: "2026-06-30T16:00:00-03:00",
        url: "https://crizorthblog.blogspot.com/2026/06/bim-no-processo.html",
        selfLink: "https://www.googleapis.com/blogger/v3/blogs/8707705486929956659/posts/9104000000000000006",
        title: "BIM como apoio para decisões mais claras",
        content: "<p>A tecnologia BIM melhora a leitura do projeto, organiza informações e apoia decisões técnicas com mais segurança em cada etapa.</p>",
        labels: ["BIM", "Processo"],
        author: { displayName: "Carol Magno Arquitetura" },
        image: { url: "assets/carol/bio-carol.jpg" }
      }
    ];

    var currentPostEl = document.querySelector("[data-blog-current]");
    var coverEl = document.querySelector("[data-blog-cover]");
    var previousPostEl = document.querySelector("[data-blog-previous]");
    var archiveBtn = document.querySelector("[data-blog-archive]");
    var listEl = document.querySelector("[data-blog-list]");
    var listItemsEl = document.querySelector("[data-blog-list-items]");
    var paginationEl = document.querySelector("[data-blog-pagination]");
    var archivePosts = bloggerPostsMock.slice(2);
    var perPage = 3;
    var page = 1;

    function stripHtml(html) {
      var div = document.createElement("div");
      div.innerHTML = (html || "").replace(/<\/(p|div|h[1-6]|li)>/gi, " ");
      return div.textContent || div.innerText || "";
    }

    function formatDate(value) {
      return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(value));
    }

    function excerpt(post, size) {
      var text = stripHtml(post.content);
      return text.length > size ? text.slice(0, size).trim() + "..." : text;
    }

    function tagsTemplate(post) {
      return '<div class="blog-post-tags">' + (post.labels || []).map(function (label) {
        return "<span>" + label + "</span>";
      }).join("") + "</div>";
    }

    function renderCover(post) {
      return '<div class="blog-cover__image"><img src="' + post.image.url + '" alt="' + post.title + '"></div><div class="container blog-cover__content"><p class="eyebrow">Blog</p><span class="blog-post-date">' + formatDate(post.published) + '</span><h1>' + post.title + '</h1>' + tagsTemplate(post) + '</div>';
    }

    function renderArticle(post) {
      return '<div class="blog-article__inner">' + post.content + '</div>';
    }

    function renderPreviousPost(post) {
      return '<div class="blog-previous"><div class="blog-post-cover"><img src="' + post.image.url + '" alt="' + post.title + '"></div><span class="blog-post-date">' + formatDate(post.published) + '</span><h3>' + post.title + '</h3><p class="blog-post-summary">' + excerpt(post, 150) + '</p></div>';
    }

    function renderListCard(post) {
      return '<article class="blog-list-card"><div class="blog-post-cover"><img src="' + post.image.url + '" alt="' + post.title + '"></div><div class="blog-post-body"><span class="blog-post-date">' + formatDate(post.published) + '</span><h3>' + post.title + '</h3><p class="blog-post-summary">' + excerpt(post, 170) + '</p>' + tagsTemplate(post) + '</div></article>';
    }

    function renderArchive() {
      if (!listItemsEl || !paginationEl) return;
      var totalPages = Math.ceil(archivePosts.length / perPage);
      var start = (page - 1) * perPage;
      listItemsEl.innerHTML = archivePosts.slice(start, start + perPage).map(renderListCard).join("");
      paginationEl.innerHTML = "";

      for (var index = 1; index <= totalPages; index += 1) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "blog-page-btn" + (index === page ? " is-active" : "");
        button.textContent = index;
        button.setAttribute("aria-label", "Página " + index + " de posts");
        button.addEventListener("click", function (event) {
          page = Number(event.currentTarget.textContent);
          renderArchive();
          listEl.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        paginationEl.appendChild(button);
      }
    }

    if (coverEl) coverEl.innerHTML = renderCover(bloggerPostsMock[0]);
    if (currentPostEl) currentPostEl.innerHTML = renderArticle(bloggerPostsMock[0]);
    if (previousPostEl) previousPostEl.innerHTML = renderPreviousPost(bloggerPostsMock[1]);
    renderArchive();

    if (archiveBtn && listEl) {
      archiveBtn.addEventListener("click", function () {
        listEl.hidden = false;
        listEl.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }
})();
