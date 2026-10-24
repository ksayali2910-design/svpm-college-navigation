"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const loginSection = document.getElementById("loginSection");
  const dashboard = document.getElementById("dashboard");
  const departmentInput = document.getElementById("department");
  const rollInput = document.getElementById("rollNumber");
  const loginMessage = document.getElementById("loginMessage");
  const logoutButton = document.getElementById("logoutButton");
  const searchInput = document.getElementById("searchInput");

  const books = [
    { id: 1, title: "Python Programming", author: "Reema Thareja", category: "Programming", icon: "🐍" },
    { id: 2, title: "Let Us C", author: "Yashavant Kanetkar", category: "Programming", icon: "💻" },
    { id: 3, title: "Data Structures", author: "Reema Thareja", category: "Computer Science", icon: "🧩" },
    { id: 4, title: "Database System Concepts", author: "Abraham Silberschatz", category: "Database", icon: "🗄️" },
    { id: 5, title: "Operating System Concepts", author: "Abraham Silberschatz", category: "Computer Science", icon: "⚙️" },
    { id: 6, title: "Computer Networks", author: "Andrew S. Tanenbaum", category: "Networking", icon: "🌐" },
    { id: 7, title: "Artificial Intelligence", author: "Stuart Russell", category: "AI & ML", icon: "🤖" },
    { id: 8, title: "Machine Learning", author: "Tom Mitchell", category: "AI & ML", icon: "🧠" },
    { id: 9, title: "Clean Code", author: "Robert C. Martin", category: "Software", icon: "📘" }
  ];

  let student = null;
  let borrowed = [];
  let returnedCount = 0;

  function loadStudentData() {
    if (!student) return;

    try {
      borrowed = JSON.parse(
        localStorage.getItem(storageKey("borrowed")) || "[]"
      );
      returnedCount = Number(
        localStorage.getItem(storageKey("returnedCount")) || 0
      );

      if (!Array.isArray(borrowed)) borrowed = [];
      if (!Number.isFinite(returnedCount)) returnedCount = 0;
    } catch (error) {
      borrowed = [];
      returnedCount = 0;
    }
  }

  function storageKey(name) {
    return "sbLibrary_" + student.department + "_" + student.roll + "_" + name;
  }

  function saveStudentData() {
    if (!student) return;

    localStorage.setItem(storageKey("borrowed"), JSON.stringify(borrowed));
    localStorage.setItem(storageKey("returnedCount"), String(returnedCount));
  }

  function showDashboard() {
    loginSection.hidden = true;
    dashboard.hidden = false;

    document.getElementById("welcomeTitle").textContent =
      "Welcome to SB Patil Library!";

    document.getElementById("studentInfo").textContent =
      "Department: " + student.department +
      "  |  Roll Number: " + student.roll;

    searchInput.value = "";
    renderBooks();
    renderBorrowed();
    updateStats();
  }

  function showLogin() {
    student = null;
    borrowed = [];
    returnedCount = 0;

    dashboard.hidden = true;
    loginSection.hidden = false;
    loginMessage.textContent = "";
    loginForm.reset();
  }

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    loginMessage.textContent = "";

    const department = departmentInput.value;
    const rollText = rollInput.value.trim();
    const roll = Number(rollText);

    if (!department) {
      loginMessage.textContent = "Please select your department.";
      departmentInput.focus();
      return;
    }

    if (
      rollText === "" ||
      !Number.isInteger(roll) ||
      roll < 1 ||
      roll > 100
    ) {
      loginMessage.textContent =
        "Please enter a valid roll number from 1 to 100.";
      rollInput.focus();
      return;
    }

    student = { department: department, roll: roll };

    localStorage.setItem("sbLibraryDept", department);
    localStorage.setItem("sbLibraryRoll", String(roll));

    loadStudentData();
    showDashboard();
  });

  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("sbLibraryDept");
    localStorage.removeItem("sbLibraryRoll");
    showLogin();
  });

  searchInput.addEventListener("input", renderBooks);

  function renderBooks() {
    const bookGrid = document.getElementById("bookGrid");
    const emptyMessage = document.getElementById("emptyMessage");
    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredBooks = books.filter(function (book) {
      return (
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
      );
    });

    bookGrid.replaceChildren();
    emptyMessage.hidden = filteredBooks.length !== 0;

    filteredBooks.forEach(function (book) {
      const alreadyBorrowed = borrowed.some(function (item) {
        return item.id === book.id;
      });

      const card = document.createElement("article");
      card.className = "book-card";

      const cover = document.createElement("div");
      cover.className = "book-cover";
      cover.textContent = book.icon;

      const title = document.createElement("h3");
      title.textContent = book.title;

      const author = document.createElement("p");
      author.className = "author";
      author.textContent = "By " + book.author;

      const category = document.createElement("p");
      category.className = "category";
      category.textContent = book.category;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "small-btn";
      button.textContent = alreadyBorrowed ? "Already Borrowed" : "Borrow Book";
      button.disabled = alreadyBorrowed;
      button.addEventListener("click", function () {
        borrowBook(book.id);
      });

      card.append(cover, title, author, category, button);
      bookGrid.appendChild(card);
    });
  }

  function borrowBook(bookId) {
    const book = books.find(function (item) {
      return item.id === bookId;
    });

    if (!book || borrowed.some(function (item) {
      return item.id === bookId;
    })) {
      return;
    }

    borrowed.push({
      id: book.id,
      title: book.title,
      borrowedOn: new Date().toLocaleDateString()
    });

    saveStudentData();
    renderBooks();
    renderBorrowed();
    updateStats();
  }

  function renderBorrowed() {
    const list = document.getElementById("borrowedList");
    const empty = document.getElementById("noBorrowedMessage");

    list.replaceChildren();
    empty.hidden = borrowed.length !== 0;

    borrowed.forEach(function (item) {
      const row = document.createElement("div");
      row.className = "borrowed-item";

      const details = document.createElement("div");
      const title = document.createElement("h3");
      title.textContent = item.title;

      const date = document.createElement("p");
      date.textContent = "Borrowed on: " + item.borrowedOn;

      details.append(title, date);

      const button = document.createElement("button");
      button.type = "button";
      button.className = "small-btn return-btn";
      button.textContent = "Return Book";

      button.addEventListener("click", function () {
        returnBook(item.id);
      });

      row.append(details, button);
      list.appendChild(row);
    });
  }

  function returnBook(bookId) {
    const index = borrowed.findIndex(function (item) {
      return item.id === bookId;
    });

    if (index === -1) return;

    borrowed.splice(index, 1);
    returnedCount += 1;

    saveStudentData();
    renderBooks();
    renderBorrowed();
    updateStats();
  }

  function updateStats() {
    document.getElementById("catalogueCount").textContent = books.length;
    document.getElementById("borrowedCount").textContent = borrowed.length;
    document.getElementById("returnedCount").textContent = returnedCount;
  }

  // Restore the last demo student if the page is refreshed.
  const savedDepartment = localStorage.getItem("sbLibraryDept");
  const savedRoll = localStorage.getItem("sbLibraryRoll");

  if (
    savedDepartment &&
    savedRoll &&
    Number.isInteger(Number(savedRoll)) &&
    Number(savedRoll) >= 1 &&
    Number(savedRoll) <= 100
  ) {
    student = {
      department: savedDepartment,
      roll: Number(savedRoll)
    };

    loadStudentData();
    showDashboard();
  } else {
    showLogin();
  }
});