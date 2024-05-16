import { Component, HostListener, OnInit, OnDestroy, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  futureDate = new Date("2024-05-20T00:00:00");
  timeFuture = this.futureDate.getTime();
  countdown: number | null = null;


  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.initDropdownMenu();
    this.initLinkChooser();
    this.counter();
    this.countdown = setInterval(() => this.counter(), 1000) as unknown as number;
  }

  ngOnDestroy() {
    if (this.countdown !== null) {
      clearInterval(this.countdown);
    }
  }

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

  isDropdownOpen: boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
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

  counter() {
    const timeNow = new Date().getTime();
    const t = this.timeFuture - timeNow;

    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    const days = Math.floor(t / oneDay);
    const hours = Math.floor((t % oneDay) / oneHour);
    const minutes = Math.floor((t % oneHour) / oneMinute);
    const seconds = Math.floor((t % oneMinute) / 1000);

    const format = (item: number): string => item < 10 ? `0${item}` : item.toString();

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

    if (t < 0 && this.countdown !== null) {
      clearInterval(this.countdown);
      const countdownElement = document.getElementById('countdown');
      if (countdownElement) {
        countdownElement.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired!</h4>`;
      }
    }
  }

  private initDropdownMenu() {
    const linkClick = document.querySelector('.dropdown') as HTMLElement | null;
    const linkToShow = document.querySelector('a.nav-link.dropdown-toggle') as HTMLElement | null;
    const linkContentToShow = document.querySelector('ul.dropdown-menu') as HTMLElement | null;

    if (linkClick && linkToShow && linkContentToShow) {
      if (window.screen.width >= 992) {
        linkClick.addEventListener('mousemove', () => {
          linkToShow.classList.add('show');
          linkContentToShow.classList.add('show');
        });
        linkClick.addEventListener('mouseleave', () => {
          linkToShow.classList.remove('show');
          linkContentToShow.classList.remove('show');
        });
      } else {
        linkClick.addEventListener('click', (event) => {
          event.preventDefault();
          linkToShow.classList.toggle('show');
          linkContentToShow.classList.toggle('show');
        });
      }
    }
  }

  private initLinkChooser() {
    const linkToChoose = document.querySelectorAll('li.list-category') as NodeListOf<HTMLElement>;
    const contentWhyUs = document.querySelectorAll('.why') as NodeListOf<HTMLElement>;

    linkToChoose.forEach((element) => {
      element.addEventListener('click', (e: Event) => {
        contentWhyUs.forEach((elem) => {
          elem.classList.add('hide');
        });

        const linkClass = (e.currentTarget as HTMLElement).classList;
        if (linkClass.contains('best')) {
          const bestElement = document.querySelector('.why.best') as HTMLElement | null;
          if (bestElement) {
            bestElement.classList.remove('hide');
          }
        } else if (linkClass.contains('quality')) {
          const qualityElement = document.querySelector('.why.quality') as HTMLElement | null;
          if (qualityElement) {
            qualityElement.classList.remove('hide');
          }
        } else if (linkClass.contains('top')) {
          const topElement = document.querySelector('.why.top') as HTMLElement | null;
          if (topElement) {
            topElement.classList.remove('hide');
          }
        }
      });
    });
  }

}
