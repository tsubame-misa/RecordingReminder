import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonActionSheet,
  IonTextarea,
  IonItem,
  IonLabel,
  IonAlert,
} from "@ionic/react";
import { add, trash } from "ionicons/icons";
import { useState } from "react";

const Tab4 = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert5, setShowAlert5] = useState(false);
  const [text, setText] = useState();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 4</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 4</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowAlert(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass="my-custom-class"
          header={"Prompt!"}
          inputs={[
            {
              name: "name1",
              type: "text",
              placeholder: "チャンネル",
            },
            {
              name: "name4",
              type: "date",
              min: "2017-03-01",
              max: "2018-01-12",
            },
            {
              name: "name2",
              type: "text",
              id: "name2-id",
              placeholder: "番組名",
            },
            {
              name: "name1",
              type: "text",
              placeholder: "アーティスト",
            },
            {
              name: "name3",
              type: "textarea",
              placeholder: "その他・コメント",
            },
          ]}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary",
              handler: () => {
                console.log("Confirm Cancel");
              },
            },
            {
              text: "Ok",
              handler: () => {
                console.log("Confirm Ok");
              },
            },
          ]}
        />
        <IonAlert
          isOpen={showAlert5}
          onDidDismiss={() => setShowAlert5(false)}
          cssClass="my-custom-class"
          header={"Radio"}
          inputs={[
            {
              name: "radio1",
              type: "radio",
              label: "Radio 1",
              value: "value1",
              checked: true,
            },
            {
              name: "radio2",
              type: "radio",
              label: "Radio 2",
              value: "value2",
            },
            {
              name: "radio3",
              type: "radio",
              label: "Radio 3",
              value: "value3",
            },
            {
              name: "radio4",
              type: "radio",
              label: "Radio 4",
              value: "value4",
            },
            {
              name: "radio5",
              type: "radio",
              label: "Radio 5",
              value: "value5",
            },
            {
              name: "radio6",
              type: "radio",
              label: "Radio 6",
              value: "value6",
            },
          ]}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary",
              handler: () => {
                console.log("Confirm Cancel");
              },
            },
            {
              text: "Ok",
              handler: () => {
                console.log("Confirm Ok");
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
