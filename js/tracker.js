/**
 * Impresos Yossant - Monitor de Tráfico y Atribución de Campañas (Telegram Bot Ready)
 * ------------------------------------------------------------------------------------
 * Detecta y persiste automáticamente parámetros de campaña:
 * - ?ref= (ej. ?ref=fb_comida, ?ref=ig_reposteria, ?ref=google_cajas)
 * - Parámetros UTM estándar (utm_source, utm_medium, utm_campaign, utm_content, utm_term)
 * - Click IDs de plataformas (gclid = Google Ads, fbclid = Meta Ads, ttclid = TikTok Ads, igshid = Instagram)
 * - Referrer orgánico (Google Search, Bing, Instagram, Facebook, TikTok, Directo)
 *
 * Para conectar tu Bot de Telegram cuando lo tengas listo:
 * Solo coloca tu `botToken` y `chatId` (o un `webhookUrl` propio) en `TELEGRAM_CONFIG`.
 */

const TELEGRAM_CONFIG = {
  enabled: false, // Cambia a true cuando ingreses tu botToken y chatId o webhookUrl
  botToken: '',   // Ejemplo: '123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ'
  chatId: '',     // Ejemplo: '-1001234567890' o tu ID personal
  webhookUrl: '', // Opcional: Si usas un Cloudflare Worker / Backend propio para tu bot
  siteName: 'Impresos Yossant (impresosyossant.com)'
};

const STORAGE_KEY_ATTRIBUTION = 'yossant_campaign_attribution_v1';
const STORAGE_KEY_VISIT_LOGGED = 'yossant_session_visit_logged_v1';

class YossantTrafficMonitor {
  constructor() {
    this.attribution = this.resolveAttribution();
    this.init();
  }

  /**
   * Lee URL actual, detecta parámetros de campaña o recupera los guardados en la sesión
   */
  resolveAttribution() {
    const params = new URLSearchParams(window.location.search);
    const hasUrlCampaignParams =
      params.has('ref') ||
      params.has('utm_source') ||
      params.has('utm_medium') ||
      params.has('utm_campaign') ||
      params.has('gclid') ||
      params.has('fbclid') ||
      params.has('ttclid') ||
      params.has('igshid');

    let previousAttribution = null;
    const savedRaw = localStorage.getItem(STORAGE_KEY_ATTRIBUTION);
    if (savedRaw) {
      try {
        previousAttribution = JSON.parse(savedRaw);
      } catch (e) {}
    }

    // Si el usuario ya tenía atribución guardada y navega sin parámetros nuevos, conservarla
    if (previousAttribution && !hasUrlCampaignParams) {
      return previousAttribution;
    }

    const refParam = params.get('ref') || '';
    const utmSource = params.get('utm_source') || '';
    const utmMedium = params.get('utm_medium') || '';
    const utmCampaign = params.get('utm_campaign') || '';
    const utmContent = params.get('utm_content') || '';
    const utmTerm = params.get('utm_term') || '';

    let detectedSource = utmSource || refParam;
    let detectedMedium = utmMedium;

    if (!detectedSource) {
      if (params.has('gclid')) {
        detectedSource = 'Google Ads';
        detectedMedium = detectedMedium || 'cpc';
      } else if (params.has('fbclid')) {
        detectedSource = 'Meta Ads (FB/IG)';
        detectedMedium = detectedMedium || 'paid_social';
      } else if (params.has('ttclid')) {
        detectedSource = 'TikTok Ads';
        detectedMedium = detectedMedium || 'paid_social';
      } else if (params.has('igshid')) {
        detectedSource = 'Instagram';
        detectedMedium = detectedMedium || 'social';
      } else if (document.referrer) {
        try {
          const refHost = new URL(document.referrer).hostname.toLowerCase();
          if (refHost.includes('google.')) {
            detectedSource = 'Google Orgánico';
            detectedMedium = 'organic';
          } else if (refHost.includes('bing.') || refHost.includes('yahoo.')) {
            detectedSource = 'Buscador Orgánico';
            detectedMedium = 'organic';
          } else if (refHost.includes('facebook.') || refHost.includes('fb.')) {
            detectedSource = 'Facebook';
            detectedMedium = 'social';
          } else if (refHost.includes('instagram.')) {
            detectedSource = 'Instagram';
            detectedMedium = 'social';
          } else if (refHost.includes('tiktok.')) {
            detectedSource = 'TikTok';
            detectedMedium = 'social';
          } else if (!refHost.includes(window.location.hostname)) {
            detectedSource = refHost;
            detectedMedium = 'referral';
          }
        } catch (e) {
          detectedSource = 'Directo';
        }
      }
    }

    if (!detectedSource) {
      detectedSource = 'Tráfico Directo';
      detectedMedium = detectedMedium || 'direct';
    }

    const campaignLabel =
      utmCampaign ||
      refParam ||
      (params.has('gclid') ? 'Campaña Google Ads' : '') ||
      (params.has('fbclid') ? 'Campaña Meta Ads' : '') ||
      (params.has('ttclid') ? 'Campaña TikTok Ads' : '') ||
      (params.has('igshid') ? 'Perfil / Historia IG' : '') ||
      'General / Orgánico';

    const attributionData = {
      source: detectedSource,
      medium: detectedMedium || 'web',
      campaign: campaignLabel,
      ref: refParam,
      content: utmContent,
      term: utmTerm,
      firstTouchSource: previousAttribution?.firstTouchSource || detectedSource,
      landingPage: window.location.pathname + window.location.search,
      referrer: document.referrer || 'Directo',
      device: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'Móvil 📱' : 'Escritorio 💻',
      firstVisitAt: previousAttribution?.firstVisitAt || new Date().toISOString()
    };

    try {
      localStorage.setItem(STORAGE_KEY_ATTRIBUTION, JSON.stringify(attributionData));
    } catch (e) {}

    return attributionData;
  }

