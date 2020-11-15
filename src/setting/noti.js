import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonButton,
  IonIcon,
  IonList,
  IonDatetime,
} from "@ionic/react";
import { convertDate, CmpTime } from "../pages/Future";
import { contractOutline, trash } from "ionicons/icons";
import { getDefaultLibFileName } from "typescript";
import { IonReactMemoryRouter } from "@ionic/react-router";

const NotiSetting = () => {
  const [data, setData] = useState([]);
  const [notiTime, setNotiTime] = useState();

  if (data === []) {
    return <div>loading</div>;
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonTitle>通知設定</IonTitle>
        <IonItem>
          前日の &emsp;
          <IonDatetime
            displayFormat="HH:mm"
            placeholder={notiTime}
            value={notiTime}
            onIonChange={(e) => {
              setNotiTime(e.detail.value);
              console.log(notiTime);
            }}
          ></IonDatetime>
        </IonItem>
        <IonButton
          onClick={() => {
            console.log(notiTime);
          }}
        >
          変更する
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NotiSetting;
