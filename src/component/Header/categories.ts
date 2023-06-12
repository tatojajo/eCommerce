

export const categories = [
    "Mobile",
    "Laptops",
    "Tablets",
    "Headphones",
    "Cameras",
    "Consoles",
    "Smartwatches",
    "Printers",
    "Speakers",
    "Monitors",
    "Computer_Accessories",
    "Wearable_Devices",
    "Virtual_Reality",
    "Car_Electronics",
    "Audio_Equipment",
  ];
  
  export  const options:Categories[] = categories.map((category, index) => ({
    value: category,
    label: category,
  }));