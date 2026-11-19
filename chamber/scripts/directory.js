// MOBILE NAVIGATION

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.textContent = isOpen ? "✕" : "☰";
    });
}


// FOOTER COPYRIGHT YEAR

const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// LAST MODIFIED DATE

const lastModified = document.querySelector("#last-modified");

if (lastModified) {
    lastModified.textContent = document.lastModified;
}


// BUSINESS MEMBERS

const membersContainer = document.querySelector("#members-container");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load business information.");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error("Error loading members:", error);

        membersContainer.innerHTML =
            "<p>Sorry, business members could not be loaded. Please try again.</p>";
    }
}


// DISPLAY BUSINESS MEMBERS

function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        let membershipName;

        if (member.membership === 3) {
            membershipName = "Gold Member";
        } else if (member.membership === 2) {
            membershipName = "Silver Member";
        } else {
            membershipName = "Member";
        }

        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name}" loading="lazy">

            <div class="member-info">
                <h3>${member.name}</h3>

                <p><strong>Category:</strong> ${member.category}</p>

                <p>${member.description}</p>

                <p><strong>Address:</strong> ${member.address}</p>

                <p><strong>Phone:</strong> ${member.phone}</p>

                <p><strong>Membership:</strong> ${membershipName}</p>

                <a href="${member.website}" target="_blank" rel="noopener noreferrer">
                    Visit Website
                </a>
            </div>
        `;

        membersContainer.appendChild(card);
    });
}


// GRID AND LIST VIEW

const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

if (gridButton && listButton) {

    gridButton.addEventListener("click", () => {

        membersContainer.classList.remove("members-list");
        membersContainer.classList.add("members-grid");

        gridButton.classList.add("active");
        listButton.classList.remove("active");

        gridButton.setAttribute("aria-pressed", "true");
        listButton.setAttribute("aria-pressed", "false");
    });


    listButton.addEventListener("click", () => {

        membersContainer.classList.remove("members-grid");
        membersContainer.classList.add("members-list");

        listButton.classList.add("active");
        gridButton.classList.remove("active");

        listButton.setAttribute("aria-pressed", "true");
        gridButton.setAttribute("aria-pressed", "false");
    });
}


// LOAD MEMBERS

if (membersContainer) {
    getMembers();
}