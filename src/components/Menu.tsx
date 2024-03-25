import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonAccordion,
  IonAccordionGroup,
  IonRouterLink,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookOutline, bookSharp, bookmarkOutline, bookmarkSharp, bookmarksSharp, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, searchCircle, searchCircleSharp, searchOutline, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';

import React, { useEffect, useState } from 'react';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Search',
    url: '/recipe/search',
    iosIcon: bookOutline,
    mdIcon: bookSharp
  },
  {
    title: 'Favorites',
    url: '/recipe/Favorites',
    iosIcon: bookmarkOutline,
    mdIcon: bookmarkSharp
  }
];


const Menu: React.FC = () => {
  const location = useLocation();


  const [regions, setRegions] = useState<any[]>([]);

  useEffect(() => {
    const fetchLabels = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
      const data = await response.json();
      setRegions(data.meals || []);
    };

    fetchLabels();
  }, []);

  const [catagories, setCatagories] = useState<any[]>([]);

  useEffect(() => {
    const fetchLabels = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
      const data = await response.json();
      setCatagories(data.meals || []);
    };

    fetchLabels();
  }, []);

  


  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Weslee's Cookbook of Pilfered Recipes</IonListHeader>
          <IonNote>Referencing TheMealDB</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonAccordionGroup>
          <IonAccordion value="Region">
            <IonItem slot="header" color="light">
              <IonLabel>Search by Region</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
            {regions.map((label, index) => (
              <IonItem lines="none" key={index} routerLink={`/recipe/search/region/${label.strArea}`} 
              className={location.pathname === `/recipe/search/region/${label.strArea}` ? 'selected' : ''}>
                <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
                <IonLabel>{label.strArea}</IonLabel>
              </IonItem>
            ))}
            </div>
          </IonAccordion>

          <IonAccordion value="Catagory">
            <IonItem slot="header" color="light">
              <IonLabel>Search by Catagory</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
            {catagories.map((label, index) => (
              <IonItem lines="none" key={index} routerLink={`/recipe/search/catagory/${label.strCategory}`} 
              className={location.pathname === `/recipe/search/catagory/${label.strCategory}` ? 'selected' : ''}>
                <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
                <IonLabel>{label.strCategory}</IonLabel>
              </IonItem>
            ))}
            </div>
          </IonAccordion>
          </IonAccordionGroup>
          

        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
