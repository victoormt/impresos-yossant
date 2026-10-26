/**
 * Impresos Yossant — Catálogo y configurador de cotización por WhatsApp
 * Las tarjetas del catálogo están pre-renderizadas en index.html para SEO/GEO instantáneo y CLS = 0.
 * Este módulo gestiona el modal configurador (<dialog>), formularios y eventos hacia WhatsApp/Telegram.
 */

const WHATSAPP_NUMBER = '525554458161';

const CATALOG_PRODUCTS = [
  {
    id: 'cajas-personalizadas',
    category: 'Diseños únicos para tu marca',
    title: 'Cajas Personalizadas',
    desc: 'Diseñamos y fabricamos cajas personalizadas a la medida de tu producto con materiales resistentes y múltiples acabados.',
    image: 'assets/img/prod-cajas-ecommerce.webp',
    specs: {
      Material: 'Cartulina sulfatada y caple hasta 24 pts',
      Acabados: 'Laminado mate/brillante, foil metálico (hot stamping) y realce',
      Prototipo: 'Muestra física (dummy) antes de producir tu tiraje'
    },
    options: {
      Formato: ['Caja para producto', 'Caja para envío (mailer)', 'Estuche de regalo', 'Con ventana', 'A medida'],
      Cantidad: ['10–49 pzs', '50–200 pzs', '250–500 pzs', '1,000+ pzs'],
      Acabado: ['Laminado mate', 'Laminado brillante', 'Mate + Foil metálico', 'Natural']
    }
  },
  {
    id: 'cajas-comida-reposteria',
    category: 'Empaques para alimentos',
    title: 'Cajas para Comida y Repostería',
    desc: 'Cajas para pasteles, Rosca de Reyes, hamburguesas, alitas, sushi y bolsas para delivery listas para proteger y lucir tus alimentos.',
    image: 'assets/img/prod-cajas-reposteria.webp',
    specs: {
      Material: 'Cartulina grado alimenticio resistente a humedad y grasa',
      Tirajes: 'Desde 10 piezas en digital hasta miles en offset',
      Extras: 'Ventana transparente de acetato, suaje auto-armable'
    },
    options: {
      Formato: ['Repostería / Pastel', 'Rosca de Reyes', 'Hamburguesa / Alitas', 'Sushi / Comida', 'A medida'],
      Cantidad: ['10–49 pzs', '50–200 pzs', '250–500 pzs', '1,000+ pzs'],
      Acabado: ['Con ventana', 'Laminado brillante', 'Laminado mate', 'Kraft natural']
    }
  },
  {
    id: 'folletos-menus-tripticos',
    category: 'Organización perfecta y precisa',
    title: 'Folletos, Menús y Trípticos',
    desc: 'Menús plastificados para restaurante, trípticos, dípticos y volantes con doblez preciso e impresión a todo color.',
    image: 'assets/img/prod-folletos-menus.webp',
    specs: {
      Productos: 'Menús para restaurante, trípticos, dípticos, flyers y pósters',
      Resistencia: 'Laminado mate o brillante lavable de alta durabilidad',
      Acabado: 'Doblez automático de precisión sin quebrar el papel'
    },
    options: {
      Formato: ['Menú plastificado', 'Tríptico', 'Folleto / Díptico', 'Volantes / Flyers'],
      Cantidad: ['10–50 pzs', '100–250 pzs', '500 pzs', '1,000+ pzs'],
      Acabado: ['Laminado lavable', 'Couché brillante', 'Couché mate', 'Con doblez']
    }
  },
  {
    id: 'stickers-etiquetas',
    category: 'Adhesivos de alta calidad',
    title: 'Stickers y Etiquetas',
    desc: 'Stickers personalizados, etiquetas para frascos o envases y sellos de seguridad para delivery con materiales resistentes.',
    image: 'assets/img/prod-etiquetas-menus.webp',
    specs: {
      Corte: 'Medio corte (kiss-cut) o suaje a la forma exacta de tu diseño',
      Adherencia: 'Adhesivo firme para vidrio, plástico, cartón y bolsas kraft',
      Acabado: 'Protección contra humedad, refrigeración y roce'
    },
    options: {
      Formato: ['Stickers con forma', 'Etiqueta para envase', 'Sello seguridad delivery', 'Planilla'],
      Cantidad: ['50–100 pzs', '250–500 pzs', '1,000 pzs', '5,000+ pzs'],
      Acabado: ['Brillante', 'Mate', 'Resistente a humedad', 'Con foil metálico']
    }
  },
  {
    id: 'tarjetas-presentacion',
    category: 'Impresión para tu marca',
    title: 'Tarjetas de Presentación',
    desc: 'Tarjetas de presentación en cartulinas de alto gramaje con diferentes acabados, laminado suave y detalles metálicos.',
    image: 'assets/img/prod-papeleria-corporativa.webp',
    specs: {
      Papel: 'Cartulina sulfatada o couché de alto gramaje (300 g / 14 pts)',
      Acabados: 'Laminado mate, barniz a registro, foil dorado/plateado o realce',
      Complementos: 'También imprimimos hojas membretadas, sobres y folders'
    },
    options: {
      Formato: ['Estándar (9×5 cm)', 'Cuadrada', 'Esquinas redondeadas', 'Tarjeta + Folder'],
      Cantidad: ['100–250 pzs', '500 pzs', '1,000 pzs', '2,000+ pzs'],
      Acabado: ['Laminado mate', 'Mate + Foil metálico', 'Brillante', 'Con realce']
    }
  },
  {
    id: 'libros-catalogos-bolsas',
    category: 'Editorial y presentación comercial',
    title: 'Libros, Catálogos y Bolsas',
    desc: 'Catálogos de productos, libros con lomo resistente (PUR), revistas, bolsas de papel impresas y fajillas para envases.',
    image: 'assets/img/prod-libros-catalogos.webp',
    specs: {
      Encuadernación: 'Pegado PUR / Hot-Melt ultra resistente o a caballo (grapa)',
      Bolsas: 'Bolsas kraft o blancas y fajillas impresas desde 10 piezas',
      Acabados: 'Portadas con laminado mate, brillante o foil metálico'
    },
    options: {
      Formato: ['Catálogo de productos', 'Libro pasta blanda', 'Bolsas impresas', 'Fajillas para envase'],
      Cantidad: ['10–50 pzs', '100–300 pzs', '500 pzs', '1,000+ pzs'],
      Acabado: ['Lomo pegado PUR', 'Engrapado', 'Portada con foil', 'Impresión a color']
    }
  }
];

