import React, { useEffect } from "react";
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
import { add, contractOutline, key, map, trash } from "ionicons/icons";
import { useState } from "react";
import notifications from "../notification/index";
import { convertDate } from "../pages/Future";
import { isComputedPropertyName } from "typescript";
import { useParams } from "react-router";

const Detail = () => {
  const [programName, setProgramName] = useState();
  const [text, setText] = useState();
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [artist, setArtist] = useState();
  const [notiDate, setNotiDate] = useState();
  const [notiTime, setNotiTime] = useState();
  const [data, setData] = useState();
  const item = useParams();

  useEffect(() => {
    if ("data" in localStorage) {
      setData(JSON.parse(localStorage.getItem("data")));
    }
  }, []);

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
    { name: "全員" },
  ];

  const sendData = () => {
    /* if (
      selectedChannel === null ||
      selectedDate === null ||
      programName === null ||
      artist === null
    ) {
      alert("記入漏れがあります");
    }*/

    const data = {
      channel: selectedChannel,
      date: selectedDate,
      name: programName,
      artist: artist,
      startTime: startTime,
      endTime: endTime,
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

    let datalist = JSON.parse(localStorage.getItem("data"));

    for (let i = 0; i < data.length; i++) {
      if (datalist[i].id === item.key) {
        setData((prevState) => {
          prevState.splice(i, 1);
          console.log(prevState);
          localStorage.setItem("data", JSON.stringify(prevState));
          return prevState;
        });
        break;
      }
    }

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
    setStartTime(null);
    setEndTime(null);
    setText(null);
    //window.location.href = `/host/future`;
  };
  console.log(item);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/host/Past" />
          </IonButtons>
          <IonTitle>番組詳細</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonInput
            value={programName}
            placeholder={data?.[0].name}
            onIonChange={(e) => setProgramName(e.detail.value)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>チャンネル名</IonLabel>
          <IonSelect
            value={selectedChannel}
            placeholder={data?.[0].channel}
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
            placeholder={data?.[0].date}
            value={selectedDate}
            onIonChange={(e) => setSelectedDate(e.detail.value)}
          ></IonDatetime>
        </IonItem>

        <IonItem>
          <IonLabel>アーティスト</IonLabel>
          <IonSelect
            value={artist}
            placeholder={data?.[0].artist}
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
            displayFormat="HH:mm"
            placeholder={data?.[0].startTime}
            value={startTime}
            onIonChange={(e) => setStartTime(e.detail.value)}
          ></IonDatetime>
          <IonDatetime
            displayFormat="HH:mm"
            placeholder={data?.[0].endTime}
            value={endTime}
            onIonChange={(e) => setEndTime(e.detail.value)}
          ></IonDatetime>
        </IonItem>
        <IonItem>
          <IonTextarea
            placeholder="その他・コメント"
            value={text}
            placeholder={data?.[0].comment}
            onIonChange={(e) => setText(e.detail.value)}
          ></IonTextarea>
        </IonItem>
        <IonButton
          color="dark"
          expand="full"
          onClick={() => {
            //同じ日にちのものがない確認し、なければ通知の予約をする
            sendData();
          }}
        >
          変更する
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Detail;
