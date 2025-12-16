// i18n.ts
export type Lang = "en" | "it";

export const translations = {
  en: {
    nav: {
      villa: "The Apartment",
      experience: "Experience",
      journal: "Gallery",
      location: "Location",
      enquire: "Contact",
      book: "Book now",
      apartment: "Apartment",
      gallery: "Gallery",
    },

    hero: {
      subtitle: "Ostuni • Puglia",
      tagline: "Your gateway to serenity.",
    },

    discover: "Discover",

    sectionIntro: {
      title: "Where ancient limestone meets",
      highlight: "modern comfort",
      text:
        "La Quattordici is an elegant stone apartment in Ostuni’s historic center. Authentic Apulian charm and modern comfort — a perfect place to slow down, breathe in the Adriatic breeze, and explore the White City.",
    },

    stats: {
      bedrooms: "1 Bedroom",
      bathrooms: "1 Bathroom",
      guests: "Up to 3 Guests",
      wifi: "Wi-Fi",
    },

    experience: {
      title: "The Experience",
      viewAll: "Discover More",
      items: [
        {
          icon: "countertops",
          title: "Fully Equipped Kitchen",
          desc:
            "Everything you need to feel at home, with modern appliances and space to enjoy local ingredients.",
        },
        {
          icon: "thermostat",
          title: "Climate Comfort",
          desc:
            "Air conditioning and heating for a comfortable stay in every season.",
        },
        {
          icon: "checkroom",
          title: "Comfort Essentials",
          desc:
            "Soft linens and towels, curated details, and thoughtful touches for an easy, relaxing stay.",
        },
      ],
    },

    booking: {
      title: "Check availability",
      startingFrom: "Starting from",
      night: "/ night",
      checkIn: "Check-in",
      checkOut: "Check-out",
      guests: "Guests",
      selectDate: "Select date",
      request: "Book now",
      disclaimer: "No charge yet",
      rare: "Rare find",
      rareText: "La Quattordici is often fully booked for these dates.",
    },

    location: {
      topBarAddress: "Via Leonardo Clemente 26, Ostuni (BR), Italy",
      topBarEmail: "laquattordiciluxuryapartment@gmail.com",
      topBarPhone: "+39 392 024 2382",
      surroundingsLabel: "The Surroundings",
      title: "In the Heart of History",
      text:
        "Inside the ancient walls, you’re just steps from the Cathedral and the historic center’s best spots. The area is pedestrian-only, for quiet nights and peaceful mornings among the white limestone alleys.",
      poi1Title: "Piazza della Libertà",
      poi1Meta: "2 min walk • Main square",
      poi2Title: "Costa Merlata",
      poi2Meta: "15 min drive • Beaches",
    },

    gallery: {
      title: "Our Gallery",
      intro:
        "Discover the charm of our stone home in Ostuni’s historic center. Authentic architecture, modern comfort and refined design — the perfect place to unwind after exploring Puglia.",
      viewGallery: "View gallery",
      photosCount: "24 Photos",
    },

    footer: {
      description:
        "La Quattordici Luxury Apartment · Ostuni. Authentic elegance with the comfort of home — perfect for couples, families, and slow travelers.",
      contactTitle: "Contact",
      followTitle: "Follow us",
      addressLabel: "Address",
      mapsCta: "Open in Google Maps →",
      privacy: "Privacy Policy",
      madeWith: "Made with",
      madeIn: "in Ostuni",
      rights: "All rights reserved.",
    },

    surroundings: {
      label: "The Surroundings",
      title: "In the Heart of History",
      description:
        "Inside the ancient walls, you’re just steps from the Cathedral and the historic center’s best spots. The area is pedestrian-only, for quiet nights and peaceful mornings among the white limestone alleys.",
      poi1Title: "Piazza della Libertà",
      poi1Meta: "2 min walk • Main square",
      poi2Title: "Costa Merlata",
      poi2Meta: "15 min drive • Beaches",
      city: "Ostuni",
      region: "Puglia, Italy",
      openMaps: "Open in Google Maps",
    },
  },

  it: {
    nav: {
      apartment: "La Dimora",
      gallery: "Galleria",
      villa: "La Dimora",
      experience: "Esperienza",
      journal: "Galleria",
      location: "Posizione",
      enquire: "Contatti",
      book: "Prenota",
    },

    hero: {
      subtitle: "Ostuni • Puglia",
      tagline: "La tua porta verso la serenità.",
    },

    discover: "Scopri",

    sectionIntro: {
      title: "Dove la pietra antica incontra",
      highlight: "il comfort moderno",
      text:
        "La Quattordici è un elegante appartamento in pietra nel centro storico di Ostuni. Autenticità pugliese e comfort moderno: il luogo ideale per rallentare, respirare la brezza adriatica e vivere la Città Bianca.",
    },

    stats: {
      bedrooms: "1 Camera",
      bathrooms: "1 Bagno",
      guests: "Fino a 3 Ospiti",
      wifi: "Wi-Fi",
    },

    experience: {
      title: "L'Esperienza",
      viewAll: "Scopri di più",
      items: [
        {
          icon: "countertops",
          title: "Cucina Attrezzata",
          desc:
            "Tutto il necessario per sentirsi a casa, con dotazioni moderne e spazio per gustare i prodotti locali.",
        },
        {
          icon: "thermostat",
          title: "Comfort Climatico",
          desc:
            "Aria condizionata e riscaldamento per un soggiorno confortevole in ogni stagione.",
        },
        {
          icon: "checkroom",
          title: "Essenziali di Comfort",
          desc:
            "Biancheria e asciugamani morbidi, dettagli curati e piccole attenzioni per un soggiorno rilassante.",
        },
      ],
    },

    booking: {
      title: "Verifica disponibilità",
      startingFrom: "A partire da",
      night: "/ notte",
      checkIn: "Check-in",
      checkOut: "Check-out",
      guests: "Ospiti",
      selectDate: "Seleziona data",
      request: "Prenota",
      disclaimer: "Nessun addebito immediato",
      rare: "Alloggio raro",
      rareText: "La Quattordici è spesso al completo in queste date.",
    },

    location: {
      topBarAddress: "Via Leonardo Clemente 26, Ostuni (BR), Italia",
      topBarEmail: "laquattordiciluxuryapartment@gmail.com",
      topBarPhone: "+39 392 024 2382",
      surroundingsLabel: "Dintorni",
      title: "Nel cuore della storia",
      text:
        "All’interno delle antiche mura, sei a pochi passi dalla Cattedrale e dai punti più iconici del centro storico. Zona pedonale: notti silenziose e mattine tranquille tra i vicoli di pietra bianca.",
      poi1Title: "Piazza della Libertà",
      poi1Meta: "2 min a piedi • Piazza principale",
      poi2Title: "Costa Merlata",
      poi2Meta: "15 min in auto • Spiagge",
    },

    gallery: {
      title: "La nostra galleria",
      intro:
        "Scopri il fascino della nostra casa in pietra nel centro storico di Ostuni. Architettura autentica, comfort moderno e design curato: il luogo ideale per rilassarti dopo aver esplorato la Puglia.",
      viewGallery: "Apri galleria",
      photosCount: "24 foto",
    },

    footer: {
      description:
        "La Quattordici Luxury Apartment · Ostuni. Eleganza autentica con il comfort di casa — perfetto per coppie, famiglie e viaggiatori slow.",
      contactTitle: "Contatti",
      followTitle: "Seguici",
      addressLabel: "Indirizzo",
      mapsCta: "Apri su Google Maps →",
      privacy: "Privacy Policy",
      madeWith: "Creato con",
      madeIn: "a Ostuni",
      rights: "Tutti i diritti riservati.",
    },

    surroundings: {
      label: "Dintorni",
      title: "Nel cuore della storia",
      description:
        "All’interno delle antiche mura, sei a pochi passi dalla Cattedrale e dai punti più iconici del centro storico. Zona pedonale: notti silenziose e mattine tranquille tra i vicoli di pietra bianca.",
      poi1Title: "Piazza della Libertà",
      poi1Meta: "2 min a piedi • Piazza principale",
      poi2Title: "Costa Merlata",
      poi2Meta: "15 min in auto • Spiagge",
      city: "Ostuni",
      region: "Puglia, Italia",
      openMaps: "Apri su Google Maps",
    },
  },
} as const;
