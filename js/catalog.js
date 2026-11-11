/**
 * Impresos Yossant — Catálogo y configurador de cotización por WhatsApp
 * Las tarjetas del catálogo están pre-renderizadas en index.html para SEO/GEO instantáneo y CLS = 0.
 * Este módulo gestiona el modal configurador (<dialog>), vista previa dinámica de muestras reales,
 * formularios y eventos hacia WhatsApp/Telegram.
 */

const WHATSAPP_NUMBER = '525532048858';

const CATALOG_PRODUCTS = [
  {
    id: 'cajas-personalizadas',
    category: 'Empaque a la medida',
    title: 'Cajas Personalizadas',
    desc: 'Cajas plegadizas y empaques suajados sobre diseño para cosmética, regalo y producto comercial.',
    image: 'assets/img/cyc/cat-caja-faja.webp',
    defaultCaption: 'Muestra real · Caja blanca con faja envolvente impresa',
    specs: {
      Material: 'Cartulina sulfatada (14 a 24 pts) o microcorrugado',
      Procesos: 'Impresión offset HD, suaje de precisión, ventana o asa integrada',
      Personalización: 'En blanco liso, full color o con faja promocional'
    },
    options: {
      Modelo: [
        'Caja con faja impresa',
        'Caja básica (blanca)',
        'Caja asa de corazón',
        'Caja con suaje calado',
        'Caja plana con ventana'
      ],
      Presentación: ['Con diseño de marca', 'Con faja envolvente', 'En blanco sin impresión'],
      Tiraje: ['100 – 500 pzas', '500 – 2,000 pzas', 'Más de 5,000 pzas']
    },
    variantImages: [
      { match: { Modelo: 'Caja con faja impresa' }, src: 'assets/img/cyc/cat-caja-faja.webp', label: 'Muestra real · Caja con faja envolvente impresa' },
      { match: { Modelo: 'Caja básica (blanca)' }, src: 'assets/img/cyc/cat-caja-basica-blanca.webp', label: 'Muestra real · Caja básica en cartulina blanca' },
      { match: { Modelo: 'Caja asa de corazón' }, src: 'assets/img/cyc/cat-caja-asa-corazon.webp', label: 'Muestra real · Caja con asa de corazón y ventana' },
      { match: { Modelo: 'Caja con suaje calado' }, src: 'assets/img/orig/cat-caja-suaje-calado.webp', label: 'Muestra real · Caja con suaje calado decorativo' },
      { match: { Modelo: 'Caja plana con ventana' }, src: 'assets/img/cyc/cat-caja-hueco-blanca.webp', label: 'Muestra real · Caja plana blanca con ventana suajada' },
      { match: { Modelo: 'Caja con faja impresa', Presentación: 'En blanco sin impresión' }, src: 'assets/img/cyc/cat-caja-basica-blanca.webp', label: 'Muestra real · Caja básica en cartulina blanca' },
      { match: { Modelo: 'Caja básica (blanca)', Presentación: 'Con faja envolvente' }, src: 'assets/img/cyc/cat-caja-faja.webp', label: 'Muestra real · Caja blanca con faja impresa' }
    ]
  },
  {
    id: 'cajas-comida-reposteria',
    category: 'Grado alimenticio',
    title: 'Cajas para Comida y Repostería',
    desc: 'Cajas armables y papel envoltura para repostería, pasteles, comida rápida y servicio para llevar.',
    image: 'assets/img/cyc/cat-caja-reposteria.webp',
    defaultCaption: 'Muestra real · Caja armada para repostería',
    specs: {
      Material: 'Cartulina grado alimenticio y papel envoltura seguro para alimentos',
      Modelos: 'Comida china, repostería, pastel alto, hexagonal, hamburguesa, hot dog y temporada',
      Acabados: 'Impresión con tintas certificadas o presentación en blanco'
    },
    options: {
      Empaque: [
        'Caja para repostería',
        'Caja de comida china',
        'Caja alta para pastel',
        'Caja grande / rosca',
        'Caja hexagonal para postre',
        'Caja para hamburguesa',
        'Caja para hot dog',
        'Papel envoltura personalizado'
      ],
      Presentación: ['Estándar de línea', 'Impresión full color', 'En blanco sin impresión'],
      Tiraje: ['100 – 500 pzas', '500 – 2,000 pzas', 'Más de 5,000 pzas']
    },
    variantImages: [
      { match: { Empaque: 'Caja para repostería' }, src: 'assets/img/cyc/cat-caja-reposteria.webp', label: 'Muestra real · Caja armada para repostería' },
      { match: { Empaque: 'Caja de comida china' }, src: 'assets/img/orig/cat-caja-comida-china-blanca.webp', label: 'Muestra real · Caja de comida china blanca' },
      { match: { Empaque: 'Caja de comida china', Presentación: 'Impresión full color' }, src: 'assets/img/orig/cat-caja-comida-china-impresa.webp', label: 'Muestra real · Caja de comida china impresa con tu marca' },
      { match: { Empaque: 'Caja de comida china', Presentación: 'En blanco sin impresión' }, src: 'assets/img/orig/cat-caja-comida-china-blanca.webp', label: 'Muestra real · Caja de comida china blanca sin impresión' },
      { match: { Empaque: 'Caja alta para pastel' }, src: 'assets/img/orig/cat-caja-pastel-alta.webp', label: 'Muestra real · Caja alta para pastel con tapa' },
      { match: { Empaque: 'Caja grande / rosca' }, src: 'assets/img/orig/cat-caja-navidena-rosca.webp', label: 'Muestra real · Caja grande impresa para rosca / temporada' },
      { match: { Empaque: 'Caja hexagonal para postre' }, src: 'assets/img/cyc/cat-caja-takeout-postres.webp', label: 'Muestra real · Caja hexagonal take-out para postres' },
      { match: { Empaque: 'Caja para hamburguesa' }, src: 'assets/img/orig/cat-caja-hamburguesa.webp', label: 'Muestra real · Caja armable para hamburguesa' },
      { match: { Empaque: 'Caja para hot dog' }, src: 'assets/img/orig/cat-caja-estuche-blanco.webp', label: 'Muestra real · Caja / charola blanca para hot dog' },
      { match: { Empaque: 'Papel envoltura personalizado' }, src: 'assets/img/orig/cat-papel-envoltura.webp', label: 'Muestra real · Papel envoltura personalizado grado alimenticio' }
    ]
  },
  {
    id: 'bolsas-papel',
    category: 'Retail y regalos',
    title: 'Bolsas de Papel con Jareta',
    desc: 'Bolsas resistentes con asa de cordón y fuelle amplio, impresas a color o lisas en tonos de línea.',
    image: 'assets/img/cyc/cat-bolsa-impresa.webp',
    defaultCaption: 'Muestra real · Bolsa impresa full color con asa de cordón',
    specs: {
      Material: 'Papel / cartulina de alto gramaje con refuerzo en base y boca',
      Asas: 'Jareta de cordón trenzado al tono de la bolsa',
      Acabados: 'Impresión offset full color o lisas con laminado mate / brillante'
    },
    options: {
      Presentación: [
        'Impresa personalizada',
        'Lisa negra',
        'Lisa roja',
        'Lisa verde',
        'Lisa naranja',
        'Lisa fiusha',
        'Lisa amarilla'
      ],
      Laminado: ['Mate', 'Brillante'],
      Tiraje: ['100 pzas', '300 pzas', '500 – 1,000+ pzas']
    },
    variantImages: [
      { match: { Presentación: 'Impresa personalizada' }, src: 'assets/img/cyc/cat-bolsa-impresa.webp', label: 'Muestra real · Bolsa impresa personalizada full color' },
      { match: { Presentación: 'Lisa negra' }, src: 'assets/img/cyc/cat-bolsa-negra.webp', label: 'Muestra real · Bolsa lisa negra con jareta' },
      { match: { Presentación: 'Lisa roja' }, src: 'assets/img/cyc/cat-bolsa-roja.webp', label: 'Muestra real · Bolsa lisa roja con jareta' },
      { match: { Presentación: 'Lisa verde' }, src: 'assets/img/orig/cat-bolsa-verde.webp', label: 'Muestra real · Bolsa lisa verde con jareta' },
      { match: { Presentación: 'Lisa naranja' }, src: 'assets/img/cyc/cat-bolsa-naranja.webp', label: 'Muestra real · Bolsa lisa naranja con jareta' },
      { match: { Presentación: 'Lisa fiusha' }, src: 'assets/img/cyc/cat-bolsa-fiusha.webp', label: 'Muestra real · Bolsa lisa fiusha con jareta' },
      { match: { Presentación: 'Lisa amarilla' }, src: 'assets/img/cyc/cat-bolsa-amarilla.webp', label: 'Muestra real · Bolsa lisa amarilla con jareta' }
    ]
  },
  {
    id: 'libretas-calendarios',
    category: 'Corporativo y personalizado',
    title: 'Libretas y Calendarios',
    desc: 'Libretas en doble arillo con portadas y hojas personalizadas, y calendarios de escritorio con Foil.',
    image: 'assets/img/orig/cat-libreta-foil.webp',
    defaultCaption: 'Muestra real · Libreta con acabado Hot Stamping Foil',
    specs: {
      Encuadernado: 'Doble arillo metálico (Wire-O) de alta resistencia',
      Interiores: 'Hojas impresas personalizadas (cuadro, raya o diseño corporativo)',
      Acabados: 'Laminado mate y Hot Stamping (Foil dorado/plateado)'
    },
    options: {
      Producto: [
        'Libreta con Foil',
        'Libreta personalizada',
        'Libreta con nombre',
        'Libreta corporativa',
        'Interiores impresos',
        'Calendario de escritorio',
        'Calendario con Foil'
      ],
      'Estilo de muestra': ['Corporativo / Clásico', 'Ilustrado / Deportivo'],
      Tiraje: ['50 – 200 pzas', '200 – 1,000 pzas', 'Más de 1,000 pzas']
    },
    variantImages: [
      { match: { Producto: 'Libreta con Foil' }, src: 'assets/img/orig/cat-libreta-foil.webp', label: 'Muestra real · Libreta con Hot Stamping Foil dorado' },
      { match: { Producto: 'Libreta con Foil', 'Estilo de muestra': 'Ilustrado / Deportivo' }, src: 'assets/img/orig/cat-libreta-unicornio-foil.webp', label: 'Muestra real · Libreta infantil con detalles en Foil' },
      { match: { Producto: 'Libreta personalizada' }, src: 'assets/img/orig/cat-libreta-personalizada.webp', label: 'Muestra real · Libreta pasta dura personalizada a color' },
      { match: { Producto: 'Libreta con nombre' }, src: 'assets/img/orig/cat-libreta-nombre.webp', label: 'Muestra real · Libreta personalizada con nombre' },
      { match: { Producto: 'Libreta corporativa' }, src: 'assets/img/orig/cat-libreta-corporativa.webp', label: 'Muestra real · Libreta corporativa empresarial' },
      { match: { Producto: 'Libreta corporativa', 'Estilo de muestra': 'Ilustrado / Deportivo' }, src: 'assets/img/orig/cat-libreta-deportes.webp', label: 'Muestra real · Libreta temática deportiva corporativa' },
      { match: { Producto: 'Interiores impresos' }, src: 'assets/img/orig/cat-libreta-interiores.webp', label: 'Muestra real · Interiores impresos en cuadro con arillo' },
      { match: { Producto: 'Calendario de escritorio' }, src: 'assets/img/orig/cat-calendario-escritorio.webp', label: 'Muestra real · Calendario de escritorio con base triangular' },
      { match: { Producto: 'Calendario con Foil' }, src: 'assets/img/orig/cat-calendario-foil.webp', label: 'Muestra real · Calendario de escritorio con Hot Stamping Foil' }
    ]
  },
  {
    id: 'libros-catalogos-brochures',
    category: 'Impresión editorial',
    title: 'Libros, Catálogos y Folletos',
    desc: 'Producción editorial en tiro corto o industrial: libros rústicos, catálogos de arte, manuales y brochures.',
    image: 'assets/img/orig/cat-libro-pasta-blanda.webp',
    defaultCaption: 'Muestra real · Libros impresos en pasta blanda',
    specs: {
      Encuadernación: 'Hot-melt (lomo cuadrado), grapa a caballo o doble arillo metálico',
      Interiores: 'Bond cultural / ahuesado o papel couché para catálogos a color',
      Portadas: 'Cartulina couché o sulfatada con laminado mate o brillante'
    },
    options: {
      Formato: [
        'Libro pasta blanda',
        'Libro ilustrado',
        'Catálogo con lomo cuadrado',
        'Manual con doble arillo',
        'Brochure engrapado a caballo'
      ],
      Interiores: ['Bond cultural 90g', 'Couché brillante 115–130g', 'Couché mate 150g'],
      Tiraje: ['50 – 200 pzas', '200 – 1,000 pzas', 'Más de 1,000 pzas']
    },
    variantImages: [
      { match: { Formato: 'Libro pasta blanda' }, src: 'assets/img/orig/cat-libro-pasta-blanda.webp', label: 'Muestra real · Libros rústicos con lomo pegado' },
      { match: { Formato: 'Libro ilustrado' }, src: 'assets/img/orig/cat-libro-edicion.webp', label: 'Muestra real · Libro ilustrado pasta blanda' },
      { match: { Formato: 'Catálogo con lomo cuadrado' }, src: 'assets/img/orig/cat-catalogo-lomo.webp', label: 'Muestra real · Catálogo editorial con lomo cuadrado' },
      { match: { Formato: 'Manual con doble arillo' }, src: 'assets/img/orig/cat-manual-wireo.webp', label: 'Muestra real · Manual con encuadernado doble arillo' },
      { match: { Formato: 'Brochure engrapado a caballo' }, src: 'assets/img/orig/cat-brochure-engrapado.webp', label: 'Muestra real · Brochure corporativo engrapado a caballo' }
    ]
  },
  {
    id: 'papeleria-corporativa',
    category: 'Imagen empresarial',
    title: 'Folders, Tarjetas y Papelería',
    desc: 'Papelería corporativa y de operación interna: tarjetas, folders impresos con solapa y formatos foliados.',
    image: 'assets/img/orig/cat-tarjetas-presentacion.webp',
    defaultCaption: 'Muestra real · Tarjetas de presentación frente y vuelta',
    specs: {
      Material: 'Couché 300g, cartulina sulfatada o papel bond para control',
      Terminados: 'Laminado mate, doblez de solapa tarjetera y foliado mecánico',
      Impresión: 'Offset de alta definición para logotipos, textos y tablas'
    },
    options: {
      Producto: [
        'Tarjetas de presentación',
        'Folders corporativos',
        'Formatos y notas foliadas'
      ],
      Terminado: ['Laminado mate', 'Cartulina sulfatada', 'Papel bond con folio consecutivo'],
      Cantidad: ['250 – 500 pzas', '1,000 pzas', '2,500+ pzas']
    },
    variantImages: [
      { match: { Producto: 'Tarjetas de presentación' }, src: 'assets/img/orig/cat-tarjetas-presentacion.webp', label: 'Muestra real · Tarjetas de presentación en couché grueso' },
      { match: { Producto: 'Folders corporativos' }, src: 'assets/img/orig/cat-folder-corporativo.webp', label: 'Muestra real · Folder corporativo impreso con solapa' },
      { match: { Producto: 'Formatos y notas foliadas' }, src: 'assets/img/orig/cat-formato-foliado.webp', label: 'Muestra real · Formato administrativo con folio consecutivo' }
    ]
  },
  {
    id: 'stickers-etiquetas',
    category: 'Branding y etiquetado',
    title: 'Stickers y Etiquetas',
    desc: 'Etiquetas en planilla con impresión nítida y detalle en Hot Stamping Foil para sellar bolsas, cajas y libros.',
    image: 'assets/img/orig/cat-stickers-foil.webp',
    defaultCaption: 'Muestra real · Etiquetas en planilla con Hot Stamping Foil',
    specs: {
      Material: 'Papel adhesivo couché / estucado con respaldo práctico',
      Acabado: 'Hot Stamping (Foil dorado/plateado), laminado o barniz',
      Entrega: 'En planillas pre-cortadas listas para aplicar'
    },
    options: {
      Acabado: ['Hot Stamping (Foil)', 'Impresión a color', 'Laminado mate'],
      Presentación: ['En planilla con corte recto', 'Medida personalizada'],
      Cantidad: ['100 – 500 pzas', '1,000 pzas', '5,000+ pzas']
    },
    variantImages: [
      { match: { Acabado: 'Hot Stamping (Foil)' }, src: 'assets/img/orig/cat-stickers-foil.webp', label: 'Muestra real · Etiquetas en planilla con Hot Stamping Foil' },
      { match: { Acabado: 'Impresión a color' }, src: 'assets/img/orig/cat-stickers-foil.webp', label: 'Muestra real · Etiquetas en planilla (muestra con Foil)' },
      { match: { Acabado: 'Laminado mate' }, src: 'assets/img/orig/cat-stickers-foil.webp', label: 'Muestra real · Etiquetas en planilla (muestra con Foil)' }
    ]
  },
  {
    id: 'promocionales-pop',
    category: 'Punto de venta y activaciones',
    title: 'Promocionales, Coroplast y POS',
    desc: 'Material promocional y señalización: cartón para blister POS, coroplast para plumas de estacionamiento, balones 3D y lanyards.',
    image: 'assets/img/orig/cat-pop-blister.webp',
    defaultCaption: 'Muestra real · Cartón suajado para empaque blister POS',
    specs: {
      Materiales: 'Coroplast rígido (4 mm), cartulina suajada de alto calibre y cinta poliéster',
      Aplicaciones: 'Anuncios para plumas de estacionamiento, exhibición retail y eventos',
      Herrajes: 'Ojillos metálicos, burbuja blister y bandola giratoria metálica'
    },
    options: {
      Artículo: [
        'Empaque para blister POS',
        'Coroplast para pluma de estacionamiento',
        'Coroplast vertical con ojillos',
        'Balón 3D armado en cartulina',
        'Lanyard sublimado con bandola'
      ],
      Uso: ['Punto de venta y empaque', 'Señalización y estacionamientos', 'Activaciones y eventos'],
      Cantidad: ['50 – 200 pzas', '200 – 1,000 pzas', 'Más de 1,000 pzas']
    },
    variantImages: [
      { match: { Artículo: 'Empaque para blister POS' }, src: 'assets/img/orig/cat-pop-blister.webp', label: 'Muestra real · Cartón suajado para empaque blister POS' },
      { match: { Artículo: 'Coroplast para pluma de estacionamiento' }, src: 'assets/img/orig/cat-coroplast-horizontal.webp', label: 'Muestra real · Anuncio en coroplast para pluma de estacionamiento' },
      { match: { Artículo: 'Coroplast vertical con ojillos' }, src: 'assets/img/orig/cat-coroplast-vertical.webp', label: 'Muestra real · Letrero vertical en coroplast con ojillos' },
      { match: { Artículo: 'Balón 3D armado en cartulina' }, src: 'assets/img/orig/cat-pop-balon-3d.webp', label: 'Muestra real · Balón promocional 3D en cartulina suajada' },
      { match: { Artículo: 'Lanyard sublimado con bandola' }, src: 'assets/img/orig/cat-lanyard-sublimado.webp', label: 'Muestra real · Lanyard sublimado a color con bandola metálica' }
    ]
  }
];

