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
import { add, cloudyNight, trash } from "ionicons/icons";

export const convertDate = (input) => {
  if (input === null) {
    return "";
  }
  const dateList = input.split(/[-T:]/);
  const createdDay =
    dateList[0] +
    "/" +
    dateList[1] +
    "/" +
    dateList[2] +
    " " +
    dateList[3] +
    ":" +
    dateList[4];
  return createdDay;
};

export const CmpTime = (item) => {
  const current = new Date();
  const date0 = convertDate(item);
  const date = Date.parse(date0);
  if (date < current) {
    return -1;
  } else {
    return 1;
  }
};

const Future = () => {
  const [data, setData] = useState([]);
  const [ID, setID] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  /*useIonViewWillEnter(() => {
    if ("data" in localStorage) {
      setData(JSON.parse(localStorage.getItem("data")));
      console.log(data);
    }
  });
*/

  useEffect(() => {
    if ("data" in localStorage) {
      setData(JSON.parse(localStorage.getItem("data")));
      console.log(data);
    }
  }, []);

  const showData = () => {
    console.log(data);
  };

  if (data === []) {
    return <div>loading...</div>;
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
                <IonButton
                  fill="clear"
                  expand="full"
                  color="dark"
                  onClick={() => {
                    setID(id);
                    console.log(id);
                    setShowAlert(true);
                    showData();
                  }}
                >
                  {d.channel} &emsp;
                  {convertDate(d.date)} &emsp;
                  {d.name}
                </IonButton>
              </div>
            );
          })}
        {data != undefined ? (
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            cssClass="my-custom-class"
            header={data[ID]}
            subHeader={"Subtitle"}
            message={"This is an alert message."}
            buttons={["OK"]}
          />
        ) : (
          []
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton href="/add_program">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Future;
