
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set current date
  const currentDate = new Date();
  document.getElementById('current-date').textContent = currentDate.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Navigation
  const navLinks = document.querySelectorAll('.main-nav a');
  const pages = document.querySelectorAll('.page');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the page ID from the data attribute
      const targetPageId = this.getAttribute('data-page');
      
      // Remove active class from all links and add to clicked link
      navLinks.forEach(navLink => {
        navLink.parentElement.classList.remove('active');
      });
      this.parentElement.classList.add('active');
      
      // Hide all pages and show the target page
      pages.forEach(page => {
        page.classList.remove('active');
      });
      document.getElementById(targetPageId).classList.add('active');
    });
  });
  
  // Settings navigation
  const settingsNavItems = document.querySelectorAll('.settings-nav li');
  const settingsSections = document.querySelectorAll('.settings-section');
  
  settingsNavItems.forEach(item => {
    item.addEventListener('click', function() {
      // Get the settings section ID from the data attribute
      const targetSectionId = this.getAttribute('data-settings') + '-settings';
      
      // Remove active class from all items and add to clicked item
      settingsNavItems.forEach(navItem => {
        navItem.classList.remove('active');
      });
      this.classList.add('active');
      
      // Hide all settings sections and show the target section
      settingsSections.forEach(section => {
        section.classList.remove('active');
      });
      document.getElementById(targetSectionId).classList.add('active');
    });
  });
  
  // Calendar functions
  generateCalendar(currentDate);
  
  // Prev/Next month buttons for calendar
  document.getElementById('prev-month').addEventListener('click', function() {
    const currentMonth = new Date(document.getElementById('current-month').textContent);
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    generateCalendar(currentMonth);
  });
  
  document.getElementById('next-month').addEventListener('click', function() {
    const currentMonth = new Date(document.getElementById('current-month').textContent);
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    generateCalendar(currentMonth);
  });
  
  // Profile form submit handler
  const profileForm = document.getElementById('profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Profile updated successfully!');
    });
  }
  
  // Global search functionality
  const globalSearch = document.getElementById('global-search');
  if (globalSearch) {
    globalSearch.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        alert(`Searching for: ${this.value}`);
        this.value = '';
      }
    });
  }
  
  // Patient search functionality
  const patientSearch = document.getElementById('patient-search');
  if (patientSearch) {
    patientSearch.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        alert(`Searching for patient: ${this.value}`);
      }
    });
  }
  
  // Notes search functionality
  const notesSearch = document.getElementById('notes-search');
  if (notesSearch) {
    notesSearch.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        alert(`Searching notes for: ${this.value}`);
      }
    });
  }
  
  // Calendar day click handler
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('calendar-day')) {
      const allDays = document.querySelectorAll('.calendar-day');
      allDays.forEach(day => {
        day.classList.remove('selected');
      });
      e.target.classList.add('selected');
      
      const selectedDate = new Date(e.target.getAttribute('data-date'));
      document.getElementById('selected-date').textContent = selectedDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  });
  
  // Initialize elements with simulated data
  initializePatientList();
});

// Function to generate the calendar
function generateCalendar(date) {
  const calendarGrid = document.getElementById('calendar-grid');
  if (!calendarGrid) return;
  
  // Clear existing calendar
  calendarGrid.innerHTML = '';
  
  // Set current month header
  document.getElementById('current-month').textContent = date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long'
  });
  
  // Get first day of month and number of days in month
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
  // Add day names header
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayNames.forEach(day => {
    const dayNameEl = document.createElement('div');
    dayNameEl.classList.add('calendar-day-name');
    dayNameEl.textContent = day;
    calendarGrid.appendChild(dayNameEl);
  });
  
  // Add empty cells for days before first day of month
  for (let i = 0; i < firstDay.getDay(); i++) {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('calendar-day', 'empty');
    calendarGrid.appendChild(emptyDay);
  }
  
  // Add days of the month
  const today = new Date();
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const day = document.createElement('div');
    day.classList.add('calendar-day');
    day.textContent = i;
    
    const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
    day.setAttribute('data-date', currentDate.toISOString());
    
    // Mark today
    if (today.getFullYear() === currentDate.getFullYear() && 
        today.getMonth() === currentDate.getMonth() && 
        today.getDate() === currentDate.getDate()) {
      day.classList.add('today');
    }
    
    // Simulate some days having appointments (random)
    if (Math.random() > 0.7) {
      day.classList.add('has-appointments');
    }
    
    calendarGrid.appendChild(day);
  }
}

// Function to initialize patient list with mock data
function initializePatientList() {
  // This function would normally fetch data from an API
  // For now, we'll just add some interactivity to existing elements
  
  const viewPatientButtons = document.querySelectorAll('.view-patient-btn');
  viewPatientButtons.forEach(button => {
    button.addEventListener('click', function() {
      const patientName = this.parentElement.querySelector('.patient-name').textContent;
      alert(`Viewing patient records for ${patientName}`);
      
      // Simulate navigation to patient details
      const navLinks = document.querySelectorAll('.main-nav a');
      navLinks.forEach(link => {
        if (link.getAttribute('data-page') === 'patients') {
          link.click();
        }
      });
    });
  });
  
  // Add interactivity to patient rows
  const patientRows = document.querySelectorAll('.patient-row');
  patientRows.forEach(row => {
    const viewBtn = row.querySelector('.view-btn');
    const scheduleBtn = row.querySelector('.schedule-btn');
    
    if (viewBtn) {
      viewBtn.addEventListener('click', function() {
        const patientName = row.querySelector('.patient-info h3').textContent;
        alert(`Viewing detailed records for ${patientName}`);
      });
    }
    
    if (scheduleBtn) {
      scheduleBtn.addEventListener('click', function() {
        const patientName = row.querySelector('.patient-info h3').textContent;
        alert(`Scheduling appointment for ${patientName}`);
        
        // Simulate navigation to appointments
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
          if (link.getAttribute('data-page') === 'appointments') {
            link.click();
          }
        });
      });
    }
  });
}
