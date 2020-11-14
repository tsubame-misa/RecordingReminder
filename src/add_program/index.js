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
  IonList,
} from "@ionic/react";
import { add, contractOutline, trash } from "ionicons/icons";
import { useState } from "react";
import notifications from "../notification/index";
import { convertDate } from "../pages/Future";

const Addprogram = () => {
  const [programName, setProgramName] = useState();
  const [text, setText] = useState();
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [perfTime, setPerfTime] = useState();
  const [artist, setArtist] = useState();

  const channel = [
    { name: "NHK総合" },
    { name: "Eテレ" },
    { name: "日テレ" },
    { name: "テレビ東京" },
    { name: "TBS" },
    { name: "テレビ朝日" },
    { name: "フジテレビ" },
    { name: "東京MX" },
  ];

  const artists = [
    { name: "山田涼介" },
    { name: "知念侑李" },
    { name: "中島裕翔" },
    { name: "岡本圭人" },
    { name: "有岡大貴" },
    { name: "伊野尾慧" },
    { name: "高木雄也" },
    { name: "八乙女光" },
    { name: "藪宏太" },
  ];

  const sendData = () => {
    if (
      selectedChannel === null ||
      selectedDate === null ||
      programName === null ||
      artist === null
    ) {
      alert("記入漏れがあります");
    }

    const data = {
      channel: selectedChannel,
      date: selectedDate,
      name: programName,
      artist: artist,
      perfTime: perfTime,
      comment: text,
    };

    const dateList = data.date.split(/[-T:]/);
    const current = new Date();
    console.log(dateList);
    const date = new Date(
      dateList[0],
      dateList[1] - 1,
      dateList[2],
      dateList[3],
      dateList[4],
      0,
      0
    );
    //通知
    const diff = date.getTime() - current.getTime();
    const second = Math.floor(diff / 1000);
    console.log(second);
    notifications.schedule(second);

    let datalist = JSON.parse(localStorage.getItem("data"));
    if (datalist === null) {
      datalist = [data];
    } else {
      datalist.push(data);
    }

    datalist.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      } else {
        return -1;
      }
    });

    localStorage.setItem("data", JSON.stringify(datalist));

    setSelectedChannel(null);
    setSelectedDate(null);
    setProgramName(null);
    setArtist(null);
    setPerfTime(null);
    setText(null);
    //window.location.href = `/future`;
  };

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
          <IonInput
            value={programName}
            placeholder="番組名"
            onIonChange={(e) => setProgramName(e.detail.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>チャンネル名</IonLabel>
          <IonSelect
            value={selectedChannel}
            okText="Okay"
            cancelText="Dismiss"
            onIonChange={(e) => {
              setSelectedChannel(e.detail.value);
            }}
          >
            {channel.map((t) => {
              return <IonSelectOption value={t.name}>{t.name}</IonSelectOption>;
            })}
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
          <IonLabel>アーティスト</IonLabel>
          <IonSelect
            value={artist}
            okText="Okay"
            cancelText="Dismiss"
            onIonChange={(e) => {
              setArtist(e.detail.value);
            }}
          >
            {artists.map((a) => {
              return <IonSelectOption value={a.name}>{a.name}</IonSelectOption>;
            })}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel>アーティスト出演時刻</IonLabel>
          {/*別の形式がいいかもしれない */}
          <IonDatetime
            displayFormat="HH:mm ~ HH:mm"
            placeholder="Select Date"
            value={perfTime}
            onIonChange={(e) => setPerfTime(e.detail.value)}
          ></IonDatetime>
        </IonItem>
        <IonItem>
          <IonTextarea
            placeholder="その他・コメント"
            value={text}
            onIonChange={(e) => setText(e.detail.value)}
          ></IonTextarea>
        </IonItem>
        <IonButton
          expand="full"
          onClick={() => {
            sendData(
              selectedChannel,
              selectedDate,
              programName,
              artist,
              perfTime,
              text
            );
          }}
        >
          登録
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Addprogram;
