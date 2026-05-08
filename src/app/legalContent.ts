export type Lang = "en" | "it";

export const legalInfo = {
  propertyName: "La Quattordici Luxury Apartment",
  operatorName: "Michele Mazzarese",
  taxCode: "MZZMHL98D14C424S",
  addressLine: "Via Leonardo Clemente 26",
  cityLine: "72017 Ostuni (BR), Italia",
  email: "laquattordiciluxuryapartment@gmail.com",
  phone: "+39 392 024 2382",
  cin: "IT074012C200120977",
  cis: "074012C200120977",
} as const;

export const legalText = {
  en: {
    footer: {
      legal: "Legal Notice",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      externalContent: "External content preferences",
      operatorLabel: "Operator",
      cinLabel: "CIN",
      cisLabel: "CIS",
    },
    map: {
      title: "External map disabled by default",
      body:
        "This map is provided by Google Maps. Loading it may transmit personal data such as your IP address to Google.",
      accept: "Load Google Maps",
      policy: "See privacy policy",
    },
    form: {
      privacyIntro:
        "We use the details you enter only to answer your availability request and manage your stay inquiry.",
      privacyAck: "I have read the Privacy Policy.",
      privacyLink: "Open Privacy Policy",
      privacyError: "Please confirm that you have read the Privacy Policy.",
    },
    legalNotice: {
      title: "Legal Notice",
      intro:
        "This website promotes a tourist accommodation in Ostuni and allows users to send availability inquiries.",
      operatorTitle: "Operator details",
      identifiersTitle: "Accommodation identifiers",
      contactTitle: "Contact",
    },
    privacy: {
      title: "Privacy Policy",
      intro:
        "This notice explains how personal data is processed when you browse this website or send an availability request.",
      controllerTitle: "Data controller",
      dataTitle: "Data we process",
      dataItems: [
        "Browsing data needed to deliver the website.",
        "Information entered in the availability request form: first name, last name, contact details, stay dates and number of guests.",
        "Any personal data contained in emails or follow-up communications."
      ],
      purposesTitle: "Purposes and legal bases",
      purposesItems: [
        "To answer availability requests and take steps requested before a possible booking.",
        "To manage follow-up communications related to your inquiry or stay.",
        "To comply with legal obligations and protect the operator’s rights when necessary."
      ],
      recipientsTitle: "Recipients",
      recipientsBody:
        "Inquiry data is received by the operator through the configured email inbox and may be handled by hosting, email delivery and technical service providers acting as processors or independent controllers as applicable.",
      retentionTitle: "Retention",
      retentionBody:
        "Availability inquiries are kept only for as long as reasonably necessary to handle the request, any related stay, and legal or administrative obligations. If no booking follows, messages should generally be deleted or archived within 12 months unless a longer retention period is required by law or needed to protect legal claims.",
      transfersTitle: "Third-party services and transfers",
      transfersBody:
        "This website links to or can load third-party services such as Google Maps, WhatsApp, Instagram and email providers. Those services may process personal data under their own privacy policies and may transfer data outside the European Economic Area.",
      rightsTitle: "Your rights",
      rightsBody:
        "You may request access, rectification, erasure, restriction, portability or object to processing where applicable. You may also lodge a complaint with the Italian data protection authority (Garante per la protezione dei dati personali).",
      cookiesTitle: "Cookies and external content",
      cookiesBody:
        "This website does not use analytics or marketing cookies in the current implementation. External content that may involve third-party tracking, such as Google Maps, is blocked by default and loaded only after your choice."
    },
    terms: {
      title: "Terms & Conditions",
      intro:
        "These terms govern the use of this website and the sending of availability inquiries.",
      items: [
        "This website does not complete an online booking or take payment directly. Sending a request does not create a confirmed reservation.",
        "A stay is confirmed only after direct acceptance by the operator and any additional booking conditions communicated to the guest.",
        "Rates, minimum stays, availability, check-in and check-out times may change until a reservation is confirmed.",
        "Guests must provide accurate contact information and any information reasonably needed to manage the request or stay.",
        "House rules, cancellation terms, payment timing and any security or identification requirements are communicated during the booking process and form part of the final agreement.",
        "The operator may refuse requests that are incomplete, inaccurate, unlawful or incompatible with accommodation rules."
      ]
    },
  },
  it: {
    footer: {
      legal: "Note legali",
      privacy: "Privacy Policy",
      terms: "Termini e condizioni",
      externalContent: "Preferenze contenuti esterni",
      operatorLabel: "Gestore",
      cinLabel: "CIN",
      cisLabel: "CIS",
    },
    map: {
      title: "Mappa esterna disattivata di default",
      body:
        "Questa mappa è fornita da Google Maps. Caricandola, dati personali come l'indirizzo IP potrebbero essere trasmessi a Google.",
      accept: "Carica Google Maps",
      policy: "Vedi Privacy Policy",
    },
    form: {
      privacyIntro:
        "Utilizziamo i dati inseriti solo per rispondere alla richiesta di disponibilità e gestire il contatto relativo al soggiorno.",
      privacyAck: "Ho letto la Privacy Policy.",
      privacyLink: "Apri Privacy Policy",
      privacyError: "Conferma di aver letto la Privacy Policy.",
    },
    legalNotice: {
      title: "Note legali",
      intro:
        "Questo sito promuove una struttura ricettiva a Ostuni e consente agli utenti di inviare richieste di disponibilità.",
      operatorTitle: "Dati del gestore",
      identifiersTitle: "Codici identificativi della struttura",
      contactTitle: "Contatti",
    },
    privacy: {
      title: "Privacy Policy",
      intro:
        "Questa informativa spiega come vengono trattati i dati personali quando navighi sul sito o invii una richiesta di disponibilità.",
      controllerTitle: "Titolare del trattamento",
      dataTitle: "Dati trattati",
      dataItems: [
        "Dati di navigazione necessari per erogare il sito.",
        "Informazioni inserite nel modulo di richiesta disponibilità: nome, cognome, contatto, date del soggiorno e numero di ospiti.",
        "Eventuali dati personali contenuti nelle email o nelle comunicazioni successive."
      ],
      purposesTitle: "Finalità e basi giuridiche",
      purposesItems: [
        "Rispondere alle richieste di disponibilità e svolgere misure precontrattuali richieste dall’interessato.",
        "Gestire comunicazioni successive relative alla richiesta o al soggiorno.",
        "Adempiere obblighi di legge e tutelare i diritti del gestore, ove necessario."
      ],
      recipientsTitle: "Destinatari",
      recipientsBody:
        "I dati delle richieste vengono ricevuti dal gestore tramite la casella email configurata e possono essere trattati da fornitori di hosting, posta elettronica e servizi tecnici che agiscono come responsabili del trattamento o titolari autonomi, a seconda dei casi.",
      retentionTitle: "Conservazione",
      retentionBody:
        "Le richieste di disponibilità sono conservate solo per il tempo ragionevolmente necessario a gestire la richiesta, l’eventuale soggiorno e gli obblighi legali o amministrativi. Se non segue una prenotazione, i messaggi dovrebbero di norma essere cancellati o archiviati entro 12 mesi, salvo obblighi di legge o esigenze di tutela in giudizio.",
      transfersTitle: "Servizi terzi e trasferimenti",
      transfersBody:
        "Il sito collega o può caricare servizi di terze parti come Google Maps, WhatsApp, Instagram e provider email. Tali servizi possono trattare dati personali secondo le proprie informative e trasferire dati fuori dallo Spazio Economico Europeo.",
      rightsTitle: "Diritti dell’interessato",
      rightsBody:
        "Puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità o opporti al trattamento nei casi previsti. Puoi inoltre proporre reclamo al Garante per la protezione dei dati personali.",
      cookiesTitle: "Cookie e contenuti esterni",
      cookiesBody:
        "Nell’implementazione attuale il sito non usa cookie analytics o marketing. I contenuti esterni che possono comportare tracciamento di terze parti, come Google Maps, restano bloccati di default e vengono caricati solo dopo una tua scelta."
    },
    terms: {
      title: "Termini e condizioni",
      intro:
        "Questi termini regolano l’uso del sito e l’invio di richieste di disponibilità.",
      items: [
        "Questo sito non conclude una prenotazione online e non incassa pagamenti direttamente. L’invio della richiesta non costituisce prenotazione confermata.",
        "Il soggiorno è confermato solo dopo accettazione diretta del gestore e dopo eventuali ulteriori condizioni di prenotazione comunicate all’ospite.",
        "Tariffe, soggiorno minimo, disponibilità, orari di check-in e check-out possono variare fino alla conferma della prenotazione.",
        "L’ospite deve fornire dati di contatto corretti e le informazioni ragionevolmente necessarie per gestire la richiesta o il soggiorno.",
        "Regole della casa, termini di cancellazione, tempistiche di pagamento e eventuali requisiti di garanzia o identificazione vengono comunicati durante il processo di prenotazione e fanno parte dell’accordo finale.",
        "Il gestore può rifiutare richieste incomplete, inesatte, illecite o incompatibili con le regole della struttura."
      ]
    },
  },
} as const;
