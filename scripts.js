
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set current date
  const currentDate = new Date();
  const dateElement = document.getElementById('current-date');
  if (dateElement) {
    dateElement.textContent = currentDate.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
  
  // Calendar functions
  generateCalendar(currentDate);
  
  // Prev/Next month buttons for calendar
  const prevMonthBtn = document.getElementById('prev-month');
  const nextMonthBtn = document.getElementById('next-month');
  
  if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', function() {
      const currentMonthEl = document.getElementById('current-month');
      if (currentMonthEl) {
        const currentMonth = new Date(currentMonthEl.textContent);
        currentMonth.setMonth(currentMonth.getMonth() - 1);
        generateCalendar(currentMonth);
      }
    });
  }
  
  if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', function() {
      const currentMonthEl = document.getElementById('current-month');
      if (currentMonthEl) {
        const currentMonth = new Date(currentMonthEl.textContent);
        currentMonth.setMonth(currentMonth.getMonth() + 1);
        generateCalendar(currentMonth);
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
  
  // Add interactivity to patient view buttons
  const viewButtons = document.querySelectorAll('.view-btn, .view-patient-btn');
  viewButtons.forEach(button => {
    button.addEventListener('click', function() {
      const patientName = this.closest('.patient-row, .patient-card').querySelector('.patient-name').textContent;
      alert(`Viewing records for ${patientName}`);
    });
  });
  
  // Add interactivity to schedule buttons
  const scheduleButtons = document.querySelectorAll('.schedule-btn');
  scheduleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const patientName = this.closest('.patient-row').querySelector('.patient-name').textContent;
      alert(`Scheduling appointment for ${patientName}`);
    });
  });
  
  // Note item selection
  const noteItems = document.querySelectorAll('.note-item');
  noteItems.forEach(item => {
    item.addEventListener('click', function() {
      noteItems.forEach(note => note.classList.remove('selected'));
      this.classList.add('selected');
    });
  });
  
  // Save note button
  const saveNoteBtn = document.querySelector('.save-btn');
  if (saveNoteBtn) {
    saveNoteBtn.addEventListener('click', function() {
      alert('Note saved successfully!');
    });
  }
  
  // Finalize note button
  const finalizeNoteBtn = document.querySelector('.finalize-btn');
  if (finalizeNoteBtn) {
    finalizeNoteBtn.addEventListener('click', function() {
      alert('Note finalized and saved to patient record!');
    });
  }
  
  // Edit appointment button
  const editBtns = document.querySelectorAll('.edit-btn');
  editBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const patientName = this.closest('.appointment').querySelector('h4').textContent;
      alert(`Editing appointment for ${patientName}`);
    });
  });
  
  // Cancel appointment button
  const cancelBtns = document.querySelectorAll('.cancel-btn');
  cancelBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const patientName = this.closest('.appointment').querySelector('h4').textContent;
      const confirmCancel = confirm(`Are you sure you want to cancel the appointment for ${patientName}?`);
      if (confirmCancel) {
        alert(`Appointment for ${patientName} has been cancelled.`);
      }
    });
  });
});

// Function to generate the calendar
function generateCalendar(date) {
  const calendarGrid = document.getElementById('calendar-grid');
  if (!calendarGrid) return;
  
  // Clear existing calendar
  calendarGrid.innerHTML = '';
  
  // Set current month header
  const currentMonthEl = document.getElementById('current-month');
  if (currentMonthEl) {
    currentMonthEl.textContent = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long'
    });
  }
  
  // Add day names header
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayNames.forEach(day => {
    const dayNameEl = document.createElement('div');
    dayNameEl.classList.add('calendar-day-name');
    dayNameEl.textContent = day;
    calendarGrid.appendChild(dayNameEl);
  });
  
  // Get first day of month and number of days in month
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
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
    
    // Add click event to calendar days
    day.addEventListener('click', function() {
      document.querySelectorAll('.calendar-day').forEach(d => {
        d.classList.remove('selected');
      });
      this.classList.add('selected');
      
      const selectedDate = new Date(this.getAttribute('data-date'));
      document.getElementById('selected-date').textContent = selectedDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    });
    
    calendarGrid.appendChild(day);
  }
}
