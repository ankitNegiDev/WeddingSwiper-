# Wedding Invitation Card Editor

A **customizable wedding card editor** built with **HTML, CSS, and JavaScript**.  
This project allows users to create personalized wedding invitation cards by dragging, editing, resizing, and styling text over template slides.

---

**Live Demo**: [Wedding Card Editor](https://wedding-swiper.vercel.app)

## Features

* **Swiper.js Integration** – Navigate through multiple card templates.

* **Editable Text Boxes**  
  * Single-click to **select**  
  * Double-click to **edit**  
  * `Esc` or clicking outside ends editing  

* **Styling Toolbar**  
  * Change **font family**  
  * Change **font color**  
  * Change **font size**  

* **Draggable & Resizable** text boxes with smooth pointer-based interaction.

* **Add New Text** dynamically to the active slide.
* **Multiple Slides** with different background templates.
* **Drag Boundaries** – Text stays inside its parent card.

---

## Tech Stack

* **HTML5** – Structure of the app  
* **CSS3** – Styling and layout  
* **JavaScript (ES6)** – Core logic (drag, edit, resize, styling)  
* **Swiper.js** – For slide navigation  

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/ankitNegiDev/WeddingSwiper-
cd WeddingSwiper-
```

### 2. Open the project

Just open the `index.html` file in your browser. No build setup required.

---

## Project Structure

``` planetext
wedding-card-editor/
│── index.html        # Main HTML file with Swiper & toolbar
│── style.css         # CSS styles (text-box, resize-handle, toolbar, etc.)
│── script.js         # Main JavaScript logic
│── images/           # (Optional) background images for slides
└── README.md         # Documentation
└── Notes/            # for detailed documentation and about project.
```

---

## ⚙️ How It Works

1. Select a template card (Swiper navigation).
2. Click **"Add Text"** to insert a new text box.
3. **Drag** the text box anywhere inside the card.
4. **Resize** text using the bottom-right resize handle.
5. **Style** text with the toolbar (font, color, size).

---

## Demo Screenshot

* ![wedding](/images/wedding.png)
* ![wedding2](/images/wedding%202.png)

---

## Future Improvements

* **Save / Export** final design as image or PDF.  
* **Responsive Design** for mobile editing.  
* **Upload Custom Backgrounds**.  
* More **font styles** & custom font support.  
* Advanced **color picker** for gradients.  

---

## License

This project is open-source and available under the **MIT License**.
