import { Component, ElementRef, OnInit } from '@angular/core';
import { ITeamSupervisors, ITeamWork } from 'src/app/Models/iteam-work';

@Component({
  selector: 'app-team-work-page',
  templateUrl: './team-work-page.component.html',
  styleUrls: ['./team-work-page.component.css'],
})
export class TeamWorkPageComponent implements OnInit {
  team: ITeamWork[];
  teamSupervisors: ITeamSupervisors[];

  constructor(private el: ElementRef) {
    this.team = [
      {
        id: 1,
        fullName: 'محمود محمد محمود',
        roleName: 'Front End Developer',
        image: 'assets/MM.jpg',
        facebookLink: 'https://www.facebook.com/profile.php?id=100016489266121',
        linkedinLink: 'https://www.linkedin.com/in/mahmoud-mohamed-a25901223/',
        email: 'mmahmoud092002@gmail.com',
      },

      {
        id: 2,
        fullName: 'هديل حمام صادق',
        roleName: 'Front End Developer',
        image: 'assets/HH.png',
        facebookLink: 'https://www.facebook.com/hadeel.hamam.sadek',
        linkedinLink: 'https://www.linkedin.com/in/hadeel-hamam/',
        email: 'hadeel.hamam.sadek@gmail.com',
      },
      {
        id: 3,
        fullName: '  دينا ابو السعود احمد',
        roleName: 'Front End Developer',
        image: 'assets/dina3.jpg',
        facebookLink: 'https://www.facebook.com/profile.php?id=100055534762036',
        linkedinLink: 'https://www.linkedin.com/in/dina-alkhfajy-566b8520b/',
        email: 'dynaalkhfajy73@gmail.com',
      },
      {
        id: 4,
        fullName: 'عبد الفتاح حسين',
        roleName: ' Full Stack Developer',
        image: 'assets/AH.jpg',
        facebookLink: 'https://www.facebook.com/AbdulfattahHessein',
        linkedinLink: 'https://www.linkedin.com/in/abdulfattahhessein/',
        email: 'abdulfattah.hessein@gmail.com',
      },
      {
        id: 5,
        fullName: ' ايمن رمضان عيسى',
        roleName: 'Back End Developer',
        image: 'assets/AR.jpg',
        facebookLink: 'https://www.facebook.com/profile.php?id=100009801854843',
        linkedinLink: 'https://www.linkedin.com/in/ayman-ramadan-393542218/',
        email: 'aymanramadan677@gmail.com',
      },
      {
        id: 6,
        fullName: ' ندى سعيد بشاري',
        roleName: 'Back End Developer',
        image: 'assets/NA.jpg',
        facebookLink: '',
        linkedinLink: 'https://www.linkedin.com/in/nada-sae-542b33212/',
        email: 'nadasaeed566@gmail.com',
      },
      {
        id: 7,
        fullName: 'عبد الرحمن علي محمد',
        roleName: 'Software Tester',
        image: 'assets/AL.jpg',
        facebookLink: 'https://www.facebook.com/abdelrahman.ali.10420321',
        linkedinLink:
          'https://www.linkedin.com/in/abdelrahman-ali-mohamed-77a708223/',
        email: 'abdulrahman.ali.okasha@gmail.com',
      },

      {
        id: 8,
        fullName: '    احمد عبد الله زوين',
        roleName: 'Software Tester',
        image: 'assets/AA.jpg',
        facebookLink: 'https://www.facebook.com/profile.php?id=100071772881943',
        linkedinLink: 'https://www.linkedin.com/in/ahmed-zewain-49266721b/',
        email: 'ahmed.abdallah.zewain@gmail.com',
      },

      {
        id: 9,
        fullName: ' فجر سيد مصطفى',
        roleName: 'Mobile App Developer',
        image: 'assets/fajr.jpg',
        facebookLink: 'https://www.facebook.com/profile.php?id=100008034827730',
        linkedinLink: 'https://www.linkedin.com/in/fajr-sayed-18a67221b/',
        email: 'fajrsayed566@gmail.com',
      },

      {
        id: 10,
        fullName: 'برسيس عادل فكري',
        roleName: 'Mobile App Developer',
        image: 'assets/besa.jpg',
        facebookLink: 'https://www.facebook.com/sesa.adel.5',
        linkedinLink: 'https://www.linkedin.com/in/sesa-adel-142393297/',
        email: 'sesaadel@gmail.com',
      },
    ];
    this.teamSupervisors = [
      {
        id: 1,
        fullName: 'نهله فتحي احمد ',
        roleName: 'Assistant Professor',
        image: 'assets/NF.jpg',
        linkedinLink: 'https://www.linkedin.com/in/dr-nahla-fathy-091876301/',
        email: 'nahlafathyahmed@gmail.com',
      },

      {
        id: 2,
        fullName: '  رندا محمد عبد الحميد ',
        roleName: 'Teaching Assistant',
        image: 'assets/RM.jpg',
        linkedinLink: 'https://www.linkedin.com/in/randa-mohamed-b513a25b/',
        email: 'randafci@yahoo.com',
      },
    ];
  }

  ngOnInit(): void {
    this.scroll();
  }

  scrollToTeamSection() {
    const teamSection = this.el.nativeElement.querySelector('#team');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scroll() {
    let btn = document.getElementById('to-top');
    window.onscroll = function () {
      if (window.scrollY >= 1200) {
        btn.style.display = 'block';
      } else {
        btn.style.display = 'none';
      }
    };
  }
  scrollToTop() {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  }
}