  init() {
    if (!sessionStorage.getItem(STORAGE_KEY_VISIT_LOGGED)) {
      sessionStorage.setItem(STORAGE_KEY_VISIT_LOGGED, '1');
      this.trackEvent('page_view', {
        title: document.title,
        url: window.location.href
      });
    }
  }

  /**
   * Devuelve una etiqueta corta y limpia para incluir al final del mensaje de WhatsApp
   */
  getWhatsAppCampaignTag() {
    const { source, campaign, term } = this.attribution;
    const parts = [source];
    if (campaign && campaign !== 'General / Orgánico' && campaign !== source) {
      parts.push(campaign);
    }
    if (term) {
      parts.push(term);
    }
    return `[Origen: ${parts.join(' | ')}]`;
  }

  /**
   * Envía notificación al Bot de Telegram (con respaldo sendBeacon para cambios de app en móvil)
   */
  async trackEvent(eventType, details = {}) {
    const payload = {
      site: TELEGRAM_CONFIG.siteName,
      eventType,
      timestamp: new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' }),
      attribution: this.attribution,
      details
    };

    try {
      const history = JSON.parse(sessionStorage.getItem('yossant_events_log') || '[]');
      history.push(payload);
      sessionStorage.setItem('yossant_events_log', JSON.stringify(history.slice(-25)));
    } catch (e) {}

    if (!TELEGRAM_CONFIG.enabled) {
      return payload;
    }

    const messageText = this.formatTelegramMessage(payload);

    try {
      if (TELEGRAM_CONFIG.webhookUrl) {
        const bodyStr = JSON.stringify({ ...payload, formattedMessage: messageText });
        if (navigator.sendBeacon) {
          const blob = new Blob([bodyStr], { type: 'application/json' });
          navigator.sendBeacon(TELEGRAM_CONFIG.webhookUrl, blob);
        } else {
          await fetch(TELEGRAM_CONFIG.webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: bodyStr,
            keepalive: true
          });
        }
      } else if (TELEGRAM_CONFIG.botToken && TELEGRAM_CONFIG.chatId) {
        const tgUrl = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;
        const bodyStr = JSON.stringify({
          chat_id: TELEGRAM_CONFIG.chatId,
          text: messageText,
          parse_mode: 'HTML',
          disable_web_page_preview: true
        });
        if (navigator.sendBeacon) {
          const blob = new Blob([bodyStr], { type: 'application/json' });
          navigator.sendBeacon(tgUrl, blob);
        } else {
          await fetch(tgUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: bodyStr,
            keepalive: true
          });
        }
      }
    } catch (err) {
      console.warn('Error al enviar reporte a Telegram:', err);
    }

    return payload;
  }

  formatTelegramMessage(payload) {
    const { eventType, timestamp, attribution, details } = payload;
    const isLead = eventType === 'whatsapp_lead' || eventType === 'form_lead';
    const headerEmoji = isLead ? '🔥 <b>NUEVO LEAD / COTIZACIÓN</b>' : '👀 <b>VISITA AL SITIO WEB</b>';

    const lines = [
      `${headerEmoji} — <b>Impresos Yossant</b>`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `📣 <b>Campaña:</b> ${attribution.campaign}`,
      `🌐 <b>Fuente:</b> ${attribution.source} (${attribution.medium})`,
      `📱 <b>Dispositivo:</b> ${attribution.device}`,
      `🕒 <b>Fecha/Hora:</b> ${timestamp}`
    ];

    if (attribution.term) {
      lines.push(`🔎 <b>Búsqueda/Keyword:</b> ${attribution.term}`);
    }
    if (details.product) {
      lines.push(`📦 <b>Producto:</b> ${details.product}`);
    }
    if (details.configuration) {
      lines.push(`⚙️ <b>Configuración:</b> ${details.configuration}`);
    }
    if (details.ctaLocation) {
      lines.push(`📍 <b>Botón / Sección:</b> ${details.ctaLocation}`);
    }
    if (details.customerName) {
      lines.push(`👤 <b>Cliente:</b> ${details.customerName}${details.customerCompany ? ` (${details.customerCompany})` : ''}`);
    }

    return lines.join('\n');
  }
}

window.yossantTracker = new YossantTrafficMonitor();
