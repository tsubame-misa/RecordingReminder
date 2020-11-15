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

  /*useEffect(() => {
    const getTasks = async () => {
      //const tasksString = await get(TASKS_STORAGE);
      const tasksString = localStorage.getItem("data");
      const taskData = tasksString ? JSON.parse(tasksString) : [];
      console.log(taskData);
      setData(taskData);
    };
    getTasks();
  }, [get]);*/

  const delItem = (ID) => {
    console.log("del", ID);
    setData((prevState) => {
      prevState.splice(ID, 1);
      console.log(prevState);
      localStorage.setItem(TASKS_STORAGE, JSON.stringify(prevState));
      return prevState;
    });
  };
  console.log(data);

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
                <IonItemSliding key={id}>
                  <IonButton
                    fill="clear"
                    expand="full"
                    color="dark"
                    href={`/host/detail/${id}`}
                    onClick={() => {}}
                  >
                    <IonItem>
                      {convertDate(d.date)} &emsp;
                      {d.name}
                    </IonItem>
                  </IonButton>

                  {/*<IonItemOptions side="start">
                    <IonItemOption
                      color="primary"
                      expandable
                      onClick={() => {
                        setID(id);
                        console.log(id);
                      }}
                    >
                      Edit
                    </IonItemOption>
                    </IonItemOptions>*/}
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
                </IonItemSliding>
              </div>
            );
          })}
      </IonContent>
    </IonPage>
  );
};

export default UserPast;
