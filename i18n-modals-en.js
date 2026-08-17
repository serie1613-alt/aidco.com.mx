/** English copy for service detail modals and “Quiénes somos” dialogs */
window.SERVICIOS_DETALLE_EN = {
  cctv: {
    title: 'CCTV & Video surveillance',
    html: `
      <p>We design and integrate video surveillance for corporate and industrial environments that demand high availability. We deploy IP cameras in Full HD and 4K, motorized lenses, long-range night vision and storage sized to retain clear evidence for as long as you need.</p>
      <p>We add <strong>video analytics powered by AI</strong>: people and vehicle detection, line crossing and virtual perimeters, counting and real-time alerts—fewer false positives and faster response.</p>
      <p>Monitoring is centralized on NVRs, servers or compatible platforms with secure remote access from desktop or mobile apps. Users, permissions and backups align with your security and compliance policies.</p>
      <p>We train key staff, provide preventive maintenance and ongoing support to keep systems current and stable.</p>
    `
  },
  'control-acceso': {
    title: 'Access control',
    html: `
      <p>We deploy physical access control combining <strong>proximity readers, biometrics (fingerprint, face)</strong> and automated barriers matched to each zone’s risk.</p>
      <p>Permissions are managed in software: user onboarding/offboarding, schedules, access groups and live event auditing—supporting internal policy and traceability.</p>
      <p>We integrate doors, turnstiles, motorized gates and visitor flows for employees and contractors, linking to CCTV and alarms when projects require a coordinated response.</p>
      <p>Commissioning, baseline documentation and support options keep firmware current and downtime low.</p>
    `
  },
  cableado: {
    title: 'Structured cabling',
    html: `
      <p>We plan physical network infrastructure from load tables and pathways through rack and cabinet termination. We use <strong>Cat6A copper</strong> for high-speed links and <strong>single/multi-mode fiber</strong> for backbone and building interconnects.</p>
      <p>We follow practices aligned with references such as <strong>ANSI/TIA</strong>: cable management, bend radius, labeling, patch-panel dressing and network-point documentation.</p>
      <p>We perform (or coordinate) certification testing to validate electrical parameters and channel performance—records that help future expansions and troubleshooting.</p>
      <p>The goal is a scalable, tidy plant that stays easy to operate for years with fewer intermittent faults.</p>
    `
  },
  enlaces: {
    title: 'Metal detector',
    html: `
      <p>Walk-through metal detectors help regulate foot traffic in offices, schools, airports, events, factories and government facilities.</p>
      <p>Modern units combine sensitivity with throughput: multi-zone indication shows where a metallic object is likely located, with immediate visual and audible alarms.</p>
      <p>Rugged designs support continuous operation with straightforward maintenance and configurable sensitivity levels.</p>
      <p>In short: deterrence, detection and peace of mind at every entry.</p>
    `
  },
  telefonia: {
    title: 'IP telephony',
    html: `
      <p>We migrate or deploy <strong>IP PBX</strong> platforms on open standards—extensions, hunt groups, IVR, call queues and schedules tailored to your operation.</p>
      <p>We supply and configure <strong>IP phones and FXO/FXS gateways</strong> when analog lines remain, plus conferencing codecs. We prioritize voice QoS on the data network to reduce drops and echo.</p>
      <p>Where platforms allow, we move you toward <strong>unified communications</strong> across messaging and voice.</p>
      <p>Administrator training, configuration backups and planned upgrades round out the delivery.</p>
    `
  },
  routers: {
    title: 'Routers & Switches',
    html: `
      <p>We engineer switching and routing around topology, VLANs, link aggregation and redundancy (STP, LACP, dual uplinks) to reduce single points of failure.</p>
      <p>Edge routers get stateful firewall policies, NAT, site-to-site or remote-access VPN, and static or dynamic routing as required.</p>
      <p>Switching uses <strong>PoE</strong> where it fits (APs, cameras, phones), QoS queuing and clear access/distribution/core layers when scale demands it.</p>
      <p>Deliverables include logical inventory (IPs, VLANs, admin users), configuration backups and patching guidance aligned with security best practices.</p>
    `
  },
  redes: {
    title: 'IP Networks',
    html: `
      <p>We design stable, scalable enterprise networks: VLAN segmentation, access policies, tidy IP addressing and documentation that simplifies support and growth.</p>
      <p>We integrate switching, routing, Wi-Fi and critical services (CCTV, telephony, access control) on a well-planned shared infrastructure.</p>
      <p>Availability, performance and security come first—with monitoring, config backups and extended-hours support when your contract requires it.</p>
    `
  },
  fibra: {
    title: 'Fiber Optics',
    html: `
      <p>We install <strong>single-mode and multi-mode fiber</strong> for backbone, building interconnects and high-bandwidth endpoints.</p>
      <p>We handle pulling, fusion splicing, patch-panel termination and OTDR testing for reliable, documented links.</p>
      <p>Fiber cuts latency, covers long distances and future-proofs data, voice and video workloads.</p>
    `
  },
  wireless: {
    title: 'Wireless Links',
    html: `
      <p>We deploy <strong>enterprise Wi-Fi</strong> with even coverage, seamless roaming between access points and guest/critical device segmentation.</p>
      <p>Point-to-point or multipoint radio links fill gaps where cabling isn’t practical—keeping speed and stability across warehouses, offices or campuses.</p>
      <p>We size solutions for users, areas and applications so video calls, POS and production systems stay online.</p>
    `
  }
};

