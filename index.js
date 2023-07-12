"use-strict";

const mainCart = document.querySelector(".main_cart");
const avatarCart = document.querySelector(".avatar");
const repostAndLinks = document.querySelector(".repos_and_links");
const input = document.querySelector("input");
const btn = document.querySelector("button");
const switch_mode = document.querySelector(".switch-mode");
const lightModeText = document.querySelector(".light-mode");
const noResultMessage = document.querySelector(".no-result");
const switchModeImg = document.querySelector(".switchMode-img");
const GITHUB_URL = "https://api.github.com";

const getUser = async function () {
  try {
    const username = input.value;

    const gettingUser = await fetch(`${GITHUB_URL}/users/${username}`);

    if (!gettingUser.ok) {
      noResultMessage.style.display = "block";
      input.value = "";
      input.placeholder = "";
    } else {
      const userData = await gettingUser.json();

      document
        .querySelector(".title-section")
        .closest(".avatar")
        .classList.add("display-none");

      document
        .querySelector(".h-repos")
        .closest(".repos_and_links")
        .classList.add("display-none");

      renderUser(userData);
      input.value = "";
    }
  } catch (err) {
    throw err;
  }
};

const renderUser = function (user) {
  const datePretifier = function (userDate) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const str = userDate.created_at.substring(0, 10);

    const [year, month, day] = str.split("-");

    return `Joined ${day} ${monthNames[+month - 1]} ${year}`;
  };

  const html = `  
    <div class="avatar d_flex row_direction">
      <img src="${user.avatar_url}" alt="octoocat">
      <div>
        <div class="title-section d_flex row_direction ">       
            <div class="titles">
              <h1>${user.name}</h1>
              <a href="https://">@${user.login}</a>
            </div>
            <p class="joined font_15">${datePretifier(user)}</p>
        </div>
        <p class="profile-bio">${user.bio}</p>
        </div>
        </div> 
    <div class="repos_and_links d_flex">
    <div class="repos d_flex align_items row_direction">
      <div class="h-repos">
        <h2>Repos</h2>
        <h3>${user.public_repos}</h3>
      </div>

      <div class="followers">
        <h2>Followers</h2>
        <h3>${user.followers}</h3>
      </div>

      <div class="following">
        <h2>Following</h2>
        <h3>${user.following}</h3>
      </div>
    </div>

    <div class="links">
      <div class="location flex">
        <img src="/assets/icon-location.svg" alt="location-icon"> <p
          style="display: inline;" class="${
            user.location ? "" : "not-avalaible"
          } font_15">${user.location ? user.location : "Not avalaible"}</p>
      </div>

      <div class="twitter flex ">
        <img src="/assets/icon-twitter.svg" alt="twitter-icon"> <a
          class="${
            user.twitter_username ? "" : "not-avalaible"
          } font_15" href="${
    user.twitter_username ? user.twitter_username : "#"
  }" target="_blank">${
    user.twitter_username ? user.twitter_username : "Not avalaible"
  }</a>
      </div>
      <div class="website flex ">
        <img src="/assets/icon-website.svg" alt="website-icon"> <a
         class="font_15 ${user.blog ? "#" : "not-avalaible"}" href="${
    user.blog ? user.blog : ""
  }" target="_blank">${user.blog ? user.blog : "Not avalaible"}</a>
      </div>

      <div class="company flex ">
        <img src="/assets/icon-company.svg" alt="company-icon"> <a
         class="font_15" href="${user.html_url}" target="_blank">@${
    user.login
  }</a>
      </div>
    </div>
  </div>
    
    
    `;

  mainCart.insertAdjacentHTML("afterbegin", html);
  repostAndLinks.classList.add("display-none");
  noResultMessage.style.display = "none";
};

// Listen for enter keypress
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    btn.click();
  }
});

// Light/Dark Mode
switch_mode.addEventListener("click", () => {
  if (lightModeText.innerHTML === "DARK") {
    document.body.classList.add("dark");
    lightModeText.innerHTML = "LIGHT";
    input.style.boxShadow = "none";
    mainCart.style.boxShadow = "none";
    switchModeImg.src = "/assets/icon-sun.svg";
  } else {
    document.body.classList.remove("dark");
    lightModeText.innerHTML = "DARK";
    input.style.boxShadow = "0px 16px 30px -10px var(--light-shadow)";
    mainCart.style.boxShadow = "0px 16px 30px -10px var(--light-shadow)";
    switchModeImg.src = "/assets/icon-moon.svg";
  }
});
