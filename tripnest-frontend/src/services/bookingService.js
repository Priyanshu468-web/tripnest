import api from './api';

export const bookingService = {
  createBooking: async (bookingData) => {
    // Standard data payload structure
    const payload = {
      destinationId: bookingData.destinationId,
      destinationName: bookingData.destinationName,
      travelerName: bookingData.travelerName,
      travelerEmail: bookingData.travelerEmail,
      travelerPhone: bookingData.travelerPhone,
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      guestsCount: bookingData.guestsCount,
      totalPrice: bookingData.totalPrice,
      paymentMethod: bookingData.paymentMethod || 'Credit Card',
      bookingDate: new Date().toISOString(),
      status: 'CONFIRMED'
    };

    try {
      // First, try posting to the Spring Boot endpoint
      const response = await api.post('/api/bookings', payload);
      const savedBooking = response.data;
      
      // Also persist to local list for safety & offline mock availability
      saveLocalBooking(savedBooking);
      return savedBooking;
    } catch (error) {
      console.warn("Backend bookings endpoint failed or is not implemented yet. Falling back to local storage.", error);
      
      // Generate a mock confirmed booking object
      const mockBooking = {
        id: Math.floor(Math.random() * 900000) + 100000,
        ...payload,
        status: 'CONFIRMED'
      };
      
      saveLocalBooking(mockBooking);
      return mockBooking;
    }
  },

  getBookings: async () => {
    try {
      const response = await api.get('/api/bookings');
      return response.data;
    } catch (error) {
      console.warn("Could not retrieve bookings from backend. Sourcing from localStorage.", error);
      const localBookings = localStorage.getItem('tripnest_bookings');
      return localBookings ? JSON.parse(localBookings) : [];
    }
  }
};

// Helper to update local storage
const saveLocalBooking = (booking) => {
  const existing = localStorage.getItem('tripnest_bookings');
  const bookingsList = existing ? JSON.parse(existing) : [];
  // Prepend so the newest booking appears first
  bookingsList.unshift(booking);
  localStorage.setItem('tripnest_bookings', JSON.stringify(bookingsList));
};

export default bookingService;
