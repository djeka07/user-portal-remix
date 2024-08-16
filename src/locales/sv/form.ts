export default {
  login: {
    title: 'Logga in',
    description: 'Logga in i portalen',
    input: {
      email: {
        label: 'E-post',
        placeholder: 'Skriv in e-post',
        error: {
          empty: 'Du måste skriva in en e-post',
          'not-valid': 'E-posten är inte giltig',
        },
      },
      password: {
        label: 'Lösenord',
        placeholder: 'Skriv in lösenord',
        error: {
          empty: 'Du måste skriva in ett lösenord',
          short: 'Lösenordet måste vara minst 8 tecken',
        },
      },
    },
    error: 'E-post eller lösenord är felaktiga',
    button: 'Logga in',
    link: {
      'not-a-user': 'Inget konto?',
      forgot: 'Glömt lösenord?',
    },
  },
  'new-password': {
    title: 'Bestäm ett nytt lösenord',
    description: '',
    success: 'Ditt nya lösenord är nu sparat. Du kommer redirectas till loginsidan om {{countdown}}',
    error: 'Kunde tyvärr inte spara ditt nya lösenord.',
  },
  register: {
    title: 'Registrera användare',
    description: 'Registrera användare på User Portal',
    button: 'Registrera',
    success:
      'Användaren är skapad. För att kunna logga in måste du få access. Du kommer få ett mail när detta är klart.',
    error: 'Kunde inte skapa användaren. Kontakta oss med nummer {{requestId}} för hjälp',
    input: {
      'first-name': {
        label: 'Förnamn',
        placeholder: 'Skriv in förnamn',
        error: {
          empty: 'Du måste skriva in ett förnamn',
        },
      },
      'last-name': {
        label: 'Efternamn',
        placeholder: 'Skriv in efternamn',
        error: {
          empty: 'Du måste skriva in ett efternamn',
        },
      },
      'confirm-password': {
        label: 'Bekfräfta lösenord',
        placeholder: 'Skriv in lösenord igen',
        error: {
          empty: 'Du måste bekräfta lösenordet',
          'no-match': 'Lösenorden matchar inte',
          short: 'Lösenordet måste vara minst 8 tecken',
        },
      },
    },
  },
  reset: {
    title: 'Återställ lösenord',
    description: 'Återställ lösenordet i portalen',
    button: 'Återställ',
    success: 'En e-post har skickats till din mailaddress med instruktioner för att återställa lösenord.',
    link: {
      login: 'Logga in',
    },
  },
  conversation: {
    title: 'Ny konversation',
    input: {
      message: {
        label: 'Meddelande',
        placeholder: 'Skriv meddelande',
      },
    },
  },
  user: {
    title: {
      create: 'Skapa ny användare',
      update: 'Uppdatera användare',
    },
    input: {
      firstName: { label: 'Förnamn', placeholder: 'Skriv in förnamn', error: 'Du måste skriva in ett förnamn' },
      lastName: { label: 'Efternamn', placeholder: 'Skriv in efternamn', error: 'Du måste skriva in ett efternamn' },
      roles: { label: 'Roller' },
      users: { error: 'Du måste välja minst en användare' },
      apps: { error: 'Du måste välja minst en applikation' },
    },
    success: {
      create: 'Användaren är skapad.',
      update: 'Användare är uppdaterad',
    },
    error: {
      create: 'Kunde inte skapa användaren',
      update: 'Kunde inte uppdatera användaren',
      roles: 'Du måste välja minst en roll',
    },
  },
  'update-password': {
    title: 'Uppdatera lösenord',
    input: {
      'current-password': {
        label: 'Nuvarande lösenord',
        placeholder: 'Skriv in nuvarande lösenord',
        error: {
          empty: 'Du måste fylla i ditt nuvarande lösenord',
        },
      },
    },
  },
};
