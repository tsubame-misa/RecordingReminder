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

const NotiSetting = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonItem>通知の設定</IonItem>
      </IonContent>
    </IonPage>
  );
};

export default NotiSetting;
