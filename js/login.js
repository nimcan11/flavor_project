//imports
import { Activenav } from "./global.js";
const Active_links = document.querySelectorAll("a.nav-link")
Activenav(Active_links);

const form = document.getElementById("loginForm");
const Lusers = localStorage.getItem("users");
const Users = JSON.parse(Lusers) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const email = formData.get("email").trim();
  const password = formData.get("password").trim();

  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Logging in...`;
  btn.disabled = true;

  if (!email || !password) {
    swal("Error", "Please fill all required inputs!", "error");
    resetButton();
    return;
  }

  const user = Users.find((u) => u.email === email);

  if (!user) {
    swal("Account not found!", "Please sign up for a new account.", "error");
    resetButton();
    return;
  }

  if (atob(user.password )!==  password) {
    swal("Wrong password!", "Please try again.", "error");
    resetButton();
    return;
  }

  swal("Login successful!", "Welcome back " + user.name, "success");

  localStorage.setItem("currentUser", JSON.stringify(user));

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);

  function resetButton() {
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 1000);
  }
});
