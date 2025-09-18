// Dark Mode Toggle
const toggleBtn = document.querySelector(".toggle-theme");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = 
    document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Chart.js Attendance Chart
const ctx = document.getElementById("attendanceChart").getContext("2d");
new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Present", "Absent", "Late"],
    datasets: [{
      data: [75, 15, 10],
      backgroundColor: ["#7a2e2e", "#d7b89e", "#fcefdc"]
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: "bottom" } }
  }
});