let activeProduct = null;
let selection = {};
let mediaSwitchToken = 0;

function escapeHtmlAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function resolveVariantMedia(product, currentSelection, changedGroup) {
  if (!product) return { src: '', label: '' };
  const rules = product.variantImages || [];
  let bestRule = null;
  let bestScore = -1;

  for (const rule of rules) {
    const entries = Object.entries(rule.match || {});
    if (!entries.length) continue;
    const allMatch = entries.every(([k, v]) => currentSelection[k] === v);
    if (!allMatch) continue;

    // Prioriza coincidencias multi-parámetro y, ante empate, la regla ligada al último chip pulsado
    const score = entries.length * 10 + (changedGroup && rule.match[changedGroup] ? 5 : 0);
    if (score >= bestScore) {
      bestScore = score;
      bestRule = rule;
    }
  }

  return bestRule || {
    src: product.image,
    label: product.defaultCaption || product.title
  };
}

function syncMediaOrientation(imgEl, probe = imgEl) {
  if (!imgEl || !probe || !probe.naturalWidth || !probe.naturalHeight) return;
  imgEl.classList.toggle('is-landscape', probe.naturalWidth > probe.naturalHeight);
}

function updateConfiguratorMedia(changedGroup, immediate = false) {
  if (!activeProduct) return;
  const dialog = document.getElementById('configurator');
  const imgEl = dialog?.querySelector('[data-cfg="img"]');
  if (!imgEl) return;

  const media = resolveVariantMedia(activeProduct, selection, changedGroup);

  const currentSrc = imgEl.getAttribute('src') || '';
  const targetAlt = media.label || activeProduct.title;
  const token = ++mediaSwitchToken;

  if (!media.src || currentSrc === media.src) {
    imgEl.alt = targetAlt;
    imgEl.classList.remove('is-switching');
    if (imgEl.complete && imgEl.naturalWidth) {
      syncMediaOrientation(imgEl);
    } else {
      imgEl.onload = () => {
        if (token === mediaSwitchToken) syncMediaOrientation(imgEl);
      };
    }
    return;
  }

  if (immediate) {
    imgEl.classList.remove('is-switching');
    imgEl.onload = () => {
      if (token === mediaSwitchToken) syncMediaOrientation(imgEl);
    };
    imgEl.src = media.src;
    imgEl.alt = targetAlt;
    if (imgEl.complete && imgEl.naturalWidth) {
      syncMediaOrientation(imgEl);
    }
    return;
  }

  imgEl.classList.add('is-switching');
  const loader = new Image();
  loader.onload = () => {
    if (token !== mediaSwitchToken) return;
    syncMediaOrientation(imgEl, loader);
    imgEl.src = media.src;
    imgEl.alt = targetAlt;
    requestAnimationFrame(() => imgEl.classList.remove('is-switching'));
  };
  loader.onerror = () => {
    if (token !== mediaSwitchToken) return;
    imgEl.src = media.src;
    imgEl.alt = targetAlt;
    imgEl.classList.remove('is-switching');
  };
  loader.src = media.src;
}

