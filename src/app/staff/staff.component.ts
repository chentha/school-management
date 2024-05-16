import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent {


  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.initDropdownMenu();
    this.initLinkChooser();
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
  onWindowScroll1() {
    const element = document.querySelector('.navbar') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-inverse');
    } else {
      element.classList.remove('navbar-inverse');
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
