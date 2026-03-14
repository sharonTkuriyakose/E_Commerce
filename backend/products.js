const products = [
  // Smartphones
  {
    name: "iPhone 15 Pro",
    price: 1,
    rating: 4.8,
    category: "smartphones",
    description: "Titanium design. A17 Pro chip. 48MP Main camera. And a new Action button.",
    image: "/images/products/iphone.png",
    specs: { display: "6.1-inch Super Retina XDR", chip: "A17 Pro", camera: "48MP Main | Ultra Wide | Telephoto", battery: "Up to 23 hours video playback" },
    countInStock: 10
  },
  {
    name: "Samsung Galaxy S23 Ultra",
    price: 1,
    rating: 4.9,
    category: "smartphones",
    description: "Capture the night with Nightography. Built-in S Pen. 200MP camera resolution.",
    image: "/images/products/samsung.png",
    specs: { display: "6.8-inch Dynamic AMOLED 2X", chip: "Snapdragon 8 Gen 2", camera: "200MP Main", battery: "5000mAh" },
    countInStock: 5
  },
  {
    name: "Google Pixel 8 Pro",
    price: 1,
    rating: 4.7,
    category: "smartphones",
    description: "The all-pro Google phone. Fast, secure, and designed by Google.",
    image: "/images/products/pixel.png",
    specs: { display: "6.7-inch LTPO OLED", chip: "Google Tensor G3", camera: "50MP Main | 48MP Ultra Wide | 48MP Telephoto", battery: "5050mAh" },
    countInStock: 12
  },
  {
    name: "Xiaomi 14 Pro",
    price: 1,
    rating: 4.6,
    category: "smartphones",
    description: "Leica Summilux optical lens. Snapdragon 8 Gen 3. All-around liquid display.",
    image: "/images/products/xiaomi.png",
    specs: { display: "6.73-inch AMOLED", chip: "Snapdragon 8 Gen 3", camera: "50MP Triple Camera", battery: "4880mAh" },
    countInStock: 7
  },
  {
    name: "OnePlus 12",
    price: 1,
    rating: 4.8,
    category: "smartphones",
    description: "Smooth beyond belief. All-new Hasselblad Camera for Mobile.",
    image: "/images/products/oneplus.png",
    specs: { display: "6.82-inch AMOLED", chip: "Snapdragon 8 Gen 3", camera: "50MP Primary", battery: "5400mAh" },
    countInStock: 20
  },
  {
    name: "Asus ROG Phone 8 Pro",
    price: 1,
    rating: 4.7,
    category: "smartphones",
    description: "Beyond Gaming. The ultimate gaming phone with premium everyday features.",
    image: "/images/products/rogphone.png",
    specs: { display: "6.78-inch AMOLED 165Hz", chip: "Snapdragon 8 Gen 3", camera: "50MP Main", battery: "5500mAh" },
    countInStock: 15
  },
  // Laptops
  {
    name: "MacBook Pro M3 Max",
    price: 1,
    rating: 5.0,
    category: "laptops",
    description: "MacBook Pro blasts forward with the M3 Max chip. Built for the most extreme workflows.",
    image: "/images/products/macbook.png",
    specs: { display: "16.2-inch Liquid Retina XDR", chip: "Apple M3 Max", ram: "Up to 128GB unified memory", storage: "Up to 8TB SSD" },
    countInStock: 8
  },
  {
    name: "Dell XPS 15",
    price: 1,
    rating: 4.6,
    category: "laptops",
    description: "High-performance laptop featuring a stunning OLED display and up to Intel Core i9 processors.",
    image: "/images/products/dell.png",
    specs: { display: "15.6-inch 3.5K OLED Touch", chip: "Intel Core i7", ram: "16GB DDR5", storage: "1TB PCIe SSD" },
    countInStock: 6
  },
  {
    name: "Razer Blade 16",
    price: 1,
    rating: 4.8,
    category: "laptops",
    description: "The ultimate 16-inch gaming laptop. World's first dual-mode Mini-LED display.",
    image: "/images/products/razer.png",
    specs: { display: "16-inch Dual-Mode Mini-LED", chip: "Intel Core i9-13950HX", gpu: "RTX 4090", ram: "32GB DDR5" },
    countInStock: 4
  },
  {
    name: "Surface Laptop 5",
    price: 1,
    rating: 4.5,
    category: "laptops",
    description: "Sleek and portable. Blazing speed for multi-tasking and premium design.",
    image: "/images/products/surface.png",
    specs: { display: "13.5-inch PixelSense", chip: "Intel Core i7 Gen 12", battery: "Up to 18 hours", storage: "512GB SSD" },
    countInStock: 10
  },
  {
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    price: 1,
    rating: 4.7,
    category: "laptops",
    description: "Ultralight business laptop with premium performance and security.",
    image: "/images/products/thinkpad.png",
    specs: { display: "14-inch WUXGA", chip: "Intel Core i7-1355U", ram: "16GB LPDDR5", storage: "512GB PCIe SSD" },
    countInStock: 12
  },
  {
    name: "ASUS ROG Zephyrus G14",
    price: 1,
    rating: 4.8,
    category: "laptops",
    description: "Incredibly powerful, incredibly portable gaming laptop with Anime Matrix.",
    image: "/images/products/zephyrus.png",
    specs: { display: "14-inch QHD 165Hz", chip: "AMD Ryzen 9 7940HS", gpu: "RTX 4060", ram: "16GB DDR5" },
    countInStock: 9
  },
  // Audio
  {
    name: "Sony WH-1000XM5",
    price: 1,
    rating: 4.7,
    category: "audio",
    description: "Industry-leading noise cancellation. Exceptional sound quality. All-day comfort.",
    image: "/images/products/headphones.png",
    specs: { battery: "Up to 30 hours", features: "Speak-to-Chat, Multipoint connection", type: "Over-ear, Wireless" },
    countInStock: 15
  },
  {
    name: "AirPods Max",
    price: 1,
    rating: 4.8,
    category: "audio",
    description: "High-fidelity audio. Active Noise Cancellation with Transparency mode. Spatial audio.",
    image: "/images/products/airpods.png",
    specs: { audio: "Apple-designed dynamic driver", features: "Spatial audio, H1 chip", battery: "Up to 20 hours" },
    countInStock: 10
  },
  {
    name: "Bose QuietComfort Ultra",
    price: 1,
    rating: 4.9,
    category: "audio",
    description: "Breakthrough spatialized audio. World-class noise cancellation. CustomTune technology.",
    image: "/images/products/bose.png",
    specs: { mode: "Quiet, Aware, and Immersion", features: "CustomTune, Bose Music app", battery: "Up to 24 hours" },
    countInStock: 8
  },
  {
    name: "Sennheiser Momentum 4",
    price: 1,
    rating: 4.7,
    category: "audio",
    description: "Audiophile-inspired sound and 60-hour battery life for the ultimate listening experience.",
    image: "/images/products/sennheiser.png",
    specs: { battery: "Up to 60 hours", features: "Adaptive ANC, Sound Personalization", type: "Over-ear, Wireless" },
    countInStock: 14
  },
  {
    name: "Beats Studio Pro",
    price: 1,
    rating: 4.5,
    category: "audio",
    description: "Rich, immersive sound. Personalized Spatial Audio. Active Noise Cancelling.",
    image: "/images/products/beats.png",
    specs: { battery: "Up to 40 hours", features: "Lossless Audio via USB-C, Spatial Audio", type: "Over-ear, Wireless" },
    countInStock: 20
  },
  // Wearables
  {
    name: "Apple Watch Ultra 2",
    price: 1,
    rating: 4.8,
    category: "wearables",
    description: "The most rugged and capable Apple Watch. Designed for outdoor adventures and supercharged workflows.",
    image: "/images/products/watch.png",
    specs: { case: "49mm aerospace-grade titanium", display: "Always-On Retina up to 3000 nits", battery: "Up to 36 hours" },
    countInStock: 12
  },
  {
    name: "Samsung Galaxy Watch 6",
    price: 1,
    rating: 4.6,
    category: "wearables",
    description: "Advanced health tracking. Sleek design. Powerful performance.",
    image: "/images/products/galaxy_watch.png",
    specs: { size: "40mm / 44mm", display: "Super AMOLED", features: "Sleep coaching, Heart rate monitor", battery: "Up to 40 hours" },
    countInStock: 15
  },
  {
    name: "Garmin epix Pro",
    price: 1,
    rating: 4.9,
    category: "wearables",
    description: "The ultimate high-performance smartwatch. Featuring a stunning AMOLED display.",
    image: "/images/products/garmin.png",
    specs: { case: "Fiber-reinforced polymer", display: "1.3-inch AMOLED", battery: "Up to 16 days", features: "Multiband GPS" },
    countInStock: 6
  },
  {
    name: "Fitbit Charge 6",
    price: 1,
    rating: 4.4,
    category: "wearables",
    description: "Premium fitness tracker with Google built-in. Advanced health features.",
    image: "/images/products/fitbit.png",
    specs: { display: "AMOLED color display", battery: "Up to 7 days", features: "ECG app, Built-in GPS" },
    countInStock: 25
  },
  {
    name: "Amazfit GTR 4",
    price: 1,
    rating: 4.5,
    category: "wearables",
    description: "Smart Fitness Made Easy. Dual-band circularly-polarized GPS antenna technology.",
    image: "/images/products/amazfit.png",
    specs: { display: "1.43-inch AMOLED", battery: "Up to 14 days", features: "150+ Sports Modes, Bluetooth Calls" },
    countInStock: 18
  },
  // Others (Existing)
  {
    name: "PlayStation 5 DualSense Controller",
    price: 1,
    rating: 4.9,
    category: "gaming",
    description: "Discover a deeper, highly immersive gaming experience that brings the action to life.",
    image: "/images/products/controller.png",
    specs: { connectivity: "Bluetooth 5.1", features: "Haptic feedback, Adaptive triggers", weight: "280g" },
    countInStock: 20
  },
  {
    name: "Canon EOS R5",
    price: 1,
    rating: 4.9,
    category: "cameras",
    description: "Professional mirrorless camera with 45MP full-frame sensor and 8K video recording.",
    image: "/images/products/camera.png",
    specs: { sensor: "45MP Full-Frame CMOS", video: "8K30 Raw and 4K120 10-Bit", screen: "3.2\" Vari-Angle Touchscreen LCD" },
    countInStock: 4
  },
  {
    name: "Xbox Elite Wireless Controller Series 2",
    price: 1,
    rating: 4.8,
    category: "gaming",
    description: "Play like a pro with the world's most advanced controller.",
    image: "/images/products/xbox_controller.png",
    specs: { battery: "Up to 40 hours", features: "Adjustable-tension thumbsticks, Wrap-around rubberized grip", connectivity: "Bluetooth, USB-C" },
    countInStock: 12
  },
  {
    name: "Sony A7 IV",
    price: 1,
    rating: 4.9,
    category: "cameras",
    description: "Beyond basic. The new hybrid standard for photography and videography.",
    image: "/images/products/sonya7.png",
    specs: { sensor: "33MP Full-Frame Exmor R CMOS", video: "4K 60p", autofocus: "Real-time Eye AF" },
    countInStock: 5
  }
];

export default products;
