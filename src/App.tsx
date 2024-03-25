import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import Search from './pages/Search';
import Recipe from './pages/Recipe';
import Region from './pages/Region';
import Catagory from './pages/Catagory';
import Favorited from './pages/Favorited'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/recipe/search" />
            </Route>
            <Route path="/recipe/search/region/:idRegion" exact={true}>
              <Region />
            </Route>
            <Route path="/recipe/search/catagory/:idCatagory" exact={true}>
              <Catagory />
            </Route>
            <Route path="/recipe/Favorites">
              <Favorited />
            </Route>
            <Route path="/folder/:name" exact={true}>
              <Page />
            </Route>
            <Route path="/recipe/search" exact={true}>
              <Search />
            </Route>
            <Route path="/recipe/search/:query" exact={true}>
              <Search />
            </Route>
            
            <Route path="/recipe/view/:idMeal" exact={true}>
              <Recipe />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
