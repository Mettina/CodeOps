import cookingHeroImg from "../assets/cooking hero.jpg";
import homeChefVisitImg from "../assets/Home Chef Visit.jpg";
import mealPrepImg from "../assets/Meal Prep.jpg";
import ethiopianCuisineImg from "../assets/Ethiopian Cuisine.jpg";
import familyDinnerImg from "../assets/Family Dinner Preparation.jpg";
import partyEventCookingImg from "../assets/Party & Event Cooking.jpg";
import breakfastPrepImg from "../assets/Breakfast Preparation.jpg";
import specialDietMealImg from "../assets/Special Diet Meal Preparation.jpg";
import lunchPrepImg from "../assets/Lunch Preparation.jpg";
import paintingHeroImg from "../assets/paintinghero.jpg";
import interiorPaintingImg from "../assets/Interior Painting.jpg";
import exteriorPaintingImg from "../assets/Exterior Painting.jpg";
import wallPaintingImg from "../assets/Wall Painting.jpg";
import ceilingPaintingImg from "../assets/Ceiling Painting.jpg";
import roomPaintingImg from "../assets/Room Painting.jpg";
import doorWindowPaintingImg from "../assets/Door & Window Painting.jpg";
import texturePaintingImg from "../assets/Texture Painting.jpg";
import fullHousePaintingImg from "../assets/Full House Painting.jpg";
import plumbingImg from "../assets/plumbing.jpg";
import electricalImg2 from "../assets/electrical.jpg";import cleaningImg from "../assets/cleaning.jpg";
import categoryFallbackImg from "../assets/hero.jpg";
import deepCleaningImg from "../assets/deepcleaning.jpg";
import regularCleaningImg from "../assets/regularcleaning.jpg";
import kitchenCleaningImg from "../assets/kitchencleaning.jpg";
import bathroomCleaningImg from "../assets/bathroomcleaning.jpg";
import bedroomCleaningImg from "../assets/bedroomcleaning.jpg";
import sofaCleaningImg from "../assets/sofacleaning.jpg";
import windowCleaningImg from "../assets/windowcleaning.jpg";
import moveInMoveOutImg from "../assets/moveinmoveout.jpg";
import leakRepairImg from "../assets/leakrepair.jpg";
import pipeInstallationImg from "../assets/pipeinstallasion.jpg";
import faucetRepairImg from "../assets/Faucet Repair.jpg";
import sinkInstallationImg from "../assets/Sink Installation.jpg";
import toiletRepairImg from "../assets/Toilet Repair.jpg";
import drainUnblockingImg from "../assets/Drain Unblocking.jpg";
import waterTankInstallationImg from "../assets/Water Tank Installation.jpg";
import showerInstallationImg from "../assets/Shower Installation.jpg";
import homeWiringImg from "../assets/homewire.jpg";
import rewiringImg from "../assets/rewiring.jpg";
import lightInstallationImg from "../assets/light installation.jpg";
import switchSocketImg from "../assets/switch & socket installation.jpg";
import fanInstallationImg from "../assets/fan installation.jpg";
import electricalRepairImg from "../assets/electrical repair.jpg";
import circuitBreakerImg from "../assets/circuit breaker installation.jpg";
import generatorInstallationImg from "../assets/generator installation.jpg";


