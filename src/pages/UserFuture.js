import React, { useState, useEffect } from "react";
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
  IonList,
  IonButton,
  useIonViewWillEnter,
} from "@ionic/react";
import { add, cloudyNight, ellipsisHorizontal, trash } from "ionicons/icons";
import { convertDate, CmpTime } from "./Future";

const UserFuture = () => {
  const [data, setData] = useState([]);
  const [ID, setID] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [date, setDate] = useState();

  useIonViewWillEnter(() => {
    if ("data" in localStorage) {
      setData(JSON.parse(localStorage.getItem("data")));
    }
  });

  if (data === []) {
    return (
      <IonPage>
        <IonContent>Loading....</IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        {data
          .filter((d) => {
            return CmpTime(d.date) > 0;
          })
          .map((d, id) => {
            return (
              <div>
                <IonItem>
                  {d.channel} &emsp;
                  {convertDate(d.date)} &emsp;
                  {d.name}
                  <IonButton
                    fill="clear"
                    color="dark"
                    slot="end"
                    key={id}
                    onClick={() => {
                      setID(id);
                      //console.log(id);
                      //console.log(data[id]);
                      setShowAlert(true);
                      setDate(convertDate(data[id].date));
                      //showData();
                    }}
                  >
                    <IonIcon icon={ellipsisHorizontal}></IonIcon>
                  </IonButton>
                </IonItem>
              </div>
            );
          })}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => {
            setShowAlert(false);
          }}
          cssClass="my-custom-class"
          header={data[ID]?.name}
          // オプショナルチェイニングoptional chaining演算子 ?.
          subHeader={data[ID]?.channel + " " + date}
          message={data[ID]?.artist + " " + data[ID]?.comment}
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default UserFuture;
