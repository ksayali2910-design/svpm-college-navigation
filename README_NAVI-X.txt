SVPM COLLEGE NAVIGATION SYSTEM — FINAL PACKAGE
================================================

PROJECT
- V1: Main SVPM campus navigation website
- NAVI-X: Bilingual campus assistant (English + Marathi)
- V2: Diploma Building 3D + 2D indoor navigation (original files preserved)

REQUIREMENTS
- Windows laptop
- Python 3 installed (recommended) OR another local static web server
- Internet connection for V2 Three.js CDN imports and Google Maps
- A modern browser (Chrome or Edge recommended)

RUN THE PROJECT (WINDOWS)
1. Extract the complete ZIP into a new folder, for example:
   Desktop\NAVI-X
2. Open the extracted folder.
3. Double-click RUN_LOCAL_SERVER.bat.
4. A command window will open. Keep it open while using the website.
5. In Chrome or Edge, open:
   http://localhost:8000
6. Use the campus dropdown and the V1 buttons, or click the NAVI-X button at bottom-right.
7. To use Diploma Building V2, click "Diploma Building Navigation" or ask NAVI-X to open it.

RUN WITHOUT THE BAT FILE
Open Command Prompt in this folder and run:
   py -m http.server 8000
If "py" is not available, try:
   python -m http.server 8000
Then visit http://localhost:8000

NAVI-X FEATURES
- Floating open/close chatbot
- English and Marathi interface
- Text chat and quick actions
- Campus destination selection (13 locations)
- Location details, Google Maps and directions actions
- Diploma Building V2 navigation guidance
- Optional browser speech recognition microphone input

IMPORTANT NOTES / LIMITATIONS
- NAVI-X is a local rule-based assistant; it does not call an external AI API. It responds to supported campus-location and navigation keywords.
- Microphone input requires browser support for the Web Speech API and microphone permission. It may not work in every browser/device or when served from an insecure non-local origin.
- Google Maps requires internet access.
- V2 loads Three.js from a CDN and therefore requires internet access.
- V2 is a demonstration model with schematic geometry and a simplified corridor route, not a CAD-accurate surveyed indoor map.
- V2 checkpoint progress is user-confirmed; it does not automatically track the visitor's physical location. Wrong-direction/re-route is manually triggered.
- The original V2 HTML, README and BAT files are preserved unchanged.

TROUBLESHOOTING
- If port 8000 is already in use, close the other server or change the port in RUN_LOCAL_SERVER.bat and visit the matching localhost URL.
- If the page looks old, press Ctrl+F5 to hard-refresh.
- If the chatbot microphone does not work, use typing; check browser microphone permission.
- If V2's 3D model does not load, check internet access and reload the page.