const categories = [
  {
    id: 1,
    name: "Cleaning",
    slug: "cleaning",
    icon: "🧹",
    image: cleaningImg,
    tagline: "Keep your home fresh, clean and healthy.",

    services: [
      {
        id: 101,
        name: "Deep Home Cleaning",
        slug: "deep-home-cleaning",
        price: 650,
        duration: "3 hrs",
        image: deepCleaningImg,
        description:
          "Complete deep cleaning for bedrooms, living rooms, kitchens and bathrooms.",
        features: ["Experienced cleaners", "Eco-friendly products", "Satisfaction guarantee"],
        provider: "Marta Cleaning Services",
      },
      {
        id: 102,
        name: "Regular Home Cleaning",
        slug: "regular-home-cleaning",
        price: 400,
        duration: "2 hrs",
        image: regularCleaningImg,
        description:
          "Routine home cleaning to keep your living space fresh and comfortable.",
        features: ["Weekly options", "Bi-weekly options", "Flexible scheduling"],
        provider: "Bright Home Care",
      },
      {
        id: 103,
        name: "Kitchen Cleaning",
        slug: "kitchen-cleaning",
        price: 300,
        duration: "1.5 hrs",
        image: kitchenCleaningImg,
        description:
          "Detailed cleaning of countertops, appliances, cabinets and kitchen floors.",
        features: ["Degreasing included", "Appliance cleaning", "Cabinet cleaning"],
        provider: "Fresh Home Services",
      },
      {
        id: 104,
        name: "Bathroom Cleaning",
        slug: "bathroom-cleaning",
        price: 250,
        duration: "1 hr",
        image: bathroomCleaningImg,
        description:
          "Thorough bathroom cleaning including tiles, sinks, toilets and showers.",
        features: ["Tile cleaning", "Disinfection", "Shower cleaning"],
        provider: "Clean Home Ethiopia",
      },
      {
        id: 105,
        name: "Bedroom Cleaning",
        slug: "bedroom-cleaning",
        price: 250,
        duration: "1 hr",
        image: bedroomCleaningImg,
        description:
          "Complete bedroom cleaning including floors, surfaces and furniture.",
        features: ["Dust removal", "Floor cleaning", "Surface cleaning"],
        provider: "Marta Cleaning Services",
      },
      {
        id: 106,
        name: "Sofa & Carpet Cleaning",
        slug: "sofa-carpet-cleaning",
        price: 500,
        duration: "2 hrs",
        image: sofaCleaningImg,
        description:
          "Professional cleaning for sofas, carpets and other fabric furniture.",
        features: ["Stain removal", "Deep cleaning", "Odor removal"],
        provider: "Fresh Home Services",
      },
      {
        id: 107,
        name: "Window Cleaning",
        slug: "window-cleaning",
        price: 300,
        duration: "1.5 hrs",
        image: windowCleaningImg,
        description:
          "Professional cleaning of interior and exterior windows and glass surfaces.",
        features: ["Glass cleaning", "Frame cleaning", "Streak-free finish"],
        provider: "Bright Home Care",
      },
      {
        id: 108,
        name: "Move-In / Move-Out Cleaning",
        slug: "move-in-move-out-cleaning",
        price: 900,
        duration: "4 hrs",
        image: moveInMoveOutImg,
        description:
          "Complete cleaning service for homes before moving in or after moving out.",
        features: ["Full home cleaning", "Kitchen cleaning", "Bathroom cleaning"],
        provider: "Clean Home Ethiopia",
      },
    ],
  },

  // ==========================================
  // PLUMBING
  // ==========================================
  {
    id: 2,
    name: "Plumbing",
    slug: "plumbing",
    icon: "🔧",
    image: plumbingImg,
    tagline: "Reliable repairs and installations for your home.",
    services: [
      {
        id: 201,
        name: "Leak Repair",
        slug: "leak-repair",
        price: 700,
        duration: "1 hr",
        image: leakRepairImg,
        description:
          "Professional repair of leaking pipes, taps and plumbing connections.",
        features: ["Same-day service", "Leak detection", "Emergency support"],
        provider: "Betenga Plumbing",
      },
      {
        id: 202,
        name: "Pipe Installation",
        slug: "pipe-installation",
        price: 1000,
        duration: "2-3 hrs",
        image: pipeInstallationImg,
        description:
          "New pipe fitting and installation for kitchens, bathrooms and other areas.",
        features: ["Quality materials", "Professional installation", "Water testing"],
        provider: "Betenga Plumbing",
      },
      {
        id: 203,
        name: "Faucet Repair",
        slug: "faucet-repair",
        price: 350,
        duration: "1 hr",
        image: faucetRepairImg,
        description:
          "Repair of leaking, damaged or malfunctioning kitchen and bathroom faucets.",
        features: ["Leak repair", "Part replacement", "Quick service"],
        provider: "Addis Plumbing Solutions",
      },
      {
        id: 204,
        name: "Sink Installation",
        slug: "sink-installation",
        price: 600,
        duration: "1.5 hrs",
        image: sinkInstallationImg,
        description: "Professional installation of kitchen and bathroom sinks.",
        features: ["Secure installation", "Pipe connection", "Leak testing"],
        provider: "Betenga Plumbing",
      },
      {
        id: 205,
        name: "Toilet Repair",
        slug: "toilet-repair",
        price: 450,
        duration: "1 hr",
        image: toiletRepairImg,
        description: "Repair of leaking, blocked and malfunctioning toilets.",
        features: ["Blockage removal", "Leak repair", "Replacement parts"],
        provider: "Addis Plumbing Solutions",
      },
      {
        id: 206,
        name: "Drain Unblocking",
        slug: "drain-unblocking",
        price: 400,
        duration: "1 hr",
        image: drainUnblockingImg,
        description:
          "Fast removal of blockages from kitchen, bathroom and household drains.",
        features: ["Fast response", "Drain cleaning", "Blockage removal"],
        provider: "Reliable Pipe Services",
      },
      {
        id: 207,
        name: "Water Tank Installation",
        slug: "water-tank-installation",
        price: 1500,
        duration: "4 hrs",
        image: waterTankInstallationImg,
        description:
          "Professional installation and connection of household water tanks.",
        features: ["Tank connection", "Pipe installation", "Leak testing"],
        provider: "Betenga Plumbing",
      },
      {
        id: 208,
        name: "Shower Installation",
        slug: "shower-installation",
        price: 700,
        duration: "2 hrs",
        image: showerInstallationImg,
        description: "Installation and replacement of showers and bathroom fittings.",
        features: ["Professional fitting", "Water connection", "Testing included"],
        provider: "Addis Plumbing Solutions",
      },
    ],
  },
        

  // ==========================================
  // ELECTRICAL
  // ==========================================
  {
    id: 3,
    name: "Electrical",
    slug: "electrical",
    icon: "⚡",
    image: electricalImg2,
    tagline: "Safe and reliable electrical work for your home.",

    services: [
      {
        id: 301,
        name: "Home Wiring",
        slug: "home-wiring",
        price: 800,
        duration: "2-4 hrs",
        image: homeWiringImg,
        description: "Professional electrical wiring for new and existing homes.",
        features: ["Professional electricians", "Safety inspection", "Quality materials"],
        provider: "Betenga Electrical",
      },
      {
        id: 302,
        name: "Rewiring",
        slug: "rewiring",
        price: 1200,
        duration: "4-6 hrs",
        image: rewiringImg,
        description:
          "Replacement of old or damaged electrical wiring throughout the home.",
        features: ["Old wire replacement", "Safety inspection", "Professional installation"],
        provider: "Addis Electrical Services",
      },
      {
        id: 303,
        name: "Light Installation",
        slug: "light-installation",
        price: 350,
        duration: "1 hr",
        image: lightInstallationImg,
        description: "Installation of ceiling lights, wall lights and decorative lighting.",
        features: ["Indoor lighting", "Outdoor lighting", "Safe installation"],
        provider: "Betenga Electrical",
      },
      {
        id: 304,
        name: "Switch & Socket Installation",
        slug: "switch-socket-installation",
        price: 300,
        duration: "1 hr",
        image: switchSocketImg,
        description: "Installation and replacement of electrical switches and wall sockets.",
        features: ["Socket replacement", "Switch replacement", "Safety testing"],
        provider: "Addis Electrical Services",
      },
      {
        id: 305,
        name: "Fan Installation",
        slug: "fan-installation",
        price: 450,
        duration: "1 hr",
        image: fanInstallationImg,
        description: "Installation of ceiling fans and wall-mounted fans.",
        features: ["Secure installation", "Electrical connection", "Testing included"],
        provider: "Betenga Electrical",
      },
      {
        id: 306,
        name: "Electrical Repair",
        slug: "electrical-repair",
        price: 500,
        duration: "1-2 hrs",
        image: electricalRepairImg,
        description: "Diagnosis and repair of common household electrical problems.",
        features: ["Fault diagnosis", "Emergency service", "Safety testing"],
        provider: "SafeVolt Electrical",
      },
      {
        id: 307,
        name: "Circuit Breaker Installation",
        slug: "circuit-breaker-installation",
        price: 900,
        duration: "2 hrs",
        image: circuitBreakerImg,
        description:
          "Installation and replacement of circuit breakers for improved home safety.",
        features: ["Safety inspection", "Breaker installation", "Electrical testing"],
        provider: "SafeVolt Electrical",
      },
      {
        id: 308,
        name: "Generator Installation",
        slug: "generator-installation",
        price: 1800,
        duration: "4 hrs",
        image: generatorInstallationImg,
        description: "Professional household generator setup and electrical connection.",
        features: ["Generator connection", "Safety testing", "Professional setup"],
        provider: "Addis Electrical Services",
      },
    ],
  },

    // ==========================================
  // PAINTING
  // ==========================================
  {
    id: 4,
    name: "Painting",
    slug: "painting",
    icon: "🎨",
    image: paintingHeroImg,
    tagline: "Beautiful interior and exterior painting services.",

    services: [
      {
        id: 401,
        name: "Interior Painting",
        slug: "interior-painting",
        price: 600,
        duration: "4-6 hrs",
        image: interiorPaintingImg,
        description: "Professional painting for interior walls and living spaces.",
        features: ["Surface preparation", "Clean finishing", "Quality paint"],
        provider: "Betenga Painting",
      },
      {
        id: 402,
        name: "Exterior Painting",
        slug: "exterior-painting",
        price: 900,
        duration: "1 day",
        image: exteriorPaintingImg,
        description: "Exterior wall painting using durable and weather-resistant paint.",
        features: ["Weather-resistant paint", "Surface preparation", "Professional finish"],
        provider: "Betenga Painting",
      },
      {
        id: 403,
        name: "Wall Painting",
        slug: "wall-painting",
        price: 450,
        duration: "3 hrs",
        image: wallPaintingImg,
        description: "Fresh paint application for individual walls and rooms.",
        features: ["Color consultation", "Smooth finish", "Clean work"],
        provider: "Addis Color Works",
      },
      {
        id: 404,
        name: "Ceiling Painting",
        slug: "ceiling-painting",
        price: 500,
        duration: "3 hrs",
        image: ceilingPaintingImg,
        description: "Professional ceiling painting for homes and apartments.",
        features: ["Surface preparation", "Smooth finish", "Furniture protection"],
        provider: "Betenga Painting",
      },
      {
        id: 405,
        name: "Room Painting",
        slug: "room-painting",
        price: 700,
        duration: "4 hrs",
        image: roomPaintingImg,
        description:
          "Complete painting service for bedrooms, living rooms and other spaces.",
        features: ["Wall painting", "Ceiling painting", "Clean finishing"],
        provider: "Addis Color Works",
      },
      {
        id: 406,
        name: "Door & Window Painting",
        slug: "door-window-painting",
        price: 400,
        duration: "2 hrs",
        image: doorWindowPaintingImg,
        description: "Painting and refreshing wooden or metal doors and window frames.",
        features: ["Sanding", "Primer application", "Final coat"],
        provider: "Betenga Painting",
      },
      {
        id: 407,
        name: "Texture Painting",
        slug: "texture-painting",
        price: 800,
        duration: "5 hrs",
        image: texturePaintingImg,
        description: "Decorative texture painting to create unique wall finishes.",
        features: ["Decorative designs", "Multiple textures", "Professional finish"],
        provider: "Addis Color Works",
      },
      {
        id: 408,
        name: "Full House Painting",
        slug: "full-house-painting",
        price: 3500,
        duration: "2-3 days",
        image: fullHousePaintingImg,
        description: "Complete interior and exterior painting service for your home.",
        features: ["Whole-house service", "Color consultation", "Surface preparation"],
        provider: "Betenga Painting",
      },
    ],
  },

   // ==========================================
  // COOKING
  // ==========================================
  {
    id: 5,
    name: "Cooking",
    slug: "cooking",
    icon: "🍳",
    image: cookingHeroImg,
    tagline: "Home-cooked meals prepared by trusted chefs.",

    services: [
      {
        id: 501,
        name: "Home Chef Visit",
        slug: "home-chef-visit",
        price: 450,
        duration: "2 hrs",
        image: homeChefVisitImg,
        description: "A private chef prepares a fresh meal in the comfort of your home.",
        features: ["Private chef", "Fresh ingredients", "Custom menu"],
        provider: "Betenga Home Cooking",
      },
      {
        id: 502,
        name: "Meal Prep",
        slug: "meal-prep",
        price: 500,
        duration: "3 hrs",
        image: mealPrepImg,
        description: "Weekly meal preparation with meals portioned and ready to eat.",
        features: ["Weekly preparation", "Multiple meals", "Portion control"],
        provider: "HomeChef Addis",
      },
      {
        id: 503,
        name: "Ethiopian Cuisine",
        slug: "ethiopian-cuisine",
        price: 550,
        duration: "2.5 hrs",
        image: ethiopianCuisineImg,
        description: "Traditional Ethiopian dishes prepared fresh in your home.",
        features: ["Traditional recipes", "Fresh ingredients", "Custom portions"],
        provider: "Betenga Home Cooking",
      },
      {
        id: 504,
        name: "Family Dinner Preparation",
        slug: "family-dinner-preparation",
        price: 650,
        duration: "3 hrs",
        image: familyDinnerImg,
        description: "Fresh and delicious dinner preparation for the whole family.",
        features: ["Family-size meals", "Custom menu", "Fresh ingredients"],
        provider: "HomeChef Addis",
      },
      {
        id: 505,
        name: "Party & Event Cooking",
        slug: "party-event-cooking",
        price: 1500,
        duration: "5 hrs",
        image: partyEventCookingImg,
        description:
          "Professional cooking service for birthdays, celebrations and events.",
        features: ["Large portions", "Custom menu", "Event preparation"],
        provider: "Betenga Catering",
      },
      {
        id: 506,
        name: "Breakfast Preparation",
        slug: "breakfast-preparation",
        price: 300,
        duration: "1 hr",
        image: breakfastPrepImg,
        description: "Fresh breakfast prepared and served in your home.",
        features: ["Fresh ingredients", "Custom breakfast", "Morning service"],
        provider: "HomeChef Addis",
      },
      {
        id: 507,
        name: "Special Diet Meal Preparation",
        slug: "special-diet-meal-preparation",
        price: 600,
        duration: "3 hrs",
        image: specialDietMealImg,
        description: "Customized meals prepared according to your dietary preferences.",
        features: ["Customized meals", "Fresh ingredients", "Portion control"],
        provider: "Healthy Home Kitchen",
      },
      {
        id: 508,
        name: "Lunch Preparation",
        slug: "lunch-preparation",
        price: 400,
        duration: "1.5 hrs",
        image: lunchPrepImg,
        description: "Fresh homemade lunch prepared according to your preferred menu.",
        features: ["Custom menu", "Fresh ingredients", "Home cooking"],
        provider: "Betenga Home Cooking",
      },
    ],
  },
];
export default categories;