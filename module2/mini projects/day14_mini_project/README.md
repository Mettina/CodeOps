# Ethiopian Airlines Interface Rebuild
## Interface Rebuilt

Ethiopian Airlines flight booking and flight results interface.

This project recreates the general layout and structure of a real Ethiopian Airlines web interface using HTML and CSS. Placeholder content is used for the flight information.

## Technologies Used

- HTML5
- CSS3

## CSS Layout Techniques

### CSS Grid

CSS Grid is used for the main page skeleton:

- Header
- Sidebar / Filter Flights
- Main content
- Footer

The page skeleton uses "grid-template-areas".

CSS Grid is also used for the flight cards with:

css
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));