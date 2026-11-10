const filterButtons = document.querySelectorAll('[data-filter]');
const projectItems = document.querySelectorAll('[data-category]');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('selected', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projectItems.forEach(item => {
      item.hidden = selected !== 'All' && item.dataset.category !== selected;
    });
  });
});

document.querySelectorAll('[data-copy-email]').forEach(button => {
  button.addEventListener('click', async () => {
    const contact = button.closest('.contact-details');
    const address = contact.querySelector('.contact-address');
    const feedback = contact.querySelector('.copy-feedback');
    try {
      await navigator.clipboard.writeText(button.dataset.copyEmail);
      feedback.textContent = 'Email address copied.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(address);
      selection.removeAllRanges();
      selection.addRange(range);
      feedback.textContent = 'Address selected. Press ⌘C or Ctrl+C to copy.';
    }
  });
});
