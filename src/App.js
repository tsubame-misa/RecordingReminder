import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonItem,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import Tab4 from "./pages/Tab4";
import Tab5 from "./pages/Tab5";
import Tab6 from "./pages/Tab6";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { isStringTextContainingNode } from "typescript";

const App = () => {
  const [ID, setID] = useState(1);

  const settingID = () => {
    if (ID == 0) {
      setID(1);
    } else {
      setID(0);
    }
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recording Reminder</IonTitle>
          <IonButton
            onClick={() => {
              settingID();
            }}
          >
            <IonIcon icon={triangle} />
            {ID == 0 ? <IonLabel>HOST</IonLabel> : <IonLabel>User</IonLabel>}
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonReactRouter>
          {ID == 0 ? (
            <IonTabs>
              <IonRouterOutlet>
                <Route path="/tab1" component={Tab1} exact={true} />
                <Route path="/tab2" component={Tab2} exact={true} />
                <Route path="/tab3" component={Tab3} />
                <Route
                  path="/"
                  render={() => <Redirect to="/tab1" />}
                  exact={true}
                />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/tab1">
                  <IonIcon icon={triangle} />
                  <IonLabel>Tab 1</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/tab2">
                  <IonIcon icon={ellipse} />
                  <IonLabel>Tab 2</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/tab3">
                  <IonIcon icon={square} />
                  <IonLabel>Tab 3</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          ) : (
            <IonTabs>
              {/*host*/}
              <IonRouterOutlet>
                <Route path="/tab4" component={Tab4} exact={true} />
                <Route path="/tab5" component={Tab5} exact={true} />
                <Route path="/tab6" component={Tab6} />
                <Route
                  path="/"
                  render={() => <Redirect to="/tab4" />}
                  exact={true}
                />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="tab4" href="/tab4">
                  <IonIcon icon={triangle} />
                  <IonLabel>Tab 4</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab5" href="/tab5">
                  <IonIcon icon={ellipse} />
                  <IonLabel>Tab 5</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab6" href="/tab6">
                  <IonIcon icon={square} />
                  <IonLabel>Tab 6</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          )}
        </IonReactRouter>
      </IonContent>
    </IonApp>
  );
};

export default App;