function openConfigurator(productId) {
  const p = CATALOG_PRODUCTS.find(x => x.id === productId);
  const dialog = document.getElementById('configurator');
  if (!p || !dialog) return;

  activeProduct = p;
  selection = Object.fromEntries(Object.entries(p.options).map(([k, v]) => [k, v[0]]));

  // Precarga ligera en segundo plano de todas las fotos variantes de este producto
  const variantUrls = [...new Set([p.image, ...(p.variantImages || []).map(r => r.src)])];
  variantUrls.forEach((src) => {
    const pre = new Image();
    pre.src = src;
  });

  dialog.querySelector('[data-cfg="cat"]').textContent = p.category;
  dialog.querySelector('[data-cfg="title"]').textContent = p.title;
  dialog.querySelector('[data-cfg="desc"]').textContent = p.desc;
  dialog.querySelector('[data-cfg="specs"]').innerHTML = Object.entries(p.specs)
    .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');

  const optionsEl = dialog.querySelector('[data-cfg="options"]');
  optionsEl.innerHTML = Object.entries(p.options).map(([group, values], groupIdx) => `
    <fieldset class="cfg-group">
      <legend>${group}</legend>
      <div class="chips">
        ${values.map((v, i) => `
          <label class="chip">
            <input type="radio" name="cfg-${groupIdx}" data-group="${escapeHtmlAttr(group)}" value="${escapeHtmlAttr(v)}" ${i === 0 ? 'checked' : ''}>
            <span>${v}</span>
          </label>
        `).join('')}
      </div>
    </fieldset>
  `).join('');

  optionsEl.onchange = (e) => {
    const input = e.target;
    if (!input?.dataset?.group) return;
    selection[input.dataset.group] = input.value;
    updateConfiguratorMedia(input.dataset.group);
  };

  updateConfiguratorMedia(null, true);

  dialog.querySelector('#cfgNotes').value = '';
  document.body.classList.add('modal-open');
  dialog.showModal();
  dialog.scrollTop = 0;

  window.yossantTracker?.trackEvent('product_view', { product: p.title, ctaLocation: 'Catálogo' });
}

