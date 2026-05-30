// ─── Base Menu Data (embedded – no backend needed) ───────────────────────────
// This is the "seed" menu. User-added items are stored in localStorage
// under the key "cafe_custom_menu_items" and merged at runtime.

export const BASE_MENU = [
  {
    "_id": "ind-01",
    "name": "Paneer Tikka",
    "description": "Cottage cheese cubes marinated in yogurt and spices, grilled in tandoor.",
    "ingredients": "Paneer, Yogurt, Ginger-Garlic Paste, Kashmiri Mirch, Garam Masala",
    "category": "Indian",
    "isVeg": true,
    "basePrice": 180,
    "image": "https://images.unsplash.com/photo-1567188040759-fb8a883db6d8?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-02",
    "name": "Butter Chicken",
    "description": "Tender chicken in a rich, creamy tomato-based gravy.",
    "ingredients": "Chicken, Tomato Puree, Butter, Cream, Kasoori Methi",
    "category": "Indian",
    "isVeg": false,
    "basePrice": 240,
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-03",
    "name": "Dal Makhani",
    "description": "Black lentils slow-cooked overnight with butter and cream.",
    "ingredients": "Urad Dal, Rajma, Butter, Cream, Tomato Paste",
    "category": "Indian",
    "isVeg": true,
    "basePrice": 150,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-04",
    "name": "Mutton Rogan Josh",
    "description": "Classic Kashmiri lamb curry cooked with aromatic spices.",
    "ingredients": "Mutton, Yogurt, Kashmiri Mirch, Fennel Powder, Ginger Powder",
    "category": "Indian",
    "isVeg": false,
    "basePrice": 290,
    "image": "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-05",
    "name": "Palak Paneer",
    "description": "Fresh spinach puree with cottage cheese cubes.",
    "ingredients": "Spinach, Paneer, Garlic, Green Chili, Cumin",
    "category": "Indian",
    "isVeg": true,
    "basePrice": 160,
    "image": "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-06",
    "name": "Chicken Biryani",
    "description": "Fragrant basmati rice layered with spiced chicken and saffron.",
    "ingredients": "Basmati Rice, Chicken, Saffron, Fried Onions, Mint",
    "category": "Indian",
    "isVeg": false,
    "basePrice": 190,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-07",
    "name": "Chole Bhature",
    "description": "Spicy chickpeas served with fluffy deep-fried bread.",
    "ingredients": "Chickpeas, Refined Flour, Pomegranate Powder, Tea Leaves",
    "category": "Indian",
    "isVeg": true,
    "basePrice": 110,
    "image": "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-08",
    "name": "Fish Amritsari",
    "description": "Deep-fried fish fillets marinated in gram flour and carom seeds.",
    "ingredients": "Fish Fillets, Besan, Ajwain, Lemon Juice, Ginger-Garlic",
    "category": "Indian",
    "isVeg": false,
    "basePrice": 220,
    "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-09",
    "name": "Malai Kofta",
    "description": "Fried potato and paneer balls in a rich cashew-based gravy.",
    "ingredients": "Potato, Paneer, Cashews, Cream, Raisins",
    "category": "Indian",
    "isVeg": true,
    "basePrice": 170,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-10",
    "name": "Tandoori Chicken",
    "description": "Whole chicken marinated in yogurt and spices, roasted in tandoor.",
    "ingredients": "Whole Chicken, Yogurt, Lemon, Red Chili, Ginger-Garlic",
    "category": "Indian",
    "isVeg": false,
    "basePrice": 260,
    "image": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-11",
    "name": "Mutton Biryani",
    "description": "Slow-cooked mutton layered with aromatic basmati rice and whole spices.",
    "ingredients": "Basmati Rice, Mutton, Saffron, Fried Onions, Whole Spices, Mint",
    "category": "Indian",
    "isVeg": false,
    "basePrice": 240,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-12",
    "name": "Veg Biryani",
    "description": "Fragrant basmati rice cooked with seasonal vegetables and rich spices.",
    "ingredients": "Basmati Rice, Mixed Vegetables, Saffron, Fried Onions, Ghee",
    "category": "Indian",
    "isVeg": true,
    "basePrice": 140,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-13",
    "name": "Hyderabadi Dum Biryani",
    "description": "Authentic Hyderabadi dum biryani with succulent chicken and aromatic spices.",
    "ingredients": "Basmati Rice, Chicken, Yogurt, Saffron, Green Chili, Mint",
    "category": "Indian",
    "isVeg": false,
    "basePrice": 200,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-14",
    "name": "Lucknowi Mutton Biryani",
    "description": "Light and fragrant Awadhi-style biryani with tender meat and subtle spices.",
    "ingredients": "Basmati Rice, Mutton, Rose Water, Kewra, Star Anise, Saffron",
    "category": "Indian",
    "isVeg": false,
    "basePrice": 250,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-15",
    "name": "Egg Biryani",
    "description": "Flavorful basmati rice with boiled eggs and aromatic masala gravy.",
    "ingredients": "Basmati Rice, Eggs, Onions, Tomatoes, Biryani Masala, Mint",
    "category": "Indian",
    "isVeg": false,
    "basePrice": 130,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-16",
    "name": "Paneer Biryani",
    "description": "Rich and aromatic biryani loaded with marinated paneer cubes.",
    "ingredients": "Basmati Rice, Paneer, Yogurt, Saffron, Fried Onions, Cashews",
    "category": "Indian",
    "isVeg": true,
    "basePrice": 160,
    "image": "https://images.unsplash.com/photo-1567188040759-fb8a883db6d8?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-17",
    "name": "Prawn Biryani",
    "description": "Coastal-style spicy biryani with juicy prawns and coconut milk.",
    "ingredients": "Basmati Rice, Prawns, Coconut Milk, Curry Leaves, Green Chili",
    "category": "Indian",
    "isVeg": false,
    "basePrice": 270,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-18",
    "name": "Samosa Pav",
    "description": "Crispy samosas served with butter-toasted pav and hot garlic chutney.",
    "ingredients": "Samosa, Pav, Garlic Chutney, Mint Coriander Paste, Butter",
    "category": "Indian",
    "isVeg": true,
    "basePrice": 45,
    "image": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-19",
    "name": "Vada Pav",
    "description": "Classic Mumbai street food style spicy potato fritters in buns.",
    "ingredients": "Potato, Pav, Dry Red Garlic Powder, Green Chutneys",
    "category": "Indian",
    "isVeg": true,
    "basePrice": 35,
    "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-20",
    "name": "Chicken Tikka Roll",
    "description": "Flame-broiled chicken tikka chunks wrapped in soft flatbread.",
    "ingredients": "Chicken Tikka, Paratha, Sliced Onions, Lemon, Mint Chutney",
    "category": "Indian",
    "isVeg": false,
    "basePrice": 120,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-21",
    "name": "Pav Bhaji",
    "description": "Spiced vegetable mash served hot with soft buttered buns.",
    "ingredients": "Mixed Vegetables, Pav, Pav Bhaji Masala, Butter, Onion, Lemon",
    "category": "Indian",
    "isVeg": true,
    "basePrice": 90,
    "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-22",
    "name": "Keema Pav",
    "description": "Spicy minced mutton curry served with butter-toasted buns.",
    "ingredients": "Minced Mutton, Pav, Spices, Ghee, Mint, Ginger",
    "category": "Indian",
    "isVeg": false,
    "basePrice": 180,
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-23",
    "name": "Onion Pakoda",
    "description": "Crispy golden fried onion fritters seasoned with carom seeds.",
    "ingredients": "Slices of Onion, Gram Flour, Ajwain, Green Chili, Oil",
    "category": "Indian",
    "isVeg": true,
    "basePrice": 50,
    "image": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-24",
    "name": "Chicken Pakoda",
    "description": "Spicy deep-fried chicken bites coated with batter.",
    "ingredients": "Chicken Bites, Besan, Rice Flour, Red Chili, Spices",
    "category": "Indian",
    "isVeg": false,
    "basePrice": 130,
    "image": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-25",
    "name": "Veg Kadhai",
    "description": "Assorted mixed vegetables cooked in a spicy kadhai gravy.",
    "ingredients": "Capsicum, Beans, Cauliflower, Paneer, Coriander Seeds",
    "category": "Indian",
    "isVeg": true,
    "basePrice": 140,
    "image": "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-26",
    "name": "Egg Curry",
    "description": "Boiled eggs simmered in spicy onion-tomato gravy.",
    "ingredients": "Eggs, Tomato, Onion, Garam Masala, Chili Powder",
    "category": "Indian",
    "isVeg": false,
    "basePrice": 110,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-27",
    "name": "Aloo Paratha",
    "description": "Flaky wheat flatbread stuffed with spiced potato mixture.",
    "ingredients": "Wheat Flour, Potato, Green Chili, Butter, Curd",
    "category": "Indian",
    "isVeg": true,
    "basePrice": 60,
    "image": "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-28",
    "name": "Chicken Paratha",
    "description": "Flatbread stuffed with spicy shredded chicken and fried with ghee.",
    "ingredients": "Wheat Flour, Chicken Keema, Spices, Coriander, Butter",
    "category": "Indian",
    "isVeg": false,
    "basePrice": 95,
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-29",
    "name": "Masala Dosa",
    "description": "Crispy fermented rice crepe filled with seasoned potato bhaji.",
    "ingredients": "Rice Batter, Potato Mash, Mustard Seeds, Sambhar, Chutney",
    "category": "Indian",
    "isVeg": true,
    "basePrice": 80,
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ind-30",
    "name": "Idli Sambhar",
    "description": "Soft steamed rice cakes served with hot lentil vegetable stew.",
    "ingredients": "Rice, Urad Dal, Tamarind, Drumsticks, Curry Leaves",
    "category": "Indian",
    "isVeg": true,
    "basePrice": 50,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-01",
    "name": "Veg Manchurian",
    "description": "Vegetable dumplings in a spicy, tangy Indo-Chinese sauce.",
    "ingredients": "Cabbage, Carrot, Spring Onions, Soy Sauce, Cornflour",
    "category": "Chinese",
    "isVeg": true,
    "basePrice": 120,
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-02",
    "name": "Kung Pao Chicken",
    "description": "Spicy stir-fry chicken with peanuts, vegetables, and chili peppers.",
    "ingredients": "Chicken, Peanuts, Dried Chilies, Bell Peppers, Hoisin Sauce",
    "category": "Chinese",
    "isVeg": false,
    "basePrice": 190,
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-03",
    "name": "Hakka Noodles",
    "description": "Stir-fried noodles with crisp vegetables and soy sauce.",
    "ingredients": "Noodles, Cabbage, Carrot, Beans, Soy Sauce, Vinegar",
    "category": "Chinese",
    "isVeg": true,
    "basePrice": 110,
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-04",
    "name": "Szechuan Shrimp",
    "description": "Succulent shrimp tossed in fiery Szechuan pepper sauce.",
    "ingredients": "Shrimp, Szechuan Peppers, Celery, Chili Paste, Garlic",
    "category": "Chinese",
    "isVeg": false,
    "basePrice": 240,
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-05",
    "name": "Veg Spring Rolls",
    "description": "Crispy fried rolls stuffed with seasoned vegetables.",
    "ingredients": "Spring Roll Sheets, Cabbage, Carrot, Bean Sprouts, Soy",
    "category": "Chinese",
    "isVeg": true,
    "basePrice": 90,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-06",
    "name": "Chicken Dim Sum",
    "description": "Steamed dumplings filled with minced chicken and herbs.",
    "ingredients": "Minced Chicken, Flour Wrapper, Sesame Oil, Scallions",
    "category": "Chinese",
    "isVeg": false,
    "basePrice": 140,
    "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-07",
    "name": "Hot & Sour Soup",
    "description": "Spicy and tangy soup with mushrooms and bamboo shoots.",
    "ingredients": "Mushrooms, Bamboo Shoots, Tofu, Vinegar, White Pepper",
    "category": "Chinese",
    "isVeg": true,
    "basePrice": 70,
    "image": "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-08",
    "name": "Chili Chicken",
    "description": "Deep-fried chicken strips tossed in a sweet, spicy, and tangy soy-chili glaze.",
    "ingredients": "Chicken Breast, Soy Sauce, Green Chilies, Capsicum, Ginger",
    "category": "Chinese",
    "isVeg": false,
    "basePrice": 170,
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-09",
    "name": "Mapo Tofu",
    "description": "Soft tofu set in a spicy, oily, and bright red sauce.",
    "ingredients": "Soft Tofu, Doubanjiang, Chili Oil, Fermented Black Beans",
    "category": "Chinese",
    "isVeg": true,
    "basePrice": 130,
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-10",
    "name": "Gobi Manchurian Dry",
    "description": "Crispy deep-fried cauliflower florets tossed in hot manchurian spices.",
    "ingredients": "Cauliflower, Soy Sauce, Spring Onion, Ginger, Garlic, Cornstarch",
    "category": "Chinese",
    "isVeg": true,
    "basePrice": 100,
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-11",
    "name": "Veg Fried Rice",
    "description": "Wok-tossed rice with mixed vegetables, soy sauce, and sesame oil.",
    "ingredients": "Rice, Mixed Vegetables, Soy Sauce, Sesame Oil, Scallions",
    "category": "Chinese",
    "isVeg": true,
    "basePrice": 100,
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-12",
    "name": "Chicken Fried Rice",
    "description": "Classic fried rice with tender chicken pieces and aromatic soy.",
    "ingredients": "Rice, Chicken, Eggs, Soy Sauce, Spring Onions, Garlic",
    "category": "Chinese",
    "isVeg": false,
    "basePrice": 130,
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-13",
    "name": "Paneer Chilli",
    "description": "Crispy paneer cubes tossed with bell peppers in a spicy soy chili sauce.",
    "ingredients": "Paneer, Bell Peppers, Soy Sauce, Chili Sauce, Cornflour",
    "category": "Chinese",
    "isVeg": true,
    "basePrice": 140,
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-14",
    "name": "Dragon Chicken",
    "description": "Crispy fried chicken in a fiery red dragon sauce with bell peppers.",
    "ingredients": "Chicken, Dragon Sauce, Bell Peppers, Onions, Cornflour",
    "category": "Chinese",
    "isVeg": false,
    "basePrice": 170,
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-15",
    "name": "Szechuan Noodles Veg",
    "description": "Stir-fried noodles in a fiery red Szechuan chili sauce.",
    "ingredients": "Noodles, Szechuan Paste, Garlic, Onion, Vinegar, Soy",
    "category": "Chinese",
    "isVeg": true,
    "basePrice": 110,
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-16",
    "name": "Szechuan Noodles Chicken",
    "description": "Spicy wok noodles tossed with Szechuan sauce, egg, and chicken juliennes.",
    "ingredients": "Noodles, Chicken strips, Szechuan Paste, Egg, Capsicum",
    "category": "Chinese",
    "isVeg": false,
    "basePrice": 135,
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-17",
    "name": "Manchow Soup Veg",
    "description": "Classic dark brown Chinese soup with crispy fried noodles.",
    "ingredients": "Cabbage, Capsicum, Ginger, Garlic, Fried Noodles, Soy, Vinegar",
    "category": "Chinese",
    "isVeg": true,
    "basePrice": 75,
    "image": "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-18",
    "name": "Manchow Soup Chicken",
    "description": "Indo-Chinese chicken soup infused with garlic and ginger, topped with dry noodles.",
    "ingredients": "Shredded Chicken, Egg Drop, Garlic, Soy Sauce, Fried Noodles",
    "category": "Chinese",
    "isVeg": false,
    "basePrice": 90,
    "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-19",
    "name": "Honey Chilli Potato",
    "description": "Sweet and spicy crispy potato fingers tossed in sesame sauce.",
    "ingredients": "French Fries, Honey, Chilli Sauce, Sesame Seeds, Garlic",
    "category": "Chinese",
    "isVeg": true,
    "basePrice": 110,
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-20",
    "name": "Honey Chilli Chicken",
    "description": "Crispy chicken strips coated with sweet honey-chilli sauce.",
    "ingredients": "Chicken strips, Honey, Sesame, Spring Onion, Chili Sauce",
    "category": "Chinese",
    "isVeg": false,
    "basePrice": 160,
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-21",
    "name": "Veg Momos",
    "description": "Steamed dumplings stuffed with mixed seasoned vegetables.",
    "ingredients": "Cabbage, Onion, Carrot, Ginger, Wheat wrapper, Spicy Dip",
    "category": "Chinese",
    "isVeg": true,
    "basePrice": 70,
    "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-22",
    "name": "Chicken Momos",
    "description": "Savory steamed dumplings filled with spiced minced chicken.",
    "ingredients": "Chicken Mince, Onion, Garlic, Coriander, Wheat wrapper, Chili Dip",
    "category": "Chinese",
    "isVeg": false,
    "basePrice": 90,
    "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-23",
    "name": "Crispy Fried Wontons Veg",
    "description": "Crisp golden pockets filled with seasoned vegetables.",
    "ingredients": "Wonton Skins, Mixed Veggies, Soy Sauce, Sweet Chili Sauce",
    "category": "Chinese",
    "isVeg": true,
    "basePrice": 80,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "chi-24",
    "name": "Crispy Fried Wontons Chicken",
    "description": "Golden fried wonton skins with a juicy chicken meatball core.",
    "ingredients": "Wonton Skins, Minced Chicken, Sesame oil, Light soy",
    "category": "Chinese",
    "isVeg": false,
    "basePrice": 100,
    "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-01",
    "name": "Margherita Pizza",
    "description": "Classic Neapolitan pizza with tomato, mozzarella, and fresh basil.",
    "ingredients": "Tomato Sauce, Fresh Mozzarella, Basil, Olive Oil",
    "category": "Italian",
    "isVeg": true,
    "basePrice": 170,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-02",
    "name": "Lasagna Bolognese",
    "description": "Layered pasta with slow-cooked meat sauce and bechamel.",
    "ingredients": "Pasta Sheets, Minced Beef, Tomato, Bechamel, Parmesan",
    "category": "Italian",
    "isVeg": false,
    "basePrice": 220,
    "image": "https://images.unsplash.com/photo-1619895092538-128341789043?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-03",
    "name": "Spaghetti Carbonara",
    "description": "Pasta with egg, hard cheese, cured pork, and black pepper.",
    "ingredients": "Spaghetti, Eggs, Guanciale, Pecorino Romano, Black Pepper",
    "category": "Italian",
    "isVeg": false,
    "basePrice": 190,
    "image": "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-04",
    "name": "Mushroom Risotto",
    "description": "Creamy Arborio rice cooked with porcini and button mushrooms.",
    "ingredients": "Arborio Rice, Porcini, Button Mushrooms, Vegetable Broth, Parmesan",
    "category": "Italian",
    "isVeg": true,
    "basePrice": 180,
    "image": "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-05",
    "name": "Chicken Parmigiana",
    "description": "Breaded chicken breast topped with tomato sauce and mozzarella.",
    "ingredients": "Chicken Breast, Breadcrumbs, Marinara Sauce, Mozzarella",
    "category": "Italian",
    "isVeg": false,
    "basePrice": 200,
    "image": "https://images.unsplash.com/photo-1632778149955-e80f8ceca7e8?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-06",
    "name": "Pasta Primavera",
    "description": "Pasta with fresh seasonal vegetables and garlic olive oil.",
    "ingredients": "Penne, Bell Peppers, Zucchini, Broccoli, Garlic, Olive Oil",
    "category": "Italian",
    "isVeg": true,
    "basePrice": 150,
    "image": "https://images.unsplash.com/photo-1621996346565-e3bb64e0be5e?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-07",
    "name": "Gnocchi Sorrentina",
    "description": "Potato gnocchi baked with tomato sauce and fresh mozzarella.",
    "ingredients": "Potato Gnocchi, Tomato Sauce, Fresh Mozzarella, Basil",
    "category": "Italian",
    "isVeg": true,
    "basePrice": 160,
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-08",
    "name": "Chicken Lasagna",
    "description": "Layers of flat pasta sheet, ground chicken, béchamel, and rich cheese.",
    "ingredients": "Chicken mince, Bechamel, Pasta sheets, Ricotta, Parmesan, Tomato paste",
    "category": "Italian",
    "isVeg": false,
    "basePrice": 210,
    "image": "https://images.unsplash.com/photo-1619895092538-128341789043?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-09",
    "name": "Ravioli Spinaci",
    "description": "Homemade ravioli stuffed with spinach and ricotta in sage butter.",
    "ingredients": "Flour, Eggs, Spinach, Ricotta, Sage, Butter",
    "category": "Italian",
    "isVeg": true,
    "basePrice": 170,
    "image": "https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-10",
    "name": "Seafood Linguine",
    "description": "Linguine pasta with a variety of fresh Mediterranean seafood.",
    "ingredients": "Linguine, Mussels, Clams, Prawns, Cherry Tomatoes, Garlic",
    "category": "Italian",
    "isVeg": false,
    "basePrice": 280,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-11",
    "name": "Bruschetta",
    "description": "Toasted bread topped with fresh tomatoes, basil, and balsamic glaze.",
    "ingredients": "Ciabatta, Tomatoes, Basil, Olive Oil, Balsamic Glaze",
    "category": "Italian",
    "isVeg": true,
    "basePrice": 90,
    "image": "https://images.unsplash.com/photo-1572656631137-7935297eff55?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-12",
    "name": "Pepperoni Pizza",
    "description": "Classic pizza loaded with spicy pepperoni and mozzarella cheese.",
    "ingredients": "Pizza Dough, Tomato Sauce, Mozzarella, Pepperoni, Oregano",
    "category": "Italian",
    "isVeg": false,
    "basePrice": 210,
    "image": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-13",
    "name": "Arrabbiata Pasta Veg",
    "description": "Penne pasta in a spicy garlic and herb tomato sauce.",
    "ingredients": "Penne, Red chili flakes, Tomato sauce, Garlic, Parsley, Olive oil",
    "category": "Italian",
    "isVeg": true,
    "basePrice": 120,
    "image": "https://images.unsplash.com/photo-1621996346565-e3bb64e0be5e?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-14",
    "name": "Arrabbiata Pasta Chicken",
    "description": "Spicy tomato penne pasta tossed with grilled chicken strips.",
    "ingredients": "Penne, Chicken breast, Tomato sauce, Chili flakes, Garlic",
    "category": "Italian",
    "isVeg": false,
    "basePrice": 145,
    "image": "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-15",
    "name": "Alfredo Pasta Veg",
    "description": "Rich and creamy pasta tossed in a cheesy butter sauce.",
    "ingredients": "Penne, Fresh Cream, Butter, Garlic, Parmesan Cheese, Parsley",
    "category": "Italian",
    "isVeg": true,
    "basePrice": 130,
    "image": "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-16",
    "name": "Alfredo Pasta Chicken",
    "description": "Creamy rich white sauce pasta with chicken cubes.",
    "ingredients": "Penne, Chicken, Cream, Butter, Cheese, Herbs",
    "category": "Italian",
    "isVeg": false,
    "basePrice": 155,
    "image": "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-17",
    "name": "Pesto Pasta Veg",
    "description": "Fussili pasta coated with fragrant basil-pignoli pesto sauce.",
    "ingredients": "Fussili, Basil leaves, Garlic, Walnuts, Olive oil, Parmesan",
    "category": "Italian",
    "isVeg": true,
    "basePrice": 140,
    "image": "https://images.unsplash.com/photo-1621996346565-e3bb64e0be5e?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-18",
    "name": "Pesto Pasta Chicken",
    "description": "Basil pesto pasta tossed with flame-grilled chicken chunks.",
    "ingredients": "Fusilli, Basil, Pine nuts, Grilled chicken, Cheese, Olive oil",
    "category": "Italian",
    "isVeg": false,
    "basePrice": 165,
    "image": "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-19",
    "name": "Garlic Bread with Cheese",
    "description": "Buttery garlic slices toasted golden with rich mozzarella pull.",
    "ingredients": "Baguette, Garlic butter, Mozzarella, Parsley",
    "category": "Italian",
    "isVeg": true,
    "basePrice": 75,
    "image": "https://images.unsplash.com/photo-1572656631137-7935297eff55?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-20",
    "name": "Garlic Bread Chicken",
    "description": "Cheese garlic bread topped with chopped spiced chicken.",
    "ingredients": "Baguette, Butter, Garlic, Cheese, Chicken mince",
    "category": "Italian",
    "isVeg": false,
    "basePrice": 95,
    "image": "https://images.unsplash.com/photo-1572656631137-7935297eff55?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-21",
    "name": "Veg Calzone",
    "description": "Folded pocket pizza filled with seasoned ricotta and veggies.",
    "ingredients": "Pizza Dough, Mushroom, Bell pepper, Ricotta, Mozzarella",
    "category": "Italian",
    "isVeg": true,
    "basePrice": 150,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-22",
    "name": "Chicken Calzone",
    "description": "Folded pizza pocket stuffed with spicy chicken mince and marinara.",
    "ingredients": "Pizza dough, Minced chicken, Mozzarella, Tomato sauce",
    "category": "Italian",
    "isVeg": false,
    "basePrice": 180,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-23",
    "name": "Minestrone Soup Veg",
    "description": "Thick vegetable soup with tiny shell pasta and red beans.",
    "ingredients": "Celery, Beans, Zucchini, Tomato, Ditalini Pasta, Herbs",
    "category": "Italian",
    "isVeg": true,
    "basePrice": 80,
    "image": "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "ita-24",
    "name": "Chicken Minestrone Soup",
    "description": "Italian soup packed with chopped garden veggies, pasta, and shredded chicken.",
    "ingredients": "Chicken, Tomato broth, Shell pasta, Carrots, Cannellini beans",
    "category": "Italian",
    "isVeg": false,
    "basePrice": 95,
    "image": "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "swt-01",
    "name": "Gulab Jamun",
    "description": "Soft milk dumplings soaked in rose sugar syrup.",
    "ingredients": "Khoya, Maida, Cardamom, Sugar Syrup, Rose Water",
    "category": "Sweets",
    "isVeg": true,
    "basePrice": 50,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "swt-02",
    "name": "Rasmalai",
    "description": "Soft chenna discs soaked in saffron flavored thickened milk.",
    "ingredients": "Chenna, Milk, Saffron, Cardamom, Sugar, Pistachios",
    "category": "Sweets",
    "isVeg": true,
    "basePrice": 60,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "swt-03",
    "name": "Jalebi",
    "description": "Crispy pretzel-shaped batter soaked in saffron sugar syrup.",
    "ingredients": "Maida, Yogurt, Saffron, Sugar Syrup, Ghee",
    "category": "Sweets",
    "isVeg": true,
    "basePrice": 40,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "swt-04",
    "name": "Rasgulla",
    "description": "Light spongy cottage cheese balls cooked in syrup.",
    "ingredients": "Chenna, Sugar, Rose Water, Cardamom",
    "category": "Sweets",
    "isVeg": true,
    "basePrice": 45,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "swt-05",
    "name": "Kaju Katli",
    "description": "Diamond-shaped cashew fudge with silver foil.",
    "ingredients": "Cashews, Sugar, Ghee, Cardamom, Silver Foil",
    "category": "Sweets",
    "isVeg": true,
    "basePrice": 120,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "swt-06",
    "name": "Tiramisu",
    "description": "Italian dessert with layers of coffee ladyfingers and mascarpone.",
    "ingredients": "Ladyfingers, Mascarpone, Espresso, Cocoa Powder, Eggs",
    "category": "Sweets",
    "isVeg": false,
    "basePrice": 150,
    "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "swt-07",
    "name": "Chocolate Lava Cake",
    "description": "Warm chocolate cake with a molten center, served with vanilla ice cream.",
    "ingredients": "Dark Chocolate, Butter, Eggs, Sugar, Flour",
    "category": "Sweets",
    "isVeg": false,
    "basePrice": 130,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "swt-08",
    "name": "Gajar Ka Halwa",
    "description": "Slow-cooked grated carrots in milk and ghee.",
    "ingredients": "Carrots, Milk, Ghee, Sugar, Almonds, Cashews",
    "category": "Sweets",
    "isVeg": true,
    "basePrice": 80,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "swt-09",
    "name": "Rabri",
    "description": "Rich thickened sweetened milk flavored with cardamom.",
    "ingredients": "Full Fat Milk, Sugar, Saffron, Cardamom, Pistachios",
    "category": "Sweets",
    "isVeg": true,
    "basePrice": 70,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "swt-10",
    "name": "Phirni",
    "description": "Creamy ground rice pudding set in earthen pots.",
    "ingredients": "Rice, Milk, Sugar, Cardamom, Rose Water, Almonds",
    "category": "Sweets",
    "isVeg": true,
    "basePrice": 60,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "swt-11",
    "name": "Egg Pudding",
    "description": "Classic caramel custard pudding made with eggs.",
    "ingredients": "Eggs, Milk, Sugar, Vanilla, Caramel",
    "category": "Sweets",
    "isVeg": false,
    "basePrice": 80,
    "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "swt-12",
    "name": "Sheer Khurma",
    "description": "Rich Eid special dessert with vermicelli, milk and dates.",
    "ingredients": "Vermicelli, Milk, Dates, Almonds, Pistachios, Ghee",
    "category": "Sweets",
    "isVeg": true,
    "basePrice": 90,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "swt-13",
    "name": "Panna Cotta",
    "description": "Italian cream dessert topped with berry sauce.",
    "ingredients": "Cream, Sugar, Gelatin, Vanilla, Mixed Berries",
    "category": "Sweets",
    "isVeg": false,
    "basePrice": 130,
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "swt-14",
    "name": "Sweet Lassi",
    "description": "Traditional sweet yogurt blended drink served chilled.",
    "ingredients": "Yogurt, Sugar, Cardamom, Rose Water, Ice",
    "category": "Sweets",
    "isVeg": true,
    "basePrice": 45,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "swt-15",
    "name": "Mango Shake",
    "description": "Delicious milkshake made with fresh Alphonso mango pulp.",
    "ingredients": "Mango pulp, Whole milk, Sugar, Vanilla ice cream scoop",
    "category": "Sweets",
    "isVeg": true,
    "basePrice": 70,
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  },
  {
    "_id": "swt-16",
    "name": "Double Ka Meetha",
    "description": "Hyderabadi bread pudding soaked in saffron milk and dry fruits.",
    "ingredients": "Bread slices, Condensed milk, Sugar syrup, Cardamom, Cashews",
    "category": "Sweets",
    "isVeg": true,
    "basePrice": 90,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60",
    "isActive": true
  }
];

