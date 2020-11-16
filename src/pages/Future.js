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
import { add, ellipsisHorizontal, trash } from "ionicons/icons";
import { delItem } from "./Past";

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
  const TASKS_STORAGE = "data";

  useEffect(() => {
    if ("data" in localStorage) {
      setData(JSON.parse(localStorage.getItem("data")));
      console.log(data);
    }
  }, []);

  /*const delItem = (ID) => {
    console.log("del", ID);
    setData((prevState) => {
      prevState.splice(0, 1);
      console.log(prevState);
      //localStorage.setItem("data", JSON.stringify(prevState));
      return prevState;
    });
  };*/
  const delItem = (ID) => {
    console.log("del", ID);
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === ID) {
        setData((prevState) => {
          prevState.splice(i, 1);
          console.log(prevState);
          localStorage.setItem("data", JSON.stringify(prevState));
          return prevState;
        });
        break;
      }
    }
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
                <IonItem key={id}>
                  {d.channel} &emsp;
                  {convertDate(d.date)} &emsp;
                  {d.name}
                  <IonButton
                    slot="end"
                    fill="none"
                    color="dark"
                    href={`/host/detail/${id}`}
                  >
                    <IonIcon icon={ellipsisHorizontal}></IonIcon>
                  </IonButton>
                  <IonButton
                    slot="end"
                    fill="none"
                    color="dark"
                    onClick={() => {
                      setID(d.id);
                      console.log(d.id);
                      delItem(d.id);
                    }}
                  >
                    <IonIcon icon={trash}></IonIcon>
                  </IonButton>
                </IonItem>
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
          <IonFabButton href="/host/add_program" color="dark">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Future;
