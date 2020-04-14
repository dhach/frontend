import { Component, OnInit } from '@angular/core';
import { LocaleService } from '../locale.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  expert = [{
      image: 'julia.jpg',
      name: 'Julia Klüpfel',
      short: {
        de: 'TU München - Doktorandin (Chemie)',
        en: 'TU Munich - PhD Student (Chemistry)',
      },
      long: {
        de: 'Wir haben schon vor einiger Zeit in meiner Arbeitsgruppe diskutiert, wie wir mit unserer Expertise und ' +
          'derzeit ungenutzten Materialien (Handschuhe, Desinfektionsmittel oder Laborgeräte) in der aktuellen Lage ' +
          'helfen könnten. Da kam der WirvsVirus-Hackathon gerade recht, um den Worten auch Taten folgen zu lassen!',
        en: 'Some time ago, we discussed in my research group how we could help in the current situation with our ' +
          'expertise and unused material like gloves, disinfectants or lab devices. So, the WirvsVirus hackathon ' +
          'came just in time to follow words with deeds!',
      }
    },
    {
      image: 'eli.jpg',
      name: 'Elisabeth von der Esch',
      short: {
        de: 'TU München - Doktorandin (Chemie)',
        en: 'TU Munich - PhD Student (Chemistry)',
      },
      long: {
        de: 'Zusammen mit einer befreundeten TA, die gerade für die Messung von Corona-Proben geschult wird, hatte ' +
          'ich schon überlegt, ob und wie Uni-Ressourcen dem Labor bei der Ausweitung ihrer Corona-Testkapazitäten ' +
          'helfen könnten.  Daher wollte ich gerne zum WirvsVirus-Hackathon beitragen.',
        en: 'Together with a friend of mine, who is currently undergoing special training to conduct corona tests, ' +
          'we were brainstorming if and how universities could provide help to official corona-testing laboratories. ' +
          'The WirVsVirus-Hackathon was a good opportunity to work on solutions.',
      },
    },
    {
      image: 'klemens.jpg',
      name: 'Klemens Thaler',
      short: {
        de: 'TÜV SÜD Product Service - Prüfingenieur für aktive Medizinprodukte',
        en: 'TÜV SÜD Product Service - Test engineer for active medical products',
      },
      long: {
        de: 'In dieser außergewöhnlichen Situation ist jede Hilfe notwendig. Ich möchte eine helfende Hand anbieten,' +
          ' wo auch immer eine gebraucht wird. Hackathon ist eine gute Gelegenheit dafür.',
        en: 'In this extraordinary situation every help is needed. I would like to offer my knowledge whereever it ' +
          'is necessary. PIRAT is a good motivation to bring people together.',
      },
    },
    {
      image: 'markus.jpg',
      name: 'Markus Schneider',
      short: {
        de: 'Universität Osnabrück - Postdoc (Biochemie)',
        en: 'University of Osnabrück - Postdoc (Biochemestry)',
      },
      long: {
        de: 'Ich bin absolut kein Hacker. Aber als Wissenschaftler weiß ich, welche Geräte und Materialien' +
          ' im Labor gebraucht werden und was nötig ist, um einen Test durchzuführen und auszuwerten. Ich versuche' +
          ' daher PIRAT auf diesem Weg mit meinem Know-how zu unterstützen.',
        en: 'I am definitly not a hacker! However, as a scientist and researcher i know about all the devices and ' +
          'materials that are needed in a laboratory. Furthermore, i am familiar with test procedures and therefore ' +
          'provide the PIRAT team with all the necessary background.',
      },
    },
    {
      image: 'lisa.jpg',
      name: 'Lisa Göpfert',
      short: {
        de: 'TU München - Doktorandin (Chemie)',
        en: 'TU Munich - PhD Student (Chemistry)',
      },
      long: {
        de: 'Ich bin durch meine Kolleginnen auf das Projekt aufmerksam geworden' +
          ' und freue mich, fachlichen Input zu geben und mitzuhelfen.',
        en: 'My colleagues brought this project to my attention and I am happy to provide input wherever I can.',
      },
    }
  ];

  pr = [
    {
      image: 'lukas.jpg',
      name: 'Lukas Vordemann',
      short: {
        de: 'TU München - Student (Informatik)',
        en: 'TU Munich - Student (Computer Science)',
      },
      long: {
        de: 'Man kann entweder auf der faulen Haut sitzen und die Krise ausharren oder' +
        ' sich in irgendeiner Form engagieren und nützlich machen. Hier sind der Kreativität' +
        ' keine Grenzen gesetzt, was wir auch beim WirVsVirus Hackathon gesehen haben. Die' +
        ' Arbeit an dem PIRAT Projekt ist für mich nicht nur eine sinnvolle Aufgabe sondern' +
        ' auch eine einzigartige Erfahrung die ich nicht missen möchte.',
        en: 'Everybody has the choice to either do nothing and wait until this crisis will ' +
        ' be over or try to do his part in fighting the virus. There are many ways to contribute ' +
        ' with your skills to this situation and creativity has no limits, what we have also seen' +
        ' during the WirVsVirus Hackathon. Working on the PIRAT project has not only been a ' +
        ' meaningful work to me, but also an unforgettable experience i will never forget.',
      },
    },
    {
      image: 'annette.jpg',
      name: 'Annette Bieniusa',
      short: {
        de: 'TU Kaiserslautern - akademische Rätin (Informatik)',
        en: 'TU Kaiserslautern - Academic counsel (computer science)',
      },
      long: {
        de: 'Ich finde Hackathons faszinierend - WirVsVirus bringt außerdem noch Aktualität und Impact. Die Idee von' +
          ' PIRAT fand ich super: Wir bringen Forschung und Praxis auf neue Art zusammen um Ressourcen im Kampf gegen' +
          ' Corona zu schaffen!',
        en: 'Hackathons are fascinating - Furthermore, WirVsVirus addresses an important topic, aiming for urgent' +
          ' solutions. With PIRAT we bring  research and industry together, in order to fight against corona with' +
          ' joint forces.',
      },
    },
    {
      image: 'niklas.jpg',
      name: 'Niklas Lang',
      short: {
        de: 'LMU München / University of Edinburgh - Student (Medizin / Bioinformatik)',
        en: 'LMU Munich / University of Edinburgh - Student (Medicine / Bioinformatics)',
      },
      long: {
        de: 'Niklas studiert Medizin und Bioinformatik - kein Wunder also, dass er sofort' +
          'bei unserem Projekt dabei war und uns mit seiner Expertise aus beiden Bereichen unterstützt!',
        en: 'Niklas studies medicine und bioinformatics - no wonder that he jumped onto our project right' +
          'away, contributing his expertise from both fields.',
      },
    },
    {
      image: 'franziska.jpg',
      name: 'Franziska Eyo',
      short: {
        de: 'Universität Rostock - Student (Medizin)',
        en: 'University of Rostock - Student (Medical Science)',
      },
      long: {
        de: 'In Zeiten von Social Distancing und Ausgangsbeschränkungen, müssen wir alle' +
          ' Abstriche machen ... und vor allen Dingen testen! Damit das gewährleistet werden kann,' +
          ' ist eine funktionierende Ressourcenallokation immens wichtig. Durch die' +
          ' Kommunikation mit verschiedenen Interessensgruppen versuche ich PIRAT zu unterstützen.',
        en: 'In times of social distancing and stockpiling toilet paper, we all want to fight' +
          ' COVID-19. Since testing is a crucial part of it, the allocation of the required resources' +
          ' has to work effectively! By communicating with PIRAT’s stakeholders, I want to support this project.',
      },
    },
    {
      image: 'miklas.jpg',
      name: 'Miklas Martens',
      short: {
        de: 'Universität Hamburg - Student (Pharmazie)',
        en: 'University of Hamburg - Student (Pharmacy)',
      },
      long: {
        de: 'Die aktuelle Lage macht den Austausch von verschiedensten Institutionen' +
          ' und Fachrichtungen notwendig, weswegen ich auch als „Fachfremder“ hoffe hier' +
          ' etwas zu diesem Austausch beitragen zu können.',
        en: 'The current situation warrants a collaboration of various institutions and' +
          ' academic subject-areas, which is why I hope to contribute to this project, even as an non-specialist in informatics.',
      },
    }
  ];

  developer = [
      {
      image: 'chaoran.jpg',
      name: 'Chaoran Chen',
      short: {
        de: 'TU München - Student (Informatik)',
        en: 'TU Munich - Student (Computer Science)',
      },
      long: {
        de: 'Eigentlich wollten Max, Lukas und ich Kleinbauern in Kenia helfen,' +
          ' ihre Marktmacht auszubauen, um so bessere Erträge erzielen zu können.' +
          ' Nachdem das Coronavirus jedoch unsere gebuchte Reise verhinderte, kam' +
          ' der Hackathon uns sehr gelegen, um die freigewordene Zeit sinnvoll und' +
          ' kreativ zu nutzen.',
        en: 'Max, Lukas and I had just started a project in Kenya to help small' +
          ' farmers by improving logistic chains when the corona crisis hit Europe.' +
          ' After our already booked trip was, unfortuntely, canceled, we had enough' +
          ' time to learn how to become a PIRAT(e).',
      }
    },
    {
      image: 'max.jpg',
      name: 'Maximilian Wiesholler',
      short: {
        de: 'TU München - Student (Informatik)',
        en: 'TU Munich - Student (Computer Science)',
      },
      long: {
        de: 'Aus einem Hackathon Wochende ist ein tolles Projekt entstanden. Mit jeder freien Zeit' +
          ' die mir zur Verfügung steht, arbeite ich im Backend von PIRAT. Manchmal etwas zu lange in' +
          ' die Nacht hinein, aber wenn Ressourcen und Hilfen an die benötigten Stellen verteilt werden' +
          ' können, hat sich das gelohnt.',
        en: 'Starting from an Hackathon weekend a great project is emerged. For PIRAT I am working in the' +
          ' Backend in any free time I have. Sometimes too long into the night. But if resources and manpower' +
          ' can be distributed to those that need them urgently, the effort was worth it. ',
      },
    },
    {
      image: 'benjamin.jpg',
      name: 'Benjamin Wolf',
      short: {
        de: 'Universität Hamburg - Student (Informatik)',
        en: 'University of Hamburg - Student (Computer Science)',
      },
      long: {
        de: 'Da die Uni momentan sowieso komplett still steht, war ich sehr froh, als Chaoran mir das Projekt' +
          ' vorgestellt hat. Jetzt kann ich weiter zuhause rumsitzen und trotzdem etwas Sinnvolles machen.',
        en: 'I was very happy when Chaoran showed me the project since the University is completely shut' +
          ' down at the moment. Now I can keep staying home, but still work on something useful.',
      },
    },
  ];

  international = [
    {
      image: 'marcel.jpg',
      name: 'Marcel Bühler',
      short: {
        de: 'ETH Zürich - Student (Data Science)',
        en: 'ETH Zurich - Student (Data Science)',
      },
      long: {
        de: 'In normalen Zeiten entwickle ich generative Machine Learning Modelle' +
        'und bin in der Entrepreneur-Community aktiv. Ich halte es für essentiell, ' +
        'dass in globalen Krisen alle anpacken und mithelfen. Für PIRAT sehe ich grosses ' +
        'Hilfs-Potential und treibe deshalb die Verbreitung in der Schweiz voran.',
        en: 'I usually work on generative machine learning models and engage in the entrepreneurial community.' +
        ' I believe that in such a global crises, every single person should actively participate and do the best' +
        ' to help. PIRAT is a valuable initiative with a big potential, and my aim is to push it to Switzerland.',
      },
    },
  ];

  consultant = [
    {
      image: 'flo.jpg',
      name: 'Florian Pawlik',
      short: {
        de: 'IT Consultant aus München',
        en: 'IT consultant from Munich',
      },
      long: {
        de: 'Ich bin hier während des Hackatons in das Team mit reingerutscht als Ratgeber, Fehlerfinder und' +
          ' Wissensquelle bei verschiedenen Fragestellungen. Und was gäbe es aktuell Besseres als seine Zeit für den' +
          ' Kampf gegen COVID einzusetzen?',
        en: 'I joined the team during the hackathon to help out as advisor, investigator and problem solver to ' +
          'tackle open questions. Investing your personal time into a project like PIRAT is a valuable contribution ' +
          'everybody can make to fight COIVD.',
      }
    },
    {
      image: 'logo.png',
      name: 'Sebastian Kränzle',
      short: {
        de: 'Datenschutzberater',
        en: 'Data privacy conduit',
      },
      long: {
        de: '',
        en: '',
      }
    }

  ];


  constructor(
    private localeService: LocaleService,
  ) {
  }


  ngOnInit(): void {
  }


  getLocaleText(x): string {
    return x[this.localeService.locale] ?? x.en;
  }

}
