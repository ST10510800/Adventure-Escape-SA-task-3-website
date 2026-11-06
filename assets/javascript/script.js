const activitiesData = [
    { id: "ziplining", name: "Ziplining Adventure", basePrice: 750 },
    { id: "rock-climbing", name: "Rock Climbing Session", basePrice: 750 },
    { id: "mountain", name: "Mountain Adventure Package", basePrice: 1500 },
    { id: "family-explorer", name: "Family Explorer Package", basePrice: 1500 },
    { id: "kayaking", name: "Kayaking Experience", basePrice: 750 },
    { id: "corporate", name: "Corporate Team Challenge", basePrice: 1500 },
    { id: "ultimate", name: "Ultimate Adventure Day", basePrice: 1500 }
];

document.addEventListener("DOMContentLoaded", () => {

    const calcForm = document.getElementById("feeCalculatorForm");
    if (calcForm) {
        calcForm.addEventListener("submit", function(e) {
            e.preventDefault();
            clearErrors();

            let isValid = true;
            const activitySelect = document.getElementById("activity");
            const adultsInput = document.getElementById("adults");
            const childrenInput = document.getElementById("children");
            const dateInput = document.getElementById("date");

            if (activitySelect.value === "") {
                showError(activitySelect, "Error: Please select an activity from the drop-down menu.");
                isValid = false;
            }

            const adults = parseInt(adultsInput.value) || 0;
            const children = parseInt(childrenInput.value) || 0;

            if (adults < 0 || children < 0 || (adults === 0 && children === 0)) {
                showError(adultsInput, "Error: You must enter at least 1 participant.");
                isValid = false;
            }

            if (!dateInput.value) {
                showError(dateInput, "Error: Please select a valid preferred date.");
                isValid = false;
            }

            if (!isValid) return;
t
            const selectedAct = activitiesData.find(a => a.id === activitySelect.value);
            const adultPrice = selectedAct.basePrice;
            const childPrice = selectedAct.basePrice * 0.5; // 50% discount for children

            const adultTotal = adults * adultPrice;
            const childTotal = children * childPrice;

            let addOnsTotal = 0;
            let addOnDetails = [];
            const checkboxes = document.querySelectorAll('input[name="addons"]:checked');
            checkboxes.forEach(cb => {
                const val = parseInt(cb.value);
                addOnsTotal += val;
                addOnDetails.push({ name: cb.dataset.name, price: val });
            });

            const subtotal = adultTotal + childTotal + addOnsTotal;

            let discount = 0;
            const totalParticipants = adults + children;
            if (totalParticipants > 3) {
                discount = subtotal * 0.10;
            }

            const finalTotal = subtotal - discount;

            const tableContainer = document.getElementById("breakdownResult");
            let tableHTML = `
                <h3>Estimated Cost Breakdown</h3>
                <table class="breakdown-table">
                    <tr><th>Item Description</th><th>Qty / Details</th><th>Cost (ZAR)</th></tr>
                    ${adults > 0 ? `<tr><td>${selectedAct.name} (Adults)</td><td>x${adults} @ R${adultPrice}</td><td>R${adultTotal.toLocaleString()}</td></tr>` : ''}
                    ${children > 0 ? `<tr><td>${selectedAct.name} (Children)</td><td>x${children} @ R${childPrice}</td><td>R${childTotal.toLocaleString()}</td></tr>` : ''}
            `;

            addOnDetails.forEach(addon => {
                tableHTML += `<tr><td>Add-on: ${addon.name}</td><td>1</td><td>R${addon.price.toLocaleString()}</td></tr>`;
            });

            if (discount > 0) {
                tableHTML += `<tr><td colspan="2"><strong>Group Discount (10% off for 4+ people)</strong></td><td>-R${discount.toLocaleString()}</td></tr>`;
            }

            tableHTML += `
                    <tr><td colspan="2"><strong>Total Estimated Fee</strong></td><td><strong>R${finalTotal.toLocaleString()}</strong></td></tr>
                </table>
            `;
            tableContainer.innerHTML = tableHTML;
        });
    }

    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            clearErrors();

            let isValid = true;
            const name = document.getElementById("fullname");
            const email = document.getElementById("email");
            const phone = document.getElementById("phone");

            if (!name.value.trim()) {
                showError(name, "Error: Full name is required.");
                isValid = false;
            }
            if (!email.value.trim() || !email.value.includes("@")) {
                showError(email, "Error: Please enter a valid email address.");
                isValid = false;
            }
            if (!phone.value.trim()) {
                showError(phone, "Error: Phone number is required.");
                isValid = false;
            }

            if (isValid) {
                alert("Success! Your message has been sent.");
                contactForm.reset();
            }
        });
    }
});

function showError(inputElement, message) {
    const errorSpan = document.createElement("span");
    errorSpan.className = "error-text";
    errorSpan.innerText = message;
    inputElement.parentNode.appendChild(errorSpan);
}

function clearErrors() {
    const errors = document.querySelectorAll(".error-text");
    errors.forEach(err => err.remove());
}