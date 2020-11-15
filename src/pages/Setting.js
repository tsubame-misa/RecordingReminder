import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonButton,
  IonIcon,
} from "@ionic/react";
import {
  add,
  cloudyNight,
  trash,
  chevronForwardOutline,
  chevronBack,
} from "ionicons/icons";

const Setting = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonItem>Host Setting</IonItem>
        <IonItem>
          カラー
          <IonButton slot="end" href="/color_setting" color="dark" fill="none">
            <IonIcon icon={chevronForwardOutline}></IonIcon>
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Setting;
