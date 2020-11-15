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
  IonCard,
  IonDatetime,
  IonList,
  IonSelect,
  IonSelectOption,
  IonAlert,
  IonLabel,
} from "@ionic/react";
import {
  add,
  cloudyNight,
  trash,
  chevronForwardOutline,
  chevronBack,
} from "ionicons/icons";

const UserSetting = () => {
  const [notiTime, setNotiTime] = useState();
  const [date, setDate] = useState();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if ("notiDate" in localStorage) {
      setDate(JSON.parse(localStorage.getItem("notiDate")));
    } else {
      setDate("pre");
    }
  }, []);

  useEffect(() => {
    if ("notiTime" in localStorage) {
      setNotiTime(JSON.parse(localStorage.getItem("notiTime")));
    } else {
      setNotiTime("2000-01-01T22:00:00+09:00");
    }
  }, []);

  const sendData = () => {
    localStorage.setItem("notiTime", JSON.stringify(notiTime));
    localStorage.setItem("notiDate", JSON.stringify(date));
    setShowAlert(true);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonCard>
          <IonItem lines="none" color="light">
            通知
          </IonItem>
          <IonItem>
            <IonSelect
              value={date}
              placeholder="Select One"
              onIonChange={(e) => setDate(e.detail.value)}
            >
              <IonSelectOption value="pre">前日</IonSelectOption>
              <IonSelectOption value="on">当日</IonSelectOption>
            </IonSelect>
            &emsp;
            <IonDatetime
              displayFormat="HH:mm"
              placeholder={notiTime}
              value={notiTime}
              minuteValues="0,15,30,45"
              onIonChange={(e) => {
                setNotiTime(e.detail.value);
                console.log(notiTime);
              }}
            ></IonDatetime>
            <IonButton
              slot="end"
              color="dark"
              onClick={() => {
                sendData();
                console.log(notiTime);
              }}
            >
              変更する
            </IonButton>
          </IonItem>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            cssClass="my-custom-class"
            header={"変更しました"}
            buttons={["OK"]}
          />
        </IonCard>
        <IonItem>
          カラー
          <IonButton
            href="/user/color_setting"
            color="dark"
            fill="fill"
            slot="end"
          >
            <IonIcon icon={chevronForwardOutline}></IonIcon>
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default UserSetting;
