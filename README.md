# Better Electronics Website

This repository contains the source code for the Better Electronics website, a company specializing in laptop replacement batteries, US distribution, and OEM wholesale.

## Project Structure

```
better-electronics/
├── index.html          # Homepage
├── about.html          # About Us page
├── products.html       # Products page
├── sku.html            # SKU Search page
├── contact.html        # Contact page
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── script.js       # Main JavaScript file
├── data/
│   ├── sku-data.json   # SKU data in JSON format
│   └── sku-data.csv    # SKU data in CSV format
├── assets/
│   └── logo.svg        # Company logo
└── README.md           # Project documentation
```

## Features

- Responsive design that works on desktop, tablet, and mobile devices
- SKU search functionality with real-time results
- Product categorization by brand
- Contact form for inquiries
- Newsletter subscription
- Social media integration

## Technologies Used

- HTML5
- CSS3 (with Tailwind CSS)
- JavaScript (vanilla)
- Font Awesome icons

## Setup Instructions

1. Clone the repository
2. Open `index.html` in a web browser
3. The website will load with all functionality available

## Data Management

The SKU data is stored in `data/sku-data.json` and `data/sku-data.csv`. To update the product information:

1. Edit the `sku-data.json` file with new product information
2. Ensure the CSV file is also updated for consistency
3. The website will automatically load the updated data

## Notes

- All SKU data is loaded from the external JSON file
- A fallback mechanism is in place to load embedded data if the JSON file fails to load
- The website is optimized for performance and SEO
- All pages are responsive and mobile-friendly

## Contact Information

- Phone: +1 516 779 0746
- Email: info@batteryeasttech.com
- Contact Person: Kelvin Lim (Sales Manager, Exclusive Sales Representative)

## Deployment

This website is ready for deployment. The production-ready files are:

- index.html (Homepage)
- about.html (About Us)
- products.html (Products)
- sku.html (SKU Search)
- contact.html (Contact)
- css/style.css (Styles)
- js/script.js (JavaScript)
- data/sku-data.json (Product data)
- assets/logo.svg (Logo)

All test files, verification pages, and unnecessary documentation have been removed to ensure a clean production environment.
