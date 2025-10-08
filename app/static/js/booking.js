document.addEventListener('DOMContentLoaded', () => {
  console.log('📅 Booking.js loaded')

  let arrivalPicker, departurePicker
  let pricePerNight = 150 // fallback until /api/config is loaded

  // Detect page language
  const pageLang = document.documentElement.lang || 'en'

  // Translated messages
  const messages = {
    it: {
      selectDates: {
        title: 'Attenzione ✨',
        message:
          'Per favore seleziona sia la data di check-in che quella di check-out per continuare.',
      },
      invalidRange: {
        title: 'Data non valida 🚫',
        message: 'La data di check-out deve essere successiva alla data di check-in.',
      },
    },
    en: {
      selectDates: {
        title: 'Heads up ✨',
        message: 'Please select both your check-in and check-out dates to proceed.',
      },
      invalidRange: {
        title: 'Invalid dates 🚫',
        message: 'Your check-out date must come after your check-in date.',
      },
    },
    fr: {
      selectDates: {
        title: 'Attention ✨',
        message: 'Veuillez sélectionner à la fois la date d’arrivée et de départ pour continuer.',
      },
      invalidRange: {
        title: 'Dates invalides 🚫',
        message: 'La date de départ doit être postérieure à la date d’arrivée.',
      },
    },
    de: {
      selectDates: {
        title: 'Hinweis ✨',
        message: 'Bitte wählen Sie sowohl Check-in- als auch Check-out-Datum, um fortzufahren.',
      },
      invalidRange: {
        title: 'Ungültiges Datum 🚫',
        message: 'Das Check-out-Datum muss nach dem Check-in-Datum liegen.',
      },
    },
  }

  // Helper to show translated popups
  function showMessage(type) {
    const msg = messages[pageLang]?.[type] || messages.en[type]
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'warning',
        title: msg.title,
        text: msg.message,
        confirmButtonText: 'OK',
        confirmButtonColor: '#2b5876',
        customClass: { popup: 'rounded-4 shadow-lg' },
      })
    } else {
      alert(msg.title + '\n' + msg.message)
    }
  }

  // Load price from backend
  fetch('/api/config')
    .then(res => res.json())
    .then(cfg => {
      if (cfg.pricePerNight) {
        pricePerNight = cfg.pricePerNight
        console.log('💰 Price per night loaded:', pricePerNight)
      }
    })
    .catch(err => console.error('❌ Error loading price config:', err))

  // Load booked dates
  fetch('/api/booked-dates')
    .then(res => res.json())
    .then(bookedDates => {
      console.log('✅ Booked dates:', bookedDates)

      const options = {
        dateFormat: 'Y-m-d',
        minDate: 'today',
        disable: bookedDates,
        onDayCreate: (dObj, dStr, fp, dayElem) => {
          const date = dayElem.dateObj.toISOString().split('T')[0]
          if (bookedDates.includes(date)) {
            dayElem.classList.add('booked-date')
          } else if (dayElem.dateObj >= new Date()) {
            dayElem.classList.add('available-date')
          }
        },
      }

      if (document.getElementById('select-arrival-date')) {
        arrivalPicker = flatpickr('#select-arrival-date', options)
      }
      if (document.getElementById('select-departure-date')) {
        departurePicker = flatpickr('#select-departure-date', options)
      }
    })
    .catch(err => console.error('❌ Error fetching booked dates:', err))

  // Availability check button
  const checkBtn = document.getElementById('checkAvailabilityBtn')
  if (checkBtn) {
    checkBtn.addEventListener('click', () => {
      const checkinInput = document.getElementById('select-arrival-date')
      const checkoutInput = document.getElementById('select-departure-date')
      const guestsInput = document.querySelector("input[name='guests']")

      if (!checkinInput || !checkoutInput || !guestsInput) {
        console.error('❌ Missing form inputs')
        return
      }

      const checkin = checkinInput.value
      const checkout = checkoutInput.value
      const guests = guestsInput.value

      if (!checkin || !checkout) {
        showMessage('selectDates')
        return
      }

      const checkinDate = flatpickr.parseDate(checkin, 'Y-m-d')
      const checkoutDate = flatpickr.parseDate(checkout, 'Y-m-d')

      if (!checkinDate || !checkoutDate || checkoutDate <= checkinDate) {
        showMessage('invalidRange')
        return
      }

      const diffTime = Math.abs(checkoutDate - checkinDate)
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      const total = nights * pricePerNight

      // Populate modal
      document.getElementById('modal-checkin').textContent = checkin
      document.getElementById('modal-checkout').textContent = checkout
      document.getElementById('modal-nights').textContent = nights
      document.getElementById('modal-guests').textContent = guests
      document.getElementById('modal-total').textContent = total

      const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'))
      bookingModal.show()
    })
  }

  // Booking form submit
  // Booking form submit
  const bookingForm = document.getElementById('bookingForm')
  if (bookingForm) {
    bookingForm.addEventListener('submit', async function (e) {
      e.preventDefault()

      // Query only inside bookingForm
      const data = {
        fullName: bookingForm.querySelector('#fullName')?.value || '',
        phone: bookingForm.querySelector('#phone')?.value || '',
        email: bookingForm.querySelector('#email')?.value || '',
        checkinTime: bookingForm.querySelector('#checkinTime')?.value || '',
        checkoutTime: bookingForm.querySelector('#checkoutTime')?.value || '',
        modalCheckin: document.getElementById('modal-checkin')?.textContent || '',
        modalCheckout: document.getElementById('modal-checkout')?.textContent || '',
        modalNights: document.getElementById('modal-nights')?.textContent || '',
        modalGuests: document.getElementById('modal-guests')?.textContent || '',
        modalTotal: document.getElementById('modal-total')?.textContent || '',
      }

      console.log('📤 Sending booking request:', data)

      if (!data.email) {
        console.error('❌ No email provided in form!')
        Swal.fire({
          icon: 'error',
          title: 'Errore',
          text: 'Inserisci un indirizzo email valido per confermare la prenotazione.',
        })
        return
      }

      try {
        const response = await fetch('/send-booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        const result = await response.json()
        console.log('✅ Booking response:', result)

        if (typeof Swal !== 'undefined') {
          Swal.fire({
            icon: result.success ? 'success' : 'error',
            title: result.success ? 'Prenotazione Confermata 🎉' : 'Errore ❌',
            text: result.message,
            confirmButtonColor: '#2b5876',
          })
        } else {
          alert(result.message)
        }

        if (result.success) {
          const bookingModal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'))
          bookingModal.hide()
          bookingForm.reset()
        }
      } catch (err) {
        console.error('❌ Error submitting booking:', err)
        alert('Failed to send booking. Please try again.')
      }
    })
  }
})
