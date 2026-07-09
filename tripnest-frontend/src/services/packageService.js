import api from './api';

export const packageService = {
  getPackages: async (destinationId = null) => {
    try {
      const response = await api.get('/api/packages');
      return response.data;
    } catch (error) {
      console.warn("Backend packages endpoint failed or is not seeded yet. Falling back to dynamic mock packages.", error);
      
      // Dynamic mock packages
      const mockPackages = [
        {
          id: 101,
          name: "Signature Heritage Tour",
          description: "Immerse yourself in history, local cuisine, and historical sight-seeing with an expert certified guide.",
          duration: "4 Days / 3 Nights",
          price: 9500,
          highlights: ["Guided historic monument visits", "Traditional lunch & dinner experiences", "AC transportation included", "Premium hotel stays"],
          included: ["Hotel stays", "Breakfast & Dinner", "Tour Guide", "Monument Entry Tickets"],
          excluded: ["Lunch", "Flight Tickets", "Personal Expenses"]
        },
        {
          id: 102,
          name: "Epic Adventure Tour",
          description: "Get your adrenaline pumping with activities like trekking, paragliding, water sports, and mountain trails.",
          duration: "6 Days / 5 Nights",
          price: 16800,
          highlights: ["Guided mountain trekking/water sports", "Tented camping options", "Adventure equipment & safety gear", "Campfire barbecue night"],
          included: ["Camping/Hotel stays", "All Meals", "Adventure Instructor", "Activity Gear"],
          excluded: ["Travel insurance", "Personal Porter", "Alcoholic drinks"]
        },
        {
          id: 103,
          name: "Premium Luxury Escape",
          description: "Relax in five-star boutique resorts, experience private cruises, spa vouchers, and elite private dining.",
          duration: "5 Days / 4 Nights",
          price: 28900,
          highlights: ["Luxury 5-star villa/resort stay", "Private airport pickup & SUV", "Exclusive couples spa treatment", "Bespoke fine-dining experiences"],
          included: ["5-Star stays", "Bespoke Breakfasts", "Private SUV & chauffeur", "Spa & cruise fees"],
          excluded: ["Airfare", "Personal purchases"]
        }
      ];

      return mockPackages;
    }
  }
};

export default packageService;
