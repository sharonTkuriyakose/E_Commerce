export const products = [
  // Smartphones
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 999,
    rating: 4.8,
    category: "smartphones",
    description: "Titanium design. A17 Pro chip. 48MP Main camera. And a new Action button.",
    image: "/images/products/iphone.png",
    specs: { display: "6.1-inch Super Retina XDR", chip: "A17 Pro", camera: "48MP Main | Ultra Wide | Telephoto", battery: "Up to 23 hours video playback" }
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    price: 1199,
    rating: 4.9,
    category: "smartphones",
    description: "Capture the night with Nightography. Built-in S Pen. 200MP camera resolution.",
    image: "/images/products/samsung.png",
    specs: { display: "6.8-inch Dynamic AMOLED 2X", chip: "Snapdragon 8 Gen 2", camera: "200MP Main", battery: "5000mAh" }
  },
  {
    id: 10,
    name: "Google Pixel 8 Pro",
    price: 999,
    rating: 4.7,
    category: "smartphones",
    description: "The all-pro Google phone. Fast, secure, and designed by Google.",
    image: "/images/products/pixel.png",
    specs: { display: "6.7-inch LTPO OLED", chip: "Google Tensor G3", camera: "50MP Main | 48MP Ultra Wide | 48MP Telephoto", battery: "5050mAh" }
  },
  {
    id: 11,
    name: "Xiaomi 14 Pro",
    price: 899,
    rating: 4.6,
    category: "smartphones",
    description: "Leica Summilux optical lens. Snapdragon 8 Gen 3. All-around liquid display.",
    image: "/images/products/xiaomi.png",
    specs: { display: "6.73-inch AMOLED", chip: "Snapdragon 8 Gen 3", camera: "50MP Triple Camera", battery: "4880mAh" }
  },
  // Laptops
  {
    id: 3,
    name: "MacBook Pro M3 Max",
    price: 3199,
    rating: 5.0,
    category: "laptops",
    description: "MacBook Pro blasts forward with the M3 Max chip. Built for the most extreme workflows.",
    image: "/images/products/macbook.png",
    specs: { display: "16.2-inch Liquid Retina XDR", chip: "Apple M3 Max", ram: "Up to 128GB unified memory", storage: "Up to 8TB SSD" }
  },
  {
    id: 7,
    name: "Dell XPS 15",
    price: 1899,
    rating: 4.6,
    category: "laptops",
    description: "High-performance laptop featuring a stunning OLED display and up to Intel Core i9 processors.",
    image: "/images/products/dell.png",
    specs: { display: "15.6-inch 3.5K OLED Touch", chip: "Intel Core i7", ram: "16GB DDR5", storage: "1TB PCIe SSD" }
  },
  {
    id: 12,
    name: "Razer Blade 16",
    price: 2999,
    rating: 4.8,
    category: "laptops",
    description: "The ultimate 16-inch gaming laptop. World's first dual-mode Mini-LED display.",
    image: "/images/products/razer.png",
    specs: { display: "16-inch Dual-Mode Mini-LED", chip: "Intel Core i9-13950HX", gpu: "RTX 4090", ram: "32GB DDR5" }
  },
  {
    id: 13,
    name: "Surface Laptop 5",
    price: 1299,
    rating: 4.5,
    category: "laptops",
    description: "Sleek and portable. Blazing speed for multi-tasking and premium design.",
    image: "/images/products/surface.png",
    specs: { display: "13.5-inch PixelSense", chip: "Intel Core i7 Gen 12", battery: "Up to 18 hours", storage: "512GB SSD" }
  },
  // Audio
  {
    id: 4,
    name: "Sony WH-1000XM5",
    price: 398,
    rating: 4.7,
    category: "audio",
    description: "Industry-leading noise cancellation. Exceptional sound quality. All-day comfort.",
    image: "/images/products/headphones.png",
    specs: { battery: "Up to 30 hours", features: "Speak-to-Chat, Multipoint connection", type: "Over-ear, Wireless" }
  },
  {
    id: 14,
    name: "AirPods Max",
    price: 549,
    rating: 4.8,
    category: "audio",
    description: "High-fidelity audio. Active Noise Cancellation with Transparency mode. Spatial audio.",
    image: "/images/products/airpods.png",
    specs: { audio: "Apple-designed dynamic driver", features: "Spatial audio, H1 chip", battery: "Up to 20 hours" }
  },
  {
    id: 15,
    name: "Bose QuietComfort Ultra",
    price: 429,
    rating: 4.9,
    category: "audio",
    description: "Breakthrough spatialized audio. World-class noise cancellation. CustomTune technology.",
    image: "/images/products/bose.png",
    specs: { mode: "Quiet, Aware, and Immersion", features: "CustomTune, Bose Music app", battery: "Up to 24 hours" }
  },
  // Wearables
  {
    id: 5,
    name: "Apple Watch Ultra 2",
    price: 799,
    rating: 4.8,
    category: "wearables",
    description: "The most rugged and capable Apple Watch. Designed for outdoor adventures and supercharged workflows.",
    image: "/images/products/watch.png",
    specs: { case: "49mm aerospace-grade titanium", display: "Always-On Retina up to 3000 nits", battery: "Up to 36 hours" }
  },
  {
    id: 16,
    name: "Samsung Galaxy Watch 6",
    price: 299,
    rating: 4.6,
    category: "wearables",
    description: "Advanced health tracking. Sleek design. Powerful performance.",
    image: "/images/products/galaxy_watch.png",
    specs: { size: "40mm / 44mm", display: "Super AMOLED", features: "Sleep coaching, Heart rate monitor", battery: "Up to 40 hours" }
  },
  {
    id: 17,
    name: "Garmin epix Pro",
    price: 899,
    rating: 4.9,
    category: "wearables",
    description: "The ultimate high-performance smartwatch. Featuring a stunning AMOLED display.",
    image: "/images/products/garmin.png",
    specs: { case: "Fiber-reinforced polymer", display: "1.3-inch AMOLED", battery: "Up to 16 days", features: "Multiband GPS" }
  },
  // Others
  {
    id: 6,
    name: "PlayStation 5 DualSense Controller",
    price: 69,
    rating: 4.9,
    category: "gaming",
    description: "Discover a deeper, highly immersive gaming experience that brings the action to life.",
    image: "/images/products/controller.png",
    specs: { connectivity: "Bluetooth 5.1", features: "Haptic feedback, Adaptive triggers", weight: "280g" }
  },
  {
    id: 8,
    name: "Canon EOS R5",
    price: 3899,
    rating: 4.9,
    category: "cameras",
    description: "Professional mirrorless camera with 45MP full-frame sensor and 8K video recording.",
    image: "/images/products/camera.png",
    specs: { sensor: "45MP Full-Frame CMOS", video: "8K30 Raw and 4K120 10-Bit", screen: "3.2\" Vari-Angle Touchscreen LCD" }
  }
];

export const categories = [
  { id: "smartphones", name: "Smartphones", icon: "Smartphone", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=500&auto=format&fit=crop" },
  { id: "laptops", name: "Laptops", icon: "Laptop", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=500&auto=format&fit=crop" },
  { id: "audio", name: "Audio", icon: "Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop" },
  { id: "wearables", name: "Wearables", icon: "Watch", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=500&auto=format&fit=crop" }
];
