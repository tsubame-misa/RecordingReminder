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
} from "@ionic/react";
import { convertDate, CmpTime } from "./Future";
import { contractOutline, trash } from "ionicons/icons";
import { getDefaultLibFileName } from "typescript";

const Past = () => {
  const [data, setData] = useState([]);
  const [ID, setID] = useState(null);

  useEffect(() => {
    if ("data" in localStorage) {
      setData(JSON.parse(localStorage.getItem("data")));
      console.log(data);
    }
  }, []);

  const delItem = () => {
    console.log(ID);
    console.log(data[ID]);

    /*setData((prevState) => {
      prevState.splice(ID, 1);
      localStorage.setItem("data", JSON.stringify(prevState));
      return prevState;
    });*/
  };

  if (data === []) {
    return <div>loading</div>;
  }

  return (
    <IonPage>
      {/*一つ遅れで消えちゃうう*/}
      <IonContent fullscreen>
        {data != []
          ? data
              .filter((d) => {
                return CmpTime(d.date) < 0;
              })
              .map((d, id) => {
                return (
                  <div>
                    <IonButton key={id} fill="clear" expand="full" color="dark">
                      {convertDate(d.date)} &emsp;
                      {d.name}
                      <IonButton
                        fill="clear"
                        key={id}
                        onClick={() => {
                          setID(id);
                          delItem();
                        }}
                      >
                        <IonIcon icon={trash}></IonIcon>
                      </IonButton>
                    </IonButton>
                  </div>
                );
              })
          : []}
      </IonContent>
    </IonPage>
  );
};

export default Past;
