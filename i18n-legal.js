/**
 * Textos ES/EN para subpáginas legales. Se fusionan en PAGE_I18N junto con i18n.js.
 */
(function mergeLegalI18n() {
  const legalEs = {
    'legal.aviso.metaTitle': 'Aviso Legal — AIDCO',
    'legal.aviso.metaDescription': 'Aviso legal del sitio web de AIDCO: empresa de infraestructura tecnológica, CCTV y redes en Tijuana, Baja California.',
    'legal.aviso.back': '← Volver al inicio',
    'legal.aviso.h1': 'Aviso Legal',
    'legal.aviso.p1':
      'En cumplimiento de la legislación aplicable en los Estados Unidos Mexicanos, el presente aviso tiene por objeto informar a los usuarios del sitio web operado por <strong>AIDCO</strong>, con domicilio en <strong>Tijuana, Baja California, México</strong>, respecto del uso del portal y de la información en él contenida.',
    'legal.aviso.p2':
      'Los contenidos de este sitio (textos, logotipos, imágenes, diseño y demás elementos) son propiedad de AIDCO o se utilizan con la autorización correspondiente. Queda prohibida su reproducción, distribución o comunicación pública sin consentimiento previo por escrito, salvo lo permitido por la ley.',
    'legal.aviso.p3':
      'La información publicada tiene fines informativos y comerciales generales sobre los servicios de la empresa. AIDCO procura que los datos sean exactos y estén actualizados, pero no garantiza la ausencia de errores u omisiones. Las decisiones tomadas con base en dicha información son responsabilidad del usuario.',
    'legal.aviso.p4':
      'Los proyectos, cotizaciones, alcances técnicos y condiciones comerciales se formalizan mediante propuestas y contratos específicos entre AIDCO y el cliente. Nada en este sitio constituye oferta vinculante si no se pacta expresamente por escrito.',
    'legal.aviso.p5':
      'Los enlaces a sitios de terceros se ofrecen como referencia. AIDCO no controla esos sitios ni es responsable de sus contenidos ni de sus políticas de privacidad.',
    'legal.aviso.p6':
      'Para cualquier aclaración relacionada con este aviso puede contactarnos en <a href="mailto:ar@aidco.com.mx">ar@aidco.com.mx</a> o al teléfono <a href="tel:+526646290011">(664) 629-00-11</a>.',
    'legal.aviso.updated': 'Última actualización: mayo de 2026.',

    'legal.priv.metaTitle': 'Políticas de Privacidad — AIDCO',
    'legal.priv.metaDescription': 'Políticas de privacidad de AIDCO: tratamiento de datos personales, derechos ARCO y medios de contacto en Tijuana, B.C.',
    'legal.priv.back': '← Volver al inicio',
    'legal.priv.h1': 'Políticas de Privacidad',
    'legal.priv.p1':
      '<strong>AIDCO</strong>, con domicilio en <strong>Tijuana, Baja California, México</strong>, es responsable del tratamiento de los datos personales que nos proporcione mediante este sitio web, formularios, correo electrónico, teléfono u otros medios de contacto indicados.',
    'legal.priv.p2':
      'Utilizamos sus datos únicamente para fines relacionados con nuestros servicios: atender solicitudes de información, elaborar cotizaciones, dar seguimiento comercial y operativo a proyectos, y mantener comunicación necesaria con clientes y prospectos.',
    'legal.priv.p3':
      'No vendemos ni arrendamos sus datos personales. Podemos utilizar proveedores de servicios (por ejemplo, hospedaje o herramientas de mensajería) que actúan bajo instrucciones nuestras y conforme a obligaciones de confidencialidad y seguridad.',
    'legal.priv.p4':
      'Usted puede ejercer los derechos de acceso, rectificación, cancelación u oposición (<abbr title="Acceso, Rectificación, Cancelación y Oposición">ARCO</abbr>), así como revocar un consentimiento cuando aplique, enviando un correo a <a href="mailto:ar@aidco.com.mx">ar@aidco.com.mx</a> indicando el derecho que desea ejercer, una descripción clara de la solicitud y un medio de contacto para responderle.',
    'legal.priv.p5':
      'Para conocer el uso de cookies y tecnologías similares en este sitio, consulte la <a href="politica-cookies.html">Política de Cookies</a>.',
    'legal.priv.p6':
      'Nos reservamos el derecho de actualizar estas políticas; los cambios relevantes se publicarán en esta página indicando, cuando sea procedente, la fecha de última actualización.',
    'legal.priv.p7':
      'Para dudas sobre privacidad puede escribirnos a <a href="mailto:ar@aidco.com.mx">ar@aidco.com.mx</a> o llamar al <a href="tel:+526646290011">(664) 629-00-11</a>.',
    'legal.priv.updated': 'Última actualización: mayo de 2026.',

    'legal.cookies.metaTitle': 'Política de Cookies — AIDCO',
    'legal.cookies.metaDescription': 'Política de cookies de AIDCO: uso de cookies técnicas, preferencias del sitio y contacto en Tijuana, Baja California.',
    'legal.cookies.back': '← Volver al inicio',
    'legal.cookies.h1': 'Política de Cookies',
    'legal.cookies.p1':
      'Esta política describe el uso de cookies y tecnologías similares en el sitio web de <strong>AIDCO</strong> (Tijuana, Baja California, México).',
    'legal.cookies.p2':
      'Las <strong>cookies</strong> son pequeños archivos que el navegador almacena en su dispositivo. Sirven para que el sitio funcione correctamente, recordar preferencias (por ejemplo, modo claro u oscuro si se guarda en el equipo) o comprender de forma agregada cómo se usa la página.',
    'legal.cookies.p3':
      'Utilizamos principalmente cookies <strong>técnicas o necesarias</strong> para el funcionamiento del sitio. Si en el futuro incorporamos cookies analíticas o de terceros con fines distintos, actualizaremos este texto y, cuando la ley lo exija, solicitaremos su consentimiento de forma previa.',
    'legal.cookies.p4':
      'Puede <strong>configurar su navegador</strong> para bloquear o eliminar cookies. Tenga en cuenta que desactivar ciertas cookies puede afectar el comportamiento del sitio (por ejemplo, preferencias de visualización).',
    'legal.cookies.p5':
      'El tratamiento de datos personales derivado del uso del sitio se describe en nuestras <a href="politicas-privacidad.html">Políticas de Privacidad</a>.',
    'legal.cookies.p6':
      'Para consultas: <a href="mailto:ar@aidco.com.mx">ar@aidco.com.mx</a> · <a href="tel:+526646290011">(664) 629-00-11</a>.',
    'legal.cookies.updated': 'Última actualización: mayo de 2026.',

    'legal.empresa.metaTitle': 'Políticas de la Empresa — AIDCO',
    'legal.empresa.metaDescription': 'Políticas de la empresa AIDCO: compromiso de servicio, calidad, formalización de proyectos y contacto comercial.',
    'legal.empresa.back': '← Volver al inicio',
    'legal.empresa.h1': 'Políticas de la Empresa',
    'legal.empresa.p1':
      '<strong>AIDCO</strong> desarrolla proyectos de infraestructura tecnológica, conectividad y seguridad para empresas. Las presentes políticas reflejan los criterios generales con los que orientamos nuestra operación y relación con clientes y proveedores.',
    'legal.empresa.p2':
      '<strong>Compromiso de servicio:</strong> actuamos con profesionalismo en el diseño, instalación y soporte de soluciones alineadas a las necesidades acordadas con cada cliente.',
    'legal.empresa.p3':
      '<strong>Formalización de proyectos:</strong> cotizaciones, alcances, tiempos y condiciones comerciales se confirman por escrito entre las partes. La información del sitio web es orientativa y no sustituye contratos u órdenes de trabajo firmadas.',
    'legal.empresa.p4':
      '<strong>Calidad y seguridad:</strong> adoptamos buenas prácticas en la ejecución de obra y en el manejo responsable de la información conforme a los marcos aplicables y a los acuerdos contractuales.',
    'legal.empresa.p5':
      '<strong>Marcas y terceros:</strong> las marcas y logotipos de fabricantes o socios comerciales pertenecen a sus titulares y se mencionan únicamente con fines descriptivos.',
    'legal.empresa.p6':
      'Para más detalle sobre el uso del sitio consulte el <a href="aviso-legal.html">Aviso Legal</a> y los <a href="index.html#terminos">Términos de uso</a> en el sitio principal.',
    'legal.empresa.p7':
      'Contacto: <a href="mailto:ar@aidco.com.mx">ar@aidco.com.mx</a> · <a href="tel:+526646290011">(664) 629-00-11</a>.',
    'legal.empresa.updated': 'Última actualización: mayo de 2026.',

    'legal.sub.footerHome': 'Inicio',
    'legal.sub.footerPrivacy': 'Privacidad',
    'legal.sub.footerCookies': 'Cookies',
    'legal.sub.footerCompany': 'Empresa',
    'legal.sub.copyShort': '© 2026 AIDCO · Tijuana, B.C.'
  };

  const legalEn = {
    'legal.aviso.metaTitle': 'Legal Notice — AIDCO',
    'legal.aviso.metaDescription': 'AIDCO legal notice: technology infrastructure, CCTV and networking company in Tijuana, Baja California.',
    'legal.aviso.back': '← Back to home',
    'legal.aviso.h1': 'Legal Notice',
    'legal.aviso.p1':
      'In compliance with applicable legislation in the United Mexican States, this notice informs users of the website operated by <strong>AIDCO</strong>, located at <strong>Tijuana, Baja California, Mexico</strong>, regarding use of the portal and the information it contains.',
    'legal.aviso.p2':
      'Site content (text, logos, images, design and other elements) is owned by AIDCO or used with proper authorization. Reproduction, distribution or public communication without prior written consent is prohibited except as permitted by law.',
    'legal.aviso.p3':
      'Published information is for general informational and commercial purposes about the company’s services. AIDCO strives to keep data accurate and up to date but does not guarantee absence of errors or omissions. Decisions based on such information are the user’s responsibility.',
    'legal.aviso.p4':
      'Projects, quotes, technical scope and commercial terms are formalized through specific proposals and contracts between AIDCO and the client. Nothing on this site constitutes a binding offer unless expressly agreed in writing.',
    'legal.aviso.p5':
      'Links to third-party sites are provided for reference. AIDCO does not control those sites and is not responsible for their content or privacy policies.',
    'legal.aviso.p6':
      'For questions about this notice you may contact us at <a href="mailto:ar@aidco.com.mx">ar@aidco.com.mx</a> or by phone at <a href="tel:+526646290011">(664) 629-00-11</a>.',
    'legal.aviso.updated': 'Last updated: May 2026.',

    'legal.priv.metaTitle': 'Privacy Policy — AIDCO',
    'legal.priv.metaDescription': 'AIDCO privacy policy: personal data processing, ARCO rights and contact information in Tijuana, B.C.',
    'legal.priv.back': '← Back to home',
    'legal.priv.h1': 'Privacy Policy',
    'legal.priv.p1':
      '<strong>AIDCO</strong>, located at <strong>Tijuana, Baja California, Mexico</strong>, is responsible for processing personal data you provide through this website, forms, email, telephone or other listed contact channels.',
    'legal.priv.p2':
      'We use your data solely for purposes related to our services: responding to information requests, preparing quotes, commercial and operational follow-up on projects, and necessary communication with clients and prospects.',
    'legal.priv.p3':
      'We do not sell or lease your personal data. We may use service providers (e.g. hosting or messaging tools) who act on our instructions and under confidentiality and security obligations.',
    'legal.priv.p4':
      'You may exercise rights of access, rectification, cancellation or opposition (<abbr title="Access, Rectification, Cancellation and Opposition">ARCO</abbr>), and revoke consent where applicable, by emailing <a href="mailto:ar@aidco.com.mx">ar@aidco.com.mx</a> stating the right you wish to exercise, a clear description of your request and a contact method for our reply.',
    'legal.priv.p5':
      'For information on cookies and similar technologies on this site, see our <a href="politica-cookies.html">Cookie Policy</a>.',
    'legal.priv.p6':
      'We may update these policies; relevant changes will be posted on this page and, where appropriate, the last updated date will be indicated.',
    'legal.priv.p7':
      'For privacy questions write to <a href="mailto:ar@aidco.com.mx">ar@aidco.com.mx</a> or call <a href="tel:+526646290011">(664) 629-00-11</a>.',
    'legal.priv.updated': 'Last updated: May 2026.',

    'legal.cookies.metaTitle': 'Cookie Policy — AIDCO',
    'legal.cookies.metaDescription': 'AIDCO cookie policy: technical cookies, site preferences and contact in Tijuana, Baja California.',
    'legal.cookies.back': '← Back to home',
    'legal.cookies.h1': 'Cookie Policy',
    'legal.cookies.p1':
      'This policy describes the use of cookies and similar technologies on the website of <strong>AIDCO</strong> (Tijuana, Baja California, Mexico).',
    'legal.cookies.p2':
      '<strong>Cookies</strong> are small files your browser stores on your device. They help the site work properly, remember preferences (such as light or dark mode when saved on your device) or understand in aggregate how the page is used.',
    'legal.cookies.p3':
      'We primarily use <strong>technical or necessary</strong> cookies for site operation. If we later add analytics or third-party cookies for other purposes, we will update this text and, where required by law, ask for your consent beforehand.',
    'legal.cookies.p4':
      'You can <strong>configure your browser</strong> to block or delete cookies. Note that disabling certain cookies may affect site behavior (for example display preferences).',
    'legal.cookies.p5':
      'Processing of personal data related to site use is described in our <a href="politicas-privacidad.html">Privacy Policy</a>.',
    'legal.cookies.p6':
      'Questions: <a href="mailto:ar@aidco.com.mx">ar@aidco.com.mx</a> · <a href="tel:+526646290011">(664) 629-00-11</a>.',
    'legal.cookies.updated': 'Last updated: May 2026.',

    'legal.empresa.metaTitle': 'Company Policies — AIDCO',
    'legal.empresa.metaDescription': 'AIDCO company policies: service commitment, quality, project formalization and business contact.',
    'legal.empresa.back': '← Back to home',
    'legal.empresa.h1': 'Company Policies',
    'legal.empresa.p1':
      '<strong>AIDCO</strong> delivers technology infrastructure, connectivity and security projects for businesses. These policies reflect the general principles guiding our operations and relationships with clients and suppliers.',
    'legal.empresa.p2':
      '<strong>Service commitment:</strong> we act professionally in designing, installing and supporting solutions aligned with each client’s agreed needs.',
    'legal.empresa.p3':
      '<strong>Project formalization:</strong> quotes, scope, timelines and commercial terms are confirmed in writing between the parties. Website information is indicative and does not replace signed contracts or work orders.',
    'legal.empresa.p4':
      '<strong>Quality and security:</strong> we adopt good practices in project execution and responsible handling of information in line with applicable frameworks and contractual agreements.',
    'legal.empresa.p5':
      '<strong>Brands and third parties:</strong> manufacturers’ or partners’ trademarks and logos belong to their owners and are mentioned for descriptive purposes only.',
    'legal.empresa.p6':
      'For more on site use, see the <a href="aviso-legal.html">Legal Notice</a> and <a href="index.html#terminos">Terms of Use</a> on the main site.',
    'legal.empresa.p7':
      'Contact: <a href="mailto:ar@aidco.com.mx">ar@aidco.com.mx</a> · <a href="tel:+526646290011">(664) 629-00-11</a>.',
    'legal.empresa.updated': 'Last updated: May 2026.',

    'legal.sub.footerHome': 'Home',
    'legal.sub.footerPrivacy': 'Privacy',
    'legal.sub.footerCookies': 'Cookies',
    'legal.sub.footerCompany': 'Company',
    'legal.sub.copyShort': '© 2026 AIDCO · Tijuana, B.C.'
  };

  if (!window.PAGE_I18N) window.PAGE_I18N = { es: {}, en: {} };
  Object.assign(window.PAGE_I18N.es, legalEs);
  Object.assign(window.PAGE_I18N.en, legalEn);
})();
