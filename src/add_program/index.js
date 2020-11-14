import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonTextarea,
  IonItem,
  IonLabel,
  IonAlert,
  IonButton,
  IonBackButton,
  IonButtons,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonInput,
  IonItemDivider,
} from "@ionic/react";
import { add, trash } from "ionicons/icons";
import { useState } from "react";

const Addprogram = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert5, setShowAlert5] = useState(false);
  const [text, setText] = useState();
  const [text2, setText2] = useState();
  const [hairColor, setHairColor] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedDate2, setSelectedDate2] = useState();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>番組を登録する</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>チャンネル名</IonLabel>
          <IonSelect
            value={hairColor}
            okText="Okay"
            cancelText="Dismiss"
            onIonChange={(e) => setHairColor(e.detail.value)}
          >
            <IonSelectOption value="brown">Brown</IonSelectOption>
            <IonSelectOption value="blonde">Blonde</IonSelectOption>
            <IonSelectOption value="black">Black</IonSelectOption>
            <IonSelectOption value="red">Red</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>日時</IonLabel>
          <IonDatetime
            displayFormat="YYYY/MM/DD/ HH:mm"
            placeholder="Select Date"
            value={selectedDate}
            onIonChange={(e) => setSelectedDate(e.detail.value)}
          ></IonDatetime>
        </IonItem>
        <IonItem>
          <IonInput
            value={text}
            placeholder="番組名"
            onIonChange={(e) => setText(e.detail.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>アーティスト出演時刻</IonLabel>
          {/*別の形式がいいかもしれない */}
          <IonDatetime
            displayFormat="HH:mm ~ HH:mm"
            placeholder="Select Date"
            value={selectedDate2}
            onIonChange={(e) => setSelectedDate2(e.detail.value)}
          ></IonDatetime>
        </IonItem>
        <IonItem>
          <IonTextarea
            placeholder=""
            value={text2}
            onIonChange={(e) => setText2(e.detail.value)}
          ></IonTextarea>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Addprogram;
