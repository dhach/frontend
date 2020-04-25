import { Component, OnInit } from '@angular/core';
import { Unit } from '../_types/Unit';
import { ConfigurationService } from '../configuration.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  logos = [
    {
      image: 'gdch.jpg',
      name: 'GDCh',
      link: 'https://www.gdch.de/',
    },
    {
      image: 'gdch-jcf.jpg',
      name: 'GDCh JCF',
      link: 'https://www.jungchemikerforum.de/',
    },
    {
      image: 'tuk.png',
      name: 'TU Kaiserslautern',
      link: 'https://www.uni-kl.de'
    },
    {
      image: 'unesty.png',
      name: 'Unesty',
      link: 'https://server.unesty.net'
    },
    {
      image: 'wirvsvirus.png',
      name: 'WirVsVirus Hackathon',
      link: 'https://wirvsvirushackathon.org'
    },
  ];


  statistics = {
    date: '25.04.2020, 22:00',
    availableResources: {
      devices: [
        { category: 'VORTEXER', number: 7 },
        { category: 'PCR_THERMOCYCLER', number: 13 },
        { category: 'RT_PCR_THERMOCYCLER', number: 3 },
        { category: 'ZENTRIFUGE', number: 6 },
        { category: 'PIPETTE', number: 100 },
        { category: 'SONSTIGES', number: 18 },
      ],
      consumables: [
        { category: 'READOUTPLATES', numbers: [{ unit: Unit.PACK, number: 4 }] },
        { category: 'SCHUTZBRILLE', numbers: [{ unit: Unit.PIECE, number: 5 }] },
        { category: 'HANDSCHUHE', numbers: [{ unit: Unit.PACK, number: 128 }] },
        { category: 'MASKE', numbers: [{ unit: Unit.PIECE, number: 6 }] },
        { category: 'REAKTIONSGEFAESSE', numbers: [ { unit: Unit.PACK, number: 10 },
            { unit: Unit.PIECE, number: 20 }] },
        { category: 'SONSTIGES', numbers: [{ unit: Unit.OTHERS, number: 1 }] },
      ],
      personnel: 62,
    }
  };


  constructor(
  ) { }


  ngOnInit(): void {
  }

}