function closeConfigurator() {
  const dialog = document.getElementById('configurator');
  dialog?.close();
  document.body.classList.remove('modal-open');
}

function sendConfiguration() {
  if (!activeProduct) return;
  const notes = document.getElementById('cfgNotes').value.trim();
  const tag = window.yossantTracker?.getWhatsAppCampaignTag() || '';
  const config = Object.entries(selection).map(([k, v]) => `${k}: ${v}`).join(' | ');

  window.yossantTracker?.trackEvent('whatsapp_lead', {
    product: activeProduct.title,
    configuration: config,
    ctaLocation: 'Configurador de catálogo'
  });

  let msg = `Hola Impresos Yossant, quiero cotizar:\n\n*${activeProduct.title}*\n`;
  for (const [k, v] of Object.entries(selection)) msg += `• ${k}: ${v}\n`;
  if (notes) msg += `• Detalles: ${notes}\n`;
  msg += `\n${tag}`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
}

function openDirectWhatsApp(message, location) {
  const tag = window.yossantTracker?.getWhatsAppCampaignTag() || '';
  window.yossantTracker?.trackEvent('whatsapp_lead', {
    product: 'Cotización directa',
    configuration: message,
    ctaLocation: location || 'Botón WhatsApp'
  });
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${message}\n\n${tag}`)}`, '_blank', 'noopener');
}

