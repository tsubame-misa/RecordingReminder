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

const Tab3 = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonItem>
          通知
          <IonButton href="/user/noti_setting">
            <IonIcon icon={chevronForwardOutline}></IonIcon>
          </IonButton>
        </IonItem>
        <IonItem>
          カラー
          <IonButton href="/user/color_setting">
            <IonIcon icon={chevronForwardOutline}></IonIcon>
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
