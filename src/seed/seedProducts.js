require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const products = [
  // ─── Households → Detergents & Cleaning (10 items) ───

  {
    name: "Ariel Matic Liquid 500ml",
    description: "Superior stain removal for auto machines.",
    price: 155, originalPrice: 190, category: "Households", subcategory: "Detergents & Cleaning", unit: "500ml",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&auto=format&fit=crop",
    stock: 80, rating: 4.6, reviews: 95
  },
  {
    name: "Lizol Floor Cleaner Citrus",
    description: "Kills 99.9% germs, leaves fresh scent.",
    price: 220, originalPrice: 250, category: "Households", subcategory: "Detergents & Cleaning", unit: "2 L",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=500&auto=format&fit=crop",
    stock: 200, rating: 4.8, reviews: 320
  },
  {
    name: "Vim Dishwash Liquid Lemon",
    description: "Cuts through tough grease in seconds.",
    price: 89, originalPrice: 110, category: "Households", subcategory: "Detergents & Cleaning", unit: "750ml",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format&fit=crop",
    stock: 150, rating: 4.5, reviews: 180
  },
  {
    name: "Harpic Toilet Cleaner",
    description: "Powerful cleaning and germ kill.",
    price: 95, originalPrice: 125, category: "Households", subcategory: "Detergents & Cleaning", unit: "500ml",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&auto=format&fit=crop",
    stock: 120, rating: 4.7, reviews: 290
  },
  {
    name: "Comfort Fabric Conditioner",
    description: "Long lasting fragrance and softness.",
    price: 145, originalPrice: 175, category: "Households", subcategory: "Detergents & Cleaning", unit: "860ml",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop",
    stock: 90, rating: 4.9, reviews: 150
  },
  {
    name: "Dettol Antiseptic Liquid",
    description: "Trusted protection for health and hygiene.",
    price: 299, originalPrice: 350, category: "Households", subcategory: "Detergents & Cleaning", unit: "1 L",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&auto=format&fit=crop",
    stock: 100, rating: 4.9, reviews: 1200
  },




  // ─── Households → Facewash & skincare (10 items) ───
  {
    name: "Loreal Revitalift Face Wash",
    description: "Anti-aging creamy foam cleanser.",
    price: 450, originalPrice: 550, category: "Households", subcategory: "Facewash & skincare", unit: "100ml",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&auto=format&fit=crop",
    stock: 50, rating: 4.8, reviews: 620
  },
  {
    name: "Himalaya Neem Facewash 200ml",
    description: "Prevent pimples with natural neem.",
    price: 180, originalPrice: 210, category: "Households", subcategory: "Facewash & skincare", unit: "200ml",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500&auto=format&fit=crop",
    stock: 120, rating: 4.6, reviews: 500
  },

  {
    name: "Ponds White Beauty Cream",
    description: "Spotless fairness with pro-vitamin B3.",
    price: 120, originalPrice: 150, category: "Households", subcategory: "Facewash & skincare", unit: "50g",
    image: "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=500&auto=format&fit=crop",
    stock: 100, rating: 4.5, reviews: 120
  },
  {
    name: "Neutrogena Hydro Boost Water Gel",
    description: "Instantly quenches dry skin.",
    price: 950, originalPrice: 1100, category: "Households", subcategory: "Facewash & skincare", unit: "50g",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop",
    stock: 40, rating: 4.9, reviews: 210
  },
  {
    name: "Biotique Bio Papaya Face Scrub",
    description: "Visibly ageless skin with tan removal.",
    price: 135, originalPrice: 160, category: "Households", subcategory: "Facewash & skincare", unit: "75g",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500&auto=format&fit=crop",
    stock: 75, rating: 4.4, reviews: 130
  },
  {
    name: "Mamaearth Onion Hair Oil",
    description: "For hair fall control and boost hair growth.",
    price: 399, originalPrice: 450, category: "Households", subcategory: "Facewash & skincare", unit: "150ml",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&auto=format&fit=crop",
    stock: 60, rating: 4.7, reviews: 250
  },
  {
    name: "Vicco Turmeric Skin Cream",
    description: "Ayurvedic medicine with turmeric and sandalwood.",
    price: 110, originalPrice: 130, category: "Households", subcategory: "Facewash & skincare", unit: "50g",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=500&auto=format&fit=crop",
    stock: 100, rating: 4.6, reviews: 150
  },
  {
    name: "Joy Aloe Vera Moisturizer",
    description: "Non-sticky, lightweight face moisturizer.",
    price: 85, originalPrice: 100, category: "Households", subcategory: "Facewash & skincare", unit: "200ml",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500&auto=format&fit=crop",
    stock: 120, rating: 4.4, reviews: 88
  },


  // ─── Households → Hair care (10 items) ───
  {
    name: "Tresemme Keratin Smooth Shampoo",
    description: "Frizz control for shiny hair.",
    price: 240, originalPrice: 300, category: "Households", subcategory: "Hair care", unit: "580ml",
    image: "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=500&auto=format&fit=crop",
    stock: 90, rating: 4.7, reviews: 350
  },
  {
    name: "Loreal Hair Serum 100ml",
    description: "Extraordinary oil for nourishment.",
    price: 499, originalPrice: 599, category: "Households", subcategory: "Hair care", unit: "100ml",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&auto=format&fit=crop",
    stock: 45, rating: 4.9, reviews: 210
  },
  {
    name: "Dove Intense Repair Conditioner",
    description: "Nourishment for damaged hair.",
    price: 180, originalPrice: 210, category: "Households", subcategory: "Hair care", unit: "175ml",
    image: "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=500&auto=format&fit=crop",
    stock: 120, rating: 4.6, reviews: 450
  },


  {
    name: "Clinic Plus Strong & Long",
    description: "Milk protein formula for healthy hair.",
    price: 99, originalPrice: 120, category: "Households", subcategory: "Hair care", unit: "340ml",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=500&auto=format&fit=crop",
    stock: 150, rating: 4.4, reviews: 220
  },
  {
    name: "Pantene Hair Fall Control",
    description: "Pro-V formula to reduce hair fall.",
    price: 210, originalPrice: 250, category: "Households", subcategory: "Hair care", unit: "360ml",
    image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=500&auto=format&fit=crop",
    stock: 100, rating: 4.3, reviews: 180
  },

  {
    name: "Schwarzkopf Hair Color Natural",
    description: "Permanent hair color with shine.",
    price: 450, originalPrice: 550, category: "Households", subcategory: "Hair care", unit: "Box",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop",
    stock: 40, rating: 4.5, reviews: 66
  },
  {
    name: "Garnier Fructis Serum",
    description: "Smoothness and shine for dull hair.",
    price: 249, originalPrice: 299, category: "Households", subcategory: "Hair care", unit: "100ml",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop",
    stock: 60, rating: 4.4, reviews: 110
  },

  // ─── Households → Breakfast & cereals (10 items) ───
  {
    name: "Kellogg's Corn Flakes Original",
    description: "Iron-rich morning breakfast.",
    price: 180, originalPrice: 200, category: "Households", subcategory: "Breakfast & cereals", unit: "875g",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=500&auto=format&fit=crop",
    stock: 100, rating: 4.5, reviews: 430
  },
  {
    name: "Quaker Oats 1kg",
    description: "100% whole grain natural oats.",
    price: 190, originalPrice: 220, category: "Households", subcategory: "Breakfast & cereals", unit: "1 kg",
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500&auto=format&fit=crop",
    stock: 150, rating: 4.7, reviews: 580
  },

  {
    name: "Saffola Masala Oats Classic",
    description: "Tasty and healthy weight loss snack.",
    price: 145, originalPrice: 160, category: "Households", subcategory: "Breakfast & cereals", unit: "500g",
    image: "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=500&auto=format&fit=crop",
    stock: 200, rating: 4.6, reviews: 190
  },
  {
    name: "Baggry's White Oats",
    description: "High fiber heart healthy oats.",
    price: 175, originalPrice: 195, category: "Households", subcategory: "Breakfast & cereals", unit: "500g",
    image: "https://images.unsplash.com/photo-1510711789248-087061cda288?w=500&auto=format&fit=crop",
    stock: 80, rating: 4.5, reviews: 110
  },
  {
    name: "Muesli Fruit & Nut 500g",
    description: "Perfect blend of grains and fruits.",
    price: 310, originalPrice: 350, category: "Households", subcategory: "Breakfast & cereals", unit: "500g",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop",
    stock: 60, rating: 4.7, reviews: 85
  },
  {
    name: "Yoga Bar Granola Bars",
    description: "Crunchy baked oats and seeds.",
    price: 249, originalPrice: 299, category: "Households", subcategory: "Breakfast & cereals", unit: "6 pieces",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500&auto=format&fit=crop",
    stock: 50, rating: 4.8, reviews: 140
  },




  // ─── Groceries → Dals, Pulses & Grains (10 items) ───

  {
    name: "Kabuli Chana (White Chickpeas)",
    description: "Premium large chick peas for chole.",
    price: 160, originalPrice: 185, category: "Groceries", subcategory: "Dals, Pulses & Grains", unit: "1 kg",
    image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=500&auto=format&fit=crop",
    stock: 120, rating: 4.8, reviews: 310
  },
  {
    name: "Rajma (Red Kidney Beans)",
    description: "Grade A rajma for tasty curry.",
    price: 175, originalPrice: 200, category: "Groceries", subcategory: "Dals, Pulses & Grains", unit: "1 kg",
    image: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=500&auto=format&fit=crop",
    stock: 100, rating: 4.6, reviews: 290
  },
  {
    name: "Black Urad Dal Whole",
    description: "Best for creamy dal makhani.",
    price: 155, originalPrice: 180, category: "Groceries", subcategory: "Dals, Pulses & Grains", unit: "1 kg",
    image: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=500&auto=format&fit=crop",
    stock: 110, rating: 4.7, reviews: 180
  },
  {
    name: "Chana Dal Premium 1kg",
    description: "Split bengal gram dal for multiple uses.",
    price: 95, originalPrice: 115, category: "Groceries", subcategory: "Dals, Pulses & Grains", unit: "1 kg",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&auto=format&fit=crop",
    stock: 180, rating: 4.6, reviews: 240
  },
  {
    name: "Masoor Dal (Red Lentils)",
    description: "Pink dal perfect for tadka.",
    price: 115, originalPrice: 135, category: "Groceries", subcategory: "Dals, Pulses & Grains", unit: "1 kg",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&auto=format&fit=crop",
    stock: 130, rating: 4.7, reviews: 150
  },
  {
    name: "Soya Chunks 200g",
    description: "Vegetarian protein chunks.",
    price: 45, originalPrice: 55, category: "Groceries", subcategory: "Dals, Pulses & Grains", unit: "200g",
    image: "https://images.unsplash.com/photo-1634467524884-897d0af5e104?w=500&auto=format&fit=crop",
    stock: 300, rating: 4.4, reviews: 80
  },

  {
    name: "Brown Chickpeas (Kala Chana)",
    description: "Healthy whole brown chana.",
    price: 85, originalPrice: 110, category: "Groceries", subcategory: "Dals, Pulses & Grains", unit: "1 kg",
    image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=500&auto=format&fit=crop",
    stock: 150, rating: 4.6, reviews: 240
  },
  {
    name: "Sprouted Moong Beans",
    description: "Healthy sprouts for salads.",
    price: 65, originalPrice: 85, category: "Groceries", subcategory: "Dals, Pulses & Grains", unit: "250g",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&auto=format&fit=crop",
    stock: 80, rating: 4.8, reviews: 52
  },

  // ─── Groceries → Masala & Spices (10 items) ───
  {
    name: "MDH Kitchen King Masala",
    description: "All-purpose sabzi spice blend.",
    price: 55, originalPrice: 70, category: "Groceries", subcategory: "Masala & Spices", unit: "100g",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop",
    stock: 400, rating: 4.8, reviews: 650
  },
  {
    name: "Everest Garam Masala 100g",
    description: "Aromatic whole spice blend.",
    price: 48, originalPrice: 60, category: "Groceries", subcategory: "Masala & Spices", unit: "100g",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop",
    stock: 350, rating: 4.7, reviews: 490
  },
  {
    name: "Turmeric Powder (Haldi) 200g",
    description: "Pure and bright turmeric powder.",
    price: 65, originalPrice: 80, category: "Groceries", subcategory: "Masala & Spices", unit: "200g",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop",
    stock: 250, rating: 4.6, reviews: 310
  },
  {
    name: "Red Chilli Powder 500g",
    description: "Hot and spicy red chilli powder.",
    price: 180, originalPrice: 220, category: "Groceries", subcategory: "Masala & Spices", unit: "500g",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&auto=format&fit=crop",
    stock: 200, rating: 4.7, reviews: 420
  },
  {
    name: "Coriander Powder (Dhania) 200g",
    description: "Finely ground aromatic dhania.",
    price: 45, originalPrice: 55, category: "Groceries", subcategory: "Masala & Spices", unit: "200g",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop",
    stock: 180, rating: 4.5, reviews: 156
  },
  {
    name: "Whole Cumin Seeds (Jeera) 200g",
    description: "Premium large jeera seeds.",
    price: 110, originalPrice: 130, category: "Groceries", subcategory: "Masala & Spices", unit: "200g",
    image: "https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=500&auto=format&fit=crop",
    stock: 150, rating: 4.8, reviews: 210
  },
  {
    name: "Catch Chaat Masala 100g",
    description: "Zesty spice for fruit and snacks.",
    price: 42, originalPrice: 50, category: "Groceries", subcategory: "Masala & Spices", unit: "100g",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop",
    stock: 220, rating: 4.9, reviews: 380
  },
  {
    name: "Catch Black Pepper Powder",
    description: "Freshly ground premium black pepper.",
    price: 145, originalPrice: 180, category: "Groceries", subcategory: "Masala & Spices", unit: "100g",
    image: "https://images.unsplash.com/photo-1599366110255-06d958df2614?w=500&auto=format&fit=crop",
    stock: 100, rating: 4.8, reviews: 135
  },
  {
    name: "Everest Chicken Masala",
    description: "Special blend for chicken preparations.",
    price: 85, originalPrice: 110, category: "Groceries", subcategory: "Masala & Spices", unit: "100g",
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=500&auto=format&fit=crop",
    stock: 150, rating: 4.7, reviews: 88
  },
  {
    name: "Hing (Asafoetida) Powder",
    description: "Strong aromatic compounding hing.",
    price: 65, originalPrice: 85, category: "Groceries", subcategory: "Masala & Spices", unit: "50g",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop",
    stock: 200, rating: 4.9, reviews: 310
  },

  // ─── Groceries → Aata, maida, besan & sooji (10 items) ───
  {
    name: "Aashirvaad Whole Wheat Atta 5kg",
    description: "Chakki fresh atta from wheat grains.",
    price: 210, originalPrice: 240, category: "Groceries", subcategory: "Aata, maida, besan & sooji", unit: "5 kg",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop",
    stock: 120, rating: 4.8, reviews: 900
  },

  {
    name: "Maida (Premium Flour) 1kg",
    description: "Fine maida for baking.",
    price: 48, originalPrice: 60, category: "Groceries", subcategory: "Aata, maida, besan & sooji", unit: "1 kg",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop",
    stock: 200, rating: 4.4, reviews: 110
  },
  {
    name: "Sooji (Semolina) 500g",
    description: "Fine granulated wheat.",
    price: 35, originalPrice: 45, category: "Groceries", subcategory: "Aata, maida, besan & sooji", unit: "500g",
    image: "https://images.unsplash.com/photo-1556910585-09baa3a3998e?w=500&auto=format&fit=crop",
    stock: 180, rating: 4.5, reviews: 145
  },
  {
    name: "Bambino Roasted Vermicelli",
    description: "Instant roasted semiya.",
    price: 65, originalPrice: 80, category: "Groceries", subcategory: "Aata, maida, besan & sooji", unit: "500g",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop",
    stock: 150, rating: 4.8, reviews: 95
  },


  // ─── Groceries → Oil & Ghee (4 items) ───
  {
    name: "Dhara Mustard Oil 1L",
    description: "Kachi ghani pure mustard oil.",
    price: 185, originalPrice: 210, category: "Groceries", subcategory: "Oil & Ghee", unit: "1 L",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop",
    stock: 150, rating: 4.7, reviews: 420
  },
  {
    name: "Fortune Cottonseed Oil 1L",
    description: "Light and neutral cooking oil.",
    price: 145, originalPrice: 170, category: "Groceries", subcategory: "Oil & Ghee", unit: "1 L",
    image: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=400&auto=format&fit=crop",
    stock: 120, rating: 4.4, reviews: 88
  },
  {
    name: "Organic Mustard Oil 1L",
    description: "Cold pressed organic mustard oil.",
    price: 245, originalPrice: 280, category: "Groceries", subcategory: "Oil & Ghee", unit: "1 L",
    image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&auto=format&fit=crop",
    stock: 60, rating: 4.8, reviews: 95
  },




  {
    name: "Bananas 1 Dozen",
    description: "Fresh yellow ripe bananas.",
    price: 60, originalPrice: 80, category: "Fruits & Vegetables", subcategory: "Fruits", unit: "12 units",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop",
    stock: 200, rating: 4.7, reviews: 520
  },
  {
    name: "Sweet Oranges 1kg",
    description: "Juicy citrus oranges.",
    price: 95, originalPrice: 120, category: "Fruits & Vegetables", subcategory: "Fruits", unit: "1 kg",
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=500&auto=format&fit=crop",
    stock: 120, rating: 4.6, reviews: 180
  },
  {
    name: "Pomegranate (Anar) 1kg",
    description: "Fresh antioxidant boost.",
    price: 190, originalPrice: 240, category: "Fruits & Vegetables", subcategory: "Fruits", unit: "1 kg",
    image: "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?w=500&auto=format&fit=crop",
    stock: 80, rating: 4.8, reviews: 95
  },


  // ─── Fruits & Vegetables → Vegetables (5 items) ───

  {
    name: "Fresh Hybrid Tomato 500g",
    description: "Firm and juicy local tomatoes.",
    price: 30, originalPrice: 40, category: "Fruits & Vegetables", subcategory: "Vegetables", unit: "500g",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop",
    stock: 400, rating: 4.6, reviews: 150
  },
  {
    name: "Fresh Ginger 100g",
    description: "Aromatic and fresh ginger.",
    price: 25, originalPrice: 35, category: "Fruits & Vegetables", subcategory: "Vegetables", unit: "100g",
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=500&auto=format&fit=crop",
    stock: 150, rating: 4.7, reviews: 88
  },

  // ─── Fruits & Vegetables → Fresh Fruits (10 items) ───
  {
    name: "Washington Red Apples 1kg",
    description: "Premium large apples.",
    price: 240, originalPrice: 280, category: "Fruits & Vegetables", subcategory: "Fruits", unit: "1 kg",
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=500&auto=format&fit=crop",
    stock: 100, rating: 4.8, reviews: 350
  },
  {
    name: "Green Kiwi 3 Units",
    description: "Imported fresh kiwis box.",
    price: 135, originalPrice: 165, category: "Fruits & Vegetables", subcategory: "Fresh Fruits", unit: "3 units",
    image: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=500&auto=format&fit=crop",
    stock: 60, rating: 4.7, reviews: 42
  },
  {
    name: "Dragon Fruit 1 Unit",
    description: "Exotic and nutrient dense fruit.",
    price: 110, originalPrice: 140, category: "Fruits & Vegetables", subcategory: "Fresh Fruits", unit: "1 unit",
    image: "https://images.unsplash.com/photo-1527324688151-0e627063f2b1?w=500&auto=format&fit=crop",
    stock: 40, rating: 4.6, reviews: 15
  },
  {
    name: "Pear Green 1kg",
    description: "Sweet and soft green pears.",
    price: 180, originalPrice: 220, category: "Fruits & Vegetables", subcategory: "Fresh Fruits", unit: "1 kg",
    image: "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?w=500&auto=format&fit=crop",
    stock: 50, rating: 4.4, reviews: 30
  },


  {
    name: "Fresh Grapes Green 500g",
    description: "Seedless sweet green grapes.",
    price: 95, originalPrice: 120, category: "Fruits & Vegetables", subcategory: "Fresh Fruits", unit: "500g",
    image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=500&auto=format&fit=crop",
    stock: 100, rating: 4.6, reviews: 88
  },
  {
    name: "Papaya Large 1 Unit",
    description: "Fresh ripe honey papaya.",
    price: 75, originalPrice: 99, category: "Fruits & Vegetables", subcategory: "Fresh Fruits", unit: "1 unit",
    image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=500&auto=format&fit=crop",
    stock: 45, rating: 4.5, reviews: 110
  },

  {
    name: "Guava (Amrut) 500g",
    description: "Crispy and sweet green guavas.",
    price: 55, originalPrice: 80, category: "Fruits & Vegetables", subcategory: "Fresh Fruits", unit: "500g",
    image: "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=500&auto=format&fit=crop",
    stock: 80, rating: 4.3, reviews: 14
  },

  // ─── Dry Fruits → Premium Nuts (10 items) ───
  {
    name: "Premium Almonds 500g",
    description: "Rich in protein crunchy almonds.",
    price: 450, originalPrice: 600, category: "Dry Fruits", subcategory: "Premium Nuts", unit: "500g",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500&auto=format&fit=crop",
    stock: 100, rating: 4.9, reviews: 520
  },
  {
    name: "Cashews W240 250g",
    description: "Jumbo whole cashews box.",
    price: 280, originalPrice: 350, category: "Dry Fruits", subcategory: "Premium Nuts", unit: "250g",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&auto=format&fit=crop",
    stock: 80, rating: 4.8, reviews: 310
  },
  {
    name: "Premium Walnuts 250g",
    description: "Brain healthy Omega-3 nuts.",
    price: 320, originalPrice: 400, category: "Dry Fruits", subcategory: "Premium Nuts", unit: "250g",
    image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=500&auto=format&fit=crop",
    stock: 50, rating: 4.7, reviews: 180
  },



  {
    name: "Mixed Nuts Party Pack",
    description: "Roasted and salted mix nuts.",
    price: 499, originalPrice: 599, category: "Dry Fruits", subcategory: "Premium Nuts", unit: "500g",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&auto=format&fit=crop",
    stock: 30, rating: 4.8, reviews: 200
  },
  {
    name: "Dates (Khajoor) 500g",
    description: "Sweet and soft premium dates.",
    price: 240, originalPrice: 300, category: "Dry Fruits", subcategory: "Premium Nuts", unit: "500g",
    image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=500&auto=format&fit=crop",
    stock: 150, rating: 4.7, reviews: 310
  },
  {
    name: "Dried Figs (Anjeer)",
    description: "Calcium rich soft dried figs.",
    price: 450, originalPrice: 550, category: "Dry Fruits", subcategory: "Premium Nuts", unit: "250g",
    image: "https://images.unsplash.com/photo-1510711789248-087061cda288?w=500&auto=format&fit=crop",
    stock: 40, rating: 4.9, reviews: 150
  },
  {
    name: "Fox Nuts (Makhana)",
    description: "Light and crunchy popped nuts.",
    price: 180, originalPrice: 220, category: "Dry Fruits", subcategory: "Premium Nuts", unit: "100g",
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=500&auto=format&fit=crop",
    stock: 200, rating: 4.8, reviews: 340
  },

  // ─── Testing cat → Other Items (5 items) ───

  {
    name: "Stainless Steel Storage Box",
    description: "Airtight grocery container.",
    price: 299, originalPrice: 400, category: "Testing cat", subcategory: "Other Items", unit: "1 pc",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop",
    stock: 30, rating: 4.6, reviews: 42
  },

  {
    name: "Mosquito Coil Pack",
    description: "12 hours protection coil.",
    price: 45, originalPrice: 55, category: "Testing cat", subcategory: "Other Items", unit: "1 pack",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500&auto=format&fit=crop",
    stock: 200, rating: 4.2, reviews: 35
  },

];

async function seedProducts() {
  try {
    const uri = process.env.MONGO_URI;
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri || 'mongodb://localhost:27017/bodega_clone');
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('🧹 Cleared existing products');

    const inserted = await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${inserted.length} products!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    if (mongoose.connection.readyState === 1) process.exit(1);
  }
}

module.exports = { products, seedProducts };
if (require.main === module) seedProducts();