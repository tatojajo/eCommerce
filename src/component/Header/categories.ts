

export const categories = [
    "Mobile Phones",
    "Laptops",
    "Tablets",
    "Headphones",
    "Cameras",
    "Gaming Consoles",
    "Smartwatches",
    "Printers",
    "Speakers",
    "Monitors",
    "Computer Accessories",
    "Networking Devices",
    "Home Appliances",
    "Smart Home Devices",
    "Wearable Devices",
    "Virtual Reality",
    "Car Electronics",
    "Audio Equipment",
  ];
  
  export  const options:Categories[] = categories.map((category, index) => ({
    value: category,
    label: category,
  }));