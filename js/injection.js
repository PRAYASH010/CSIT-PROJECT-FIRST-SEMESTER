let container = document.querySelector(".container");
let base = "all"

const saved = localStorage.getItem('opportunities');
if (saved) {
    data = JSON.parse(saved);
}

function inject(filter) {

    let data2 = data.slice().sort((a, b) => (a.deadline || "").localeCompare(b.deadline || ""));

    data2.forEach(itm => {
        if (filter !== "filter") {
            if (filter !== "all")
                if (filter !== itm.category) return
        }

        console.log(filter)

        if (itm.title === '') return;

        let icon = "hand-pointer"
        let paymentClass = "freePayment"
        let action = "Apply";
        let actionSudo = "Deadline: "
        
        let paymentDisplay = itm.payment || itm.fee || "Free";
        if (paymentDisplay.toLowerCase() === "free") {
            paymentClass = "freePayment";
        } else {
            paymentClass = "paidPayment";
        }
        
        if (itm.category === "Event") {
            action = "Register";
            actionSudo = "by: ";
            icon = "pencil";
        }

        let div = document.createElement("div");
        div.innerHTML = `
            <span class="card-type type-${itm.category}">${itm.category}</span>
            <h3 class="card-title">${itm.title}</h3>
            <span class="card-organization">${itm.organization}</span>
            <p class="card-description">${itm.description}</p>
            <div class="card-meta">
                <div class="meta-item ${paymentClass}">
                    <span>${paymentDisplay}</span>
                </div>
                <div class="meta-item location">
                    <span><i class="fa-solid fa-location-arrow"></i> ${itm.location}</span>
                </div>
                ${itm.time ? `
                <div class="meta-item duration">
                    <span><i class="fa-solid fa-clock"></i> ${itm.time}</span>
                </div>
                ` : ''}
            </div>
            <div class="card-footer">
                <span class="deadline">${actionSudo}${itm.deadline}</span>
                <button class="apply-btn" data-category="${itm.category}" data-title="${itm.title.replace(/"/g, '&quot;')}">
                    <i class="fa-solid fa-${icon}"></i>
                    ${action}
                </button>
            </div>
        `;
        div.classList.add("card", itm.category.toLowerCase());
        container.appendChild(div);
    })
}