function handleContactSubmit(event) {
  event.preventDefault();
  const f = event.target;
  const name = f.name.value.trim();
  const phone = f.phone.value.trim();
  const company = f.company?.value.trim() || '';
  const product = f.product.value;
  const details = f.details.value.trim();
  const tag = window.yossantTracker?.getWhatsAppCampaignTag() || '';

  window.yossantTracker?.trackEvent('form_lead', {
    customerName: name,
    customerCompany: company,
    product,
    configuration: details,
    ctaLocation: 'Formulario de contacto'
  });

  let msg = `Hola Impresos Yossant, soy ${name}.\n\n`;
  if (company) msg += `• Empresa / Correo: ${company}\n`;
  msg += `• Producto: ${product}\n• Teléfono: ${phone}\n• Proyecto: ${details}\n\n${tag}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
}

function toggleMobileNav(force) {
  const nav = document.getElementById('mobileNav');
  const btn = document.getElementById('menuBtn');
  if (!nav) return;
  const open = typeof force === 'boolean' ? force : !nav.classList.contains('open');
  nav.classList.toggle('open', open);
  btn?.setAttribute('aria-expanded', String(open));
}

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const dialog = document.getElementById('configurator');
  if (dialog) {
    dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));

    // Fallback de light-dismiss para navegadores sin <dialog closedby> (Safari)
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dialog.addEventListener('click', (e) => {
        if (e.target !== dialog) return;
        const r = dialog.getBoundingClientRect();
        const inside = r.top <= e.clientY && e.clientY <= r.bottom && r.left <= e.clientX && e.clientX <= r.right;
        if (!inside) dialog.close();
      });
    }
  }
});