let activeProduct = null;
let selection = {};

function openConfigurator(productId) {
  const p = CATALOG_PRODUCTS.find(x => x.id === productId);
  const dialog = document.getElementById('configurator');
  if (!p || !dialog) return;

  activeProduct = p;
  selection = Object.fromEntries(Object.entries(p.options).map(([k, v]) => [k, v[0]]));

  const imgEl = dialog.querySelector('[data-cfg="img"]');
  imgEl.src = p.image;
  imgEl.alt = p.title;
  dialog.querySelector('[data-cfg="cat"]').textContent = p.category;
  dialog.querySelector('[data-cfg="title"]').textContent = p.title;
  dialog.querySelector('[data-cfg="desc"]').textContent = p.desc;
  dialog.querySelector('[data-cfg="specs"]').innerHTML = Object.entries(p.specs)
    .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');

  dialog.querySelector('[data-cfg="options"]').innerHTML = Object.entries(p.options).map(([group, values]) => `
    <fieldset class="cfg-group">
      <legend>${group}</legend>
      <div class="chips">
        ${values.map((v, i) => `
          <label class="chip">
            <input type="radio" name="cfg-${group}" value="${v}" ${i === 0 ? 'checked' : ''} onchange="selection['${group}'] = this.value">
            <span>${v}</span>
          </label>
        `).join('')}
      </div>
    </fieldset>
  `).join('');

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
