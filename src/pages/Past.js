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
  IonItemSliding,
  IonCard,
  IonCardContent,
  IonItemOption,
  IonItemOptions,
  IonButtons,
} from "@ionic/react";
import { convertDate, CmpTime } from "./Future";
import { contractOutline, trash } from "ionicons/icons";
import { getDefaultLibFileName } from "typescript";
import { useStorage } from "@ionic/react-hooks/storage";
import { ellipsisHorizontal } from "ionicons/icons";

const Past = () => {
  const [data, setData] = useState([]);
  const [ID, setID] = useState(null);
  const { get, set, clear, remove } = useStorage();
  const TASKS_STORAGE = "data";

  useEffect(() => {
    if ("data" in localStorage) {
      setData(JSON.parse(localStorage.getItem("data")));
      console.log(data);
    }
  }, []);

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
    return <div>loading</div>;
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        {data
          .filter((d) => {
            return CmpTime(d.date) < 0;
          })
          .map((d, id) => {
            return (
              <div>
                <IonItem>
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
                      setID(data[id].id);
                      //console.log(data[id].id);
                      delItem(data[id].id);
                    }}
                  >
                    <IonIcon icon={trash}></IonIcon>
                  </IonButton>
                </IonItem>
                {/*<IonItemSliding key={id}>
                  <IonItem>
                    <IonButton
                      fill="clear"
                      expand="full"
                      color="dark"
                      href={`/host/detail/${id}`}
                      onClick={() => {}}
                    >
                      {convertDate(d.date)} &emsp;
                      {d.name}
                    </IonButton>
                  </IonItem>

                  <IonItemOptions side="end">
                    <IonItemOption
                      color="danger"
                      expandable
                      onClick={() => {
                        setID(id);
                        delItem(id);
                      }}
                    >
                      Delete
                    </IonItemOption>
                  </IonItemOptions>
                    </IonItemSliding>*/}
              </div>
            );
          })}
      </IonContent>
    </IonPage>
  );
};

export default Past;
