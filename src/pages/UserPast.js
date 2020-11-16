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
} from "@ionic/react";
import { convertDate, CmpTime } from "./Future";
import { contractOutline, trash } from "ionicons/icons";
import { getDefaultLibFileName } from "typescript";
import { useStorage } from "@ionic/react-hooks/storage";
import { ellipsisHorizontal } from "ionicons/icons";

const UserPast = () => {
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

  /*const delItem = (ID) => {
    console.log("del", ID);
    setData((prevState) => {
      prevState.splice(ID, 1);
      console.log(prevState);
      localStorage.setItem(TASKS_STORAGE, JSON.stringify(prevState));
      return prevState;
    });
  };
  console.log(data);*/

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
      {/*一つ遅れで消えちゃうう*/}
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
                      delItem(data[id].id);
                    }}
                  >
                    <IonIcon icon={trash}></IonIcon>
                  </IonButton>
                </IonItem>
              </div>
            );
          })}
      </IonContent>
    </IonPage>
  );
};

export default UserPast;
