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

const Tab6 = () => {
  return (
    <IonPage>
      <IonTitle>tab6</IonTitle>
      <IonContent fullscreen>
        <IonItem>
          通知
          <IonButton href="/host/noti_setting">
            <IonIcon icon={chevronForwardOutline}></IonIcon>
          </IonButton>
        </IonItem>
        <IonItem>
          カラー
          <IonButton href="/color_setting">
            <IonIcon icon={chevronForwardOutline}></IonIcon>
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Tab6;
