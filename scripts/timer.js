// Get meeting data
(async () => {
    const response = await fetch('./data/meetings.json');
    const data = await response.json();

    const meeting = data.meetings[0];

    // Set countdown
    const countdown = setInterval(() => {
        const distance = new Date(meeting.date) - new Date().getTime();

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.querySelector('.timer-days').textContent = days.toString().padStart(2, '0');
        document.querySelector('.timer-hours').textContent = hours.toString().padStart(2, '0');
        document.querySelector('.timer-minutes').textContent = minutes.toString().padStart(2, '0');
        document.querySelector('.timer-seconds').textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdown);
            document.querySelector('.timer-clock').innerHTML = '<p class="timer-expired">Meeting Expired</p>';
        }
    }, 1000);
})();