window.NOSOTROS_DIALOGOS_EN = {
  'redes-ip': {
    title: 'Is your network slow, unstable or insecure?',
    html: `
      <p><span class="dialogo-rol">Client:</span> Our internet keeps failing—everyone’s productivity drops.</p>
      <p><span class="dialogo-rol">Us:</span> That isn’t normal. You don’t need “more internet,” you need a properly engineered network.</p>
      <p><span class="dialogo-rol">Client:</span> What do you mean?</p>
      <p><span class="dialogo-rol">Us:</span> With a professional IP network you get stable connectivity site-wide, better real-world throughput, security against unauthorized access and full visibility of devices.</p>
      <p><span class="dialogo-rol">Client:</span> That’s exactly what we need.</p>
      <p><span class="dialogo-rol">Us:</span> We design and deploy tailored IP networks so your business runs without interruptions.</p>
      <p class="dialogo-cierre">Your network shouldn’t fail—it should push your business forward. <a href="#contacto" class="nosotros-dialogo-cta" onclick="cerrarNosotrosDialogoModal()">Contact us</a> and optimize your infrastructure today.</p>
    `
  },
  'cctv-ia': {
    title: 'Does your camera system only record—or does it truly protect?',
    html: `
      <p><span class="dialogo-rol">Client:</span> We have cameras, but we mostly review footage after something happens.</p>
      <p><span class="dialogo-rol">Us:</span> That’s the gap. Recording alone isn’t enough anymore—you need intelligence.</p>
      <p><span class="dialogo-rol">Client:</span> What kind?</p>
      <p><span class="dialogo-rol">Us:</span> AI-enabled CCTV spots suspicious behavior in real time, sends instant alerts, identifies people or vehicles and helps prevent incidents before they escalate.</p>
      <p><span class="dialogo-rol">Client:</span> That matters—we want prevention, not only hindsight.</p>
      <p><span class="dialogo-rol">Us:</span> We implement smart surveillance with full control, 24/7 monitoring options and stronger protection for facilities and assets.</p>
      <p class="dialogo-cierre">Security shouldn’t be reactive—it should be intelligent. <a href="#contacto" class="nosotros-dialogo-cta" onclick="cerrarNosotrosDialogoModal()">Contact us</a> and take CCTV to the next level.</p>
    `
  },
  'control-acceso': {
    title: 'Who enters your facility—and who shouldn’t?',
    html: `
      <p><span class="dialogo-rol">Client:</span> Honestly, anyone can walk in—there’s almost no record.</p>
      <p><span class="dialogo-rol">Us:</span> That’s a serious risk. You need control, not only cameras.</p>
      <p><span class="dialogo-rol">Client:</span> How do we fix it?</p>
      <p><span class="dialogo-rol">Us:</span> Access control lets you grant or deny entry, log every event, use cards, fingerprint or facial recognition and manage permissions remotely in real time.</p>
      <p><span class="dialogo-rol">Client:</span> That would bring order and accountability.</p>
      <p><span class="dialogo-rol">Us:</span> Our deployments protect people, property and information.</p>
      <p class="dialogo-cierre">Access shouldn’t be improvised—it should be governed. <a href="#contacto" class="nosotros-dialogo-cta" onclick="cerrarNosotrosDialogoModal()">Contact us</a> and take control from day one.</p>
    `
  },
  wireless: {
    title: 'Does Wi‑Fi fail exactly when you need it most?',
    html: `
      <p><span class="dialogo-rol">Client:</span> Several areas have weak signal; video calls drop and staff complain nonstop.</p>
      <p><span class="dialogo-rol">Us:</span> That happens when wireless isn’t engineered for the space or device count.</p>
      <p><span class="dialogo-rol">Client:</span> Without cabling everyone to death?</p>
      <p><span class="dialogo-rol">Us:</span> A properly designed enterprise WLAN delivers even coverage, higher real throughput, seamless roaming between APs and secure guest segmentation.</p>
      <p><span class="dialogo-rol">Client:</span> We need the warehouse and boardroom to perform equally.</p>
      <p><span class="dialogo-rol">Us:</span> We deploy professional access points, wireless bridges when needed and support so operations don’t rely on consumer routers.</p>
      <p class="dialogo-cierre">Wireless should be dependable—not a gamble. <a href="#contacto" class="nosotros-dialogo-cta" onclick="cerrarNosotrosDialogoModal()">Contact us</a> and bring Wi‑Fi up to the level your business deserves.</p>
    `
  },
  'ia-aplicada': {
    title: 'How is artificial intelligence used today?',
    html: `
      <p>Artificial intelligence is already part of daily life in business and industrial environments. Here are some of its most common applications:</p>
      <p><strong>Security:</strong> analyzes video to detect people, vehicles or unusual behavior and triggers instant alerts.</p>
      <p><strong>Access and control:</strong> recognizes faces, license plates or credentials and streamlines entry with full traceability.</p>
      <p><strong>Networks and infrastructure:</strong> monitors traffic, spots anomalies and helps prevent outages or bottlenecks.</p>
      <p><strong>Operations and maintenance:</strong> processes sensors and logs to anticipate failures, set priorities and cut response times.</p>
      <p>Overall, AI does not replace people: it <strong>filters noise, automates repetitive tasks and delivers clear information</strong> so teams can decide faster and more accurately.</p>
    `
  },
  'experiencia-sector': {
    title: 'What does proven experience in technology infrastructure mean?',
    html: `
      <p>In connectivity, security and communications projects, experience is proven with facts—not words alone. That includes:</p>
      <p><strong>Track record in the field:</strong> years delivering similar deployments in offices, plants, retail and industrial sites.</p>
      <p><strong>Certifications and standards:</strong> knowledge of references such as TIA/EIA, structured cabling practices and sound CCTV and networking methods.</p>
      <p><strong>Documented projects:</strong> drawings, labeling, test records and handover packages that simplify future maintenance.</p>
      <p><strong>Trained teams:</strong> staff with ongoing education on equipment, protocols and market trends.</p>
      <p><strong>Post-installation support:</strong> follow-up, incident resolution and the ability to scale when the business grows.</p>
      <p>Proven experience reduces risk, avoids rework and gives <strong>confidence that the job will be done right the first time</strong>.</p>
    `
  },
  'honestidad-confianza': {
    title: 'Why do honesty and trust matter in a technology project?',
    html: `
      <p>Technology infrastructure is a long-term investment. The relationship with those who design and install it must be transparent:</p>
      <p><strong>Clear scope:</strong> define what each proposal includes and excludes—no mid-project surprises.</p>
      <p><strong>Realistic timelines:</strong> achievable schedules based on site size, permits, availability and technical complexity.</p>
      <p><strong>Direct communication:</strong> share progress, obstacles and changes before they become problems.</p>
      <p><strong>Quality over shortcuts:</strong> use materials and equipment suited to the environment without compromising what matters.</p>
      <p><strong>Commitment after delivery:</strong> warranties, complete documentation and support when needed.</p>
      <p>Trust is built when promises are kept and the client can <strong>make decisions with clear, honest information</strong>.</p>
    `
  },
  'innovacion-vanguardia': {
    title: 'What does innovating with cutting-edge technology mean?',
    html: `
      <p>Innovating is not replacing gear every year—it is adopting current solutions that deliver real value and prepare infrastructure for the future:</p>
      <p><strong>Modern protocols:</strong> high-speed networks, enterprise Wi‑Fi, IP telephony, fiber optics and high-definition video surveillance.</p>
      <p><strong>Scalability:</strong> designs that allow adding cameras, network points or users without rebuilding from scratch.</p>
      <p><strong>Integration:</strong> systems that work together—access, CCTV, network and telephony—instead of isolated silos.</p>
      <p><strong>Continuous updates:</strong> firmware, security patches and periodic reviews to maintain performance.</p>
      <p><strong>Evaluate before adopting:</strong> test new technologies with sound criteria rather than chasing trends with no clear benefit.</p>
      <p>Responsible innovation seeks <strong>more efficiency, stronger security and a technology base built to last</strong>—not just the newest catalog item.</p>
    `
  }
};
