
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
  
  // Note item selection
  const noteItems = document.querySelectorAll('.note-item');
  noteItems.forEach(item => {
    item.addEventListener('click', function() {
      noteItems.forEach(note => note.classList.remove('selected'));
      this.classList.add('selected');
    });
  });
});