// ─── localStorage helpers ─────────────────────────────────────────────────────
const CUSTOM_MENU_KEY = 'cafe_custom_menu_items';
const ORDERS_KEY = 'cafe_orders';

export const getCustomMenuItems = () => {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_MENU_KEY) || '[]');
  } catch {
    return [];
  }
};

export const saveCustomMenuItem = (item) => {
  const items = getCustomMenuItems();
  items.push(item);
  localStorage.setItem(CUSTOM_MENU_KEY, JSON.stringify(items));
};

export const deleteCustomMenuItem = (id) => {
  const items = getCustomMenuItems().filter(i => i._id !== id);
  localStorage.setItem(CUSTOM_MENU_KEY, JSON.stringify(items));
};

export const getAllMenuItems = () => {
  const custom = getCustomMenuItems();
  return [...BASE_MENU, ...custom].filter(i => i.isActive !== false);
};

export const getCategories = () => {
  return [...new Set(getAllMenuItems().map(i => i.category))];
};

// ─── Orders ──────────────────────────────────────────────────────────────────
export const getOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  } catch {
    return [];
  }
};

export const saveOrder = (orderData) => {
  const orders = getOrders();
  const order = {
    _id: Date.now().toString(),
    orderNumber: `ORD-${String(orders.length + 1).padStart(4, '0')}`,
    ...orderData,
    status: 'completed',
    orderDate: new Date().toISOString(),
  };
  orders.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return order;
};
