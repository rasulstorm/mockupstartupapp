document.addEventListener("DOMContentLoaded", function () {
    const sizeSelector = document.getElementById("size");
    const durationSelector = document.getElementById("duration");
    const totalCostDisplay = document.getElementById("total-cost");
    const checkAvailability = document.getElementById("check-availability");
    const availabilityStatus = document.getElementById("availability-status");
    const storageVisual = document.getElementById("storage-visual");

    const basePricePerCubicMeterPerDay = 0.5; // Base price per m³ per day

    // Function to calculate total cost dynamically
    function calculateTotalCost() {
        const size = parseFloat(sizeSelector.value);
        const durationText = durationSelector.value;

        let days = 7; // Default to 7 days
        let discountFactor = 1.0; // No discount by default

        // Determine duration in days and apply discount
        if (durationText.includes("month")) days = parseInt(durationText) * 30;
        if (durationText.includes("year")) days = parseInt(durationText) * 365;

        if (durationText.includes("3 months")) discountFactor = 0.95; // 5% discount
        if (durationText.includes("6 months")) discountFactor = 0.90; // 10% discount
        if (durationText.includes("1 year")) discountFactor = 0.85;  // 15% discount
        if (durationText.includes("2 years")) discountFactor = 0.80; // 20% discount
        if (durationText.includes("3 years")) discountFactor = 0.75; // 25% discount

        const cost = basePricePerCubicMeterPerDay * size * days * discountFactor;
        totalCostDisplay.textContent = `Total Cost: $${cost.toFixed(2)}`;
    }

    // Function to update storage visual dynamically
    function updateStorageVisual() {
        const size = parseInt(sizeSelector.value);
        storageVisual.style.width = `${size / 5}px`;
        storageVisual.style.height = `${size / 5}px`;
    }

    // Function to simulate availability check
    function checkStorageAvailability() {
        const size = sizeSelector.value;
        const location = document.getElementById("location").value;

        if (!size || !location) {
            availabilityStatus.textContent = "Please select size and location!";
            return;
        }

        // Simulate an API call with a short delay
        setTimeout(() => {
            availabilityStatus.textContent = "Storage is available!";
        }, 1000);
    }

    // Event listeners for dynamic updates
    sizeSelector.addEventListener("change", () => {
        calculateTotalCost();
        updateStorageVisual();
    });

    durationSelector.addEventListener("change", calculateTotalCost);
    checkAvailability.addEventListener("click", checkStorageAvailability);
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("reservation-form");
    const spinWheel = document.getElementById("spin-wheel");
    const spinResult = document.getElementById("spin-result");
    const qrCodeContainer = document.getElementById("qrcode");

    // Function to generate a QR Code
    function generateQRCode(details) {
        QRCode.toCanvas(qrCodeContainer, details, { width: 200 }, function (error) {
            if (error) console.error("QR Code generation error:", error);
        });
    }

    // Function for spin-the-wheel discount
    function spinForDiscount() {
        const discounts = [5, 10, 15, 20, 25]; // Discount percentages
        const randomDiscount = discounts[Math.floor(Math.random() * discounts.length)];
        spinResult.textContent = `Congratulations! You got a ${randomDiscount}% discount!`;
    }

    // Function to handle form submission
    function handleFormSubmission(event) {
        event.preventDefault(); // Prevent default form submission

        const location = document.getElementById("location").value;
        const size = document.getElementById("size").value;
        const duration = document.getElementById("duration").value;

        // Generate QR code with reservation details
        const reservationDetails = `Location: ${location}, Size: ${size}m³, Duration: ${duration}`;
        generateQRCode(reservationDetails);

    }

    // Event listener for spin-the-wheel
    spinWheel.addEventListener("click", spinForDiscount);

    // Event listener for form submission
    form.addEventListener("submit", handleFormSubmission);
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("reservation-form");
    const confirmationModal = document.getElementById("confirmation-modal");
    const closeModal = document.getElementById("close-modal");

    // Function to handle form submission
    function handleFormSubmission(event) {
        event.preventDefault(); // Prevent default form submission

        const location = document.getElementById("location").value;
        const size = document.getElementById("size").value;
        const duration = document.getElementById("duration").value;

        // Generate QR code with reservation details
        const reservationDetails = `Location: ${location}, Size: ${size}m³, Duration: ${duration}`;
        QRCode.toCanvas(document.getElementById("qrcode"), reservationDetails, { width: 200 });

        // Show the confirmation modal
        confirmationModal.style.display = "flex";
    }

    // Close modal when clicking the close button
    closeModal.addEventListener("click", function () {
        confirmationModal.style.display = "none";
    });

    // Event listener for form submission
    form.addEventListener("submit", handleFormSubmission);
});

document.addEventListener("DOMContentLoaded", function () {
    const spinButton = document.getElementById("spin-wheel");
    const wheelModal = document.getElementById("wheel-modal");
    const wheelContainer = document.querySelector(".wheel-container");

    const prizes = [5, 10, 50, 100, 200, 500]; // Prize values
    const sectorAngle = 360 / prizes.length;

    let isSpinning = false; // Prevent multiple spins

    // Function to spin the wheel
    function spinWheel() {
        if (isSpinning) return; // Prevent multiple clicks
        isSpinning = true;

        // Show the modal
        wheelModal.style.display = "flex";

        // Randomly select a prize
        const randomIndex = Math.floor(Math.random() * prizes.length);
        const stopAngle = 3600 + randomIndex * sectorAngle; // Rotate 10 full circles + stop at sector

        // Spin the wheel
        wheelContainer.style.transition = "transform 4s cubic-bezier(0.25, 1, 0.5, 1)";
        wheelContainer.style.transform = `rotate(${stopAngle}deg)`;

        // Show result after spinning
        setTimeout(() => {
            isSpinning = false; // Allow spinning again
            wheelContainer.style.transition = ""; // Reset transition
            wheelContainer.style.transform = `rotate(${randomIndex * sectorAngle}deg)`; // Align to sector

            // Show the result
            alert(`Congratulations! You won ${prizes[randomIndex]}% discount!`);

            // Hide the modal
            wheelModal.style.display = "none";
        }, 4000); // Match the transition duration
    }

    // Add event listener to the spin button
    spinButton.addEventListener("click", spinWheel);
});
