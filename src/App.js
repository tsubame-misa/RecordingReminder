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
import UserFuture from "./pages/UserFuture";
import UserPast from "./pages/UserPast";
import Tab3 from "./pages/Tab3";
import Future from "./pages/Future";
import Past from "./pages/Past";
import Tab6 from "./pages/Tab6";
import AddProgram from "./add_program/index";
import NotiSetting from "./setting/noti";
import ColSetting from "./setting/color";
import notifications from "./notification/index";

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

const App = () => {
  const [ID, setID] = useState();

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
          {/*User と　Hostの切り替え時に前のページが残る*/}
          <IonTitle>Recording Reminder</IonTitle>
          <IonButton
            onClick={() => {
              settingID();
            }}
          >
            <IonIcon icon={triangle} />
            {ID == 0 ? <IonLabel>User</IonLabel> : <IonLabel>Host</IonLabel>}
          </IonButton>
        </IonToolbar>
        <IonButton
          color="tertiary"
          onClick={() => notifications.schedule(8, 0)}
        >
          Schedule Notification
        </IonButton>
      </IonHeader>

      <IonContent>
        <IonReactRouter>
          {ID == 0 ? (
            <IonTabs>
              <IonRouterOutlet>
                <Route
                  path="/user_future"
                  component={UserFuture}
                  exact={true}
                />
                <Route path="/user_past" component={UserPast} exact={true} />
                <Route path="/tab3" component={Tab3} />
                <Route path="/noti_setting" component={NotiSetting} />

                <Route path="/color_setting" component={ColSetting} />
                <Route
                  path="/"
                  render={() => <Redirect to="/user_future" />}
                  exact={true}
                />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="user_future" href="/user_future">
                  <IonIcon icon={triangle} />
                  <IonLabel>FutureU</IonLabel>
                </IonTabButton>
                <IonTabButton tab="user_past" href="/user_past">
                  <IonIcon icon={ellipse} />
                  <IonLabel>PastU</IonLabel>
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
                <Route path="/future" component={Future} exact={true} />
                <Route path="/past" component={Past} exact={true} />
                <Route path="/tab6" component={Tab6} />
                <Route path="/add_program" component={AddProgram} />
                <Route
                  path="/"
                  render={() => <Redirect to="/future" />}
                  exact={true}
                />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="Future" href="/future">
                  <IonIcon icon={triangle} />
                  <IonLabel>Future</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Past" href="/past">
                  <IonIcon icon={ellipse} />
                  <IonLabel>Past</IonLabel>
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
