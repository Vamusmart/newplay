/////// Cookie starts//////////

const cookieStorage = {
  getItem: (item) => {
    const cookies = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="))
      .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
    return cookies[item];
  },
  setItem: (item, value) => {
    document.cookie = `${item}=${value};`;
  },
};

const storageType = cookieStorage;
const consentPropertyName = "Playground - HelloCookie";
const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
const saveToStorage = () => storageType.setItem(consentPropertyName, true);

window.onload = () => {
  const acceptFn = (event) => {
    saveToStorage(storageType);
    consentPopup.classList.add("hidden");
  };
  const consentPopup = document.getElementById("consent-popup");
  const acceptBtn = document.getElementById("accept");
  acceptBtn.addEventListener("click", acceptFn);

  if (shouldShowPopup(storageType)) {
    setTimeout(() => {
      consentPopup.classList.remove("hidden");
    }, 2000);
  }
};

////// Cookie ends ///////

///// Navbar starts /////
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  // Funzione per aprire/chiudere menu
  const toggleNav = () => {
    nav.classList.toggle("nav-active");

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 1}s`;
      }
    });

    burger.classList.toggle("toggle");
  };

  // Click sul burger
  burger.addEventListener("click", toggleNav);

  // Click su ciascun link della navbar
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      // Chiudo il menu solo se è aperto
      if (nav.classList.contains("nav-active")) {
        toggleNav();
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", navSlide);



//scrolling Nav
const navbar = document.getElementById("navbar");

// OnScroll event handler
const onScroll = () => {
  // Get scroll value
  const scroll = document.documentElement.scrollTop;

  // If scroll value is more than 0 - add class
  if (scroll > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
};

// Use either onScroll or throttledOnScroll
window.addEventListener("scroll", onScroll);

///// navbar ends /////

///// Slider starts /////

let slideIndex = 1;
let timer = null;
showSlides(slideIndex);

const plusSlides = (n) => {
  clearTimeout(timer);
  showSlides((slideIndex += n));
};

const currentSlide = (n) => {
  clearTimeout(timer);
  showSlides((slideIndex = n));
};

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n == undefined) {
    n = ++slideIndex;
  }
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  timer = setTimeout(showSlides, 8000); /* 8 seconds */
}

///// slider ends /////

///// Contact us starts /////

// Group all fields into an object
const fields = {};

// Linking all the fields to our fields object
document.addEventListener("DOMContentLoaded", () => {
  fields.firstName = document.getElementById("firstName");
  fields.lastName = document.getElementById("lastName");
  fields.email = document.getElementById("email");
  fields.message = document.getElementById("message");
});

// Checking that the field is not empty
const isNotEmpty = (value) => {
  if (value == null || typeof value == "undefined") return false;
  return value.length > 0;
};

// Check if a string is an email
const isEmail = (email) => {
  let regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(String(email).toLowerCase());
};

// Field validation function

const error_message = document.getElementById("error_message");
const fieldValidation = (field, validationFunction) => {
  if (field == null) return false;

  let isFieldValid = validationFunction(field.value);
  if (!isFieldValid) {
    // field.className = 'placeholderRed';
    text = "Please Enter valid Email and Message";
    display_message.innerHTML = text;
  } else {
    field.className = "";
  }

  return isFieldValid;
};

// combine all the checks for email and message

const isValid = () => {
  let valid = true;

  valid &= fieldValidation(fields.email, isEmail);
  valid &= fieldValidation(fields.message, isNotEmpty);

  return valid;
};

// User class constructor
class User {
  constructor(firstName, lastName, email, message) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.message = message;
  }
}

//Sending the contact form data with JavaScript
const sendContact = () => {
  if (isValid()) {
    let usr = new User(email.value, message.value);

    // alert("Thanks for your message.")
    text = "Thanks for your message.";
    display_message.innerHTML = text;
    document.getElementById("email").style.display = "none";
    document.getElementById("message").style.display = "none";
  } else {
    // text("Fill your email and message fields, please")
    // field.className = 'placeholderRed';

    text = "Please Enter valid Email and Message";
    display_message.innerHTML = text;
    document.getElementById("email").style.borderColor = "red";
    document.getElementById("message").style.borderColor = "red";
  }
};

///// Contact us ends /////

///// Popup starts /////

document.getElementById("accept").addEventListener("click", function (event) {
  event.preventDefault(); // blocca il comportamento predefinito del link
  document.getElementById("consent-popup").classList.add("hidden"); // nasconde il popup
});
///// Popup ends /////