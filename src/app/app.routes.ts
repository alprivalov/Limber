import { Routes } from '@angular/router';

import { AccueilComponent } from './components/accueil/accueil.component';
import { MursComponent } from './components/murs/murs.component';
import { ContenusComponent } from './components/contenus/contenus.component';
import { CampagnesComponent } from './components/campagnes/campagnes.component';
import { CalendrierComponent } from './components/calendrier/calendrier.component';
import { ScenariosComponent } from './components/scenarios/scenarios.component';
import { ConversionComponent } from './components/conversion/conversion.component';
import { StatistiquesComponent } from './components/statistiques/statistiques.component';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'murs', component: MursComponent },
  { path: 'contenus', component: ContenusComponent },
  { path: 'campagnes', component: CampagnesComponent },
  { path: 'calendrier', component: CalendrierComponent },
  { path: 'scenarios', component: ScenariosComponent },
  { path: 'conversion', component: ConversionComponent },
  { path: 'statistiques', component: StatistiquesComponent },
];