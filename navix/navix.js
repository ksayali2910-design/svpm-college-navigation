"use strict";

(function () {
  function initNaviX() {
    const $ = (id) => document.getElementById(id);
    const panel = $("navix-panel"), launcher = $("navix-launcher");
    const close = $("navix-close"), form = $("navix-form");
    const input = $("navix-input"), messages = $("navix-messages");
    const mic = $("navix-mic"), voiceStatus = $("navix-voice-status");
    if (!panel || !launcher || !form || !input || !messages) {
      console.error("NAVI-X: chatbot interface could not initialize.");
      return;
    }

    let language = "en";
    const api = () => window.SVPMNavigation;
    const copy = {
      en: {
        greeting: "Hi! I’m NAVI-X. Your Next-Gen AI Intelligent Campus Navigation Assistant. Ask me about campus locations or Diploma Building indoor navigation.",
        choose: "Please select a campus destination first, or choose one below.",
        locations: "These are the 13 campus destinations available in this project. Select one to view details, open Maps or get directions.",
        selected: "Selected",
        details: "I have opened the location details on the main page.",
        maps: "Opening Google Maps for",
        directions: "Opening Google Maps directions to",
        diploma: "Diploma Building indoor navigation is available in V2. Open it, choose your floor, select your current room and destination room, then press Get Directions and Start Navigation. Use Next Checkpoint as you walk. Wrong Direction / Re-route is a manual demonstration control.",
        help: "I can help with the 13 listed campus locations, show details, open Google Maps, get directions, and guide you to Diploma Building V2. Try asking: “Where is the Canteen?” or “Open Diploma navigation.”",
        notFound: "I could not match that place to the 13 destinations in this project. Please choose a location from the dropdown.",
        ready: "What would you like to find on campus?",
        voiceUnsupported: "Voice input is not supported in this browser. Please type your message.",
        voiceListening: "Listening… speak now.",
        voiceDenied: "Microphone permission was denied or voice recognition failed. Check browser permissions, then try again."
      },
      mr: {
        greeting: "नमस्कार! मी NAVI-X आहे. तुमचा Next-Gen AI Intelligent Campus Navigation Assistant. कॉलेजमधील ठिकाणे किंवा Diploma Building indoor navigation बद्दल मला विचारा.",
        choose: "कृपया आधी कॉलेजमधील ठिकाण निवडा किंवा खालील पर्याय वापरा.",
        locations: "या प्रोजेक्टमध्ये कॉलेजची 13 ठिकाणे उपलब्ध आहेत. एखादे ठिकाण निवडून माहिती, Google Maps किंवा Directions वापरा.",
        selected: "निवडलेले ठिकाण",
        details: "मुख्य पेजवर त्या ठिकाणाची माहिती उघडली आहे.",
        maps: "Google Maps उघडत आहे:",
        directions: "Google Maps Directions उघडत आहे:",
        diploma: "Diploma Building चे indoor navigation V2 मध्ये उपलब्ध आहे. ते उघडा, Floor निवडा, Starting Room आणि Destination Room निवडा. नंतर Get Directions आणि Start Navigation दाबा. चालताना Next Checkpoint वापरा. Wrong Direction / Re-route हा manual demonstration पर्याय आहे.",
        help: "मी 13 campus locations, Show Details, Google Maps, Directions आणि Diploma Building V2 साठी मदत करू शकतो. उदाहरण: “Canteen कुठे आहे?” किंवा “Diploma navigation उघड.”",
        notFound: "या प्रोजेक्टमधील 13 ठिकाणांमध्ये हे नाव सापडले नाही. कृपया dropdown मधून ठिकाण निवडा.",
        ready: "कॉलेजमध्ये तुम्हाला काय शोधायचे आहे?",
        voiceUnsupported: "या browser मध्ये voice input उपलब्ध नाही. कृपया message टाइप करा.",
        voiceListening: "ऐकत आहे… आता बोला.",
        voiceDenied: "Microphone permission मिळाली नाही किंवा voice recognition अयशस्वी झाले. Browser permissions तपासून पुन्हा प्रयत्न करा."
      }
    };

    function addMessage(text, who, actions) {
      const item = document.createElement("div");
      item.className = "navix-message " + (who === "user" ? "user" : "bot");
      const tag = document.createElement("span");
      tag.className = "navix-message-tag";
      tag.textContent = who === "user" ? (language === "mr" ? "तुम्ही" : "YOU") : "NAVI-X";
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      item.append(tag, paragraph);
      (actions || []).forEach((action) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = action.label;
        button.addEventListener("click", action.run);
        item.appendChild(button);
      });
      messages.appendChild(item);
      messages.scrollTop = messages.scrollHeight;
    }

    function showLocationButtons() {
      const list = Object.keys((api() && api().locations) || {});
      if (!list.length) {
        addMessage(language === "mr" ? "ठिकाणांची माहिती उपलब्ध नाही." : "Campus location data is not available yet.", "bot");
        return;
      }
      const actions = list.map((name) => ({
        label: name,
        run: () => selectPlace(name)
      }));
      addMessage(copy[language].locations, "bot", actions);
    }

    function selectPlace(name) {
      const nav = api();
      if (!nav || !nav.selectLocation(name)) {
        addMessage(copy[language].notFound, "bot");
        return;
      }
      addMessage((language === "mr" ? "निवडलेले ठिकाण: " : "Selected: ") + name, "user");
      const place = nav.getSelectedLocation();
      const actions = [
        { label: language === "mr" ? "माहिती दाखवा" : "Show details", run: () => { nav.showDetails(); addMessage(copy[language].details, "bot"); } },
        { label: "Google Maps", run: () => { nav.openMaps(); addMessage(copy[language].maps + " " + name, "bot"); } },
        { label: language === "mr" ? "दिशा मिळवा" : "Get directions", run: () => { nav.getDirections(); addMessage(copy[language].directions + " " + name, "bot"); } }
      ];
      addMessage((language === "mr" ? "ठिकाणाची माहिती: " : "Location details: ") +
        (place ? place.description + " Plus Code: " + place.gps : name), "bot", actions);
    }

    function openDiploma() {
      addMessage(copy[language].diploma, "bot", [{
        label: language === "mr" ? "Diploma Navigation उघडा" : "Open Diploma Navigation",
        run: () => { window.location.href = "./v2/SVPM_V2_Reference_As_Is/index.html"; }
      }]);
    }

    function normalize(value) {
      return value.toLowerCase().replace(/[.,!?'"`]/g, " ").replace(/\s+/g, " ").trim();
    }

    function respond(raw) {
      const text = normalize(raw);
      const nav = api();
      if (!text) return;

      if (/diploma|indoor|room|floor|checkpoint|reroute|re.route|wrong direction|डिप्लोमा|रूम|खोली|मजला|दिशा चुक|री.?रूट/.test(text)) {
        openDiploma(); return;
      }
      if (/help|काय करू|मदत|सहाय्य/.test(text)) {
        addMessage(copy[language].help, "bot"); return;
      }
      if (/all locations|campus locations|list locations|college locations|ठिकाणे|सर्व ठिकाण|लोकेशन/.test(text)) {
        showLocationButtons(); return;
      }

      const known = Object.keys((nav && nav.locations) || {});
      const matched = known.find((name) => {
        const key = normalize(name);
        return text.includes(key) || (key === "play ground" && text.includes("playground"));
      });
      if (matched) {
        const wantsDetails = /detail|information|info|माहिती|दाखव/.test(text);
        const wantsMap = /map|google|नकाशा/.test(text);
        const wantsDirections = /direction|route|way|कसे जाऊ|कसा जाऊ|दिशा|रस्ता/.test(text);
        if (nav && nav.selectLocation(matched)) {
          if (wantsDetails) nav.showDetails();
          if (wantsMap) nav.openMaps();
          else if (wantsDirections) nav.getDirections();
          const place = nav.getSelectedLocation();
          let response = (language === "mr" ? "ठिकाण: " : "Place: ") + matched + ". " + (place ? place.description + " Plus Code: " + place.gps : "");
          if (wantsDetails) response += " " + copy[language].details;
          if (wantsMap) response += " " + copy[language].maps + " " + matched + ".";
          else if (wantsDirections) response += " " + copy[language].directions + " " + matched + ".";
          addMessage(response, "bot");
          return;
        }
      }

      if (/map|google maps|नकाशा/.test(text)) {
        if (nav && nav.getSelectedLocation()) {
          nav.openMaps();
          addMessage(copy[language].maps + " " + nav.getSelectedLocation().name, "bot");
        } else addMessage(copy[language].choose, "bot", [{ label: language === "mr" ? "ठिकाणे निवडा" : "Choose campus location", run: showLocationButtons }]);
        return;
      }
      if (/direction|route|way|दिशा|रस्ता|कसे जाऊ/.test(text)) {
        if (nav && nav.getSelectedLocation()) {
          nav.getDirections();
          addMessage(copy[language].directions + " " + nav.getSelectedLocation().name, "bot");
        } else addMessage(copy[language].choose, "bot", [{ label: language === "mr" ? "ठिकाणे निवडा" : "Choose campus location", run: showLocationButtons }]);
        return;
      }
      if (/hi|hello|hey|नमस्कार|हॅलो|हाय/.test(text)) {
        addMessage(copy[language].ready, "bot"); return;
      }
      addMessage(copy[language].notFound + " " + copy[language].help, "bot", [
        { label: language === "mr" ? "Campus locations" : "Campus locations", run: showLocationButtons },
        { label: language === "mr" ? "Diploma Navigation" : "Diploma Navigation", run: openDiploma }
      ]);
    }

    function setOpen(open) {
      panel.classList.toggle("is-open", open);
      panel.setAttribute("aria-hidden", String(!open));
      launcher.setAttribute("aria-expanded", String(open));
      if (open) input.focus();
      else launcher.focus();
    }

    launcher.addEventListener("click", () => setOpen(!panel.classList.contains("is-open")));
    close.addEventListener("click", () => setOpen(false));
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = input.value.trim();
      if (!value) return;
      addMessage(value, "user");
      input.value = "";
      respond(value);
    });

    document.querySelectorAll("[data-navix-lang]").forEach((button) => {
      button.addEventListener("click", () => {
        language = button.getAttribute("data-navix-lang") === "mr" ? "mr" : "en";
        document.querySelectorAll("[data-navix-lang]").forEach((b) => {
          const active = b === button;
          b.classList.toggle("active", active);
          b.setAttribute("aria-pressed", String(active));
        });
        input.placeholder = language === "mr" ? "तुमचा प्रश्न टाइप करा..." : "Type your question...";
        voiceStatus.textContent = language === "mr" ? "Voice input साठी browser permission आवश्यक आहे." : "Voice input depends on browser support and microphone permission.";
      });
    });

    document.querySelectorAll("[data-navix-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.getAttribute("data-navix-action");
        if (action === "locations") showLocationButtons();
        else if (action === "diploma") openDiploma();
        else addMessage(copy[language].help, "bot");
      });
    });

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      mic.addEventListener("click", () => {
        voiceStatus.textContent = copy[language].voiceUnsupported;
        voiceStatus.classList.add("error");
      });
    } else {
      const recognition = new SpeechRecognition();
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;
      mic.addEventListener("click", () => {
        recognition.lang = language === "mr" ? "mr-IN" : "en-IN";
        voiceStatus.textContent = copy[language].voiceListening;
        voiceStatus.classList.remove("error");
        try { recognition.start(); } catch (error) { voiceStatus.textContent = copy[language].voiceDenied; voiceStatus.classList.add("error"); }
      });
      recognition.onresult = (event) => {
        const spoken = event.results[0][0].transcript;
        input.value = spoken;
        voiceStatus.textContent = (language === "mr" ? "ऐकले: " : "Heard: ") + spoken;
        form.requestSubmit();
      };
      recognition.onerror = () => {
        voiceStatus.textContent = copy[language].voiceDenied;
        voiceStatus.classList.add("error");
      };
      recognition.onend = () => {
        if (!voiceStatus.classList.contains("error")) voiceStatus.textContent = language === "mr" ? "Voice input पूर्ण." : "Voice input finished.";
      };
    }

    console.info("NAVI-X chatbot initialized.");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initNaviX, { once: true });
  else initNaviX();
})();
