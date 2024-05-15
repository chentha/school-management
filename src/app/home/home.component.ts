import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @HostListener('mouseover', ['$event'])
  onHover(event: MouseEvent) {
    const target = event.target as HTMLElement; // Asserting the target to HTMLElement
    if (target.classList.contains('features-post')) {
      const content = target.querySelector('.content');
      if (content) {
        const screenWidth = window.screen.width;
        if (screenWidth >= 1020) {
          (content as HTMLElement).style.height = "180px"; // Asserting content to HTMLElement
        } else if (screenWidth >= 1000) {
          (content as HTMLElement).style.height = "230px"; // Asserting content to HTMLElement
        } else if (screenWidth >= 770) {
          (content as HTMLElement).style.height = "140px"; // Asserting content to HTMLElement
        } else if (screenWidth >= 480) {
          (content as HTMLElement).style.height = "100px"; // Asserting content to HTMLElement
        } else {
          (content as HTMLElement).style.height = "140px"; // Asserting content to HTMLElement
        }
      }
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    const target = event.target as HTMLElement; // Asserting the target to HTMLElement
    if (target.classList.contains('features-post')) {
      const content = target.querySelector('.content');
      if (content) {
        (content as HTMLElement).style.height = "0px"; // Asserting content to HTMLElement
      }
    }
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: MouseEvent) {
    const target = event.target as HTMLElement; // Asserting the target to HTMLElement
    if (target.classList.contains('features-post')) {
      const content = target.querySelector('.content');
      if (content) {
        (content as HTMLElement).style.height = "0px"; // Asserting content to HTMLElement
      }
    }
  }


  futureDate = new Date("2024-05-20T00:00:00"); // Example future date
  timeFuture = this.futureDate.getTime();
  countdown: number | null = null; // Use number instead of NodeJS.Timeout

  constructor() {

    this.counter();
    this.countdown = setInterval(() => this.counter(), 1000) as any; // Use setInterval instead of setTimeout
  }

  counter() {
    const timeNow = new Date().getTime();

    const t = this.timeFuture - timeNow;

    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    let days = Math.floor(t / oneDay);
    let hours = Math.floor((t % oneDay) / oneHour);
    let minutes = Math.floor((t % oneHour) / oneMinute);
    let seconds = Math.floor((t % oneMinute) / 1000);

    function format(item: number): string {
      return item < 10 ? `0${item}` : item.toString();
    }

    const daysElement = document.querySelector('.days .number');
    const hoursElement = document.querySelector('.hours .number');
    const minutesElement = document.querySelector('.minutes .number');
    const secondsElement = document.querySelector('.seconds .number');

    if (daysElement && hoursElement && minutesElement && secondsElement) {
      daysElement.textContent = format(days);
      hoursElement.textContent = format(hours);
      minutesElement.textContent = format(minutes);
      secondsElement.textContent = format(seconds);
    }

    if (t < 0 && this.countdown !== null) { // Check if countdown is not null
      clearInterval(this.countdown);
      const countdownElement = document.getElementById('countdown');
      if (countdownElement) {
        countdownElement.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired!</h4>`;
      }
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const element = document.querySelector('.navbar') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-inverse');
    } else {
      element.classList.remove('navbar-inverse');
    }
  }



}
