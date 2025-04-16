// This script fetches the meeting data and sets the meeting information.
// Please do not touch this unless you know what you are doing.


(async () => {

    // Get meeting data
    const response = await fetch('./data/meetings.json');
    const parsedResponse = await response.json();
    let meeting;

    // Iterate through the meeting data
    for (let i = 0; i < parsedResponse.meetings.length; i++) {

        // Check if the meeting date is in the future
        if (new Date(parsedResponse.meetings[i].date) > new Date()) {
            meeting = parsedResponse.meetings[i];
            break;
        }
    }

    // If there are no future meetings, set the last meeting as the current meeting
    if (!meeting) {
        meeting = parsedResponse.meetings[1];
    }

    // Check if the meeting title element exists
    if (document.getElementById('meeting-title') !== null) {

        // Set meeting information
        document.getElementById('meeting-title').innerText = meeting.title;
        document.getElementById('meeting-speaker').innerText = meeting.speaker;
        document.getElementById('meeting-date').innerText = new Date(meeting.date).toLocaleDateString();
        document.getElementById('meeting-description-large').innerHTML = meeting.description;
        document.getElementById('meeting-description-medium').innerHTML = meeting.description;
        document.getElementById('meeting-image').src = meeting.thumbnail;
        document.getElementById('meeting-location').innerText = `Location: ${meeting.location}`;
        document.getElementById('meeting-schedule').innerHTML = meeting.schedule;

        // Set meeting buttons
        const buttons = document.getElementById('meeting-buttons');
        meeting.buttons.forEach(button => {
            const a = document.createElement('a');
            a.innerText = button.text;
            a.href = button.link;
            a.className = 'btn';
            a.target = '_blank';
            buttons.appendChild(a);
        });
    }

    // Set countdown
    const countdown = setInterval(() => {

        // Get the distance between now and the meeting date
        const distance = new Date(meeting.date) - new Date().getTime();

        // Check if the countdown is over
        if (distance < 0) {
            clearInterval(countdown);
            document.querySelector('.timer-days').innerText = '00';
            document.querySelector('.timer-hours').innerText = '00';
            document.querySelector('.timer-minutes').innerText = '00';
            document.querySelector('.timer-seconds').innerText = '00';
            return;
        }

        // Calculate the days, hours, minutes, and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Set the countdown digits
        document.querySelector('.timer-days').innerText = days.toString().padStart(2, '0');
        document.querySelector('.timer-hours').innerText = hours.toString().padStart(2, '0');
        document.querySelector('.timer-minutes').innerText = minutes.toString().padStart(2, '0');
        document.querySelector('.timer-seconds').innerText = seconds.toString().padStart(2, '0');
    }, 1000);
})();