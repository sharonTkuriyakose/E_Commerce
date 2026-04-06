const products = [
  {
    "name": "iPhone 15 Pro",
    "price": 129990,
    "rating": 4.8,
    "category": "smartphones",
    "description": "Titanium design. A17 Pro chip. 48MP Main camera. And a new Action button.",
    "image": "/images/products/iphone.png",
    "specs": {
      "display": "6.1-inch Super Retina XDR",
      "chip": "A17 Pro",
      "camera": "48MP Main | Ultra Wide | Telephoto",
      "battery": "Up to 23 hours video playback"
    },
    "countInStock": 10
  },
  {
    "name": "Samsung Galaxy S23 Ultra",
    "price": 4999914999,
    "rating": 4.9,
    "category": "smartphones",
    "description": "Capture the night with Nightography. Built-in S Pen. 200MP camera resolution.",
    "image": "/images/products/samsung.png",
    "specs": {
      "display": "6.8-inch Dynamic AMOLED 2X",
      "chip": "Snapdragon 8 Gen 2",
      "camera": "200MP Main",
      "battery": "5000mAh"
    },
    "countInStock": 5
  },
  {
    "name": "Google Pixel 8 Pro",
    "price": 4999906990,
    "rating": 4.7,
    "category": "smartphones",
    "description": "The all-pro Google phone. Fast, secure, and designed by Google.",
    "image": "/images/products/pixel.png",
    "specs": {
      "display": "6.7-inch LTPO OLED",
      "chip": "Google Tensor G3",
      "camera": "50MP Main | 48MP Ultra Wide | 48MP Telephoto",
      "battery": "5050mAh"
    },
    "countInStock": 12
  },
  {
    "name": "Xiaomi 14 Pro",
    "price": 84999,
    "rating": 4.6,
    "category": "smartphones",
    "description": "Leica Summilux optical lens. Snapdragon 8 Gen 3. All-around liquid display.",
    "image": "/images/products/xiaomi.png",
    "specs": {
      "display": "6.73-inch AMOLED",
      "chip": "Snapdragon 8 Gen 3",
      "camera": "50MP Triple Camera",
      "battery": "4880mAh"
    },
    "countInStock": 7
  },
  {
    "name": "OnePlus 12",
    "price": 64999,
    "rating": 4.8,
    "category": "smartphones",
    "description": "Smooth beyond belief. All-new Hasselblad Camera for Mobile.",
    "image": "/images/products/oneplus.png",
    "specs": {
      "display": "6.82-inch AMOLED",
      "chip": "Snapdragon 8 Gen 3",
      "camera": "50MP Primary",
      "battery": "5400mAh"
    },
    "countInStock": 20
  },
  {
    "name": "Asus ROG Phone 8 Pro",
    "price": 94999,
    "rating": 4.7,
    "category": "smartphones",
    "description": "Beyond Gaming. The ultimate gaming phone with premium everyday features.",
    "image": "/images/products/rogphone.png",
    "specs": {
      "display": "6.78-inch AMOLED 165Hz",
      "chip": "Snapdragon 8 Gen 3",
      "camera": "50MP Main",
      "battery": "5500mAh"
    },
    "countInStock": 15
  },
  {
    "name": "MacBook Pro M3 Max",
    "price": 349900,
    "rating": 5,
    "category": "laptops",
    "description": "MacBook Pro blasts forward with the M3 Max chip. Built for the most extreme workflows.",
    "image": "/images/products/macbook.png",
    "specs": {
      "display": "16.2-inch Liquid Retina XDR",
      "chip": "Apple M3 Max",
      "ram": "Up to 128GB unified memory",
      "storage": "Up to 8TB SSD"
    },
    "countInStock": 8
  },
  {
    "name": "Dell XPS 15",
    "price": 249990,
    "rating": 4.6,
    "category": "laptops",
    "description": "High-performance laptop featuring a stunning OLED display and up to Intel Core i9 processors.",
    "image": "/images/products/dell.png",
    "specs": {
      "display": "15.6-inch 3.5K OLED Touch",
      "chip": "Intel Core i7",
      "ram": "16GB DDR5",
      "storage": "1TB PCIe SSD"
    },
    "countInStock": 6
  },
  {
    "name": "Razer Blade 16",
    "price": 389999,
    "rating": 4.8,
    "category": "laptops",
    "description": "The ultimate 16-inch gaming laptop. World's first dual-mode Mini-LED display.",
    "image": "/images/products/razer.png",
    "specs": {
      "display": "16-inch Dual-Mode Mini-LED",
      "chip": "Intel Core i9-13950HX",
      "gpu": "RTX 4090",
      "ram": "32GB DDR5"
    },
    "countInStock": 4
  },
  {
    "name": "Surface Laptop 5",
    "price": 4999907990,
    "rating": 4.5,
    "category": "laptops",
    "description": "Sleek and portable. Blazing speed for multi-tasking and premium design.",
    "image": "/images/products/surface.png",
    "specs": {
      "display": "13.5-inch PixelSense",
      "chip": "Intel Core i7 Gen 12",
      "battery": "Up to 18 hours",
      "storage": "512GB SSD"
    },
    "countInStock": 10
  },
  {
    "name": "Lenovo ThinkPad X1 Carbon Gen 11",
    "price": 209990,
    "rating": 4.7,
    "category": "laptops",
    "description": "Ultralight business laptop with premium performance and security.",
    "image": "/images/products/thinkpad.png",
    "specs": {
      "display": "14-inch WUXGA",
      "chip": "Intel Core i7-1355U",
      "ram": "16GB LPDDR5",
      "storage": "512GB PCIe SSD"
    },
    "countInStock": 12
  },
  {
    "name": "ASUS ROG Zephyrus G14",
    "price": 8999949999,
    "rating": 4.8,
    "category": "laptops",
    "description": "Incredibly powerful, incredibly portable gaming laptop with Anime Matrix.",
    "image": "/images/products/zephyrus.png",
    "specs": {
      "display": "14-inch QHD 165Hz",
      "chip": "AMD Ryzen 9 7940HS",
      "gpu": "RTX 4060",
      "ram": "16GB DDR5"
    },
    "countInStock": 9
  },
  {
    "name": "Sony WH-1000XM5",
    "price": 29990,
    "rating": 4.7,
    "category": "audio",
    "description": "Industry-leading noise cancellation. Exceptional sound quality. All-day comfort.",
    "image": "/images/products/headphones.png",
    "specs": {
      "battery": "Up to 30 hours",
      "features": "Speak-to-Chat, Multipoint connection",
      "type": "Over-ear, Wireless"
    },
    "countInStock": 15
  },
  {
    "name": "AirPods Max",
    "price": 59900,
    "rating": 4.8,
    "category": "audio",
    "description": "High-fidelity audio. Active Noise Cancellation with Transparency mode. Spatial audio.",
    "image": "/images/products/airpods.png",
    "specs": {
      "audio": "Apple-designed dynamic driver",
      "features": "Spatial audio, H1 chip",
      "battery": "Up to 20 hours"
    },
    "countInStock": 10
  },
  {
    "name": "Bose QuietComfort Ultra",
    "price": 35900,
    "rating": 4.9,
    "category": "audio",
    "description": "Breakthrough spatialized audio. World-class noise cancellation. CustomTune technology.",
    "image": "/images/products/bose.png",
    "specs": {
      "mode": "Quiet, Aware, and Immersion",
      "features": "CustomTune, Bose Music app",
      "battery": "Up to 24 hours"
    },
    "countInStock": 8
  },
  {
    "name": "Sennheiser Momentum 4",
    "price": 34990,
    "rating": 4.7,
    "category": "audio",
    "description": "Audiophile-inspired sound and 60-hour battery life for the ultimate listening experience.",
    "image": "/images/products/sennheiser.png",
    "specs": {
      "battery": "Up to 60 hours",
      "features": "Adaptive ANC, Sound Personalization",
      "type": "Over-ear, Wireless"
    },
    "countInStock": 14
  },
  {
    "name": "Beats Studio Pro",
    "price": 37900,
    "rating": 4.5,
    "category": "audio",
    "description": "Rich, immersive sound. Personalized Spatial Audio. Active Noise Cancelling.",
    "image": "/images/products/beats.png",
    "specs": {
      "battery": "Up to 40 hours",
      "features": "Lossless Audio via USB-C, Spatial Audio",
      "type": "Over-ear, Wireless"
    },
    "countInStock": 20
  },
  {
    "name": "Apple Watch Ultra 2",
    "price": 89900,
    "rating": 4.8,
    "category": "wearables",
    "description": "The most rugged and capable Apple Watch. Designed for outdoor adventures and supercharged workflows.",
    "image": "/images/products/watch.png",
    "specs": {
      "case": "49mm aerospace-grade titanium",
      "display": "Always-On Retina up to 3000 nits",
      "battery": "Up to 36 hours"
    },
    "countInStock": 12
  },
  {
    "name": "Samsung Galaxy Watch 6",
    "price": 29999,
    "rating": 4.6,
    "category": "wearables",
    "description": "Advanced health tracking. Sleek design. Powerful performance.",
    "image": "/images/products/galaxy_watch.png",
    "specs": {
      "size": "40mm / 44mm",
      "display": "Super AMOLED",
      "features": "Sleep coaching, Heart rate monitor",
      "battery": "Up to 40 hours"
    },
    "countInStock": 15
  },
  {
    "name": "Garmin epix Pro",
    "price": 8999911990,
    "rating": 4.9,
    "category": "wearables",
    "description": "The ultimate high-performance smartwatch. Featuring a stunning AMOLED display.",
    "image": "/images/products/garmin.png",
    "specs": {
      "case": "Fiber-reinforced polymer",
      "display": "1.3-inch AMOLED",
      "battery": "Up to 16 days",
      "features": "Multiband GPS"
    },
    "countInStock": 6
  },
  {
    "name": "Fitbit Charge 6",
    "price": 99994999,
    "rating": 4.4,
    "category": "wearables",
    "description": "Premium fitness tracker with Google built-in. Advanced health features.",
    "image": "/images/products/fitbit.png",
    "specs": {
      "display": "AMOLED color display",
      "battery": "Up to 7 days",
      "features": "ECG app, Built-in GPS"
    },
    "countInStock": 25
  },
  {
    "name": "Amazfit GTR 4",
    "price": 29996990,
    "rating": 4.5,
    "category": "wearables",
    "description": "Smart Fitness Made Easy. Dual-band circularly-polarized GPS antenna technology.",
    "image": "/images/products/amazfit.png",
    "specs": {
      "display": "1.43-inch AMOLED",
      "battery": "Up to 14 days",
      "features": "150+ Sports Modes, Bluetooth Calls"
    },
    "countInStock": 18
  },
  {
    "name": "PlayStation 5 DualSense Controller",
    "price": 5990,
    "rating": 4.9,
    "category": "gaming",
    "description": "Discover a deeper, highly immersive gaming experience that brings the action to life.",
    "image": "/images/products/controller.png",
    "specs": {
      "connectivity": "Bluetooth 5.1",
      "features": "Haptic feedback, Adaptive triggers",
      "weight": "280g"
    },
    "countInStock": 20
  },
  {
    "name": "Canon EOS R5",
    "price": 339999,
    "rating": 4.9,
    "category": "cameras",
    "description": "Professional mirrorless camera with 45MP full-frame sensor and 8K video recording.",
    "image": "/images/products/camera.png",
    "specs": {
      "sensor": "45MP Full-Frame CMOS",
      "video": "8K30 Raw and 4K120 10-Bit",
      "screen": "3.2\" Vari-Angle Touchscreen LCD"
    },
    "countInStock": 4
  },
  {
    "name": "Xbox Elite Wireless Controller Series 2",
    "price": 29995990,
    "rating": 4.8,
    "category": "gaming",
    "description": "Play like a pro with the world's most advanced controller.",
    "image": "/images/products/xbox_controller.png",
    "specs": {
      "battery": "Up to 40 hours",
      "features": "Adjustable-tension thumbsticks, Wrap-around rubberized grip",
      "connectivity": "Bluetooth, USB-C"
    },
    "countInStock": 12
  },
  {
    "name": "Sony A7 IV",
    "price": 219990,
    "rating": 4.9,
    "category": "cameras",
    "description": "Beyond basic. The new hybrid standard for photography and videography.",
    "image": "/images/products/sonya7.png",
    "specs": {
      "sensor": "33MP Full-Frame Exmor R CMOS",
      "video": "4K 60p",
      "autofocus": "Real-time Eye AF"
    },
    "countInStock": 5
  },
  {
    "name": "Samsung Smartphone Pro 81",
    "price": 5999910,
    "rating": 4.9,
    "category": "smartphones",
    "description": "Incredible new smartphone by Samsung offering uncompromised performance and sleek design.",
    "image": "/images/products/samsung.png",
    "brand": "Samsung",
    "countInStock": 40,
    "numReviews": 192
  },
  {
    "name": "Oppo Smartphone Plus 21",
    "price": 268,
    "rating": 4.9,
    "category": "smartphones",
    "description": "Incredible new smartphone by Oppo offering uncompromised performance and sleek design.",
    "image": "/images/products/rogphone.png",
    "brand": "Oppo",
    "countInStock": 13,
    "numReviews": 39
  },
  {
    "name": "Samsung Smartphone Elite 81",
    "price": 481,
    "rating": 4.6,
    "category": "smartphones",
    "description": "Incredible new smartphone by Samsung offering uncompromised performance and sleek design.",
    "image": "/images/products/samsung.png",
    "brand": "Samsung",
    "countInStock": 12,
    "numReviews": 173
  },
  {
    "name": "Apple Smartphone Series 73",
    "price": 659,
    "rating": 4.5,
    "category": "smartphones",
    "description": "Incredible new smartphone by Apple offering uncompromised performance and sleek design.",
    "image": "/images/products/iphone.png",
    "brand": "Apple",
    "countInStock": 37,
    "numReviews": 67
  },
  {
    "name": "OnePlus Smartphone Ultra 88",
    "price": 974,
    "rating": 4.7,
    "category": "smartphones",
    "description": "Incredible new smartphone by OnePlus offering uncompromised performance and sleek design.",
    "image": "/images/products/oneplus.png",
    "brand": "OnePlus",
    "countInStock": 32,
    "numReviews": 104
  },
  {
    "name": "Apple Smartphone Gen 2 38",
    "price": 568,
    "rating": 4.5,
    "category": "smartphones",
    "description": "Incredible new smartphone by Apple offering uncompromised performance and sleek design.",
    "image": "/images/products/iphone.png",
    "brand": "Apple",
    "countInStock": 15,
    "numReviews": 21
  },
  {
    "name": "Apple Smartphone Pro 12",
    "price": 503,
    "rating": 4.8,
    "category": "smartphones",
    "description": "Incredible new smartphone by Apple offering uncompromised performance and sleek design.",
    "image": "/images/products/iphone.png",
    "brand": "Apple",
    "countInStock": 11,
    "numReviews": 187
  },
  {
    "name": "Samsung Smartphone Edition 97",
    "price": 933,
    "rating": 4.9,
    "category": "smartphones",
    "description": "Incredible new smartphone by Samsung offering uncompromised performance and sleek design.",
    "image": "/images/products/samsung.png",
    "brand": "Samsung",
    "countInStock": 33,
    "numReviews": 67
  },
  {
    "name": "OnePlus Smartphone Ultra 1",
    "price": 660,
    "rating": 4.8,
    "category": "smartphones",
    "description": "Incredible new smartphone by OnePlus offering uncompromised performance and sleek design.",
    "image": "/images/products/oneplus.png",
    "brand": "OnePlus",
    "countInStock": 21,
    "numReviews": 42
  },
  {
    "name": "Google Smartphone Pro 21",
    "price": 270,
    "rating": 4.7,
    "category": "smartphones",
    "description": "Incredible new smartphone by Google offering uncompromised performance and sleek design.",
    "image": "/images/products/pixel.png",
    "brand": "Google",
    "countInStock": 22,
    "numReviews": 93
  },
  {
    "name": "Apple Laptop Series 66",
    "price": 936,
    "rating": 4.8,
    "category": "laptops",
    "description": "Incredible new laptop by Apple offering uncompromised performance and sleek design.",
    "image": "/images/products/macbook.png",
    "brand": "Apple",
    "countInStock": 14,
    "numReviews": 111
  },
  {
    "name": "Dell Laptop Pro 31",
    "price": 610,
    "rating": 4.6,
    "category": "laptops",
    "description": "Incredible new laptop by Dell offering uncompromised performance and sleek design.",
    "image": "/images/products/dell.png",
    "brand": "Dell",
    "countInStock": 24,
    "numReviews": 177
  },
  {
    "name": "HP Laptop Pro 60",
    "price": 271,
    "rating": 5,
    "category": "laptops",
    "description": "Incredible new laptop by HP offering uncompromised performance and sleek design.",
    "image": "/images/products/surface.png",
    "brand": "HP",
    "countInStock": 49,
    "numReviews": 107
  },
  {
    "name": "Dell Laptop Edition 68",
    "price": 212,
    "rating": 4.1,
    "category": "laptops",
    "description": "Incredible new laptop by Dell offering uncompromised performance and sleek design.",
    "image": "/images/products/dell.png",
    "brand": "Dell",
    "countInStock": 37,
    "numReviews": 138
  },
  {
    "name": "Apple Laptop Ultra 99",
    "price": 854,
    "rating": 4.7,
    "category": "laptops",
    "description": "Incredible new laptop by Apple offering uncompromised performance and sleek design.",
    "image": "/images/products/macbook.png",
    "brand": "Apple",
    "countInStock": 23,
    "numReviews": 59
  },
  {
    "name": "Acer Laptop Ultra 96",
    "price": 657,
    "rating": 4.4,
    "category": "laptops",
    "description": "Incredible new laptop by Acer offering uncompromised performance and sleek design.",
    "image": "/images/products/razer.png",
    "brand": "Acer",
    "countInStock": 49,
    "numReviews": 183
  },
  {
    "name": "HP Laptop Series 37",
    "price": 973,
    "rating": 4.7,
    "category": "laptops",
    "description": "Incredible new laptop by HP offering uncompromised performance and sleek design.",
    "image": "/images/products/surface.png",
    "brand": "HP",
    "countInStock": 24,
    "numReviews": 47
  },
  {
    "name": "Dell Laptop V 45",
    "price": 574,
    "rating": 4.3,
    "category": "laptops",
    "description": "Incredible new laptop by Dell offering uncompromised performance and sleek design.",
    "image": "/images/products/dell.png",
    "brand": "Dell",
    "countInStock": 36,
    "numReviews": 142
  },
  {
    "name": "Acer Laptop Gen 2 51",
    "price": 667,
    "rating": 4.6,
    "category": "laptops",
    "description": "Incredible new laptop by Acer offering uncompromised performance and sleek design.",
    "image": "/images/products/razer.png",
    "brand": "Acer",
    "countInStock": 45,
    "numReviews": 157
  },
  {
    "name": "HP Laptop Pro 17",
    "price": 4999990,
    "rating": 4,
    "category": "laptops",
    "description": "Incredible new laptop by HP offering uncompromised performance and sleek design.",
    "image": "/images/products/surface.png",
    "brand": "HP",
    "countInStock": 20,
    "numReviews": 13
  },
  {
    "name": "Apple Audi Series 47",
    "price": 8999977,
    "rating": 4.7,
    "category": "audio",
    "description": "Incredible new audi by Apple offering uncompromised performance and sleek design.",
    "image": "/images/products/airpods.png",
    "brand": "Apple",
    "countInStock": 13,
    "numReviews": 138
  },
  {
    "name": "JBL Audi Gen 2 61",
    "price": 419,
    "rating": 4.3,
    "category": "audio",
    "description": "Incredible new audi by JBL offering uncompromised performance and sleek design.",
    "image": "/images/products/beats.png",
    "brand": "JBL",
    "countInStock": 28,
    "numReviews": 188
  },
  {
    "name": "Apple Audi Plus 8",
    "price": 999928,
    "rating": 4.8,
    "category": "audio",
    "description": "Incredible new audi by Apple offering uncompromised performance and sleek design.",
    "image": "/images/products/airpods.png",
    "brand": "Apple",
    "countInStock": 11,
    "numReviews": 57
  },
  {
    "name": "Apple Audi Max 59",
    "price": 534,
    "rating": 4.5,
    "category": "audio",
    "description": "Incredible new audi by Apple offering uncompromised performance and sleek design.",
    "image": "/images/products/airpods.png",
    "brand": "Apple",
    "countInStock": 18,
    "numReviews": 133
  },
  {
    "name": "Apple Audi V 46",
    "price": 622,
    "rating": 4.1,
    "category": "audio",
    "description": "Incredible new audi by Apple offering uncompromised performance and sleek design.",
    "image": "/images/products/airpods.png",
    "brand": "Apple",
    "countInStock": 36,
    "numReviews": 171
  },
  {
    "name": "Sennheiser Audi X 67",
    "price": 745,
    "rating": 4,
    "category": "audio",
    "description": "Incredible new audi by Sennheiser offering uncompromised performance and sleek design.",
    "image": "/images/products/sennheiser.png",
    "brand": "Sennheiser",
    "countInStock": 3,
    "numReviews": 31
  },
  {
    "name": "JBL Audi Max 7",
    "price": 821,
    "rating": 4.3,
    "category": "audio",
    "description": "Incredible new audi by JBL offering uncompromised performance and sleek design.",
    "image": "/images/products/beats.png",
    "brand": "JBL",
    "countInStock": 41,
    "numReviews": 174
  },
  {
    "name": "Sennheiser Audi V 44",
    "price": 260,
    "rating": 4.9,
    "category": "audio",
    "description": "Incredible new audi by Sennheiser offering uncompromised performance and sleek design.",
    "image": "/images/products/sennheiser.png",
    "brand": "Sennheiser",
    "countInStock": 8,
    "numReviews": 34
  },
  {
    "name": "Apple Audi Lite 89",
    "price": 869,
    "rating": 4.6,
    "category": "audio",
    "description": "Incredible new audi by Apple offering uncompromised performance and sleek design.",
    "image": "/images/products/airpods.png",
    "brand": "Apple",
    "countInStock": 48,
    "numReviews": 133
  },
  {
    "name": "JBL Audi Gen 2 42",
    "price": 306,
    "rating": 4.3,
    "category": "audio",
    "description": "Incredible new audi by JBL offering uncompromised performance and sleek design.",
    "image": "/images/products/beats.png",
    "brand": "JBL",
    "countInStock": 20,
    "numReviews": 180
  },
  {
    "name": "Apple Wearable Plus 66",
    "price": 936,
    "rating": 4.6,
    "category": "wearables",
    "description": "Incredible new wearable by Apple offering uncompromised performance and sleek design.",
    "image": "/images/products/watch.png",
    "brand": "Apple",
    "countInStock": 1,
    "numReviews": 158
  },
  {
    "name": "Samsung Wearable V 44",
    "price": 550,
    "rating": 4.6,
    "category": "wearables",
    "description": "Incredible new wearable by Samsung offering uncompromised performance and sleek design.",
    "image": "/images/products/galaxy_watch.png",
    "brand": "Samsung",
    "countInStock": 32,
    "numReviews": 61
  },
  {
    "name": "Amazfit Wearable X 2",
    "price": 564,
    "rating": 4.3,
    "category": "wearables",
    "description": "Incredible new wearable by Amazfit offering uncompromised performance and sleek design.",
    "image": "/images/products/amazfit.png",
    "brand": "Amazfit",
    "countInStock": 4,
    "numReviews": 129
  },
  {
    "name": "Fitbit Wearable X 91",
    "price": 267,
    "rating": 4.6,
    "category": "wearables",
    "description": "Incredible new wearable by Fitbit offering uncompromised performance and sleek design.",
    "image": "/images/products/fitbit.png",
    "brand": "Fitbit",
    "countInStock": 10,
    "numReviews": 16
  },
  {
    "name": "Amazfit Wearable Series 54",
    "price": 824,
    "rating": 4.6,
    "category": "wearables",
    "description": "Incredible new wearable by Amazfit offering uncompromised performance and sleek design.",
    "image": "/images/products/amazfit.png",
    "brand": "Amazfit",
    "countInStock": 21,
    "numReviews": 180
  },
  {
    "name": "Garmin Wearable Series 5",
    "price": 527,
    "rating": 4.9,
    "category": "wearables",
    "description": "Incredible new wearable by Garmin offering uncompromised performance and sleek design.",
    "image": "/images/products/garmin.png",
    "brand": "Garmin",
    "countInStock": 26,
    "numReviews": 179
  },
  {
    "name": "Fitbit Wearable Lite 90",
    "price": 535,
    "rating": 5,
    "category": "wearables",
    "description": "Incredible new wearable by Fitbit offering uncompromised performance and sleek design.",
    "image": "/images/products/fitbit.png",
    "brand": "Fitbit",
    "countInStock": 6,
    "numReviews": 67
  },
  {
    "name": "Samsung Wearable Lite 67",
    "price": 490,
    "rating": 4.2,
    "category": "wearables",
    "description": "Incredible new wearable by Samsung offering uncompromised performance and sleek design.",
    "image": "/images/products/galaxy_watch.png",
    "brand": "Samsung",
    "countInStock": 19,
    "numReviews": 177
  },
  {
    "name": "Amazfit Wearable Lite 91",
    "price": 999931,
    "rating": 4.1,
    "category": "wearables",
    "description": "Incredible new wearable by Amazfit offering uncompromised performance and sleek design.",
    "image": "/images/products/amazfit.png",
    "brand": "Amazfit",
    "countInStock": 12,
    "numReviews": 54
  },
  {
    "name": "Garmin Wearable Ultra 84",
    "price": 769,
    "rating": 4.8,
    "category": "wearables",
    "description": "Incredible new wearable by Garmin offering uncompromised performance and sleek design.",
    "image": "/images/products/garmin.png",
    "brand": "Garmin",
    "countInStock": 36,
    "numReviews": 148
  },
  {
    "name": "Sony Gamin Pro 72",
    "price": 444,
    "rating": 4.1,
    "category": "gaming",
    "description": "Incredible new gamin by Sony offering uncompromised performance and sleek design.",
    "image": "/images/products/controller.png",
    "brand": "Sony",
    "countInStock": 12,
    "numReviews": 102
  },
  {
    "name": "Nintendo Gamin X 15",
    "price": 899,
    "rating": 4.9,
    "category": "gaming",
    "description": "Incredible new gamin by Nintendo offering uncompromised performance and sleek design.",
    "image": "/images/products/xbox_controller.png",
    "brand": "Nintendo",
    "countInStock": 20,
    "numReviews": 152
  },
  {
    "name": "Sony Gamin Edition 29",
    "price": 611,
    "rating": 4.2,
    "category": "gaming",
    "description": "Incredible new gamin by Sony offering uncompromised performance and sleek design.",
    "image": "/images/products/controller.png",
    "brand": "Sony",
    "countInStock": 28,
    "numReviews": 6
  },
  {
    "name": "Sony Gamin Elite 12",
    "price": 795,
    "rating": 4.1,
    "category": "gaming",
    "description": "Incredible new gamin by Sony offering uncompromised performance and sleek design.",
    "image": "/images/products/controller.png",
    "brand": "Sony",
    "countInStock": 47,
    "numReviews": 164
  },
  {
    "name": "Razer Gamin Series 43",
    "price": 253,
    "rating": 4.4,
    "category": "gaming",
    "description": "Incredible new gamin by Razer offering uncompromised performance and sleek design.",
    "image": "/images/products/controller.png",
    "brand": "Razer",
    "countInStock": 27,
    "numReviews": 45
  },
  {
    "name": "Sony Gamin Plus 35",
    "price": 647,
    "rating": 4,
    "category": "gaming",
    "description": "Incredible new gamin by Sony offering uncompromised performance and sleek design.",
    "image": "/images/products/controller.png",
    "brand": "Sony",
    "countInStock": 27,
    "numReviews": 112
  },
  {
    "name": "Razer Gamin Lite 59",
    "price": 966,
    "rating": 4.1,
    "category": "gaming",
    "description": "Incredible new gamin by Razer offering uncompromised performance and sleek design.",
    "image": "/images/products/controller.png",
    "brand": "Razer",
    "countInStock": 1,
    "numReviews": 33
  },
  {
    "name": "Logitech Gamin Max 11",
    "price": 644,
    "rating": 4.8,
    "category": "gaming",
    "description": "Incredible new gamin by Logitech offering uncompromised performance and sleek design.",
    "image": "/images/products/controller.png",
    "brand": "Logitech",
    "countInStock": 15,
    "numReviews": 189
  },
  {
    "name": "Razer Gamin V 39",
    "price": 299958,
    "rating": 4.4,
    "category": "gaming",
    "description": "Incredible new gamin by Razer offering uncompromised performance and sleek design.",
    "image": "/images/products/controller.png",
    "brand": "Razer",
    "countInStock": 29,
    "numReviews": 125
  },
  {
    "name": "Nintendo Gamin X 47",
    "price": 314,
    "rating": 4.1,
    "category": "gaming",
    "description": "Incredible new gamin by Nintendo offering uncompromised performance and sleek design.",
    "image": "/images/products/xbox_controller.png",
    "brand": "Nintendo",
    "countInStock": 45,
    "numReviews": 197
  },
  {
    "name": "Sony Camera Ultra 74",
    "price": 765,
    "rating": 4.8,
    "category": "cameras",
    "description": "Incredible new camera by Sony offering uncompromised performance and sleek design.",
    "image": "/images/products/sonya7.png",
    "brand": "Sony",
    "countInStock": 48,
    "numReviews": 143
  },
  {
    "name": "Nikon Camera Pro 83",
    "price": 752,
    "rating": 4.7,
    "category": "cameras",
    "description": "Incredible new camera by Nikon offering uncompromised performance and sleek design.",
    "image": "/images/products/camera.png",
    "brand": "Nikon",
    "countInStock": 18,
    "numReviews": 176
  },
  {
    "name": "Fujifilm Camera Elite 90",
    "price": 458,
    "rating": 4.4,
    "category": "cameras",
    "description": "Incredible new camera by Fujifilm offering uncompromised performance and sleek design.",
    "image": "/images/products/sonya7.png",
    "brand": "Fujifilm",
    "countInStock": 30,
    "numReviews": 55
  },
  {
    "name": "Sony Camera X 88",
    "price": 716,
    "rating": 4.7,
    "category": "cameras",
    "description": "Incredible new camera by Sony offering uncompromised performance and sleek design.",
    "image": "/images/products/sonya7.png",
    "brand": "Sony",
    "countInStock": 4,
    "numReviews": 75
  },
  {
    "name": "Nikon Camera Series 26",
    "price": 298,
    "rating": 4.5,
    "category": "cameras",
    "description": "Incredible new camera by Nikon offering uncompromised performance and sleek design.",
    "image": "/images/products/camera.png",
    "brand": "Nikon",
    "countInStock": 3,
    "numReviews": 86
  },
  {
    "name": "Sony Camera Edition 12",
    "price": 5999932,
    "rating": 4.7,
    "category": "cameras",
    "description": "Incredible new camera by Sony offering uncompromised performance and sleek design.",
    "image": "/images/products/sonya7.png",
    "brand": "Sony",
    "countInStock": 36,
    "numReviews": 107
  },
  {
    "name": "Nikon Camera Pro 75",
    "price": 758,
    "rating": 4.3,
    "category": "cameras",
    "description": "Incredible new camera by Nikon offering uncompromised performance and sleek design.",
    "image": "/images/products/camera.png",
    "brand": "Nikon",
    "countInStock": 4,
    "numReviews": 147
  },
  {
    "name": "Nikon Camera V 16",
    "price": 424,
    "rating": 4.6,
    "category": "cameras",
    "description": "Incredible new camera by Nikon offering uncompromised performance and sleek design.",
    "image": "/images/products/camera.png",
    "brand": "Nikon",
    "countInStock": 30,
    "numReviews": 138
  },
  {
    "name": "Nikon Camera X 66",
    "price": 5999951,
    "rating": 4.5,
    "category": "cameras",
    "description": "Incredible new camera by Nikon offering uncompromised performance and sleek design.",
    "image": "/images/products/camera.png",
    "brand": "Nikon",
    "countInStock": 13,
    "numReviews": 155
  },
  {
    "name": "Canon Camera Plus 73",
    "price": 982,
    "rating": 4.2,
    "category": "cameras",
    "description": "Incredible new camera by Canon offering uncompromised performance and sleek design.",
    "image": "/images/products/camera.png",
    "brand": "Canon",
    "countInStock": 44,
    "numReviews": 25
  }
];

export default products;
