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
import {
  ellipse,
  returnUpForwardOutline,
  square,
  triangle,
} from "ionicons/icons";
import UserFuture from "./pages/UserFuture";
import UserPast from "./pages/UserPast";
import UserSetting from "./pages/UserSetting";
import Future from "./pages/Future";
import Past from "./pages/Past";
import Setting from "./pages/Setting";
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
  const [ID, setID] = useState(null);
  const path = window.location.pathname;
  const pathList = path.split("/");

  if (!("notiDate" in localStorage)) {
    localStorage.setItem("notiDate", JSON.stringify("pre"));
  }

  if (!("notiTime" in localStorage)) {
    localStorage.setItem(
      "notiTime",
      JSON.stringify("2000-01-01T22:00:00+09:00")
    );
  }

  if (ID === null && path === "/user/future") {
    setID(1);
  } else if (ID === null && path === "/host/future") {
    setID(0);
  }

  const returnUrl = () => {
    if (ID === 1) {
      return "/host/future";
    } else {
      return "/user/future";
    }
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          {/*User と　Hostの切り替え時に前のページが残る*/}
          <IonTitle>Recording Reminder</IonTitle>
          <IonButton href={returnUrl()}>
            {pathList[1] === "user" ? (
              <IonLabel>User</IonLabel>
            ) : (
              <IonLabel>Host</IonLabel>
            )}
          </IonButton>
        </IonToolbar>
        {/*} <IonButton
          color="tertiary"
          onClick={() => notifications.schedule(8, 0)}
        >
          Schedule Notification
            </IonButton>*/}
      </IonHeader>

      <IonContent>
        <IonReactRouter>
          {pathList[1] === "user" ? (
            <IonTabs>
              <IonRouterOutlet>
                <Route
                  path="/user/future"
                  component={UserFuture}
                  exact={true}
                />
                <Route path="/user/past" component={UserPast} exact={true} />
                <Route path="/user/setting" component={UserSetting} />
                <Route path="/user/noti_setting" component={NotiSetting} />
                <Route path="/user/color_setting" component={ColSetting} />
                <Route
                  path="/"
                  render={() => <Redirect to="/user/future" />}
                  exact={true}
                />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="user_future" href="/user/future">
                  <IonIcon icon={triangle} />
                  <IonLabel>FutureU</IonLabel>
                </IonTabButton>
                <IonTabButton tab="user_past" href="/user/past">
                  <IonIcon icon={ellipse} />
                  <IonLabel>PastU</IonLabel>
                </IonTabButton>
                <IonTabButton tab="setting" href="/user/setting">
                  <IonIcon icon={square} />
                  <IonLabel>Setting</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          ) : (
            <IonTabs>
              {/*host*/}
              <IonRouterOutlet>
                <Route path="/host/future" component={Future} exact={true} />
                <Route path="/host/past" component={Past} exact={true} />
                <Route path="/host/setting" component={Setting} />
                <Route path="/host/add_program" component={AddProgram} />
                <Route path="/host/noti_setting" component={NotiSetting} />
                <Route
                  path="/"
                  render={() => <Redirect to="/host/future" />}
                  exact={true}
                />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="Future" href="/host/future">
                  <IonIcon icon={triangle} />
                  <IonLabel>Future</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Past" href="/host/past">
                  <IonIcon icon={ellipse} />
                  <IonLabel>Past</IonLabel>
                </IonTabButton>
                <IonTabButton tab="setting" href="/host/setting">
                  <IonIcon icon={square} />
                  <IonLabel>Setting</IonLabel>
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
